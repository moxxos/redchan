"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ServerRouter_1 = __importDefault(require("../router/ServerRouter"));
class Server {
    static PORT = 3000;
    ExpressServer;
    AppModel;
    Router;
    constructor(model, keys) {
        this.AppModel = model;
        this.Router = new ServerRouter_1.default(model, keys);
        this.ExpressServer = (0, express_1.default)();
        this.ExpressServer.use(express_1.default.json());
        //this.ExpressServer.use(express.urlencoded({ extended: false }))
        this.ExpressServer.use(express_1.default.static('../client'));
        this.mountRouter();
    }
    mountRouter() {
        this.ExpressServer.use('/api', this.Router.APIRouter);
    }
    start() {
        this.ExpressServer.listen(Server.PORT, () => {
            console.log(`Server is running at http://localhost:${Server.PORT}`);
        });
    }
}
exports.default = Server;
