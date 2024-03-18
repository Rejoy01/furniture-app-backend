import Product from '../Model/productSchema.js';


export const UploadProduct= async (req,res) => {
    const {title,price,tag,category,color} = req.body

    try {
        
        const newProduct = new Product({
            title,
            price,
            tag,
            category,
            color
        })
        newProduct.save()
        res.status(200).json(newProduct)

    } catch (error) {
        console.log('Error in uploading product',error);
    }

}

export const DisplayAll = async (req, res) => {
  try {
    const Products = await Product.find();

    res.status(200).json(Products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
