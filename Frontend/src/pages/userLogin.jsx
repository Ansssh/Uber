import React, { useContext, useState } from "react";
import logo from '../assets/logo.svg';
import captainhat from '../assets/captain.svg';
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import axios from 'axios'

const userLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {user, setUser} = useContext(UserDataContext);
    const navi = useNavigate()
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <Link to={'/'}><img src={logo} alt="logo" className='absolute top-0 left-0 w-30' /></Link>
            <Link to={'/cap-login'} className="flex flex-col items-center justify-center absolute top-0 right-0 mt-3 mr-5">
                <img src={captainhat} alt="Captain" className="w-10"/>
                <span className="text-sm font-bold -m-2">Captain</span>
            </Link>
            

            <form action="" onSubmit={async (e)=>{
                e.preventDefault();
                const userData = {
                    email: email,
                    password: password
                }
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

                if(response.status === 200){
                    const data = response.data;
                    setUser(userData);
                    localStorage.setItem("token", data.token);
                    navi('/home');
                }
            }} className="bg-[#222233] sm:w-100 w-70 h-auto shadow-lg rounded-lg flex flex-col p-3 m-2">
                <div className="text-4xl font-extrabold text-center mb-8 text-white">Welcome Back!</div>
                <label htmlFor="name" className = "block text-sm font-medium text-[#c0c0c8] mb-1">Your Email</label>
                <input type='email' id="name" onChange={(e)=>{setEmail(e.target.value)}} value={email} className= {`bg-[#c0c0c8] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DDA15E] focus:border-[#BC6C25] focus:bg-white block w-full p-2.5 mb-2`} placeholder='email@example.co' required/>
                <label htmlFor="password" className="block text-sm font-medium text-[#c0c0c8] mb-1">Password</label>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password} className="bg-[#c0c0c8] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DDA15E] focus:border-[#BC6C25] focus:bg-white block w-full p-2.5 mb-2" required placeholder="123456789" />
                <button className="bg-[#1fbad6] rounded-lg shadow-sm text-white font-bold w-full p-2.5">Login</button>
            </form>
            <span className="font-bold">New here? <Link to={'/sign-up'} className="text-blue-500 underline">Sign Up</Link></span>
        </div>
    );
};

export default userLogin;
