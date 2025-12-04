import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

// Mock imports - replace with your actual imports
const Button = ({ text, isLoading, onClick, type, className }) => (
  <button type={type} onClick={onClick} disabled={isLoading} className={className}>
    {isLoading ? (
      <div className="flex items-center justify-center space-x-2">
        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
        <span>Processing...</span>
      </div>
    ) : (
      text
    )}
  </button>
);

// Replace these with your actual hooks
const useForm = (config) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const register = (name) => ({
    name,
    value: formData[name],
    onChange: (e) => setFormData({ ...formData, [name]: e.target.value })
  });

  const handleSubmit = (onSubmit) => (e) => {
    if (e) e.preventDefault();
    onSubmit(formData);
  };

  return { register, handleSubmit, formState: { errors } };
};

const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  
  const userLogin = async (data) => {
    setIsPending(true);
    // Your actual API call here
    setTimeout(() => setIsPending(false), 2000);
  };

  return { userLogin, isPending };
};

const Login5 = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const { userLogin, isPending } = useLogin();

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange'
  });

  const onSubmit = async (data) => {
    userLogin(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#44A4AD] via-[#2E7A81] to-[#1C4C50] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#1C4C50]/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Branding & Features */}
          <div className="hidden lg:block space-y-12 px-8">
            
            {/* Logo Section */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/20">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#44A4AD] to-[#1C4C50] rounded-lg" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">ICCD</div>
                  <div className="text-xs text-gray-300 tracking-widest">DASHBOARD</div>
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl font-bold text-white leading-tight">
                  Your Organization's
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300">
                    Command Center
                  </span>
                </h1>
                <p className="text-lg text-gray-200 max-w-md leading-relaxed">
                  Real-time analytics, seamless collaboration, and intelligent insights all in one unified platform.
                </p>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="space-y-3">
              {[
                { icon: '📊', text: 'Real-time Analytics & Reporting' },
                { icon: '🔒', text: 'Enterprise-Grade Security' },
                { icon: '⚡', text: 'Lightning-Fast Performance' },
                { icon: '🌐', text: 'Cloud-Based Accessibility' }
              ].map((feature, idx) => (
                <div 
                  key={idx}
                  className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-white font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/20 mb-6">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#44A4AD] to-[#1C4C50] rounded-lg" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">ICCD</div>
                  <div className="text-xs text-gray-300 tracking-widest">DASHBOARD</div>
                </div>
              </div>
            </div>

            {/* Login Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100 relative overflow-hidden">
              
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#44A4AD]/10 to-transparent rounded-bl-full" />
              
              <div className="relative">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-3">
                    <Sparkles className="w-6 h-6 text-[#44A4AD]" />
                    <h2 className="text-3xl font-bold text-gray-900">
                      Welcome Back
                    </h2>
                  </div>
                  <p className="text-gray-600">
                    Enter your credentials to access your dashboard
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-5">
                  
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                        focusedField === 'email' ? 'text-[#44A4AD]' : 'text-gray-400'
                      }`} />
                      <input
                        type="email"
                        id="email"
                        {...register('email')}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="you@company.com"
                        className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl focus:outline-none focus:bg-white transition-all duration-300 text-gray-800 ${
                          errors.email
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-transparent focus:border-[#44A4AD] focus:shadow-lg focus:shadow-[#44A4AD]/20'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm flex items-center space-x-1">
                        <span>⚠</span>
                        <span>{errors.email.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                      Password
                    </label>
                    <div className="relative group">
                      <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                        focusedField === 'password' ? 'text-[#44A4AD]' : 'text-gray-400'
                      }`} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        {...register('password')}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Enter your password"
                        className={`w-full pl-12 pr-12 py-4 bg-gray-50 border-2 rounded-2xl focus:outline-none focus:bg-white transition-all duration-300 text-gray-800 ${
                          errors.password
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-transparent focus:border-[#44A4AD] focus:shadow-lg focus:shadow-[#44A4AD]/20'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#44A4AD] transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm flex items-center space-x-1">
                        <span>⚠</span>
                        <span>{errors.password.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Forgot Password */}
                  <div className="flex justify-end">
                    <a
                      href="#"
                      className="text-sm text-[#44A4AD] hover:text-[#2E7A81] font-semibold transition-colors flex items-center space-x-1 group"
                    >
                      <span>Forgot Password?</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>

                  {/* Submit Button */}
                  <Button
                    text="Sign In to Dashboard"
                    isLoading={isPending}
                    onClick={handleSubmit(onSubmit)}
                    type="button"
                    className="w-full bg-gradient-to-r from-[#44A4AD] via-[#2E7A81] to-[#1C4C50] 
                      text-white py-4 rounded-2xl font-semibold shadow-lg shadow-[#44A4AD]/30
                      hover:shadow-xl hover:shadow-[#44A4AD]/40 hover:-translate-y-1 
                      active:translate-y-0 transition-all duration-300 
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 
                      flex items-center justify-center space-x-2 group"
                  />
                </div>

                {/* Divider */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-center text-sm text-gray-600">
                    Protected by enterprise-grade security 🔒
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login5;