import React from 'react'

const LocationSearchPanel = (props) => {
    const locations = [
        "Guru Nanak Dev Engineering College, Gill Park, Ludhiana, Punjab",
        "B8/1, Bhai Himmat Singh Nagar, Duggri, Ludhiana, Punjab",
        "4446/1, Durga Puri, Haibowal Kalan, Ludhiana, Punjab",
        "Mitran Da Dhaba, Ludhiana, Punjab",
        "Loan Bank, Ludhiana, Punjab"
    ]
    const classes = [
        "ri-school-line",
        "ri-map-pin-line",
        "ri-home-line",
        "ri-restaurant-line",
        "ri-bank-line"
    ]
    return (
        <>
            {locations.map((item,index) => (
                <div className='flex gap-2 items-center border-2 border-transparent hover:border-black p-2 justify-start my-2 rounded-xl' onClick={()=>{
                    props.setOpen(true);
                    props.setActive(false);
                }} key={index}>
                    <h2 className='rounded-full bg-[#eee] p-3 flex items-center justify-center'><i className={classes[index]}></i></h2>
                    <h4 className='font-medium text-sm sm:text-base'>{item}</h4>
                </div>
            ))}
        </>
    )
}

export default LocationSearchPanel