import { createRides, getFare, getOtp, rideConfirmation, eStartRide, endRide } from "../services/ride.service.js";
import { validationResult } from "express-validator";
import { getCaptainsInRadius, getAddressCoordinates } from "../services/map.service.js";
import { sendMessageToSocketId } from "../socket.js";
import rideModel from "../models/ride.model.js";

async function createRide(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType, distance, duration } = req.body;

    if (!pickup || !destination || !vehicleType || !distance || !duration) {
        return res.status(400).json({ message: 'User, pickup, destination, vehicleType, distance, and duration are required.' });
    }
    try {
        const ride = await createRides(req.user._id, pickup, destination, vehicleType);
        const pickupCoordinates = await getAddressCoordinates(pickup);
        const destinationCoordinates = await getAddressCoordinates(destination);

        console.log('Pickup Coordinates:', pickupCoordinates);

        const captainsInRadius = await getCaptainsInRadius(pickupCoordinates.lat, pickupCoordinates.lon, 25);

        ride.otp = "";

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

        captainsInRadius.map((captain) => {
            sendMessageToSocketId(captain.socketId, {
                event: 'newRide',
                data: {
                    ...rideWithUser.toObject(),
                    duration,
                    distance,
                }
            });
        });

        // Send the response after all operations are complete
        res.status(201).json(ride);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

async function calcFare(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { pickup, destination } = req.query;

        if (!pickup || !destination) {
            return res.status(400).json({ message: 'Pickup and destination are required.' });
        }

        const fare = await getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }

}

async function confirmRide(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;
    console.log('Ride ID:', rideId); // Debugging rideId
    console.log('Captain:', req.cap); // Debugging captain

    if (!rideId) {
        return res.status(400).json({ message: 'Ride ID is required.' });
    }

    try {
        const ride = await rideConfirmation(rideId, req.cap);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'rideConfirmed',
            data: ride
        });
        return res.status(200).json(ride);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

async function startRide(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    console.log('Ride ID:', rideId); // Debugging rideId
    console.log('OTP:', otp); // Debugging OTP
    console.log('Captain:', req.cap); // Debugging captain

    if (!rideId || !otp) {
        return res.status(400).json({ message: 'Ride ID and OTP are required.' });
    }

    try {
        const ride = await eStartRide({ rideId, otp, captain: req.cap });
        if (!ride) {
            return res.status(404).json({ message: 'Ride not found or already started.' });
        }
        sendMessageToSocketId(ride.user.socketId, {
            event: 'rideStarted',
            data: ride
        });
        return res.status(200).json(ride);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}


// async function finishRide(req, res) {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { rideId } = req.body;

//     if (!rideId) {
//         return res.status(400).json({ message: 'Ride ID is required.' });
//     }

//     try {
//         const ride = await endRide(rideId, req.cap);

//         sendMessageToSocketId(ride.user.socketId, {
//             event: 'rideFinished',
//             data: ride
//         });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: error.message });
//     }
// }

async function finishRide(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    console.log("Received rideId:", rideId); // Debugging

    if (!rideId) {
        return res.status(400).json({ message: 'Ride ID is required.' });
    }

    try {
        const ride = await endRide({ rideId, captain: req.cap });

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found or invalid captain.' });
        }

        res.status(200).json(ride);
    } catch (error) {
        console.error("Error in finishRide:", error);
        return res.status(500).json({ message: error.message });
    }
}


export { createRide, calcFare, confirmRide, startRide, finishRide };