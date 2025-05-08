import mongo from 'mongoose'

import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const captainSchema = mongo.Schema({
    fullname: {
        firstname:{
            type: String,
            required: true,
            minlength: [3, "First Name should be atleast three characters long"]
        },
        lastname:{
            type: String,
            minlength: [3, "Last Name should be atleast three characters long"]
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please Enter a valid mail"]
    },
    password:{
        type:String,
        required: true,
        select: false
    },
    socketId:{
        type: String
    },
    status:{
        type:String,
        enum:['active', 'inactive'],
        default: "inactive"
    },
    vehicle:{
        color:{
            type: String,
            required: true
        },
        plate:{
            type: String,
            required: true,
            match: [/^[A-Z]{2}\s?[0-9]{1,2}\s?[A-Z]{1,3}\s?[0-9]{3,4}$/i, "Please Enter a Valid Number Plate"],
        },
        capacity: {
            type: Number, 
            required: true,
            min: [1, "Capacity must be atleast 1!"]
        },
        vehicleType:{
            type: String,
            required: true,
            enum: ["car", "bike", "tuktuk", "auto"],
            
        }
    },
    location:{
        lat:{
            type: Number,
        },
        lon:{
            type: Number
        }
    }
})

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWT, {expiresIn: '24h'})
    return token;
}

captainSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const captain = mongo.model('captain', captainSchema);

export default captain;