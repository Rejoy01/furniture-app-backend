import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()

//midlleware
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
dotenv.config()

mongoose.connect(process.env.DB_CONNECTION_STRING)
.then(()=>app.listen(process.env.PORT,()=>{console.log(`listening at ${process.env.PORT}`)}))
.catch((error)=>console.log(error))

