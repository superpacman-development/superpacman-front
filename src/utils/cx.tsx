export const cx = (...classNames: (string | undefined | boolean)[]) => classNames.filter(Boolean).join(' ');
