import React from 'react'
import { Link } from 'react-router-dom';

import logo from '../assets/logo.svg'
import me from '../assets/thats me.jpg';
import bike from '../assets/bike.png'
import car from '../assets/11452724.png'
import auto from '../assets/tuktuk.png'

const Riding = () => {
    // Temp for props 
    const props = {
        vehicleSelected: 'car'
    }
    return (
        <>
            <div className='h-screen w-screen relative flex flex-col overflow-hidden'>
                <Link to={'/'}><img src={logo} alt="logo" className='absolute top-0 left-0 w-30' /></Link>
                <Link to={'/home'}><i className="ri-home-5-line absolute top-0 right-0 text-4xl p-5"></i></Link>
                <div className='h-1/2 w-screen'>
                    <img
                        src="https://i.pinimg.com/736x/50/22/54/50225400f92f997e401be3a8a19df77f.jpg"
                        alt="img"
                        className='h-full w-full object-cover'
                    />
                </div>
                <div className='h-1/2 w-screen flex flex-col justify-between p-4 pb-2'>
                    <div className='w-full flex justify-between items-center'>
                        <span className='flex items-center justify-center' >
                            <img src={me} alt="" className='w-20 h-20 md:w-30 md:h-30 z-5 rounded-full object-cover' />
                            <img src={props.vehicleSelected === "car" ? car : props.vehicleSelected === "bike" ? bike : auto} alt="vehicle" className={`w-25 h-25 md:h-40 md:w-40 md:-ml-15 -ml-10 ${props.vehicleSelected === 'bike' ? "" : 'scale-x-[-1]'}`} />
                        </span>
                        <div className='flex flex-col items-end justify-center'>
                            <h2 className='text-md font-bold md:text-xl'>Ansh Kumar</h2>
                            <h4 className='text-sm font-medium md:text-lg'>PB10CQ6001</h4>
                            <h6 className='text-sm font-light md:text-md'>Maruti Suzuki Alto</h6>
                        </div>
                    </div>
                    <hr />
                    <div className='flex w-full justify-start font-bold gap-4 items-center'>
                        <i className="ri-map-pin-2-line"></i>
                        <div className='flex flex-col'>
                            <span className='font-semibold text-base'>Modi Fabrics</span>
                            <span className='font-light text-sm text-gray-600'>Street 5, New Shivpuri, Ludhiana</span>
                        </div>
                    </div>
                    <hr />
                    <div className='flex w-full justify-start font-bold gap-4 items-center'>
                        <i className="ri-bank-card-2-fill"></i>
                        <div className='flex flex-col'>
                            <span className='font-semibold text-base'>$69</span>
                            <span className='font-light text-sm text-gray-600'>Cash</span>
                        </div>
                    </div>
            
                    <button className='w-full bg-green-400 font-bold py-2 rounded-xl text-white'>Proceed With Payment</button>
                </div>

            </div>
        </>
    )
}

export default Riding