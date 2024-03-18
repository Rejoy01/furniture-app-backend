import express from 'express';
import { LoginUser, UserWishList, WishListProduct, registerUser } from '../Controller/AuthController.js';


const router = express.Router();

router.post('/',registerUser)
router.post('/login',LoginUser)
router.put('/wishList/:id',UserWishList)
router.get('/wishList',WishListProduct)

export default router