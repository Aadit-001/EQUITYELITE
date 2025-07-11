import React from 'react'
import { useState, useEffect ,useContext} from 'react';
import axios from 'axios';
// import PostForm from '../components/postForm';
import PostForm from '../components/postForm'
import StocksPage from '../components/StocksPage'
// import GlobalContext from '../GlobalContext';
// import New from '../components/New';
// import {useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';

export function Home({ setIsLoggedIn, setuserName }) {
  axios.defaults.withCredentials = true; ////// ye kiya tabhi wo post kar paya mai ,google se login hone ke baad, kyu ki ye karne ke baad hi cookie , token rew.user mai aata hai
  // const [userdata, setuserdata] = useState({});
  const [posts, setPosts] = useState([]);
  // const url = process.env.REACT_APP_API_BASE_URL;
  const url = 'https://equityelite-1.onrender.com';
  //isme agar user data mila tabhi hi user loggedin hai warna nhi hai

  // const globalVariable = useContext(GlobalContext);


  
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${url}/login/success`, { withCredentials: true });
        console.log(res);
        // setuserdata(res.data.user);
        setIsLoggedIn(true);
        localStorage.setItem("accessToken",res.data.accessToken);
        localStorage.setItem("accessToken",res.data.refreshToken);
        setuserName(res.data.user.username);
      } catch (error) {
        console.log(error)
      }
    }
    getUser();
  },[setIsLoggedIn,setuserName])
  
  const [postOpen, setPostOpen] = useState(false);
  
  const PostTabStatus = () => {
    setPostOpen(!postOpen);
  }
  
  useEffect(() => {
  const fetchPosts = async () => {
    try {
      // const token = Cookies.get('accessToken'); // Retrieve token from cookies
      const response = await axios.get(`${url}/home`, {
        withCredentials: true,
      });

      setPosts(response.data.data); // Assuming the data is in response.data.data
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
    fetchPosts();
  },[postOpen])
  
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const accessToken = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
  //     if (!accessToken) {
  //       navigate('/login');
  // try {
  //   const response = await axios.get('http://localhost:3000/', {
  //     headers: { 'Authorization': `Bearer ${accessToken.split('=')[1]}` }
  //   });
  //   // setIsLoggedIn(true);
  //   // setUser(response.data.user);
  // } catch (error) {
  //   console.error('Error authenticating with access token:', error);
  //   // try {
  //   //   const refreshToken = document.cookie.split('; ').find(row => row.startsWith('refreshToken='));
  //   //   if (refreshToken) {
  //   //     const response = await axios.post('http://localhost:3000/refresh-token', {
  //   //      - token: refreshToken.split('=')[1]
  //   //     });
  //   //     document.cookie = `accessToken=${response.data.accessToken}; path=/;`;
  //   //     setIsLoggedIn(true);
  //   //     setUser(response.data.user);
  //   //   }
  //   // } catch (refreshError) {
  //   //   console.error('Error refreshing token:', refreshError);
  //   // }
  // }

  //     }
  //   };

  //   checkAuth();
  // }, []);

  return (
    <>
      <div className='min-h-screen bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black'>
        {postOpen && <PostForm setPostOpen={setPostOpen} />} 
        <div className=' container mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex mt-10 lg:-mt-2 flex-col lg:flex-row'>
            {/* Left sidebar - hidden on mobile, 1/4 width on larger screens */}
            <div className='hidden lg:block lg:w-1/4'></div>
            
            {/* Main content - full width on mobile, 1/2 on larger screens */}
            <div className='w-full lg:w-2/4 lg:mt-14'>
              {posts.map((post) => (
                <StocksPage key={post._id} post={post} />
              ))}
            </div>
            
            {/* Right sidebar - hidden on mobile, 1/4 width on larger screens */}
            <div className='hidden lg:block lg:w-1/4 lg:pl-10'></div>
          </div>
        </div>
        
        {/* Floating action button - responsive positioning */}
        <button 
          onClick={PostTabStatus} 
          className="fixed bottom-6 right-6 lg:right-52 w-16 h-16 lg:w-32 lg:h-12 rounded-full text-white bg-violet-800 hover:bg-violet-600 transition-colors flex items-center justify-center text-2xl font-bold shadow-lg z-50"
          aria-label="Create new post"
        >
          <span className="lg:hidden">+</span>
          <span className="hidden lg:inline">+ POST</span>
        </button>
      </div>
    </>
  )
}