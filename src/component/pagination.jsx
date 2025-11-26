import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <div className="flex items-center justify-center py-6">
      <div className="flex items-center gap-6 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg px-6 py-3">
        {/* Prev Button */}
        <button
          disabled={isFirst}
          onClick={() => onPageChange(currentPage - 1)}
          className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 
            ${isFirst
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-[#0E7D84] text-white hover:bg-[#09686F] hover:scale-105"
            }`}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Page Info */}
        <span className="text-sm font-medium text-gray-800">
          Page <span className="font-semibold text-[#0E7D84]">{currentPage}</span>{" "}
          <span className="text-gray-500">/</span>{" "}
          <span className="font-semibold text-gray-700">{totalPages}</span>
        </span>

        {/* Next Button */}
        <button
          disabled={isLast}
          onClick={() => onPageChange(currentPage + 1)}
          className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 
            ${isLast
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-[#0E7D84] text-white hover:bg-[#09686F] hover:scale-105"
            }`}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
