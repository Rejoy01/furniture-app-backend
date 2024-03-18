import mongoose, { Schema } from 'mongoose';




const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  tag: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  review: [{
    rating: {
      type: Number,
    },
    comment: String,
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
});

const Product = mongoose.model('Product', productSchema);

export default Product;
