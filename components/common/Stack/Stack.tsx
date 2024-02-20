import { cn } from '@/utils/cn';
import React, { forwardRef } from 'react';

type StackProps = React.HTMLAttributes<HTMLDivElement>;

export const VStack = forwardRef<HTMLDivElement, StackProps>(function VStack(props, ref) {
  return <div {...props} className={cn('vstack', props.className)} ref={ref} />;
});

export const HStack = forwardRef<HTMLDivElement, StackProps>(function HStack(props, ref) {
  return <div {...props} className={cn('hstack', props.className)} ref={ref} />;
});
