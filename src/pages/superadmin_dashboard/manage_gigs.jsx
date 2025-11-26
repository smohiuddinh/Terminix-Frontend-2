import { useState, memo } from "react";
import { Search, Box, TrendingUp, Sparkles, Calendar, User, Tag, Eye, Layers } from "lucide-react";
import useDebounce from "../../../hooks/useDebounce";
import { useGetAllGigs } from "../../../api/client/superadmin";
import DataLoader from "./DataLoader";
import ICCDError from "../../component/ICCDError";
import { formatDate } from "../../../functions/timeFormat";

const ManageGigs = () => {
  const [search, setSearch] = useState("");
  const { data, isSuccess, isPending, isError, isLoading } = useGetAllGigs({ search: useDebounce(search) })

  // const filteredGigs = gigs?.filter(
  //   (gig) =>
  //     gig.title?.toLowerCase().includes(search.toLowerCase()) ||
  //     gig.category?.toLowerCase().includes(search.toLowerCase())
  // );
  if (isLoading) return <DataLoader />;
  if (isError) return <ICCDError />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/20">
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-teal-200/30 border border-white/60 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4EB5AE] to-[#2DD4BF] rounded-2xl blur-xl opacity-40 animate-pulse"></div>
                  <div className="relative p-4 bg-gradient-to-br from-[#4EB5AE] via-[#3C9299] to-[#2DD4BF] rounded-2xl shadow-lg shadow-teal-500/40">
                    <Box className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl sm:text-4xl font-bold text-black bg-clip-text ">
                      Gigs Management
                    </h1>
                    <Sparkles className="w-6 h-6 text-[#4EB5AE]" />
                  </div>
                  <p className="text-slate-600 flex items-center gap-2 text-lg">
                    <TrendingUp className="w-4 h-4 text-[#4EB5AE]" />
                    Manage and view all freelancer gigs •{" "}
                    {/* <span className="font-bold text-[#4EB5AE]">
                      {gigs.length} total
                    </span> */}
                  </p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative group lg:min-w-96">
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
                  placeholder="Search gigs by title or category..."
                />
              </div>
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
        </div>
        {/* Gigs Grid */}
        {data?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {data?.map((gig, idx) => (
              <div
                key={gig?.id}
                className="group relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 border border-white/60
                           hover:shadow-2xl hover:shadow-teal-200/50 hover:border-[#4EB5AE]/40
                           transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Gradient Accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4EB5AE] via-[#2DD4BF] to-[#4EB5AE]"></div>

                {/* Background Glow Effect */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-[#4EB5AE]/20 to-[#2DD4BF]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative p-6 flex flex-col gap-5 h-full">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#4EB5AE]/10 to-[#2DD4BF]/10 text-[#3C9299] text-xs font-bold rounded-full border border-[#4EB5AE]/30">
                      <Tag className="w-3 h-3" />
                      {gig?.category}
                    </span>
                    {gig.price && (
                      <span className="text-lg font-bold text-[#4EB5AE]">
                        {gig.price}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#4EB5AE] transition-colors line-clamp-2 leading-tight">
                      {gig.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {gig.description}
                    </p>
                  </div>

                  {/* Gig Details */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-br from-slate-50 to-teal-50/30 rounded-xl border border-slate-200/60">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Layers className="w-4 h-4 text-[#4EB5AE]" />
                        <span className="text-xs font-semibold">Subcategory</span>
                      </div>
                      <span className="text-sm font-bold text-slate-900">
                        {gig.subCategory}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gradient-to-br from-slate-50 to-teal-50/30 rounded-xl border border-slate-200/60">
                      <div className="flex items-center gap-2 text-slate-600">
                        <User className="w-4 h-4 text-[#4EB5AE]" />
                        <span className="text-xs font-semibold">Freelancer ID</span>
                      </div>
                      <span className="text-sm font-bold text-slate-900 font-mono">
                        {gig.freelancer_id}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 rounded-xl border border-[#4EB5AE]/20">
                      <div className="flex items-center gap-2 text-[#3C9299]">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs font-semibold">Created</span>
                      </div>
                      <span className="text-sm font-bold text-[#3C9299]">
                        {formatDate(gig.created_at)}
                      </span>
                    </div>
                  </div>


                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-teal-200/30 border border-white/60 p-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 mb-6 shadow-lg">
                <Box className="w-12 h-12 text-[#4EB5AE]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">No Gigs Found</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto text-lg">
                {search
                  ? `No gigs match your search for "${search}"`
                  : "There are no gigs in the system yet"}
              </p>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="bg-gradient-to-r from-[#4EB5AE] to-[#2DD4BF] hover:from-[#3C9299] hover:to-[#4EB5AE]
                             text-white px-8 py-3.5 rounded-xl font-bold transition-all duration-300
                             shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 transform hover:scale-105"
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatBadge = ({ label, value, icon }) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-[#4EB5AE]/10 to-[#2DD4BF]/10 text-[#3C9299] rounded-xl border border-[#4EB5AE]/30 hover:shadow-md transition-shadow">
      <div className="p-2 bg-white rounded-lg shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold opacity-75 uppercase tracking-wide">{label}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );
};

export default memo(ManageGigs);