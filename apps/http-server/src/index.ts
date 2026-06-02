import express from "express";
import { prisma } from "@repo/db";

const app = express();

app.get("/", (req, res)=>{
    
    res.status(200).json({
        message: "You are getting response back from http server"
    })
})

app.listen(3000, ()=>{
    console.log("Http server is listening on port 3000")
})