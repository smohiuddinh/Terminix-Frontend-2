import { useState, memo } from "react";
import DataLoader from "../../component/DataLoader";
import { Users, User } from "lucide-react";
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

        {/* Table */}
        {isLoading ? <DataLoader /> :
          <div className="mt-5 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
            {data?.length > 0 ? (
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th
                      onClick={() => handleSort("name")}
                      className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                    >
                      Organization Name
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
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                          <User className="w-4 h-4 text-slate-500" />
                        </div>
                        {user.organization || <p className="text-red-500">N/A</p>}
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
