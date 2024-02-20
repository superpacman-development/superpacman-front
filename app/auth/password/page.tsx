import { PasswordForm } from '@/components/login/PasswordForm';
import { Container } from '@components/Conatiner';
import { Logo } from '@components/Logo';

export default function Passwrod() {
  return (
    <Container className="vstack h-full items-center justify-center gap-32">
      <Logo />
      <PasswordForm />
    </Container>
  );
}
