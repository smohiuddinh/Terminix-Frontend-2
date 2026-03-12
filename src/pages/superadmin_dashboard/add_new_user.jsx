import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignUp } from '../../../api/client/user';
import Button from '../../component/button';
import * as Yup from 'yup';
import {
  Mail,
  Lock,
  User,
  Shield,
} from 'lucide-react';

const SignupAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { userSignUp, isPending, isSuccess, isError, error } = useSignUp();


// Example roles list
const rolesList = ['admin', 'cashier', 'gm']; 

 const signupSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),

  email: Yup.string()
    .required('Email is required')
    .email('Enter a valid email address'),

  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password cannot exceed 20 characters'),

  role: Yup.string()
    .required('Role is required')
    .oneOf(rolesList, `Role must be one of: ${rolesList.join(', ')}`),
});


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
    await userSignUp(data, {
      onSuccess: () => {
        formReset();
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Add New User</h2>

        {isError && (
          <div className="py-2 px-3 mb-4 bg-red-100 text-red-600 rounded">
            {error}
          </div>
        )}

        {isSuccess && (
          <div className="py-2 px-3 mb-4 bg-green-100 text-green-600 rounded">
            User added successfully!
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter name"
                {...register('name')}
                className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="name@company.com"
                {...register('email')}
                className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                {...register('password')}
                className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 ${errors.password ? 'border-red-500' : 'border-gray-200'}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Role */}
{/* Role */}
<div className="space-y-2">
  <label className="block text-sm font-semibold text-gray-700">Role</label>
  <div className="relative">
    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
    <select
      {...register('role')}
      className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 ${errors.role ? 'border-red-500' : 'border-gray-200'}`}
    >
      <option value="">Select Role</option>
      {rolesList.map((role) => (
        <option key={role} value={role}>
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </option>
      ))}
    </select>
  </div>
  {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
</div>

          {/* Submit */}
          <Button
            type="submit"
            text="Add User"
            isLoading={isPending}
            className="w-full bg-gradient-to-br from-[#1a3d26] via-[#29623A] to-[#0f2419] text-white py-3.5 rounded-xl font-semibold"
          />
        </form>
      </div>
    </div>
  );
};

export default SignupAdmin;
