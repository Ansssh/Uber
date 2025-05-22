import React from 'react'

import bike from '../assets/bike.png'
import car from '../assets/11452724.png'
import auto from '../assets/tuktuk.png'

const VehicleListPanel = (props) => {
    return (
        <>
            <div className='p-5 bg-white flex flex-col gap-3'>
                <h4 className='text-2xl font-bold'>Choose a vehicle</h4>
                <i onClick={() => { props.setVehiclePanelOpen(false) }} className={`ri-arrow-down-wide-line ri-xl cursor-pointer absolute right-6 top-7 ${props.vehiclePanelOpen ? "rotate-0" : 'rotate-180'}`}></i>
                <div className='flex justify-between items-center border-2 border-transparent hover:border-black rounded-xl' onClick={()=>{
                    props.setConfirmRidePanelOpen(true);
                    props.setVehiclePanelOpen(false);
                    props.setVehicleSelected('car');
                }}>
                    <img src={car} alt="car" className='sm:w-20 w-12 mx-3' />
                    <div className='basis-full py-2'>
                        <h4 className='text-sm font-bold'>Uber Go <span className='text-sm'><i className="ri-user-fill"></i>4</span></h4>
                        <h5 className='text-xs'>2 mins away</h5>
                        <p className='text-xs'>Affordable, Compact Ride</p>
                    </div>
                    <h2 className='sm:text-2xl text-lg font-semibold mr-2'>$25.69</h2>
                </div>
                <div className='flex justify-between items-center border-2 border-transparent hover:border-black rounded-xl' onClick={()=>{
                    props.setConfirmRidePanelOpen(true);
                    props.setVehiclePanelOpen(false);
                    props.setVehicleSelected('bike');
                }}>
                    <img src={bike} alt="car" className='sm:w-20 w-12 mx-3' />
                    <div className='basis-full py-2'>
                        <h4 className='text-sm font-bold'>Uber Moto <span className='text-sm'><i className="ri-user-fill"></i>1</span></h4>
                        <h5 className='text-xs'>7 mins away</h5>
                        <p className='text-xs'>Affordable, Motorcycle Ride</p>
                    </div>
                    <h2 className='sm:text-2xl text-lg font-semibold mr-2'>$5.69</h2>
                </div>
                <div className='flex justify-between items-center border-2 border-transparent hover:border-black rounded-xl' onClick={()=>{
                    props.setConfirmRidePanelOpen(true);
                    props.setVehiclePanelOpen(false);
                    props.setVehicleSelected('auto');
                }}>
                    <img src={auto} alt="tuktuk" className='sm:w-20 w-12 mx-3' />
                    <div className='basis-full py-2'>
                        <h4 className='text-sm font-bold'>Uber Auto<span className='text-sm'><i className="ri-user-fill"></i>2-3</span></h4>
                        <h5 className='text-xs'>4 mins away</h5>
                        <p className='text-xs'>Affordable, tuktuk Ride</p>
                    </div>
                    <h2 className='sm:text-2xl text-lg font-semibold mr-2'>$10.69</h2>
                </div>
            </div>
        </>
    )
}

export default VehicleListPanel