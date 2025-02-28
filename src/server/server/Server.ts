import express, { Application } from "express";
import path from "path"

import ServerRouter from "../router/ServerRouter";
import Model from "../model/Model";

export default class Server {
    static readonly PORT = 3000
    readonly ExpressServer: Application
    readonly AppModel: Model
    readonly Router: ServerRouter

    constructor(model: Model, keys) {
        this.AppModel = model
        this.Router = new ServerRouter(model, keys)
        this.ExpressServer = express()
        this.ExpressServer.use(express.json())
        //this.ExpressServer.use(express.urlencoded({ extended: false }))
        this.ExpressServer.use(express.static('../client'))
        this.mountRouter()
    }

    mountRouter() {
        this.ExpressServer.use('/api', this.Router.APIRouter)

        /*
            This catch-all route must come after the API routes because otherwise it will capture
            API fetch requests.
        */
        this.ExpressServer.get('*', (req, res) => {
            if (req.path.startsWith('/api')) {
                return res.status(404).json({ error: 'API route not found' });
            }
            res.sendFile(path.join(__dirname, '../client/index.html'));
        });
    }

    start() {
        this.ExpressServer.listen(Server.PORT, () => {
            console.log(`Server is running at http://localhost:${Server.PORT}`);
        });
    }
}