'use client';

import { CityFloating } from '@/components/list/search/CitySelect';
import { ResetButton } from '@/components/list/search/ResetButton';
import { AddressResponse } from '@/lib/queries';
import { InputCheckbox } from '@components/Checkbox';
import { Divider } from '@components/Divider';
import { HStack } from '@components/Stack';
import { useSearchParams } from 'next/navigation';

export const SearchForm = ({
  data,
}: {
  data: { bigCities: AddressResponse; middleCities: AddressResponse; littleCities: AddressResponse };
}) => {
  const searchParams = useSearchParams();

  return (
    <HStack className="items-center gap-16">
      <HStack className="gap-8">
        <CityFloating
          name="bigCities"
          data={data.bigCities}
          getLabel={(city) => city?.bigCity ?? '전체'}
          selected={searchParams.get('bigCity')}
          setValue={(value) => {
            const params = new URLSearchParams({ bigCity: value });
            return '?' + params.toString();
          }}
        />
        <CityFloating
          name="middleCities"
          data={data.middleCities}
          getLabel={(city) => (city ? `${city.city} ${city.siGunGu ?? city.eupMyeon ?? ''}` : '시/군/구')}
          selected={searchParams.get('middleCity')}
          setValue={(value) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('middleCity', value);
            return '?' + params.toString();
          }}
        />
        <CityFloating
          type="checkbox"
          name="middleCities"
          data={data.littleCities}
          getLabel={(city) => city?.dongRi ?? '동'}
          selected={searchParams.get('littleCity')}
          setValue={(value) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('littleCity', value);
            return '?' + params.toString();
          }}
        />
      </HStack>

      <Divider width={2} />

      <HStack className="gap-8">
        <InputCheckbox label="매매" />
        <InputCheckbox label="전세" />
        <InputCheckbox label="월세" />
      </HStack>

      <ResetButton />
    </HStack>
  );
};
