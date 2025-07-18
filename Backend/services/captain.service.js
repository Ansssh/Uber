import captain from '../models/captain.model.js';

const createCaptain = async ({
    firstname, lastname,email, password, color, plate, capacity, vehicleType
})=>{
    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error("All Fields are required!");
    }
    const capt = await captain.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    return capt;
}

export default createCaptain;