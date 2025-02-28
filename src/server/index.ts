import dotenv from "dotenv"

import App from "./App"

dotenv.config({ path: '../../app.env' })

const KEYS = {
    hcaptcha_secret: process.env.HCAPTCHA_SECRET_KEY,
    mongodb_password: process.env.MONGODB_PASSWORD
}

const Application = new App(KEYS)

Application.initApp().then(() => {
    Application.start()
})
