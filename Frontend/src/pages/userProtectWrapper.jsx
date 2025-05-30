// import React, { useContext } from 'react'
// import { UserDataContext } from '../context/userContext'
// import { Navigate } from 'react-router-dom'

// const userProtectWrapper = ({ children }) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//         return <Navigate to="/login" />;
//     }
//     return children;
// }

// export default userProtectWrapper

import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/userContext'
// import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectWrapper = ({
    children
}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserDataContext)
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data)
                setIsLoading(false)
            }
        })
            .catch(err => {
                console.log(err)
                localStorage.removeItem('token')
                navigate('/login')
            })
    }, [ token ])

    if (isLoading) {
        return (
            <div className='flex items-center justify-center h-screen'>Loading...</div>
        )
    }

    return children;
}

export default UserProtectWrapper