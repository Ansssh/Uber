import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import logo from '../assets/logo.svg'
import me from '../assets/thats me.jpg';
import bike from '../assets/bike.png'
import car from '../assets/11452724.png'
import auto from '../assets/tuktuk.png'
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopup from '../components/ConfirmRidePopup';

const captainHome = () => {
    const captainDetailsRef = useRef(null);
    const ridePopUpRef = useRef(null);

    const [captainDetailsPanel, setCaptainDetailsPanel] = useState(true);
    const [ridePopUpPanel, setRidePopUpPanel] = useState(false);

    const confirmRidePopUpRef = useRef(null);
    const [confirmRidePopUpPanel, setconfirmRidePopUpPanel] = useState(false);

    useGSAP(()=>{
        if(captainDetailsPanel){
            gsap.to(captainDetailsRef.current, {
                y: '0%',
            })
        }else{
            gsap.to(captainDetailsRef.current, {
                y: '100%',
            })
        }
    },[captainDetailsPanel])

    useGSAP(()=>{
        if(confirmRidePopUpPanel){
            gsap.to(confirmRidePopUpRef.current, {
                y: '0%',
            })
        }else{
            gsap.to(confirmRidePopUpRef.current, {
                y: '100%',
            })
        }
    },[confirmRidePopUpPanel])

    useGSAP(()=>{
        if(ridePopUpPanel){
            gsap.to(ridePopUpRef.current, {
                y: '0%',
            })
        }else{
            gsap.to(ridePopUpRef.current, {
                y: '100%',
            })
        }
    },[ridePopUpPanel])

    useEffect(() => {
        setTimeout(() => {
            setRidePopUpPanel(true);
            setCaptainDetailsPanel(false);
        }, 5000)
    }, [])


    return (
        <>
            <div className='h-screen w-screen relative flex flex-col overflow-hidden'>
                <Link to={'/'}><img src={logo} alt="logo" className='absolute top-0 left-0 w-30' /></Link>
                <Link to={'/cap/logout'}><i className="ri-logout-box-r-line absolute top-0 right-0 text-4xl p-5"></i></Link>
                <div className='h-3/5 w-screen'>
                    <img
                        src="https://i.pinimg.com/736x/50/22/54/50225400f92f997e401be3a8a19df77f.jpg"
                        alt="img"
                        className='h-full w-full object-cover'
                    />
                </div>
                <div ref={captainDetailsRef} className='h-2/5 translate-y-0 w-screen flex flex-col justify-between p-4'>
                    <CaptainDetails />
                </div>

                <div ref={ridePopUpRef} className='h-2/5 translate-y-full absolute bottom-0 bg-white w-screen justify-between p-4 flex flex-col pt-0'>
                    <RidePopUp setConfirmRidePopUpPanel={setconfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel} setCaptainDetailsPanel={setCaptainDetailsPanel}/>
                </div>

                <div ref={confirmRidePopUpRef} className='h-screen translate-y-full absolute bottom-0 bg-white w-screen justify-between p-4 flex flex-col pt-0'>
                    <ConfirmRidePopup setConfirmRidePopUpPanel={setconfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel} setCaptainDetailsPanel={setCaptainDetailsPanel}/>
                </div>



            </div>
        </>
    )
}

export default captainHome