import React from 'react';

export const FormInput = ({ label, type = 'text', ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        className="input"
        {...props}
      />
    </div>
  );
};

export const FormSelect = ({ label, options, ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <select className="input" {...props}>
        {options.map(option => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export const FormTextarea = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <textarea
        className="input min-h-[100px]"
        {...props}
      />
    </div>
  );
};