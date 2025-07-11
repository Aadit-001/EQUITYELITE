import React from 'react'
import { LoadingCard } from '../components/lodingCard'

function LodingPage() {
  // Create an array of 6 loading cards to fill the grid
  const loadingCards = Array(6).fill(0);

  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black">
      {/* Page Header - Matches News.js */}
      {/* <div className="pt-20 pb-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mb-2">
          Loading Market News
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full mx-auto"></div>
      </div> */}
      
      {/* Grid Container - Matches News.js responsive grid */}
      <div className="container pt-10 mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loadingCards.map((_, index) => (
            <div key={index} className="transform transition-transform duration-300 hover:scale-[1.02]">
              <LoadingCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LodingPage