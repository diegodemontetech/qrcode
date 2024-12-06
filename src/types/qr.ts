import { QRCodeSegment } from 'qrcode';

export interface SavedQRCode {
  id: string;
  title: string;
  description: string;
  config: QRCodeConfig;
  content_type: QRContentType;
  created_at: string;
  pdf_url?: string;
  original_filename?: string;
}

export interface QRCodeConfig {
  content: string;
  size: number;
  foregroundColor: string;
  backgroundColor: string;
  logo?: File | null;
  logoSize?: number;
  template?: QRTemplate;
  title?: string;
  description?: string;
  dotStyle?: QRDotStyle;
  cornerDotStyle?: QRCornerDotStyle;
  cornerSquareStyle?: QRCornerSquareStyle;
}

export type QRContentType = 'url' | 'youtube' | 'pdf';

export type QRDotStyle = 'dots' | 'rounded' | 'classy' | 'square' | 'spotify';
export type QRCornerDotStyle = 'dot' | 'square';
export type QRCornerSquareStyle = 'dot' | 'square' | 'extra-rounded';

export interface QRTemplate {
  id: string;
  name: string;
  description: string;
  config: Partial<QRCodeConfig>;
  style: {
    containerClass: string;
    qrClass: string;
  };
}

export const QR_TEMPLATES: QRTemplate[] = [
  {
    id: 'medical',
    name: 'Produtos Médicos',
    description: 'Design profissional para produtos médicos',
    config: {
      foregroundColor: '#2563eb',
      backgroundColor: '#ffffff',
      size: 256,
      dotStyle: 'rounded',
      cornerDotStyle: 'dot',
      cornerSquareStyle: 'extra-rounded'
    },
    style: {
      containerClass: 'bg-blue-50 p-8 rounded-3xl shadow-lg border-2 border-blue-200',
      qrClass: 'bg-white p-6 rounded-2xl shadow-md',
    },
  },
  {
    id: 'pharmacy',
    name: 'Farmácia',
    description: 'Tema verde para produtos farmacêuticos',
    config: {
      foregroundColor: '#059669',
      backgroundColor: '#ffffff',
      size: 256,
      dotStyle: 'classy',
      cornerDotStyle: 'dot',
      cornerSquareStyle: 'square'
    },
    style: {
      containerClass: 'bg-green-50 p-8 rounded-3xl shadow-lg border-2 border-green-200',
      qrClass: 'bg-white p-6 rounded-2xl shadow-md',
    },
  },
  {
    id: 'spotify',
    name: 'Spotify',
    description: 'Design do Spotify com bordas arredondadas',
    config: {
      foregroundColor: '#1DB954',
      backgroundColor: '#ffffff',
      size: 256,
      dotStyle: 'spotify',
      cornerDotStyle: 'dot',
      cornerSquareStyle: 'extra-rounded'
    },
    style: {
      containerClass: 'bg-[#1DB954] bg-opacity-10 p-8 rounded-3xl shadow-lg border-2 border-[#1DB954]',
      qrClass: 'bg-white p-6 rounded-3xl shadow-md',
    },
  },
  {
    id: 'circular',
    name: 'Circular',
    description: 'Design circular moderno',
    config: {
      foregroundColor: '#7c3aed',
      backgroundColor: '#ffffff',
      size: 256,
      dotStyle: 'dots',
      cornerDotStyle: 'dot',
      cornerSquareStyle: 'dot'
    },
    style: {
      containerClass: 'bg-purple-50 p-8 rounded-full shadow-lg border-2 border-purple-200',
      qrClass: 'bg-white p-6 rounded-full shadow-md',
    },
  }
];