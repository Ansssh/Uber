import React, {createContext, use} from 'react'
import { useState } from 'react'

export const CaptainDataContext = createContext()

const captainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateCaptain = (data) =>{
        setCaptain(data);
    }

    const val = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    }
    return (
        <>
            <CaptainDataContext.Provider value={val}>
                {children}
            </CaptainDataContext.Provider>
        </>
    )
}

export default captainContext;