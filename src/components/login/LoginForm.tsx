'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { authenticate } from '@/api/auth/authenticate';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../common/Button/Button';
import { Checkbox } from '../common/Checkbox/Checkbox';
import { Input } from '../common/Input/Input';
import { VStack } from '../common/Stack/Stack';

export const LoginSchema = z.object({
  email: z.string().email('이메일 형식에 맞지 않습니다.').min(1, ''),
  password: z.string().min(1, ''),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<z.infer<typeof LoginSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(LoginSchema),
  });

  const [error, setError] = useState('');
  const emailErrorMessage = dirtyFields.email ? errors.email?.message : undefined;

  return (
    <form
      className="vstack max-w-full gap-26 border border-solid border-lightGray-60 p-44"
      onSubmit={handleSubmit(async (data) => {
        const response = await authenticate(data);
        if (response.code === 200) {
          router.push('/');
        } else if (response.code === 400) {
          setError('아이디(이메일) 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.');
        }
      })}
    >
      <div className="vstack gap-[1.625rem]">
        <Input.Root>
          <Input.Label>아이디(이메일)</Input.Label>
          <Input.Text {...register('email')} state={emailErrorMessage ? 'error' : undefined} autoFocus />
          <Input.HelpText>{emailErrorMessage}</Input.HelpText>
        </Input.Root>
        <Input.Root>
          <Input.Label>비밀번호</Input.Label>
          <Input.Text {...register('password')} type="password" />
        </Input.Root>
      </div>

      <VStack className="mt-22 gap-36">
        <VStack className="gap-6">
          <Button type="submit">로그인</Button>
          {error && <p className="whitespace-pre-wrap text-error">{error}</p>}
        </VStack>
        <Checkbox label="로그인 상태 유지" />
      </VStack>
    </form>
  );
};
