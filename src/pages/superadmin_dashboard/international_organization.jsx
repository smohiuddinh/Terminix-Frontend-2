import { useState, memo, useEffect } from "react";
import { Search, Users, User, TrendingUp, Sparkles } from "lucide-react";
import DataError from "./DataError";
import useDebounce from "../../../hooks/useDebounce";
import DataLoader from "./DataLoader";
import { formatDate, getRelativeTime } from "../../../functions/timeFormat";
import Pagination from "../../component/pagination";
import ICCDError from "../../component/ICCDError";
import TableHeader from "../../component/super_admin/table_header";
import { useGetAllContacts } from "../../../api/client/contact";

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

function International_Organization() {

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, totalPages, isLoading, isError, error } = useGetAllContacts({ search: useDebounce(search), page });

  if (isLoading) return <DataLoader />;
  if (isError) return <ICCDError />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <TableHeader
          icon={<Users className="w-8 h-8 text-white" />}
          title={"International Organization"}
          description={"This is contact Details"}
          inputPlaceHolder={"Search Member"}
          search={search}
          setSearch={setSearch}
        />
        {/* Table */}
        <div className="mt-5 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
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
                    Number
                  </th>
                  <th
                    onClick={() => handleSort("updated_at")}
                    className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  >
                    Designation
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
                      {user.email || <p className="text-red-500">N/A</p>}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {user?.contact_number || <p className="text-red-500">N/A</p>}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {user?.designation || <p className="text-red-500">N/A</p>}
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

export default memo(International_Organization);
