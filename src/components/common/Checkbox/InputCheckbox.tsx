import { cn } from '@/utils/cn';
import { useState } from 'react';
import { Checkbox, CheckboxProps } from './Checkbox';

export const InputCheckbox = (props: CheckboxProps) => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      {...props}
      checked={checked}
      onCheckedChange={(checked) => checked !== 'indeterminate' && setChecked(checked)}
      wrapperClassName={cn(
        'cursor-pointer rounded-3 border border-solid bg-lightGray-30 px-8 py-6 shadow-shadow',
        checked ? 'border-blue-50' : 'border-border',
      )}
    />
  );
};
