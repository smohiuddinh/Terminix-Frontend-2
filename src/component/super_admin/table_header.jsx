import { memo } from "react";

function TableHeader({ icon, title, description, buttonName, buttonIcon, setOpen }) {
    return (
        <div className="mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-[#47AAB3] via-[#2F7A80] to-[#1E4D52] rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-white/20 rounded-xl sm:rounded-2xl backdrop-blur-sm">
                        {icon}
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{title}</h1>
                        <p className="text-blue-100 mt-1 text-sm sm:text-base">{description}</p>
                    </div>
                </div>
                <button
                    onClick={() => setOpen(true)}
                    className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-[#2F7A80] px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                    {buttonIcon}
                    {buttonName}
                </button>
            </div>
        </div>

        // <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-teal-200/30 border border-white/60 p-8">
        //     <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        //         <div className="flex items-center gap-5">
        //             <div className="relative">
        //                 {/* <div className="absolute inset-0 bg-gradient-to-r from-[#4EB5AE] to-[#2DD4BF] rounded-2xl blur-xl opacity-40 animate-pulse"></div> */}
        //                 <div className="relative p-4 bg-gradient-to-br from-[#4EB5AE] via-[#3C9299] to-[#2DD4BF] rounded-2xl shadow-lg shadow-teal-500/40">
        //                     {icon}
        //                 </div>
        //             </div>
        //             <div>
        //                 <div className="flex flex-wrap items-center gap-2 mb-2">
        //                     <h1 className="text-2xl sm:text-3xl  font-bold text-black bg-clip-text">
        //                         {title}
        //                     </h1>
        //                     <Sparkles className="w-6 h-6 text-[#4EB5AE]" />
        //                 </div>
        //                 <p className="text-slate-600 flex items-center gap-2 text-lg">
        //                     <TrendingUp className="w-4 h-4 text-[#4EB5AE]" />
        //                     {description}
        //                 </p>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default memo(TableHeader)