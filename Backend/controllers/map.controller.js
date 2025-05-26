import {getAddressCoordinates} from '../services/map.service.js';
import { validationResult } from 'express-validator';
import { getDistanceTime as getDistanceTimeService, getSuggestions as getSuggestionsService } from '../services/map.service.js';

async function getCoordinates(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;
    if (!address) {
        return res.status(400).json({ error: 'Address query parameter is required.' });
    }

    try {
        const coordinates = await getAddressCoordinates(address);
        return res.status(200).json(coordinates);
    } catch (error) {
        
        return res.status(500).json({ error: error.message });
    }
}

// New controller for /get-distance
async function getDistanceTime(req, res, next) {
    const { origin, destination } = req.query;
    if (!origin || !destination) {
        return res.status(400).json({ error: 'Origin and destination query parameters are required.' });
    }
    try {
        const result = await getDistanceTimeService(origin, destination);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// New controller for /get-suggestions
async function getSuggestions(req, res, next) {
    const { q } = req.query;
    if (!q || q.length < 2) {
        return res.status(400).json({ error: 'Query parameter q is required and should be at least 2 characters.' });
    }
    try {
        const suggestions = await getSuggestionsService(q);
        res.json(suggestions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch suggestions.' });
    }
}

export { getCoordinates, getDistanceTime, getSuggestions };