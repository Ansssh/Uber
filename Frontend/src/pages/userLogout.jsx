// import React from 'react'
// import axios from 'axios'
// import { Navigate } from 'react-router-dom';

// const userLogout = () => {
//     const token = localStorage.getItem('token');
//     axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
//         headers:{
//             Authorization: `Bearer ${token}`
//         }
//     }).then((res)=>{
//         if(res.status === 200){
//             localStorage.removeItem('token');
//             <Navigate to={'/login'}/>
//         }
//     })
//   return (
//     <div>userLogout</div>
//   )
// }

// export default userLogout

import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const UserLogout = () => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('token')
            navigate('/login')
        }
    })

    return (
        <div>UserLogout</div>
    )
}

export default UserLogout