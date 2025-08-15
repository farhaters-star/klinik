import express from 'express'
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import patientRoutes from "./routes/patient.routes.js"
import historyRoutes from "./routes/history.route.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from 'cors'
import {app,server } from "./lib/socket.js"

import { connectDB } from './lib/db.js';

dotenv.config()

const PORT = process.env.PORT;

app.use(express.json({ limit: "100mb" })); 
app.use(express.urlencoded({ extended: true, limit: "100mb" })); 
app.use(cookieParser())
app.use(cors({
    origin: "https://skripsi-insyaallah.vercel.app",
    credentials:true
}))

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/patient",patientRoutes)
app.use("/api",historyRoutes)


server.listen(PORT,()=>{
    console.log(`running at http://localhost/${PORT}` )
    connectDB()
})