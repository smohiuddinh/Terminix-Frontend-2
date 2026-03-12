import React from 'react';
import { BarChart3, FileText, X } from 'lucide-react';
// import LogoutButton from '../login/LogoutButton';

export default function Sidebar({
  activeView,
  activeDeptId,
  departments,
  onChangeView,
  onSelectDepartment,
  isOpen,
  onClose,
}) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-white border-r border-gray-200/60 flex flex-col
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        shadow-xl lg:shadow-none
      `}>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-violet-50/20 pointer-events-none"></div>
        
        {/* Decorative top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500"></div>

        {/* Header */}
        <div className="relative p-6 border-b border-gray-200/60">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/25 ring-4 ring-blue-50">
                <BarChart3 size={22} className="text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">Cashier</h1>
                <p className="text-xs text-gray-500 font-medium">Dashboard</p>
              </div>
            </div>
            
            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="relative flex-1 p-4 overflow-y-auto custom-scrollbar">
          {/* Dashboard Button */}
          <button
            onClick={() => {
              onChangeView('dashboard');
              onClose?.();
            }}
            className={`group w-full flex items-center gap-3 px-4 py-3.5 rounded-xl mb-2 transition-all duration-200 ${
              activeView === 'dashboard' 
                ? 'bg-gradient-to-r from-blue-50 to-violet-50 text-blue-700 shadow-sm shadow-blue-100 ring-1 ring-blue-200/50' 
                : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
            }`}
          >
            <div className={`p-2.5 rounded-xl transition-all duration-200 ${
              activeView === 'dashboard'
                ? 'bg-gradient-to-br from-blue-500 to-violet-600 shadow-md shadow-blue-500/30'
                : 'bg-gray-100 group-hover:bg-gray-200'
            }`}>
              <BarChart3 size={18} strokeWidth={2.5} className={activeView === 'dashboard' ? 'text-white' : 'text-gray-600'} />
            </div>
            <span className="font-semibold text-sm">Dashboard</span>
            {activeView === 'dashboard' && (
              <div className="ml-auto w-2 h-2 rounded-full bg-blue-500"></div>
            )}
          </button>

          {/* Departments Section */}
          <div className="mt-8 mb-3 px-4">
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Departments
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
          </div>

          {/* Department List */}
          <div className="space-y-1">
            {departments.map((dept, index) => (
              <button
                key={dept.id}
                onClick={() => {
                  onSelectDepartment(dept.id);
                  onClose?.();
                }}
                className={`group w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative overflow-hidden ${
                  activeView === 'department' && activeDeptId === dept.id
                    ? 'bg-gradient-to-r from-gray-50 to-gray-100/50 text-gray-900 ring-1 ring-gray-200/60'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    activeView === 'department' && activeDeptId === dept.id
                      ? 'bg-blue-500 shadow-md shadow-blue-400/50 scale-110'
                      : 'bg-gray-300 group-hover:bg-gray-400'
                  }`}></div>
                  <span className="relative z-10">{dept.name}</span>
                </div>
                
                {/* Subtle hover gradient effect */}
                {activeView === 'department' && activeDeptId === dept.id && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-violet-500 rounded-l-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Reports Button */}
          <button
            onClick={() => {
              onChangeView('reports');
              onClose?.();
            }}
            className={`group w-full flex items-center gap-3 px-4 py-3.5 rounded-xl mt-8 transition-all duration-200 ${
              activeView === 'reports'
                ? 'bg-gradient-to-r from-blue-50 to-violet-50 text-blue-700 shadow-sm shadow-blue-100 ring-1 ring-blue-200/50'
                : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
            }`}
          >
            <div className={`p-2.5 rounded-xl transition-all duration-200 ${
              activeView === 'reports'
                ? 'bg-gradient-to-br from-blue-500 to-violet-600 shadow-md shadow-blue-500/30'
                : 'bg-gray-100 group-hover:bg-gray-200'
            }`}>
              <FileText size={18} strokeWidth={2.5} className={activeView === 'reports' ? 'text-white' : 'text-gray-600'} />
            </div>
            <span className="font-semibold text-sm">Reports</span>
            {activeView === 'reports' && (
              <div className="ml-auto w-2 h-2 rounded-full bg-blue-500"></div>
            )}
          </button>
        </nav>

        {/* Footer with Logout */}
        <div className="relative p-4 border-t border-gray-200/60">
          <Logout/>
        </div>

        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.02);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.15);
          }
        `}</style>
      </div>
    </>
  );
}