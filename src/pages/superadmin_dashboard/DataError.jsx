import { useState, useMemo } from "react";
import {
  Menu,
  Home,
  Users,
  ShoppingCart,
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
} from "lucide-react";
import { useGetAllOrderByAdmin } from "../../../api/client/order";
// import OverviewChart from "../../component/freelancer_dashboard/overview";
import { useGetAllFreelancers, useGetAllGigs, useGetAllProjects, useGetAllUsers } from "../../../api/client/superadmin";

const SuperAdminDashboard = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const {
    data: orders = [],
    isLoading: ordersLoading,
    isError: ordersError,
  } = useGetAllOrderByAdmin();

  const {
    data: users = [],
    isLoading: usersLoading,
    isError: usersError,
  } = useGetAllUsers();

  const {
    data: freelancers = [],
    isLoading: freelancersLoading,
    isError: freelancersError,
  } = useGetAllFreelancers();

  const {
    data: gigs = [],
    isLoading: gigsLoading,
    isError: gigsError,
  } = useGetAllGigs();

  const {
    data: projects = [],
    isLoading: projectsLoading,
    isError: projectsError,
  } = useGetAllProjects();

  // Mock data - replace with your actual API calls
  const stats = {
    users: { value: 1247, change: 8.2, trend: "up" },
    orders: { value: 523, change: 12.5, trend: "up" },
    gigs: { value: 89, change: -3.1, trend: "down" },
    revenue: { value: 45280, change: 18.3, trend: "up" },
  };



  // Calculate metrics
  const totalEarnings = useMemo(() => {
    return orders.reduce((total, order) => {
      if (order.status === "paid") {
        return total + (parseFloat(order.total_price) || 0);
      }
      return total;
    }, 0);
  }, [orders]);




  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">


      {/* Main Content */}
      <main className=" min-h-screen">
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

              <div className="flex items-center space-x-3">
                <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <Search className="w-5 h-5 text-gray-600" />
                </button>

                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3C9299] to-[#2DD4BF] flex items-center justify-center cursor-pointer">
                  <span className="text-white font-semibold">AD</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Period Selector */}
          <div className="flex items-center space-x-2">
            {["day", "week", "month", "year"].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedPeriod === period
                    ? "bg-gradient-to-r from-[#3C9299] to-[#2DD4BF] text-white shadow-lg shadow-teal-500/20"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Total Users", key: "users", icon: Users, value: users.length || 0, description: "Registered users", gradient: "from-blue-500 to-cyan-500 " },
              {
                title: "Total Orders", value: orders.length || 0, description: `${orders.filter((o) => o.status === "paid").length
                  } completed`, key: "orders", icon: ShoppingCart, gradient: "from-purple-500 to-pink-500"
              },
              { title: "Active Gigs", value: gigs.length || 0, description: `${freelancers.length} freelancers`, key: "gigs", icon: Briefcase, gradient: "from-orange-500 to-red-500" },
              { title: "Revenue", key: "revenue", value: `${Math.round(totalEarnings).toLocaleString()}`, description: "Total earnings", icon: TrendingUp, gradient: "from-[#3C9299] to-[#2DD4BF]" },
            ].map((card, index) => {
              const stat = stats[card.key];
              return (
                <div
                  key={index}
                  className="relative bg-white rounded-2xl p-6 border border-gray-200/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 group overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.gradient} opacity-5 rounded-full -mr-16 -mt-16 group-hover:opacity-10 transition-opacity`}></div>

                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 bg-gradient-to-br ${card.gradient} rounded-xl shadow-lg`}>
                        <card.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${stat.trend === "up" ? "bg-green-100" : "bg-red-100"
                        }`}>
                        {stat.trend === "up" ? (
                          <ArrowUpRight className="w-4 h-4 text-green-600" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-600" />
                        )}
                        <span className={`text-xs font-bold ${stat.trend === "up" ? "text-green-600" : "text-red-600"
                          }`}>
                          {Math.abs(stat.change)}%
                        </span>
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      {card.title}
                    </h3>
                    <p className="text-3xl font-bold text-gray-900">
                      {card.key === "revenue" ? `$${stat.value.toLocaleString()}` : stat.value.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">vs last {selectedPeriod}</p>
                  </div>
                </div>
              );
            })}
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
              <div className="h-64 flex items-end justify-between space-x-2">
                <OverviewChart
                  height={280}
                  data={orders}
                  title=""
                  colorScheme="purple"
                  chartType="area"
                />{" "}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Quick Stats</h3>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="space-y-4">
                <OverviewChart
                  height={280}
                  data={orders}
                  title=""
                  colorScheme="green"
                  chartType="line"
                />{" "}
              </div>
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
                <span className="text-sm font-medium">View All</span>
                <ChevronRight className="w-4 h-4" />
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
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${order.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : order.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">${order.amount}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
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