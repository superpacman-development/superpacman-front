import { VStack } from '@/components/common/Stack/Stack';
import { PropertyList } from '@/components/list/PropertyList';
import { BaseResponse, createFetch } from '@/utils/createFetch';
import { cookies } from 'next/headers';

async function getAddress() {
  const query = new URLSearchParams({ addressType: 'BIG_CITY' }).toString();

  const response = await createFetch<BaseResponse<{}>>(`/apartments/address${query ? `?${query}` : ''}`, {
    headers: { Authorization: `Bearer ${cookies().get('token')!.value}` },
  });

  return response;
}

export default async function Home() {
  const address = await getAddress();

  console.log('*****address', address);

  return (
    <VStack style={{ width: 'calc(100% - var(--drawer-content-width, 0))' }}>
      <PropertyList />
    </VStack>
  );
}
