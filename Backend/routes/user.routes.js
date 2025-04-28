import express from 'express';
const router = express.Router();
import userController from '../controllers/user.controller.js';

import { body } from 'express-validator';

router.post('/register', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min:3}).withMessage("Too Short for a name!"),
    body('password').isLength({min:6}).withMessage("Atleast 6 characters Fella")
],userController)

export default router;