import React, { useState, useEffect } from 'react'
import { FaUserLarge } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";
import { useAuth } from '../../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // Add state and effect for animation
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const { login, user, logout } = useAuth();
    const navigate = useNavigate();

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    // Simulate a login function
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            if (!formData.username.trim() || !formData.password.trim()) {
                setError('Please fill in all fields');
                setIsLoading(false);
                return;
            }

            await new Promise(resolve => setTimeout(resolve, 1000));

            if (formData.username && formData.password) {
                const userData = {
                    id: 1,
                    username: formData.username,
                    email: "user@example.com"
                };
                
                login(userData);
                // Navigate to dashboard after successful login
                navigate('/');
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Simulate a logout function
    const handleLogout = () => {
        logout();
        setFormData({ username: '', password: '' });
    };



    useEffect(() => {
        setShow(true);
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Left section - Decorative shapes */}
        <div className="left hidden lg:flex lg:w-1/2 w-full flex-col justify-center items-center relative min-h-screen overflow-hidden ">
            <div className="absolute inset-0 flex flex-col justify-center items-center space-y-4">
                <div className={`bg-gradient-to-r from-rose-400 to-fuchsia-700 w-20 h-20 xl:w-24 xl:h-24 rounded-full transform rotate-45 transition-all duration-700 ease-out ${show ? '-translate-y-16 -translate-x-8 opacity-100 scale-100' : '-translate-y-32 opacity-0 scale-75'}`}></div>
                <div className={`bg-gradient-to-r from-rose-400 to-fuchsia-700 w-32 h-32 xl:w-60 xl:h-60 rounded-full transform rotate-45 border-8 border-pink-200 transition-all duration-700 ease-out delay-100 ${show ? '-translate-y-8 -translate-x-16 opacity-100 scale-100' : '-translate-y-20 opacity-0 scale-75'}`}></div>
                <div className={`bg-gradient-to-r from-rose-400 to-fuchsia-700 w-16 h-16 xl:w-20 xl:h-20 rounded-full transform rotate-45 transition-all duration-700 ease-out delay-200 ${show ? '-translate-y-20 -translate-x-32 opacity-100 scale-100' : '-translate-y-40 opacity-0 scale-75'}`}></div>
                <div className={`bg-gradient-to-r from-rose-400 to-fuchsia-700 w-24 h-24 xl:w-28 xl:h-28 rounded-full transform rotate-45 transition-all duration-700 ease-out delay-300 ${show ? 'translate-y-16 translate-x-12 opacity-100 scale-100' : 'translate-y-32 opacity-0 scale-75'}`}></div>
            </div>
        </div>
        
        {/* Right section - Login form */}
        <div
            className={`right lg:w-1/2 w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-8 transition-all duration-700 ease-out
            ${show ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
            <div className="form flex flex-col justify-center items-center w-full max-w-sm sm:max-w-md lg:max-w-lg p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-lg">
                <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 lg:mb-10 text-center'>User Login</h1>
                
                {/* Show current user status */}
                {user && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded w-full text-sm sm:text-base">
                        Welcome back, {user.username}!
                        <button 
                            onClick={handleLogout}
                            className="ml-2 sm:ml-4 px-2 sm:px-3 py-1 bg-red-500 text-white rounded text-xs sm:text-sm hover:bg-red-600 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                )}

                {/* Error message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded w-full text-center text-sm sm:text-base">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className='flex flex-col gap-3 sm:gap-4 w-full items-center justify-center'>
                    <div className="name flex bg-gray-200 p-3 sm:p-4 gap-3 sm:gap-4 rounded-xl w-full">
                        <label htmlFor="username" className='flex items-center'>
                            <FaUserLarge className='text-gray-500 text-lg sm:text-xl lg:text-2xl' />
                        </label>
                        <input 
                            type="text" 
                            name="username" 
                            id="username" 
                            value={formData.username}
                            onChange={handleInputChange}
                            className='bg-transparent outline-none border-none focus:border-none placeholder:text-gray-400 w-full text-sm sm:text-base' 
                            placeholder='Username'
                            required
                        />
                    </div>

                    <div className="password flex bg-gray-200 p-3 sm:p-4 gap-3 sm:gap-4 rounded-xl w-full">
                        <label htmlFor="password" className='flex items-center'>
                            <IoMdLock className='text-gray-500 text-lg sm:text-xl lg:text-2xl' />
                        </label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            value={formData.password}
                            onChange={handleInputChange}
                            className='bg-transparent outline-none border-none focus:border-none placeholder:text-gray-400 w-full text-sm sm:text-base' 
                            placeholder='Password'
                            required
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className={`mt-4 py-3 sm:py-4 text-lg sm:text-xl px-6 sm:px-8 rounded-xl w-full text-white transition-all duration-300 font-medium ${
                            isLoading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-orange-400 to-fuchsia-700 hover:from-orange-500 hover:to-fuchsia-800 hover:shadow-lg transform hover:scale-105'
                        }`}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    
                    <p className='mt-2 text-gray-500 text-center text-xs sm:text-sm'>
                        Demo: Use any username and password
                    </p>
                </form>
            </div>
            <div className="last flex text-gray-500 w-fit justify-center items-center gap-2 mt-4 sm:mt-6 text-sm sm:text-base">
                <h1
                className='hover:text-gray-700 cursor-pointer transition-colors duration-300'
                >Create your Account</h1>
                {/* arrow symbol */}
                <span className='text-lg sm:text-xl lg:text-2xl'>→</span>
            </div>
        </div>
    </div>
)
}

export default Login