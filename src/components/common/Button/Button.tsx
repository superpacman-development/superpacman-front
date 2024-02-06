import { cn } from '@/utils/cn';
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        'font-btn-lg min-w-auto flex h-40 w-[20rem] max-w-full items-center justify-center rounded-3 py-16',
        props.disabled ? 'cursor-not-allowed bg-lightGray-40 text-darkGray-40' : 'bg-blue-50 text-white',
        props.className,
      )}
    />
  );
};
