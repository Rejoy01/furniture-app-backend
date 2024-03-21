import express from 'express';
import { GetAll, OrderItem, Orders } from '../Controller/OrderController.js';
import order from '../Model/orderSchema.js';

const router = express.Router()

router.post("/",OrderItem)
router.post("/Orders",GetAll)
router.post("/Orders/:id",Orders)

export default router