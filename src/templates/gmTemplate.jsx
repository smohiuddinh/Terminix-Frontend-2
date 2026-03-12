import { useState } from "react";
import { Menu } from "lucide-react";
import GmSidebar from "../component/gm/GmSidebar";

function GmTemplate({
  children,
  activeMenuItem = "Dashboard",
  quickStats = null,
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="lg:hidden h-16 bg-white border-b border-gray-200  flex items-center px-4 shadow-sm">
        <button
          onClick={() => setShowMobileSidebar(true)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="ml-3 text-lg font-semibold text-gray-900">Dashboard</h1>
      </header>

      {/* Mobile Overlay */}
      {showMobileSidebar && (
        <div
          onClick={() => setShowMobileSidebar(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <GmSidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        showMobile={showMobileSidebar}
        onCloseMobile={() => setShowMobileSidebar(false)}
        onOpenMobile={() => setShowMobileSidebar(true)}
        activeItem={activeMenuItem}
        quickStats={quickStats}
      />

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        {children}
      </main>
    </div>
  );
}

export default GmTemplate;
