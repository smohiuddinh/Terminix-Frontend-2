// LoginPage.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff, Mail, Lock, BarChart3 } from 'lucide-react';
import logo from "../../assets/ICCD-01.png";
import { useLogin } from '../../../api/client/user';

// Validation Schema
const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email('Please enter a valid email address')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    remember: yup.boolean()
});

const Login5 = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { userLogin, isSuccess, isPending, isError, reset, error } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
        mode: 'onChange'
    });

    const onSubmit = async (data) => {
        userLogin(data)
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-[#44A4AD] via-[#2E7A81] to-[#1C4C50] flex">

            {/* Left Side - Dashboard Preview/Branding */}
            <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden p-12 flex-col justify-between">
                <div className="relative z-10">
                    {/* Logo/Brand Section */}
                    <div className="flex items-center space-x-4 mb-12">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-white/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                            <div className="relative w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                <img
                                    src={logo}
                                    alt="ICCD Logo"
                                    className="w-16 h-16 object-contain"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold text-white tracking-tight">ICCD</span>
                            <span className="text-sm text-gray-300 font-medium tracking-wide">DASHBOARD</span>
                        </div>
                    </div>

                    {/* Main Headline */}
                    <div className="mt-2">
                        <h1 className="text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                            Empower
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                                Your Organization
                            </span>
                        </h1>
                        <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
                            Access real-time insights, track departmental performance, and drive strategic decisions through our integrated dashboard system.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-8">
                <div className="w-full max-w-md">

                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                            <BarChart3 className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">DashBoard Pro</span>
                    </div>

                    {/* Login Card */}
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20">

                        {/* Header */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                Welcome Back!
                            </h2>
                            <p className="text-gray-600">
                                Sign in to access your dashboard
                            </p>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                            {/* Email Input */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="email"
                                        id="email"
                                        {...register('email')}
                                        placeholder="name@company.com"
                                        className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all duration-300 text-gray-800 ${errors.email
                                            ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                            : 'border-gray-200 focus:border-[#44A4AD] focus:ring-4 focus:ring-[#44A4AD]/30'
                                            }`}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-sm flex items-center space-x-1 mt-1">
                                        <span className="font-medium">⚠</span>
                                        <span>{errors.email.message}</span>
                                    </p>
                                )}
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        {...register('password')}
                                        placeholder="Enter your password"
                                        className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all duration-300 text-gray-800 ${errors.email
                                            ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                            : 'border-gray-200 focus:border-[#44A4AD] focus:ring-4 focus:ring-[#44A4AD]/30'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-sm flex items-center space-x-1 mt-1">
                                        <span className="font-medium">⚠</span>
                                        <span>{errors.password.message}</span>
                                    </p>
                                )}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                {/* <label className="flex items-center space-x-2 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        {...register('remember')}
                                        className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-500 cursor-pointer"
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-gray-900">Remember me</span>
                                </label> */}
                                <a
                                    href="#"
                                    className="text-sm text-[#44A4AD] hover:text-purple-800 font-semibold transition-colors"
                                >
                                    Forgot Password?
                                </a>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-[#44A4AD] via-[#2E7A81] to-[#1C4C50] 
                                text-white py-3.5 rounded-xl font-semibold shadow-lg 
                                hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 
                                transition-all duration-300 
                                hover:from-[#3A8F96] hover:via-[#27696F] hover:to-[#15383B]
                                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 
                                flex items-center justify-center space-x-2"
                            >
                                {isPending ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Signing in...</span>
                                    </>
                                ) : (
                                    <span>Sign In to Dashboard</span>
                                )}
                            </button>
                        </form>

                        {/* Sign Up Link */}
                        {/* <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{' '}
              <a href="#" className="text-purple-600 hover:text-purple-800 font-semibold transition-colors">
                Create Account
              </a>
            </p> */}
                    </div>

                    {/* Security Badge */}
                    {/* <div className="mt-6 flex items-center justify-center space-x-2 text-gray-400 text-sm">
            <Shield className="w-4 h-4" />
            <span>Secured with 256-bit SSL encryption</span>
          </div> */}
                </div>
            </div>
        </div>
    );
};

export default Login5;