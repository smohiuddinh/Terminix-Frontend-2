import React, { useState } from "react";
import {
  Search,
  Plus,
  Trash2,
  Edit2,
  Loader,
  Filter,
  Download,
  Eye,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Flag,
} from "lucide-react";
import { useGetAllIssue } from "../../../api/client/issue";


const statusColors = {
  Open: "bg-red-100 text-red-800",
  "In Progress": "bg-yellow-100 text-yellow-800",
  Closed: "bg-green-100 text-green-800",
  "On Hold": "bg-gray-100 text-gray-800",
};

const priorityColors = {
  High: "bg-red-100 text-red-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-green-100 text-green-800",
};

const categoryBgColors = {
  Bug: "bg-purple-100 text-purple-800",
  Feature: "bg-blue-100 text-blue-800",
  Enhancement: "bg-indigo-100 text-indigo-800",
};

export default function Reports() {
  const [params, setParams] = useState({
    search: "",
    status: "",
    priority: "",
    page: 1,
  });

  const [viewingId, setViewingId] = useState(null);

  const {
    data: issues = [],
    totalPages,
    isLoading,
    error,
  } = useGetAllIssue(params);
  console.log(issues);

  const viewingIssue = issues.find((i) => i.id === viewingId);

  const handleSearch = (e) => {
    setParams({ ...params, search: e.target.value, page: 1 });
  };

  const handleFilterChange = (filterType, value) => {
    setParams({ ...params, [filterType]: value, page: 1 });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error loading reports: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div className="mb-8">
          <div className=" backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-gradient-to-r from-[#3C9299] via-[#2DD4BF] to-[#3C9299] rounded-2xl shadow-lg shadow-blue-500/30">
                  <Flag className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
                      Reports Management
                    </h1>
                    <Sparkles className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-slate-600 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
              Track and manage all issues and reports
                 </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        </div>
        

        {/* Controls */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title or description..."
                value={params.search}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <select
                value={params.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
            <select
              value={params.priority}
              onChange={(e) => handleFilterChange("priority", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* View Details Modal */}
     {viewingId && viewingIssue && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden transform transition-all duration-300 scale-100 hover:scale-[1.01]">

      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-r from-[#3c9299] to-[#2d7178] text-white px-6 py-4 flex items-center justify-between rounded-t-3xl">
        <div>
          <h2 className="text-2xl font-semibold">
            {viewingIssue.id} — {viewingIssue.fullName}
          </h2>
          <p className="text-sm text-white/80 mt-1">{viewingIssue.email}</p>
        </div>
        <button
          onClick={() => setViewingId(null)}
          className="text-white/80 hover:text-white transition"
          title="Close"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
              categoryBgColors[viewingIssue.category] ||
              "bg-gray-100 text-gray-700"
            }`}
          >
            {viewingIssue.category}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
              statusColors[viewingIssue.status]
            }`}
          >
            {viewingIssue.status}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
              priorityColors[viewingIssue.priority]
            }`}
          >
            {viewingIssue.priority} Priority
          </span>
        </div>

        {/* Description */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
          <p className="text-sm text-gray-500 font-medium mb-2">Description</p>
          <p className="text-gray-800 leading-relaxed">
            {viewingIssue.description}
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
          <div>
            <p className="text-sm text-gray-500">Issue Type</p>
            <p className="text-gray-900 font-medium">
              {viewingIssue.issueType}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">User Role</p>
            <p className="text-gray-900 font-medium">
              {viewingIssue.userRole}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex justify-end rounded-b-3xl">
        <button
          onClick={() => setViewingId(null)}
          className="px-5 py-2.5 rounded-lg bg-[#3c9299] text-white font-medium hover:bg-[#347a80] transition-all"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


        {/* Issues Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <Loader className="w-6 h-6 text-blue-600 animate-spin" />
            </div>
          ) : issues.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p className="text-lg">No issues found</p>
              <p className="text-sm mt-1">
                Create your first issue to get started
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {issues.map((issue) => (
                    <tr key={issue.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {issue.fullName}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            categoryBgColors[issue.category] || "bg-gray-100"
                          }`}
                        >
                          {issue.issueType}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            priorityColors[issue.priority]
                          }`}
                        >
                          {issue.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {issue.userRole}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {issue.email}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setViewingId(issue.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#3c9299] text-white rounded-xl hover:bg-[#2d7178] transition-colors font-medium"
                            title="View"
                          >
                            <Eye className="w-4 h-4" /> View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setParams({ ...params, page })}
                className={`px-4 py-2 rounded-lg transition ${
                  params.page === page
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
