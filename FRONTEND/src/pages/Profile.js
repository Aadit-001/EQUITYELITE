import axios from 'axios';
import React from 'react';
// import { Link} from 'react-router-dom';
import useLogout from '../Hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect,useContext } from 'react';
// import GlobalContext from '../GlobalContext';


function Profile({setIsLoggedIn}) {
  axios.defaults.withCredentials = true; 
  // const [globalVariable,setGlobalVariable] = useContext(GlobalContext);

  
  const { logout, isuserlogout } = useLogout(); 
  const navigate = useNavigate(); 
  React.useEffect(() => { 
    if (isuserlogout) { 
      setIsLoggedIn(false);
      navigate('/login'); 
    } 
  }, [isuserlogout, navigate]);



  //////////////////////////////////////////
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const token = Cookies.get('accessToken'); // Retrieve token from cookies
        const response = await axios.get(`http://localhost:8080/profile`, {
          withCredentials: true,
        });

        setUser(response.data.data.user);
        setPosts(response.data.data.posts);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
  ///////////////////////////////////////////////////

  return (
    <div className='p-24 '>
      <button onClick={logout} className=" fixed top-36 right-24 h-10 w-36 z-50 rounded-lg bg-red-600 text-white font-bold text-xl ">
        Logout
      </button>

      <div className="flex items-center mb-6">
        <div className='rounded-full h-20 w-20 text-white flex justify-center items-center text-4xl font-extrabold bg-purple-600'>{user.username.charAt(0).toUpperCase()}</div>
        <h1 className="text-2xl font-bold text-white ml-10">{user.username}</h1>
      </div>
      <hr className='border-1 bg-slate-600'></hr>
      <div className='text-white font-bold text-3xl mt-10'>ALL POSTS</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {posts.map((post) => (
          <div key={post._id} className="bg-gradient-to-br hover:scale-105 transition-transform duration-75 from-pink-600/50 via-purple-600/50 to-blue-600/50 p-4 rounded-lg shadow-lg text-white">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="mt-2">{post.description}</p>
            {post.postFile && <img src={post.postFile} alt="Post media" className="mt-2 rounded w-full h-40 object-cover" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';


//   return (
//     <div className="p-4">
//       <div className="flex items-center mb-6">
//         <img src={user.profileImage} alt="Profile" className="w-16 h-16 rounded-full mr-4" />
//         <h1 className="text-2xl font-bold text-white">{user.name}</h1>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {posts.map((post) => (
//           <div key={post._id} className="bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 p-4 rounded-lg shadow-lg text-white">
//             <h2 className="text-xl font-bold">{post.title}</h2>
//             <p className="mt-2">{post.description}</p>
//             {post.postFile && <img src={post.postFile} alt="Post media" className="mt-2 rounded w-full h-40 object-cover" />}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
