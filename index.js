import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import Auth from "./Routes/AuthRoute.js"
import Product from './Routes/ProductRoute.js';
import User from './Routes/UserRoutes.js';
import Order from "./Routes/OrderRoute.js"
import Payment from "./Routes/PaymentRoute.js"
import { v2 as cloudinary } from 'cloudinary';

const app = express()

//midlleware
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())
dotenv.config()

mongoose.connect(process.env.DB_CONNECTION_STRING)
.then(()=>app.listen(process.env.PORT,()=>{console.log(`listening at ${process.env.PORT}`)}))
.catch((error)=>console.log(error))

app.use('/Auth',Auth)
app.use('/user',User)
app.use('/products',Product)
app.use('/order',Order)
app.use('/payment',Payment)


cloudinary.config({
  cloud_name: 'dnirq5sxq',
  api_key: '174843453437244',
  api_secret: 'LxFkLHCWls0kbnaelRBz0yEM4vc'
});