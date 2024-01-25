import { HStack } from '../Stack/Stack';
import { Checkbox, CheckboxProps } from './Checkbox';

export const InputCheckbox = (props: CheckboxProps) => {
  return (
    <HStack className="rounded-3 bg-lightGray-30 px-8 py-6">
      <Checkbox {...props} />
    </HStack>
  );
};
