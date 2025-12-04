import { useState, memo } from "react";
import DataLoader from "../../component/DataLoader";
import { Users, User, Mail, Phone, Briefcase, UserPlus } from "lucide-react";
import ICCDError from "../../component/ICCDError";
import Pagination from "../../component/pagination";
import useDebounce from "../../../hooks/useDebounce";
import { useGetAllContacts } from "../../../api/client/contact";
import Search_and_filters from "../../component/Search_and_filters";
import { countryFilter, categoryFilter, departmentFilter } from "../../../data/flitersData";
import ReactSelect from "../../component/buttonSelect";
import Modal from "../../component/modal/modal2";
import ContactForm from '../../component/forms/contactForm';

function Contacts() {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterVal, setFilterVal] = useState({
    category: "",
    department: "",
    country: "",
    city: ""
  });

  const { data, totalPages, isLoading, isError, error } = useGetAllContacts({
    search: useDebounce(search),
    category: filterVal.category,
    department: filterVal.department,
    country: filterVal.country,
    page
  });

  if (isError) return <ICCDError />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 max-w-7xl mx-auto">

        {/* Header - Responsive */}
        <div className="mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-[#47AAB3] via-[#2F7A80] to-[#1E4D52] rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-white/20 rounded-xl sm:rounded-2xl backdrop-blur-sm">
                <Users className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Contacts Directory</h1>
                <p className="text-blue-100 mt-1 text-sm sm:text-base">Manage your professional network</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-[#2F7A80] px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
              Add Contact
            </button>
          </div>
        </div>

        {/* Filters */}
        <Search_and_filters
          search={search}
          setSearch={setSearch}
          inptPlaceholder="Search contacts..."
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

        {/* Contact Form Modal */}
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Add New Contact">
          <ContactForm />
        </Modal>

        {/* Table/Cards - Responsive */}
        {isLoading ? <DataLoader /> :
          <div className="mt-4 sm:mt-6">
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
                                  {user.name || <span className="text-rose-500 font-normal">N/A</span>}
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
                              {user.name || <span className="text-rose-200">N/A</span>}
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
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-teal-100 p-8 sm:p-12 md:p-16 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                  No Contacts Found
                </h3>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
                  {search
                    ? `No results matching "${search}"`
                    : "Start building your network by adding contacts"}
                </p>
                <button
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                  Add Your First Contact
                </button>
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

export default memo(Contacts);