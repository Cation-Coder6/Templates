import express, { Router } from "express"
import http from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import mongoose from "mongoose"

import router from "./router"

const app = express()

app.use(cors({
    credentials: true,
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/v1", router())

const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
})

const MONGO_URL = "mongodb+srv://Aditya:mniokok@cluster0.twwulkd.mongodb.net/?retryWrites=true&w=majority"

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
mongoose.connection.on("connected", () => console.log("Connected Successfully to database!"))
mongoose.connection.on("error", (error: Error) => console.log({ "Mongo Error:-": error }))
