
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
