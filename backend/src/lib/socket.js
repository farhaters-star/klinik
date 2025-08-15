import {Server} from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "https://skripsi-insyaallah.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});



app.set("io", io)
//use to store online users
const userSocketMap = {}
export function getReceiverSocketId(userId) {
    return userSocketMap[userId]
}

io.on("connection",(socket) =>{
    console.log("A user connected", socket.id)
    console.log("Handshake auth data:", socket.handshake.auth); // 🔍 lihat ini

    const userId = socket.handshake.auth?.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
        console.log("User ID from socket handshake:", userId);
    } else {
        console.warn("No userId found in socket handshake!");
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, app, server }