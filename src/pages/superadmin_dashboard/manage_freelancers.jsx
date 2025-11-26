import { useState, memo, useMemo, useCallback } from "react";
import { Search, Users, Mail, User, MapPin, Clock, RefreshCw, Star, Sparkles, TrendingUp, Award, Calendar } from "lucide-react";
import { useGetAllFreelancers } from '../../../api/client/superadmin';
import { formatDate } from "../../../functions/timeFormat";
import DataLoader from "./DataLoader";
import ICCDError from "../../component/ICCDError";

const ManageFreelancers = () => {
  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: freelancers = [], isLoading, isError} = useGetAllFreelancers();

  if(isLoading) return <DataLoader />
  if(isError) return <ICCDError />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-teal-200/30 border border-white/60 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4EB5AE] to-[#2DD4BF] rounded-2xl blur-xl opacity-40 animate-pulse"></div>
                  <div className="relative p-4 bg-gradient-to-br from-[#4EB5AE] via-[#3C9299] to-[#2DD4BF] rounded-2xl shadow-lg shadow-teal-500/40">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl sm:text-4xl font-bold text-black bg-clip-text ">
                      Freelancer Management
                    </h1>
                    <Sparkles className="w-6 h-6 text-[#4EB5AE]" />
                  </div>
                  <p className="text-slate-600 flex items-center gap-2 text-lg">
                    <TrendingUp className="w-4 h-4 text-[#4EB5AE]" />
                    Manage and view all freelancers •{" "}
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
                  placeholder="Search Freelancer by name..."
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

        {/* Freelancers List */}
        <div className="space-y-5">
          {freelancers?.length > 0 ? (
            freelancers?.map((freelancer, idx) => (
              <div
                key={freelancer.id}
                className="group relative backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 
                           border border-slate-200/60 hover:shadow-xl hover:shadow-blue-200/50 
                           hover:border-blue-300/60 transition-all duration-500 transform hover:-translate-y-1 overflow-hidden"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {/* Background Glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative p-6 flex flex-col xl:flex-row xl:items-center gap-6 lg:gap-8">
                  {/* Profile Section */}
                  <div className="flex items-start gap-5 xl:w-1/3">
                    <div className="relative flex-shrink-0">
                      {freelancer?.fileUrl ? (
                        <img
                          src={freelancer.fileUrl}
                          alt={`${freelancer.firstName} ${freelancer.lastName}`}
                          className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white shadow-xl"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-xl">
                          <User className="w-10 h-10 text-white" />
                        </div>
                      )}
                      {/* Status Indicator */}
                      {/* <div className="absolute -bottom-1 -right-1">
                        {getStatusBadge(freelancer.status)}
                      </div> */}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {freelancer.firstName} {freelancer.lastName}
                        </h3>
                      </div>

                      {/* {freelancer.rating && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 rounded-lg border border-amber-200/60">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="text-sm font-bold text-amber-700">{freelancer.rating}</span>
                          </div>
                        </div>
                      )} */}

                      <p className="text-slate-600 font-medium flex items-center gap-2 mb-2 text-sm">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{freelancer.email || "N/A"}</span>
                      </p>

                      {freelancer.location && (
                        <p className="text-slate-600 font-medium flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          {freelancer.location}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Skills */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <Award className="w-3.5 h-3.5" />
                        Skills
                      </div>
                      <p className="text-slate-800 font-bold text-sm leading-relaxed line-clamp-2">
                        {freelancer.skills || "N/A"}
                      </p>
                    </div>

                    {/* Tagline */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        Title
                      </div>
                      <p className="text-slate-800 font-bold text-sm">
                        {freelancer.about_tagline || "No Tagline"}
                      </p>
                    </div>

                    {/* Member Since */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <Calendar className="w-3.5 h-3.5" />
                        Member Since
                      </div>
                      <p className="text-slate-800 font-bold text-sm">
                        {formatDate(freelancer.created_at)}
                      </p>
                      {/* <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3" />
                        {getRelativeTime(freelancer.created_at)}
                      </p> */}
                    </div>
                  </div>

                  {/* User ID Badge */}
                  {/* <div className="xl:w-auto">
                    <div className="px-4 py-3 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl border border-slate-200/60 text-center">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        User ID
                      </div>
                      <div className="font-mono font-bold text-slate-900">
                        {freelancer.userID}
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/60 p-16 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 mb-6 shadow-lg">
                <Users className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {search || statusFilter !== "all"
                  ? "No matches found"
                  : "No freelancers yet"}
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed max-w-md mx-auto">
                {search || statusFilter !== "all"
                  ? "Try adjusting your search criteria or filters to find what you're looking for"
                  : "Freelancers will appear here once they register on the platform"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ManageFreelancers);