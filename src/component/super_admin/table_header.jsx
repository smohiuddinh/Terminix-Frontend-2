import { Search, Users, User, TrendingUp, Sparkles } from "lucide-react";
import { memo } from "react";

function TableHeader({ icon, title, description, inputPlaceHolder, search, setSearch }) {
    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-teal-200/30 border border-white/60 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-center gap-5">
                    <div className="relative">
                        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#4EB5AE] to-[#2DD4BF] rounded-2xl blur-xl opacity-40 animate-pulse"></div> */}
                        <div className="relative p-4 bg-gradient-to-br from-[#4EB5AE] via-[#3C9299] to-[#2DD4BF] rounded-2xl shadow-lg shadow-teal-500/40">
                            {icon}
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h1 className="text-2xl sm:text-3xl  font-bold text-black bg-clip-text">
                                {title}
                            </h1>
                            <Sparkles className="w-6 h-6 text-[#4EB5AE]" />
                        </div>
                        <p className="text-slate-600 flex items-center gap-2 text-lg">
                            <TrendingUp className="w-4 h-4 text-[#4EB5AE]" />
                            {description}
                            {/* <span className="font-bold text-[#4EB5AE]">
                      {gigs.length} total
                    </span> */}
                        </p>
                    </div>
                </div>

                {/* Search Bar */}
                {/* <div className="relative group lg:min-w-96">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-[#4EB5AE] transition-colors" />
                    </div>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="block w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl
                             bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2
                             focus:ring-[#4EB5AE]/20 focus:border-[#4EB5AE] focus:bg-white
                             transition-all duration-300 shadow-sm hover:shadow-md font-medium"
                        placeholder={inputPlaceHolder}
                    />
                </div> */}
            </div>

            {/* Stats Bar */}
            {/* <div className="mt-8 pt-6 border-t border-slate-200/60">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatBadge
                  label="Total Gigs"
                  value={filteredGigs?.length || 0}
                  icon={<Layers className="w-4 h-4" />}
                />
                <StatBadge
                  label="Categories"
                  value={new Set(gigs.map(g => g.category)).size}
                  icon={<Tag className="w-4 h-4" />}
                />
                <StatBadge
                  label="Last Updated"
                  value={new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  icon={<Calendar className="w-4 h-4" />}
                />
              </div>
            </div> */}
        </div>
    )
}

export default memo(TableHeader)