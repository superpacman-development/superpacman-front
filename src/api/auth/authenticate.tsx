import { LoginSchemaType } from '@/components/login/LoginForm';
import { createFetch } from '@/utils/createFetch';
import { BaseResponse } from '../types';

type AuthenticateResponse = {
  token: string;
};

export function authenticate(values: LoginSchemaType) {
  return createFetch<BaseResponse<AuthenticateResponse>>('/auth/authenticate', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
