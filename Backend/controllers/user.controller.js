import usrModel from '../models/user.model.js';
import createUser from '../services/user.service.js';
import {validationResult} from 'express-validator';


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

export default registerUser;