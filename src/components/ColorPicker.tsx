import React from 'react';
import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ label, color, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <HexColorPicker color={color} onChange={onChange} />
        <div className="mt-2 flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full border border-gray-300"
            style={{ backgroundColor: color }}
          />
          <input
            type="text"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-1 text-sm rounded border border-gray-300"
          />
        </div>
      </div>
    </div>
  );
};