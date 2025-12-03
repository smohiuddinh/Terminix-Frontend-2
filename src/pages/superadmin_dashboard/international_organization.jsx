import { useState, memo } from "react";
import DataLoader from "../../component/DataLoader";
import { Users, User, Building2, Mail, Phone, Briefcase } from "lucide-react";
import ICCDError from "../../component/ICCDError";
import Pagination from "../../component/pagination";
import useDebounce from "../../../hooks/useDebounce";
import { useGetAllIntOrg } from "../../../api/client/contact";
import TableHeader from "../../component/super_admin/table_header";
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">

        {/* Header with gradient background */}
        <div className="mb-8 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-3xl shadow-xl p-8 text-white">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">International Organizations</h1>
              <p className="text-indigo-100 mt-1">Manage and explore global organization contacts</p>
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

        {/* Table with modern card design */}
        {isLoading ? <DataLoader /> :
          <div className="mt-6">
            {data?.length > 0 ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-purple-100 overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white">
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
                    {data?.map((user, index) => (
                      <tr 
                        key={user.id} 
                        className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center shadow-md">
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
            ) : (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-purple-100 p-16 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mx-auto mb-6">
                  <Users className="w-12 h-12 text-indigo-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  No Organizations Found
                </h3>
                <p className="text-gray-600 text-lg">
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