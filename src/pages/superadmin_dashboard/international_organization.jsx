import { useState, memo } from "react";
import DataLoader from "../../component/DataLoader";
import { Users, User, UserPlus, Mail, Phone, Briefcase } from "lucide-react";
import ICCDError from "../../component/ICCDError";
import Pagination from "../../component/pagination";
import useDebounce from "../../../hooks/useDebounce";
import { useGetAllIntOrg } from "../../../api/client/contact";
import TableHeader from "../../component/super_admin/table_header";
import Search_and_filters from "../../component/Search_and_filters";
import { countryFilter, categoryFilter, departmentFilter } from "../../../data/flitersData";
import ReactSelect from "../../component/buttonSelect";
import Modal from "../../component/modal/modal2";
import ContactForm from '../../component/forms/contactForm'


function International_Organization() {

  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("");
  const [filterVal, setFilterVal] = useState({
    category: "",
    department: "",
    country: "",
    city: ""
  })

  const { data, totalPages, isLoading, isError, error } = useGetAllIntOrg({
    search: useDebounce(search),
    category: filterVal.category,
    department: filterVal.department,
    country: filterVal.country,
    page
  });

  if (isError) return <ICCDError />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">

        {/* Header */}
        <TableHeader
          icon={<Users className="w-8 h-8 text-white" />}
          title={"International Organization"}
          description={"This is contact Details"}
          buttonName="Add Contacts"
          buttonIcon={<UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />}
          setOpen={setOpen}
        />

        {/* Filters */}
        <Search_and_filters
          search={search}
          setSearch={setSearch}
          inptPlaceholder="Search Name..."
          children={<>
            <ReactSelect
              selectedOption={filterVal.category}
              onChange={(selectedOption) => setFilterVal({ ...filterVal, category: selectedOption ? selectedOption.value : '' })}
              option={categoryFilter}
              placeholder='Select Category'
              value={categoryFilter.find(option => option.value === filterVal.category) || null}
            />
            <ReactSelect
              selectedOption={filterVal.department}
              onChange={(selectedOption) => setFilterVal({ ...filterVal, department: selectedOption ? selectedOption.value : '' })}
              option={departmentFilter}
              placeholder='Select Department'
              value={departmentFilter.find(option => option.value === filterVal.department) || null}
            />
            <ReactSelect
              selectedOption={filterVal.country}
              onChange={(selectedOption) => setFilterVal({ ...filterVal, country: selectedOption ? selectedOption.value : '' })}
              option={countryFilter}
              placeholder='Select Country'
              value={countryFilter.find(option => option.value === filterVal.country) || null}
            />
          </>}
        />

        <Modal isOpen={open} onClose={() => setOpen(false)} title="Add New Contacts">
          <ContactForm />
        </Modal>

        {/* Table */}
        {isLoading ? <DataLoader /> :
          <div className="mt-5 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
            {data?.length > 0 ? (
               <>
                {/* Desktop Table View - Hidden on mobile */}
                <div className="hidden lg:block bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-teal-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-[#47AAB3] via-[#2F7A80] to-[#1E4D52] text-white">
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
                              Contact
                            </div>
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-4 h-4" />
                              Designation
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-teal-100">
                        {data?.map((user) => (
                          <tr
                            key={user.id}
                            className="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-200"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#47AAB3] via-[#2F7A80] to-[#1E4D52] flex items-center justify-center shadow-md">
                                  <User className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-sm font-semibold text-gray-800">
                                  {user.organization || <span className="text-rose-500 font-normal">N/A</span>}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {user.email || <span className="text-rose-500">N/A</span>}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                              {user?.contact_number || <span className="text-rose-500">N/A</span>}
                            </td>
                            <td className="px-6 py-4">
                              {user?.designation ? (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border border-emerald-200">
                                  {user.designation}
                                </span>
                              ) : (
                                <span className="text-rose-500 text-sm">N/A</span>
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
                      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-teal-100 overflow-hidden hover:shadow-xl transition-shadow duration-200"
                    >
                      {/* Card Header */}
                      <div className="bg-gradient-to-r from-[#47AAB3] via-[#2F7A80] to-[#1E4D52] p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shadow-md">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-bold text-base sm:text-lg truncate">
                              {user.organization || <span className="text-rose-200">N/A</span>}
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
                            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Email</p>
                            <p className="text-sm text-gray-800 break-all">
                              {user.email || <span className="text-rose-500">N/A</span>}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Contact</p>
                            <p className="text-sm text-gray-800 font-medium">
                              {user?.contact_number || <span className="text-rose-500">N/A</span>}
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
        }
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
