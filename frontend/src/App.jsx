import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Homepage from './pages/Homepage'
import { axiosInstance } from './lib/axios'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from "lucide-react"
import {Toaster} from "react-hot-toast"
import { useThemeStore } from './store/useTHEMEStore'

const App = () => {

  const {authUser,checkAuth,isCheckingAuth,onlineUsers}=useAuthStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  console.log({onlineUsers});

  const {theme}=useThemeStore();
  

  if(isCheckingAuth && !authUser)return(
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin"/>
    </div>
  )

  return (
    <div  data-theme={theme}>
      <Navbar/>
      <Routes>
        <Route path='/' element={authUser?<Homepage/>:<Navigate to="/login"/>} />
        <Route path='/signup' element={!authUser?<SignupPage/>:<Navigate to="/"/>} />
        <Route path='/login' element={!authUser?<LoginPage/>:<Navigate to="/"/>} />
        <Route path='/settings' element={<SettingsPage/>} />
        <Route path='/profile' element={authUser?<ProfilePage/>:<Navigate to="/login"/>} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
