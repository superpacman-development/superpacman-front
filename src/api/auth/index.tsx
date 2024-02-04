import { SignUpFormValues } from '@/components/signup/SignupForm';
import { createFetch } from '@/utils/createFetch';
import { BaseResponse } from '../types';

type SignupResponse = {
  token: string;
};

export function signup(values: SignUpFormValues) {
  return createFetch<BaseResponse<SignupResponse>>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
