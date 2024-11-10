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
  localStorage.setItem(stock.symbol,stock.profile.logo);
  sessionStorage.setItem(stock.symbol,stock.quote.c);
  // localStorage.setItem(stock.symbol,stock.profile.name);
  // localStorage.setItem(stock.symbol,stock.profile.ticker);

  const changeColor = stock.quote.d < 0 ? 'text-red-500' : 'text-green-500';
  return (
    <div className='group transition-transform transform hover:scale-[1.5] duration-300 ease-in-out h-full w-60 rounded-md p-4 bg-[#131213] ' style={{  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <div className='h-1/4 flex'>
        <div className='rounded-full w-1/3 logo h-full' >
          <img src={stock.profile.logo} alt={`${stock.symbol} logo`} className="w-full h-full object-cover rounded-full" />
        </div>
        <div className='h-full w-2/3'>
          <div className='h-2/3 pl-2 pr-2 pt-2 text-white font-bold text-2xl' >
          {stock.profile.ticker}
          </div>
          <div className='h-1/3 pl-2 text-white text-sm' >
          {stock.profile.name}
          </div>
        </div>
      </div>
      <div className='details h-2/4 mt-3 text-sm'>
        <div className='52High h-1/4 w-full text-white ' >
          52 Week High: <span className='text-white'>{stock.metrics['52WeekHigh'] ? stock.metrics['52WeekHigh'] : 'N/A'}</span>
        </div>
        <div className='52Low h-1/4 w-full text-white' >
          52 Week Low: <span className='text-white'>{stock.metrics['52WeekLow'] ? stock.metrics['52WeekLow'] : 'N/A'}</span>
        </div>
        <div className='price flex h-2/4 w-full mt-5' >
          <div className='currentPrice text-white font-bold'>
            Current Price: {stock.quote.c ? stock.quote.c : sessionStorage.getItem(stock.symbol)}
          </div>
          <div className={`increase_decrease ${changeColor} font-bold pl-11`}>
            Change: {stock.quote.d ? stock.quote.d.toFixed(2) : 'N/A'}
          </div>
        </div>
      </div>
      </div>
  )
}

export default StocksCard;
