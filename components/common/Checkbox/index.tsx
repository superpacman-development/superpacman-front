'use client';

import { cn } from '@/utils/cn';
import * as CheckboxPrimitives from '@radix-ui/react-checkbox';
import { useId } from 'react';

export type CheckboxProps = {
  label?: string;
  wrapperClassName?: string;
} & CheckboxPrimitives.CheckboxProps;

export const Checkbox = ({ label, wrapperClassName, ...props }: CheckboxProps) => {
  const defaultId = useId();
  const id = props.id ?? defaultId;

  return (
    <label htmlFor={id} className={cn('hstack gap-6', wrapperClassName)}>
      <CheckboxPrimitives.Root id={id} {...props}>
        <CheckboxPrimitives.Indicator forceMount className="group">
          <div className="flex h-18 w-18 items-center justify-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className='group-data-[state="unchecked"]:hidden'
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.75 0.25H12.25C13.0825 0.25 13.75 0.925 13.75 1.75V12.25C13.75 13.075 13.0825 13.75 12.25 13.75H1.75C0.9175 13.75 0.25 13.075 0.25 12.25V1.75C0.25 0.925 0.9175 0.25 1.75 0.25ZM1.75 6.99998L5.5 10.75L12.25 3.99998L11.1925 2.93498L5.5 8.62748L2.8075 5.94248L1.75 6.99998Z"
                fill="#2F87F7"
              />
            </svg>

            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className='group-data-[state="checked"]:hidden'
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.5 0H12C12.825 0 13.5 0.675 13.5 1.5V12C13.5 12.825 12.825 13.5 12 13.5H1.5C0.675 13.5 0 12.825 0 12V1.5C0 0.675 0.675 0 1.5 0ZM12 12V1.5H1.5V12H12Z"
                fill="#CED4DC"
              />
            </svg>
          </div>
        </CheckboxPrimitives.Indicator>
      </CheckboxPrimitives.Root>
      {label}
    </label>
  );
};
