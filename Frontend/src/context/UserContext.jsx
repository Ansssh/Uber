import React, {createContext} from 'react'
import { useState } from 'react'

export const UserDataContext = createContext()

const userContext = ({ children }) => {
    const[user, setUser] = useState({
        email: "",
        fullName:{
            firstName:"",
            lastName:""
        }
    })
    return (
        <>
            <UserDataContext.Provider value={[user, setUser]}>
                {children}
            </UserDataContext.Provider>
        </>
    )
}

export default userContext