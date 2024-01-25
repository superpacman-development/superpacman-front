import { cx } from '@/utils/cx';
import { forwardRef, HTMLAttributes } from 'react';

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      {...props}
      style={{ maxWidth: 'min(calc(100vw - 2.5rem), 100%)' }}
      className={cx('max-w-container mx-auto w-full', className)}
    >
      {props.children}
    </div>
  );
});
