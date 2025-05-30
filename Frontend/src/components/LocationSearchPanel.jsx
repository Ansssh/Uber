import React from 'react';

const LocationSearchPanel = ({setSuggestions, suggestions, setOpen, setActive, setLocation, setDestination, isPickup }) => {
    return (
        <>
            {suggestions.map((item, index) => (
                <div
                    className="flex gap-2 items-center border-2 border-transparent hover:border-black p-2 justify-start my-2 rounded-xl"
                    onClick={() => {
                        // setOpen(true);
                        // setActive(false);
                        isPickup ? setLocation(item.name) : setDestination(item.name);
                        // setSuggestions([]);
                    }}
                    key={index}
                >
                    <h2 className="rounded-full bg-[#eee] p-3 flex items-center justify-center">
                        <i className="ri-map-pin-line"></i>
                    </h2>
                    <h4 className="font-medium text-sm sm:text-base">{item.name}</h4>
                </div>
            ))}
        </>
    );
};

export default LocationSearchPanel;