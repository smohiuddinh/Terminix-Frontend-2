import React from "react";
import {
  X,
  BarChart3,
  DollarSign,
  FileText,
  TrendingUp,
  Activity,
} from "lucide-react";

const Sidebar = ({
  showMobileSidebar,
  setShowMobileSidebar,
  dp,
  userDetails,
  thisMonthEarnings,
  orders,
  averageOrderValue,
  activeFreelancersPercentage,
}) => {
  const stats = [
    {
      label: "Monthly Revenue",
      value: `$${thisMonthEarnings.toLocaleString()}`,
      icon: DollarSign,
      bg: "bg-gradient-to-r from-[#043A53] via-[#065f73] to-[#3C939D]",
    },
    {
      label: "Total Orders",
      value: orders.length.toString(),
      icon: FileText,
      bg: "bg-gradient-to-r from-[#043A53] via-[#065f73] to-[#3C939D]",
    },
    {
      label: "Avg Order Value",
      value: `$${averageOrderValue.toFixed(2)}`,
      icon: TrendingUp,
      bg: "bg-gradient-to-r from-[#043A53] via-[#065f73] to-[#3C939D]",
    },
    {
      label: "Active Rate",
      value: activeFreelancersPercentage,
      icon: Activity,
      bg: "bg-gradient-to-r from-[#043A53] via-[#065f73] to-[#3C939D]",
    },
  ];

  return (
    <aside
      className={`${
        showMobileSidebar ? "translate-x-0" : "-translate-x-full"
      } fixed top-0 left-0 w-80 h-screen bg-gradient-to-br from-slate-200 via-white to-indigo-200/70
      backdrop-blur-xl border-r border-slate-200/50 p-6 z-50 transition-transform duration-300 ease-out 
      lg:translate-x-0 lg:static lg:block shadow-2xl lg:shadow-none`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8 lg:justify-center">
        <div className="lg:hidden" />
        <h2 className="text-xl font-bold bg-gradient-to-r from-[#043A53] via-[#065f73] to-[#3C939D] bg-clip-text text-transparent">
          Admin Panel
        </h2>
        <button
          onClick={() => setShowMobileSidebar(false)}
          className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="h-5 w-5 text-slate-500" />
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-r from-[#043A53] via-[#065f73] to-[#3C939D] rounded-2xl p-6 mb-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <img
              src={dp}
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-white/20 shadow-xl"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="text-lg font-bold">
              {userDetails?.name || "Admin User"}
            </h3>
            <p className="text-blue-100 text-sm">
              @{userDetails?.username || "admin"}
            </p>
            <div className="mt-2 px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
              Super Administrator
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-800">Sales Analytics</h3>
          <div className="p-2 bg-gradient-to-r from-[#043A53] via-[#065f73] to-[#3C939D] rounded-lg">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="space-y-6">
          {stats.map((item, index) => (
            <div key={index} className="group">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 ${item.bg} rounded-xl group-hover:scale-110 transition-transform duration-200`}
                  >
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">
                      {item.label}
                    </p>
                    <p className="text-lg font-bold text-slate-800">
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
