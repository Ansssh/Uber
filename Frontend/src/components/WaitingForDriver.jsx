import React from 'react'

import me from '../assets/thats me.jpg';
import bike from '../assets/bike.png'
import car from '../assets/11452724.png'
import auto from '../assets/tuktuk.png'

const WaitForDriver = (props) => {
    return (
        <div className='p-5 bg-white flex flex-col gap-3'>
            <h4 className='text-2xl font-bold'>Waiting for driver</h4>
            {/* <i onClick={() => {
                    props.setConfirmRidePanelOpen(false);
                    props.setVehiclePanelOpen(true);    
                }} className={`ri-arrow-down-wide-line ri-xl cursor-pointer absolute right-6 top-7 ${props.confirmRidePanelOpen ? "rotate-0" : 'rotate-180'}`}></i> */}

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
                    <span className='font-semibold text-base'>B-34/4446</span>
                    <span className='font-light text-sm text-gray-600'>Street 10, Durgapuri, Ludhiana</span>
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
            <hr />
            {/* <button className='w-full bg-green-400 font-bold py-2 rounded-xl text-white' onClick={()=>{
                    props.setConfirmRidePanelOpen(false);
                    props.setLookingForDriverPanelOpen(true);
                }}>Confirm</button> */}
        </div>
    )
}

export default WaitForDriver