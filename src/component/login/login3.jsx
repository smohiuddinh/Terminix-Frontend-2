import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

// Validation Schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [showPass, setShowPass] = useState(false);

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef2ff] via-white to-[#f5e8ff] p-6 relative overflow-hidden">
      {/* Floating Background Shapes */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-purple-300/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-blue-300/30 rounded-full blur-3xl animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-3xl overflow-hidden w-full max-w-5xl border border-white/40"
      >
        {/* Left Side Illustration */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-b from-blue-600 to-purple-700 text-white w-1/2 p-12 relative">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-extrabold mb-4 tracking-wide drop-shadow-xl text-center"
          >
            Access Your Dashboard
          </motion.h1>
          <p className="text-lg opacity-95 max-w-xs text-center leading-relaxed">
            A modern platform to manage users, disputes, gigs, and everything in one place.
          </p>

          {/* Decorative lights */}
          <div className="absolute -top-14 -left-14 h-40 w-40 rounded-full bg-white/20 blur-3xl animate-spin-slow" />
          <div className="absolute bottom-20 right-20 h-28 w-28 rounded-full bg-white/10 blur-2xl animate-spin-slow" />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-10 lg:p-14">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-500">Login to continue to your dashboard</p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email")}
                  className="w-full p-3 pl-4 border rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition"
                  placeholder="example@email.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  {...register("password")}
                  className="w-full p-3 pl-4 pr-12 border rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all"
            >
              Login
            </motion.button>

            {/* Forgot Password */}
            <p className="text-center text-sm text-gray-600 hover:text-purple-600 cursor-pointer mt-2">
              Forgot your password?
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}