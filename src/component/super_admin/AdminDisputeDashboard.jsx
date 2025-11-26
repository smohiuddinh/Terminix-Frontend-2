import React, { useState } from "react";
import {
  Search,
  Filter,
  Clock,
  DollarSign,
  ChevronDown,
  Eye,
  Calendar,
  User,
  Shield,
  TicketPlus,
  TrendingUp,
  Box,
  Sparkles,
  Settings,
} from "lucide-react";
import { useGetAllDisputeByAdmin } from "../../../api/client/dispute";
import { useNavigate } from "react-router-dom";

const AdminDisputeDashboard = () => {
  // Mock data for demo
  
    const { data = [], error, isLoading, isError } = useGetAllDisputeByAdmin();
    const navigate = useNavigate();

 const handleviewdetail = (id) => {
    navigate(`/superadmin/admindisputedetail/${id}`);
  };



  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [amountFilter, setAmountFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);



  const getStatusBadge = (status) => {
    const statusConfig = {
      Ressolved: {
        bg: "bg-emerald-500/10",
        text: "text-emerald-700",
        dot: "bg-emerald-500",
        label: "Resolved",
      },
      pending: {
        bg: "bg-rose-500/10",
        text: "text-rose-700",
        dot: "bg-rose-500",
        label: "Pending",
      },
      under_review: {
        bg: "bg-amber-500/10",
        text: "text-amber-700",
        dot: "bg-amber-500",
        label: "Under Review",
      },
    };
    const config = statusConfig[status] || {
      bg: "bg-slate-500/10",
      text: "text-slate-700",
      dot: "bg-slate-500",
      label: status || "Unknown",
    };
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`}></span>
        {config.label}
      </span>
    );
  };

  const filtereddata = data.filter((dispute) => {
    const matchesSearch =
      !searchTerm ||
      dispute.id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.orderId?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.freelancer?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || dispute.status === statusFilter;

    const matchesAmount =
      amountFilter === "all" ||
      (amountFilter === "high" && dispute.total_price >= 2000) ||
      (amountFilter === "medium" &&
        dispute.total_price >= 1000 &&
        dispute.total_price < 2000) ||
      (amountFilter === "low" && dispute.total_price < 1000);

    return matchesSearch && matchesStatus && matchesAmount;
  });

  const stats = {
    total: data.length,
    Ressolved: data.filter((d) => d.status === "Ressolved").length,
    pendingInfo: data.filter((d) => d.status === "pending").length,
    underReview: data.filter((d) => d.status === "under_review").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
            <div className="px-4 sm:px-6 lg:px-8 py-8">

      {/* Header */}
   <div className="mb-8">
              <div className=" backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-gradient-to-r from-[#3C9299] via-[#2DD4BF] to-[#3C9299] rounded-2xl shadow-lg shadow-blue-500/30">
                  <Settings className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
                      Dispute Management
                    </h1>
                    <Sparkles className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-slate-600 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Monitor And Ressolved Conflicts
                  </p>
                </div>
              </div>

            
            </div>

      
          </div>
        </div>
            

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard 
            label="Total Disputes" 
            value={stats.total} 
            icon={<Shield className="w-5 h-5" />} 
            gradient="from-slate-500 to-slate-600"
            bgGradient="from-slate-500/10 to-slate-600/10"
          />
          <StatCard 
            label="Pending" 
            value={stats.pendingInfo} 
            icon={<Clock className="w-5 h-5" />} 
            gradient="from-rose-500 to-rose-600"
            bgGradient="from-rose-500/10 to-rose-600/10"
          />
          <StatCard 
            label="Under Review" 
            value={stats.underReview} 
            icon={<Eye className="w-5 h-5" />} 
            gradient="from-amber-500 to-amber-600"
            bgGradient="from-amber-500/10 to-amber-600/10"
          />
          <StatCard 
            label="Resolved" 
            value={stats.Ressolved} 
            icon={<TicketPlus className="w-5 h-5" />} 
            gradient="from-emerald-500 to-emerald-600"
            bgGradient="from-emerald-500/10 to-emerald-600/10"
          />
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/60 mb-6 shadow-lg shadow-slate-200/50">
          <div className="p-5 border-b border-slate-200/60 flex items-center justify-between gap-4">
            <div className="flex-1 max-w-md relative group">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search disputes by ID, order, or party..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 hover:border-slate-300 transition-all font-medium text-slate-700"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFilters ? "rotate-180" : ""}`} />
            </button>
          </div>

          {showFilters && (
            <div className="p-5 border-b border-slate-200/60 bg-gradient-to-br from-slate-50 to-blue-50/30 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in">
              <SelectFilter
                label="Status"
                value={statusFilter}
                onChange={setStatusFilter}
                options={[
                  { value: "all", label: "All Statuses" },
                  { value: "pending", label: "Pending" },
                  { value: "under_review", label: "Under Review" },
                  { value: "Ressolved", label: "Resolved" },
                ]}
              />
              <SelectFilter
                label="Amount Range"
                value={amountFilter}
                onChange={setAmountFilter}
                options={[
                  { value: "all", label: "All Amounts" },
                  { value: "high", label: "$2000+" },
                  { value: "medium", label: "$1000-$1999" },
                  { value: "low", label: "Under $1000" },
                ]}
              />
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/60 overflow-hidden shadow-lg shadow-slate-200/50">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-50 to-blue-50/30 border-b border-slate-200/60">
                <tr>
                  <Th>Dispute Details</Th>
                  <Th>Parties Involved</Th>
                  <Th>Status</Th>
                  <Th>Amount</Th>
                  <Th>Timeline</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60">
                {filtereddata.map((dispute, idx) => (
                  <tr 
                    key={dispute.id} 
                    className="hover:bg-slate-50/50 transition-colors group"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-900">#{dispute.id}</p>
                        <p className="text-xs text-slate-500 font-medium">Order #{dispute.orderId}</p>
                        <p className="text-xs text-slate-400 line-clamp-1">{dispute.subject}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <Party label="Client" name={dispute.client} color="blue" />
                      <Party label="Freelancer" name={dispute.freelancer} color="purple" />
                    </td>
                    <td className="px-6 py-5">{getStatusBadge(dispute.status)}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900">
                        <DollarSign className="w-4 h-4 text-slate-400" />
                        <span className="text-lg">{dispute.total_price.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {new Date(dispute.created_at).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => handleviewdetail(dispute.id)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm hover:shadow-md group-hover:scale-105"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtereddata.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                <Shield className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">No disputes found</h3>
              <p className="text-slate-500">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, gradient, bgGradient }) => (
  <div className={`relative overflow-hidden bg-gradient-to-br ${bgGradient} backdrop-blur-xl p-6 rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300 group`}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-600 mb-2">{label}</p>
        <p className={`text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
          {value}
        </p>
      </div>
      <div className={`p-3 bg-gradient-to-br ${gradient} rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
    </div>
    <div className={`absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br ${gradient} opacity-5 rounded-full blur-2xl`}></div>
  </div>
);

const SelectFilter = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none font-medium text-slate-700 cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const Party = ({ label, name, color }) => {
  const colorClasses = {
    blue: "bg-blue-500/10 text-blue-700 border-blue-200",
    purple: "bg-purple-500/10 text-purple-700 border-purple-200",
  };
  
  return (
    <div className="flex items-center gap-2 mb-2 last:mb-0">
      <div className={`p-1.5 rounded-lg ${colorClasses[color]}`}>
        <User className="w-3.5 h-3.5" />
      </div>
      <span className="text-sm font-medium text-slate-900">{name || "N/A"}</span>
      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${colorClasses[color]} border`}>
        {label}
      </span>
    </div>
  );
};

const Th = ({ children, className }) => (
  <th className={`px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider ${className || ""}`}>
    {children}
  </th>
);

export default AdminDisputeDashboard