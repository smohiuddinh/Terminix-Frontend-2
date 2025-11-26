import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from 'react-toastify';
import { useSignUp } from '../../api/client/user';

function SignUp({ handleSwitch }) {
  const { userSignUp, isPending, error } = useSignUp({
    onSuccess: () => {
      handleSwitch("login");
      toast.success("Registered successfully");
    },
    onError: (err) => {
      console.error("Signup error:", err);
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const onSubmit = (data) => userSignUp(data);

  const handleGoogleLogin = () => {
    window.open("https://iccd.freelanceserver.matzsolutions.com/auth/google", "_self");
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white ">
      <h2 className="text-3xl font-bold text-gray-800 text-center ">Create Account</h2>

      {/* Name */}
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="John Doe"
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-400 focus:outline-none transition ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
          )}
        />
        {errors.name && <p className="mt-1 text-red-600 text-sm">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="email"
              placeholder="you@example.com"
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-400 focus:outline-none transition ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
          )}
        />
        {errors.email && <p className="mt-1 text-red-600 text-sm">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <div className="relative">
              <input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-400 focus:outline-none transition ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          )}
        />
        {errors.password && <p className="mt-1 text-red-600 text-sm">{errors.password.message}</p>}
      </div>

      {/* API Error */}
      {error && <p className="mb-2 text-red-600 text-sm">{error}</p>}

      {/* Submit */}
      <button
        type="button"
        onClick={handleSubmit(onSubmit)}
        disabled={isPending}
        className={`w-full py-3 rounded-full bg-[#15A9B2] text-white font-semibold hover:bg-[#05929c] transition ${
          isPending ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isPending ? "Submitting..." : "Sign Up"}
      </button>

      {/* Divider */}
      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="mx-2 text-gray-500 text-sm">OR</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Google Login */}
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition"
      >
 <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>        Continue with Google
      </button>

      {/* Switch to Login */}
      <p className="mt-4 text-center text-gray-600 text-sm">
        Already have an account?{" "}
        <span
          className="text-[#15A9B2] font-semibold cursor-pointer hover:underline"
          onClick={() => handleSwitch("login")}
        >
          Sign In
        </span>
      </p>
    </div>
  );
}

export default SignUp;
