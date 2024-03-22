import express from "express"

import order from "../Model/orderSchema.js"
import { BankTransfer, CashOnDelivery, CheckPayment, Paypal } from "../Controller/PaymentController.js"

const router = express.Router()

router.post('/demo/BankTransfer/:orderId',BankTransfer)
router.post('/demo/CashonDelivery',CashOnDelivery)
router.post('/demo/CheckPayment',CheckPayment)
router.post('/demo/Paypal',Paypal)

export default router