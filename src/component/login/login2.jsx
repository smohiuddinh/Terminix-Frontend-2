// LoginPage.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Github, 
  Chrome,
  TrendingUp,
  Users,
  Activity,
  BarChart3,
  Shield,
  Zap
} from 'lucide-react';

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

const Login2 = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log('Login data:', data);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Login successful! Connect to your backend API.');
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} login initiated`);
    alert(`${provider} OAuth - Connect to your provider!`);
  };

  // Dashboard Stats (decorative)
  const stats = [
    { icon: Users, label: 'Active Users', value: '2.4K', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: TrendingUp, label: 'Growth', value: '+24%', color: 'text-green-500', bg: 'bg-green-50' },
    { icon: Activity, label: 'Engagement', value: '89%', color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  const features = [
    { icon: Shield, text: 'Bank-level Security' },
    { icon: Zap, text: 'Lightning Fast' },
    { icon: BarChart3, text: 'Real-time Analytics' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      
      {/* Left Side - Dashboard Preview/Branding */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden p-12 flex-col justify-between">
        
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-3xl"></div>
        <div className="absolute top-20 -left-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        <div className="relative z-10">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3 mb-16">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">DashBoard Pro</span>
          </div>

          {/* Main Headline */}
          <div className="mb-12">
            <h1 className="text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
              Manage Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Business Analytics
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-lg">
              Access powerful insights, track performance metrics, and make data-driven decisions with our comprehensive dashboard platform.
            </p>
          </div>

          {/* Stats Cards */}
          {/* <div className="grid grid-cols-3 gap-4 mb-12">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
              >
                <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div> */}

          {/* Features */}
          {/* <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-gray-300">{feature.text}</span>
              </div>
            ))}
          </div> */}
        </div>

        {/* Footer */}
        {/* <div className="relative z-10">
          <p className="text-gray-400 text-sm">
            © 2024 DashBoard Pro. All rights reserved.
          </p>
        </div> */}
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
                Welcome Back! 👋
              </h2>
              <p className="text-gray-600">
                Sign in to access your dashboard
              </p>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => handleSocialLogin('Google')}
                className="flex items-center justify-center space-x-2 py-3 px-4 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-gray-50 transition-all duration-300 group"
              >
                <Chrome className="w-5 h-5 text-gray-600 group-hover:text-purple-600" />
                <span className="font-medium text-gray-700 text-sm">Google</span>
              </button>

              <button
                onClick={() => handleSocialLogin('GitHub')}
                className="flex items-center justify-center space-x-2 py-3 px-4 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-gray-50 transition-all duration-300 group"
              >
                <Github className="w-5 h-5 text-gray-600 group-hover:text-purple-600" />
                <span className="font-medium text-gray-700 text-sm">GitHub</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">OR</span>
              </div>
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
                    className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all duration-300 text-gray-800 ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                        : 'border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100'
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
                    className={`w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all duration-300 text-gray-800 ${
                      errors.password 
                        ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                        : 'border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100'
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
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    {...register('remember')}
                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-500 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">Remember me</span>
                </label>
                <a 
                  href="#" 
                  className="text-sm text-purple-600 hover:text-purple-800 font-semibold transition-colors"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
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
            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{' '}
              <a href="#" className="text-purple-600 hover:text-purple-800 font-semibold transition-colors">
                Create Account
              </a>
            </p>
          </div>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center space-x-2 text-gray-400 text-sm">
            <Shield className="w-4 h-4" />
            <span>Secured with 256-bit SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login2;