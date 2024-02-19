import { cn } from '@/utils/cn';
import { useId, useState } from 'react';
import { HStack } from '../Stack/Stack';
import { Checkbox, CheckboxProps } from './Checkbox';

export const InputCheckbox = (props: CheckboxProps) => {
  const [checked, setChecked] = useState(false);
  const defaultId = useId();
  const id = props.id ?? defaultId;

  return (
    <label htmlFor={id}>
      <HStack
        className={cn(
          'shadow-shadow rounded-3 border border-solid bg-lightGray-30 px-8 py-6',
          checked ? 'border-blue-50' : 'border-border',
        )}
      >
        <Checkbox
          {...props}
          id={id}
          checked={checked}
          onCheckedChange={(checked) => checked !== 'indeterminate' && setChecked(checked)}
        />
      </HStack>
    </label>
  );
};
