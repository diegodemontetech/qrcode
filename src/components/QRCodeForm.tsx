import React from 'react';
import { QRCodeConfig, QRContentType } from '../types/qr';
import { TypeSelector } from './TypeSelector';
import { ColorPicker } from './ColorPicker';
import { LogoUploader } from './LogoUploader';
import { SizeSelector } from './SizeSelector';
import { TemplateSelector } from './TemplateSelector';
import { PDFUploader } from './PDFUploader';

interface QRCodeFormProps {
  config: QRCodeConfig;
  contentType: QRContentType;
  onConfigChange: (config: QRCodeConfig) => void;
  onContentTypeChange: (type: QRContentType) => void;
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
}

export const QRCodeForm: React.FC<QRCodeFormProps> = ({
  config,
  contentType,
  onConfigChange,
  onContentTypeChange,
  selectedFile,
  onFileSelect,
}) => {
  const handleTemplateSelect = (template: QRCodeConfig['template']) => {
    if (template) {
      onConfigChange({
        ...config,
        ...template.config,
        template,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título
          </label>
          <input
            type="text"
            value={config.title}
            onChange={(e) => onConfigChange({ ...config, title: e.target.value })}
            placeholder="Digite um título para o QR code"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição
          </label>
          <textarea
            value={config.description}
            onChange={(e) => onConfigChange({ ...config, description: e.target.value })}
            placeholder="Adicione uma descrição (opcional)"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows={3}
          />
        </div>
      </div>

      <TemplateSelector
        selectedTemplate={config.template}
        onTemplateSelect={handleTemplateSelect}
      />

      <TypeSelector 
        contentType={contentType} 
        onTypeChange={onContentTypeChange} 
      />

      <div className="space-y-4">
        {contentType === 'pdf' ? (
          <PDFUploader
            selectedFile={selectedFile}
            onFileSelect={onFileSelect}
          />
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {contentType === 'url' ? 'URL' : 'Link do YouTube'}
            </label>
            <input
              type="text"
              value={config.content}
              onChange={(e) => onConfigChange({ ...config, content: e.target.value })}
              placeholder={contentType === 'url' ? 'Digite a URL' : 'Cole o link do YouTube'}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        )}

        <SizeSelector
          size={config.size}
          onChange={(size) => onConfigChange({ ...config, size })}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ColorPicker
            label="Cor do QR Code"
            color={config.foregroundColor}
            onChange={(color) => onConfigChange({ ...config, foregroundColor: color })}
          />
          <ColorPicker
            label="Cor do Fundo"
            color={config.backgroundColor}
            onChange={(color) => onConfigChange({ ...config, backgroundColor: color })}
          />
        </div>

        <LogoUploader
          onLogoSelect={(file) => onConfigChange({ ...config, logo: file })}
        />

        {config.logo && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tamanho do Logo
            </label>
            <input
              type="range"
              min="32"
              max="128"
              step="8"
              value={config.logoSize}
              onChange={(e) => onConfigChange({ ...config, logoSize: Number(e.target.value) })}
              className="w-full"
            />
            <div className="text-sm text-gray-500 mt-1">
              {config.logoSize}px
            </div>
          </div>
        )}
      </div>
    </div>
  );
};