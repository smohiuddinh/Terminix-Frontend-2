import { Search, X } from "lucide-react";

function TableHeader({ icon, title, description, inputPlaceHolder, search, setSearch }) {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between mb-6 bg-gradient-to-r from-[#043A53] via-[#065f73] to-[#3C939D] rounded-md p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4 sm:mb-0">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    {icon}
                </div>
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">{title}</h1>
                    <p className="text-blue-100 text-sm sm:text-lg">{description}</p>
                </div>
            </div>

            {/* Search */}
            <div className="flex justify-start sm:justify-end">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute top-2.5 left-2.5 text-gray-400 w-5 h-5" />
                    {search && (
                        <X
                            onClick={() => setSearch("")}
                            className="cursor-pointer absolute top-2.5 right-2.5 text-gray-400 w-5 h-5" />
                    )}
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={inputPlaceHolder}
                        className="w-full h-10 px-9 py-2 pr-10 rounded-md border border-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm sm:text-base"
                    />
                </div>
            </div>
        </div>
    )
}

export default TableHeader