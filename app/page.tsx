import { PropertyList } from '@/components/list/PropertyList';
import { CitySelect, ResetButton } from '@/components/list/SearchForm';
import { BaseResponse, createFetchWithAuth } from '@/utils/createFetch';
import { InputCheckbox } from '@components/Checkbox';
import { Divider } from '@components/Divider';
import { HStack, VStack } from '@components/Stack';
import { z } from 'zod';

export const AddressResponseSchema = z.array(
  z.object({
    code: z.string(),
    bigCity: z.string().nullish(),
    city: z.string().nullish(),
    siGunGu: z.string().nullish(),
    eupMyeon: z.string().nullish(),
    dongRi: z.string().nullish(),
    dolomyeong: z.string().nullish(),
    type: z.string().nullish(),
  }),
);

async function getAddress(params?: any) {
  if (!params) {
    const emptyList: z.infer<typeof AddressResponseSchema> = [];
    return emptyList;
  }

  const query = new URLSearchParams(params).toString();
  const queryString = query ? `?${query}` : '';
  const response = await createFetchWithAuth<BaseResponse<z.infer<typeof AddressResponseSchema>>>(
    '/apartments/address' + queryString,
  );
  return response.data;
}

export default async function List({
  searchParams,
}: {
  searchParams: { bigCity?: string; middleCity?: string; littleCity?: string };
}) {
  const bigCities = await getAddress({ addressType: 'BIG_CITY' });
  const middleCities = await getAddress(
    !searchParams?.bigCity ? undefined : { addressType: 'MIDDLE_CITY', bigCityAddressCode: searchParams.bigCity },
  );
  const littleCities = await getAddress(
    !searchParams?.middleCity
      ? undefined
      : { addressType: 'LITTLE_CITY', middleCityAddressCode: searchParams.middleCity },
  );

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

        <PropertyList />
      </VStack>
    </VStack>
  );
}
