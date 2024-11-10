import React from 'react'
import { LoadingCard } from '../components/lodingCard'

function LodingPage() {
  return (
    <div className="  bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black flex flex-col items-center"> 
    <LoadingCard /> 
    <LoadingCard /> 
    <LoadingCard />
    </div>
  )
}

export default LodingPage