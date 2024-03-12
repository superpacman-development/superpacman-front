'use client';

import { usePathname, useRouter } from 'next/navigation';
import RestoreIcon from '~/assets/restore.svg';

export const ResetButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <button className="hstack gap-8 px-12 text-darkGray-40" onClick={() => router.replace(pathname)}>
      <RestoreIcon />
      초기화
    </button>
  );
};
