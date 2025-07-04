import React from 'react'
import axios from 'axios';
import { useState,useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
// import GlobalContext from '../GlobalContext';

function Learn({setIsLoggedIn}) {
  axios.defaults.withCredentials = true; 
  // const [globalVariable,setGlobalVariable] = useContext(GlobalContext);
  // const [userdata,setuserdata] = useState({});
    //isme agar user data mila tabhi hi user loggedin hai warna nhi hai

    useEffect(()=> {
      const getUser = async()=>{
        try {
            const res = await axios.get(`https://equityelite-1.onrender.com/login/success`,{withCredentials:true});
            console.log(res);
            // setuserdata(res.data.user);
            setIsLoggedIn(true);
        } catch (error) {
            console.log(error)
        }
    }
        getUser();
    },[])

    const topics = [
      { 
        name: "STOCKS", 
        description: "Stocks represent ownership shares in a company, allowing investors to participate in the company's growth and profit. When you buy stocks, you become a shareholder, with potential to earn through price appreciation and dividends. Investing in stocks is a fundamental way to build wealth, though it also involves risks tied to market volatility and company performance. Understanding stocks and their behavior in the market is essential for informed investing.", 
        image: "https://media.istockphoto.com/id/1487894858/photo/candlestick-chart-and-data-of-financial-market.jpg?s=612x612&w=0&k=20&c=wZ6vVmbm4BV2JOePSnNNz-0aFVOJZ0P9nhdeOMGUg5I=", 
        links: [
          { url: "https://www.youtube.com/watch?v=4e_o4Xar5t0", label: "What are Stocks" },
          { url: "https://www.youtube.com/watch?v=-APjlRq8Usw", label: "How to Invest in Stocks" },
          { url: "https://www.youtube.com/watch?v=Ak5ZWRHg1B0", label: "Stock Market Analysis" }
        ]
      },
      { 
        name: "INVESTMENT STRATEGIES", 
        description: "Investment Strategies** refer to different approaches that investors use to achieve their financial goals. These strategies vary based on risk tolerance, market conditions, and investment objectives. Common strategies include *Value Investing* (buying undervalued assets), *Growth Investing* (targeting fast-growing companies), *Income Investing* (focusing on assets that provide regular income like dividends), and *Momentum Investing* (investing in rising assets). Each strategy has its advantages, and investors often choose one based on their financial situation and goals. Diversification and balance across strategies can help minimize risks and maximize returns.", 
        image: "https://media.istockphoto.com/id/1311598658/photo/businessman-trading-online-stock-market-on-teblet-screen-digital-investment-concept.jpg?s=612x612&w=0&k=20&c=HYlIJ1VFfmHPwGkM3DtVIFNLS5ejfMMzEQ81ko534ak=", 
        links: [
          { url: "https://www.youtube.com/playlist?list=PLF1wHLfTCGUQ85w90LIg-1YXZdnUKOGtO", label: "Value Investing" },
          { url: "https://www.youtube.com/watch?v=16OTs9Tql7Y", label: "Growth Investing" },
          { url: "https://www.youtube.com/watch?v=mgUoZPlGGas", label: "Dividend Investing" }
        ]
      },
      { 
        name: "MARKETING", 
        description: "Marketing** involves the activities, strategies, and tactics used by businesses to promote and sell their products or services to consumers. It encompasses various techniques such as *digital marketing, which utilizes online platforms like social media, websites, and search engines; **content marketing, which focuses on creating valuable and relevant content to attract and engage an audience; and **traditional marketing* methods like TV and print ads. Effective marketing helps build brand awareness, drive sales, and foster customer loyalty by connecting with target audiences through the right channels with the right message.", 
        image: "https://emeritus.org/in/wp-content/uploads/sites/3/2022/11/IIMK-ASMP-1024x576.jpg.optimal.jpg", 
        links: [
          { url: "https://www.youtube.com/playlist?list=PLjVLYmrlmjGfdvrkrYB832s7UjVM4nKQ6", label: "Digital Marketing Basics" },
          { url: "https://www.youtube.com/watch?v=8-shSAxeKO0", label: "Content Marketing Strategies" },
          { url: "https://www.youtube.com/watch?v=toZrqSyIFYA", label: "Social Media Marketing" }
        ]
      },
      { 
        name: "TECHNICAL ANALYSIS", 
        description: "Technical Analysis** is the study of past market data, primarily price and volume, to forecast future price movements in financial markets. It involves analyzing charts and using various tools like *indicators, **oscillators, and **chart patterns* to identify trends and market behavior. Technical analysts believe that all information is reflected in the price, and by examining price patterns, trends, and market signals, they can predict future price movements. It is widely used in stock markets, forex, and commodities trading to make informed buying and selling decisions.", 
        image: "https://www.shutterstock.com/image-vector/technical-analysis-investment-stock-trading-260nw-1844681866.jpg", 
        links: [
          { url: "https://www.youtube.com/watch?v=dP7Le1YdUXw", label: "Chart Patterns" },
          { url: "https://www.youtube.com/watch?v=94Vph1miSYg", label: "Technical Indicators" },
          { url: "https://www.youtube.com/watch?v=mRfVY9Wbnrs", label: "Trend Analysis Techniques" }
        ]
      },
      { 
        name: "RISK MANAGEMENT", 
        description: "Risk Management** in investing refers to the strategies and practices used to minimize potential losses in an investment portfolio. It involves identifying, assessing, and prioritizing risks, and then implementing measures to mitigate them. Common risk management techniques include *diversification* (spreading investments across different assets), *hedging* (using financial instruments to offset potential losses), and *risk assessment* (evaluating the level of risk associated with each investment). By managing risk effectively, investors can protect their capital while maximizing returns over the long term.", 
        image: "https://media.istockphoto.com/id/698336830/photo/risk-management-concept-on.jpg?s=612x612&w=0&k=20&c=sPTavxuRXDQj5a7AvxA9Jbj8L3x1zVjGgpH0zkFisBQ=", 
        links: [
          { url: "https://www.youtube.com/watch?v=ZDExLnS9IC0", label: "Diversification Strategies" },
          { url: "https://www.youtube.com/watch?v=s7KApswForA", label: "Risk Assessment Methods" },
          { url: "https://www.youtube.com/watch?v=q5cDgSN0pyg", label: "Hedging Techniques" }
        ]
      },
      { 
        name: "TAXATION", 
        description: "*Taxation* in investing refers to the impact that taxes have on investment returns and the strategies used to minimize tax liabilities. Different investment activities, such as capital gains, dividends, and interest, are subject to various tax treatments. Understanding tax laws and planning accordingly is crucial for maximizing after-tax returns. Key strategies include *tax-efficient investing* (choosing investments that are taxed favorably), *capital gains tax management* (minimizing taxes on profits from asset sales), and *tax loss harvesting* (offsetting gains with losses). Proper tax planning can significantly enhance long-term investment outcomes.", 
        image: "https://www.econlib.org/wp-content/uploads/2018/05/taxation.jpg", 
        links: [
          { url: "https://www.youtube.com/watch?v=TLFG1_jFQ_Y", label: "Capital Gains Tax" },
          { url: "https://www.youtube.com/watch?v=kTyPCJO2EyU", label: "Tax-Efficient Investing" },
          { url: "https://www.youtube.com/watch?v=i6GW7ONm168", label: "Tax Loss Harvesting" }
        ]
      },
      { 
        name: "PSYCHOLOGICAL FACTORS", 
        description: "Psychological Factors** in investing refer to the influence of emotions, biases, and cognitive errors on financial decision-making. Investors often make decisions based on fear, greed, overconfidence, or herd behavior, which can lead to suboptimal investment choices. Understanding these psychological factors is crucial for developing a disciplined approach to investing. Concepts like *behavioral finance* explore how psychological influences affect market trends and investor behavior. *Investor psychology* and *emotional intelligence* help investors recognize and control these biases to make more rational, informed decisions, ultimately improving long-term investment performance.", 
        image: "https://thumbs.dreamstime.com/b/emotional-cycle-investing-153377543.jpg", 
        links: [
          { url: "https://www.youtube.com/watch?v=RwdNeMD_-0c", label: "Behavioral Finance" },
          { url: "https://www.youtube.com/playlist?list=PLFPxEPh85-qRCM6yFg1A2Dusjru9Cqo0B", label: "Investor Psychology" },
          { url: "https://www.youtube.com/watch?v=ED6I-zSSc94", label: "Emotional Intelligence in Investing" }
        ]
      },
      { 
        name: "FUNDAMENTAL ANALYSIS", 
        description: "Fundamental Analysis** involves evaluating a company's financial health and business performance to determine its intrinsic value. This analysis focuses on financial statements, such as income statements, balance sheets, and cash flow statements, to assess profitability, debt levels, and growth potential. Key metrics like price-to-earnings (P/E) ratio, earnings per share (EPS), and return on equity (ROE) are used to gauge a company's stability and prospects. By comparing a company’s fundamentals with its market price, investors can make informed decisions about whether the stock is undervalued or overvalued, helping to guide investment strategies.", 
        image: "https://nextlevelinvesting.com/wp-content/uploads/2022/03/Fundamental-analysis-course-investing-870x440.jpg", 
        links: [
          { url: "https://www.youtube.com/watch?v=lBBXmim527A", label: "Financial Statement Analysis" },
          { url: "https://www.youtube.com/watch?v=3W_LwpeG8c8", label: "Ratio Analysis" },
          { url: "https://www.youtube.com/watch?v=hKw_ZQqvhwk", label: "Industry Analysis" }
        ]
      }
    ];


  const [selectedTopic, setSelectedTopic] = useState(null);

  return (

    <div className="min-h-screen bg-black text-white font-sans pt-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500  to-purple-500 via-pink-500 bg-clip-text text-transparent">Learn, Invest, Grow</h1>

        {/* Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {topics.map((topic) => (
            <div
              key={topic.name}
              className="bg-[#4834b7] rounded-lg p-8 flex items-center justify-center text-white cursor-pointer text-xl font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#5842d8]"
              onClick={() => setSelectedTopic(topic)}
            >
              <h2 className="text-center">{topic.name}</h2>
            </div>
          ))}
        </div>
      </main>

      {/* Pop-up Card */}
      {selectedTopic && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full p-8 relative">
            <button
              onClick={() => setSelectedTopic(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div>
              <h2 className="text-3xl font-bold mb-4 text-white">{selectedTopic.name}</h2>
              <div className="mb-4">
                <img
                  src={selectedTopic.image}
                  alt={selectedTopic.name}
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
              </div>
              <p className="mb-4 text-gray-300">{selectedTopic.description}</p>
              <h3 className="text-xl font-semibold mb-2 text-white">Related Links:</h3>
              <ul className="list-disc list-inside text-blue-400">
                {selectedTopic.links.map(({ url, label }) => (
                  <li key={url}>
                    {url.startsWith("http") ? (
                      // External link
                      <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline cursor-pointer">
                        {label}
                      </a>
                    ) : (
                      // Internal link
                      <Link to={url} className="hover:underline cursor-pointer">
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Learn