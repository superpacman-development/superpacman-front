import dayjs from 'dayjs';
import { ReactNode } from 'react';

export const formatDate = (dateStr?: string, format?: string) =>
  dateStr ? dayjs(dateStr).format(format ?? 'YY.MM.DD.') : undefined;

export const formatString = (str?: string, format?: (nonNullableStr: string) => ReactNode) => {
  const defaultFormat = (str: string) => str;
  const _format = format ?? defaultFormat;

  return str ? _format(str) : '';
};

export const formatPrice = (price?: string | number) =>
  price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : undefined;
