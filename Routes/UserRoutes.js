import express from 'express';
import { AddItem, DeleteItem, UpdateQuantity, UserWishList, WishListProduct } from '../Controller/UserController.js';

const router = express.Router();

router.post('/wishList/:id',UserWishList)
router.get('/wishList',WishListProduct)
router.post('/cart',AddItem)
router.put('/cartUpdate',UpdateQuantity)
router.delete('/cartDelete',DeleteItem)


export default router