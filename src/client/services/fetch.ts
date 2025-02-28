interface Post {
    name?: string
    options?: string
    comment: string
    file_id?: string
    token: string
}

interface Thread extends Post {
    subject?: string
    file_id: string
}

export async function submitForm(board_id: string, thread_id: string | undefined, form_id: string, token: string) {
    const form = document.getElementById(form_id)
    const form_data = new FormData(form as HTMLFormElement)

    const name = form_data.get('name')?.toString()
    const options = form_data.get('options')?.toString()
    const comment = form_data.get('comment') as string

    if (!comment.length) {
        alert('Missing comment!')
        return
    }

    console.log("form data: ", form_data)

    const file = form_data.get('file') as File

    let file_id, file_message, message
    if (file.size) { // if there is a file, upload it first and get the id to attach to the post/thread
        if (thread_id && file.size > 10000000) {
            alert('10 MB file limit for post uploads.')
            return
        } else if (file.size > 100000000) {
            alert('100 MB file limit for thread uploads.')
            return
        }
        const file_res = await uploadFile(board_id as string, file)
        file_id = file_res.file_id
        file_message = file_res.message
    }

    if (thread_id) { // creating a post
        const new_post = {
            name: name ? name : undefined,
            options: options ? options : undefined,
            comment: comment ? comment : '',
            file_id: file_id,
            token: token
        }

        const post_res = await createPost(board_id as string, thread_id, new_post)
        message = post_res.message

    } else { // creating a thread
        if (!file.size) {
            alert('Missing file!')
            return
        }

        const subject = form_data.get('subject')?.toString()

        const new_thread = {
            name: name ? name : undefined,
            subject: subject ? subject : undefined,
            options: options ? options : undefined,
            comment: comment ? comment : '',
            file_id: file_id ? file_id : '',
            token: token
        }

        const thread_res = await createThread(board_id as string, new_thread)
        message = thread_res.message
        thread_id = thread_res.thread_id
    }


    location.replace(`/boards/${board_id}/thread/${thread_id}`)
    console.log(file_message, message)
    console.log('File id was: ', file_id)
}

export async function createThread(board: string, thread: Thread) {

    const res = await fetch(`/api/boards/${board}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(thread)
    })

    const data = await res.json()

    return data
}

export async function createPost(board: string, thread_id: string, post: Post) {

    const res = await fetch(`/api/boards/${board}/thread/${thread_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()

    return data
}

export async function uploadFile(board: string, file: File) {
    const file_data = await file.arrayBuffer()

    const res = await fetch(`/api/boards/${board}/upload`, {
        method: 'POST',
        headers:
        {
            'Content-Type': file.type,
            'file_name': file.name,
            'file_size': file.size.toString(),
            'file_type': file.type
        },
        body: file_data
    })

    const data = await res.json()

    return data
}