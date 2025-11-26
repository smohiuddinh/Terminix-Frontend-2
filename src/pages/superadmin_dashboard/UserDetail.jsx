import { useState, memo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, MapPin, Globe, CheckCircle, RefreshCw, FileText } from "lucide-react";

// Mock user API
const useGetUserById = (id) => {
  const mockUser = {
    id,
    name: "John Alexander Smith",
    email: "john.alexander.smith@company.com",
    email_verified: true,
    fileUrl: null,
    created_at: "2024-01-15T10:30:00Z",
    last_login: "2024-08-24T09:15:00Z",
    status: "active",
    role: "User",
    phone: "+1 (555) 123-4567",
    location: "New York, NY, USA",
    timezone: "America/New_York",
    profile: {
      about: "Senior Software Engineer with 8+ years of experience in full-stack development.",
      company: "Tech Solutions Inc.",
      department: "Engineering",
      position: "Senior Software Engineer",
      website: "https://johnsmith.dev"
    },
    stats: {
      total_sessions: 147,
      avg_session_duration: "24 minutes"
    },
    orders: [
      { id: 'ORD-1001', product: 'Laptop', status: 'Delivered', date: '2024-08-01' },
      { id: 'ORD-1002', product: 'Smartphone', status: 'Pending', date: '2024-08-15' },
      { id: 'ORD-1003', product: 'Headphones', status: 'Cancelled', date: '2024-08-20' }
    ]
  };

  return { data: mockUser, isLoading: false, isError: false, refetch: () => console.log("Refetching user data...") };
};

function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const { data: user, isLoading, isError, refetch } = useGetUserById(id);

  const handleBack = useCallback(() => navigate(-1), [navigate]);

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const getRelativeTime = (dateString) => {
    const diff = (new Date() - new Date(dateString)) / (1000 * 60 * 60);
    if (diff < 1) return 'Just now';
    if (diff < 24) return `${Math.floor(diff)} hours ago`;
    return `${Math.floor(diff / 24)} days ago`;
  };
  const getStatusColor = (status) => ({
    active: 'bg-green-100 text-green-800 border-green-200',
    inactive: 'bg-gray-100 text-gray-800 border-gray-200',
    suspended: 'bg-red-100 text-red-800 border-red-200'
  }[status] || 'bg-gray-100 text-gray-800 border-gray-200');

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (isError || !user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div>User not found
        <button onClick={handleBack}>Go Back</button>
      </div>
    </div>
  );

  // Single object for all tabs
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: User,
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Mail className="w-5 h-5"/> Contact Info</h3>
            <div className="space-y-2 text-slate-600">
              <p><Mail className="w-4 h-4 inline"/> {user.email} {user.email_verified && <CheckCircle className="inline w-4 h-4 text-green-500"/>}</p>
              <p><Phone className="w-4 h-4 inline"/> {user.phone}</p>
              <p><MapPin className="w-4 h-4 inline"/> {user.location}</p>
              <p><Globe className="w-4 h-4 inline"/> {user.timezone}</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: FileText,
      content: (
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-bold mb-4 flex items-center gap-2"><FileText className="w-5 h-5"/> Profile Info</h3>
          <p className="mb-2 font-medium">about</p>
          <p className="bg-slate-50 p-3 rounded">{user.profile.about}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-slate-800">
            <p><span className="font-medium">Company: </span>{user.profile.company}</p>
            <p><span className="font-medium">Department: </span>{user.profile.department}</p>
            <p><span className="font-medium">Position: </span>{user.profile.position}</p>
            <p><span className="font-medium">Website: </span><a href={user.profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600">{user.profile.website}</a></p>
          </div>
        </div>
      )
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: FileText,
      content: (
        <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">
          <h3 className="font-bold mb-4 flex items-center gap-2"><FileText className="w-5 h-5"/> Orders</h3>
          <table className="min-w-full border-collapse border border-slate-200">
            <thead className="bg-slate-100">
              <tr>
                <th className="border border-slate-200 px-4 py-2 text-left">Order ID</th>
                <th className="border border-slate-200 px-4 py-2 text-left">Product</th>
                <th className="border border-slate-200 px-4 py-2 text-left">Status</th>
                <th className="border border-slate-200 px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {user.orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2">{order.id}</td>
                  <td className="border border-slate-200 px-4 py-2">{order.product}</td>
                  <td className={`border border-slate-200 px-4 py-2 font-medium ${order.status === 'Delivered' ? 'text-green-600' : order.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>{order.status}</td>
                  <td className="border border-slate-200 px-4 py-2">{new Date(order.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <button onClick={handleBack} className="flex items-center gap-2 text-blue-600">
          <ArrowLeft className="w-4 h-4"/> Back
        </button>
        <button onClick={refetch} className="p-2 bg-gray-200 rounded"><RefreshCw className="w-4 h-4"/></button>
      </div>

      {/* User Info */}
      <div className="flex flex-col lg:flex-row gap-8 bg-white p-6 rounded-2xl shadow">
        <div className="flex items-center gap-6">
          <div className={`w-24 h-24 rounded-2xl bg-blue-200 flex items-center justify-center`}>
            {user.fileUrl ? <img src={user.fileUrl} alt={user.name} className="w-24 h-24 rounded-2xl"/> : <User className="w-12 h-12 text-blue-600"/>}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <div className="flex gap-2 mt-2">
              <span className={`px-3 py-1 rounded-xl border ${getStatusColor(user.status)}`}>{user.status}</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-xl border">{user.role}</span>
            </div>
            <div className="mt-2 space-y-1 text-slate-600 text-sm">
              <p>Joined {formatDate(user.created_at)}</p>
              <p>Last active {getRelativeTime(user.last_login)}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          <div className="bg-blue-50 p-4 rounded-xl text-center">
            <p className="font-bold text-blue-800">{user.stats.total_sessions}</p>
            <p className="text-blue-600 text-sm">Total Sessions</p>
          </div>
          <div className="bg-green-50 p-4 rounded-xl text-center">
            <p className="font-bold text-green-800">{user.stats.avg_session_duration}</p>
            <p className="text-green-600 text-sm">Avg Session</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="my-6 bg-white p-2 rounded-xl shadow flex gap-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium ${activeTab === tab.id ? 'bg-blue-500 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
              <Icon className="w-4 h-4"/> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div>{tabs.find(tab => tab.id === activeTab)?.content}</div>
    </div>
  );
}

export default memo(UserDetailPage);
