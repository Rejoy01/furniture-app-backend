import { Schema } from "mongoose";

const cartitemSchema = new Schema({
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    price:{
      type:Number,
      required:true
    },
    subTotal:{
      type : Number ,
    }
  });

export default cartitemSchema;
  