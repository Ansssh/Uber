import { Server } from 'socket.io';
import usrModel from './models/user.model.js';
import captainModel from './models/captain.model.js';

let io;

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type'],
            credentials: true,
        },
    });
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            console.log(`User joined: ${userId}, Type: ${userType}`);

            if (userType === 'user') {
                await usrModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });

        socket.on('updateLocation-captain', async (data) => {
            const { captainId, location } = data;

            // console.log(`Captain ${captainId} updated location:`, location);

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            // Update the captain's location in the database
            console.log('Updating captain Location:', captainId, location);
            await captainModel.findByIdAndUpdate(captainId, {
                location: { type: 'Point', coordinates: [location.lng, location.ltd] }
            });

            if (io) {
                // Broadcast the updated location to all users
                io.emit('captainLocationUpdate', { captainId, location });
            } else {
                console.error('Socket.io is not initialized');
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};

function sendMessageToSocketId(socketId, messageObj) {
    if (io) {
        io.to(socketId).emit(messageObj.event, messageObj.data);
    } else {
        console.error('Socket.io is not initialized');
    }
}

export { initSocket, sendMessageToSocketId };