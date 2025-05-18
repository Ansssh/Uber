import React from 'react'
import logo from '../assets/logo.svg'
import { Link } from "react-router-dom";


const home = () => {
    return (
        <div className='h-screen relative flex'>
            <Link to={'/'}><img src={logo} alt="logo" className='absolute top-0 left-0 w-30' /></Link>

            <div className='h-screen w-screen'>
                <img src="https://i.pinimg.com/736x/50/22/54/50225400f92f997e401be3a8a19df77f.jpg" alt="img" className='h-full w-full object-cover ' />
            </div>
            <div className='bg-white absolute bottom-0 w-full sm:w-1/2 left-1/2 translate-x-[-50%] p-2 flex flex-col'>
                <h4>Find a Trip</h4>
                <form action="" className='flex flex-col'>
                    <input type="text" placeholder='Add a pickup location' />
                    <input type="text" placeholder='Enter your destination' />
                </form>
            </div>
        </div>
    )
}

export default home