import express from "express"
import deserializeUser from "../middleware/deserializeuser"
import routes from "../routes"

function createServer(){
    const app = express()
    const RateLimit = require("express-rate-limit")
    const limiter = new RateLimit({
        windowMs: 1*60*1000,
        max: 5
    })

    app.use(limiter)

    app.use(express.json())

    app.use(deserializeUser)

    routes(app)

    return app
}

export default createServer