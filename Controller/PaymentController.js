import order from "../Model/orderSchema.js";

export const BankTransfer = async (req,res)=>{
    const orderId = req.params.orderId;
    const { amountPaid } = req.body;

    try {

        const Order = await order.findById(orderId);
        if (amountPaid < Order.total) {
            return res.status(400).json({ message:"amount paid does not match the total amount of the order"})
        }
        const updateOrder = await UpdateOrderStatus(orderId,"success")
        res.status(200).json({message : "PayPal payment successful", order:updateOrder}) 

    } catch (error) {
        return res.status(404).json({message : error.message})
    }

}


export const Paypal = async (req,res) =>{
    const orderId = req.params.orderId;

    try {
        const updateOrder = await UpdateOrderStatus(orderId,"success")
        res.status(200).json({message:"Paypal payment successful", order:updateOrder})
    } catch (error) {
        return res.status(500).json({message:"Paypal payment failed", error:error.message})
    }
    
} 

export const CheckPayment = async (req,res) =>{
    const orderId = req.params.orderId;
    const { amountPaid } = req.body;

    try {

        const Order = await order.findById(orderId);

        if (amountPaid < Order.total) {
            return res.status(400).json({ message:"amount paid does not match the total amount of the order"})
        }

        const updateOrder = await UpdateOrderStatus(orderId,"success")
        res.status(200).json({message:"CheckPayment payment successful", order:updateOrder})
    } catch (error) {
        return res.status(500).json({message:"CheckPayment payment failed", error:error.message})
    }
    
} 
export const CashOnDelivery = async (req,res) =>{
    const orderId = req.params.orderId;

    try {
        const updateOrder = await UpdateOrderStatus(orderId,"success")
        res.status(200).json({message:"CheckPayment payment successful", order:updateOrder})
    } catch (error) {
        return res.status(500).json({message:"payment failed", error:error.message})
    }
    
} 



async function UpdateOrderStatus(orderId,status){
    

    const updatedOrder = await order.findOneAndUpdate(
        {"_id":orderId},
        {"$set":{"orderStatus": status}},
        {new:true}
    )
    if(!updatedOrder){
        throw new Error(
            "Order not Found"
        )
    }
    return updatedOrder

}