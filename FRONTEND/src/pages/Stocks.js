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
    // const [globalVariable,setGlobalVariable] = useContext(GlobalContext);

    // const [userdata, setuserdata] = useState({});
    // const [stocksData,setstocksData] = useState([]);
    //isme agar user data mila tabhi hi user loggedin hai warna nhi hai

    const getUser = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/login/success`, { withCredentials: true });
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
                const response = await axios.get(`http://localhost:8080/stocks`, { withCredentials: true });
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
    return (
        // <div className="App">
        //     <div className='text-white'>Stock Data</div>
        //     <div className='text-white'> {stockData.map((data, index) => ( <div key={index}> <strong>Symbol:</strong> {data.s}, <strong>Price:</strong> {data.p}, <strong>Volume:</strong> {data.v}, <strong>Conditions:</strong> {data.c.join(', ')}, <strong>Timestamp:</strong> {new Date(data.t).toLocaleString()} </div> ))} </div>
        // </div>

        //this works
        // <div className="text-white pt-20"> 
        // <div className='text-white'>Stock Data</div> 
        // <div className='text-white'><strong>Symbol:</strong> {stockData.symbol}</div> 
        // <div className='text-white'><strong>Price:</strong> {stockData.price}</div> 
        // <div className='text-white'><strong>Volume:</strong> {stockData.volume}</div> 
        // <div className='text-white'><strong>Conditions:</strong> {stockData.conditions ? stockData.conditions.join(', ') : ''}</div> 
        // <div className='text-white'><strong>Timestamp:</strong> {stockData.timestamp}</div> 
        // </div>


        //this also works at night 
        // <div className="App"> <h1 className="text-white">Stock Data</h1> {Object.keys(stockData).map((symbol, index) => ( <div key={index} className="text-white"> <div className="text-white"><strong>Symbol:</strong> {symbol}</div> <div className="text-white"><strong>Price:</strong> {stockData[symbol].price}</div> <div className="text-white"><strong>Volume:</strong> {stockData[symbol].volume}</div> <div className="text-white"><strong>Conditions:</strong> {stockData[symbol].conditions ? stockData[symbol].conditions.join(', ') : ''}</div> <div className="text-white"><strong>Timestamp:</strong> {stockData[symbol].timestamp}</div> </div> ))} </div>



        <div className='pb-40 pl-52  bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black pr-52 pt-20'>
            <div className='text-white font-extrabold text-3xl'>
                MARKET LEADERS
            </div>
            <div className='pt-10 pb-10 flex justify-between w-full h-76'>
                {stocksData.map((stock, index) => (
                    // localStorage.setItem(stock.symbol,stock.profile.logo)
                    <StocksCard key={index} stock={stock} />
                ))}

            </div>
            <div className='mt-10 text-white font-extrabold text-3xl'>
                TOP FOREIGN STOCKS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pl-4 gap-4 pt-10 pb-10 w-full h-auto"> 
                {usMajorData.map((stock, index) => ( <StocksCard2 key={index + stocksData.length} stock={stock} /> ))}
            </div>
            {/* <div className='mt-10 text-white font-extrabold text-3xl'>
                TOP INDIAN STOCKS
            </div>
            <div className='pt-10 pb-10  bg-green-500 flex justify-between w-full h-96'>
            {additionalData.map((stock, index) => ( <StocksCard2 key={index + stocksData.length + usMajorData.length} stock={stock} /> ))}
            </div>  */}
            {/* <div className='mt-10 text-white font-extrabold text-3xl'>
                OTHER STOCKS
            </div>
            <div className='pt-10 pb-10  bg-green-500 flex justify-between w-full h-96'>

            </div> */}
        </div>
    );
};

export default Stocks;
