import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import cartitemSchema from "./cartItemSchema.js";

const orderSchema = new Schema({
  user: {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
  },
  orderId: {
    type: String,
    unique: true,
    required: true,
  },
  item: [cartitemSchema],
  total: {
    type: Number,
    required: true,
  },
  billingAddres: [
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
      email: {
        type: String,
        required: true,
      },
      orderNotes: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.pre("save", function (next) {
  if (!this.orderId) {
    this.orderId = uuidv4();
  }
  next();
});

const order = mongoose.model("order", orderSchema);

export default order;
