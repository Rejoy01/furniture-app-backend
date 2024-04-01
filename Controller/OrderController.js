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
        const shippingCharge = 50
        const tax = 100
         
        const Subtotal = user.cart.reduce((acc, cartItem) => acc + cartItem.subTotal, 0);
        
        
        const total = Subtotal + shippingCharge + tax;
        
      
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
            total:parseInt(total),
            subTotal: Subtotal
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
            throw new Error(`invalid user`)

        }

        const Orders = await order.find({"user.userId" :{$in : userId}})

        res.status(200).json(Orders)


    } catch (error) {
        return res.status(404).json({message: error.message})
    }
}

export const Orders = async (req, res) => {
    const {id}=req.params
    console.log(id);
    try {
        const Order = await order.findById(id)
        
        const ProductId = Order.item.map((item) => item.product)
        const Products = await Product.find({_id:{$in : ProductId}})
        if (!Order) {
            throw new Error("Order not found")
        }
        const response = {
            order:Order,
            Product : Products
        }
        res.status(200).json(response)
        return response
        
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}