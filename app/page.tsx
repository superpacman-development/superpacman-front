import { PropertyList } from '@/components/list/PropertyList';
import { CitySelect, ResetButton } from '@/components/list/SearchForm';
import { getAddress, getApartments } from '@/lib/queries';
import { InputCheckbox } from '@components/Checkbox';
import { Divider } from '@components/Divider';
import { HStack, VStack } from '@components/Stack';

export default async function List({
  searchParams,
}: {
  searchParams: { bigCity?: string; middleCity?: string; littleCity?: string };
}) {
  const bigCities = await getAddress({ addressType: 'BIG_CITY' });
  const middleCities = !!searchParams?.bigCity
    ? await getAddress({ addressType: 'MIDDLE_CITY', bigCityAddressCode: searchParams.bigCity })
    : [];
  const littleCities = !!searchParams?.middleCity
    ? await getAddress({ addressType: 'LITTLE_CITY', middleCityAddressCode: searchParams.middleCity })
    : [];
  const apartments = await getApartments({ page: 0, size: 10, sort: [] });

  return (
    <VStack style={{ width: 'calc(100% - var(--drawer-content-width, 0))' }}>
      <VStack className="gap-32 px-42 py-26">
        <h1 className="font-page-title mb-12">매물 목록</h1>
        <HStack className="items-center gap-16">
          <HStack className="gap-8">
            <CitySelect data={bigCities} type="BIG_CITY" defaultValue={searchParams.bigCity} />
            <CitySelect data={middleCities} type="MIDDLE_CITY" defaultValue={searchParams.middleCity} />
            <CitySelect data={littleCities} type="LITTLE_CITY" defaultValue={searchParams.littleCity} />
          </HStack>

          <Divider width={2} />

          <HStack className="gap-8">
            <InputCheckbox label="매매" />
            <InputCheckbox label="전세" />
            <InputCheckbox label="월세" />
          </HStack>

          <ResetButton />
        </HStack>

        <PropertyList data={apartments} />
      </VStack>
    </VStack>
  );
}
