import React, { useContext } from 'react'
import { UserDataContext } from '../context/userContext'
import { Navigate } from 'react-router-dom'

const userProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" />;
    }
    return children;
}

export default userProtectWrapper