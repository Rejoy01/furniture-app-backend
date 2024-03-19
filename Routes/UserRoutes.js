import express from 'express';
import { AddItem, UserWishList, WishListProduct } from '../Controller/UserController.js';

const router = express.Router();

router.post('/wishList/:id',UserWishList)
router.get('/wishList',WishListProduct)
router.post('/cart',AddItem)


export default router