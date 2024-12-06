import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface LogoUploaderProps {
  onLogoSelect: (file: File) => void;
}

export const LogoUploader: React.FC<LogoUploaderProps> = ({ onLogoSelect }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onLogoSelect(acceptedFiles[0]);
      }
    },
    [onLogoSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.svg'],
    },
    maxFiles: 1,
  });

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Logo Upload
      </label>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
          isDragActive
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-300 hover:border-indigo-500'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-8 w-8 text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">
          {isDragActive
            ? 'Drop the logo here...'
            : 'Drag & drop a logo, or click to select'}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Supports PNG, JPG, JPEG, SVG
        </p>
      </div>
    </div>
  );
};