'use server';

import { LoginSchemaType } from '@/components/login/LoginForm';
import { createFetch } from '@/utils/createFetch';
import { cookies } from 'next/headers';
import { BaseResponse } from '../types';

type AuthenticateResponse = {
  token: string;
};

export async function authenticate(values: LoginSchemaType) {
  const response = await createFetch<BaseResponse<AuthenticateResponse>>('/auth/authenticate', {
    method: 'POST',
    body: JSON.stringify(values),
  });

  if (response.code === 200) {
    cookies().set('token', response.data.token);
  }

  return response;
}
