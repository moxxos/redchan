import { MongoClient, Db, GridFSBucket, ObjectId } from "mongodb";
import { Readable } from "stream"

interface Buckets {
    [key: string]: GridFSBucket;
}

interface FileData {
    type: string
    size: string
    name: string
    data: Buffer
}

interface PostData {
    date: string
    comment: string
    thread_id: number
    post_id: number
    link_refs: Array<number>
    name?: string
    file_id?: number
}

interface ThreadData extends PostData {
    file_id: number
}

export default class DbManager {
    //static readonly db_name = 'redchan_db'
    // static readonly db_url = 'mongodb://localhost:27017'
    static readonly db_name = 'redchan-main'
    readonly db_url
    readonly mc: MongoClient; // MongoDB server connection
    readonly db: Db // redchan database
    buckets: Buckets

    constructor(db_password) {
        this.db_url = `mongodb+srv://moxxos:${db_password}@redchan-main.aa6qv.mongodb.net/?retryWrites=true&w=majority&appName=redchan-main`

        this.mc = new MongoClient(this.db_url)

        console.log('Conntected to database server.')

        this.db = this.mc.db(DbManager.db_name)
        this.buckets = {}
    }

    async initDB(boards: Array<string>) {
        // Create unique post id counter
        await this.db.createCollection('counters', {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: ['counter', 'sequence_value'],
                    properties: {
                        counter: {
                            bsonType: 'string',
                            description: 'Name for the counter (e.g., thread_id, post_id)'
                        },
                        sequence_value: {
                            bsonType: 'int',
                            minimum: 0,
                            description: 'Current sequence value for ID generation'
                        }
                    }
                }
            },
            validationAction: 'error', // Reject any document that does not follow the validation rules
        });

        console.log('Created unique sequence counter collection.')

        for (let board of boards) {
            await this.db.createCollection(`${board}_threads`, {
                validator: {
                    $jsonSchema: {
                        bsonType: 'object',
                        required: ['comment', 'date', 'file_id', 'post_id', 'thread_id', 'bump_id', 'post_count', 'link_refs'],
                        properties: {
                            name: {
                                bsonType: 'string',
                                description: 'Name of the thread'
                            },
                            subject: {
                                bsonType: 'string',
                                description: 'Subject of the thread'
                            },
                            comment: {
                                bsonType: 'string',
                                description: 'Main comment/content of the thread'
                            },
                            date_str: {
                                bsonType: 'string',
                                description: 'Date of the thread'
                            },
                            file_id: {
                                bsonType: 'string',
                                description: 'Image URL related to the thread'
                            },
                            post_id: {
                                bsonType: 'int',
                                description: 'ID of the associated post'
                            },
                            thread_id: {
                                bsonType: 'int',
                                description: 'ID of the thread'
                            },
                            bump_id: {
                                bsonType: 'int',
                                description: 'ID of the thread'
                            },
                            post_count: {
                                bsonType: 'int',
                                description: 'ID of the thread'
                            },
                            link_refs: {
                                bsonType: 'array',
                                description: 'List of link references to this post.',
                                items: {
                                    bsonType: "number",
                                    description: "ID of link post"
                                }
                            }
                        }
                    }
                },
                validationAction: 'error', // Reject any document that does not follow the validation rules
            })

            console.log(`Created ${board}_threads collection.`)

            await this.db.createCollection(`${board}_posts`, {
                validator: {
                    $jsonSchema: {
                        bsonType: 'object',
                        required: ['comment', 'date', 'post_id', 'thread_id', 'link_refs'],
                        properties: {
                            name: {
                                bsonType: 'string',
                                description: 'Name of the post'
                            },
                            comment: {
                                bsonType: 'string',
                                description: 'Main comment/content of the post'
                            },
                            date_str: {
                                bsonType: 'string',
                                description: 'Date of the thread'
                            },
                            file_id: {
                                bsonType: 'string',
                                description: 'Image URL related to the post'
                            },
                            post_id: {
                                bsonType: 'int',
                                description: 'ID of the post'
                            },
                            thread_id: {
                                bsonType: 'int',
                                description: 'ID of the thread'
                            },
                            link_refs: {
                                bsonType: 'array',
                                description: 'List of link references to this post.',
                                items: {
                                    bsonType: "number",
                                    description: "ID of link post"
                                }
                            }
                        }
                    }
                },
                validationAction: 'error', // Reject any document that does not follow the validation rules
            });

            console.log(`Created ${board}_posts collection.`)

            // Initialize counters for custom sequenced IDs
            await this.db.collection('counters').updateOne(
                { counter: `${board}_thread_id` },
                { $setOnInsert: { sequence_value: 0 } },
                { upsert: true }
            )

            console.log(`Created ${board}_thread_id sequence document.`)

            await this.db.collection('counters').updateOne(
                { counter: `${board}_post_id` },
                { $setOnInsert: { sequence_value: 0 } },
                { upsert: true }
            )

            console.log(`Created ${board}_post_id sequence document.`)

            this.buckets[board] = new GridFSBucket(this.db, { bucketName: `${board}_uploads` })
            console.log(`Created ${board}_uploads GridFS bucket.`)
        }
    }

    async closeClient() {
        await this.mc.close()
    }

    // Thread and post retrieval

    /*
        Getting all threads is currently sorted by descending bump_id which is just the most recent post_id.
    */

    async getPost(board: string, post_id: number) {
        const posts = this.db.collection(`${board}_posts`)

        let result = await posts.findOne({ post_id: post_id })

        if (!result) {
            throw new Error(`Post id: ${post_id} for board: ${board}, result is null.`)
        }

        return result
    }

    async getThread(board: string, id: number, method: string = "thread_id") {
        const threads = this.db.collection(`${board}_threads`)

        let thread_query
        if (method == "post_id") {
            thread_query = { post_id: id }
        } else if (method == "thread_id") {
            thread_query = { thread_id: id }
        } else {
            throw new Error(`Unknown thread query method: ${thread_query}.`)
        }

        const result = await threads.findOne(thread_query)

        if (!result) {
            throw new Error(`Thread id: ${id} for board: ${board}, result is null.`)
        }

        return result
    }

    async getAllThreads(board: string) {

        const threads = this.db.collection(`${board}_threads`)

        let result = await threads.find().sort({ bump_id: -1 }).toArray()

        return result
    }

    /*
        The 'oldest' thread is the one with the lowest bump_id
    */
    async getOldestThread(board: string) {

        const threads = this.db.collection(`${board}_threads`)

        let result = await threads.find().sort({ bump_id: 1 }).limit(1).next()

        if (!result) {
            throw new Error(`Error getting oldest thread for board: ${board}, result is null.`)
        }

        return result
    }

    /*
        There are a total of 100 threads and 10 threads per page. Pages are indexed 1-10.  
    */
    async getPagedThreads(board: string, page_num: number) {

        const threads = this.db.collection(`${board}_threads`)

        let result = await threads.find().sort({ bump_id: -1 }).skip(10 * (page_num - 1)).limit(10).toArray()

        if (!result) {
            throw new Error(`Error getting page: ${page_num} for board: ${board}, result is empty array.`)
        }

        return result
    }

    async getAllThreadPosts(board: string, thread_id: number) {

        const posts = this.db.collection(`${board}_posts`)

        let result = await posts.find({ thread_id: thread_id }).toArray()

        if (!result) {
            throw new Error(`Getting posts for thread id: ${thread_id}, result is empty array.`)
        }

        return result
    }

    async getPreviewThreadPosts(board: string, thread_id: number) {
        const posts = this.db.collection(`${board}_posts`)

        let results = await posts.find({ thread_id: thread_id }).sort({ post_id: -1 }).limit(5).toArray()

        return results
    }

    async retrieveFile(board: string, id: string): Promise<FileData> {
        const file_id = new ObjectId(id)
        const file_info = await this.db.collection(`${board}_uploads.files`).findOne({ _id: file_id })

        console.log("file info object: ", file_info)

        return new Promise((resolve, reject) => {

            const download_stream = this.buckets[board].openDownloadStream(file_id)
            const file_data = new Array()

            download_stream.on("error", (error) => {
                console.log(`Error retrieving file id: ${id}: `, error.message)
                reject(error)
            })

            download_stream.on("data", (chunk: Buffer) => {
                file_data.push(chunk)
            })

            download_stream.on("end", () => {

                resolve({
                    data: Buffer.concat(file_data),
                    type: file_info?.metadata.type,
                    size: file_info?.metadata.size,
                    name: file_info?.filename
                })
            })
        })
    }

    uploadFile(
        name: string,
        type: string,
        size: string,
        data,
        board: string
    ) {
        return new Promise((resolve, reject) => {

            const upload_stream = this.buckets[board].openUploadStream(name, {
                contentType: type,
                metadata: { size: size, type: type }
            })

            const buffer_stream = new Readable()
            buffer_stream.push(data)
            buffer_stream.push(null)
            buffer_stream.pipe(upload_stream)

            upload_stream.on("finish", () => {
                console.log('File upload successful.')
                resolve(upload_stream.id)
            })

            upload_stream.on("error", (error) => {
                console.log('Error uploading file: ', error.message)
                reject(error)
            })
        })
    }

    // Thread and post creation
    async createThread(
        name: string,
        date_str: string,
        subject: string,
        comment: string,
        file_id: string,
        board: string,
        post_id: number,
        thread_id: number
    ) {
        const threads = this.db.collection(`${board}_threads`)

        const new_thread = {
            date: date_str,
            comment: comment,
            file_id: file_id,
            post_id: post_id,
            thread_id: thread_id,
            bump_id: post_id,
            post_count: 0,
            link_refs: new Array<number>(),
            ...(name && { name: name }),
            ...(subject && { subject: subject })
        }

        const result = await threads.insertOne(new_thread)

        if (result.acknowledged) {
            console.log(`Thread id: ${thread_id} successfully created.`)
            return thread_id
        } else {
            throw new Error(`Creating post id: ${thread_id}, write not acknowledged.`)
        }
    }

    async createPost(
        name: string,
        date_str: string,
        comment: string,
        file_id: string | undefined,
        board: string,
        thread_id: number,
        post_id: number
    ) {
        const posts = this.db.collection(`${board}_posts`)

        let new_post = {
            date: date_str,
            comment: comment,
            thread_id: thread_id,
            post_id: post_id,
            link_refs: new Array<number>(),
            ...(name && { name: name }),
            ...(file_id && { file_id: file_id })
        }

        let result = await posts.insertOne(new_post)

        if (result.acknowledged) {
            console.log(`Post id: ${post_id} successfully created.`)
            await this.updateBumpId(board, thread_id, post_id)
            return post_id
        } else {
            throw new Error(`Creating post id: ${post_id}, write not acknowledged.`)
        }
    }

    // Update thread and post
    async updatePostRefs(board: string, post_id: number, ref_id: number) {

        const posts = this.db.collection<PostData>(`${board}_posts`)
        const post = await posts.findOne({ post_id: post_id })

        if (post?.link_refs.includes(ref_id)) {
            console.log(`Post id: ${post_id} contains duplicate link ref: ${ref_id}.`)
            return
        }

        const result = await posts.updateOne({ post_id: post_id }, { $push: { link_refs: ref_id } })

        if (result.acknowledged) {
            console.log(`Post id: ${post_id} added ref id: ${ref_id} to link refs.`)
            return true
        } else {
            throw new Error(`Failed adding post id: ${post_id} with ref id: ${ref_id}.`)
        }
    }

    async updateThreadRefs(board: string, thread_id: number, ref_id: number) {
        const threads = this.db.collection<ThreadData>(`${board}_threads`)
        const thread = await threads.findOne({ thread_id: thread_id })

        if (thread?.link_refs.includes(ref_id)) {
            console.log(`Thread id: ${thread_id} contains duplicate link ref: ${ref_id}.`)
            return
        }

        const result = await threads.updateOne({ thread_id: thread_id }, { $push: { link_refs: ref_id } })

        if (result.acknowledged) {
            console.log(`Thread id: ${thread_id} added ref id: ${ref_id} to link refs.`)
            return true
        } else {
            throw new Error(`Failed adding post id: ${thread_id} with ref id: ${ref_id}.`)
        }
    }

    async updateBumpId(board: string, thread_id: number, bump_id: number) {
        const threads = this.db.collection(`${board}_threads`)

        let result = await threads.updateOne(
            { thread_id: thread_id },
            { $set: { bump_id: bump_id } })

        if (result.acknowledged) {
            console.log(`Thread id: ${thread_id} updated with bump id: ${bump_id}.`)
            return true
        } else {
            throw new Error(`Error updating bump id: ${bump_id}, thread id: ${thread_id} document is null.`)
        }
    }

    // Delete thread
    async deleteThread(board: string, thread_id: number) {
        const threads = this.db.collection(`${board}_threads`)

        let result = await threads.deleteOne({ thread_id: thread_id })

        if (result.acknowledged && result.deletedCount) {
            console.log(`Thread id: ${thread_id} deleted.`)
            return true
        } else {
            throw new Error(`Error deleting thread id: ${thread_id}, result not acknowledged or delete count is 0.`)
        }
    }

    // Get IDs
    async getNextThreadId(board: string) {

        const counters = this.db.collection('counters')

        let result = await counters.findOneAndUpdate(
            { counter: `${board}_thread_id` },
            { $inc: { sequence_value: 1 } },
            { returnDocument: 'after' })

        if (result) {
            return result.sequence_value
        } else {
            throw new Error('Getting next thread id sequence value, thread id document is null')
        }
    }

    async getNextPostId(board: string) {

        const counters = this.db.collection('counters')

        let result = await counters.findOneAndUpdate(
            { counter: `${board}_post_id` },
            { $inc: { sequence_value: 1 } },
            { returnDocument: 'after' })

        if (result) {
            return result.sequence_value
        } else {
            throw new Error('Getting next post_id sequence value: post_id document is null')
        }
    }
}