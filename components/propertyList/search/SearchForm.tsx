'use client';

import { CityFloating } from '@/components/propertyList/search/CitySelect';
import { InputCheckbox } from '@/components/propertyList/search/InputCheckbox';
import { ResetButton } from '@/components/propertyList/search/ResetButton';
import { AddressResponse } from '@/lib/queries';
import { Divider } from '@components/Divider';
import { HStack } from '@components/Stack';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const SearchForm = ({
  data,
}: {
  data: { bigCities: AddressResponse; middleCities: AddressResponse; littleCities: AddressResponse };
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleRoute = (value: URLSearchParams) => {
    const search = new URLSearchParams(value);
    const query = search.toString() ? `?${search.toString()}` : '';
    router.replace(`${pathname}${query}`);
  };

  return (
    <HStack className="items-center gap-16">
      <HStack className="gap-8">
        <CityFloating.Root
          data={data.bigCities}
          selected={searchParams.get('bigCity')}
          getLabel={(city) => city?.bigCity}
        >
          <CityFloating.Trigger>전체</CityFloating.Trigger>
          <CityFloating.Content label="시/도">
            {({ data, getLabel, selected }) =>
              data.map((city) => (
                <label key={city.code} className="hstack h-28 items-center gap-4 px-8 py-6">
                  <input
                    type="radio"
                    value={city.code}
                    checked={selected === city.code}
                    onChange={(e) => handleRoute(new URLSearchParams({ bigCity: e.target.value }))}
                  />
                  {getLabel(city)}
                </label>
              ))
            }
          </CityFloating.Content>
        </CityFloating.Root>
        <CityFloating.Root
          data={data.middleCities}
          selected={searchParams.get('middleCity')}
          getLabel={(city) => (city ? `${city.city} ${city.siGunGu ?? city.eupMyeon ?? ''}` : undefined)}
        >
          <CityFloating.Trigger>시/군/구</CityFloating.Trigger>
          <CityFloating.Content label="시/군/구">
            {({ data, getLabel, selected }) =>
              data.map((city) => (
                <label key={city.code} className="hstack h-28 items-center gap-4 px-8 py-6">
                  <input
                    type="radio"
                    value={city.code}
                    checked={selected === city.code}
                    onChange={(e) => {
                      const params = new URLSearchParams(searchParams);
                      params.set('middleCity', e.target.value);
                      params.delete('littleCity');
                      handleRoute(params);
                    }}
                  />
                  {getLabel(city)}
                </label>
              ))
            }
          </CityFloating.Content>
        </CityFloating.Root>
        <CityFloating.Root
          data={data.littleCities}
          selected={searchParams.getAll('littleCity')}
          getLabel={(city) => city?.dongRi}
        >
          <CityFloating.Trigger>읍/면/동</CityFloating.Trigger>
          <CityFloating.Content label="읍/면/동">
            {({ data, getLabel, selected }) =>
              data.map((city) => (
                <label key={city.code} className="hstack h-28 items-center gap-4 px-8 py-6">
                  <input
                    type="checkbox"
                    value={city.code}
                    checked={selected?.includes(city.code)}
                    onChange={(e) => {
                      const value = e.target.value;
                      const selectedArray = (selected as string[]) ?? [];
                      const newArray = selectedArray.includes(value)
                        ? selectedArray.filter((code) => code !== value)
                        : [...selectedArray, value];

                      const params = new URLSearchParams(searchParams);
                      params.delete('littleCity');
                      newArray.forEach((value) => params.append('littleCity', value));
                      handleRoute(params);
                    }}
                  />
                  {getLabel(city)}
                </label>
              ))
            }
          </CityFloating.Content>
        </CityFloating.Root>
      </HStack>

      <Divider width={2} />

      <HStack className="gap-8">
        <InputCheckbox label="매매" name="SALE" />
        <InputCheckbox label="전세" name="MONTHLY_RENT" />
        <InputCheckbox label="월세" name="RENT" />
      </HStack>

      <ResetButton />
    </HStack>
  );
};
