'use server';

import { LoginSchema } from '@/components/login/LoginForm';
import { BaseResponse, createFetch } from '@/utils/createFetch';
import { cookies } from 'next/headers';
import { z } from 'zod';

type AuthenticateResponse = { token: string };

export async function authenticate(values: z.infer<typeof LoginSchema>) {
  const response = await createFetch<BaseResponse<AuthenticateResponse>>('/auth/authenticate', {
    method: 'POST',
    body: JSON.stringify(values),
  });

  // 쿠키에 토큰 값 저장
  if (response.code === 200) {
    cookies().set('token', response.data.token, { httpOnly: true });
  }

  return response;
}
