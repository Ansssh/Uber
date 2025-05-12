import express from 'express';
const router = express.Router();
import {registerUser, loginUser, getUserProfile, logoutUser} from '../controllers/user.controller.js';
import {authUser} from '../middleware/auth.middleware.js';

import { body } from 'express-validator';

router.post('/register', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min:3}).withMessage("Too Short for a name!"),
    body('password').isLength({min:6}).withMessage("Atleast 6 characters Fella")
],registerUser)


router.post('/login',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage("Atleast 6 characters Fella")
], loginUser)


router.get('/profile', authUser, getUserProfile)

router.get('/logout', authUser, logoutUser);

export default router;