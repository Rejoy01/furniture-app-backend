import express from 'express';

const router = express.Router();

router.post('/wishList/:id',UserWishList)
router.get('/wishList',WishListProduct)

export default router