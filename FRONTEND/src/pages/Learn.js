import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiExternalLink, FiX, FiBookOpen, FiSearch, FiChevronRight } from 'react-icons/fi';
import { FaChartLine, FaShieldAlt, FaRocket, FaLightbulb } from 'react-icons/fa';

function Learn({setIsLoggedIn}) {
  axios.defaults.withCredentials = true; 
  const url = process.env.REACT_APP_API_BASE_URL; 
  // const [globalVariable,setGlobalVariable] = useContext(GlobalContext);
  // const [userdata,setuserdata] = useState({});
    //isme agar user data mila tabhi hi user loggedin hai warna nhi hai

    useEffect(()=> {
      const getUser = async()=>{
        try {
            const res = await axios.get(`${url}/login/success`,{withCredentials:true});
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

  // Add modal open/close animation state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = (topic) => {
    setSelectedTopic(topic);
    setIsModalVisible(true);
    setTimeout(() => setIsModalOpen(true), 10);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsModalVisible(false);
      setSelectedTopic(null);
    }, 200);
  };

  // Add global styles for animations and custom scrollbar
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-fade-in {
        animation: fadeInUp 0.5s ease-out forwards;
      }
      
      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: rgba(17, 24, 39, 0.5);
        border-radius: 10px;
      }
      
      ::-webkit-scrollbar-thumb {
        background: rgba(139, 92, 246, 0.5);
        border-radius: 10px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(167, 139, 250, 0.7);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Learn & Master Investing
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Build your financial knowledge with our comprehensive guides and resources. 
              Whether you're a beginner or an experienced investor, we've got you covered.
            </p>
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Search topics..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 -mt-10">
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['All Topics', 'Beginner', 'Intermediate', 'Advanced', 'Strategies', 'Analysis'].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === 'All Topics' 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                  : 'bg-gray-900/50 text-gray-300 hover:bg-gray-800/70'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic, index) => (
            <div
              key={topic.name}
              className="group relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-purple-500/50 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-xl"
              onClick={() => openModal(topic)}
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`
              }}
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={topic.image}
                  alt={topic.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600/90 to-blue-600/90 shadow-lg">
                      <FiBookOpen className="w-5 h-5 text-white" />
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-300">
                      {['Beginner', 'Intermediate', 'Advanced'][index % 3]}
                    </span>
                  </div>
                  <h2 className="mt-3 text-xl font-bold text-white">
                    {topic.name.replace(/([A-Z])/g, ' $1').trim()}
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                  {topic.description.replace(/\*\*|\*/g, '')}
                </p>
                <div className="flex items-center text-purple-400 text-sm font-medium">
                  Start Learning
                  <FiChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {isModalVisible && (
        <div 
          className={`fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeModal}
        >
          <div 
            className={`relative bg-gray-900 rounded-2xl max-w-4xl w-full border border-gray-800 shadow-2xl overflow-hidden transition-all duration-300 ${isModalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-800/80 hover:bg-gray-700/90 transition-colors z-10 backdrop-blur-sm"
              aria-label="Close"
            >
              <FiX className="w-5 h-5 text-gray-300" />
            </button>
            
            <div className="h-56 bg-gradient-to-r from-purple-900/60 to-blue-900/60 relative overflow-hidden">
              <img
                src={selectedTopic?.image}
                alt={selectedTopic?.name}
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 flex items-end p-8">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-600/90 to-blue-600/90 text-white mb-3">
                    {['Beginner', 'Intermediate', 'Advanced'][topics.findIndex(t => t.name === selectedTopic?.name) % 3]}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    {selectedTopic?.name.replace(/([A-Z])/g, ' $1').trim()}
                  </h2>
                </div>
              </div>
            </div>

            <div className="p-8 overflow-y-auto max-h-[60vh]">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                  {selectedTopic?.description}
                </p>
              </div>

              <div className="mt-10">
                <div className="flex items-center mb-6">
                  <div className="h-px bg-gradient-to-r from-transparent via-purple-600/50 to-transparent flex-1"></div>
                  <h3 className="mx-4 text-xl font-semibold text-white whitespace-nowrap">
                    Recommended Resources
                  </h3>
                  <div className="h-px bg-gradient-to-r from-transparent via-purple-600/50 to-transparent flex-1"></div>
                </div>
                
                <div className="grid gap-4">
                  {selectedTopic?.links.map(({ url, label }, index) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-5 bg-gray-800/30 hover:bg-gray-800/60 rounded-xl transition-all duration-300 border border-gray-800/50 hover:border-purple-500/30"
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/90 to-blue-600/90 flex items-center justify-center text-white mr-4">
                          <span className="font-bold">{index + 1}</span>
                        </div>
                        <span className="text-white group-hover:text-purple-400 transition-colors font-medium">
                          {label}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500 group-hover:text-purple-400 transition-colors">
                        <span className="text-sm mr-2 hidden sm:inline">Open</span>
                        <FiExternalLink className="w-4 h-4" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="mt-10 pt-6 border-t border-gray-800/50">
                <p className="text-center text-gray-500 text-sm">
                  Ready to dive deeper? Explore more resources to enhance your knowledge.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default Learn;