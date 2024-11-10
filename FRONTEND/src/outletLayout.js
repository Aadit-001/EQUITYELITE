import React from 'react'
import { Navbar } from './components/navbar'
import { Outlet } from 'react-router-dom'

function OutletLayout({userName,isLoggedIn}) {
  return (
    <>
        <Navbar name={userName} isLoggedIn={isLoggedIn}/>
        <Outlet />
    </>
  )
}

export default OutletLayout