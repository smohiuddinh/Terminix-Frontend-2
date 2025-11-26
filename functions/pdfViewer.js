import React from 'react';

const PDFViewer = () => {
    return (
        <div className="w-full h-screen">
            <iframe
                src="/sample.pdf"
                title="PDF Preview"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
            />
        </div>
    );
};

export default PDFViewer;
