import { Container } from '@/components/common/Conatiner/Container';
import { Logo } from '@/components/common/logo/Logo';
import { PasswordForm } from '@/components/login/PasswordForm';

export default function Passwrod() {
  return (
    <Container className="vstack h-full items-center justify-center gap-32">
      <Logo />
      <PasswordForm />
    </Container>
  );
}
