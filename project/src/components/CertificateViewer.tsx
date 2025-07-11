import React from 'react';
import { Award, Download, Share2, QrCode, X } from 'lucide-react';

interface CertificateViewerProps {
  isOpen: boolean;
  onClose: () => void;
  certificateData: {
    studentName: string;
    courseName: string;
    completionDate: string;
    certificateId: string;
  };
}

const CertificateViewer: React.FC<CertificateViewerProps> = ({ isOpen, onClose, certificateData }) => {
  if (!isOpen) return null;

  const generateQRCode = () => {
    // In a real implementation, this would generate an actual QR code
    return `https://skillbridge.edu/verify/${certificateData.certificateId}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Certificate</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Certificate Design */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-xl border-2 border-blue-200 mb-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Award className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Certificate of Completion</h3>
              <p className="text-gray-600 mb-6">This certifies that</p>
              
              <h4 className="text-2xl font-bold text-blue-600 mb-4">{certificateData.studentName}</h4>
              
              <p className="text-gray-600 mb-2">has successfully completed</p>
              <h5 className="text-xl font-semibold text-gray-900 mb-6">{certificateData.courseName}</h5>
              
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-gray-500">Completion Date</p>
                  <p className="font-semibold text-gray-700">{certificateData.completionDate}</p>
                </div>
                
                <div className="bg-white p-3 rounded-lg border">
                  <QrCode className="h-12 w-12 text-gray-600" />
                  <p className="text-xs text-gray-500 mt-1">Verify Online</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Certificate ID</p>
                  <p className="font-mono text-sm text-gray-700">{certificateData.certificateId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Info */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h6 className="font-semibold text-gray-900 mb-2">Verification Instructions</h6>
            <p className="text-sm text-gray-600 mb-2">
              This certificate can be verified by scanning the QR code or visiting:
            </p>
            <p className="text-sm font-mono text-blue-600 bg-white p-2 rounded border">
              {generateQRCode()}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2">
              <Share2 className="h-4 w-4" />
              Share Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateViewer;