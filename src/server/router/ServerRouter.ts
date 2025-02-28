import express, { Router, Request, Response } from "express"

import Model from "../model/Model"

export default class ServerRouter {
    readonly APIRouter: Router
    readonly AppModel: Model
    readonly AppKeys

    constructor(model: Model, keys) {
        this.AppKeys = keys
        this.AppModel = model
        this.APIRouter = express.Router()
        this.initRoutes()
    }

    initRoutes() {
        this.APIRouter.get('/boards', this.getBoards(this.AppModel))
        this.APIRouter.get('/boards/:board/page/:page', this.getBoardPage(this.AppModel))
        this.APIRouter.get('/boards/:board/catalog', this.getBoardCatalog(this.AppModel))
        this.APIRouter.get('/boards/:board/upload/:upload_id', this.getBoardUpload(this.AppModel))
        this.APIRouter.get('/boards/:board/thread/:thread_id', this.getBoardThread(this.AppModel))
        this.APIRouter.get('/boards/:board/post/:post_id', this.getThreadPost(this.AppModel))

        this.APIRouter.post('/boards/:board', this.postBoardThread(this.AppModel))
        this.APIRouter.post('/boards/:board/thread/:thread_id', this.postThreadPost(this.AppModel))
        this.APIRouter.post('/boards/:board/upload/', this.postBoardUpload(this.AppModel))
    }

    private postBoardUpload(model: Model) {
        return async (req: Request, res: Response) => {
            const { board } = req.params
            const { file_name, file_type, file_size } = req.headers
            let file_data = new Array()

            console.log(`Recevied new file_name: ${file_name}, file_size: ${file_size}, file_type: ${file_type}.`)

            req.on('data', (file_chunk) => {
                file_data.push(file_chunk)
            })

            req.on('end', async () => {
                let result = await model.uploadFile(
                    file_name! as string,
                    file_type! as string,
                    file_size! as string,
                    Buffer.concat(file_data),
                    board)

                res.status(200).json({
                    message: `POST SUCCESS: ${file_name} uploaded with object_id: ${result}.`,
                    file_id: result
                })
            })
        }
    }

    private postThreadPost(model: Model) {
        return async (req: Request, res: Response) => {
            let { board, thread_id } = req.params
            let { name, options, comment, file_id, token } = req.body

            console.log('the token is: ', token)

            const hcaptcha_response = await fetch(`https://api.hcaptcha.com/siteverify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `secret=${this.AppKeys.hcaptcha_secret}&response=${token}`

            })

            const hcaptcha_data = await hcaptcha_response.json()

            console.log('hcaptcha res: ', hcaptcha_data)

            if (!hcaptcha_data.success) {
                res.status(404).json({ error: 'hCaptcha token verifcation failed.' })
                return
            }

            const result = await model.createPost(name, comment, file_id, board, Number(thread_id))

            res.status(200).json({
                message: `POST SUCCESS: post_id: ${result} created.`,
                post_id: result
            })
        }
    }

    private postBoardThread(model: Model) {
        return async (req: Request, res: Response) => {
            let { board } = req.params
            let { name, options, subject, comment, file_id } = req.body

            console.log("recevied request to create new thread, body is: ", req.body)

            console.log(`name: ${name}, subject: ${subject}, comment: ${comment}, image: ${file_id}`)

            const result = await model.createThread(name, subject, comment, file_id, board)

            res.status(200).json({
                message: `POST SUCCESS: thread_id: ${result} created.`,
                thread_id: result
            })
        }
    }

    private getBoards(model: Model) {
        return async (req: Request, res: Response) => {

            res.status(200).json(model.boards)
        }
    }

    private getBoardUpload(model: Model) {
        return async (req: Request, res: Response) => {
            let { board, upload_id } = req.params

            const { data, type, size, name } = await model.retrieveFile(board, upload_id)

            res.setHeader('File-Name', name)
            res.setHeader('Content-Type', type)
            res.setHeader('Content-Length', size)
            res.setHeader('Content-Disposition', 'inline')
            res.status(200).send(data)

            console.log(`GET SUCCESS: upload id: ${upload_id} sent to client.`)
        }
    }

    private getBoardPage(model: Model) {
        return async (req: Request, res: Response) => {

            let { board, page } = req.params

            const board_page = await model.getBoardPage(board, Number(page))

            if (!board_page) {
                res.status(404).json({ error: "Board page not found." })
                return
            }
            res.status(200).json(board_page)
        }
    }

    private getBoardCatalog(model: Model) {
        return async (req: Request, res: Response) => {

            let { board } = req.params

            const board_catalog = await model.getAllThreads(board)

            if (!board_catalog) {
                res.status(404).json({ error: "Board catalog not found." })
                return
            }
            res.status(200).json(board_catalog)
        }
    }

    private getBoardThread(model: Model) {
        return async (req: Request, res: Response) => {
            let { board, thread_id } = req.params

            const thread = await model.getThread(board, Number(thread_id))

            if (!thread) {
                res.status(404).json({ error: `Thread id: ${thread_id} not found.` })
                return
            }
            res.status(200).json(thread)
        }
    }

    private getThreadPost(model: Model) {
        return async (req: Request, res: Response) => {
            let { board, post_id } = req.params

            const thread = await model.getPost(board, Number(post_id))

            if (!thread) {
                res.status(404).json({ error: `Thread id: ${post_id} not found.` })
                return
            }
            res.status(200).json(thread)

        }
    }
}