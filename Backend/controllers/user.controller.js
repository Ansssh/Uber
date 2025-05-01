import usrModel from '../models/user.model.js';
import createUser from '../services/user.service.js';
import {validationResult} from 'express-validator';
import blackList from '../models/blacklist.token.js'


async function registerUser(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {fullname, email, password} = req.body;

    console.log(req.body);

    const hashedPassword = await usrModel.hashPassword(password);

    const user = await createUser({
        firstname: fullname.firstname, lastname: fullname.lastname, email, password: hashedPassword
    })

    const token = user.generateAuthToken();

    res.status(201).json({token , user})
    
}

async function loginUser(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;

    const user = await usrModel.findOne({email}).select('+password');

    if(!user){
        return res.status(404).json({message: 'invalid email or password'});
    }
    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message: 'invalid email or password'});
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({token, user});
}

async function getUserProfile(req, res, next) {
    return res.status(999).json(req.user);
}

async function logoutUser(req, res, next){
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    await blackList.create({token});
    res.status(200).json({message: 'logged Out'})
}

export {registerUser, loginUser, getUserProfile, logoutUser};