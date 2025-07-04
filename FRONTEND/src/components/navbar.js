import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../assests/logo.png';
export function Navbar({ name, isLoggedIn }) {
    const navRef = useRef(null);
    const location = useLocation();
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const [activeLink, setActiveLink] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const navItems = [
        { path: 'home', label: 'Home' },
        { path: 'stocks', label: 'Stocks' },
        { path: 'news', label: 'News' },
        { path: 'learn', label: 'Learn' }
    ];

    // Get user initial
    const getInitial = () => {
        if (!name) return 'U';
        return name.charAt(0).toUpperCase();
    };

    // Update indicator position when active link changes
    useEffect(() => {
        setActiveLink(location.pathname);
        
        if (navRef.current && isLoggedIn) {
            const activeElement = navRef.current.querySelector('a[class*="active"]');
            if (activeElement) {
                const { offsetLeft, offsetWidth } = activeElement;
                setIndicatorStyle({
                    width: `${offsetWidth}px`,
                    transform: `translateX(${offsetLeft}px)`,
                    opacity: 1
                });
            }
        }
    }, [location.pathname, isLoggedIn]);

    const getNavLinkClass = (isActive) => 
        `relative px-4 py-2 transition-colors duration-200 ${isActive ? 'text-purple-400' : 'text-gray-300 hover:text-purple-300'}`;

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    return (
        <nav className="h-16 w-full bg-black/90 backdrop-blur-md fixed z-40 border-b border-purple-900/30">
            <div className="container mx-auto h-full px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link 
                    to="/" 
                    className="text-2xl md:text-3xl ml-0 lg:-ml-10 font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
                    aria-label="EquityElite Home"
                >
                    <img src={logo} alt="logo" className="w-48 md:w-60 h-16 md:h-20" />
                </Link>

                {/* Desktop Navigation */}
                <div 
                    ref={navRef}
                    className="hidden md:flex items-center h-full relative gap-2 -ml-20"
                >
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={isLoggedIn ? `/${item.path}` : '/login'}
                            className={({ isActive }) => getNavLinkClass(isActive && isLoggedIn)}
                            end
                        >
                            {item.label}
                        </NavLink>
                    ))}
                    
                    {/* Active Link Indicator */}
                    {isLoggedIn && (
                        <span 
                            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-purple-300 transition-all duration-300 ease-out"
                            style={indicatorStyle}
                            aria-hidden="true"
                        />
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-white p-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>

                {/* Desktop Profile Button */}
                <div className="hidden md:flex items-center -mr-8">
                    <Link 
                        to={isLoggedIn ? "/profile" : "/login"} 
                        className={`rounded-full h-10 w-10 flex items-center justify-center text-white font-bold transition-all duration-200 
                            ${isLoggedIn ? 'bg-gradient-to-br from-purple-600 to-purple-400 hover:shadow-lg hover:shadow-purple-500/30' : 'bg-gray-800'}`}
                        aria-label={isLoggedIn ? "User Profile" : "Login"}
                    >
                        {isLoggedIn ? getInitial() : '?'}
                    </Link>
                </div>

                {/* Mobile Menu Overlay */}
                <div 
                    className={`fixed inset-0 bg-black/80 z-30 transform transition-transform duration-300 ease-in-out ${
                        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    } md:hidden`}
                    onClick={() => setIsMenuOpen(false)}
                ></div>

                {/* Mobile Menu */}
                <div 
                    className={`fixed top-0 right-0 h-screen w-64 bg-gray-900 z-40 transform transition-transform duration-300 ease-in-out ${
                        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    } md:hidden flex flex-col`}
                >
                    <div className="flex justify-between items-center p-4 border-b border-gray-800">
                        <h3 className="text-white text-lg font-semibold">EquityElite</h3>
                        <button 
                            onClick={() => setIsMenuOpen(false)}
                            className="text-white p-2"
                            aria-label="Close menu"
                        >
                            <FiX size={24} />
                        </button>
                    </div>
                    
                    <nav className="flex-1 overflow-y-auto p-4 space-y-4">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={isLoggedIn ? `/${item.path}` : '/login'}
                                className={({ isActive }) => `block px-4 py-3 rounded-lg text-white hover:bg-gray-800 transition-colors ${isActive ? 'bg-gray-800' : ''}`}
                                end
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                    
                    {/* Mobile Profile Section */}
                    <div className="p-4 border-t border-gray-800">
                        <Link 
                            to={isLoggedIn ? "/profile" : "/login"} 
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <div className={`rounded-full h-10 w-10 flex items-center justify-center text-white font-bold ${
                                isLoggedIn ? 'bg-gradient-to-br from-purple-600 to-purple-400' : 'bg-gray-700'
                            }`}>
                                {isLoggedIn ? getInitial() : '?'}
                            </div>
                            <div className="text-white">
                                <p className="font-medium">{isLoggedIn ? name : 'Guest'}</p>
                                <p className="text-sm text-gray-400">{isLoggedIn ? 'View Profile' : 'Login'}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

Navbar.propTypes = {
    name: PropTypes.string,
    isLoggedIn: PropTypes.bool.isRequired
};

Navbar.defaultProps = {
    name: '',
};