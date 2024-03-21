import express from 'express';
import { GetAll, OrderItem } from '../Controller/OrderController.js';

const router = express.Router()

router.post("/",OrderItem)
router.post("/allOrder",GetAll)
router.post("/order/:id",order)

export default router