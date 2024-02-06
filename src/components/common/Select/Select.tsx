export const Select = (
  { defaultValue, options, onChange }: {
    defaultValue?: string;
    options: { name: string; value: string }[];
    onChange?: (value: string) => void;
  },
) => {
  return (
    <select defaultValue={defaultValue} onChange={e => onChange?.(e.target.value)}>
      {options.map(option => <option key={option.value} value={option.value}>{option.name}</option>)}
    </select>
  );
};
