import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';

import logo from '../assets/logo.svg'
import me from '../assets/thats me.jpg';
import bike from '../assets/bike.png'
import car from '../assets/11452724.png'
import auto from '../assets/tuktuk.png'
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopup from '../components/ConfirmRidePopup';
import LiveLocationMap from '../components/LiveLocation';

import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';


const captainHome = () => {
    const captainDetailsRef = useRef(null);
    const ridePopUpRef = useRef(null);

    const [captainDetailsPanel, setCaptainDetailsPanel] = useState(true);
    const [ridePopUpPanel, setRidePopUpPanel] = useState(false);

    const confirmRidePopUpRef = useRef(null);
    const [confirmRidePopUpPanel, setconfirmRidePopUpPanel] = useState(false);

    const { socket } = useContext(SocketContext);
    const { captain, setCaptain } = useContext(CaptainDataContext);

    const [ride, setRide] = useState(null);

    useEffect(() => {
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        })
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords;
                    socket.emit('updateLocation-captain', {
                        captainId: captain._id,
                        location: {
                            ltd: latitude,
                            lng: longitude
                        }
                    });
                }, (error) => {
                    console.error('Error getting location:', error);
                });
            }
        }
        const locationInterval = setInterval(updateLocation, 10000); // Update location every 10 seconds
        updateLocation(); // Initial location update
        return () => {
            clearInterval(locationInterval);
        }

    }, [])

    socket.on('newRide', (data) => {
        console.log('New ride request received:', data);
        setRide(data);
        setRidePopUpPanel(true);
        setCaptainDetailsPanel(false);

    });

    socket.on('tripDetails', (data) => {
        console.log('Trip details received:', data);
    });

    async function confirmRide() {
        try {
            console.log(ride, captain);
            const res = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
                {
                    rideId: ride._id,
                    captainId: captain._id,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setRidePopUpPanel(false);
            setconfirmRidePopUpPanel(true);
        } catch (err) {
            console.log(err);
            console.error('Error confirming ride:', err);
        }
    }

    useGSAP(() => {
        if (captainDetailsPanel) {
            gsap.to(captainDetailsRef.current, {
                y: '0%',
            })
        } else {
            gsap.to(captainDetailsRef.current, {
                y: '100%',
            })
        }
    }, [captainDetailsPanel])

    useGSAP(() => {
        if (confirmRidePopUpPanel) {
            gsap.to(confirmRidePopUpRef.current, {
                y: '0%',
            })
        } else {
            gsap.to(confirmRidePopUpRef.current, {
                y: '100%',
            })
        }
    }, [confirmRidePopUpPanel])

    useGSAP(() => {
        if (ridePopUpPanel) {
            gsap.to(ridePopUpRef.current, {
                y: '0%',
            })
        } else {
            gsap.to(ridePopUpRef.current, {
                y: '100%',
            })
        }
    }, [ridePopUpPanel])

    // useEffect(() => {
    //     setTimeout(() => {
    //         setRidePopUpPanel(true);
    //         setCaptainDetailsPanel(false);
    //     }, 5000)
    // }, [])


    return (
        <>
            <div className='h-screen w-screen relative flex flex-col overflow-hidden'>
                <Link to={'/'}><img src={logo} alt="logo" className='absolute top-0 left-0 w-30' /></Link>
                <Link to={'/cap/logout'}><i className="ri-logout-box-r-line absolute top-0 right-0 text-4xl p-5"></i></Link>
                <div className='h-7/10 w-screen -z-1'>
                    <LiveLocationMap height='100%' />

                </div>
                <div ref={captainDetailsRef} className='h-3/10 translate-y-0 bg-white w-screen flex flex-col justify-between p-4'>
                    <CaptainDetails captain={captain} />
                </div>

                <div ref={ridePopUpRef} className='h-2/5 translate-y-full absolute bottom-0 bg-white w-screen justify-between p-4 flex flex-col pt-0'>
                    <RidePopUp
                        ride={ride}
                        setConfirmRidePopUpPanel={setconfirmRidePopUpPanel}
                        setRidePopUpPanel={setRidePopUpPanel}
                        setCaptainDetailsPanel={setCaptainDetailsPanel}
                        confirmRide={confirmRide}
                    />
                </div>

                <div ref={confirmRidePopUpRef} className='h-screen translate-y-full absolute bottom-0 bg-white w-screen justify-between p-4 flex flex-col pt-0'>
                    <ConfirmRidePopup
                        ride={ride}
                        setConfirmRidePopUpPanel={setconfirmRidePopUpPanel}
                        setRidePopUpPanel={setRidePopUpPanel}
                        setCaptainDetailsPanel={setCaptainDetailsPanel} />
                </div>



            </div>
        </>
    )
}

export default captainHome