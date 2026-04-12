import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignUp } from '../../../api/client/user';
import * as Yup from 'yup';
import { Mail, Lock, User, Shield, Eye, EyeOff, X, CheckCircle, AlertCircle } from 'lucide-react';

const rolesList = ['admin', 'cashier', 'gm'];

const signupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(2).max(50),
  email: Yup.string().required('Email is required').email('Enter a valid email address'),
  password: Yup.string().required('Password is required').min(6).max(20),
  role: Yup.string().required('Role is required').oneOf(rolesList),
});

const SignupAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { userSignUp, isPending, isSuccess, isError, error } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    await userSignUp(data, { onSuccess: () => formReset() });
  };

  return (
    <div className="w-full max-w-lg mx-auto">

      {/* Alerts */}
      {isError && (
        <div className="flex items-center gap-3 mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {isSuccess && (
        <div className="flex items-center gap-3 mb-5 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>User added successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Full Name</label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Enter full name"
              {...register('name')}
              className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-white text-gray-800 placeholder-gray-400
                focus:outline-none focus:ring-2 transition-all
                ${errors.name ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:border-[#4BA54F] focus:ring-green-100'}`}
            />
          </div>
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              placeholder="name@company.com"
              {...register('email')}
              className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-white text-gray-800 placeholder-gray-400
                focus:outline-none focus:ring-2 transition-all
                ${errors.email ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:border-[#4BA54F] focus:ring-green-100'}`}
            />
          </div>
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Min. 6 characters"
              {...register('password')}
              className={`w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border bg-white text-gray-800 placeholder-gray-400
                focus:outline-none focus:ring-2 transition-all
                ${errors.password ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:border-[#4BA54F] focus:ring-green-100'}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
        </div>

        {/* Role */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Role</label>
          <div className="relative">
            <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <select
              {...register('role')}
              className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-white text-gray-800 appearance-none
                focus:outline-none focus:ring-2 transition-all cursor-pointer
                ${errors.role ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:border-[#4BA54F] focus:ring-green-100'}`}
            >
              <option value="">Select a role</option>
              {rolesList.map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>}
        </div>

        {/* Submit */}
        <div className="pt-2 flex gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 py-2.5 px-6 text-sm font-semibold text-white rounded-xl
              bg-[#29623A] hover:bg-[#1f4a2b] active:scale-[0.99]
              disabled:opacity-60 disabled:cursor-not-allowed
              transition-all duration-200 shadow-sm shadow-green-200"
          >
            {isPending ? 'Adding…' : '+ Add User'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default SignupAdmin;