import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText } from 'lucide-react';

interface PDFUploaderProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

export const PDFUploader: React.FC<PDFUploaderProps> = ({
  onFileSelect,
  selectedFile,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
          isDragActive
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-300 hover:border-indigo-500'
        }`}
      >
        <input {...getInputProps()} />
        <FileText className="mx-auto h-8 w-8 text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">
          {selectedFile
            ? `Arquivo selecionado: ${selectedFile.name}`
            : isDragActive
            ? 'Solte o arquivo aqui...'
            : 'Arraste e solte um PDF, ou clique para selecionar'}
        </p>
      </div>
    </div>
  );
};