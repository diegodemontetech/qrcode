import React, { useState } from 'react';
import { QRCodeDisplay } from './QRCodeDisplay';
import { QRCodeForm } from './QRCodeForm';
import { QRCodeHistory } from './QRCodeHistory';
import { QRCodeConfig, QRContentType } from '../types/qr';
import { handleQRDownload } from '../utils/qr';
import { uploadFile } from '../utils/storage';
import { useQRCode } from '../hooks/useQRCode';
import { useQRHistory } from '../hooks/useQRHistory';

const QRCodeGenerator: React.FC = () => {
  const [config, setConfig] = useState<QRCodeConfig>({
    content: '',
    size: 256,
    foregroundColor: '#000000',
    backgroundColor: '#FFFFFF',
    logo: null,
    logoSize: 64,
    title: '',
    description: '',
    dotStyle: 'square',
    cornerDotStyle: 'square',
    cornerSquareStyle: 'square'
  });
  const [contentType, setContentType] = useState<QRContentType>('url');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { isUploading, error, handleSave } = useQRCode();
  const { savedQRCodes, refreshHistory, handleDelete } = useQRHistory();

  const onSave = async () => {
    const success = await handleSave(config, contentType, selectedFile);
    if (success) {
      setSelectedFile(null);
      refreshHistory();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-8">
          <img
            src="https://boneheal.com.br/wp-content/uploads/2023/12/logo-horizontal.png"
            alt="BoneHeal Logo"
            className="h-8 md:h-12"
          />
        </div>
        
        {error && (
          <div className={`mb-6 p-4 rounded-lg ${
            error.includes('sucesso') 
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">
            <QRCodeForm
              config={config}
              contentType={contentType}
              onConfigChange={setConfig}
              onContentTypeChange={setContentType}
              selectedFile={selectedFile}
              onFileSelect={setSelectedFile}
            />
            
            <div className="mt-6">
              <button
                onClick={onSave}
                disabled={isUploading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Salvando...' : 'Salvar QR Code'}
              </button>
            </div>
          </div>
          
          <div className="space-y-8">
            <QRCodeDisplay
              config={config}
              isUploading={isUploading}
              onDownload={() => handleQRDownload(config, contentType, uploadFile)}
            />
            
            <QRCodeHistory
              savedQRCodes={savedQRCodes}
              onSelect={(saved) => {
                setConfig(saved.config);
                setContentType(saved.content_type as QRContentType);
              }}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;