'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../common/Button/Button';
import { Checkbox } from '../common/Checkbox/Checkbox';
import { Input } from '../common/Input/Input';

const schema = z.object({
  id: z.string().email('이메일 형식에 맞지 않습니다.').min(1, ''),
  password: z.string().min(1, ''),
});

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm<z.infer<typeof schema>>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const idErrorMessage = dirtyFields.id ? errors.id?.message : undefined;

  return (
    <form
      className="vstack max-w-full gap-26 border border-solid border-lightGray-60 p-44"
      onSubmit={handleSubmit((d) => console.log(d))}
    >
      <div className="vstack gap-[1.625rem]">
        <Input.Root>
          <Input.Label>아이디(이메일)</Input.Label>
          <Input.Text {...register('id')} state={idErrorMessage ? 'error' : undefined} autoFocus />
          <Input.HelpText>{idErrorMessage}</Input.HelpText>
        </Input.Root>
        <Input.Root>
          <Input.Label>비밀번호</Input.Label>
          <Input.Text {...register('password')} />
        </Input.Root>
      </div>

      <div className="vstack mt-22 gap-36">
        <Button type="submit" disabled={!isValid}>
          로그인
        </Button>
        <Checkbox label="로그인 상태 유지" />
      </div>
    </form>
  );
};
