import { useState, useCallback } from 'react';
import { QRCodeConfig, QRContentType } from '../types/qr';
import { uploadFile } from '../utils/storage';
import { saveQRCode } from '../utils/db';

export const useQRCode = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = useCallback(async (
    config: QRCodeConfig,
    contentType: QRContentType,
    selectedFile: File | null
  ) => {
    try {
      setIsUploading(true);
      setError(null);

      if (!config.title) {
        throw new Error('Por favor, adicione um título para o QR code');
      }

      if (!config.content && contentType !== 'pdf') {
        throw new Error('Por favor, adicione um conteúdo para o QR code');
      }

      if (contentType === 'pdf' && !selectedFile) {
        throw new Error('Por favor, selecione um arquivo PDF');
      }

      let pdfUrl = '';
      if (contentType === 'pdf' && selectedFile) {
        pdfUrl = await uploadFile(selectedFile);
      }

      await saveQRCode({
        title: config.title,
        description: config.description || '',
        config: {
          ...config,
          content: contentType === 'pdf' ? pdfUrl : config.content,
        },
        content_type: contentType,
        pdf_url: pdfUrl,
        original_filename: selectedFile?.name || '',
      });

      setError('QR code salvo com sucesso!');
      return true;
    } catch (err) {
      console.error('Save QR code error:', err);
      setError(err instanceof Error ? err.message : 'Erro ao salvar QR code');
      return false;
    } finally {
      setIsUploading(false);
    }
  }, []);

  return {
    isUploading,
    error,
    handleSave,
    setError,
  };
};