import React from 'react'
import { Outlet } from 'react-router'
import NavBar from './NavBar'

function RouteLayout() {
  return (
    <div>
        <NavBar/>
        
        <Outlet/>
    </div>
  )
}

export default RouteLayout