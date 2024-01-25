import { Container } from '@/components/common/Conatiner/Container';
import { VStack } from '@/components/common/Stack/Stack';
import { SignupForm } from '@/components/signup/SignupForm';

export default function Signup() {
  return (
    <Container>
      <VStack className="max-w-full justify-between gap-80 py-44 sm:flex-row">
        <VStack className="ml-[4vw] h-fit max-w-full gap-16 border border-solid border-lightGray-40 px-22 py-16">
          <h1 className="text-48 font-extrabold text-blue-50">ListBank</h1>
          <h2 className="text-28 font-semibold text-darkGray-30">리스트뱅크 회원가입</h2>
          <p className="font-body1 sticky top-32 whitespace-pre-wrap pb-32 pt-52 text-darkGray-60">
            회원가입 신청을 하면 업체정보를 확인 후{'\n'}
            승인 절차를 통해 가입완료 됩니다.{'\n'}
            승인이 완료되면 계정 아이디(이메일)로{'\n'}
            회원가입 완료 안내 이메일을 보내드립니다.
          </p>
        </VStack>

        <div className="mr-[28vw]">
          <SignupForm />
        </div>
      </VStack>
    </Container>
  );
}
