import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';

import logo from '../assets/logo.svg'
import me from '../assets/thats me.jpg';
import bike from '../assets/bike.png'
import car from '../assets/11452724.png'
import auto from '../assets/tuktuk.png'
import LiveLocationMap from '../components/LiveLocation';

const Riding = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const ride = location.state?.ride; // Assuming ride details are passed via state

    const { socket } = useContext(SocketContext);

    socket.on('rideFinished', ()=>{
        navigate('/home');
    })

    // Temp for props 
    const props = {
        vehicleSelected: 'car'
    }
    return (
        <>
            <div className='h-screen w-screen relative flex flex-col overflow-hidden'>
                <Link to={'/'}><img src={logo} alt="logo" className='absolute top-0 left-0 w-30' /></Link>
                <Link to={'/home'}><i className="ri-home-5-line absolute top-0 right-0 text-4xl p-5"></i></Link>
                <div className='h-2/3 w-screen  z-[-1]'>
                    <LiveLocationMap height='100%' />
                </div>
                <div className='h-1/3 w-screen flex flex-col justify-between p-4 pb-2 bg-white'>
                    <div className='w-full flex justify-between items-center'>
                        <span className='flex items-center justify-center' >
                            <img src='https://imgs.search.brave.com/zJr-LDQTruHThQdmP3XXrvTK7M5qtkVNBSLNKNPwdyI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vb2xVMWZy/Q0lfcktPRDMtTkJX/RFBjcVRwZG44WURN/TlliMndWUTJUbXFs/TS9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTkw/TXk1bS9kR05rYmk1/dVpYUXZhbkJuL0x6/QXpMelEyTHpnekx6/azIvTHpNMk1GOUdY/ek0wTmpnei9PVFk0/TTE4MmJrRlFlbUpv/L2NGTnJTWEJpT0hC/dFFYZDEvWm10RE4y/TTFaVVEzZDFsMy9j/eTVxY0dj.jpeg' alt="" className='w-20 h-20 md:w-30 md:h-30 z-5 rounded-full object-cover' />
                            <img src={props.vehicleSelected === "car" ? car : props.vehicleSelected === "bike" ? bike : auto} alt="vehicle" className={`w-25 h-25 md:h-40 md:w-40 md:-ml-15 -ml-10 ${props.vehicleSelected === 'bike' ? "" : 'scale-x-[-1]'}`} />
                        </span>
                        <div className='flex flex-col items-end justify-center'>
                            <h2 className='text-md font-bold md:text-xl'>Ansh Kumar</h2>
                            <h4 className='text-sm font-medium md:text-lg'>PB10CQ6001</h4>
                            <h6 className='text-sm font-light md:text-md'>Maruti Suzuki Alto</h6>
                        </div>
                    </div>
                    <hr />
                    <div className='flex justify-between items-center'>
                        <div className='flex w-full justify-start font-bold gap-4 items-center'>
                            <i className="ri-map-pin-2-line"></i>
                            <div className='flex flex-col'>
                                <span className='font-semibold text-base'>{ride?.destination.split(",")[0]}</span>
                                <span className='font-light text-sm text-gray-600'>{ride?.destination.split(",").slice(1).join(",")}</span>
                            </div>
                        </div>
                        <div className='flex w-full justify-end font-bold gap-4 items-center'>
                            <i className="ri-bank-card-2-fill"></i>
                            <div className='flex flex-col'>
                                <span className='font-semibold text-base'>₹{ride?.fare}</span>
                                <span className='font-light text-sm text-gray-600'>Cash</span>
                            </div>
                        </div>
                    </div>
            
                    <button className='w-full bg-green-400 font-bold py-2 rounded-xl text-white' onClick={()=>{
                        navigate('/home');
                    }}>Go Home</button>
                </div>

            </div>
        </>
    )
}

export default Riding