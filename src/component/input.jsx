const Input = ({
    field,
    error,
    type = "text",
    placeholder = "",
}) => {
    return (
        <input
            {...field}
            type={type}
            placeholder={placeholder}
            className={`w-full 
                px-3 py-2               /* mobile padding */
                sm:px-4 sm:py-3       /* larger padding for tablets/desktops */

                bg-gray-50 border-2 rounded-xl 
                text-sm sm:text-base     /* responsive text size */
                focus:outline-none focus:bg-white transition-all duration-300 text-gray-800

                ${error
                    ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    : "border-gray-200 focus:border-[#44A4AD] focus:ring-4 focus:ring-[#44A4AD]/30"
                }
            `}
        />
    );
};

export default Input;
