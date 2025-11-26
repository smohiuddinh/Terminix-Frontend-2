import {
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  ShoppingCart,
  Briefcase,
  Settings,
  LogOut,
  Users,
  FileText,
  ClipboardList,
  MessageSquare,
  ThumbsUp,
  Flag,
  BriefcaseBusiness,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import useLogout from "../../../hooks/useLogout";

const AdminSidebar = ({
  collapsed,
  onToggleCollapse,
  showMobile,
  onCloseMobile,
  activeItem,
  onMenuItemClick,
  quickStats = null,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/superadmin/dashboard" },
    { icon: Users, label: "Users", path: "/superadmin/manage-users" },
    {
      icon: ShoppingCart,
      label: "Active Freelancers",
      path: "/superadmin/active-freelancers",
    },
    { icon: Briefcase, label: "Active Gigs", path: "/superadmin/manage-gigs" },
    {
      icon: ClipboardList,
      label: "Active Projects",
      path: "/superadmin/manage-projects",
    },
    { icon: BriefcaseBusiness, label: "Active Jobs", path: "/superadmin/manage-jobs" },
    { icon: Settings, label: "Disputes", path: "/superadmin/manage-disputes" },
    {
      icon: MessageSquare,
      label: "Contact Form",
      path: "/superadmin/manage-contactform",
    },
    { icon: ThumbsUp, label: "Feedbacks", path: "/superadmin/manage-feedbacks" },
    { icon: Flag, label: "Reports", path: "/superadmin/manage-reports" },
  ];

  const getActiveItem = () => {
    if (activeItem) return activeItem;
    const currentPath = location.pathname;
    const activeMenuItem = menuItems.find((item) => item.path === currentPath);
    return activeMenuItem ? activeMenuItem.label : "Dashboard";
  };

  const currentActiveItem = getActiveItem();
  const currentPath = location.pathname;


  const handleMenuClick = (item) => {
    navigate(item.path);
    if (onMenuItemClick) {
      onMenuItemClick(item);
    }
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {showMobile && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen 
          bg-gradient-to-b from-white via-white to-gray-50/80 
          backdrop-blur-xl border-r border-gray-200/80 shadow-2xl shadow-gray-200/50
          z-50 transition-all duration-300 ease-in-out
          ${collapsed ? "w-20" : "w-65"}
          ${showMobile ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-gray-200/80 bg-white/60 backdrop-blur-md flex-shrink-0">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              
              <h2 className="text-lg font-bold bg-gradient-to-r from-[#3C9299] via-[#2DD4BF] to-[#3C9299] bg-clip-text text-transparent">
                Admin Panel
              </h2>
            </div>
          )}
         
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 ml-auto group"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-[#3C9299] transition-colors" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-[#3C9299] transition-colors" />
            )}
          </button>
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors" />
          </button>
        </div>

        {/* Profile Section */}
        <div
          className={`px-5 py-4 border-b border-gray-200/80 bg-gradient-to-r from-[#E0F7FA]/30 to-[#E0F2F1]/30 flex-shrink-0 ${
            collapsed ? "px-3" : ""
          }`}
        >
          <div
            className={`flex items-center ${
              collapsed ? "justify-center" : "space-x-3"
            }`}
          >
            <div className="relative group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#3C9299] to-[#2DD4BF] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-teal-500/30 transition-transform duration-200 group-hover:scale-105">
                A
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  Admin User
                </h3>
                <p className="text-xs text-gray-500 truncate">@admin</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto overflow-x-hidden space-y-1.5 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
         {menuItems.map((item, index) => {
  const isActive = currentPath === item.path; // ✅ Directly check URL path

  return (
    <button
      key={index}
      onClick={() => handleMenuClick(item)}
      className={`
        w-full flex items-center justify-between px-4 py-3 rounded-xl 
        transition-all duration-200 group relative overflow-hidden
        ${
          isActive
            ? "bg-gradient-to-r from-[#3C9299] to-[#2DD4BF] text-white shadow-lg shadow-teal-500/30 scale-[1.02]"
            : "text-gray-700 hover:bg-gray-100 hover:scale-[1.01] active:scale-[0.99]"
        }
        ${collapsed ? "justify-center px-0" : ""}
      `}
      title={collapsed ? item.label : ""}
    >
      {isActive && !collapsed && (
        <div className="absolute inset-0 bg-white/20 animate-pulse rounded-xl" />
      )}
      <div
        className={`flex items-center relative z-10 ${
          collapsed ? "" : "space-x-3"
        }`}
      >
        <item.icon
          className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
            isActive ? "" : "group-hover:scale-110"
          }`}
        />
        {!collapsed && (
          <span className="font-medium text-sm truncate">
            {item.label}
          </span>
        )}
      </div>
    </button>
  );
})}

        </nav>

        {/* Quick Stats */}
        {!collapsed && quickStats && quickStats.length > 0 && (
          <div className="p-4 border-t border-gray-200/80 bg-white/40 flex-shrink-0">
            <div className="bg-gradient-to-br from-[#E0F7FA] to-[#E0F2F1] rounded-xl p-4 space-y-3 shadow-sm">
              <h4 className="text-sm font-semibold text-gray-800 flex items-center">
                <div className="w-1 h-4 bg-gradient-to-b from-[#3C9299] to-[#2DD4BF] rounded-full mr-2" />
                Quick Stats
              </h4>
              <div className="space-y-2">
                {quickStats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-xs bg-white/50 rounded-lg px-3 py-2"
                  >
                    <span className="text-gray-600 font-medium">
                      {stat.label}
                    </span>
                    <span className="font-bold text-gray-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Logout */}
        <div className="p-4 border-t border-gray-200/80 bg-white/60 flex-shrink-0">
          <button
            onClick={logout}
            className={`
              w-full flex items-center px-4 py-3 rounded-xl
              text-red-600 hover:bg-red-50 hover:text-red-700 
              transition-all duration-200 group
              active:scale-95 hover:shadow-md hover:shadow-red-500/10
              ${collapsed ? "justify-center px-0" : "space-x-3"}
            `}
            title={collapsed ? "Logout" : ""}
          >
            <LogOut className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" />
            {!collapsed && (
              <span className="text-sm font-medium">Logout</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;