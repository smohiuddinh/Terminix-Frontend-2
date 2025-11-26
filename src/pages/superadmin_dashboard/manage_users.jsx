import { useState, memo, useEffect } from "react";
import { Search, Users, User, TrendingUp, Sparkles } from "lucide-react";
import { useGetAllUsers } from "../../../api/client/superadmin";
import DataError from "./DataError";
import useDebounce from "../../../hooks/useDebounce";
import DataLoader from "./DataLoader";
import { formatDate, getRelativeTime } from "../../../functions/timeFormat";
import Pagination from "../../component/pagination";
import ICCDError from "../../component/ICCDError";

const SORT_OPTIONS = [
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
  { value: "created_at", label: "Registration Date" },
  { value: "updated_at", label: "Last Update" },
];

const FILTER_OPTIONS = [
  { value: "all", label: "All Users" },
  { value: "recent", label: "Recent (Last 30 days)" },
  { value: "active", label: "Active Users" },
  { value: "inactive", label: "Inactive Users" },
];

function ManageUsers() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, totalPages, isLoading, isError, error } = useGetAllUsers({ search: useDebounce(search), page });

  if (isLoading) return <DataLoader />;
  if (isError) return <ICCDError />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
                      User Management
                    </h1>
                    <Sparkles className="w-6 h-6 text-[#4EB5AE]" />
                  </div>
                  <p className="text-slate-600 flex items-center gap-2 text-lg">
                    <TrendingUp className="w-4 h-4 text-[#4EB5AE]" />
                    Manage and monitor all system users •{" "}
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
        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
          {data?.length > 0 ? (
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th
                    onClick={() => handleSort("name")}
                    className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  >
                    Name
                  </th>
                  <th
                    onClick={() => handleSort("email")}
                    className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  >
                    Email
                  </th>
                  <th
                    onClick={() => handleSort("created_at")}
                    className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  >
                    Joined
                  </th>
                  <th
                    onClick={() => handleSort("updated_at")}
                    className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  >
                    Last Active
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data?.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50">

                    <td className="px-4 py-3 text-sm font-medium text-slate-800 flex items-center gap-2">
                      {user?.fileUrl ? (
                        <img
                          src={user.fileUrl}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                          <User className="w-4 h-4 text-slate-500" />
                        </div>
                      )}
                      {user.name}
                    </td>

                    <td className="px-4 py-3 text-sm text-slate-600">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {formatDate(user.created_at)}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {getRelativeTime(user.updated_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center">
              <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                No users found
              </h3>
              <p className="text-slate-600 mb-4">
                {search
                  ? `No users match "${search}"`
                  : "No users in the system yet"}
              </p>
            </div>
          )}
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
      )
    </div>
  );
}

export default memo(ManageUsers);
