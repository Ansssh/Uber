import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import logo from '../assets/logo.svg'
import FinishRide from '../components/FinishRide';
import LiveLocationMap from '../components/LiveLocation';

const CaptainRiding = () => {
    const finishRidePopupRef = useRef(null);
    const [finishRidePopup, setFinishRidePopup] = useState(false)


    useGSAP(()=>{
        if(finishRidePopup){
            gsap.to(finishRidePopupRef.current, {
                y: '0%',
            })
        }else{
            gsap.to(finishRidePopupRef.current, {
                y: '100%',
            })
        }
    },[finishRidePopup])

    return (
        <>
            <div className='h-screen w-screen relative flex flex-col overflow-hidden'>
                <Link to={'/'}><img src={logo} alt="logo" className='absolute top-0 left-0 w-30' /></Link>
                <Link to={'/cap/logout'}><i className="ri-logout-box-r-line absolute top-0 right-0 text-4xl p-5"></i></Link>
                <div className='h-6/7 w-screen -z-1'>
                    {/* <img
                        src="https://i.pinimg.com/736x/50/22/54/50225400f92f997e401be3a8a19df77f.jpg"
                        alt="img"
                        className='h-full w-full object-cover'
                    /> */}
                    <LiveLocationMap></LiveLocationMap>
                </div>
                <div className='h-1/7 w-screen bg-green-100 p-4 flex flex-col justify-center'>
                    <button className='w-full bg-blue-200 p-2 rounded-xl' onClick={()=> {setFinishRidePopup(true)}}>Complete Ride</button>
                </div>

                <div ref={finishRidePopupRef} className='translate-y-full absolute bottom-0 bg-white w-screen justify-between p-4 flex flex-col pt-0 gap-3'>
                    <FinishRide setFinishRidePopup={setFinishRidePopup}/>
                </div>
            </div>
        </>
    )
}

export default CaptainRiding