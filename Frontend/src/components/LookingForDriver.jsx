import React, { useState, useEffect } from 'react'

import bike from '../assets/bike.png'
import car from '../assets/11452724.png'
import auto from '../assets/tuktuk.png'

const LookingForDriver = (props) => {
    const [title, setTitle] = useState("Looking For Driver...");

    // useEffect(() => {
    //     const titleTimer = setTimeout(() => {
    //         setTitle("Driver Found! Redirecting...");
    //     }, 10000);

    //     const redirectTimer = setTimeout(() => {
    //         props.setLookingForDriverPanelOpen(false);
    //         props.setwaitForDriverPanel(true);
    //     }, 20000);
    //     return () => {
    //         clearTimeout(titleTimer);
    //         clearTimeout(redirectTimer);
    //     };
    // }, []); 

    return (
        <>
            <div className='p-5 bg-white flex flex-col gap-3'>
                <h4 className='text-2xl font-bold'>{title}</h4>
                {/* <i onClick={() => {
                            props.setConfirmRidePanelOpen(false);
                            props.setVehiclePanelOpen(true);    
                        }} className={`ri-arrow-down-wide-line ri-xl cursor-pointer absolute right-6 top-7 ${props.confirmRidePanelOpen ? "rotate-0" : 'rotate-180'}`}></i> */}
                <div className='w-full flex justify-center'>
                    <img src={props.vehicleSelected === "car" ? car : props.vehicleSelected === "bike" ? bike : auto} alt="vehicle" className='w-1/2 sm:w-1/3' />
                </div>
                <hr />
                <div className='flex w-full justify-start font-bold gap-4 items-center'>
                    <i className="ri-map-pin-2-line"></i>
                    <div className='flex flex-col'>
                        <span className='font-semibold text-base'>{props.location.split(",")[0]}</span>
                        <span className='font-light text-sm text-gray-600'>{props.location.split(",").slice(0).join().length > 50 ? <>{props.location.split(",").slice(1).join().substring(0, 50)}...</> : <>{props.location.split(",").slice(0).join()}</>}</span>
                    </div>
                </div>
                <hr />
                <div className='flex w-full justify-start font-bold gap-4 items-center'>
                    <i className="ri-map-pin-2-line"></i>
                    <div className='flex flex-col'>
                        <span className='font-semibold text-base'>{props.destination.split(",")[0]}</span>
                        <span className='font-light text-sm text-gray-600'>{props.destination.split(",").slice(0).join().length > 50 ? <>{props.destination.split(",").slice(1).join().substring(0, 50)}...</> : <>{props.destination.split(",").slice(0).join()}</>}</span>
                    </div>
                </div>
                <hr />
                <div className='flex w-full justify-start font-bold gap-4 items-center'>
                    <i className="ri-bank-card-2-fill"></i>
                    <div className='flex flex-col'>
                        <span className='font-semibold text-base'>₹{props.money}</span>
                        <span className='font-light text-sm text-gray-600'>Cash</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LookingForDriver