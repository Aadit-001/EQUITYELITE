import { Link } from 'react-router-dom';
import { HomePageStockSection } from './components/homepagestocksection.js';
import { FaChartLine, FaShieldAlt, FaRocket, FaLightbulb } from 'react-icons/fa';
import hero from './assests/hero.png';

function App() {
  const features = [
    {
      icon: <FaChartLine className="text-3xl text-purple-500" />,
      title: "Real-Time Data",
      description: "Access up-to-the-minute market data and analytics"
    },
    {
      icon: <FaShieldAlt className="text-3xl text-purple-500" />,
      title: "Secure Platform",
      description: "Bank-level security to protect your investments"
    },
    {
      icon: <FaRocket className="text-3xl text-purple-500" />,
      title: "Powerful Tools",
      description: "Advanced charting and technical analysis tools"
    },
    {
      icon: <FaLightbulb className="text-3xl text-purple-500" />,
      title: "Expert Insights",
      description: "Learn from market experts and analysts"
    }
  ];

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col">
          <div className="max-w-7xl mx-auto w-full mb-2 px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
            {/* Image for mobile and tablet - appears at the top */}
            <div className="lg:hidden w-full max-w-md mx-auto mt-20">
              <div className="relative w-full h-52 sm:h-64">
                <img 
                  src={hero}
                  alt="Market Analytics"
                  className="w-full h-full object-contain"
                />
                <div className="absolute -left-1/2 -top-1/2 w-96 h-96 bg-purple-900/20 rounded-full filter blur-3xl -z-10"></div>
              </div>
            </div>

            {/* Content Container */}
            <div className="flex flex-col lg:flex-row items-center mt-12 md:mt-12 lg:mt-36">
              {/* Left Side - Text Content */}
              <div className="w-full lg:w-1/2 text-center lg:text-left lg:pr-8">
                <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                    EQUITYELITE
                  </span>
                </h1>
                <p className="text-xl sm:text-xl md:text-2xl lg:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
                  Your Ultimate Destination for Real-Time Market Insights and Advanced Trading Tools.
                  Make informed decisions with our comprehensive financial platform.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
                  <Link 
                    to="/signup" 
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/20 text-sm sm:text-base"
                  >
                    Get Started Free
                  </Link>
                  <Link 
                    to="/login" 
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-purple-600 text-purple-300 font-semibold rounded-lg hover:bg-purple-900/30 transition-all duration-300 text-sm sm:text-base"
                  >
                    Sign In
                  </Link>
                </div>
              </div>

          {/* Right Side - Image */}
          <div className="hidden lg:block absolute right-44 top-1/2 -translate-y-1/2 w-full h-1/2 translate-x-1/2">
            <div className="relative w-full h-full">
              {/* Image with gradient overlay */}
              <div className="absolute inset-0 left-0 right-4 -top-24 bottom-0">
                  <img 
                    src={hero}
                    alt="Market Analytics"
                  className="w-[60%] h-full object-cover "
                  />
                {/* </div> */}
                {/* Gradient overlay to blend with UI */}
                {/* <div className="absolute inset-0 bg-gradient-to-l from-gray-900 via-gray-900/80 to-transparent"></div> */}
              </div>
              
              {/* Glow effect */}
              <div className="absolute -right-1/2 -left-1/2 -top-1/2 w-96 h-96  bg-purple-900/20 rounded-full filter blur-3xl"></div>
            </div>
          </div>

          {/* Stock Section - At the bottom */}
        </div>
        </div>
          <div className="w-full mt-0 mx-0 lg:mx-24">
            <HomePageStockSection/>
          </div>
      </div>

      {/* Features Section */}
      {/* <div className="py-20 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Powerful Features</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-purple-300 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Market Data Section */}
      {/* <div className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HomePageStockSection />
        </div>
      </div> */}

      {/* CTA Section */}
      {/* <div className="bg-gradient-to-r from-purple-900/80 to-purple-800/80 py-16 border-t border-b border-purple-900/50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Elevate Your Trading Experience?</h2>
          <p className="text-xl text-gray-300 mb-8">Join thousands of traders who trust EquityElite for their investment journey.</p>
          <Link 
            to="/signup" 
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/20"
          >
            Start Trading Now
          </Link>
        </div>
      </div> */}
    </div>
    </div>
    
  );
}

export default App;
