import { useState, memo } from "react";
import DataLoader from "../../component/DataLoader";
import { Users, User, Building2, Mail, Phone, Briefcase } from "lucide-react";
import ICCDError from "../../component/ICCDError";
import Pagination from "../../component/pagination";
import useDebounce from "../../../hooks/useDebounce";
import { useGetAllIntOrg } from "../../../api/client/contact";
import Search_and_filters from "../../component/Search_and_filters";
import { countryFilter, categoryFilter, departmentFilter } from "../../../data/flitersData";
import ReactSelect from "../../component/buttonSelect";

function International_Organization() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterVal, setFilterVal] = useState({
    category: "",
    department: "",
    country: "",
    city: ""
  });

  const { data, totalPages, isLoading, isError, error } = useGetAllIntOrg({
    search: useDebounce(search),
    category: filterVal.category,
    department: filterVal.department,
    country: filterVal.country,
    page
  });

  if (isError) return <ICCDError />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 max-w-7xl mx-auto">

        {/* Header - Responsive */}
        <div className="mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-[#47AAB3] via-[#2F7A80] to-[#1E4D52] rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-white/20 rounded-xl sm:rounded-2xl backdrop-blur-sm">
              <Building2 className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">International Organizations</h1>
              <p className="text-indigo-100 mt-1 text-sm sm:text-base">Manage and explore global organization contacts</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Search_and_filters
          search={search}
          setSearch={setSearch}
          inptPlaceholder="Search organizations..."
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

        {/* Table/Cards - Responsive */}
        {isLoading ? <DataLoader /> :
          <div className="mt-4 sm:mt-6">
            {data?.length > 0 ? (
              <>
                {/* Desktop Table View - Hidden on mobile */}
                <div className="hidden lg:block bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-purple-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-[#47AAB3] via-[#2F7A80] to-[#1E4D52] text-white">
                          <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide">
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4" />
                              Organization
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
                      <tbody className="divide-y divide-purple-100">
                        {data?.map((user) => (
                          <tr 
                            key={user.id} 
                            className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
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
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border border-indigo-200">
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
                      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 overflow-hidden hover:shadow-xl transition-shadow duration-200"
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
                          <Mail className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Email</p>
                            <p className="text-sm text-gray-800 break-all">
                              {user.email || <span className="text-rose-500">N/A</span>}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
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
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-purple-100 p-8 sm:p-12 md:p-16 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-indigo-500" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                  No Organizations Found
                </h3>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                  {search
                    ? `No results matching "${search}"`
                    : "Start by adding organizations to the system"}
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
    </div>
  );
}

export default memo(International_Organization);