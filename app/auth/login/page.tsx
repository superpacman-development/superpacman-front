import { Container } from '@/components/common/Conatiner/Container';
import { Logo } from '@/components/common/logo/Logo';
import { HStack } from '@/components/common/Stack/Stack';
import { LoginForm } from '@/components/login/LoginForm';
import Link from 'next/link';

export default function Login() {
  return (
    <Container className="vstack h-full items-center justify-center gap-32">
      <Logo />
      <LoginForm />

      <HStack className="gap-38 text-darkGray-40">
        <Link href="/auth/password">비밀번호 찾기</Link>
        <hr className="h-full w-1 border-0 border-l border-solid border-lightGray-60" />
        <Link href="/auth/signup">회원가입</Link>
      </HStack>
    </Container>
  );
}
