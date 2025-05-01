import mongoose from 'mongoose';

import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const usrSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First Name Must be atleast 3 Chars or Long"]
        },
        lastname:{
            type: String,
            minlength: [3, "Last Name Must be atleast 3 Chars or Long"]
        }
    },
    email: {
        type: String,
        required: true,
        minlength: [8, "Email must have a name"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId:{
        type: String
    }
})

usrSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWT, {expiresIn: '24h'})
    return token;
}

usrSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

usrSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const usrModel = mongoose.model('user', usrSchema);

export default usrModel;