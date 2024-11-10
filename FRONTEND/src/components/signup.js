import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom'

export function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const newemailValue = (e) => {
    setEmail(e.target.value);
  }

  const newpassvalue = (e) => {
    setPassword(e.target.value);
  }

  const newName = (e) => {
    setUsername(e.target.value);
  }

  // connecting frontend to backend
  const funcTocallAfterSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/signup",{email,password,username})   //idhere server jis port ya url pe chal raha hai wo likhna hai
    .then(result => {console.log(result)
      navigate('/login')
    })
    .catch(err => console.log(err))
  }
  return (
    <div className={`absolute bg-white h-5/6 w-4/6 z-10 left-56 top-16  rounded-xl   flex felx-row overflow-hidden`}>
      <div className='w-1/2 h-full flex flex-col justify-center align-center rounded-xl bg-gradient-to-bl from-violet-800 via-fuchsia-800 to-pink-900 '>
      <div className="font-bold flex justify-center w-full text-white text-5xl">
          Welcome
        </div>
        <div className="font-bold flex justify-center w-full text-white  text-5xl">
          To
        </div>
        <div className="font-bold flex  justify-center w-full text-white  text-7xl">
          EQUITYELITE
        </div>
      </div>
      <div className='p-8 bg-white/40 h-full w-1/2'>
        <form onSubmit={funcTocallAfterSubmit}>
          <div className='h-8 w-full text-center bg-transparent font-extrabold text-pink-700 text-4xl '>SignUp</div>
          
          <div className='mt-6 bg-transparent text-left font-mono font-semibold text-lg text-black'>Name</div>
          <input type='text' value={username} onChange={newName} className='bg-transparent border-slate-900 border rounded-lg h-12 w-full
             focus:border-purple-600 pl-5 pr-5 focus:ring focus:ring-blue-700 focus:outline-none' placeholder='Enter your name'></input>

          <div className='mt-6 bg-transparent text-left font-mono font-semibold text-lg text-black'>Email</div>
          <input className='bg-transparent border-slate-900 border rounded-lg h-12 w-full
             focus:border-purple-600 pl-5 pr-5 focus:ring focus:ring-blue-700 focus:outline-none'
            type="email" value={email} onChange={newemailValue} placeholder="Enter the email"></input>

          <div className='mt-6 bg-transparent text-left font-mono font-semibold text-lg text-black '>Password</div>
          <input type="password" value={password} onChange={newpassvalue} placeholder="Enter the password" className='bg-transparent 
             focus:border-purple-600 pl-5 pr-5 focus:ring focus:ring-blue-700 focus:outline-none border-slate-900 border rounded-lg h-12 w-full' ></input>

          <button type="submit" className='w-full h-12 mt-12 rounded-lg bg-green-600 text-white font-bold text-xl'>SignUp</button>
          
          <div className=' bg-transparent text-left font-mono font-semibold text-lg text-black'>Already have an Account?<Link to="/login">Login..</Link></div>
        </form>
        <div className="h-10 pt-5 flex justify-center text-xl mb-2">OR</div>
        <hr className="border-1 border-black"/>
        <div className="flex justify-center h-20 ">
            <button className="bg-signupwithgoogle h-12 mt-2 overflow-hidden bg-contain w-60 bg-center bg-no-repeat" ></button>
        </div>
      </div>
    </div>
  )
}
