'use client';

import { signup } from '@/api/auth/signup';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { HStack, VStack } from '@/components/common/Stack/Stack';
import { cx } from '@/utils/cx';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FocusEventHandler, InputHTMLAttributes, forwardRef } from 'react';
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

const NonNullableString = z.string().min(1);

const SignupSchema = z.object({
  email: NonNullableString.email('이메일 형식에 맞지 않습니다.'),
  password: NonNullableString,
  name: NonNullableString,
  businessName: NonNullableString,
  businessNumber: NonNullableString,
  licenseNumber: NonNullableString,
  전자상거래약관_동의여부: z.boolean(),
  개인정보처리방침약관_동의여부: z.boolean(),
  이메일뉴스수신_동의여부: z.boolean().optional(),
});

export type SignupSchemaType = z.infer<typeof SignupSchema>;

export const SignupForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    setError,
    formState: { errors, dirtyFields, isValid },
    control,
    watch,
  } = useForm<SignupSchemaType>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: async (...values) => {
      console.log(values);
      console.log(await zodResolver(SignupSchema)(...values));
      return zodResolver(SignupSchema)(...values);
    },
  });

  const checkEmailExist = async (email: string) => {
    // TODO: 서버 API 호출을 통한 이메일 중복 확인
    return false;
  };

  const validateEmail: FocusEventHandler<HTMLInputElement> = async (e) => {
    const value = e.target.value;
    await trigger('email');

    if (errors.email) return;

    if (await checkEmailExist(value)) {
      setError('email', { message: '이미 등록된 이메일입니다.' });
    }
  };

  const idErrorMessage = dirtyFields.email ? errors.email?.message : undefined;
  const allChecked =
    watch('전자상거래약관_동의여부') && watch('개인정보처리방침약관_동의여부') && watch('이메일뉴스수신_동의여부');

  return (
    <form
      className="vstack w-[20rem] gap-56 pt-27"
      onSubmit={handleSubmit(async (data) => {
        const response = await signup(data);
        if (response.code === 200) {
          router.push('/sigup/complete');
        } else if (response.code === 1000) {
          alert('이미 가입되어 있는 이메일 주소입니다.');
        }
      })}
    >
      <DevTool control={control} placement="bottom-left" />
      <VStack className="gap-36">
        <h3 className="text-20 font-bold text-darkGray-30">회원정보</h3>
        <VStack className=" gap-26">
          <Input.Root>
            <Input.Label>아이디(이메일)</Input.Label>
            <Input.Text
              {...register('email', { onBlur: validateEmail })}
              state={idErrorMessage ? 'error' : undefined}
              autoFocus
            />
            <Input.HelpText>{idErrorMessage}</Input.HelpText>
          </Input.Root>
          <PasswordInput {...register('password')}>비밀번호</PasswordInput>
          {/* FIXME: 휴대폰 인증 추가되면 이름 가져오기 */}
          <Input.Root>
            <Input.Label>이름</Input.Label>
            <Input.Text {...register('name')} />
          </Input.Root>
        </VStack>
      </VStack>

      <VStack className=" gap-36">
        <h3 className="text-20 font-bold text-darkGray-30">업체정보</h3>
        <VStack className="gap-26">
          <Input.Root>
            <Input.Label>업체명</Input.Label>
            <Input.Text {...register('businessName')} />
          </Input.Root>
          <Input.Root>
            <Input.Label>사업자 등록 번호</Input.Label>
            <Input.Text {...register('businessNumber')} />
          </Input.Root>
          <Input.Root>
            <Input.Label>중개사무소 등록번호</Input.Label>
            <Input.Text {...register('licenseNumber')} />
          </Input.Root>
        </VStack>
      </VStack>

      <VStack className="font-btn-bold mt-20 gap-16">
        <button
          type="button"
          className={cx(
            'rounded-3 border border-solid border-darkGray-30 p-8',
            allChecked ? 'border-[#0000000F] bg-peaGreen-50 text-white' : 'bg-white text-darkGray-40',
          )}
          onClick={() => {
            setValue('전자상거래약관_동의여부', !allChecked);
            setValue('개인정보처리방침약관_동의여부', !allChecked);
            setValue('이메일뉴스수신_동의여부', !allChecked);
          }}
        >
          <HStack className="items-center gap-4">
            <CheckCircleIcon />
            <span>전체 동의</span>
          </HStack>
        </button>

        <VStack className="gap-8">
          <TermsAgreeToggle
            label="전자상거래 약관 동의"
            {...register('전자상거래약관_동의여부')}
            checked={watch('전자상거래약관_동의여부')}
            onChange={(e) => {
              setValue('전자상거래약관_동의여부', e.target.checked);
            }}
          />
          <TermsAgreeToggle
            label="개인정보처리방침 약관 동의"
            {...register('개인정보처리방침약관_동의여부')}
            checked={watch('개인정보처리방침약관_동의여부')}
            onChange={(e) => {
              setValue('개인정보처리방침약관_동의여부', e.target.checked);
            }}
          />
          <TermsAgreeToggle
            label="이메일 뉴스 수신 동의(선택)"
            {...register('이메일뉴스수신_동의여부')}
            checked={watch('이메일뉴스수신_동의여부')}
            onChange={(e) => {
              setValue('이메일뉴스수신_동의여부', e.target.checked);
            }}
          />
        </VStack>
      </VStack>

      <Button type="submit" disabled={!isValid}>
        회원가입 신청
      </Button>
    </form>
  );
};

const TermsAgreeToggle = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { label: string }>(
  function TermsAgreeToggle(props, ref) {
    return (
      <HStack>
        <label className="hstack items-start">
          <input type="checkbox" className="hidden" ref={ref} {...props} />
          <HStack className={cx('gap-4 hover:cursor-pointer', props.checked ? 'text-peaGreen-50' : 'text-darkGray-40')}>
            <CheckIcon />
            <span>{props.label}</span>
          </HStack>
        </label>
        <span className="ml-auto text-darkGray-40">더보기</span>
      </HStack>
    );
  },
);
