import { useState } from "react";
import { Menu, X, Bell, ChevronDown } from "lucide-react";
import AdminSidebar from "../component/super_admin/SuperAdminSidebar";
// import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";

function AdminTemplate({
  children,
  activeMenuItem = "Dashboard",
  quickStats = null,
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const user = useSelector((state) => state.user.userDetails);
  console.log("ss", user);
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ── Mobile overlay ── */}
      {showMobileSidebar && (
        <div
          onClick={() => setShowMobileSidebar(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* ── Sidebar ── */}
      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        showMobile={showMobileSidebar}
        onCloseMobile={() => setShowMobileSidebar(false)}
        onOpenMobile={() => setShowMobileSidebar(true)}
        activeItem={activeMenuItem}
        quickStats={quickStats}
      />

      {/* ── Main area ── */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        {/* ── Top navbar ── */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          {/* Left: hamburger (mobile) + collapse toggle (desktop) */}
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setShowMobileSidebar(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Desktop collapse toggle */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Mobile logo (shown when sidebar is hidden) */}
            <div className="flex items-center gap-2 lg:hidden">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#29623A] to-[#4BA54F] flex items-center justify-center">
                {/* <img src={logo} alt="Terminix" className="w-5 h-5 object-contain" /> */}
              </div>
              <span className="text-base font-bold text-[#29623A]">
                Terminix
              </span>
            </div>
          </div>

          {/* Right: bell + user */}
          <div className="flex items-center gap-2">
            {/* User pill */}
            <button className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#29623A] to-[#4BA54F] flex items-center justify-center">
                <span className="text-white text-xs font-semibold">
                  {user?.name
                    ?.split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </span>{" "}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-gray-800 leading-tight">
                  {user.name}
                </p>
                <p className="text-[10px] text-gray-500 leading-tight">
                  {user.role}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
            </button>
          </div>
        </header>

        {/* ── Page content ── */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export default AdminTemplate;
