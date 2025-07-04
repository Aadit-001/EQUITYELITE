import { Card } from './card.js';
// import { useEffect, useState } from 'react';
import ORCL from '../assests/ORCL.png';
import TSLA from '../assests/TSLA.png';
import AAPL from '../assests/Apple.png';
import MSFT from '../assests/MSFT.png';
import NVDA from '../assests/NVDA.png';
import GOOGL from '../assests/GOOG.png';


export function HomePageStockSection() {
    const tempdata = [
        {
            "name": "Apple INC",
            "ticker": "AAPL",
            "price": "₹9,500.00",
            "profit": "₹65.00",
            "red_green": true,
            "image": AAPL
        },
        {
            "name": "Microsoft Corp.",
            "ticker": "MSFT",
            "price": "₹11,500.00",
            "profit": "₹56.00",
            "red_green": false,
            "image": MSFT
        },
        {
            "name": "Tesla INC",
            "ticker": "TSLA",
            "price": " ₹8,000.00",
            "profit": "₹935.00",
            "red_green": true,
            "image": TSLA
        },
        {
            "name": "Alphabet INC",
            "ticker": "GOOGL",
            "price": " ₹14,000.00",
            "profit": "₹32.00",
            "red_green": false,
            "image": GOOGL
        },
        // {
        //     "name": "Tata consultancy",
        //     "ticker": "TCS",
        //     "price": " ₹3580.00",
        //     "profit": "₹17.00",
        //     "red_green": false,
        // },
        {
            "name": "NVIDIA corp.",
            "ticker": "NVDA",
            "price": " ₹12,000.00",
            "profit": "₹400.00",
            "red_green": true,
            "image": NVDA
        },
        // },
        // {
        //     "name": "Meta INC",
        //     "ticker": "META",
        //     "price": " ₹7,500.00",
        //     "profit": "₹97.00",
        //     "red_green": true,
        // },
        {
            "name": "Oracle",
            "ticker": "ORCL",
            "price": " ₹1,903.00",
            "profit": "₹41.00",
            "red_green": false,
            "image": ORCL
        },
    ];
    // const [cardData, setCardData] = useState([]);
    // const symbols = ["AAPL", "MSFT", "NVDA", "AMZN", "GOOG"];

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const promises = symbols.map(async (symbol) => {
    //             const res = await fetch(`https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?adjusted=true&apiKey=rVhchUPwV9K0U8U8IsGwe4bvQLh0Mb5_`);
    //             const data = await res.json();
    //             return data;
    //         });

    //         const result = await Promise.all(promises);
    //         setCardData(result);
    //     };

    //     fetchData();
    // }); // Empty dependency array means this effect runs once on mount

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 overflow-x-auto no-scrollbar">
            <div className="flex space-x-4 lg:space-x-6 w-max min-w-full">
            {/* {cardData.length > 0 ? (
                cardData.map((card) => (
                    <Card key={card.ticker} val={card} />
                ))
            ) : (
                tempdata.map((card) => (
                    <Card key={card.ticker} val={card} />
                ))
            )} */}
            {
                tempdata.map((card) => (
                    <div key={card.ticker} className="w-40 sm:w-48 flex-shrink-0">
                        <Card val={card} />
                    </div>
                ))
            }
            </div>
        </div>
    );
}
