import express from 'express';
import { DisplayAll, UploadProduct } from '../Controller/ProductController.js';


const router = express.Router()

router.post('/',UploadProduct)

router.get('/',DisplayAll)




export default router