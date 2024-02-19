import { cn } from '@/utils/cn';

type DividerProps = {
  direction?: 'vertical' | 'horizontal';
  width?: string | number;
  height?: string | number;
  className?: string;
};

export const Divider = ({ direction = 'vertical', className, ...style }: DividerProps) => {
  return (
    <div
      role="separator"
      className={cn('flex self-stretch bg-lightGray-30', direction === 'vertical' ? 'w-1' : 'h-1', className)}
      style={style}
    />
  );
};
