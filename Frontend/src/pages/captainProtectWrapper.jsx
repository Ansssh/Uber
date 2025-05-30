// import React, { useContext } from 'react'
// // import { UserDataContext } from '../context/userContext'

// import { Navigate } from 'react-router-dom'

// const captainProtectWrapper = ({ children }) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//         return <Navigate to="/cap-login" />;
//     }
//     return children;
// }

// export default captainProtectWrapper

import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectWrapper = ({
    children
}) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { captain, setCaptain } = useContext(CaptainDataContext)
    const [ isLoading, setIsLoading ] = useState(true)




    useEffect(() => {
        if (!token) {
            navigate('/cap-login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                // console.log(response.data.captain)
                setCaptain(response.data.captain)
                setIsLoading(false)
            }
        })
            .catch(err => {
                localStorage.removeItem('token')
                navigate('/cap-login')
            })
    }, [ token ])

    

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }



    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWrapper