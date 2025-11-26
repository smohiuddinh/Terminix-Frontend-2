import { useState } from 'react';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';

const sampleData = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', department: 'Engineering', status: 'Active', joinDate: '2023-01-15' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', department: 'Marketing', status: 'Active', joinDate: '2023-03-22' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', department: 'Design', status: 'Inactive', joinDate: '2022-11-10' },
  { id: 4, name: 'David Brown', email: 'david@example.com', department: 'Engineering', status: 'Active', joinDate: '2023-05-08' },
  { id: 5, name: 'Emma Davis', email: 'emma@example.com', department: 'HR', status: 'Active', joinDate: '2023-02-14' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', department: 'Sales', status: 'Inactive', joinDate: '2023-04-20' },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', department: 'Engineering', status: 'Active', joinDate: '2023-06-05' },
  { id: 8, name: 'Henry Wilson', email: 'henry@example.com', department: 'Marketing', status: 'Active', joinDate: '2023-07-12' },
];

export default function ModernTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const departments = ['All', ...new Set(sampleData.map(item => item.department))];
  const statuses = ['All', 'Active', 'Inactive'];

  let filteredData = sampleData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'All' || item.department === filterDept;
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    return matchesSearch && matchesDept && matchesStatus;
  });

  filteredData.sort((a, b) => {
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return <div className="w-4 h-4" />;
    return sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Team Members</h1>
          <p className="text-gray-600">Manage and filter your team information</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white/80 backdrop-blur-lg border border-blue-100/50 rounded-xl p-6 mb-6 shadow-lg">
          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-4 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-blue-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-blue-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-blue-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-blue-100/50 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blue-100/50 bg-gradient-to-r from-blue-50 to-purple-50">
                  {[
                    { key: 'name', label: 'Name' },
                    { key: 'email', label: 'Email' },
                    { key: 'department', label: 'Department' },
                    { key: 'status', label: 'Status' },
                    { key: 'joinDate', label: 'Join Date' }
                  ].map(col => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:text-blue-600 transition group"
                    >
                      <div className="flex items-center gap-2">
                        {col.label}
                        <SortIcon column={col.key} />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, idx) => (
                  <tr
                    key={item.id}
                    className="border-b border-blue-50 hover:bg-blue-50/50 transition group"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {item.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.joinDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-blue-50/50 border-t border-blue-100/50 text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredData.length}</span> of <span className="font-semibold text-gray-900">{sampleData.length}</span> results
          </div>
        </div>
      </div>
    </div>
  );
}