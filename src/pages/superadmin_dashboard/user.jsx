import { useState, memo } from "react";
import { Users, User, UserPlus, Mail, Phone, UsersRound } from "lucide-react";
import Modal from "../../component/modal/modal2";
import ICCDError from "../../component/ICCDError";
import DataLoader from "../../component/dataLoader";
import Pagination from "../../component/pagination";
import useDebounce from "../../../hooks/useDebounce";
import ReactSelect from "../../component/buttonSelect";
import { useGetAllUser } from "../../../api/client/admin";
import TableHeader from "../../component/super_admin/table_header";
import Search_and_filters from "../../component/Search_and_filters";
import { roleFilter } from "../../../data/flitersData";
import UserForm from "../../component/forms/userForm";

function Iccd_Users() {

  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterVal, setFilterVal] = useState({
    category: "",
    role: "",
  });

  const { data, totalPages, isLoading, isError, error } = useGetAllUser({
    search: useDebounce(search),
    role: filterVal.role,
    page,
  });

  if (isError) return <ICCDError />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">

        {/* Header */}
        <TableHeader
          icon={<UsersRound className="w-8 h-8 text-white" />}
          title={"Users"}
          description={"This is users Details"}
          buttonName="Add User"
          buttonIcon={<UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />}
          setOpen={setOpen}
        />

        {/* Filters */}
        <Search_and_filters
          search={search}
          setSearch={setSearch}
          inptPlaceholder="Search Role..."
          children={
            <>
              <ReactSelect
                selectedOption={filterVal.category}
                onChange={(selectedOption) =>
                  setFilterVal({
                    ...filterVal,
                    role: selectedOption ? selectedOption.value : "",
                  })
                }
                option={roleFilter}
                placeholder="Select Role"
                value={
                  roleFilter.find(
                    (option) => option.value === filterVal.role
                  ) || null
                }
              />
            </>
          }
        />

        {/* Contact Form */}
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Add New User"
        >
          <UserForm />
        </Modal>

        {/* Table */}
        {isLoading ? (
          <DataLoader />
        ) : (
          <div className="mt-5 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
            {data?.length > 0 ? (
              <>
                {/* Desktop Table View - Hidden on mobile */}
                <div className="hidden lg:block bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-teal-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gradient-to-br from-[#1a3d26] via-[#29623A] to-[#0f2419] text-white">
                          <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              Name
                            </div>
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              Email
                            </div>
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              Role
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-teal-200">
                        {data?.map((user) => (
                          <tr
                            key={user.id}
                            className="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-200"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3 max-w-xs">

                                {/* Avatar */}
                                <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-gradient-to-br from-[#1a3d26] via-[#29623A] to-[#0f2419] flex items-center justify-center shadow-md">
                                  <User className="w-6 h-6 text-white" />
                                </div>

                                {/* Name */}
                                <p
                                  className="text-sm font-medium text-gray-800 truncate max-w-[180px]"
                                  title={user?.name}
                                >
                                  {user?.name || "N/A"}
                                </p>

                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {user.email || (
                                <span className="text-rose-500">N/A</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                              {user?.role || (
                                <span className="text-rose-500">N/A</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile/Tablet Card View - Visible on smaller screens */}
                <div className="lg:hidden space-y-4">
                  {data?.map((user) => (
                    <div
                      key={user.id}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-teal-200 overflow-hidden hover:shadow-xl transition-shadow duration-200"
                    >
                      {/* Card Header */}
                      <div className="bg-gradient-to-r from-[#47AAB3] via-[#2F7A80] to-[#1E4D52] p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shadow-md">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-bold text-base sm:text-lg truncate">

                              {user?.name
                                ? user.name.slice(0, 20)
                                : <span className="text-rose-200">N/A</span>
                              }


                            </h3>
                            {user?.designation && (
                              <span className="inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                                {user.designation}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-4 space-y-3">
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                              Email
                            </p>
                            <p className="text-sm text-gray-800 break-all">
                              {user.email || (
                                <span className="text-rose-500">N/A</span>
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                              Contact
                            </p>
                            <p className="text-sm text-gray-800 font-medium">
                              {user?.contact_number || (
                                <span className="text-rose-500">N/A</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
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
        )}
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

export default memo(Iccd_Users);
