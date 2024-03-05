import { cn } from '@/utils/cn';
import { HStack, VStack } from '@components/Stack';
import { ComponentProps, HTMLAttributes } from 'react';

export const TableRoot = ({ cellCount = 2, ...props }: ComponentProps<typeof VStack> & { cellCount?: number }) => (
  <VStack
    {...props}
    style={{ '--table-head-size': '5.5rem', '--table-cell-count': cellCount, ...props.style } as never}
  />
);

export const TableRow = (props: ComponentProps<typeof HStack>) => (
  <HStack {...props} className={cn('border-0 border-border [&+&]:border-t', props.className)} />
);

export const TableHead = (props: HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className={cn('flex-shrink-0 flex-grow-0 basis-[var(--table-head-size)] bg-lightGray-30 p-7', props.className)}
  />
);

export const TableCell = (props: HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className={cn(
      'flex-grow-0 basis-[calc(100%_/_var(--table-cell-count)_-_var(--table-head-size))] p-7 last:flex-grow',
      props.className,
    )}
  />
);
