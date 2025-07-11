// import React from 'react'

// function StocksCard() {
//   return (
//     <div className='h-full w-60 rounded-md bg-red-600 p-4'>
//       <div className='  h-1/4 bg-black flex '>
//         <div className='rounded-full w-1/3 logo h-full bg-pink-500'>
//           s
//         </div>
//         <div className='h-full w-2/3'>
//           <div className='h-2/3 bg-slate-500 p-2'>
//               lkdf
//           </div>
//           <div className='h-1/3 bg-orange-400 pl-2'>
//             kdj
//           </div>
//         </div>
//       </div>
//       <div className='details h-2/4 bg-green-600'>
//         <div className='52High h-1/4 w-full bg-black'>
            
//         </div>
//         <div className='52Low h-1/4 w-full bg-orange-800'>

//         </div>
//         <div className='price flex h-2/4 w-full bg-violet-700'>
//           <div className='currentPrice'>

//           </div>
//           <div className='increse_decrease'>

//           </div>
//         </div>
//       </div>
//       <div className='buy_sell  flex h-1/4 bg-green-950 h-'>
//         <div className='buy  text-white font-medium flex justify-center items-center w-1/2 rounded-md h-full bg-green-400 '>
            
//         </div>
//         <div className='sell text-white font-medium flex justify-center items-center w-1/2 rounded-md h-full bg-red-500'>
           
//         </div>
//       </div>
//     </div>
//   )
// }

// export default StocksCard





import React from 'react';

function StocksCard({ stock }) {
  // Store data in localStorage and sessionStorage
  localStorage.setItem(stock.symbol, stock.profile.logo);
  sessionStorage.setItem(stock.symbol, stock.quote.c);

  const isPositive = stock.quote.d >= 0;
  const changeColor = isPositive ? 'text-green-400' : 'text-red-400';
  const changeBgColor = isPositive ? 'bg-green-900/20' : 'bg-red-900/20';
  const changeIcon = isPositive ? '▲' : '▼';
  
  // Format price with 2 decimal places
  const formatPrice = (price) => {
    return price ? price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A';
  };

  // Calculate percentage change
  const percentageChange = stock.quote.dp ? Math.abs(stock.quote.dp).toFixed(2) : '0.00';

  return (
    <div className="group relative h-full w-full rounded-xl bg-black/50 backdrop-blur-sm border border-gray-800 overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10">
      {/* Header with logo and ticker */}
      <div className="p-4 pb-3 border-b border-gray-800/50">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-800 border border-gray-700 overflow-hidden">
            <img 
              src={stock.profile.logo} 
              alt={`${stock.symbol} logo`} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/40/1f2937/ffffff?text=' + stock.symbol[0];
              }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-white truncate">{stock.profile.ticker}</h3>
            <p className="text-xs text-gray-400 truncate">{stock.profile.name}</p>
          </div>
          {/* <div className={`px-2 py-1 rounded-full text-xs font-medium ${changeColor} ${changeBgColor}`}>
            {changeIcon} {percentageChange}%
          </div> */}
        </div>
      </div>

      {/* Price and change */}
      <div className="p-4">
        <div className="flex items-baseline space-x-2 mb-1">
          <span className="text-2xl font-bold text-white">
            ${formatPrice(stock.quote.c || sessionStorage.getItem(stock.symbol))}
          </span>
          <span className={`text-sm ${changeColor} font-medium`}>
            {isPositive ? '+' : ''}{stock.quote.d ? stock.quote.d.toFixed(2) : '0.00'} ({percentageChange}%)
          </span>
        </div>
        
        {/* 52-week range */}
        <div className="mt-4 space-y-2 text-xs">
          <div className="flex justify-between text-gray-400">
            <span>52W High</span>
            <span className="text-white">${formatPrice(stock.metrics['52WeekHigh'])}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>52W Low</span>
            <span className="text-white">${formatPrice(stock.metrics['52WeekLow'])}</span>
          </div>
        </div>

        {/* Progress bar showing position between 52W high/low */}
        {stock.metrics['52WeekHigh'] && stock.metrics['52WeekLow'] && (
          <div className="mt-3">
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className={`h-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}
                style={{
                  width: `${((stock.quote.c - stock.metrics['52WeekLow']) / 
                           (stock.metrics['52WeekHigh'] - stock.metrics['52WeekLow']) * 100).toFixed(2)}%`
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>LOW</span>
              <span>HIGH</span>
            </div>
          </div>
        )}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}

export default React.memo(StocksCard);
