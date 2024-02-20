import { VStack } from '@/components/common/Stack/Stack';
import { PropertyList } from '@/components/list/PropertyList';

export default async function Home() {
  return (
    <VStack style={{ width: 'calc(100% - var(--drawer-content-width, 0))' }}>
      <PropertyList />
    </VStack>
  );
}
