'use client';

import { AddressResponse } from '@/lib/queries';
import { Floating } from '@components/List';
import { VStack } from '@components/Stack';
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEventHandler } from 'react';

export const CityFloating = ({
  data,
  name,
  selected,
  getLabel,
  setValue,
  type = 'radio',
}: {
  data: AddressResponse;
  name: string;
  selected?: string | null;
  getLabel?: (city?: AddressResponse[number]) => string;
  setValue?: (value: string) => string;
  type?: 'radio' | 'checkbox';
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    const queryString = setValue?.(value) ?? '';
    router.replace(pathname + queryString);
  };

  const selectedLabel = getLabel?.(data.find((city) => city.code === selected));

  return (
    <Floating.Root>
      <Floating.Trigger className="cursor-pointer rounded-3 border border-solid border-border bg-lightGray-30 px-8 py-6 shadow-shadow">
        <div>{selectedLabel}</div>
      </Floating.Trigger>
      <Floating.Content className="mt-8" align="start">
        <VStack>
          <div className="m-12">시도</div>
          <div className="grid grid-cols-3">
            {data.map((city) => (
              <label key={city.code} className="hstack h-28 items-center gap-4 px-8 py-6">
                <input type={type} name={name} value={city.code} onChange={onChange} checked={city.code === selected} />
                {getLabel?.(city)}
              </label>
            ))}
          </div>
        </VStack>
      </Floating.Content>
    </Floating.Root>
  );
};
