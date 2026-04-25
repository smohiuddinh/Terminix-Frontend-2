import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignUp } from '../../../api/client/user';
import * as Yup from 'yup';
import { Mail, Lock, User, Shield, Eye, EyeOff, CheckCircle, AlertCircle, Users, CreditCard } from 'lucide-react';

const rolesList = ['admin', 'cashier', 'gm','fs'];

const roleOptions = [
  {
    value: 'admin',
    label: 'Admin',
    Icon: Shield,
    desc: 'Full access',
  },
  {
    value: 'cashier',
    label: 'Cashier',
    Icon: CreditCard,
    desc: 'POS & billing',
  },
  {
    value: 'gm',
    label: 'Ledger Account Manager',
    Icon: Users,
    desc: 'Management',
  },
   {
    value: 'fs',
    label: 'Fummigation Service Manager',
    Icon: Users,
    desc: 'Management',
  },
];

const signupSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required').min(2, 'Min 2 characters').max(50),
  email: Yup.string().required('Email is required').email('Enter a valid email address'),
  password: Yup.string().required('Password is required').min(6, 'Min 6 characters').max(20, 'Max 20 characters'),
  role: Yup.string().required('Please select a role').oneOf(rolesList),
});

const SignupAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const { userSignUp, isPending, isSuccess, isError, error } = useSignUp();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset: formReset,
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: 'onChange',
  });

  const handleRoleSelect = (value) => {
    setSelectedRole(value);
    setValue('role', value, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    await userSignUp(data, {
      onSuccess: () => {
        formReset();
        setSelectedRole('');
      },
    });
  };

  return (
    <div className="w-full mt-24 max-w-lg mx-auto">

      {/* ── Card ── */}
      <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm">

        {/* Header */}
        <div className="bg-[#1a3d26] px-6 py-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-base leading-tight">Add new user</h2>
            <p className="text-white/50 text-xs mt-0.5">Create a team member account with role access</p>
          </div>
          <span className="ml-auto text-[11px] bg-white/10 text-white/75 px-3 py-1 rounded-full border border-white/20 flex-shrink-0">
            Admin only
          </span>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-5">

          {/* Alerts */}
          {isError && (
            <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error || 'Something went wrong. Please try again.'}</span>
            </div>
          )}
          {isSuccess && (
            <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>User added successfully!</span>
            </div>
          )}

          {/* Name + Email — 2 columns */}
          <div className="grid grid-cols-2 gap-4">

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Ali Hassan"
                  {...register('name')}
                  className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border bg-white text-gray-800 placeholder-gray-400
                    focus:outline-none focus:ring-2 transition-all
                    ${errors.name
                      ? 'border-red-300 focus:ring-red-100'
                      : 'border-gray-200 focus:border-[#29623A] focus:ring-green-100'
                    }`}
                />
              </div>
              {errors.name && (
                <p className="text-[11.5px] text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" />
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  placeholder="name@terminix.pk"
                  {...register('email')}
                  className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border bg-white text-gray-800 placeholder-gray-400
                    focus:outline-none focus:ring-2 transition-all
                    ${errors.email
                      ? 'border-red-300 focus:ring-red-100'
                      : 'border-gray-200 focus:border-[#29623A] focus:ring-green-100'
                    }`}
                />
              </div>
              {errors.email && (
                <p className="text-[11.5px] text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" />
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Minimum 6 characters"
                {...register('password')}
                className={`w-full pl-9 pr-10 py-2.5 text-sm rounded-xl border bg-white text-gray-800 placeholder-gray-400
                  focus:outline-none focus:ring-2 transition-all
                  ${errors.password
                    ? 'border-red-300 focus:ring-red-100'
                    : 'border-gray-200 focus:border-[#29623A] focus:ring-green-100'
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
            <p className="text-[11px] text-gray-400">Must be 6–20 characters</p>
            {errors.password && (
              <p className="text-[11.5px] text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role — card buttons */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
              Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {roleOptions.map(({ value, label, Icon, desc }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleRoleSelect(value)}
                  className={`flex flex-col items-center gap-1.5 py-3.5 px-2 rounded-xl border text-sm font-medium transition-all duration-150
                    ${selectedRole === value
                      ? 'bg-[#1a3d26] border-[#1a3d26] text-white shadow-sm'
                      : 'border-gray-200 text-gray-500 hover:border-[#29623A] hover:text-[#29623A] hover:bg-green-50'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                  <span className={`text-[10px] font-normal ${selectedRole === value ? 'text-white/60' : 'text-gray-400'}`}>
                    {desc}
                  </span>
                </button>
              ))}
            </div>
            {errors.role && (
              <p className="text-[11.5px] text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                {errors.role.message}
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Actions */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                formReset();
                setSelectedRole('');
              }}
              className="px-4 py-2.5 text-sm text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              Clear
            </button>
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={isPending}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-6 text-sm font-semibold text-white rounded-xl
                bg-[#1a3d26] hover:bg-[#29623A] active:scale-[0.99]
                disabled:opacity-60 disabled:cursor-not-allowed
                transition-all duration-200"
            >
              {isPending ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Adding…
                </>
              ) : (
                <>
                  <User className="w-4 h-4" />
                  Add user
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignupAdmin;