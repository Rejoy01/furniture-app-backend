import express from 'express';
import { AddItem, UpdateQuantity, UserWishList, WishListProduct } from '../Controller/UserController.js';

const router = express.Router();

router.post('/wishList/:id',UserWishList)
router.get('/wishList',WishListProduct)
router.post('/cart',AddItem)
router.put('/cartUpdate',UpdateQuantity)


export default router