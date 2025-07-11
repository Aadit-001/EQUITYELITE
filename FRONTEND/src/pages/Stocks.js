import React from 'react'
import axios from 'axios';
import { useState, useEffect,useContext } from 'react';
import StocksCard from '../components/StocksCard';
import StocksCard2 from '../components/StocksCard2';
// import GlobalContext from '../GlobalContext';
// import { WebSocketProvider } from '../webSocket/WebSocketContext.js';
// import StockData from '../components/StockData';
// import AnotherComponent from '../components/AnotherComponent';


// function Stocks({setIsLoggedIn}) {
// const [userdata,setuserdata] = useState({});
// // const [stocksData,setstocksData] = useState([]);
//   //isme agar user data mila tabhi hi user loggedin hai warna nhi hai

//   const getUser = async()=>{
//       try {
//           const res = await axios.get("http://localhost:3000/login/success",{withCredentials:true});
//           console.log(res);
//           setuserdata(res.data.user);
//           setIsLoggedIn(true);
//       } catch (error) {
//           console.log(error)
//       }
//   }

// const fetchStocks = async() =>{
//   try {
//     const response = await axios.get("http://localhost:3000/stocks",{withCredentials:true});
//     //imp
//     setstocksData(response.data);
//   } catch (error) {
//     console.log(error)
//   }
// }

// useEffect(()=> {
//     getUser();
//     // fetchStocks();
// },[])


//   return (
//     <WebSocketProvider> 
//       <div className="App"> 
//         <h1>Real-Time Stock Data</h1> 
//         <StockData /> 
//         <AnotherComponent />
//       </div>
//     </WebSocketProvider>
//   )
// }

// export default Stocks


// import React, { useEffect, useState } from 'react';

