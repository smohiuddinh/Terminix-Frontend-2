import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../pages/signIn/signIn";
import SignUp from "../pages/signUp";
import VerifyOtp from "./signIn/verifyOtp";
import ForgotPassword from "./signIn/ForgotPassword";
import ChangePassword from "./signIn/ChangePassword";
import logo from "../assets/ICCD-01.png";
import CloseIcon from "@mui/icons-material/Close";
import {
  Briefcase,
  Code,
  Palette,
  TrendingUp,
  Users,
  Zap,
  X,
} from "lucide-react";

const LoginController = ({ onClose, linker }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [modalView, setModalView] = useState(linker || "login");
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const handleSwitch = (view) => setModalView(view);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/");
    }
  };

  const floatingIcons = [
    {
      Icon: TrendingUp,
      color: "text-gray-500",
      delay: 0,
      position: "top-[15%] left-[10%]",
    },
    {
      Icon: Users,
      color: "text-green-500",
      delay: 0.5,
      position: "top-[25%] right-[15%]",
    },
  ];

  return (
    <div className="inset-0 flex items-center justify-center backdrop-blur-xl bg-transparent  overflow-y-auto ">
      <div className="relative flex flex-col lg:flex-row h-full w-full   bg-white  shadow-lg overflow-hidden">
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#44A4AD] via-[#2E7A81] to-[#1C4C50] relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#44A4AD]/30 to-transparent animate-pulse" />
            <div
              className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/20  blur-3xl"
              style={{ animation: "float 8s ease-in-out infinite" }}
            />
            <div
              className="absolute bottom-0 left-0 w-96 h-96 bg-teal-400/20  blur-3xl"
              style={{ animation: "float 10s ease-in-out infinite reverse" }}
            />
          </div>
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white text-center w-full">
            {/* Logo with glow effect */}
            <div className="mb-8 relative group">
              <div className="absolute inset-0 bg-white/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <img
                  src={logo}
                  alt="ICCD Logo"
                  className="w-20 h-20 object-contain"
                />
              </div>
            </div>

            {/* Title with gradient text */}
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
              ICCD Talent Gate
            </h1>

            <p className="text-base text-white/90 mb-10 max-w-sm leading-relaxed">
              Connect with top talent and clients worldwide. Your freelance
              journey starts here.
            </p>

            {/* Feature highlights */}
            <div className="space-y-3 w-full max-w-sm">
              {[
                { icon: Zap, text: "Quick Setup" },
                { icon: Code, text: "Secure Platform" },
                { icon: Palette, text: "Creative Freedom" },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-3 hover:bg-white/10 transition-all duration-300 group cursor-pointer border border-white/10 hover:border-white/20"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
                    <feature.icon className="w-4 h-4 text-white/90 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="text-sm text-white/90 font-medium">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Animated corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-white/20 rounded-tl-3xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-white/20 rounded-br-3xl" />
        </div>

        {/* Right Form Section */}
        <div className="relative flex flex-col w-full lg:w-1/2 p-6 sm:p-8 md:p-10">
          {/* Close Button */}
          <button
            onClick={handleClose}
            aria-label="Close modal"
            className="absolute right-4 top-4 w-8 h-8 flex items-center text-black justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition"
          >
            <CloseIcon style={{ fontSize: 20 }} />
          </button>

          <div className="flex-grow flex flex-col items-center justify-center">
            {modalView === "login" && <Login handleSwitch={handleSwitch} />}
            {modalView === "signup" && <SignUp handleSwitch={handleSwitch} />}
            {modalView === "forgotPassword" && (
              <ForgotPassword handleSwitch={handleSwitch} setEmail={setEmail} />
            )}
            {modalView === "verify-otp" && (
              <VerifyOtp handleSwitch={handleSwitch} email={email} />
            )}
            {modalView === "change-password" && (
              <ChangePassword
                handleSwitch={handleSwitch}
                email={email}
                setEmail={setEmail}
              />
            )}
          </div>

          {/* Optional Terms text */}
          {/* <p className="text-xs text-center text-gray-500">
            By joining, you agree to the ICCD Freelance Terms of Service and
            Privacy Policy.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default LoginController;
