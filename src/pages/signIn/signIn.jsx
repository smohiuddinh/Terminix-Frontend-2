import React, { useState } from "react";
import { useLogin } from "../../../api/client/user";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "../../component/button";
import { Mail, Lock, ArrowRight } from "lucide-react";

function Login({ handleSwitch }) {
  const navigate = useNavigate();
  const { userLogin, isSuccess, isPending, isError, reset, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object({
    email: yup.string().email("Enter a valid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data) => userLogin(data);
  const handleGoogleLogin = () => {
    window.open("https://iccd.freelanceserver.matzsolutions.com/auth/google", "_self");
  };

  return (
    <div className=" w-full flex items-center justify-center  relative  ">
      {/* Decorative blob */}

      {/* Main Card */}
      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-xl space-y-10  2xl:space-y-0 ">
          {/* Header */}
          <div className="flex items-center justify-center gap-5 ">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 mb-4 shadow-lg">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-black mb-2">Login</h2>
            {/* <p className="text-gray-400 text-sm">Login to continue to your account</p> */}
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Email */}
            <div className="relative group">
              <div className="absolute left-0 top-0 w-full h-full  rounded-xl opacity-0 group-focus-within:opacity-100 transition duration-300 blur -z-10" />
              <div className="relative flex items-center bg-black/5 border border-black/10 group-focus-within:border-black/30 rounded-xl transition duration-300">
                <Mail className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0" />
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      placeholder="you@example.com"
                      className="w-full bg-transparent px-4 py-3.5 text-black placeholder-gray-500 focus:outline-none text-sm"
                    />
                  )}
                />
              </div>
              {errors?.email && <p className="text-red-400 text-xs mt-2">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="relative group">
              <div className="absolute left-0 top-0 w-full h-full rounded-xl opacity-0 group-focus-within:opacity-100 transition duration-300 blur -z-10" />
              <div className="relative flex items-center bg-black/5 border border-black/10 group-focus-within:border-black/30 rounded-xl transition duration-300">
                <Lock className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0" />
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="flex-1 bg-transparent px-4 py-3.5 text-black placeholder-gray-500 focus:outline-none text-sm"
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="mr-4 text-gray-400 hover:text-teal-400 transition duration-300"
                >
                  {showPassword ? <VisibilityOff className="w-5 h-5" /> : <Visibility className="w-5 h-5" />}
                </button>
              </div>
              {errors?.password && <p className="text-red-400 text-xs mt-2">{errors.password.message}</p>}
            </div>

            {/* API Error */}
            {isError && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <Button className="w-full h-10 relative group mt-6" onClick={handleSubmit(onSubmit)} disabled={isPending}>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300 group-disabled:opacity-50" />
              <div className="relative px-6 py-3.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl text-black font-semibold flex items-center justify-center gap-2 group-hover:scale-105 transition duration-300 w-full">
                {isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition duration-300" />
                  </>
                )}
              </div>
            </Button>

            {/* Forgot Password */}
            <div className="text-center">
          
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent" />
            <span className="text-xs text-gray-500 font-medium">OR</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent" />
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-black/5 border border-black/10 hover:border-black/30 rounded-xl text-black font-semibold transition duration-300 group hover:bg-black/10"
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
            </svg>
            <span className="text-sm">Continue with Google</span>
          </button>

          {/* Switch Links */}
          <div className="flex justify-between mt-6 text-sm font-medium text-gray-500 gap-4">
            <button
              onClick={() => handleSwitch("signup")}
              className="flex-1 relative group transition-all duration-300"
            >
              <span className="text-gray-400 group-hover:text-teal-400 transition-colors duration-300">
                Sign Up
              </span>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
            </button>

            <button
              onClick={() => handleSwitch("forgotPassword")}
              className="flex-1 relative group transition-all duration-300 text-right"
            >
              <span className="text-gray-400 group-hover:text-teal-400 transition-colors duration-300">
                Forgot Password?
              </span>
              <span className="absolute right-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;