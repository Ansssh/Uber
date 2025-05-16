import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Welcome from './pages/welcome';
import UserLogin from './pages/userLogin';
import UserSignup from './pages/userSignup';
import CapLogin from './pages/captainLogin';
import CapSignup from './pages/captainSignup';
import Home from './pages/home';
import UserProtectWrapper from './pages/userProtectWrapper';
import UserLogout from './pages/userLogout';


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/sign-up' element={<UserSignup />} />
        <Route path='/cap-login' element={<CapLogin />} />
        <Route path='/cap-signup' element={<CapSignup />} />
        <Route path='/home' element={<UserProtectWrapper><Home /></UserProtectWrapper>}></Route>
        <Route path='/user/logout' element={<UserProtectWrapper><UserLogout /></UserProtectWrapper>}></Route>
      </Routes>
    </>
  )
}

export default App