import React, { useState } from "react";
import {
  Eye,
  X,
  Search,
  Filter,
  MessageCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useGetAllFeedback } from "../../../api/client/feedback";
import { Feedback } from "@mui/icons-material";

const Feedbacks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    sortBy: "createdAt",
    order: "desc",
  });

  const params = {
    page: currentPage,
    limit: 10,
    ...filters,
  };

  const { data, totalPages, error, isLoading, isError } =
    useGetAllFeedback(params);
  console.log(data);

  const handleSearchChange = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
    setCurrentPage(1);
  };

  const handleStatusChange = (e) => {
    setFilters((prev) => ({ ...prev, status: e.target.value }));
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setFilters((prev) => ({ ...prev, sortBy: e.target.value }));
    setCurrentPage(1);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      reviewed: "bg-blue-100 text-blue-800",
      resolved: "bg-green-100 text-green-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getRatingStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3c9299]"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="bg-white border border-red-200 text-red-800 px-8 py-6 rounded-2xl shadow-lg">
          <p className="font-semibold text-lg">Error loading feedback</p>
          <p className="text-sm mt-2">
            {error?.message || "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <div className=" backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-gradient-to-r from-[#3C9299] via-[#2DD4BF] to-[#3C9299] rounded-2xl shadow-lg shadow-blue-500/30">
                  <Feedback className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
                      Feedback Management
                    </h1>
                    <Sparkles className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-slate-600 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    View and manage customer feedback{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search feedback..."
                  value={filters.search}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3c9299] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filters.status}
                  onChange={handleStatusChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3c9299] focus:border-transparent appearance-none bg-white transition-all"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={handleSortChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3c9299] focus:border-transparent appearance-none bg-white transition-all"
              >
                <option value="createdAt">Date</option>
                <option value="rating">Rating</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Feedback List */}
        <div className="space-y-4">
          {data && data.length > 0 ? (
            data.map((feedback) => (
              <div
                key={feedback.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-[#3c9299]/20 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {feedback.name || "Anonymous"}
                      </h3>
                      {feedback.status && (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            feedback.status
                          )}`}
                        >
                          {feedback.status.charAt(0).toUpperCase() +
                            feedback.status.slice(1)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {feedback.email || "No email provided"}
                    </p>
                    {feedback.rating && (
                      <div className="mt-2 text-yellow-500 text-lg">
                        {getRatingStars(feedback.rating)}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedFeedback(feedback)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#3c9299] text-white rounded-xl hover:bg-[#2d7178] transition-colors font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                </div>

                <p className="text-gray-700 mb-3 line-clamp-2">
                  {feedback.message || feedback.comment}
                </p>

                {/* <div className="text-sm text-gray-500 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div> */}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <svg
                className="mx-auto h-16 w-16 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                No feedback found
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-[#3c9299] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>

            <span className="text-sm font-medium text-gray-700">
              Page{" "}
              <span className="text-[#3c9299] font-bold">{currentPage}</span> of{" "}
              {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-[#3c9299] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-[#3c9299] to-[#2d7178] text-white p-6 rounded-t-3xl flex items-center justify-between">
              <h2 className="text-2xl font-bold">Feedback Details</h2>
              <button
                onClick={() => setSelectedFeedback(null)}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Name
                </label>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {selectedFeedback.name || "Anonymous"}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Email
                </label>
                <p className="mt-1 text-lg text-gray-900">
                  {selectedFeedback.email || "No email provided"}
                </p>
              </div>

              {selectedFeedback.rating && (
                <div>
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Rating
                  </label>
                  <div className="mt-1 text-2xl text-yellow-500">
                    {getRatingStars(selectedFeedback.rating)}
                  </div>
                </div>
              )}

              {selectedFeedback.status && (
                <div>
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Status
                  </label>
                  <div className="mt-1">
                    <span
                      className={`inline-block px-4 py-2 rounded-xl text-sm font-medium ${getStatusColor(
                        selectedFeedback.status
                      )}`}
                    >
                      {selectedFeedback.status.charAt(0).toUpperCase() +
                        selectedFeedback.status.slice(1)}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Message
                </label>
                <p className="mt-2 text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">
                  {selectedFeedback.message || selectedFeedback.comment}
                </p>
              </div>

              {/* <div>
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Date Submitted</label>
                <p className="mt-1 text-gray-900">
                  {new Date(selectedFeedback.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div> */}
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-8 py-4 rounded-b-3xl border-t border-gray-200">
              <button
                onClick={() => setSelectedFeedback(null)}
                className="w-full px-6 py-3 bg-[#3c9299] text-white rounded-xl hover:bg-[#2d7178] transition-colors font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedbacks;
