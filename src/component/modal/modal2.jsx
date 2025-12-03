import { useEffect } from "react";
import { X } from "lucide-react";
import { memo } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            ></div>

            {/* Modal Box */}
            <div className="relative bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 z-50">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="cursor-pointer absolute right-6 top-4 text-gray-600 hover:text-gray-800 text-xl"
                >
                    <X />
                </button>

                {/* Title */}
                {title && (
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        {title}
                    </h2>
                )}

                {/* Content */}
                <div className="max-h-[70vh] overflow-y-auto">{children}</div>
            </div>
        </div>
    );
};

export default memo(Modal);
