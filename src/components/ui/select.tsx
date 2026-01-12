// Select.tsx
import { useState } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  className = ''
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(value || '');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={selectedValue}
          onChange={handleChange}
          className="w-full py-1 px-8 bg-back-800/50 border border-white-700/50 rounded-md text-white 
                     appearance-none cursor-pointer
                     hover:bg-white-700/50 hover:border-slate-600
                     focus:outline-none focus:ring-2 focus:ring-white-500/50 focus:border-white-500
                     transition-all duration-200
                     backdrop-blur-sm"
        >
          <option value="" disabled className="bg-[#C8AA6E] text-white-400">
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className=" bg-[#C8AA6E] text-black py-2"
            >
              {option.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
          <svg
            className="h-5 w-5 text-white-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Select;