import React from 'react'
import me from '../assets/thats me.jpg';


const CaptainDetails = (props) => {
    return (
        <>
            <div className='flex justify-between items-center'>
                <div className='flex justify-between items-center gap-2'>
                    <img src='https://imgs.search.brave.com/zJr-LDQTruHThQdmP3XXrvTK7M5qtkVNBSLNKNPwdyI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vb2xVMWZy/Q0lfcktPRDMtTkJX/RFBjcVRwZG44WURN/TlliMndWUTJUbXFs/TS9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTkw/TXk1bS9kR05rYmk1/dVpYUXZhbkJuL0x6/QXpMelEyTHpnekx6/azIvTHpNMk1GOUdY/ek0wTmpnei9PVFk0/TTE4MmJrRlFlbUpv/L2NGTnJTWEJpT0hC/dFFYZDEvWm10RE4y/TTFaVVEzZDFsMy9j/eTVxY0dj.jpeg' alt="Avatar" className='rounded-full sm:w-25 sm:h-25 w-18 h-18 object-cover' />
                    <div>
                        <h5 className='font-bold text-xl capitalize'>{props.captain.fullname.firstname} {props.captain.fullname.lastname}</h5>
                        <p className='text-sm text-gray-700'>Captain</p>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center mt-2'>
                    <h5 className='font-bold text-xl'>₹ -</h5>
                    <p className='text-sm text-gray-700'>Earned</p>
                </div>
            </div>
            <div className='flex justify-between items-center bg-gray-200 p-3 rounded-xl'>
                <div className='flex flex-col justify-center items-center '>
                    <i className="text-2xl ri-time-line"></i>
                    <p className='font-bold text-lg'>-</p>
                    <p className='text-sm text-gray-700 text-center'>Hours Online</p>
                </div>
                <div className='flex flex-col justify-center items-center '>
                    <i className="text-2xl ri-speed-up-line"></i>
                    <p className='font-bold text-lg'>-</p>
                    <p className='text-sm text-gray-700 text-center'>Kilometers Driven</p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <i className="text-2xl ri-booklet-line"></i>
                    <p className='font-bold text-lg'>-</p>
                    <p className='text-sm text-gray-700 text-center'>Rides Completed</p>
                </div>
            </div>
        </>
    )
}

export default CaptainDetails