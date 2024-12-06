import React from 'react';

interface SizeSelectorProps {
  size: number;
  onChange: (size: number) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({ size, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        QR Code Size
      </label>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min="128"
          max="512"
          step="32"
          value={size}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1"
        />
        <span className="text-sm text-gray-500 w-16">
          {size}px
        </span>
      </div>
    </div>
  );
};