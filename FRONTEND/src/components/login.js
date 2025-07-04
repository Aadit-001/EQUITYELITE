import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";

export function Login({ setuserName, setIsLoggedIn }) {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL || 'https://equityelite-1.onrender.com';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Google OAuth login
  const loginWithGoogle = () => {
    window.open(`${process.env.REACT_APP_API_BASE_URL || 'https://equityelite-1.onrender.com'}/auth/google/callback`, "_self");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    try {
      const result = await axios.post(`/login`, { email, password }, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });

      const { user, accessToken, refreshToken } = result.data.data;
      
      // Store tokens and update auth state
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      axios.defaults.headers.common['x-access-token'] = accessToken;

      setuserName(user.username);
      setIsLoggedIn(true);
      navigate('/home');
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mt-10 bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Welcome Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-900 to-gray-900 p-8 flex flex-col justify-center items-center text-center text-white">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome Back</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-purple-300 mb-8">To EquityElite</h2>
            <p className="text-gray-300 mb-8 max-w-md">
              Access your personalized dashboard and take control of your investments with real-time market data.
            </p>
            <div className="h-1 w-20 bg-purple-500 mx-auto mb-8"></div>
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 bg-gray-800 p-8 md:p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
              <p className="text-gray-400">Enter your credentials to access your account</p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-900/30 border border-red-500 text-red-200 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 disabled:opacity-70"
                >
                  {isLoading ? (
                    'Signing in...'
                  ) : (
                    <>
                      Sign In <FaArrowRight className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={loginWithGoogle}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-700 rounded-lg shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  <FaGoogle className="h-5 w-5 text-red-500 mr-2" />
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}