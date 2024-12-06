import React from 'react';
import { Link2, Youtube, FileText } from 'lucide-react';
import { QRContentType } from '../types/qr';

interface TypeSelectorProps {
  contentType: QRContentType;
  onTypeChange: (type: QRContentType) => void;
}

export const TypeSelector: React.FC<TypeSelectorProps> = ({ contentType, onTypeChange }) => {
  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={() => onTypeChange('url')}
        className={`flex items-center gap-2 px-4 py-2 rounded-full ${
          contentType === 'url'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        <Link2 size={20} />
        URL
      </button>
      <button
        onClick={() => onTypeChange('youtube')}
        className={`flex items-center gap-2 px-4 py-2 rounded-full ${
          contentType === 'youtube'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        <Youtube size={20} />
        YouTube
      </button>
      <button
        onClick={() => onTypeChange('pdf')}
        className={`flex items-center gap-2 px-4 py-2 rounded-full ${
          contentType === 'pdf'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        <FileText size={20} />
        PDF
      </button>
    </div>
  );
};