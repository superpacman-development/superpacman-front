'use client';

import { Input, InputProps } from '@components/Input';
import { HStack } from '@components/Stack';
import { PropsWithChildren, forwardRef, useState } from 'react';
import InvisibleIcon from '~/assets/invisible.svg';
import VisibleIcon from '~/assets/visible.svg';

export const PasswordInput = forwardRef<HTMLInputElement, PropsWithChildren<InputProps>>(function PasswordInput(
  { children, ...props },
  ref,
) {
  const [visible, setVisible] = useState(false);
  return (
    <Input.Root>
      <Input.Label>{children}</Input.Label>
      <HStack className="relative w-full items-center gap-8">
        <Input.Text className="w-[320px]" ref={ref} {...props} type={visible ? 'text' : 'password'} />
        <button type="button" onClick={() => setVisible((visible) => !visible)} className="absolute -right-30">
          {visible ? <VisibleIcon /> : <InvisibleIcon />}
        </button>
      </HStack>
    </Input.Root>
  );
});
