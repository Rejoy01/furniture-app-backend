import mongoose, { Schema } from "mongoose";

import cartitemSchema from "./cartItemSchema.js";


const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  cart: [cartitemSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  Fname:String,
  Lname:String,
  Display:String,
});


const User = mongoose.model("user", UserSchema);

export default User;
