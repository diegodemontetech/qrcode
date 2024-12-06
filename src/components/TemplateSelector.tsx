import React from 'react';
import { QRTemplate, QR_TEMPLATES } from '../types/qr';

interface TemplateSelectorProps {
  selectedTemplate?: QRTemplate;
  onTemplateSelect: (template: QRTemplate) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateSelect,
}) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Select Template
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {QR_TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateSelect(template)}
            className={`p-4 rounded-xl text-left transition-all ${
              selectedTemplate?.id === template.id
                ? 'ring-2 ring-indigo-500 bg-indigo-50'
                : 'hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <h3 className="font-medium text-gray-900">{template.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{template.description}</p>
            <div
              className="w-6 h-6 rounded-full mt-2"
              style={{ backgroundColor: template.config.foregroundColor }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};