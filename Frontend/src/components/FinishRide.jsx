import React from 'react'
import me from '../assets/thats me.jpg';
import { Link, useNavigate } from 'react-router-dom';

const FinishRide = (props) => {
    const navigate = useNavigate();
    return (
        <>
            <i className="text-center text-2xl text-gray-600 ri-arrow-down-wide-line" onClick={
                () => {
                    props.setFinishRidePopup(false);
                    // navigate('/captain-home');
                }
            }></i>
            <h5 className='font-bold text-xl text-center'>Confrim Ride Panel</h5>
            <div className='flex justify-between items-center bg-gray-300 p-3 rounded-xl'>
                <div className='flex justify-between items-center gap-2'>
                    <img src={me} alt="Avatar" className='h-10 w-10 object-cover rounded-full' />
                    <h5 className='font-bold'>Ansh Kumar</h5>
                </div>
                <h5 className='font-semibold'>2.9 Kms</h5>
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

            <button
                className={`bg-green-300 flex justify-center w-full p-1 rounded-lg`}
                onClick={() => {
                    props.setFinishRidePopup(false);
                    navigate('/captain-home');
                }}
            > Finish Ride </button>

        </>
    )
}

export default FinishRide