'use client';

import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { HStack, VStack } from '@/components/common/Stack/Stack';
import { cx } from '@/utils/cx';
import { zodResolver } from '@hookform/resolvers/zod';
import { FocusEventHandler, ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CheckCircleIcon from '../../../public/assets/check-circle.svg';
import CheckIcon from '../../../public/assets/check.svg';
import { PasswordInput } from './PasswordInput';

const terms = [
  { label: '전자상거래 약관 동의', handleClick: () => alert('전자상거래 약관 동의') },
  { label: '개인정보 처리방침 약관 동의', handleClick: () => alert('개인정보 처리방침 약관 동의') },
  { label: '이메일 뉴스 수신 동의 (선택)', handleClick: () => alert('이메일 뉴스 수신 동의 (선택)') },
];

const schema = z.object({
  id: z.string().email('이메일 형식에 맞지 않습니다.'),
  password: z.string().min(1, ''),
  company: z.string(),
  business_registration_number: z.string(),
  brokerage_registration_number: z.string(),
});

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    trigger,
    setError,
    formState: { errors, dirtyFields },
  } = useForm<z.infer<typeof schema>>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const [checked, setChecked] = useState<boolean[]>(Array(terms.length).fill(false));

  const onChangeChecked = (index: number) => () => {
    setChecked((checked) => {
      let newChecked = [...checked];
      newChecked[index] = !checked[index];
      return newChecked;
    });
  };

  const checkEmailExist = async (email: string) => {
    // TODO: 서버 API 호출을 통한 이메일 중복 확인
    return true;
  };

  const validateEmail: FocusEventHandler<HTMLInputElement> = async (e) => {
    const value = e.target.value;
    await trigger('id');

    if (errors.id) return;

    if (await checkEmailExist(value)) {
      setError('id', { message: '이미 등록된 이메일입니다.' });
    }
  };

  const idErrorMessage = dirtyFields.id ? errors.id?.message : undefined;

  return (
    <form className="vstack w-[20rem] gap-56 pt-27" onSubmit={handleSubmit((value) => console.log({ value }))}>
      <VStack className="gap-36">
        <h3 className="text-20 font-bold text-darkGray-30">회원정보</h3>
        <VStack className=" gap-26">
          <Input.Root>
            <Input.Label>아이디(이메일)</Input.Label>
            <Input.Text
              {...register('id', { onBlur: validateEmail })}
              state={idErrorMessage ? 'error' : undefined}
              autoFocus
            />
            <Input.HelpText>{idErrorMessage}</Input.HelpText>
          </Input.Root>
          <PasswordInput {...register('password')}>비밀번호</PasswordInput>
        </VStack>
      </VStack>

      <VStack className=" gap-36">
        <h3 className="text-20 font-bold text-darkGray-30">업체정보</h3>
        <VStack className=" gap-26">
          <Input.Root>
            <Input.Label>업체명</Input.Label>
            <Input.Text {...register('company')} />
          </Input.Root>
          <Input.Root>
            <Input.Label>사업자 등록 번호</Input.Label>
            <Input.Text {...register('business_registration_number')} />
          </Input.Root>
          <Input.Root>
            <Input.Label>중개사무소 등록번호</Input.Label>
            <Input.Text {...register('brokerage_registration_number')} />
          </Input.Root>
        </VStack>
      </VStack>

      <VStack className="font-btn-bold mt-20 gap-16">
        <button
          type="button"
          className={cx(
            'rounded-3 border border-solid border-darkGray-30 p-8',
            checked.every((v) => v) ? 'border-[#0000000F] bg-peaGreen-50 text-white' : 'bg-white text-darkGray-40',
          )}
          onClick={() =>
            setChecked((checked) => {
              const allChecked = checked.every((v) => v);
              return checked.map((_) => !allChecked);
            })
          }
        >
          <HStack className="items-center gap-4">
            <CheckCircleIcon />
            <span>전체 동의</span>
          </HStack>
        </button>

        <VStack className="gap-8">
          {terms.map(({ label, handleClick }, index) => (
            <TermsAgreeToggle
              key={label}
              checked={checked[index]}
              handleChange={onChangeChecked(index)}
              handleClick={handleClick}
            >
              {label}
            </TermsAgreeToggle>
          ))}
        </VStack>
      </VStack>

      <Button type="submit">회원가입 신청</Button>
    </form>
  );
};

const TermsAgreeToggle = (props: {
  checked: boolean;
  handleChange: () => void;
  children: ReactNode;
  handleClick?: () => void;
}) => {
  return (
    <HStack className="items-start">
      <HStack
        onClick={props.handleChange}
        className={cx('gap-4 hover:cursor-pointer', props.checked ? 'text-peaGreen-50' : 'text-darkGray-40')}
      >
        <CheckIcon />
        <span>{props.children}</span>
      </HStack>
      <span className="ml-auto text-darkGray-40" onClick={props.handleClick}>
        더보기
      </span>
    </HStack>
  );
};
