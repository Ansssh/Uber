import React, { useContext } from 'react'
// import { UserDataContext } from '../context/userContext'

import { Navigate } from 'react-router-dom'

const captainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/cap-login" />;
    }
    return children;
}

export default captainProtectWrapper