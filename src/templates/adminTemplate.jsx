import { useState } from "react";
import { Menu } from "lucide-react"; // Import Menu icon
import AdminSidebar from '../component/super_admin/SuperAdminSidebar';

function AdminTemplate({ 
  children, 
  activeMenuItem = "Dashboard",
  quickStats = null 
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header with Hamburger Menu */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30 flex items-center px-4 shadow-sm">
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
      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        showMobile={showMobileSidebar}
        onCloseMobile={() => setShowMobileSidebar(false)}
        activeItem={activeMenuItem}
        quickStats={quickStats}
      />

      {/* Main Content */}
      <main
        className={`transition-all duration-300 pt-16 lg:pt-0 ${
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        {children}
      </main>
    </div>
  );
}

export default AdminTemplate;