import userModel from '../models/user.model.js';
import captainModel from '../models/captain.model.js';
import blackListModel from '../models/blacklist.token.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


async function authUser(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(601).json({message: "Unauthorized"});
    }

    const isBlackListed = await blackListModel.findOne({token: token});

    if(isBlackListed){
        return res.status(602).json({message: "Unauthorized"});
    }

    try{
        const decode = jwt.verify(token, process.env.JWT);
        const user = await userModel.findById(decode._id);
        req.user = user;

        return next();

    } catch (e) {
        return res.status(603).json({message: "Unauthorized"});
    }
}


async function authCaptain(req, res, next){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(601).json({message: "Unauthorized"});
    }

    const isBlackListed = await blackListModel.findOne({token: token});

    if(isBlackListed){
        return res.status(602).json({message: "Unauthorized"});
    }
    try{
        const decode = jwt.verify(token, process.env.JWT);
        const captain = await captainModel.findById(decode._id);
        req.cap = captain;

        return next();

    } catch (e) {
        return res.status(603).json({message: "Unauthorized"});
    }
}

export {authUser, authCaptain};