import { validationResult } from 'express-validator';
import captainModel from '../models/captain.model.js';
import capService from "../services/captain.service.js";
import blackList from '../models/blacklist.token.js';


async function registerCC(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {fullname, email, password, vehicle} = req.body;

    const isCaptainAlreadyExisting = await captainModel.findOne({email});
    if(isCaptainAlreadyExisting){
        return res.status(401).json({message: "Captain already exists"});
    }
    const hashedPass = await captainModel.hashPassword(password);
    const cap = await capService({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPass,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    })

    const token = cap.generateAuthToken();
    res.status(201).json({token, cap});
}

async function loginCC(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({errors: errors.array()})
    }
    const {email, password} = req.body;
    const cap = await captainModel.findOne({email}).select('+password')
    if(!cap){
        return res.status(401).json({message: "invalid stuff"})
    }
    const isMatch = await cap.comparePassword(password);
    if(!isMatch){
        res.status(401).json({message: "password no mech"});
    }

    const token = cap.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({token, cap});

}

async function getCCProfile(req, res, next) {
    return res.status(200).json({ captain: req.cap});
}

async function logoutCC(req, res, next){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await blackList.create({token});
    res.clearCookie('token');

    res.status(200).json({message: 'logged Out'})
}


export {registerCC, loginCC, getCCProfile, logoutCC};