import { Bell, Mail, HelpCircle, User, FileText, ImageIcon, Video } from "lucide-react"

export default function ManageDispute() {
  return (
    <div className="min-h-screen bg-white">
  
      {/* Main Content */}
      <div className="p-6">
        <div className="flex  bg-[#F8F8F8] p-4 justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Dispute Information</h1>
          <div className="text-sm text-gray-600">
            Dispute ID: <span className="font-medium">D101</span>
          </div>
        </div>

        {/* Dispute Details Table using CSS Grid */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-7 gap-4 p-4 bg-gray-50 border-b border-b-gray-300   text-sm font-medium text-gray-700">
            <div>Related Job ID</div>
            <div>Job Title</div>
            <div>Client Name</div>
            <div>Freelancer Name</div>
            <div>Status</div>
            <div>Created Date</div>
            <div>Admin Handling Case</div>
          </div>
          <div className="grid grid-cols-7 gap-4 p-4 text-sm">
            <div className="font-medium">2001</div>
            <div className="text-blue-600 hover:text-blue-800 cursor-pointer">E-commerce Website Development</div>
            <div>Sarah Malik</div>
            <div>Ahmed Khan</div>
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Under Review
              </span>
            </div>
            <div>2025-07-04</div>
            <div>Admin_01</div>
          </div>
        </div>

        {/* Three Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Issue Summary */}
          <div className="bg-[#F8F8F8]   rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b  border-gray-200">
              <h3 className="text-lg font-medium flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Issue Summary
              </h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <div>
                  <div className="font-medium text-sm mb-1">Project-related incomplete:</div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    Client reported that several key features promised in the job scope were missing from the final
                    delivery. Attempts to clarify with the freelancer were unsuccessful, leading to a formal dispute.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Evidence/Documents */}
          <div className="bg-[#F8F8F8] rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Evidence/Documents Uploaded
              </h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <FileText className="w-4 h-4 text-red-500" />
                  <span className="text-sm">contract_scope.pdf</span>
                </div>
                <div className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <ImageIcon className="w-4 h-4 text-green-500" />
                  <span className="text-sm">missing_features_screenshot.jpg</span>
                </div>
                <div className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <Video className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">screen_recording_demo.mp4</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full Chat History */}
          <div className="bg-[#F8F8F8] rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                Full Chat History
              </h3>
            </div>
            <div className="p-4">
              <div className="space-y-4 text-sm">
                <div className="border-l-2 border-blue-200 pl-3">
                  <div className="font-medium text-blue-700">Sarah Malik:</div>
                  <div className="text-gray-600 mt-1">
                    "The payment page was never integrated, despite being clearly in the brief."
                  </div>
                </div>
                <div className="border-l-2 border-green-200 pl-3">
                  <div className="font-medium text-green-700">Ahmed Khan:</div>
                  <div className="text-gray-600 mt-1">"I needed more time, but I thought we were wrapping up."</div>
                </div>
                <div className="border-l-2 border-gray-200 pl-3">
                  <div className="font-medium text-gray-700">System:</div>
                  <div className="text-gray-600 mt-1">Admin_01 has joined the conversation.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Grid for Admin Comments and Resolution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Admin Comments */}
          <div className="bg-teal-500 rounded-lg shadow-sm text-white">
            <div className="p-4 border-b border-teal-400">
              <h3 className="text-lg font-medium flex items-center">
                <User className="w-5 h-5 mr-2" />
                Admin Comments
              </h3>
            </div>
            <div className="p-4">
              <p className="text-sm leading-relaxed">
                Client provided valid documentation proving scope mismatch. Freelancer did not communicate delays.
                Pending review from tech lead.
              </p>
            </div>
          </div>

          {/* Resolution Notes */}
          <div className="bg-slate-800 rounded-lg shadow-sm text-white">
            <div className="p-4 border-b border-slate-700">
              <h3 className="text-lg font-medium flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                Resolution Notes (If status is Resolved)
              </h3>
            </div>
            <div className="p-4">
              <p className="text-sm leading-relaxed">
                "Freelancer was found responsible for the issue. A partial refund was issued to the client, and the case
                is now closed."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
