'use client';

import { AddressResponse } from '@/lib/queries';
import { Select } from '@components/Select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { match } from 'ts-pattern';
import RestoreIcon from '~/assets/restore.svg';

export const CitySelect = ({
  data,
  type,
  defaultValue,
}: {
  data: AddressResponse;
  type: 'BIG_CITY' | 'MIDDLE_CITY' | 'LITTLE_CITY';
  defaultValue?: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <Select
      placeholder="전체"
      value={defaultValue ?? ''}
      options={data.map((city) => ({
        value: city.code,
        name: match(type)
          .with('BIG_CITY', () => city.bigCity!)
          .with('MIDDLE_CITY', () => `${city.city} ${city.siGunGu ?? city.eupMyeon ?? ''}`)
          .with('LITTLE_CITY', () => city.dongRi!)
          .otherwise(() => ''),
      }))}
      onChange={(e) => {
        const value = e.target.value;

        let params = new URLSearchParams(type === 'BIG_CITY' ? undefined : searchParams.toString());
        match(type)
          .with('BIG_CITY', () => {
            params.set('bigCity', value);
          })
          .with('MIDDLE_CITY', () => {
            params.set('middleCity', value);
          })
          .with('LITTLE_CITY', () => {
            params.set('littleCity', value);
          })
          .otherwise(() => {});

        const queryString = `${params.toString() ? `?${params.toString()}` : ''}`;
        router.replace(pathname + queryString);
      }}
    />
  );
};

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
