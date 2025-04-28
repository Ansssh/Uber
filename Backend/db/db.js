import mongoose from 'mongoose';

export default function connectDB(){
    mongoose.connect(process.env.DB).then(()=>{console.log("Connected to DB")}).catch(err => console.error(err));
}