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
  Building,
  Sparkles
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
    // { icon: Home, label: "Dashboard", path: "/superadmin/dashboard" },
    // { icon: Users, label: "BCCD Members", path: "/superadmin/bccd-members" },
    {
      icon: ShoppingCart,
      label: "Contacts",
      path: "/superadmin/contacts",
    },
    {
      icon: Building,
      label: "International Organization",
      path: "/superadmin/international-organization",
    },
    // { icon: Briefcase, label: "POC Country", path: "/superadmin/poc-country" },
    // {
    //   icon: ClipboardList,
    //   label: "Active Projects",
    //   path: "/superadmin/manage-projects",
    // },
    // { icon: BriefcaseBusiness, label: "Active Jobs", path: "/superadmin/manage-jobs" },
    // { icon: Settings, label: "Disputes", path: "/superadmin/manage-disputes" },
    // {
    //   icon: MessageSquare,
    //   label: "Contact Form",
    //   path: "/superadmin/manage-contactform",
    // },
    // { icon: ThumbsUp, label: "Feedbacks", path: "/superadmin/manage-feedbacks" },
    // { icon: Flag, label: "Reports", path: "/superadmin/manage-reports" },
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
          className="fixed inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/90 to-slate-900/90 backdrop-blur-md z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen 
          bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
          border-r border-purple-500/20 shadow-2xl shadow-purple-500/20
          z-50 transition-all duration-300 ease-in-out
          ${collapsed ? "w-20" : "w-72"}
          ${showMobile ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-purple-500/20 bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-xl flex-shrink-0">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 bg-clip-text text-transparent">
                  Admin Panel
                </h2>
                <p className="text-xs text-slate-400">Control Center</p>
              </div>
            </div>
          )}

          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-2.5 hover:bg-purple-500/10 rounded-xl transition-all duration-200 ml-auto group border border-transparent hover:border-purple-500/30"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-purple-400 transition-colors" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-purple-400 transition-colors" />
            )}
          </button>
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-2.5 hover:bg-red-500/10 rounded-xl transition-all duration-200 group border border-transparent hover:border-red-500/30"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-slate-400 group-hover:text-red-400 transition-colors" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto overflow-x-hidden space-y-2 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent hover:scrollbar-thumb-purple-500/40">
          {menuItems.map((item, index) => {
            const isActive = currentPath === item.path;

            return (
              <button
                key={index}
                onClick={() => handleMenuClick(item)}
                className={`
                  cursor-pointer w-full flex items-center px-4 py-3.5 rounded-xl 
                  transition-all duration-300 group relative overflow-hidden
                  ${isActive
                    ? "bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white shadow-lg shadow-purple-500/50 scale-[1.02]"
                    : "text-slate-300 hover:bg-slate-800/50 hover:text-white hover:scale-[1.01] active:scale-[0.99] border border-transparent hover:border-purple-500/20"
                  }
                  ${collapsed ? "justify-center px-0" : ""}
                `}
                title={collapsed ? item.label : ""}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-pulse rounded-xl" />
                )}
                <div
                  className={`flex items-center relative z-10 ${collapsed ? "" : "space-x-3"
                    }`}
                >
                  <div className={`${isActive ? "bg-white/20 p-2 rounded-lg" : ""}`}>
                    <item.icon
                      className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isActive ? "" : "group-hover:scale-110 group-hover:rotate-3"
                        }`}
                    />
                  </div>
                  {!collapsed && (
                    <span className="font-semibold text-sm truncate">
                      {item.label}
                    </span>
                  )}
                </div>
                {isActive && !collapsed && (
                  <div className="absolute right-4 w-2 h-2 bg-white rounded-full shadow-lg shadow-white/50" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Stats */}
        {!collapsed && quickStats && quickStats.length > 0 && (
          <div className="p-4 border-t border-purple-500/20 bg-slate-800/50 flex-shrink-0">
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl p-4 space-y-3 border border-purple-500/20 shadow-lg">
              <h4 className="text-sm font-semibold text-white flex items-center">
                <div className="w-1 h-5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-3 shadow-lg shadow-purple-500/50" />
                Quick Stats
              </h4>
              <div className="space-y-2">
                {quickStats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-xs bg-slate-800/50 rounded-lg px-3 py-2.5 border border-purple-500/10"
                  >
                    <span className="text-slate-300 font-medium">
                      {stat.label}
                    </span>
                    <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Logout */}
        <div className="p-4 border-t border-purple-500/20 bg-slate-800/50 flex-shrink-0">
          <button
            onClick={logout}
            className={`
              w-full flex items-center px-4 py-3.5 rounded-xl
              text-red-400 hover:bg-red-500/10 hover:text-red-300 
              transition-all duration-300 group border border-transparent hover:border-red-500/30
              active:scale-95 hover:shadow-lg hover:shadow-red-500/20
              ${collapsed ? "justify-center px-0" : "space-x-3"}
            `}
            title={collapsed ? "Logout" : ""}
          >
            <LogOut className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:rotate-12" />
            {!collapsed && (
              <span className="text-sm font-semibold">Logout</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;