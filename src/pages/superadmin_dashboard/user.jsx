import { useState, memo } from "react";
import {
  Users, User, UserPlus, Mail, Shield,
  Search, Filter, ChevronDown, ArrowUpDown,
  MoreHorizontal, Pencil
} from "lucide-react";
import Modal from "../../component/modal/modal2";
import ICCDError from "../../component/ICCDError";
import DataLoader from "../../component/dataLoader";
import Pagination from "../../component/pagination";
import useDebounce from "../../../hooks/useDebounce";
import { useGetAllUser } from "../../../api/client/admin";
import UserForm from "../../component/forms/userForm";

/* ── Role badge colours ── */
const roleMeta = {
  admin:   { label: "Admin",   bg: "bg-purple-50",  text: "text-purple-700",  dot: "bg-purple-400"  },
  cashier: { label: "Cashier", bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-400"   },
  gm:      { label: "GM",      bg: "bg-blue-50",    text: "text-blue-700",    dot: "bg-blue-400"    },
};


const RoleBadge = ({ role }) => {
  const m = roleMeta[role?.toLowerCase()] || { label: role || "N/A", bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${m.bg} ${m.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
      {m.label}
    </span>
  );
};

/* ── Avatar initials ── */
const Avatar = ({ name }) => {
  const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#29623A] to-[#4BA54F] flex items-center justify-center flex-shrink-0">
      <span className="text-white text-xs font-semibold">{initials}</span>
    </div>
  );
};

function Terminix_Users() {
  const [page, setPage]       = useState(1);
  const [open, setOpen]       = useState(false);
  const [search, setSearch]   = useState("");
  const [roleFilter2, setRoleFilter2] = useState("");
  const [roleDropOpen, setRoleDropOpen] = useState(false);

  const { data, totalPages, isLoading, isError } = useGetAllUser({
    search: useDebounce(search),
    role: roleFilter2,
    page,
  });

  if (isError) return <ICCDError />;

  const roles = ["", "admin", "cashier", "gm"];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-5">

        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">User Management</h1>
            <p className="text-sm text-gray-500 mt-0.5">Manage system users and their roles</p>
          </div>
   
        </div>

        {/* ── Tabs ── */}
        <div className="flex items-center gap-1 border-b border-gray-200">
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#29623A] border-b-2 border-[#29623A] -mb-px">
            <User className="w-4 h-4" />
            User management
          </button>
        </div>

 
        {/* ── Modal ── */}
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Add New User">
          <UserForm />
        </Modal>

        {/* ── Table ── */}
        {isLoading ? (
          <DataLoader />
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            {data?.length > 0 ? (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/70">
                        <th className="px-5 py-3.5 text-left">
                          <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hover:text-gray-700 transition-colors">
                            Name <ArrowUpDown className="w-3 h-3" />
                          </button>
                        </th>
                        <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Email address
                        </th>
                        <th className="px-5 py-3.5 text-left">
                          <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hover:text-gray-700 transition-colors">
                            Roles <ChevronDown className="w-3 h-3" />
                          </button>
                        </th>
                        <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Status
                        </th>
                        <th className="px-5 py-3.5 w-12" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {data.map((user, idx) => (
                        <tr key={user.id || idx} className="hover:bg-gray-50/60 transition-colors group">
                          {/* Name + Avatar */}
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              <Avatar name={user?.name} />
                              <span className="text-sm font-medium text-gray-900 truncate max-w-[160px]" title={user?.name}>
                                {user?.name || "N/A"}
                              </span>
                            </div>
                          </td>

                          {/* Email */}
                          <td className="px-5 py-3.5">
                            <span className="text-sm text-gray-600">{user?.email || <span className="text-gray-400">N/A</span>}</span>
                          </td>

                          {/* Role */}
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2">
                              <RoleBadge role={user?.role} />
                              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-100">
                                <Pencil className="w-3 h-3 text-gray-400" />
                              </button>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-5 py-3.5">
                            {user?.isActive !== false ? (
                              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                Inactive
                              </span>
                            )}
                          </td>

                          {/* Edit */}
                          <td className="px-5 py-3.5">
                            <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100">
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-gray-100">
                  {data.map((user, idx) => (
                    <div key={user.id || idx} className="p-4 flex items-center gap-3">
                      <Avatar name={user?.name} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{user?.name || "N/A"}</p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">{user?.email || "N/A"}</p>
                      </div>
                      <RoleBadge role={user?.role} />
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-5 py-3.5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-xs text-gray-500">
                  <span>Showing {data.length} {data.length === 1 ? 'user' : 'users'}</span>
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={(newPage) => setPage(newPage)}
                  />
                </div>
              </>
            ) : (
              <div className="py-20 text-center">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">No users found</h3>
                <p className="text-xs text-gray-500">
                  {search ? `No results for "${search}"` : "No users in the system yet"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(Terminix_Users);