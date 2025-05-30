import React from 'react'
import me from '../assets/thats me.jpg';


const RidePopUp = (props) => {
    return (
        <>
            <i className="text-center text-2xl text-gray-600 ri-arrow-down-wide-line" onClick={
                () => {
                    props.setRidePopUpPanel(false);
                    props.setCaptainDetailsPanel(true);
                }
            }></i>
            <h5 className='font-bold text-xl text-center'>New Ride for you!</h5>
            <div className='flex justify-between items-center bg-gray-300 p-3 rounded-xl'>
                <div className='flex justify-between items-center gap-2'>
                    <img src='https://imgs.search.brave.com/zJr-LDQTruHThQdmP3XXrvTK7M5qtkVNBSLNKNPwdyI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vb2xVMWZy/Q0lfcktPRDMtTkJX/RFBjcVRwZG44WURN/TlliMndWUTJUbXFs/TS9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTkw/TXk1bS9kR05rYmk1/dVpYUXZhbkJuL0x6/QXpMelEyTHpnekx6/azIvTHpNMk1GOUdY/ek0wTmpnei9PVFk0/TTE4MmJrRlFlbUpv/L2NGTnJTWEJpT0hC/dFFYZDEvWm10RE4y/TTFaVVEzZDFsMy9j/eTVxY0dj.jpeg' alt="Avatar" className='h-10 w-10 object-cover rounded-full' />
                    <h5 className='font-bold'>{props.ride?.user.fullname.firstname} {props.ride?.user.fullname.lastname}</h5>
                </div>
                <h5 className='font-semibold'>{Math.round(props.ride?.distance/1000)} Kms</h5>
                <h5 className='font-semibold'>~{(props.ride?.duration/(60*60)).toFixed(2)} Hrs</h5>
            </div>
            <hr />

            <div className='flex justify-between items-center gap-2'>
                <button className='bg-red-300 flex w-1/2 rounded-lg justify-center p-1' onClick={()=>{
                    props.setRidePopUpPanel(false);
                    props.setCaptainDetailsPanel(true);
                }}>Ignore</button>
                <button className='bg-green-300 flex justify-center w-1/2 p-1 rounded-lg' onClick={()=>{
                    props.setRidePopUpPanel(false);
                    props.confirmRide()
                    props.setConfirmRidePopUpPanel(true);
                }}>See More!</button>
            </div>

        </>
    )
}

export default RidePopUp