import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
// import axios from 'axios';

export function Navbar({ name, isLoggedIn }) {
    // name ? const initial = name.charAt(0) : "";
    let initial = "x";
    if (name) {
        initial = name.charAt(0).toUpperCase();
    }

    const [activeLink, setActiveLink] = useState(""); 
    useEffect(() => { 
        const currentPath = window.location.pathname; 
        setActiveLink(currentPath); 
    }, []); 
    const handleNavLinkClick = (path) => { 
        setActiveLink(path); 
    };
    // const [presentOrAbsent,setpresentOrAbsent] = useState(false); 
    // showOptions = () => {
    //     setpresentOrAbsent(!presentOrAbsent);
    // }

    // const [userdata,setuserdata] = useState({});
    // //isme agar user data mila tabhi hi user loggedin hai warna nhi hai

    // const getUser = async()=>{
    //     try {
    //         const res = await axios.get("http://localhost:3000/login/success",{withCredentials:true});
    //         console.log(res);
    //         setuserdata(res.data.user);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(()=> {
    //     getUser();
    // },[])

    return (
        <div className="h-16 w-full bg-black bg-opacity-50 backdrop-blur-md flex fixed z-20 shadow shadow-gray-700">
            <div className="h-full w-1/6 justify-start flex items-center pl-10 text-3xl text-white font-bold"><Link to=''>EquityElite</Link></div>
            <div className="h-full w-4/6 pl-52 pr-52 flex place-content-evenly items-center text-xl font-semibold text-white">
                <NavLink to={isLoggedIn ? "home" : "/login"} className={({ isActive }) => isActive && isLoggedIn ? "text-purple-600 " : ""}  onClick={() => handleNavLinkClick("/home")} >Home</NavLink>
                <NavLink to={isLoggedIn ? "stocks" : "/login"} className={({ isActive }) => isActive && isLoggedIn ? "text-purple-600 " : ""} onClick={() => handleNavLinkClick("/stocks")}  >Stocks</NavLink>
                {/* <NavLink to={isLoggedIn ? "community" : "/login"} className={({isActive}) => isActive && isLoggedIn ? "text-purple-600" onClick={() => handleNavLinkClick("/stocks")}  : ""} >Community</NavLink>       */}
                <NavLink to={isLoggedIn ? "news" : "/login"} className={({ isActive }) => isActive && isLoggedIn ? "text-purple-600 " : ""} onClick={() => handleNavLinkClick("/news")}>News</NavLink>
                <NavLink to={isLoggedIn ? "learn" : "/login"} className={({ isActive }) => isActive && isLoggedIn ? "text-purple-600 " : ""}  onClick={() => handleNavLinkClick("/learn")} >Learn</NavLink>
            
            <div className={`absolute bottom-2 left-0 h-1 bg-purple-600 transition-all duration-300 ease-in-out ${isLoggedIn ? "visible" : "hidden"}`} 
            style={{ 
                width: '5%', // Adjust based on number of links 
                transform: activeLink === "/home" ? 'translateX(690%)' : 
                           activeLink === "/stocks" ? 'translateX(870%)' : 
                           activeLink === "/news" ? 'translateX(1040%)' : 
                           activeLink === "/learn" ? 'translateX(1210%)' : 
                           'translateX(690%)', 
            }} />

            </div>
            <div className="h-full w-1/6 justify-end flex items-center pr-6">
                <Link to={isLoggedIn ? "/profile" : "/login"} className={`rounded-full h-11 w-11 pb-1 ${isLoggedIn ? "visible" : "hidden"} bg-purple-700 text-white text-3xl font-bold flex justify-center items-center cursor-pointer`} >
                    {name ? initial : ""}
                </Link>
            </div>
        </div>
    );
}