import usrModel from "../models/user.model.js";


export default async function createUser({firstname, lastname, email, password}) {
    if(!firstname || !email || !password){
        throw new Error("All Fields are Required!");
    }
    const user = usrModel.create({
        fullname:{
            firstname, lastname
        },
        email,password
    })
    return user;
}