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
  //isme agar user data mila tabhi hi user loggedin hai warna nhi hai

  // const globalVariable = useContext(GlobalContext);


  
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/login/success`, { withCredentials: true });
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
      const response = await axios.get(`http://localhost:8080/home`, {
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
      <div className=' bg-black flex bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black '>
        {postOpen && <PostForm setPostOpen={setPostOpen} /> } 
        <div className='w-1/4 h-full'></div>
        <div className='w-2/4 h-auto mt-14'>
          {
            posts.map((post) => (
              <StocksPage key={post._id} post={post} />
            ))
          }
        </div>
        <div className='w-1/4 pl-10 h-full'></div>
        <button onClick={PostTabStatus} className=" w-32 h-12 fixed bottom-4 right-52 rounded-full text-white bg-violet-800 hover:bg-violet-600 transition-colors flex items-center justify-center text-2xl font-bold shadow-lg">
            + POST
        </button>
      </div>
    </>
  )
}