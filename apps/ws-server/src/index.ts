import { prisma } from "@repo/db";
import { WebSocketServer } from "ws";

const ws = new WebSocketServer({port:8080});

ws.on("connection", async(socket)=>{
    try{
    await prisma.user.create({
        data:{
            username:Math.random().toString(),
            email:Math.random().toString(),
            password:Math.random().toString(),
        }
    })}catch(e){
        console.log(`Error occured while stroing data in db ${e}`);
        socket.send("Database error")
    }
    socket.send(`You are getting back response from WS listening on port "8080"`)
})