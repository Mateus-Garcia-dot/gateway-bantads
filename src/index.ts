import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import { indexRouter } from "./routes/index.routes";
import { errorHandler } from './middleware/errorHandling.middleware';


const app = express()

app.use(express.json())

app.listen(process.env.PORT, () => {
    app.use(indexRouter)
    app.use(errorHandler)
    console.log(`[INFO] --> Server is running on port ${process.env.PORT}`)
})
