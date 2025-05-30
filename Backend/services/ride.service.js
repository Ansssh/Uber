import rideModel from "../models/ride.model.js";
import crypto from 'crypto';
import { getDistanceTime } from "../services/map.service.js";
import { sendMessageToSocketId } from "../socket.js";

async function createRides(user, pickup, destination, vehicleType) {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('User, pickup, destination, and vehicleType are required.');
    }
    const fare = await getFare(pickup, destination);
    if (!fare) {
        throw new Error('Could not calculate fare.');
    }
    const ride = new rideModel({
        user,
        pickup,
        destination,
        otp: getOtp(),
        fare: fare[vehicleType] || fare.car,

    });
    await ride.save();
    return ride;

}

function getOtp() {
    const otp = crypto.randomInt(1000, 9999).toString();
    return otp;
}

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required.');
    }
    const { distance, duration } = await getDistanceTime(pickup, destination);
    if (!distance || !duration) {
        throw new Error('Could not calculate distance and duration.');
    }
    const baseFares = {
        car: 50,
        auto: 30,
        motorcycle: 20
    };
    const perKmRates = {
        car: 15,
        auto: 10,
        motorcycle: 7
    };
    const perMinRates = {
        car: 2,
        auto: 1,
        motorcycle: 1
    };

    const vehicleTypes = ['car', 'auto', 'motorcycle'];
    const distanceKm = Math.ceil(distance / 1000);
    const durationMin = Math.ceil(duration / 60);

    const fare = {};
    vehicleTypes.forEach(type => {
        const baseFare = baseFares[type];
        const perKm = perKmRates[type];
        const perMin = perMinRates[type];
        fare[type] = Math.round(baseFare + (distanceKm * perKm) + (durationMin * perMin));
    });
    return fare;
}
// error
async function rideConfirmation(rideId, captain) {
    console.log('rideId:', rideId); // Log rideId
    console.log('captain:', captain); // Log captain

    if (!rideId || !captain) {
        throw new Error('Ride ID and Captain are required.');
    }
    await rideModel.findOneAndUpdate(
        { _id: rideId },
        {
            status: 'accepted',
            captain: captain._id,
        }
    );
    const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found.');
    }
    return ride;
}

async function eStartRide({ rideId, otp, captain }) {
    console.log("rideId:", rideId, "otp:", otp, "captain:", captain);
    if (!rideId || !otp || !captain) {
        throw new Error('Ride ID, OTP, and Captain are required.');
    }
    const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');
    if (!ride) {
        throw new Error('Ride not found or invalid OTP.');
    }
    if (ride.otp !== otp) {
        throw new Error('Invalid OTP.');
    }
    if (ride.status !== 'accepted') {
        throw new Error('Ride is not accepted or already started.');
    }
    await rideModel.findOneAndUpdate(
        { _id: rideId },
        {
            status: 'ongoing',
        }
    );
    sendMessageToSocketId(ride.user.socketId, {
        event: 'rideStarted',
        data: ride
    });
    return ride;
}

// async function endRide({ rideId, captain }) {
//     if (!rideId) {
//         throw new Error('Ride ID is required.');
//     }

//     const ride = await rideModel.findOne({
//         _id: rideId,
//         captain: captain._id,
//     }).populate('user').populate('captain').select('+otp');


//     if (!ride) {
//         throw new Error('Ride not found or invalid captain.');
//     }

//     if (ride.status !== 'ongoing') {
//         throw new Error('Ride is not ongoing or already completed.');
//     }

//     await rideModel.findOneAndUpdate(
//         { _id: rideId },
//         {
//             status: 'completed',
//         }
//     );

//     return ride;
// }

async function endRide({ rideId, captain }) {
    console.log("Ending ride with ID:", rideId); // Debugging
    console.log("Captain ID:", captain._id); // Debugging

    if (!rideId) {
        throw new Error('Ride ID is required.');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id,
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found or invalid captain.');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride is not ongoing or already completed.');
    }

    await rideModel.findOneAndUpdate(
        { _id: rideId },
        {
            status: 'completed',
        }
    );

    return ride;
}
export { createRides, getFare, getOtp, rideConfirmation, eStartRide, endRide };