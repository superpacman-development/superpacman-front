import { cx } from '@/utils/cx';
import React, { forwardRef } from 'react';

type StackProps = React.HTMLAttributes<HTMLDivElement>;

export const VStack = forwardRef<HTMLDivElement, StackProps>(function VStack(props, ref) {
  return <div {...props} className={cx('vstack', props.className)} ref={ref} />;
});

export const HStack = forwardRef<HTMLDivElement, StackProps>(function HStack(props, ref) {
  return <div {...props} className={cx('hstack', props.className)} ref={ref} />;
});
