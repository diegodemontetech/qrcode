import React from 'react';
import { SavedQRCode } from '../types/qr';
import { Clock, Trash2, Download } from 'lucide-react';
import { deleteQRCode } from '../utils/db';
import { downloadFile } from '../utils/storage';

interface QRCodeHistoryProps {
  savedQRCodes: SavedQRCode[];
  onSelect: (qrCode: SavedQRCode) => void;
  onDelete: (id: string) => void;
}

export const QRCodeHistory: React.FC<QRCodeHistoryProps> = ({
  savedQRCodes,
  onSelect,
  onDelete,
}) => {
  const getContentTypeLabel = (type: string): string => {
    switch (type) {
      case 'url':
        return 'URL';
      case 'youtube':
        return 'YouTube';
      case 'pdf':
        return 'PDF';
      default:
        return type;
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteQRCode(id);
      onDelete(id);
    } catch (error) {
      console.error('Error deleting QR code:', error);
    }
  };

  const handleDownload = async (qrCode: SavedQRCode, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (qrCode.pdf_url && qrCode.original_filename) {
        await downloadFile(qrCode.pdf_url, qrCode.original_filename);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="text-gray-500" size={20} />
        <h2 className="text-lg font-semibold text-gray-900">Histórico de QR Codes</h2>
      </div>
      
      <div className="space-y-4">
        {savedQRCodes.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            Nenhum QR code salvo ainda
          </p>
        ) : (
          savedQRCodes.map((qrCode) => (
            <div
              key={qrCode.id}
              className="group relative p-4 rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors cursor-pointer"
              onClick={() => onSelect(qrCode)}
            >
              <div className="pr-20">
                <h3 className="font-medium text-gray-900">{qrCode.title}</h3>
                {qrCode.description && (
                  <p className="text-sm text-gray-500 mt-1">{qrCode.description}</p>
                )}
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                  <span>{new Date(qrCode.created_at).toLocaleDateString('pt-BR')}</span>
                  <span>•</span>
                  <span>{getContentTypeLabel(qrCode.content_type)}</span>
                </div>
              </div>
              
              <div className="absolute right-4 top-4 flex items-center gap-2">
                {qrCode.pdf_url && (
                  <button
                    onClick={(e) => handleDownload(qrCode, e)}
                    className="p-2 rounded-full hover:bg-blue-50 text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Baixar arquivo"
                  >
                    <Download size={16} />
                  </button>
                )}
                <button
                  onClick={(e) => handleDelete(qrCode.id, e)}
                  className="p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Deletar QR Code"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};