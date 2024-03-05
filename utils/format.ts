import dayjs from 'dayjs';

export const formatDate = (dateStr?: string, format?: string) =>
  dateStr ? dayjs(dateStr).format(format ?? 'YY.MM.DD.') : '-';
