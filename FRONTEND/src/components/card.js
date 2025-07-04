export function Card({ val }) {
  const isPositive = val.red_green;
  const profitValue = parseFloat(val.profit);
  
  return (
    <div className="relative h-36 group bg-transparent rounded-xl p-3 sm:p-4 w-full sm:w-48 sm:mr-6 mt-3 sm:mt-5 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1 border border-gray-700/50 overflow-hidden">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Stock header */}
      <div className="flex items-start justify-between mb-3 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-800/80 flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-700/50">
            {val.image ? (
              <img 
                src={val.image} 
                alt={`${val.ticker} logo`} 
                className="h-12 w-12 sm:h-16 sm:w-16 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://via.placeholder.com/100/1a1a2e/ffffff?text=${val.ticker.charAt(0)}`;
                }}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 text-white font-bold">
                {val.ticker.charAt(0)}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <div className="font-bold text-base sm:text-lg text-white truncate">{val.ticker}</div>
            <div className="text-xs text-gray-400 line-clamp-1">{val.name}</div>
          </div>
        </div>
        
        {/* Stock price change indicator */}
        {/* <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
          isPositive ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
        }`}>
          {isPositive ? '▲' : '▼'} {Math.abs(profitValue)}%
        </div> */}
      </div>
      
      {/* Stock price */}
      <div className="relative z-10 mt-2 sm:mt-0">
        <div className="text-xl sm:text-2xl font-bold text-white">{val.price}</div>
        <div className={`text-xs sm:text-sm ${isPositive ? 'text-green-400' : 'text-red-400'} flex items-center`}>
          <span className="mr-1">{isPositive ? '↑' : '↓'}</span>
          <span>{val.profit}</span>
        </div>
      </div>
      
      {/* Interactive elements */}
      {/* <div className="flex items-center justify-between text-gray-400 text-sm relative z-10">
        <button className="p-2 rounded-full hover:bg-gray-700/50 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-700/50 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-700/50 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div> */}
      
      {/* Animated border bottom */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${
        isPositive ? 'bg-gradient-to-r from-green-500 to-green-300' : 'bg-gradient-to-r from-red-500 to-red-300'
      } transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
    </div>
  );
}