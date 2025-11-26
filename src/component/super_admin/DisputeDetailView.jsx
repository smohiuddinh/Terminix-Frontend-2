import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  User,
  FileText,
  DollarSign,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  MessageSquare,
  Image as ImageIcon,
} from "lucide-react";
import { useGetDisputeAdminById } from "../../../api/client/dispute";
import { useClosedDispute } from "../../../api/client/superadmin";
import { formatDate } from "../../../functions/timeFormat";

export default function ViewDisputeDetail() {

  const { id } = useParams();
  const [partialAmount, setPartialAmount] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { data, responseData, isSuccess, isLoading, isError } = useGetDisputeAdminById(id);
  const { closeDispute, isSuccess: isSuccCloseDispute, isError: isErrCloseDispute } = useClosedDispute(id)

  if (isLoading) return <div className="p-6 text-center">Loading...</div>;
  if (isError)
    return (
      <div className="p-6 text-center text-red-600">Error loading dispute.</div>
    );
  if (!isSuccess || !data || data.length === 0)
    return <div className="p-6 text-center">No dispute found.</div>;

  const dispute = data[0]; // Assuming API returns array with single dispute

  const handleAction = (actionType) => {
    switch (actionType) {
      case "refundClient":
        alert(`Full amount $${dispute.total_price} refunded to client.`);
        break;
      case "releaseFreelancer":
        alert(`Full amount $${dispute.total_price} released to freelancer.`);
        break;
      case "partialRefund":
        if (!partialAmount || isNaN(partialAmount) || partialAmount <= 0) {
          alert("Enter a valid partial amount.");
        } else {
          alert(`Partial refund of $${partialAmount} issued to client.`);
        }
        break;
      default:
        break;
    }
  };

  const StatusBadge = ({ status }) => {
    const colors = {
      paid: "bg-emerald-100 text-emerald-700 border-emerald-200",
      pending: "bg-amber-100 text-amber-700 border-amber-200",
      failed: "bg-red-100 text-red-700 border-red-200",
      client: "bg-blue-100 text-blue-700 border-blue-200",
      freelancer: "bg-green-100 text-green-700 border-green-200",
      default: "bg-slate-100 text-slate-700 border-slate-200",
    };
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${colors[status] || colors.default
          }`}
      >
        {status}
      </span>
    );
  };

  const ImageModal = ({ src, alt, onClose }) => {
    if (!src) return null;
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div className="relative max-w-4xl max-h-full">
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full rounded-lg shadow-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white bg-opacity-20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-opacity-30 transition-all duration-200"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            {/* Left Section */}
            <div className="flex items-center gap-3 flex-1">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Dispute Resolution Center
                </h1>
                <p className="text-sm text-slate-500 truncate">
                  Order ID: {dispute.orderId}
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              <div className="p-2 bg-red-50 rounded-lg flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <span className="text-sm font-medium text-red-600 whitespace-nowrap">
                Active Dispute
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-8">
            {/* Client Who Raised the Dispute */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
              <div className="bg-gradient-to-br from-red-500 via-red-600 to-red-700 p-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Dispute Raised By Client
                </h2>
                <p className="text-red-100 text-sm mt-1">
                  Initial complaint filed
                </p>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img
                      src={dispute.clientImg}
                      alt="Client avatar"
                      className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white shadow-sm bg-red-500 flex items-center justify-center">
                      <AlertTriangle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800">
                      {dispute.client}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {dispute.clientEmail}
                    </p>
                    <StatusBadge status="client" />
                  </div>
                </div>

                {/* Dispute Subject and Reason */}
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Dispute Subject
                    </h4>
                    <p className="text-red-700">{dispute.subject}</p>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Client's Complaint
                    </h4>
                    <p className="text-red-700 leading-relaxed">{dispute.reason}</p>
                  </div>

                  {/* Client Evidence */}
                  {dispute.disputeFilesClient && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        Evidence Submitted by Client
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {dispute.disputeFilesClient
                          .split(",")
                          .map((item, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={item.trim()}
                                alt={`Client Evidence ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border-2 border-red-300 cursor-pointer transition-transform duration-200 group-hover:scale-105 shadow-sm"
                                onClick={() => setSelectedImage(item.trim())}
                              />
                              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                Client
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Project Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
              <div className="bg-gradient-to-br from-[#47AAB3] via-[#2F7B86] to-[#1F5059] p-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Project Details
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                      <FileText className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="text-sm text-slate-500">Project Title</p>
                        <p className="font-medium text-slate-800">
                          {dispute.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                      <DollarSign className="w-5 h-5 text-emerald-500" />
                      <div>
                        <p className="text-sm text-slate-500">Project Value</p>
                        <p className="font-semibold text-emerald-600 text-lg">
                          ${dispute.total_price}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <div>
                        <p className="text-sm text-slate-500">Payment Status</p>
                        <StatusBadge status={dispute.paymentStatus || "paid"} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Freelancer Responses */}
            {responseData && responseData.length > 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Freelancer Responses
                  </h2>
                  <p className="text-green-100 text-sm mt-1">
                    Freelancer's replies to the dispute
                  </p>
                </div>
                <div className="p-6 space-y-6">
                  {responseData
                    .filter((resp) => resp.userType === "freelancer")
                    .map((resp, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-green-500 bg-green-50 rounded-xl overflow-hidden"
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={dispute.freelancerImg}
                                alt="Freelancer avatar"
                                className="w-12 h-12 rounded-full border-2 border-green-300 shadow-sm"
                              />
                              <div>
                                <h4 className="font-semibold text-slate-800">
                                  {dispute.freelancer}
                                </h4>
                                <p className="text-slate-600 text-sm">
                                  {dispute.freelancerEmail}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-slate-400" />
                              <span className="text-sm text-slate-500">
                                Response #{index + 1}
                              </span>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-4 mb-4">
                            <h5 className="font-medium text-slate-800 mb-2">
                              Freelancer's Response:
                            </h5>
                            <p className="text-slate-700 leading-relaxed">
                              {resp.message}
                            </p>
                          </div>

                          {/* Freelancer Evidence */}
                          {resp.disputeFilesFreelancer && (
                            <div className="bg-white rounded-lg p-4">
                              <h5 className="font-medium text-slate-800 mb-3 flex items-center gap-2">
                                <ImageIcon className="w-4 h-4" />
                                Supporting Evidence from Freelancer
                              </h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {resp.disputeFilesFreelancer
                                  .split(",")
                                  .map((file, i) => (
                                    <div key={i} className="relative group">
                                      <img
                                        src={file.trim()}
                                        alt={`Freelancer Evidence ${i + 1}`}
                                        className="w-full h-32 object-cover rounded-lg border-2 border-green-300 cursor-pointer hover:scale-105 transition-transform duration-200 shadow-sm"
                                        onClick={() => setSelectedImage(file.trim())}
                                      />
                                      <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                        Freelancer
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                  {/* No Freelancer Response Message */}
                  {!responseData.some((resp) => resp.userType === "freelancer") && (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                        <Clock className="w-8 h-8 text-amber-600" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-800 mb-2">
                        Awaiting Freelancer Response
                      </h3>
                      <p className="text-slate-600">
                        The freelancer has not yet responded to this dispute.
                      </p>
                    </div>
                  )}

                  {/* Show Client Responses in Conversation if Any */}
                  {responseData.some((resp) => resp.userType === "client") && (
                    <div className="mt-8 pt-6 border-t border-slate-200">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-blue-500" />
                        Additional Client Messages
                      </h3>
                      <div className="space-y-4">
                        {responseData
                          .filter((resp) => resp.userType === "client")
                          .map((resp, index) => (
                            <div
                              key={index}
                              className="border-l-4 border-blue-500 bg-blue-50 rounded-xl p-4"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <img
                                  src={dispute.clientImg}
                                  alt="Client avatar"
                                  className="w-10 h-10 rounded-full border-2 border-blue-300"
                                />
                                <div>
                                  <span className="font-medium text-slate-800">
                                    {dispute.client}
                                  </span>
                                  <span className="text-sm text-slate-500 ml-2">
                                    Follow-up #{index + 1}
                                  </span>
                                </div>
                              </div>
                              <p className="text-slate-700 bg-white rounded-lg p-3">
                                {resp.message}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Pending Freelancer Response
                  </h2>
                </div>
                <div className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-4">
                    <MessageSquare className="w-10 h-10 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-800 mb-2">
                    No Responses Yet
                  </h3>
                  <p className="text-slate-600">
                    The freelancer has not yet responded to this dispute. They will be notified to provide their side of the story.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Admin Actions */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden sticky top-8">
              <div className="bg-gradient-to-br from-[#47AAB3] via-[#2F7B86] to-[#1F5059] p-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Admin Actions
                </h2>
                <p className="text-purple-100 text-sm mt-1">
                  Choose resolution method
                </p>
              </div>
              <div className="p-6 space-y-4">
                <button
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 px-6 rounded-xl hover:from-emerald-600 hover:to-green-700 transform transition-all duration-200 hover:scale-105 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                  onClick={() => closeDispute({ status: 'closed', action: 'Full Refund to Client', closed_reason: 'Any reason' })}
                >
                  <DollarSign className="w-5 h-5" />
                  <span className="font-medium">Full Refund to Client</span>
                </button>

                <button
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-blue-600 hover:to-indigo-700 transform transition-all duration-200 hover:scale-105 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                  onClick={() => handleAction("releaseFreelancer")}
                >
                  <DollarSign className="w-5 h-5" />
                  <span className="font-medium">Release to Freelancer</span>
                </button>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">
                    Partial Refund Amount
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="number"
                        placeholder="0.00"
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                        value={partialAmount}
                        onChange={(e) => setPartialAmount(e.target.value)}
                        max={dispute.total_price}
                      />
                    </div>
                  </div>
                  <button
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 px-6 rounded-xl hover:from-amber-600 hover:to-orange-700 transform transition-all duration-200 hover:scale-105 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    onClick={() => handleAction("partialRefund")}
                    disabled={
                      !partialAmount ||
                      isNaN(partialAmount) ||
                      partialAmount <= 0
                    }
                  >
                    <DollarSign className="w-5 h-5" />
                    <span className="font-medium">Issue Partial Refund</span>
                  </button>
                </div>

                <div className="mt-6 p-4 bg-slate-50 rounded-xl">
                  <h4 className="font-medium text-slate-800 mb-3">
                    Dispute Summary
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Raised By:</span>
                      <span className="font-medium text-red-600">
                        {dispute.client}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Value:</span>
                      <span className="font-medium text-slate-800">
                        ${dispute.total_price}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Status:</span>
                      <span className="font-medium text-amber-600">
                        Under Review
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          src={selectedImage}
          alt="Evidence"
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}