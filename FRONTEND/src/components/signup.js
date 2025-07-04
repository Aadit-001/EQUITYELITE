import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaUser, FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';

export function Signup() {
  // Configure axios defaults
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL || 'https://equityelite-1.onrender.com';
  
  // State management
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const navigate = useNavigate();

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Google OAuth signup
  const signupWithGoogle = () => {
    setError('');
    setIsLoading(true);
    window.open(`${axios.defaults.baseURL}/auth/google/callback`, "_self");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Form validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const { confirmPassword, ...signupData } = formData;
      const result = await axios.post('/signup', signupData, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });

      // On successful signup, redirect to login
      if (isMounted) {
        navigate('/login', { 
          state: { 
            message: 'Account created successfully! Please log in.',
            email: formData.email 
          } 
        });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Signup failed. Please try again.";
      if (isMounted) {
        setError(errorMessage);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-6xl mt-10 bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Welcome Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-900 to-gray-900 p-8 flex flex-col justify-center items-center text-center text-white">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Join EquityElite</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-purple-300 mb-8">Start Your Journey</h2>
            <p className="text-gray-300 mb-8 max-w-md">
              Create your account to access premium market insights and trading tools.
            </p>
            <div className="h-1 w-20 bg-purple-500 mx-auto mb-8"></div>
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                Login here
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full md:w-1/2 bg-gray-800 p-6 md:p-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-white">Create Account</h2>
              <p className="text-gray-400 text-sm">Fill in your details to get started</p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-900/30 border border-red-500 text-red-200 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
              </div>

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
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="••••••••"
                    minLength="6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="••••••••"
                    minLength="6"
                  />
                </div>
              </div>

              <div className="flex items-start pt-1">
                <div className="flex items-center h-4">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="focus:ring-purple-500 h-3.5 w-3.5 text-purple-600 border-gray-600 rounded bg-gray-700 mt-0.5"
                  />
                </div>
                <label htmlFor="terms" className="ml-2 text-[11px] text-gray-400 leading-tight">
                  I agree to the{' '}
                  <a href="#" className="text-purple-400 hover:text-purple-300">
                    Terms
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-purple-400 hover:text-purple-300">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 disabled:opacity-70"
                >
                  {isLoading ? (
                    'Creating Account...'
                  ) : (
                    <>
                      Create Account <FaArrowRight className="ml-2" size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 bg-gray-800 text-[11px] text-gray-400">Or sign up with</span>
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={signupWithGoogle}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-700 rounded-lg shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  <FaGoogle className="h-4 w-4 text-red-500 mr-2" />
                  Sign up with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
