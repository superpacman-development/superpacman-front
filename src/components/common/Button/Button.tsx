import { cx } from '@/utils/cx';
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
  return (
    <button
      type="button"
      {...props}
      className={cx(
        'font-btn-lg min-w-auto flex h-40 w-[20rem] max-w-full items-center justify-center rounded-3 bg-lightGray-40 py-16',
        props.disabled ? 'cursor-not-allowed text-darkGray-40' : 'text-darkGray-70',
        props.className,
      )}
    />
  );
};
