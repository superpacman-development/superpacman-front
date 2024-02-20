export type BaseResponse<T extends Record<string, any>> = {
  data: T;
  code: number;
  message: string;
};
