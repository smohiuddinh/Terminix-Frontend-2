import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import logo from "../../assets/logo.png";
import { loginSchema } from '../formSchema/schema';
import { useLogin } from '../../../api/client/user';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeOff } from 'lucide-react';

const Login5 = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const { userLogin, isPending, error } = useLogin();

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

    return (
        <div className="min-h-screen flex font-sans">

            {/* ── Left Panel ── */}
            <div className="w-full lg:w-[45%] flex items-center justify-center bg-white px-8 py-12">
                <div className="w-full max-w-sm">

                    {/* Logo */}
                    <div className="flex items-center gap-2.5 mb-10">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#29623A] to-[#4BA54F] flex items-center justify-center shadow-md">
                            <img src={logo} alt="Terminix" className="w-6 h-6 object-contain" />
                        </div>
                        <div>
                            <span className="text-lg font-bold text-[#29623A] tracking-tight leading-none block">Terminix</span>
                            <span className="text-[10px] text-[#4BA54F] tracking-widest uppercase font-medium">Finance</span>
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Nice to see you again</h1>
                    <p className="text-sm text-gray-400 mb-6">Sign in to your finance dashboard</p>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* API Error */}
                        {error && (
                            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                                {error}
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1.5">
                                User ID
                            </label>
                            <input
                                type="email"
                                {...register('email')}
                                placeholder="Email or phone number"
                                className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-gray-50 text-gray-900 placeholder-gray-400
                                    focus:outline-none focus:ring-2 focus:bg-white transition-all
                                    ${errors.email
                                        ? 'border-red-400 focus:ring-red-200'
                                        : 'border-gray-200 focus:border-[#4BA54F] focus:ring-green-100'
                                    }`}
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password')}
                                    placeholder="Enter password"
                                    className={`w-full px-3.5 py-2.5 pr-10 text-sm rounded-lg border bg-gray-50 text-gray-900 placeholder-gray-400
                                        focus:outline-none focus:ring-2 focus:bg-white transition-all
                                        ${errors.password
                                            ? 'border-red-400 focus:ring-red-200'
                                            : 'border-gray-200 focus:border-[#4BA54F] focus:ring-green-100'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Remember me */}
                        <div className="flex items-center">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <div
                                    onClick={() => setRememberMe(!rememberMe)}
                                    className={`w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer
                                        ${rememberMe
                                            ? 'bg-[#4BA54F] border-[#4BA54F]'
                                            : 'bg-white border-gray-300'
                                        }`}
                                >
                                    {rememberMe && (
                                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    )}
                                </div>
                                <span className="text-sm text-gray-600">Remember me</span>
                            </label>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-2.5 mt-2 text-white text-sm font-semibold rounded-lg transition-all duration-200
                                bg-gradient-to-r from-[#29623A] to-[#4BA54F]
                                hover:from-[#1f4a2b] hover:to-[#3d8f43]
                                active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed
                                shadow-md shadow-green-200"
                        >
                            {isPending ? 'Signing in…' : 'Sign in'}
                        </button>

                        {/* Access notice */}
                        <p className="text-center text-xs text-gray-400 pt-1 leading-relaxed">
                            Only authorised personnel can access this system.<br />
                            Contact your administrator if you need access.
                        </p>

                    </form>
                </div>
            </div>

            {/* ── Right Panel ── */}
            <div
                className="hidden lg:flex lg:w-[55%] relative overflow-hidden items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #1a3d26 0%, #29623A 45%, #4BA54F 100%)' }}
            >
                {/* Decorative circles */}
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full border border-white/10" />
                <div className="absolute -top-12 -left-12 w-72 h-72 rounded-full border border-white/10" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full border border-white/10" />
                <div className="absolute -bottom-12 -right-12 w-72 h-72 rounded-full border border-white/10" />

                {/* Watermark top-right */}
                <div className="absolute top-6 right-8 opacity-15 flex items-center gap-2">
                    <img src={logo} alt="" className="w-10 h-10 object-contain brightness-200 invert" />
                    {/* <span className="text-white text-2xl font-bold tracking-tight">Terminix</span> */}
                </div>

                {/* Cityscape SVG */}
                <svg
                    className="absolute bottom-0 left-0 w-full opacity-15"
                    viewBox="0 0 900 280"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMax meet"
                >
                    <rect x="0"   y="140" width="40"  height="140" fill="white"/>
                    <rect x="10"  y="100" width="20"  height="40"  fill="white"/>
                    <rect x="50"  y="160" width="30"  height="120" fill="white"/>
                    <rect x="90"  y="80"  width="50"  height="200" fill="white"/>
                    <rect x="100" y="50"  width="8"   height="30"  fill="white"/>
                    <rect x="150" y="120" width="35"  height="160" fill="white"/>
                    <rect x="195" y="60"  width="60"  height="220" fill="white"/>
                    <rect x="215" y="20"  width="10"  height="40"  fill="white"/>
                    <rect x="265" y="140" width="45"  height="140" fill="white"/>
                    <rect x="320" y="90"  width="55"  height="190" fill="white"/>
                    <rect x="345" y="50"  width="8"   height="40"  fill="white"/>
                    <rect x="385" y="110" width="40"  height="170" fill="white"/>
                    <rect x="435" y="70"  width="65"  height="210" fill="white"/>
                    <rect x="458" y="30"  width="10"  height="40"  fill="white"/>
                    <rect x="510" y="130" width="35"  height="150" fill="white"/>
                    <rect x="555" y="80"  width="50"  height="200" fill="white"/>
                    <rect x="565" y="40"  width="8"   height="40"  fill="white"/>
                    <rect x="615" y="100" width="40"  height="180" fill="white"/>
                    <rect x="665" y="60"  width="55"  height="220" fill="white"/>
                    <rect x="680" y="20"  width="10"  height="40"  fill="white"/>
                    <rect x="730" y="130" width="35"  height="150" fill="white"/>
                    <rect x="775" y="90"  width="45"  height="190" fill="white"/>
                    <rect x="830" y="110" width="40"  height="170" fill="white"/>
                    <rect x="880" y="150" width="30"  height="130" fill="white"/>
                    {[...Array(40)].map((_, i) => (
                        <rect
                            key={i}
                            x={95 + (i % 8) * 110 + Math.floor(i / 8) * 15}
                            y={90 + Math.floor(i / 8) * 30}
                            width="6" height="8"
                            fill="white" opacity="0.5"
                        />
                    ))}
                </svg>

                {/* Bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3d26]/60 to-transparent pointer-events-none" />

                {/* Main copy */}
                <div className="relative z-10 text-center px-12">
                    {/* Finance icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="1" x2="12" y2="23"/>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
                        Smart Finance,<br />
                        <span className="text-green-200">Smarter Decisions.</span>
                    </h2>
                    <p className="text-sm text-green-100/70 italic mb-10">
                        "Empowering businesses through intelligent financial management."
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-center gap-8">
                        {[
                            { label: 'Departments', value: '7+' },
                            { label: 'Transactions', value: '100+' },
                            { label: 'Uptime', value: '99.9%' },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                                <p className="text-xs text-green-200/70 mt-0.5">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Powered by Cygnuz AI */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                    <a
                        href="https://cygnuzai.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15
                            hover:bg-white/20 transition-all duration-200 group"
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                        </svg>
                        <span className="text-xs text-white/70 group-hover:text-white transition-colors">
                            Powered by <span className="font-semibold text-white">Cygnuz AI</span>
                        </span>
                    </a>
                </div>
            </div>

        </div>
    );
};

export default Login5;