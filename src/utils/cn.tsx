import { twMerge } from 'tailwind-merge';

export const cn = (...classNames: (string | undefined | boolean)[]) => twMerge(classNames.filter(Boolean).join(' '));
