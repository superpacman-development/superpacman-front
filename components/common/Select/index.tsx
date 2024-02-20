'use client';

import { SelectHTMLAttributes } from 'react';

export const Select = ({
  defaultValue,
  options,
  placeholder,
  ...props
}: {
  placeholder?: string;
  options: { name: string; value: string }[];
} & SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <select defaultValue={defaultValue ?? placeholder ? '' : undefined} {...props}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
