import { WebSocketServer } from "ws";

const ws = new WebSocketServer({port:8080});

ws.on("connection", (socket)=>{
    socket.send("You are getting back response from WS listening on port 8080")
})