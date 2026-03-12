import Button from '../button';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import logo from "../../assets/logo.png";
import { loginSchema } from '../formSchema/schema';
import { useLogin } from '../../../api/client/user';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    Sparkles,
    Shield,
    Zap,
    CheckCircle,
    TrendingUp,
    BarChart3,
    PieChart,
    Activity,
} from 'lucide-react';

const Login5 = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { userLogin, isSuccess, isPending, isError, reset, error } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data) => {
        userLogin(data);
    };

    // Floating elements with brand colors
    const floatingElements = [
        { Icon: Sparkles, delay: 0, duration: 20, size: 24, color: "text-[#4BA54F]" },
        { Icon: Shield, delay: 2, duration: 25, size: 28, color: "text-emerald-400" },
        { Icon: Zap, delay: 4, duration: 22, size: 26, color: "text-[#4BA54F]" },
        { Icon: CheckCircle, delay: 6, duration: 24, size: 30, color: "text-green-400" },
        { Icon: TrendingUp, delay: 8, duration: 23, size: 28, color: "text-emerald-500" },
        { Icon: BarChart3, delay: 10, duration: 21, size: 26, color: "text-[#4BA54F]" },
        { Icon: PieChart, delay: 12, duration: 26, size: 28, color: "text-green-400" },
        { Icon: Activity, delay: 14, duration: 24, size: 24, color: "text-emerald-400" },
        { Icon: Sparkles, delay: 16, duration: 22, size: 22, color: "text-[#4BA54F]" },
        { Icon: Shield, delay: 18, duration: 25, size: 26, color: "text-green-500" },
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#1a3d26] via-[#29623A] to-[#0f2419] flex">
            
            {/* Animated gradient orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#4BA54F]/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {floatingElements.map(({ Icon, delay, duration, size, color }, i) => (
                    <div
                        key={`floating-${i}`}
                        className={`absolute opacity-20 ${color} will-change-transform`}
                        style={{
                            top: `${10 + i * 8}%`,
                            left: "-80px",
                            animation: `floatAcross ${duration}s linear infinite`,
                            animationDelay: `${delay}s`,
                            animationFillMode: "both",
                        }}
                    >
                        <Icon size={size} strokeWidth={1.5} />
                    </div>
                ))}
            </div>

            {/* Left Side - Dashboard Preview/Branding */}
            <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden p-12 flex-col justify-between">
                <div className="relative z-10">
                    {/* Logo/Brand Section */}
                    <div className="flex items-center space-x-4 mb-16">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-[#4BA54F]/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                            <div className="relative w-20 h-20 bg-gradient-to-br from-white to-gray-100 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-105 group-hover:rotate-2 transition-all duration-500 border border-white/20">
                                <img src={logo} alt="Terminix Logo" className="w-16 h-16 object-contain" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-4xl font-bold text-white tracking-tight">Terminix</span>
                            <span className="text-sm text-emerald-200 font-medium tracking-widest uppercase">Dashboard</span>
                        </div>
                    </div>

                    {/* Main Headline */}
                    <div className="space-y-6">
                        <div className="inline-block px-4 py-2 bg-[#4BA54F]/20 backdrop-blur-sm rounded-full border border-[#4BA54F]/30">
                            <span className="text-[#4BA54F] text-sm font-semibold flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Advanced Analytics Platform
                            </span>
                        </div>
                        
                        <h1 className="text-5xl xl:text-6xl font-bold text-white leading-tight">
                            Manage Your
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4BA54F] via-emerald-400 to-green-300">
                                Accounting with Ease
                            </span>
                        </h1>
                        
                        <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
                            Access real-time insights, track departmental performance, and drive strategic 
                            decisions through our integrated dashboard system.
                        </p>

                        {/* Feature highlights */}
                        <div className="grid grid-cols-2 gap-4 mt-8 max-w-xl">
                            {[
                                { icon: TrendingUp, text: "Real-time Analytics" },
                                { icon: Shield, text: "Secure & Encrypted" },
                                { icon: BarChart3, text: "Visual Reports" },
                                { icon: Zap, text: "Lightning Fast" }
                            ].map((feature, idx) => (
                                <div key={idx} className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4BA54F] to-[#29623A] flex items-center justify-center">
                                        <feature.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-white font-medium">{feature.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom branding */}
                <div className="relative z-10">
                    <p className="text-gray-400 text-sm">
                        Powered by <span className="text-[#4BA54F] font-semibold">Cygnuz AI</span>
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-8">
                <div className="w-full max-w-md">

                    {/* Mobile Logo */}
                    <div className="flex items-center justify-center space-x-4 mb-12 lg:hidden">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-[#4BA54F]/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                            <div className="relative w-20 h-20 bg-gradient-to-br from-white to-gray-100 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-105 group-hover:rotate-2 transition-all duration-500 border border-white/20">
                                <img src={logo} alt="Terminix Logo" className="w-16 h-16 object-contain" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold text-white tracking-tight">Terminix</span>
                            <span className="text-sm text-emerald-200 font-medium tracking-widest uppercase">Dashboard</span>
                        </div>
                    </div>

                    {/* Login Card */}
                    <div className="bg-white/98 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/30 relative overflow-hidden">
                        {/* Decorative gradient */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#4BA54F]/10 to-transparent rounded-full blur-3xl"></div>
                        
                        <div className="relative z-10">
                            {/* Header */}
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#29623A] to-[#4BA54F] bg-clip-text text-transparent mb-2">
                                    Welcome Back!
                                </h2>
                                <p className="text-gray-600">Sign in to access your dashboard</p>
                            </div>

                            {/* Login Form */}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                {error && (
                                    <div className="w-full py-3 text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 flex items-center gap-2">
                                        <span className="text-lg">⚠️</span>
                                        <span className="text-sm font-medium">{error}</span>
                                    </div>
                                )}

                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                        Email Address
                                    </label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4BA54F] w-5 h-5 transition-colors duration-300" />
                                        <input
                                            type="email"
                                            id="email"
                                            {...register('email')}
                                            placeholder="name@company.com"
                                            className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all duration-300 text-gray-800 ${
                                                errors.email
                                                    ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                                    : 'border-gray-200 focus:border-[#4BA54F] focus:ring-4 focus:ring-[#4BA54F]/20'
                                            }`}
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-600 text-sm flex items-center space-x-1 mt-1">
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
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4BA54F] w-5 h-5 transition-colors duration-300" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            {...register('password')}
                                            placeholder="Enter your password"
                                            className={`w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all duration-300 text-gray-800 ${
                                                errors.password
                                                    ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                                    : 'border-gray-200 focus:border-[#4BA54F] focus:ring-4 focus:ring-[#4BA54F]/20'
                                            }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#4BA54F] transition-colors duration-300"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-red-600 text-sm flex items-center space-x-1 mt-1">
                                            <span className="font-medium">⚠</span>
                                            <span>{errors.password.message}</span>
                                        </p>
                                    )}
                                </div>

                                {/* Forgot Password */}
                                <div className="flex items-center justify-end">
                                    <a href="#" className="text-sm text-[#29623A] hover:text-[#4BA54F] font-semibold transition-colors duration-300">
                                        Forgot Password?
                                    </a>
                                </div>

                                {/* Login Button */}
                                <Button
                                    text="Sign In"
                                    isLoading={isPending}
                                    onClick={handleSubmit}
                                    type="submit"
                                    className="w-full cursor-pointer bg-gradient-to-r from-[#29623A] via-[#348845] to-[#4BA54F] 
                                    text-white py-4 rounded-xl font-semibold shadow-lg shadow-[#4BA54F]/30
                                    hover:shadow-xl hover:shadow-[#4BA54F]/40 hover:-translate-y-0.5 active:translate-y-0 
                                    transition-all duration-300 
                                    hover:from-[#1f4a2b] hover:via-[#29623A] hover:to-[#348845]
                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 
                                    flex items-center justify-center space-x-2 group"
                                >
                                    <span>Sign In</span>
                                    <Zap className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                                </Button>

                                {/* Divider */}
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-gray-500">Secure login</span>
                                    </div>
                                </div>

                                {/* Security badges */}
                                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Shield className="w-4 h-4 text-[#4BA54F]" />
                                        <span>256-bit SSL</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <CheckCircle className="w-4 h-4 text-[#4BA54F]" />
                                        <span>Verified</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Footer note */}
                    <p className="text-center text-sm text-gray-400 mt-6">
                        Protected by enterprise-grade security
                    </p>
                </div>
            </div>

            {/* Floating Animation CSS */}
            <style jsx>{`
                @keyframes floatAcross {
                    0% {
                        transform: translateX(0) translateY(0px) rotate(0deg);
                        opacity: 0;
                    }
                    5% { opacity: 0.2; }
                    95% { opacity: 0.2; }
                    100% {
                        transform: translateX(calc(100vw + 100px)) translateY(-30px) rotate(180deg);
                        opacity: 0;
                    }
                }
                .will-change-transform { 
                    will-change: transform, opacity; 
                }
            `}</style>
        </div>
    );
};

export default Login5;