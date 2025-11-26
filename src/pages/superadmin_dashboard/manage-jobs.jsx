import React, { useState } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  TrendingUp,
  Settings,
  Sparkles,
  BriefcaseBusiness,
} from "lucide-react";
import { useGetAllJobs } from "../../../api/client/superadmin";

const ActiveJobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    jobTitle: "",
    jobType: "",
    joblocation: "",
  });
  const [searchInputs, setSearchInputs] = useState({
    jobTitle: "",
    jobType: "",
    joblocation: "",
  });

  const {
    data: jobs,
    totalPages,
    active_jobs,
    total_jobs,
    isPending,
    isError,
  } = useGetAllJobs({
    page: currentPage,
    ...filters,
  });

  // Calculate stats from jobs data
  const stats = {
    totalJobs: total_jobs || 0,
    activeThisWeek:
      jobs?.filter((job) => {
        const daysSincePosted = Math.floor(
          (new Date() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24)
        );
        return daysSincePosted <= 7;
      }).length || 0,
    newThisMonth:
      jobs?.filter((job) => {
        const daysSincePosted = Math.floor(
          (new Date() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24)
        );
        return daysSincePosted <= 30;
      }).length || 0,
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-semibold mb-2">
            Error Loading Jobs
          </h3>
          <p className="text-red-600">
            Unable to fetch jobs. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        {/* Header */}
        <div className="mb-8">
          <div className=" backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-gradient-to-r from-[#3C9299] via-[#2DD4BF] to-[#3C9299] rounded-2xl shadow-lg shadow-blue-500/30">
                  <BriefcaseBusiness className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
                      Job Management
                    </h1>
                    <Sparkles className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-slate-600 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Monitor And Manage Active And Inactive Job Listings
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium mb-1">
                  Total Jobs
                </p>
                <p className="text-3xl font-bold text-blue-900">
                  {stats.totalJobs}
                </p>
              </div>
              <div className="bg-blue-200 p-3 rounded-lg">
                <Briefcase className="w-6 h-6 text-blue-700" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium mb-1">
                  Active Jobs
                </p>
                <p className="text-3xl font-bold text-green-900">
                  {active_jobs}
                </p>
              </div>
              <div className="bg-green-200 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-700" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium mb-1">
                  New This Month
                </p>
                <p className="text-3xl font-bold text-purple-900">
                  {stats.newThisMonth}
                </p>
              </div>
              <div className="bg-purple-200 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-purple-700" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium mb-1">
                  Total Pages
                </p>
                <p className="text-3xl font-bold text-orange-900">
                  {totalPages || 0}
                </p>
              </div>
              <div className="bg-orange-200 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-orange-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      {jobs && jobs.length > 0 ? (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {job.jobTitle}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3 flex-wrap">
                    {job.name && (
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        {job.name}
                      </span>
                    )}
                    {job.joblocation && (
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {job.joblocation}
                      </span>
                    )}
                    {job.jobType && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {job.jobType}
                      </span>
                    )}
                  </div>
                  {job.jobDescription && (
                    <div
                      className="text-gray-700 mb-3 prose max-w-none line-clamp-3 overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: job.jobDescription }}
                    />
                  )}

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    {job.salary && (
                      <span className="text-green-600 font-semibold">
                        {job.salary}
                      </span>
                    )}
                    {job.createdAt && (
                      <span>
                        Posted: {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                {/* <div className="ml-4 flex flex-col gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap font-medium">
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                    Edit
                  </button>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <svg
            className="w-16 h-16 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Jobs Found
          </h3>
          <p className="text-gray-600">Try adjusting your search filters.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Previous
          </button>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (
                pageNum === currentPage - 2 ||
                pageNum === currentPage + 2
              ) {
                return (
                  <span key={idx} className="px-2 py-2">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ActiveJobs;
