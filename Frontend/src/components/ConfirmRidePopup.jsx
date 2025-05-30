import React, { useState } from 'react'
import me from '../assets/thats me.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConfirmRidePopup = (props) => {
    const [otp, setOtp] = useState("")
    const navigate = useNavigate();

    console.log("Confirm Ride Popup Props: ", props.ride);
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
                    <img src=''https://imgs.search.brave.com/zJr-LDQTruHThQdmP3XXrvTK7M5qtkVNBSLNKNPwdyI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vb2xVMWZy/Q0lfcktPRDMtTkJX/RFBjcVRwZG44WURN/TlliMndWUTJUbXFs/TS9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTkw/TXk1bS9kR05rYmk1/dVpYUXZhbkJuL0x6/QXpMelEyTHpnekx6/azIvTHpNMk1GOUdY/ek0wTmpnei9PVFk0/TTE4MmJrRlFlbUpv/L2NGTnJTWEJpT0hC/dFFYZDEvWm10RE4y/TTFaVVEzZDFsMy9j/eTVxY0dj.jpeg' alt="Avatar" className='h-10 w-10 object-cover rounded-full' />
                    <h5 className='font-bold capitalize'>{props.ride?.user.fullname.firstname} {props.ride?.user.fullname.lastname}</h5>
                </div>
                <h5 className='font-semibold'>{Math.round(props.ride?.distance/1000)} Kms</h5>
                <h5 className='font-semibold'>~{(props.ride?.duration/(60*60)).toFixed(2)} Hrs</h5>
            </div>
            <hr />
            <div className='flex w-full justify-start font-bold gap-4 items-center'>
                <i className="ri-map-pin-2-line"></i>
                <div className='flex flex-col'>
                    <span className='font-semibold text-base'>{props.ride?.pickup.split(",")[0]}</span>
                    <span className='font-light text-sm text-gray-600'>{props.ride?.pickup.split(",").slice(1).join(",")}</span>
                </div>
            </div>
            <hr />
            <div className='flex w-full justify-start font-bold gap-4 items-center'>
                <i className="ri-map-pin-2-line"></i>
                <div className='flex flex-col'>
                    <span className='font-semibold text-base'>{props.ride?.destination.split(",")[0]}</span>
                    <span className='font-light text-sm text-gray-600'>{props.ride?.destination.split(",").slice(1).join(",")}</span>
                </div>
            </div>
            <hr />
            <div className='flex w-full justify-start font-bold gap-4 items-center'>
                <i className="ri-bank-card-2-fill"></i>
                <div className='flex flex-col'>
                    <span className='font-semibold text-base'>₹{props.ride?.fare}</span>
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
                    onClick={async () => {
                        try {
                            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/startRide`, {
                                params: {
                                    rideId: props.ride._id,
                                    otp: otp
                                },
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem('token')}`
                                }
                            })
                            if (response.status === 200) {
                                props.setConfirmRidePopUpPanel(false);
                                navigate('/cap-riding' , { state: { ride: props.ride } });
                            }
                        } catch (error) {
                            console.error("Error starting ride:", error);
                            alert("Failed to start the ride. Please check the OTP and try again.");
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