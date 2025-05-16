import React from 'react';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div
                className={`h-screen w-full bg-cover bg-center bg-[url(https://cdn.cosmos.so/8ecd87a5-72cf-45fd-9083-9c481e6758f3?format=jpeg)] flex justify-between flex-col`}
            >
                <img src={logo} alt="logo" className='w-30' />
                <div className='bg-white py-5 px-10 pb-7'>
                    <h2 className='sm:text-3xl text-xl font-bold'>Get Started with Uber</h2>
                    <Link to={'/login'} className='flex items-center justify-center w-full bg-black text-white py-3 rounded sm:mt-5 mt-2 font-bold'>Continue</Link>
                </div>
            </div>
        </>
    );
};

export default Home;