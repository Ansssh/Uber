import React from 'react'

import me from '../assets/thats me.jpg';
import bike from '../assets/bike.png'
import car from '../assets/11452724.png'
import auto from '../assets/tuktuk.png'

// {
//     "_id": "683554a26f430753a16077a0",
//     "user": {
//         "fullname": {
//             "firstname": "test",
//             "lastname": "testo"
//         },
//         "_id": "6826f2c3dd2c547003a67d21",
//         "email": "test@test.co",
//         "__v": 0,
//         "socketId": "hhXp9-Uoems7aw7uAAAN"
//     },
//     "pickup": "Ludhiana, Ludhiana (West) Tahsil, Ludhiana, Punjab, 141001, India",
//     "destination": "Delhi, India",
//     "fare": 5308,
//     "status": "accepted",
//     "__v": 0,
//     "captain": "682f2822bbd4a340f6ef23f7"
// }

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
                    <img src=''https://imgs.search.brave.com/zJr-LDQTruHThQdmP3XXrvTK7M5qtkVNBSLNKNPwdyI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vb2xVMWZy/Q0lfcktPRDMtTkJX/RFBjcVRwZG44WURN/TlliMndWUTJUbXFs/TS9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTkw/TXk1bS9kR05rYmk1/dVpYUXZhbkJuL0x6/QXpMelEyTHpnekx6/azIvTHpNMk1GOUdY/ek0wTmpnei9PVFk0/TTE4MmJrRlFlbUpv/L2NGTnJTWEJpT0hC/dFFYZDEvWm10RE4y/TTFaVVEzZDFsMy9j/eTVxY0dj.jpeg' alt="" className='w-20 h-20 md:w-30 md:h-30 z-5 rounded-full object-cover' />
                    <img src={props.vehicleSelected === "car" ? car : props.vehicleSelected === "bike" ? bike : auto} alt="vehicle" className={`w-25 h-25 md:h-40 md:w-40 md:-ml-15 -ml-10 ${props.vehicleSelected === 'bike' ? "" : 'scale-x-[-1]'}`} />
                </span>
                <div className='flex flex-col items-end justify-center'>
                    <h2 className='text-md font-bold md:text-xl capitalize'>{props.ride?.captain.fullname.firstname} {props.ride?.captain.fullname.lastname}</h2>
                    <h4 className='text-sm font-medium md:text-lg'>{props.ride?.captain.vehicle.plate}</h4>
                    <h6 className='text-sm font-light md:text-md'>{props.ride?.captain.vehicle.color} {props.vehicleSelected}</h6>
                </div>
            </div>
            <hr />
            <div className='flex w-full justify-start font-bold gap-4 items-center'>
                <i className="ri-map-pin-2-line"></i>
                <div className='flex flex-col'>
                    <span className='font-semibold text-base'>{props.ride?.pickup.split(",")[0]}</span>
                    <span className='font-light text-sm text-gray-600'>{props.ride?.pickup.split(",").slice(1).join(", ")}</span>
                </div>
            </div>
            <hr />
            <div className='flex w-full justify-start font-bold gap-4 items-center'>
                <i className="ri-map-pin-2-line"></i>
                <div className='flex flex-col'>
                    <span className='font-semibold text-base'>{props.ride?.destination.split(',')[0]}</span>
                    <span className='font-light text-sm text-gray-600'>{props.ride?.destination.split(',').slice(1).join(",")}</span>
                </div>
            </div>
            <hr />
            <div className='flex w-full justify-between font-bold gap-4 items-center'>
                <div className='flex gap-2 items-center'>
                    <i className="ri-bank-card-2-fill"></i>
                    <div className='flex flex-col text-center'>
                        <span className='font-semibold text-base'>₹{props.ride?.fare}</span>
                        <span className='font-light text-sm text-gray-600'>Cash</span>
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <i className="ri-dice-4-line"></i>
                    <div className='flex flex-col text-center'>
                        <span className='font-bold text-base'>{props.ride?.otp}</span>
                        <span className='font-light text-sm text-gray-600'>Otp</span>
                    </div>
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