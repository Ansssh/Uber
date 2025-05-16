import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import UserLogin from './pages/userLogin';
import UserSignup from './pages/userSignup';
import CapLogin from './pages/captainLogin';
import CapSignup from './pages/captainSignup';


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/sign-up' element={<UserSignup />} />
        <Route path='/cap-login' element={<CapLogin />} />
        <Route path='/cap-signup' element={<CapSignup />} />
      </Routes>
    </>
  )
}

export default App