function Stocks({ setIsLoggedIn }) {
    const [stockData, setStockData] = useState({});
    const url = process.env.REACT_APP_API_BASE_URL; 
    // const [globalVariable,setGlobalVariable] = useContext(GlobalContext);

    // const [userdata, setuserdata] = useState({});
    // const [stocksData,setstocksData] = useState([]);
    //isme agar user data mila tabhi hi user loggedin hai warna nhi hai

    const getUser = async () => {
        try {
            const res = await axios.get(`${url}/login/success`, { withCredentials: true });
            console.log(res);
            // setuserdata(res.data.user);
            setIsLoggedIn(true);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser();
        const API_KEY = 'csnj8upr01qqapaib3d0csnj8upr01qqapaib3dg';
        const socket = new WebSocket(`wss://ws.finnhub.io?token=${API_KEY}`);

        socket.onopen = () => {
            console.log('WebSocket connection opened.');
            const symbols = ['AAPL', 'GOOGL', 'AMZN'];
            // Subscribe to AAPL (Apple) stock
            // socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'GOOGL' }));
            symbols.forEach(symbol => { socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': symbol })); });
        };

        socket.onmessage = event => {
            const message = JSON.parse(event.data);
            // setStockData(prevData => [...prevData, message]);
            if (message.type === 'trade') {
                //this works
                //   setStockData({ symbol: message.data[0].s, price: message.data[0].p, volume: message.data[0].v, conditions: message.data[0].c, timestamp: new Date(message.data[0].t).toLocaleString() });

                //lets see this now
                message.data.forEach(stock => { setStockData(prevData => ({ ...prevData, [stock.s]: { price: stock.p, volume: stock.v, conditions: stock.c, timestamp: new Date(stock.t).toLocaleString() } })); });

            }
            console.log(`Message from server: ${event.data}`);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed.');
        };

        socket.onerror = error => {
            console.log(`WebSocket error: ${error}`);
        };

        return () => socket.close();
    }, []);



    const [stocksData, setStocksData] = useState([]);
    const [usMajorData, setUsMajorData] = useState([]); 
    // const [additionalData, setAdditionalData] = useState([]);

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await axios.get(`${url}/stocks`, { withCredentials: true });
                // setStocksData(response.data.data);
                setStocksData(response.data.data.stockData); 
                setUsMajorData(response.data.data.usMajorData); 
                // setAdditionalData(response.data.data.additionalData);
            } catch (error) {
                console.log('Error fetching stocks:', error);
            }
        };

        fetchStockData();
    }, []);

    localStorage.setItem("TCS","https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/TCS.png");
    
    // Calculate market stats for the header
    const marketStats = [
        { label: 'NIFTY 50', value: '22,500.30', change: '+1.25%', isPositive: true },
        { label: 'SENSEX', value: '74,200.50', change: '+0.85%', isPositive: true },
        { label: 'NASDAQ', value: '16,800.40', change: '-0.35%', isPositive: false },
    ];

    return (
        <div className='pt-16 min-h-screen bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black text-white'>
            {/* Market Stats Header - Responsive */}
            <div className='bg-black/50 backdrop-blur-sm border-b border-purple-900/30 w-full'>
                <div className='relative overflow-hidden'>
                    <div className='px-2 py-2 sm:py-3 overflow-x-auto whitespace-nowrap hide-scrollbar'>
                        <div className='inline-flex items-center space-x-2 sm:space-x-4 px-2 sm:px-4'>
                            {marketStats.map((stat, index) => (
                                <div key={index} className='inline-flex items-center space-x-2 sm:space-x-3 bg-black/40 px-3 py-1.5 sm:py-2 rounded-lg border border-purple-900/30 min-w-[140px] sm:min-w-[160px]'>
                                    <span className='text-purple-300 text-xs sm:text-sm font-medium whitespace-nowrap'>{stat.label}</span>
                                    <span className='font-semibold text-white text-sm sm:text-base whitespace-nowrap'>{stat.value}</span>
                                    <span className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full font-medium ${stat.isPositive ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                                        {stat.change}
                                    </span>
                                </div>
                            ))}
                            {/* Add a bit of extra space on the right for better scrolling */}
                            <div className='inline-block w-4 sm:w-8 h-1'></div>
                        </div>
                    </div>
                    {/* Gradient fade effect on the right side for mobile */}
                    <div className='absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-black/80 to-transparent pointer-events-none'></div>
                </div>
            </div>

            <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* Page Header */}
                <div className='mb-10 text-center lg:text-left'>
                    <h1 className='text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-2'>
                        Market Overview
                    </h1>
                    <p className='text-purple-200/80 text-sm'>Real-time stock market data and analysis</p>
                    <div className='mt-4 h-1 w-24 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full mx-auto lg:mx-0'></div>
                </div>

                {/* Market Leaders Section */}
                <section className='mb-16'>
                    <div className='flex flex-row items-center justify-between mb-8 gap-4'>
                        <div className='flex items-center space-x-3'>
                            <h2 className='text-xl font-bold text-white'>
                                Market Leaders 
                            </h2>
                            <span className='text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded-full border border-purple-700/50'>LIVE</span>
                        </div>
                        <span className='text-sm text-purple-300 hover:text-purple-200 cursor-pointer transition-colors flex items-center'>
                            View All <span className='ml-1'>→</span>
                        </span>
                    </div>
                    
                    <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-6'>
                        {stocksData.map((stock, index) => (
                            <div key={index} className='transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-900/20'>
                                <StocksCard stock={stock} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Top Foreign Stocks Section */}
                <section>
                    <div className='flex flex-row items-center justify-between mb-8 gap-4'>
                        <h2 className='text-xl font-bold text-white'>
                            Top Foreign Stocks
                        </h2>
                        <span className='text-sm text-purple-300 hover:text-purple-200 cursor-pointer transition-colors flex items-center'>
                            View All <span className='ml-1'>→</span>
                        </span>
                    </div>
                    
                    <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-6'>
                        {usMajorData.map((stock, index) => (
                            <div key={index + stocksData.length} className='transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-900/20'>
                                <StocksCard2 stock={stock} />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            
            {/* Floating Action Button */}
            {/* <button className='fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-4 rounded-full shadow-xl transform transition-all duration-300 hover:scale-110 hover:shadow-purple-500/30'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </button> */}
            
            {/* Custom Scrollbar Styling */}
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    height: 4px;
                }
                .hide-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 4px;
                }
                .hide-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                }
                .hide-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    );
};

export default Stocks;
