import React, { useState, useCallback } from 'react';

// Main InfoModal Component
const InfoModal = ({ isOpen, onClose, title, content }) => {
    
  // To prevent the modal from closing when clicking inside the content area
  const handleContentClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  // Base styling for transitions (opacity/scale)
  const modalTransitionClasses = isOpen
    ? 'opacity-100 scale-100 ease-out duration-300'
    : 'opacity-0 scale-95 ease-in duration-200 pointer-events-none';

  return (
    // Backdrop - Fixed position, full screen, dark overlay
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity ${
        isOpen ? 'bg-black/50' : 'bg-black/0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className={`relative w-11/12 max-w-lg mx-auto bg-white rounded-xl shadow-2xl transform transition-all ${modalTransitionClasses}`}
        onClick={handleContentClick}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 bg-indigo-600 text-white rounded-t-xl">
          <h3 className="text-2xl font-extrabold flex items-center">
            {/* You can use a hero icon here like a lightbulb */}
            💡 {title || "Information Spotlight"}
          </h3>
        </div>

        {/* Modal Body/Content */}
        <div className="p-6 text-gray-700">
          <p className="text-base leading-relaxed">
            {content || "This is a beautifully designed, clean, and modern info modal built with React and Tailwind CSS. It uses subtle shadows, smooth transitions, and a clear layout to draw attention to the message."}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-600 list-disc list-inside">
            <li className="flex items-start">
                <span className="w-2 h-2 mr-2 mt-1 bg-indigo-400 rounded-full flex-shrink-0"></span>
                Smooth transition effects
            </li>
            <li className="flex items-start">
                <span className="w-2 h-2 mr-2 mt-1 bg-indigo-400 rounded-full flex-shrink-0"></span>
                Clean, centered layout
            </li>
            <li className="flex items-start">
                <span className="w-2 h-2 mr-2 mt-1 bg-indigo-400 rounded-full flex-shrink-0"></span>
                Click outside to close (backdrop functionality)
            </li>
          </ul>
        </div>

        {/* Modal Footer/Action */}
        <div className="p-4 border-t border-gray-100 flex justify-end rounded-b-xl">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition duration-150 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Got It!
          </button>
        </div>

        {/* Close Button (Optional: for top-right corner) */}
        <button
            onClick={onClose}
            className="absolute top-0 right-0 m-4 text-white hover:text-indigo-200 transition"
            aria-label="Close modal"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </div>
  );
};

// Example Usage Component
const ModalButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-8 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg shadow-xl hover:bg-indigo-700 transition duration-300"
      >
        Open Awesome Modal
      </button>

      <InfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Welcome to the Future!"
        content="Our new features are designed to enhance your experience dramatically. Explore the clean design and enjoy the new, smooth interactions we've built just for you."
      />
    </div>
  );
};

export default ModalButton;