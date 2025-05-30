import express from 'express';
const router = express.Router();
import {createRide, calcFare, confirmRide, startRide, finishRide} from '../controllers/ride.controller.js';
import { authUser, authCaptain } from '../middleware/auth.middleware.js';
import { body, query } from 'express-validator';

router.post('/create',authUser,[
    body('pickup').notEmpty().withMessage('Pickup location is required'),
    body('destination').notEmpty().withMessage('Destination is required'),
    body('vehicleType').notEmpty().withMessage('Vehicle type is required'),
    body('distance').isNumeric().withMessage('Distance must be a number'),
    body('duration').isNumeric().withMessage('Duration must be a number'),
], createRide);

router.get('/fare', authUser, [
    query('pickup').notEmpty().withMessage('Pickup location is required'),
    query('destination').notEmpty().withMessage('Destination is required'),
], calcFare);

router.post('/confirm', authCaptain, [
    body('rideId').isMongoId().withMessage('Ride ID is required'),
], confirmRide);

router.get('/startRide', authCaptain, [
    query('rideId').isMongoId().withMessage('Ride ID is required'),
    query('otp').isLength({ min: 4, max: 4 }).withMessage('OTP must be 4 digits')
], startRide)

router.post('/endRide', authCaptain, [
    body('rideId').isMongoId().withMessage('Ride ID is required'),
], finishRide);

export default router;