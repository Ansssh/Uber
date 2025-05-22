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
                    <img src={me} alt="Avatar" className='h-10 w-10 object-cover rounded-full' />
                    <h5 className='font-bold'>Ansh Kumar</h5>
                </div>
                <h5 className='font-semibold'>2.9 Kms</h5>
            </div>
            <hr />

            <div className='flex justify-between items-center gap-2'>
                <button className='bg-red-300 flex w-1/2 rounded-lg justify-center p-1' onClick={()=>{
                    props.setRidePopUpPanel(false);
                    props.setCaptainDetailsPanel(true);
                }}>Ignore</button>
                <button className='bg-green-300 flex justify-center w-1/2 p-1 rounded-lg' onClick={()=>{
                    props.setRidePopUpPanel(false);
                    props.setConfirmRidePopUpPanel(true);
                }}>See More!</button>
            </div>

        </>
    )
}

export default RidePopUp