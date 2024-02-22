'use client';

import { Button } from '@components/Button';
import { VStack } from '@components/Stack';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  console.error(error);

  return (
    <div className="absolute top-1/2 w-full -translate-y-1/2">
      <VStack className="mx-auto items-center justify-center gap-16">
        <h2 className="mb-24 text-24 font-bold">Something went wrong!</h2>
        <Button onClick={() => reset()}>Try again</Button>
        <Link href="/auth/login">Go to Login</Link>
      </VStack>
    </div>
  );
}
