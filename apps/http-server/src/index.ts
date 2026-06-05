import express from "express";
import { prisma } from "@repo/db";
import bcrypt from "bcrypt"

const app = express();
app.use(express.json())

app.get("/", (req, res)=>{
    
    res.status(200).json({
        message: "You are getting response back from updated http server using CD"
    })
});

app.post("/signup", async(req,res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password,8)

    try{
        const user = await prisma.user.create({
            data:{
                username:username,
                email:email,
                password:hashedPassword
            }
        })
        res.status(200).json({
            message:`${username} is signed up`
        })
    }catch(e){
        res.status(400).json({
            message:`Error occured while signing up!, ${e}`
        })
    }
})

app.listen(3000, ()=>{
    console.log("Http server is listening on port 3000")
})