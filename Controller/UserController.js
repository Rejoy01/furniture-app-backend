
import User from "../Model/userSchema.js";
import Product from "../Model/productSchema.js";


export const UserWishList = async (req, res) => {
    const id = req.params.id;
    const {email} = req.body
    try {
        const user = await User.findOne({email:email});
        const CheckProduct = user.wishlist.includes(id)
        if (!CheckProduct) {
            await user.updateOne({$push:{wishlist:id}})
            res.status(200).json(user)
        }else{
            await user.updateOne({$pull:{wishlist:id}})
            res.status(200).json(user)
        }
    } catch (error) {
        res.status(500).json(error)
    }
};

export const WishListProduct = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const ProductIds = user.wishlist;
      const Products = await Product.find({ _id: { $in: ProductIds } });
      res.status(200).json(Products);
    } else {
      throw new Error("User not Found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const AddItem = async (req, res) => {

    const {userId , productId,quantity} = req.body;
    const parsedQuantity = parseInt(quantity);
    try {
        const user = await User.findById(userId);
        if (user) {
            const CheckProduct = await Product.findById(productId)
            if(!CheckProduct) {
                res.status(404).json({ message:"product not found"})
            }
            const existingItemIndex = user.cart.findIndex(item => item.product.toString() === productId);
                if(existingItemIndex !==-1){
                user.cart[existingItemIndex].quantity += parsedQuantity
                 }else{
                user.cart.push({product : productId,quantity})
                }
            await user.save()

            res.status(200).json(user)
            
        }
    } catch (error) {
        console.log("error in adding item");
        res.status(500).json({ message: error.message });
    }

}

export const UpdateQuantity = async (req, res) => {
        const { quantity,productId ,userId} = req.body

        try {
            const user = await User.findById(userId)
            if(!user){
                throw new Error("User not Found")
            }
            const CheckCart = user.cart.find(item => item.product.toString() == productId)
            if(!CheckCart){
                res.status(404).json({ message: 'Item not found in cart' });
            }
            
            CheckCart.quantity = quantity
            await user.save()

            res.status(200).json(user)
        } catch (error) {
            console.log("Error in update cart quantity");
            res.status(500).json({message: error.message})
        }

} 
