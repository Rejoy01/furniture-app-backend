import User from "../Model/userSchema.js";
import Product from "../Model/productSchema.js";
import order from "../Model/orderSchema.js";

export const OrderItem = async (req,res)=>{
    const {email, billingAddres , userId } = req.body

    try {
        const user  = await User.findById(userId)
        if (!user) {
            throw new Error('User not found')
        }

        const cartItems = user.cart;
        // console.log(cartItems);

        const total = cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
      
        if(cartItems.length === 0){
            throw new Error("Cart is empty")
        }
        const Order = new order({
            item: cartItems,
            billingAddres:billingAddres,
            user:{
                userId : userId,
                email : email
            },
            total:total
        })

        await Order.save()

        user.cart=[]

        await user.save()

        res.status(201).json({ message: 'Order created successfully', order: Order });

    } catch (error) {
        res.status(500).json({ message:error.message });
    }

}

export const GetAll = async (req,res)=>{
    const {userId} = req.body

    try {
        const user = await User.findById(userId)
        
        if(!user){
            throw new Error(`User Not found`)
        }

        const Orders = await order.find({"user.userId" :{$in : userId}})

        res.status(200).json(Orders)


    } catch (error) {
        return res.status(404).json({message: error.message})
    }
}