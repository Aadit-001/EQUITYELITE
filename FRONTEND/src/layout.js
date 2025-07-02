// import { Outlet } from "react-router-dom";
import React from 'react'
import { useState } from 'react'

import { Route, Routes } from 'react-router-dom';

// import { Navbar } from "./components/navbar";
// import Community from './pages/Community'
import { Home } from './pages/Home'
import Learn from './pages/Learn'
import News from './pages/News'
import Stocks from './pages/Stocks'
import { Login } from './components/login'
import { Signup } from './components/signup'
import App from './App';
import OutletLayout from './outletLayout';
import Profile from './pages/Profile'



export function Layout() {

    const [userName, setuserName] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    


    return (
        <Routes>
            <Route path="/" element={<OutletLayout userName={userName} isLoggedIn={isLoggedIn} />}>
                <Route path='' element={<App />} />
                <Route path='home' element={<Home setIsLoggedIn={setIsLoggedIn} setuserName={setuserName}/>} />
                <Route path='stocks' element={<Stocks setIsLoggedIn={setIsLoggedIn}/>} />
                {/* <Route path='community' element={<Community />} /> */}
                <Route path='learn' element={<Learn setIsLoggedIn={setIsLoggedIn}/>} />
                <Route path='news' element={<News setIsLoggedIn={setIsLoggedIn}/>} />
                <Route path='login' element={<Login setuserName={setuserName} setIsLoggedIn={setIsLoggedIn} />} />
                <Route path='signup' element={<Signup />} />
                <Route path='profile' element={<Profile  setIsLoggedIn={setIsLoggedIn}/>} />
            </Route>
        </Routes>
    );

}