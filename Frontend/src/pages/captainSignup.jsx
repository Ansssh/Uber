import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from '../context/captainContext';
import logo from '../assets/logo.svg';
import axios from 'axios';

const CaptainSignup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [viewPage, setViewPage] = useState(true);
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const navigate = useNavigate();

    const [sampleCaptain, setSampleCaptain] = useState({});

    const handleSignup = async (e) => {
        e.preventDefault();

        if (viewPage) {
            const captain1 = ({
                fullname: {
                    firstname: fname,
                    lastname: lname,
                },
                email: email,
                password: password,
            });
            setSampleCaptain(captain1)
            setViewPage(false);
        } else {
            const newCaptainData = {
                ...sampleCaptain,
                vehicle: {
                    color: vehicleColor,
                    plate: vehiclePlate,
                    capacity: vehicleCapacity,
                    vehicleType: vehicleType,
                }
            };
            console.log("Final Captain Data:", newCaptainData);
            
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, newCaptainData);
    
            
            if(res.status === 201){
                const data = res.data;
                setCaptain(data.captain);
                localStorage.setItem('token', data.token);
                navigate('/captain-home')
            }else{
                console.error('Signup failed:', res.data);
            }
        }
    };

    const isFirstPageValid = fname && lname && email && password;
    const isSecondPageValid = vehicleColor && vehicleCapacity && vehiclePlate && vehicleType;
    const isNextButtonDisabled = viewPage ? !isFirstPageValid : !isSecondPageValid;


    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <Link to={'/'}>
                <img src={logo} alt="logo" className='absolute top-0 left-0 w-30' />
            </Link>

            <form onSubmit={handleSignup} className="bg-[#222233] sm:w-100 w-75 h-auto shadow-lg rounded-lg flex flex-col p-3 m-2">

                <div className={`text-4xl font-extrabold text-center ${viewPage ? "mb-8" : "mb-2"} text-white`}>
                    {viewPage ? "Captain Aboard!" : "Captain's Vehicle Details"}
                </div>
                <label htmlFor={viewPage ? "fname" : "color"} className="block text-sm font-medium text-[#c0c0c8] mb-2">
                    {viewPage ? "What's your name" : "Vehicle Color"}
                </label>
                {
                    viewPage ?
                        <>
                            <div className='flex gap-4'>
                                <input
                                    type='text'
                                    id="fname"
                                    onChange={(e) => setFname(e.target.value)}
                                    value={fname}
                                    className={`bg-[#c0c0c8] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DDA15E] focus:border-[#BC6C25] focus:bg-white block w-1/2 p-2.5 mb-2`}
                                    placeholder='First name'
                                    required
                                />
                                <input
                                    type='text'
                                    id="lname"
                                    onChange={(e) => setLname(e.target.value)}
                                    value={lname}
                                    className={`bg-[#c0c0c8] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DDA15E] focus:border-[#BC6C25] focus:bg-white block w-1/2 p-2.5 mb-2`}
                                    placeholder='Last name'
                                />
                            </div>
                        </> :
                        <>
                            <input
                                type='text'
                                id="color"
                                onChange={(e) => setVehicleColor(e.target.value)}
                                value={vehicleColor}
                                className={`bg-[#c0c0c8] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DDA15E] focus:border-[#BC6C25] focus:bg-white block w-full p-2.5 mb-2`}
                                placeholder='eg: Silver, White, Black'
                                required
                            />
                        </>
                }

                <label htmlFor={viewPage ? "mail" : "capacity"} className="block text-sm font-medium text-[#c0c0c8] mb-1">
                    {viewPage ? "Your Email" : "Vehicle's Capacity"}
                </label>
                <input
                    type={viewPage ? 'email' : "number"}
                    id={viewPage ? "mail" : "capacity"}
                    onChange={(e) => {
                        viewPage ? setEmail(e.target.value) : setVehicleCapacity(e.target.value);
                    }}
                    value={viewPage ? email : vehicleCapacity}
                    className={`bg-[#c0c0c8] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DDA15E] focus:border-[#BC6C25] focus:bg-white block w-full p-2.5 mb-2`}
                    placeholder={viewPage ? "email@example.co" : 'eg. 1, 2, 4, 6'}
                    required
                />
                <label htmlFor={viewPage ? "password" : "plate"} className="block text-sm font-medium text-[#c0c0c8] mb-1">
                    {viewPage ? "Password" : "Vehicle Registration"}
                </label>
                <input
                    type={viewPage ? "password" : "text"}
                    onChange={(e) => {
                        viewPage ? setPassword(e.target.value) : setVehiclePlate(e.target.value);
                    }}
                    value={viewPage ? password : vehiclePlate}
                    className="bg-[#c0c0c8] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DDA15E] focus:border-[#BC6C25] focus:bg-white block w-full p-2.5 mb-2"
                    required
                    placeholder={viewPage ? "123456789" : "PB10XY0001"}
                />
                {viewPage ? <></> :
                    <>
                        <label htmlFor="vehicle" className="block text-sm font-medium text-[#c0c0c8] mb-1">Vehicle Type</label>
                        <input
                            type='text'
                            id="vehicle"
                            onChange={(e) => setVehicleType(e.target.value)}
                            value={vehicleType}
                            className={`bg-[#c0c0c8] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#DDA15E] focus:border-[#BC6C25] focus:bg-white block w-full p-2.5 mb-2`}
                            placeholder='Car, Bike, Tuk-tuk'
                            required
                        />
                    </>}
                <button
                    type='submit'
                    disabled={isNextButtonDisabled}
                    className={`bg-[#1fbad6] rounded-lg shadow-sm text-white font-bold w-full p-2.5 ${isNextButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {viewPage ? "Next" : "Create Captain's Account"}
                </button>
            </form>
            {viewPage ? (
                <span className="font-bold">
                    Already have an account?{" "}
                    <Link to={'/cap-login'} className="text-blue-500 underline">
                        Log in
                    </Link>
                </span>
            ) : (
                <span className="font-bold">
                    Made a Mistake?{" "}
                    <button onClick={() => setViewPage(true)} className="text-blue-500 underline">
                        Go back!
                    </button>
                </span>
            )}
            <p className='sm:text-[12px] text-[9px] absolute bottom-3'>By registering you're accepting our privacy policy</p>
        </div>
    );
};

export default CaptainSignup;
