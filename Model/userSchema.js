import mongoose, { Schema } from "mongoose";

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
});

const orderSchema = new Schema({
  item: [cartitemSchema],
  total: {
    type: Number,
    required: true,
  },
  billingAddress: [
    {
      Fname: {
        type: String,
        required: true,
      },

      Lname: {
        type: String,
        required: true,
      },

      CompanyName: {
        type: String,
        required: true,
      },

      StreetAddress: {
        type: String,
        required: true,
      },

      townCity: {
        type: String,
        required: true,
      },

      stateCounty: {
        type: String,
        required: true,
      },

      zipCode: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email:{
        type: String,
        required: true
      },
      orderNotes:String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

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
  order: [orderSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", UserSchema);

export default User;
