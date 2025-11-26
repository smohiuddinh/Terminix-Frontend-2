import React, { useState } from 'react';
import { Search, Plus, Trash2, Edit2, Eye, Loader, BriefcaseBusiness, Sparkles, TrendingUp, MessageCircle } from 'lucide-react';
import { useGetAllContacts } from '../../../api/client/contact';

export default function ManageContactForm() {
  const [params, setParams] = useState({ search: '', page: 1 });
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    category: '',
    organization: '',
    subject: '',
    message: ''
  });
  const [showForm, setShowForm] = useState(false);

  const [showDetails, setShowDetails] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const { data: contacts = [], totalPages, isLoading, error } = useGetAllContacts(params);

  const handleSearch = (e) => {
    setParams({ ...params, search: e.target.value, page: 1 });
  };

  const handleOpenForm = (contact = null) => {
    if (contact) {
      setFormData(contact);
      setEditingId(contact.id);
    } else {
      setFormData({
        fullName: '',
        email: '',
        category: '',
        organization: '',
        subject: '',
        message: ''
      });
      setEditingId(null);
    }
    setShowForm(true);
  };



  const handleViewDetails = (contact) => {
    setSelectedContact(contact);
    setShowDetails(true);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error loading contacts: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <div className=" backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-gradient-to-r from-[#3C9299] via-[#2DD4BF] to-[#3C9299] rounded-2xl shadow-lg shadow-blue-500/30">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
                      Manage Contacts
                    </h1>
                    <Sparkles className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-slate-600 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Create, edit, and manage your contact submissions                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Controls */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts by name, email, or organization..."
              value={params.search}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

        {showDetails && selectedContact && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">

              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#3c9299] to-[#2d7178] text-white px-6 py-4 rounded-t-3xl flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-wide">Contact Details</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-white/80 hover:text-white transition"
                  title="Close"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5 overflow-y-auto">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Full Name</p>
                  <p className="text-gray-800 font-semibold">{selectedContact.fullName}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 font-medium">Email</p>
                  <p className="text-gray-800">{selectedContact.email}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 font-medium">Organization</p>
                  <p className="text-gray-800">{selectedContact.organization}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 font-medium">Category</p>
                  <p className="text-gray-800">{selectedContact.category}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 font-medium">Subject</p>
                  <p className="text-gray-800">{selectedContact.subject}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 font-medium">Message</p>
                  <p className="text-gray-800 whitespace-pre-line">{selectedContact.message}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 px-6 py-4 flex justify-end bg-gray-50 rounded-b-3xl">
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-5 py-2.5 rounded-lg bg-[#3c9299] text-white hover:bg-[#347a80] transition font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}




        {/* Contacts Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <Loader className="w-6 h-6 text-blue-600 animate-spin" />
            </div>
          ) : contacts.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p className="text-lg">No contacts found</p>
              <p className="text-sm mt-1">Create your first contact to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Organization</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Subject</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {contacts.map(contact => (
                    <tr key={contact.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{contact.fullName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{contact.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{contact.organization}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                          {contact.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-xs" title={contact.subject}>
                        {contact.subject}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          {/* 👁️ View Details */}
                          <button
                            onClick={() => handleViewDetails(contact)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#3c9299] text-white rounded-xl hover:bg-[#2d7178] transition-colors font-medium"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" /> View
                          </button>




                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setParams({ ...params, page })}
                className={`px-4 py-2 rounded-lg transition ${params.page === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
