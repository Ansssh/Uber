import React, { act, useEffect, useRef, useState } from 'react'
import logo from '../assets/logo.svg'
import { Link } from "react-router-dom";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehicleListPanel from '../components/VehicleListPanel';
import ConfirmRidePanel from '../components/ConfirmedRidePanel';

import LookingForDriver from '../components/LookingForDriver';

import WaitForDriver from '../components/WaitingForDriver';
import LiveLocationMap from '../components/LiveLocation';
// import 'leaflet/dist/leaflet.css';

const home = () => {
    const [location, setLocation] = useState("")
    const [destination, setDestination] = useState("")
    const [active, setActive] = useState(false);
    
    const panelRef = useRef(null)
    const forumRef = useRef(null);
    const [forumRefHeight, setforumRefHeight] = useState(0);


    const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
    const vehiclePanelRef = useRef(null);

    const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
    const [vehicleSelected, setVehicleSelected] = useState("");
    const confirmRidePanelRef = useRef(null);

    const lookingForDriverRef = useRef(null);
    const [lookingForDriverPanelOpen, setLookingForDriverPanelOpen] = useState(false)

    const waitForDriverRef = useRef(null);
    const [waitForDriverPanel, setwaitForDriverPanel] = useState(false)

    useEffect(() => {
        setforumRefHeight(forumRef.current.offsetHeight)
    }, [])

    useGSAP(() => {
        if (active) {
            gsap.to(panelRef.current, {
                height: `calc(100vh - ${forumRefHeight}px)`
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0'
            })
        }
    }, [active])

    useGSAP(()=>{
        if(vehiclePanelOpen){
            gsap.to(vehiclePanelRef.current, {
                transform: 'translate(-50%, 0%)'
            })
        }else{
            gsap.to(vehiclePanelRef.current, {
                transform: 'translate(-50%, 100%)'
            })
        }
    },[vehiclePanelOpen])

    useGSAP(()=>{
        if(confirmRidePanelOpen){
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translate(-50%, 0%)'
            })
        }else{
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translate(-50%, 100%)'
            })
        }
    },[confirmRidePanelOpen])

    useGSAP(()=>{
        if(lookingForDriverPanelOpen){
            gsap.to(lookingForDriverRef.current, {
                transform: 'translate(-50%, 0%)'
            })
        }else{
            gsap.to(lookingForDriverRef.current, {
                transform: 'translate(-50%, 100%)'
            })
        }
    },[lookingForDriverPanelOpen])

    useGSAP(()=>{
        if(waitForDriverPanel){
            gsap.to(waitForDriverRef.current, {
                transform: 'translate(-50%, 0%)'
            })
        }else{
            gsap.to(waitForDriverRef.current, {
                transform: 'translate(-50%, 100%)'
            })
        }
    },[waitForDriverPanel])


    return (
        <div className='h-screen relative flex overflow-hidden'>
            <Link to={'/'}><img src={logo} alt="logo" className='absolute top-0 left-0 w-30' /></Link>


            <div className='h-screen w-screen z-[-1]' onClick={()=>{
                setActive(false);
                setVehiclePanelOpen(false);
            }}>
                <LiveLocationMap></LiveLocationMap>
            </div>
            <div className={`h-auto absolute bottom-0 w-full sm:w-1/2 left-1/2 translate-x-[-50%] flex flex-col`}>
                <div ref={forumRef} className={`p-5 relative bg-white ${active ? "" : "rounded-t-xl"}`}>
                    <div className='h-1/3 left-10 top-21 rounded-full bg-black w-1 absolute'></div>
                    <h4 className='text-2xl font-bold'>Find a Trip</h4>
                    <i onClick={() => { setActive(!active) }} className={`ri-arrow-down-wide-line ri-xl cursor-pointer absolute right-6 top-7 ${active ? "rotate-0" : 'rotate-180'}`}></i>
                    <form action="" className='flex flex-col'>
                        <input
                            onFocus={() => setActive(true)}
                            className='bg-[#eee] px-10 py-2 text-base rounded-lg mt-4'
                            type="text"
                            placeholder='Add a pick-up location'
                        />
                        <input
                            onFocus={() => setActive(true)}
                            className='bg-[#eee] px-10 py-2 text-base rounded-lg mt-3'
                            type="text"
                            placeholder='Enter your destination'
                        />
                    </form>
                </div>
                <div ref={panelRef} className={`bg-white`}>
                    <div className='px-5 pb-5'>
                        <LocationSearchPanel setOpen={setVehiclePanelOpen} setActive={setActive}/>
                    </div>
                </div>
            </div>

            <div ref={vehiclePanelRef} className={`h-auto absolute bottom-0 translate-y-full w-full sm:w-1/2 left-1/2 translate-x-[-50%] flex flex-col`}>
                <VehicleListPanel setConfirmRidePanelOpen={setConfirmRidePanelOpen} vehiclePanelOpen={vehiclePanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} setVehicleSelected={setVehicleSelected}/>
            </div>

            <div ref={confirmRidePanelRef} className={`h-auto absolute bottom-0 translate-y-full w-full sm:w-1/2 left-1/2 translate-x-[-50%] flex flex-col`}>
                <ConfirmRidePanel setLookingForDriverPanelOpen={setLookingForDriverPanelOpen} confirmRidePanelOpen={confirmRidePanelOpen} setConfirmRidePanelOpen={setConfirmRidePanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} vehicleSelected={vehicleSelected}/>
            </div>

            <div ref={lookingForDriverRef} className={`h-auto absolute bottom-0 translate-y-full w-full sm:w-1/2 left-1/2 translate-x-[-50%] flex flex-col`}>
                <LookingForDriver vehicleSelected={vehicleSelected} setLookingForDriverPanelOpen={setLookingForDriverPanelOpen} setwaitForDriverPanel={setwaitForDriverPanel}/>
            </div>
            <div ref={waitForDriverRef} className={`h-auto absolute bottom-0 translate-y-full w-full sm:w-1/2 left-1/2 translate-x-[-50%] flex flex-col`}>
                <WaitForDriver vehicleSelected={vehicleSelected}/>
            </div>
        </div>
    )
}

export default home