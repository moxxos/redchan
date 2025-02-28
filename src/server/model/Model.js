"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DbManager_1 = __importDefault(require("../database/DbManager"));
class Model {
    DbMan;
    max_threads;
    post_limit;
    boards;
    thread_count;
    constructor(max_threads, post_limit, boards) {
        this.DbMan = new DbManager_1.default();
        this.max_threads = max_threads;
        this.post_limit = post_limit;
        this.boards = boards;
        this.thread_count = {};
    }
    async initModel() {
        let board_id_list = new Array();
        // Server memory initialization
        for (let category of this.boards) {
            for (let board of category.boards) {
                board_id_list.push(board.id);
                this.thread_count[board.id] = 0;
            }
        }
        // Database initialization
        await this.DbMan.initDB(board_id_list);
    }
    async getBoardPage(board, page_num) {
        let threads = await this.DbMan.getPagedThreads(board, page_num);
        let page = new Array();
        for (let thread of threads) {
            let posts = (await this.DbMan.getPreviewThreadPosts(board, thread.thread_id)).reverse();
            page.push([thread, ...posts]);
        }
        return page;
    }
    async getThread(board, thread_id) {
        let posts = await this.DbMan.getAllThreadPosts(board, thread_id);
        try {
            let thread = await this.DbMan.getThread(board, thread_id);
            return [thread, ...posts];
        }
        catch (error) {
            console.error(error.message);
            return null;
        }
    }
    async getPost(board, post_id) {
        let post;
        try {
            post = await this.DbMan.getPost(board, post_id);
        }
        catch (e) {
            console.log(`No post with post id: ${post_id}`);
        }
        try {
            post = await this.DbMan.getThread(board, post_id, "post_id");
        }
        catch (e) {
            console.log(`No thread with post id: ${post_id}`);
        }
        return post;
    }
    getAllThreads(board) {
        return this.DbMan.getAllThreads(board);
    }
    retrieveFile(board, id) {
        return this.DbMan.retrieveFile(board, id);
    }
    uploadFile(name, type, size, data, board) {
        return this.DbMan.uploadFile(name, type, size, data, board);
    }
    async createThread(name, subject, comment, file_id, board) {
        const date_str = (new Date).toString();
        const post_id = await this.DbMan.getNextPostId(board);
        //const thread_id = await this.DbMan.getNextThreadId(board)
        /*
            do this for now to match 4chan frontend. i think thread_id will still be useful for moderation
        */
        const thread_id = post_id;
        if (this.thread_count[board] == this.max_threads) {
            await this.pruneBoard(board);
        }
        else {
            this.thread_count[board]++;
        }
        const processed_comment = await this.processComment(comment, board, thread_id, post_id, post_id);
        return await this.DbMan.createThread(name, date_str, subject, processed_comment, file_id, board, post_id, thread_id);
    }
    async pruneBoard(board) {
        let thread_id = (await this.DbMan.getOldestThread(board)).thread_id;
        let result = await this.DbMan.deleteThread(board, thread_id);
        if (result) {
            console.log(`Board: ${board} pruned.`);
        }
        else {
            throw new Error(`Pruning board: ${board}, result of delete thread is false.`);
        }
    }
    async createPost(name, comment, file_id, board, thread_id) {
        const thread = await this.DbMan.getThread(board, thread_id);
        const post_count = thread.post_count;
        const post_id = await this.DbMan.getNextPostId(board);
        if (post_count == this.post_limit) {
            console.log(`Post limit reached for thread id: ${thread_id}`);
            return;
        }
        const date_str = (new Date).toString();
        const processed_comment = await this.processComment(comment, board, thread_id, thread.post_id, post_id);
        console.log('processed comment is: ', processed_comment);
        return await this.DbMan.createPost(name, date_str, processed_comment, file_id, board, thread_id, post_id);
    }
    /*
        preprocesses comment by adding in identifiers for post in links and other features like spoilers etc. for
        client to transform into actual html elements
    */
    async processComment(comment, board, thread_id, op_id, post_id) {
        let link_match, post_link, link_id;
        while (link_match = comment.match(/>>\d+/)) {
            post_link = link_match[0];
            link_id = Number(post_link.slice(2));
            /* try to find a post or thread with link_id in this board */
            let link_post, link_thread;
            try {
                link_post = await this.DbMan.getPost(board, link_id);
            }
            catch (e) {
                console.log(`No linked post with link id: ${link_id} found.`);
            }
            try {
                link_thread = await this.DbMan.getThread(board, link_id, "post_id");
            }
            catch (e) {
                console.log(`No linked thread with link id: ${link_id} found.`);
            }
            if (link_post) {
                if (link_post.thread_id === thread_id) {
                    comment = comment.replace(post_link, `[LINK]${link_id}[LINK]`);
                    await this.DbMan.updatePostRefs(board, link_id, post_id);
                }
                else { /*linked post does exist but its in post in another thread */
                    comment = comment.replace(post_link, `[EXTLINK]${link_post.thread_id},${link_id}[EXTLINK]`);
                }
                // await this.DbMan.updatePostRefs(board, link_id, post_id)
            }
            else if (link_id === op_id) { /* this is a link to the OP */
                comment = comment.replace(post_link, `[OPLINK]${link_id}[OPLINK]`);
                await this.DbMan.updateThreadRefs(board, thread_id, post_id);
            }
            else if (link_thread) { /* link to another thread */
                comment = comment.replace(post_link, `[EXTLINK]${link_thread.thread_id},${link_id}[EXTLINK]`);
                // await this.DbMan.updateThreadRefs(board, link_id, post_id)
            }
            else {
                comment = comment.replace(post_link, `[NOLINK]${link_id}[NOLINK]`);
            }
        }
        return comment;
    }
}
exports.default = Model;
