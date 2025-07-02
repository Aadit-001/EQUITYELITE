import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import logo from '../assests/logo.png';
export function Navbar({ name, isLoggedIn }) {
    const navRef = useRef(null);
    const location = useLocation();
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const [activeLink, setActiveLink] = useState('');
    
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

    return (
        <nav className="h-16 w-full bg-black/90 backdrop-blur-md fixed z-20 border-b border-purple-900/30">
            <div className="container mx-auto h-full px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link 
                    to="/" 
                    className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
                    aria-label="EquityElite Home"
                >
                    <img src={logo} alt="logo" className="-ml-10 w-72 h-20" />
                </Link>

                {/* Navigation Links */}
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

                {/* Profile Button */}
                <div className="flex items-center -mr-8">
                    <Link 
                        to={isLoggedIn ? "/profile" : "/login"} 
                        className={`rounded-full h-10 w-10 flex items-center justify-center text-white font-bold transition-all duration-200 
                            ${isLoggedIn ? 'bg-gradient-to-br from-purple-600 to-purple-400 hover:shadow-lg hover:shadow-purple-500/30' : 'bg-gray-800'}`}
                        aria-label={isLoggedIn ? "User Profile" : "Login"}
                    >
                        {isLoggedIn ? getInitial() : '?'}
                    </Link>
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