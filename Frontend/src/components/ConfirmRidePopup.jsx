import React, { useState } from 'react'
import me from '../assets/thats me.jpg';
import { Link, useNavigate } from 'react-router-dom';

const ConfirmRidePopup = (props) => {
    const [otp, setOtp] = useState("")
    const navigate = useNavigate();
    return (
        <>
            <i className="text-center text-2xl text-gray-600 ri-arrow-down-wide-line" onClick={
                () => {
                    props.setConfirmRidePopUpPanel(false);
                    props.setCaptainDetailsPanel(true);
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

            <div className='flex flex-col justify-between items-center gap-2'>
                <input
                    type="number"
                    className='bg-gray-100 w-full rounded-lg p-3 text-center font-bold'
                    placeholder='Enter Otp'
                    onChange={(e) => setOtp(e.target.value)}
                    value={otp} />
                <button
                    className={`bg-green-300 flex justify-center w-full p-1 rounded-lg ${otp.length !== 4 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={otp.length !== 4}
                    onClick={() => {
                        if (otp.length === 4) {
                            navigate('/cap-riding');
                        }
                    }}
                > Start Ride </button>
                <button className='bg-red-300 flex w-full rounded-lg justify-center p-1' onClick={() => {
                    props.setConfirmRidePopUpPanel(false);
                    props.setRidePopUpPanel(false);
                    props.setCaptainDetailsPanel(true);
                }}>Cancel</button>
            </div>
        </>
    )
}

export default ConfirmRidePopup