import React from 'react'
import me from '../assets/thats me.jpg';


const CaptainDetails = () => {
    return (
        <>
            <div className='flex justify-between items-center'>
                <div className='flex justify-between items-center gap-2'>
                    <img src={me} alt="Avatar" className='rounded-full w-25 h-25 object-cover' />
                    <div>
                        <h5 className='font-bold text-xl'>Ansh Kumar</h5>
                        <p className='text-sm text-gray-700'>Captain</p>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center mt-2'>
                    <h5 className='font-bold text-xl'>$269</h5>
                    <p className='text-sm text-gray-700'>Earned</p>
                </div>
            </div>
            <div className='flex justify-between items-center bg-gray-200 p-3 rounded-xl'>
                <div className='flex flex-col justify-center items-center '>
                    <i className="text-2xl ri-time-line"></i>
                    <p className='font-bold text-lg'>10.2</p>
                    <p className='text-sm text-gray-700'>Hours Online</p>
                </div>
                <div className='flex flex-col justify-center items-center '>
                    <i className="text-2xl ri-speed-up-line"></i>
                    <p className='font-bold text-lg'>260</p>
                    <p className='text-sm text-gray-700'>Kilometers Driven</p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <i className="text-2xl ri-booklet-line"></i>
                    <p className='font-bold text-lg'>35</p>
                    <p className='text-sm text-gray-700'>Rides Completed</p>
                </div>
            </div>
        </>
    )
}

export default CaptainDetails