import { PropertyList } from '@/components/list/PropertyList';
import { VStack } from '@components/Stack';

export default async function Home() {
  return (
    <VStack style={{ width: 'calc(100% - var(--drawer-content-width, 0))' }}>
      <PropertyList />
    </VStack>
  );
}
