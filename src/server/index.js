"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const App_1 = __importDefault(require("./App"));
dotenv_1.default.config({ path: '../../app.env' });
const KEYS = {
    hcaptcha_secret: process.env.HCAPTCHA_SECRET_KEY
};
const Application = new App_1.default(KEYS);
Application.initApp().then(() => {
    Application.start();
});
