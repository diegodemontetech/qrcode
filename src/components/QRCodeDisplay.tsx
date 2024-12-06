import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download } from 'lucide-react';
import { QRCodeConfig } from '../types/qr';

interface QRCodeDisplayProps {
  config: QRCodeConfig;
  isUploading: boolean;
  onDownload: () => Promise<void>;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  config,
  isUploading,
  onDownload,
}) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (config.logo instanceof File) {
      const url = URL.createObjectURL(config.logo);
      setLogoUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setLogoUrl(null);
    }
  }, [config.logo]);

  const containerClass = config.template?.style.containerClass || "bg-gray-50 rounded-xl p-8";
  const qrClass = config.template?.style.qrClass || "bg-white p-4 rounded-xl shadow-md";

  return (
    <div className={`flex flex-col items-center justify-center ${containerClass}`}>
      <div id="qr-code" className={qrClass}>
        <QRCodeCanvas
          value={config.content || ' '}
          size={config.size}
          fgColor={config.foregroundColor}
          bgColor={config.backgroundColor}
          level="H"
          imageSettings={
            logoUrl
              ? {
                  src: logoUrl,
                  height: config.logoSize,
                  width: config.logoSize,
                  excavate: true,
                }
              : undefined
          }
        />
      </div>

      <button
        onClick={onDownload}
        disabled={isUploading}
        className="mt-6 flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Download size={20} />
        {isUploading ? 'Fazendo upload...' : 'Baixar QR Code'}
      </button>
    </div>
  );
};