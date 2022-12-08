const express = require ("express")
const app = express ()
app.use(express.json())
app.use(express.static("."))

app.listen(8080)

const { PrismaClient}  =require('@prisma/client')
const prisma = new PrismaClient()  //tuong tu const model = initial-Model()


app.get("/demo",async(req,res)=>{
    let data = await prisma.user.findMany()
    res.send("hello")
})


