import { cx } from '@/utils/cx';
import React, { forwardRef, PropsWithChildren } from 'react';

export type InputProps = {
  state?: 'error';
} & React.InputHTMLAttributes<HTMLInputElement>;

const Root = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return <div className={cx('vstack gap-6', className)}>{children}</div>;
};

const Label = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return <label className={cx('font-semibold text-darkGray-70', className)}>{children}</label>;
};

const Text = forwardRef<HTMLInputElement, InputProps>(function Text({ state, ...props }, ref) {
  return (
    <input
      type="text"
      {...props}
      className={cx(
        'h-36 rounded-3 border px-15 text-14 outline-none',
        state === 'error' ? 'border-error' : 'border-darkGray-20 focus:border-darkGray-70',
        props.className,
      )}
      ref={ref}
    />
  );
});

const HelpText = ({ children }: PropsWithChildren<{}>) => {
  return <div className="font-semibold text-error">{children}</div>;
};

export const Input = {
  Root,
  Label,
  Text,
  HelpText,
};
