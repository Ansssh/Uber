import React, { useState } from 'react'
import logo from '../assets/logo.svg';
import userAvatar from '../assets/user.svg';
import { Link } from "react-router-dom";


const captainSignup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState({});

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <Link to={'/'}><img src={logo} alt="logo" className='absolute top-0 left-0 w-30' /></Link>
            {/* <Link to={'/login'} className="flex flex-col items-center justify-center absolute top-0 right-0 mt-3 mr-5">
                <img src={userAvatar} alt="User" className="w-10" />
                <span className="text-sm font-bold -m-1">User</span>
            </Link> */}


            <form action="" onSubmit={(e) => {
                e.preventDefault();
                setUserData({
                    fullName:{
                        firstName:fname, 
                        lastName: lname, 
                    },
                    email: email, 
                    password: password 
                });
                console.log(userData);
            }} className="bg-[#222233] sm:w-100 w-75 h-auto shadow-lg rounded-lg flex flex-col p-3 m-2">
                <div className="text-4xl font-extrabold text-center mb-8 text-white">Captain Aboard!</div>
                <label htmlFor="fname" className="block text-sm font-medium text-[#c0c0c8] mb-2">Whats your name</label>

                <div className='flex gap-4'>
                    <input type='text' id="fname" onChange={(e) => { setFname(e.target.value) }} value={fname} className={`bg-[#c0c0c8] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DDA15E] focus:border-[#BC6C25] focus:bg-white block w-1/2 p-2.5 mb-2`} placeholder='First name' required />
                    <input type='text' id="lname" onChange={(e) => { setLname(e.target.value) }} value={lname} className={`bg-[#c0c0c8] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DDA15E] focus:border-[#BC6C25] focus:bg-white block w-1/2 p-2.5 mb-2`} placeholder='Last name' />
                </div>
                <label htmlFor="mail" className="block text-sm font-medium text-[#c0c0c8] mb-1">Your Email</label>
                <input type='email' id="mail" onChange={(e) => { setEmail(e.target.value) }} value={email} className={`bg-[#c0c0c8] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DDA15E] focus:border-[#BC6C25] focus:bg-white block w-full p-2.5 mb-2`} placeholder='email@example.co' required />
                <label htmlFor="password" className="block text-sm font-medium text-[#c0c0c8] mb-1">Password</label>
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} value={password} className="bg-[#c0c0c8] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DDA15E] focus:border-[#BC6C25] focus:bg-white block w-full p-2.5 mb-2" required placeholder="123456789" />
                <button className="bg-[#1fbad6] rounded-lg shadow-sm text-white font-bold w-full p-2.5">Login</button>
            </form>
            <span className="font-bold">Already have an account? <Link to={'/cap-login'} className="text-blue-500 underline">Log in</Link></span>
            <p className='sm:text-[12px] text-[9px] absolute bottom-3'>By registering you're accepting our privacy policy</p>
        </div>
    );
}

export default captainSignup