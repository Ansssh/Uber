import express from 'express';
const router = express.Router();
import { authUser } from '../middleware/auth.middleware.js';
import { getCoordinates, getDistanceTime, getSuggestions } from '../controllers/map.controller.js';
import axios from 'axios';

router.get('/get-coordinates', authUser, getCoordinates);
router.get('/get-distance', authUser, getDistanceTime);
router.get('/get-suggestions', authUser, getSuggestions);

export default router;