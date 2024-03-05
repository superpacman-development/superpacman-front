import { PropertyList } from '@/components/list/PropertyList';
import { SearchForm } from '@/components/list/search/SearchForm';

import { getAddress, getApartments } from '@/lib/queries';
import { VStack } from '@components/Stack';

export default async function List({
  searchParams,
}: {
  searchParams: {
    bigCity?: string;
    middleCity?: string;
    littleCity?: string | string[];
    contractTypes?: string | string[];
    sort?: string;
  };
}) {
  const bigCities = await getAddress({ addressType: 'BIG_CITY' });
  const middleCities = !!searchParams?.bigCity
    ? await getAddress({ addressType: 'MIDDLE_CITY', bigCityAddressCode: searchParams.bigCity })
    : [];
  const littleCities = !!searchParams?.middleCity
    ? await getAddress({ addressType: 'LITTLE_CITY', middleCityAddressCode: searchParams.middleCity })
    : [];
  const apartments = await getApartments({
    page: 0,
    size: 10,
    sort: searchParams.sort ? [searchParams.sort] : [],
    dongCodes: searchParams?.littleCity ? searchParams.littleCity.toString() : undefined,
    contractTypes: searchParams?.contractTypes ? searchParams.contractTypes.toString() : undefined,
  });

  return (
    <VStack style={{ width: 'calc(100% - var(--drawer-content-width, 0))' }}>
      <VStack className="gap-32 px-42 py-26">
        <h1 className="font-page-title mb-12">매물 목록</h1>
        <SearchForm data={{ bigCities, middleCities, littleCities }} />
        <PropertyList data={apartments} />
      </VStack>
    </VStack>
  );
}
