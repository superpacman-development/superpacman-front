import { Button } from '@/components/common/Button/Button';
import { Logo } from '@/components/common/logo/Logo';
import { HStack, VStack } from '@/components/common/Stack/Stack';
import Link from 'next/link';

export default function SignupComplete() {
  return (
    <VStack className="mx-auto my-[4.5rem] h-full items-center justify-center">
      <Logo />

      <h1 className="mt-33 text-[3.125rem] font-semibold">회원가입 신청완료</h1>
      <VStack className="gap-12">
        <p className="font-body1 whitespace-pre-wrap pt-8 text-center text-darkGray-60">
          회원가입 신청을 하면 업체정보를 확인 후, 승인 절차를 통해 가입완료 됩니다.{'\n'}
          승인이 완료되면 계정 아이디(이메일)로 회원가입 완료 안내 이메일을 보내드립니다.
        </p>
      </VStack>

      <HStack className="mt-68 gap-10">
        <Link href="/auth/login">
          <Button>첫화면으로</Button>
        </Link>
        <Link href="/">
          <Button>서비스 둘러보기</Button>
        </Link>
      </HStack>
    </VStack>
  );
}
