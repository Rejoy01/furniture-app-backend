import mongoose, { Schema } from 'mongoose';

const cartitemSchema = new Schema({
    product:{
        type  : Schema.Types.ObjectId,
        ref:'Product',
        required : true,
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    }
})

const orderSchema = new Schema({
    item:[cartitemSchema],
    total:{
        type:Number,
        required : true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const UserSchema = mongoose.Schema({
    username:{
        type : String,
        required:true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    wishlist:[{
        type:Schema.Types.ObjectId,
        ref:'Product'
    }],
    createdAt:{
        type:Date,
        default:Date.now
    },
    cart:[cartitemSchema],
    order:[orderSchema],
    createdAt:{
        type:Date,
        default : Date.now
    }
})

const User = mongoose.model('user',UserSchema);

export default User;