import { useState, useMemo } from "react";
import {
  Menu,
  Home,
  Users,
  ShoppingCart,
  Trophy,
  Briefcase,
  FileText,
  Settings,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Search,
  Bell,
  ChevronRight,
  DollarSign,
} from "lucide-react";
// import { useGetAllFreelancers, useGetAllGigs, useGetAllProjects, useGetAllUsers, useGetStatisticsData } from "../../../api/client/superadmin";
// import OverviewChart from '../../component/freelancer_dashboard/overview';
import { useGetAllOrderByAdmin } from "../../../api/client/order";
import DataLoader from "./DataLoader";

// // Mock hooks for demonstration
// const useGetAllOrderByAdmin = () => ({
//   data: [
//     { id: "ORD-001", buyer: { username: "John Doe" }, status: "paid", total_price: "299.99", createdAt: "2024-10-10" },
//     { id: "ORD-002", buyer: { username: "Jane Smith" }, status: "pending", total_price: "149.50", createdAt: "2024-10-11" },
//     { id: "ORD-003", buyer: { username: "Bob Wilson" }, status: "paid", total_price: "499.00", createdAt: "2024-10-12" },
//   ],
//   isLoading: false,
//   isError: false,
// });



const SuperAdminDashboard = () => {
  
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const { data=[], isSuccess, isPending, isError, isLoading } = useGetStatisticsData()
  console.log("data: ", data)

  const {
    data: orders = [],
   
  } = useGetAllOrderByAdmin();

  const {
    data: users = [],
   
  } = useGetAllUsers();

  const {
    data: freelancers = [],
   
  } = useGetAllFreelancers();

  const {
    data: gigs = [],
    
  } = useGetAllGigs();


  const statsCards = [
    {
      title: "Total Users",
      value: data[0]?.total_users || 0,
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Total Projects",
      value: data[0]?.total_projects || 0,
      change: 12.5,
      trend: "up",
      icon: ShoppingCart,
      gradient: "from-purple-500 to-pink-500",
      // description: `${orders.filter((o) => o.status === "paid").length} completed`
    },
     {
      title: "Total Jobs",
      value: data[0]?.total_jobs || 0,
      change: 18.3,
      trend: "up",
      icon: DollarSign,
      gradient: "from-[#3C9299] to-[#2DD4BF]",
      description: "Total earnings",
      isRevenue: true
    },
    {
      title: "Total Gigs",
      value: data[0]?.total_gigs || 0,
      change: 5.7,
      trend: "up",
      icon: Briefcase,
      gradient: "from-orange-500 to-red-500",
      description: `${freelancers?.length} freelancers`
    },
    {
      title: "Awarded Jobs",
      value: data[0]?.awarded_jobs || 0,
      change: 5.7,
      trend: "up",
      icon: Trophy,
      gradient: "from-yellow-500 to-red-500",
      description: `${freelancers?.length} freelancers`
    },
  ];

  if(isLoading) return <DataLoader />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Main Content */}
      <main className="min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowMobileSidebar(true)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Menu className="w-6 h-6 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-[#3C9299] to-[#2DD4BF] bg-clip-text text-transparent">
                    Welcome back, Admin
                  </h1>
                  <p className="text-sm text-gray-500">Here's what's happening today</p>
                </div>
              </div>

              {/* <div className="flex items-center space-x-3">
                <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <Search className="w-5 h-5 text-gray-600" />
                </button>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3C9299] to-[#2DD4BF] flex items-center justify-center cursor-pointer">
                  <span className="text-white font-semibold">AD</span>
                </div>
              </div> */}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Period Selector */}
          {/* <div className="flex items-center space-x-2">
            {["day", "week", "month", "year"].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedPeriod === period
                    ? "bg-gradient-to-r from-[#3C9299] to-[#2DD4BF] text-white shadow-lg shadow-teal-500/20"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div> */}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {statsCards?.map((card, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl p-6 border border-gray-200/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 group overflow-hidden"
              >
                {/* <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.gradient} opacity-5 rounded-full -mr-16 -mt-16 group-hover:opacity-10 transition-opacity`}></div> */}
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-br ${card.gradient} rounded-xl shadow-lg`}>
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                    {/* <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
                      card.trend === "up" ? "bg-green-100" : "bg-red-100"
                    }`}>
                      {card.trend === "up" ? (
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`text-xs font-bold ${
                        card.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}>
                        {card.change}%
                      </span>
                    </div> */}
                  </div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    {card.title}
                  </h3>
                  <p className="text-3xl font-bold text-gray-900">
                    {card.value.toLocaleString()}
                  </p>
                  {/* <p className="text-xs text-gray-400 mt-2">{card.description}</p> */}
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Revenue Overview</h3>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              {/* <div className="h-75">
                <OverviewChart
                  height={280}
                  data={orders}
                  title=""
                  colorScheme="purple"
                  chartType="area"
                />
              </div> */}
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Quick Stats</h3>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              {/* <div className="h-64">
                <OverviewChart
                  height={280}
                  data={orders}
                  title=""
                  colorScheme="green"
                  chartType="line"
                />
              </div> */}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl border border-gray-200/50 overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
            <div className="p-6 border-b border-gray-200/50 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
                <p className="text-sm text-gray-500 mt-1">Latest transactions from your platform</p>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#3C9299] to-[#2DD4BF] text-white rounded-xl hover:shadow-lg transition-all">
                <span className="text-sm font-medium">All Orders</span>
                {/* <ChevronRight className="w-4 h-4" /> */}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.buyer?.username || order.customer || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${
                          order.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        ${parseFloat(order.total_price || order.amount || 0).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(order.created_at || order.date).toLocaleDateString()}
                      </td>
                      {console.log(order)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;