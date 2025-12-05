import {
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Settings,
  LogOut,
  Building
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { useLogout } from "../../../api/client/user";

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
    const { mutate: logout, isPending } = useLogout();

  const menuItems = [
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
      {/* Mobile Overlay with blur */}
      {showMobile && (
        <div
          className="fixed inset-0 bg-black/60  backdrop-blur-md z-40 lg:hidden animate-in fade-in duration-200"
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
          ${collapsed ? "w-25" : "w-65"}
          ${showMobile ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          flex flex-col
        `}
      >
        {/* Header with modern spacing */}
        <div className="h-[72px] flex items-center justify-between px-6 border-b border-gray-200/60 flex-shrink-0">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3C9299] to-[#2DD4BF] flex items-center justify-center shadow-lg shadow-[#3C9299]/20">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Admin Panel
                </h2>
                <p className="text-[11px] text-gray-500 font-medium">
                  Management Console
                </p>
              </div>
            </div>
          )}

       

          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-2 hover:bg-gray-100 mr-4 rounded-lg transition-all duration-200 ml-auto group absolute right-4"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-[#3C9299] transition-colors" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-600 group-hover:text-[#3C9299] transition-colors" />
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

        {/* Navigation with modern spacing */}
        <nav className="flex-1 p-4 overflow-y-auto overflow-x-hidden space-y-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
          {!collapsed && (
            <div className="px-3 mb-4">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                Navigation
              </p>
            </div>
          )}

          {menuItems.map((item, index) => {
            const isActive = currentPath === item.path;

            return (
              <button
                key={index}
                onClick={() => handleMenuClick(item)}
                className={`
                  cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-xl 
                  transition-all duration-200 group relative
                  ${isActive
                    ? "bg-gradient-to-r from-[#3C9299] to-[#2DD4BF] text-white shadow-lg shadow-[#3C9299]/25"
                    : "text-gray-700 hover:bg-gray-100/80"
                  }
                  ${collapsed ? "justify-center px-0" : ""}
                `}
                title={collapsed ? item.label : ""}
              >
                {/* Active indicator */}
                {isActive && !collapsed && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                )}

                {/* Icon container */}
                <div className={`
                  flex items-center justify-center w-9 h-9 rounded-lg
                  transition-all duration-200 flex-shrink-0
                  ${isActive 
                    ? "bg-white/20" 
                    : "group-hover:bg-gray-200/50"
                  }
                `}>
                  <item.icon
                    className={`w-[18px] h-[18px] transition-transform duration-200 ${
                      isActive ? "" : "group-hover:scale-110"
                    }`}
                  />
                </div>

                {/* Label */}
                {!collapsed && (
                  <span className="font-medium text-[13.5px] truncate flex-1 text-left">
                    {item.label}
                  </span>
                )}

                {/* Chevron indicator for collapsed state */}
                {!collapsed && !isActive && (
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-40 transition-opacity" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Stats with modern card design */}
        {!collapsed && quickStats && quickStats.length > 0 && (
          <div className="p-4 border-t border-gray-200/60 flex-shrink-0">
            <div className="bg-gradient-to-br from-[#F0FDFA] to-[#ECFDF5] rounded-2xl p-4 space-y-3 border border-[#3C9299]/10">
              <h4 className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                <div className="w-1 h-4 bg-gradient-to-b from-[#3C9299] to-[#2DD4BF] rounded-full" />
                Quick Overview
              </h4>
              <div className="space-y-2">
                {quickStats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-xs bg-white/60 backdrop-blur-sm rounded-xl px-3 py-2.5 border border-gray-100"
                  >
                    <span className="text-gray-600 font-medium">
                      {stat.label}
                    </span>
                    <span className="font-bold text-[#3C9299] text-sm">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Logout with modern styling */}
        <div className="p-4 border-t border-gray-200/60 flex-shrink-0">
          <button
            onClick={() => logout()}
            className={`
              w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl
              text-red-600 hover:bg-red-50 
              transition-all duration-200 group
              border border-transparent hover:border-red-100
              ${collapsed ? "justify-center px-0" : ""}
            `}
            title={collapsed ? "Logout" : ""}
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg group-hover:bg-red-100 transition-all duration-200">
              <LogOut className="w-[18px] h-[18px] flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
            </div>
            {!collapsed && (
              <span className="text-[13.5px] font-medium flex-1 text-left">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;