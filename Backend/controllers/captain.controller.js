import { validationResult } from 'express-validator';
import captainModel from '../models/captain.model.js';
import capService from "../services/captain.service.js";

async function registerCC(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(409).json({errors: errors.array()})
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


export default registerCC;