import express from "express"
import routes from "./routes/index.js"
import cookieParser from "cookie-parser"
import errorMiddleware from "./middlewares/error.middleware.js"
import arcjetMiddleware from "./middlewares/arject.middleware.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(arcjetMiddleware)
app.use("/api/v1", routes)
app.use(errorMiddleware)


export default app