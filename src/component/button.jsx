import { Loader2 } from "lucide-react";

export default function Button({
  text = "Submit",
  isLoading = false,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`flex gap-2 items-center justify-center font-semibold text-white bg-[#15A9B2] rounded-full transition
        ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#05929c] cursor-pointer"} ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Processing...
        </>
      ) : (
        text
      )}
    </button>
  );
}
