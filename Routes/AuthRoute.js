import express from 'express';
import { LoginUser, registerUser } from '../Controller/AuthController.js';


const router = express.Router();

router.post('/',registerUser)
router.post('/login',LoginUser)


export default router