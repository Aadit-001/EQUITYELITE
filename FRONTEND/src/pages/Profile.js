import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogout from '../Hooks/useLogout';
import { FiLogOut, FiUser, FiClock, FiFileText, FiImage } from 'react-icons/fi';

function Profile({ setIsLoggedIn }) {
  axios.defaults.withCredentials = true;
  const { logout, isuserlogout } = useLogout();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle logout redirection
  useEffect(() => {
    if (isuserlogout) {
      setIsLoggedIn(false);
      navigate('/login');
    }
  }, [isuserlogout, navigate, setIsLoggedIn]);

  // Fetch user data and posts
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`http://localhost:8080/profile`, {
          withCredentials: true,
        });
        
        setUser(response.data.data.user);
        setPosts(response.data.data.posts || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-24 w-24 bg-gray-700/50 rounded-full mb-4"></div>
          <div className="h-6 w-48 bg-gray-700/50 rounded mb-2"></div>
          <div className="h-4 w-32 bg-gray-700/50 rounded"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center">
          <div className="text-red-400 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Profile Not Found</h2>
          <p className="text-gray-300">The requested profile could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="relative">
        {/* Cover Photo */}
        {/* <div className="h-48 bg-gradient-to-r from-purple-900/50 to-blue-900/50 w-full"></div> */}
        
        {/* Profile Header */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between">
            <div className="flex items-end mt-20">
              <div className="h-32 w-32 rounded-full border-4 border-gray-900 bg-gradient-to-br from-purple-600/50 to-blue-600/50 flex items-center justify-center text-5xl font-bold text-white shadow-xl">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="ml-6 mb-2">
                <h1 className="text-3xl text-white font-bold">{user.username}</h1>
                <div className="flex items-center text-gray-300 mt-1">
                  <FiUser className="mr-1" size={14} />
                  <span className="text-sm text-gray-300">Member since {formatDate(user.createdAt)}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={logout}
              className="mt-4 rounded-md md:mt-0 flex items-center px-6 py-2 bg-red-600/50 hover:bg-red-700/50 text-white font-medium transition-colors duration-200"
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
          </div>
          <hr className="my-8 border-gray-700/50"></hr>
          
          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-colors">
              <div className="text-gray-300 text-sm font-medium mb-1">Total Posts</div>
              <div className="text-3xl font-bold text-white">{posts.length}</div>
              <div className="h-1 bg-gradient-to-r from-purple-500/50 to-transparent rounded-full mt-3"></div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-colors">
              <div className="text-gray-300 text-sm font-medium mb-1">Member Since</div>
              <div className="text-xl font-semibold text-white">{formatDate(user.createdAt)}</div>
              <div className="h-1 bg-gradient-to-r from-blue-500/50 to-transparent rounded-full mt-3"></div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-colors">
              <div className="text-gray-300 text-sm font-medium mb-1">Last Active</div>
              <div className="text-xl font-semibold text-white">Recently</div>
              <div className="h-1 bg-gradient-to-r from-green-500/50 to-transparent rounded-full mt-3"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl text-white font-bold mb-6">Your Posts</h2>
        
        {posts.length === 0 ? (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 text-center border-2 border-dashed border-gray-700/50">
            <div className="text-gray-300 text-5xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-white mb-2">No Posts Yet</h3>
            <p className="text-gray-300 max-w-md mx-auto">
              You haven't created any posts yet. Start sharing your thoughts with the community!
            </p>
            <button className="mt-4 px-6 py-2 bg-purple-600/50 hover:bg-purple-700/50 text-white rounded-lg font-medium transition-colors">
              Create Your First Post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div 
                key={post._id} 
                className="group mb-10 bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10"
              >
                {post.postFile && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.postFile} 
                      alt="Post media" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/600x400/1a1a2e/ffffff?text=No+Image';
                      }}
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center text-sm text-gray-300 mb-3">
                    <FiClock className="mr-1" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-300 text-sm line-clamp-3">
                    {post.description}
                  </p>
                  {/* <div className="mt-4 pt-3 border-t border-gray-700/50 flex justify-between items-center">
                    <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                      View Details →
                    </button>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-300 hover:text-purple-400 hover:bg-gray-700/50 rounded-full transition-colors">
                        <FiFileText />
                      </button>
                      <button className="p-2 text-gray-300 hover:text-purple-400 hover:bg-gray-700/50 rounded-full transition-colors">
                        <FiImage />
                      </button>
                    </div>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
