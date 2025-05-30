import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/logo.svg';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehicleListPanel from '../components/VehicleListPanel';
import ConfirmRidePanel from '../components/ConfirmedRidePanel';
import LookingForDriver from '../components/LookingForDriver';
import WaitForDriver from '../components/WaitingForDriver';
import LiveLocationMap from '../components/LiveLocation';

import { useContext } from 'react';
import { UserDataContext } from '../context/userContext';
import { SocketContext } from '../context/SocketContext';

const Home = () => {
    const [location, setLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [active, setActive] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
    const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
    const [vehicleSelected, setVehicleSelected] = useState('');
    const [lookingForDriverPanelOpen, setLookingForDriverPanelOpen] = useState(false);
    const [waitForDriverPanel, setWaitForDriverPanel] = useState(false);
    const [isPickup, setIsPickup] = useState(true);
    const [fare, setFare] = useState({});

    const [ride, setRide] = useState(null);

    const panelRef = useRef(null);
    const forumRef = useRef(null);
    const vehiclePanelRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const lookingForDriverRef = useRef(null);
    const waitForDriverRef = useRef(null);

    const [forumRefHeight, setForumRefHeight] = useState(0);

    const { user } = useContext(UserDataContext);
    const { socket } = useContext(SocketContext);

    const navigate = useNavigate();

    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);




    useEffect(() => {
        setForumRefHeight(forumRef.current.offsetHeight);


        console.log('User:', user);
        socket.emit('join', { userType: 'user', userId: user._id });
    }, []);

    socket.on('rideConfirmed', (data) => {
        setWaitForDriverPanel(true);
        setRide(data);
        console.log('Ride confirmed:', data);

    });

    socket.on('rideStarted', (data) => {
        setWaitForDriverPanel(false);
        navigate('/riding', { state: { ride } });
    })


    const animatePanel = (ref, condition, openTransform = 'translate(-50%, 0%)', closeTransform = 'translate(-50%, 100%)') => {
        gsap.to(ref.current, {
            transform: condition ? openTransform : closeTransform,
        });
    };

    useGSAP(() => {
        gsap.to(panelRef.current, {
            height: active ? `calc(100vh - ${forumRefHeight}px)` : '0',
        });
    }, [active]);

    useGSAP(() => animatePanel(vehiclePanelRef, vehiclePanelOpen), [vehiclePanelOpen]);
    useGSAP(() => animatePanel(confirmRidePanelRef, confirmRidePanelOpen), [confirmRidePanelOpen]);
    useGSAP(() => animatePanel(lookingForDriverRef, lookingForDriverPanelOpen), [lookingForDriverPanelOpen]);
    useGSAP(() => animatePanel(waitForDriverRef, waitForDriverPanel), [waitForDriverPanel]);

    const fetchSuggestions = async (query) => {
        if (!query) return;
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-suggestions?q=${query}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const formattedSuggestions = response.data.map((item) => ({
                name: item.display_name,
                lat: item.lat,
                lon: item.lon,
            }));
            setSuggestions(formattedSuggestions);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    async function createRide() {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/create`,
                {
                    pickup: location,
                    destination: destination,
                    vehicleType: vehicleSelected,
                    distance: distance,
                    duration: duration,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            console.log(response.data);
        } catch (error) {
            console.error('Error creating ride:', error);
        }
    }

    return (
        <div className="h-screen relative flex overflow-hidden">
            <Link to="/">
                <img src={logo} alt="logo" className="absolute top-0 left-0 w-30" />
            </Link>

            <div
                className="h-screen w-screen z-[-1]"
                onClick={() => {
                    setActive(false);
                    setVehiclePanelOpen(false);
                }}
            >
                <LiveLocationMap height='100%' />
            </div>

            <div className="h-auto absolute bottom-0 w-full sm:w-1/2 left-1/2 translate-x-[-50%] flex flex-col">
                <div ref={forumRef} className={`p-5 relative bg-white ${active ? '' : 'rounded-t-xl'}`}>
                    <div className='h-1/4 left-10 top-21 rounded-full bg-black w-1 absolute'></div>
                    <h4 className="text-2xl font-bold">Find a Trip</h4>
                    <i
                        onClick={() => setActive(!active)}
                        className={`ri-arrow-down-wide-line ri-xl cursor-pointer absolute right-6 top-7 ${active ? 'rotate-0' : 'rotate-180'
                            }`}
                    ></i>
                    <form className="flex flex-col">
                        <input
                            onFocus={() => setActive(true)}
                            onChange={(e) => {
                                setLocation(e.target.value);
                                setIsPickup(true);
                                if (e.target.value.length < 3) {
                                    setSuggestions([]);
                                    return;
                                }
                                if (e.target.value.length > 2) {
                                    fetchSuggestions(e.target.value);
                                }
                            }}
                            value={location}
                            className="bg-[#eee] px-10 py-2 text-base rounded-lg mt-4"
                            type="text"
                            placeholder="Add a pick-up location"
                        />
                        <input
                            onFocus={() => setActive(true)}
                            onChange={(e) => {
                                setDestination(e.target.value);
                                setIsPickup(false);
                                if (e.target.value.length < 3) {
                                    setSuggestions([]);
                                    return;
                                }
                                if (e.target.value.length > 2) {
                                    fetchSuggestions(e.target.value);
                                }
                            }}
                            value={destination}
                            className="bg-[#eee] px-10 py-2 text-base rounded-lg mt-3"
                            type="text"
                            placeholder="Enter your destination"
                        />
                    </form>
                    <button className='mt-4 w-full bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300' onClick={async () => {
                        if (!location || !destination) {
                            alert('Please enter both pick-up and destination locations.');
                            return;
                        }
                        setVehiclePanelOpen(true);
                        setActive(false);
                        try {
                            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/fare?pickup=${location}&destination=${destination}`, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                                },
                            });
                            setFare(response.data);

                            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-distance?origin=${location}&destination=${destination}`, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                                },
                            });
                            const { distance, duration } = res.data; 

                            setDistance(distance);
                            setDuration(duration);

                            
                        } catch (error) {
                            console.error('Error fetching fare:', error);
                        }
                    }}>
                        Find Trip
                    </button>
                </div>
                <div ref={panelRef} className="bg-white">
                    <div className="px-5 pb-5">
                        <LocationSearchPanel
                            setOpen={setVehiclePanelOpen}
                            setActive={setActive}
                            suggestions={suggestions}
                            setLocation={setLocation}
                            setDestination={setDestination}
                            setSuggestions={setSuggestions}
                            isPickup={isPickup}
                        />
                    </div>
                </div>
            </div>

            <div ref={vehiclePanelRef} className="h-auto absolute bottom-0 translate-y-full w-full sm:w-1/2 left-1/2 translate-x-[-50%] flex flex-col">
                <VehicleListPanel
                    fare={fare}
                    setConfirmRidePanelOpen={setConfirmRidePanelOpen}
                    vehiclePanelOpen={vehiclePanelOpen}
                    setVehiclePanelOpen={setVehiclePanelOpen}
                    setVehicleSelected={setVehicleSelected}
                />
            </div>

            <div ref={confirmRidePanelRef} className="h-auto absolute bottom-0 translate-y-full w-full sm:w-1/2 left-1/2 translate-x-[-50%] flex flex-col">
                <ConfirmRidePanel
                    money={fare[vehicleSelected === "bike" ? "motorcycle" : vehicleSelected]}
                    location={location}
                    destination={destination}
                    setLookingForDriverPanelOpen={setLookingForDriverPanelOpen}
                    confirmRidePanelOpen={confirmRidePanelOpen}
                    setConfirmRidePanelOpen={setConfirmRidePanelOpen}
                    setVehiclePanelOpen={setVehiclePanelOpen}
                    vehicleSelected={vehicleSelected}
                    createRide={createRide}
                />
            </div>

            <div ref={lookingForDriverRef} className="h-auto absolute bottom-0 translate-y-full w-full sm:w-1/2 left-1/2 translate-x-[-50%] flex flex-col">
                <LookingForDriver
                    money={fare[vehicleSelected === "bike" ? "motorcycle" : vehicleSelected]}
                    location={location}
                    destination={destination}
                    vehicleSelected={vehicleSelected}
                    setLookingForDriverPanelOpen={setLookingForDriverPanelOpen}
                    setWaitForDriverPanel={setWaitForDriverPanel}
                />
            </div>

            <div ref={waitForDriverRef} className="h-auto absolute bottom-0 translate-y-full w-full sm:w-1/2 left-1/2 translate-x-[-50%] flex flex-col">
                <WaitForDriver
                    ride={ride}
                    vehicleSelected={vehicleSelected} />
            </div>
        </div>
    );
};

export default Home;