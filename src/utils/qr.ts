import { toPng } from 'html-to-image';
import { QRCodeConfig, QRContentType } from '../types/qr';
import { uploadFile } from './storage';

export const handleQRDownload = async (
  config: QRCodeConfig,
  contentType: QRContentType,
  fileName: string
) => {
  try {
    if (!config.content && contentType !== 'pdf') {
      throw new Error('Por favor, insira o conteúdo para o QR code');
    }

    if (contentType === 'youtube' && !config.content.includes('youtube.com')) {
      throw new Error('Por favor, insira uma URL válida do YouTube');
    }

    const element = document.getElementById('qr-code');
    if (!element) {
      throw new Error('Elemento QR code não encontrado');
    }

    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2,
      skipAutoScale: true
    });
    
    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], fileName, { type: 'image/png' });

    // Upload to Supabase
    await uploadFile(file, 'qrcodes');

    // Download with original filename
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Download error:', error);
    throw error;
  }
};