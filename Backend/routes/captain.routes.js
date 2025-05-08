import express from 'express';
const router = express.Router();
import { body } from 'express-validator';
import capController from '../controllers/captain.controller.js';


router.post('/register', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min:3}).withMessage("Too Short for a name!"),
    body('password').isLength({min:6}).withMessage("Atleast 6 characters Fella"),
    body('vehicle.color').isLength({min:3}).withMessage("isnt that color too small??"),
    body('vehicle.capacity').isInt({min:1}).withMessage("Where the passenger gonna sit?"),
    body('vehicle.plate').isLength({min:6}).withMessage("Premium?"),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'tuktuk', 'auto']).withMessage("Jhaaaj chuki Firda?")
], capController
)


export default router;