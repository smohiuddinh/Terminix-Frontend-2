"use client";
import { useState, useEffect } from "react";
import logo from "../assets/ICCD-01.png";

export default function ICCDLoader({ isLoading = true, onComplete }) {
  const [isVisible, setIsVisible] = useState(isLoading);
  const [fadeClass, setFadeClass] = useState("opacity-100");

  useEffect(() => {
    if (!isLoading) {
      setFadeClass("opacity-0");
      setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 500);
    } else {
      setIsVisible(true);
      setFadeClass("opacity-100");
    }
  }, [isLoading, onComplete]);

  if (!isVisible) return null;

  return (
    <>
      <style jsx="true">{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .spin-animation {
          animation: spin 2s linear infinite;
        }
        .pulse-animation {
          animation: pulse 1s ease-in-out infinite;
        }
        .bounce-1 {
          animation: bounce 1s ease-in-out infinite;
        }
        .bounce-2 {
          animation: bounce 1s ease-in-out infinite 0.2s;
        }
        .bounce-3 {
          animation: bounce 1s ease-in-out infinite 0.4s;
        }
      `}</style>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center
          bg-gradient-to-t from-[#4AADB6] via-white to-[#F8F9FA]
          transition-opacity duration-500 ${fadeClass}`}
      >
        <div className="flex flex-col items-center space-y-3 sm:space-y-4">
          {/* Logo with animated ring and pulse */}
          <div className="relative w-28 h-28 sm:w-40 sm:h-40 md:w-54 md:h-54">
            <div className="absolute inset-0 rounded-full border-[8px] sm:border-[10px] md:border-[12px] border-t-[#4AADB6] border-r-transparent border-b-transparent border-l-transparent spin-animation"></div>
            <div className="w-full h-full flex items-center justify-center pulse-animation">
              <img
                src={logo}
                alt="ICCD Logo"
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-30 md:h-30 object-contain"
              />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-1 sm:mb-2">
              ICCD
            </h1>
            <p className="lg:text-xl text-sm text-gray-600 text-center">
              Islamic Chamber of <span className="block sm:hidden" />
              Commerce & Development
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
