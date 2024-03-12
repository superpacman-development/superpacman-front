'use client';
import { PropertyDetail } from '@/components/propertyList/PropertyDetail';
import { ApartmentsResponse } from '@/lib/queries';
import { formatDate, formatString } from '@/utils/format';
import { Button } from '@components/Button';
import { Drawer } from '@components/Drawer';
import { Floating, List } from '@components/List';
import { HStack, VStack } from '@components/Stack';
import { Row, createColumnHelper } from '@tanstack/table-core';
import { useState } from 'react';
import ArrowOutwardIcon from '~/assets/arrow-outward.svg';

const columnHelper = createColumnHelper<ApartmentsResponse['content'][number]>();

const columns = [
  columnHelper.accessor('apartName', {
    header: () => (
      <Floating.Root>
        <Floating.Trigger>건물이름</Floating.Trigger>
        <Floating.Content>
          <Floating.Sort
            id="apartName"
            options={[
              { text: '가나다 오름차순', sort: 'asc' },
              { text: '가나다 내림차순', sort: 'desc' },
            ]}
          />
        </Floating.Content>
      </Floating.Root>
    ),
  }),
  columnHelper.accessor('dong', {
    header: () => (
      <Floating.Root>
        <Floating.Trigger>동</Floating.Trigger>
        <Floating.Content>
          <Floating.Sort
            id="dong"
            options={[
              { text: '오름차순', sort: 'asc' },
              { text: '내림차순', sort: 'desc' },
            ]}
          />
        </Floating.Content>
      </Floating.Root>
    ),
    cell: ({ cell }) => formatString(cell.getValue(), (dong) => `${dong}동`),
  }),
  columnHelper.accessor('supplyArea', {
    header: () => (
      <Floating.Root>
        <Floating.Trigger>공급면적</Floating.Trigger>
        <Floating.Content>
          <Floating.Sort
            id="supplyArea"
            options={[
              { text: '오름차순', sort: 'asc' },
              { text: '내림차순', sort: 'desc' },
            ]}
          />
        </Floating.Content>
      </Floating.Root>
    ),

    cell: ({ cell }) => formatString(cell.getValue(), (dong) => `${dong}㎡`),
  }),
  columnHelper.accessor('ho', {
    header: () => (
      <Floating.Root>
        <Floating.Trigger>층</Floating.Trigger>
        <Floating.Content>
          <Floating.Sort
            id="ho"
            options={[
              { text: '고층 순', sort: 'desc' },
              { text: '저층 순', sort: 'asc' },
            ]}
          />
          <Floating.Filter
            name="층 필터"
            type="checkbox"
            options={[
              { text: '저층', value: 'low' },
              { text: '중층', value: 'middle' },
              { text: '고층', value: 'high' },
            ]}
          />
        </Floating.Content>
      </Floating.Root>
    ),
  }),
  columnHelper.accessor('price', {
    header: () => (
      <Floating.Root>
        <Floating.Trigger>희망금액</Floating.Trigger>
        <Floating.Content>
          <Floating.Sort
            id="price"
            options={[
              { text: '금액 높은 순', sort: 'desc' },
              { text: '금액 낮은 순', sort: 'asc' },
            ]}
          />
        </Floating.Content>
      </Floating.Root>
    ),
  }),
  columnHelper.accessor('availableMoveInDate', {
    header: () => (
      <Floating.Root>
        <Floating.Trigger>입주가능일</Floating.Trigger>
        <Floating.Content>
          <Floating.Sort
            id="availableMoveInDate"
            options={[
              { text: '가까운 일정 순', sort: 'asc' },
              { text: '먼 일정 순', sort: 'desc' },
            ]}
          />
          <Floating.Filter
            name="층 필터"
            type="checkbox"
            options={[
              { text: '확정날짜', value: 'confirmeDate' },
              { text: '즉시', value: 'immediately' },
              { text: '협의', value: 'discussion' },
            ]}
          />
        </Floating.Content>
      </Floating.Root>
    ),
  }),
  columnHelper.accessor('memo', {
    header: () => '특징',
  }),
  columnHelper.accessor('createDatetime', {
    header: () => (
      <Floating.Root>
        <Floating.Trigger>등록일</Floating.Trigger>
        <Floating.Content>
          <Floating.Sort
            id="createDatetime"
            options={[
              { text: '최신 순', sort: 'desc' },
              { text: '오래된 순', sort: 'asc' },
            ]}
          />
        </Floating.Content>
      </Floating.Root>
    ),
    cell: ({ row }) => formatDate(row.original.createDatetime),
  }),
  {
    id: 'link',
    maxSize: 30,
    cell: () => {
      return (
        <div className="text-blue-50">
          <ArrowOutwardIcon />
        </div>
      );
    },
  },
];

export const PropertyList = ({ data }: { data: ApartmentsResponse }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Row<ApartmentsResponse['content'][number]> | null>(null);

  const handleClickRow = (data: Row<ApartmentsResponse['content'][number]>) => {
    setSelected(data);
    setOpen(true);

    setTimeout(() => {
      // 새로운 row 클릭 시마다 drawer 스크롤 맨 위로 이동
      const drawerContentRef = document.querySelector('[vaul-drawer]');
      if (drawerContentRef) {
        drawerContentRef.scrollTo({ top: 0 });
      }
    }, 0);
  };

  return (
    <>
      <List columns={columns} data={data.content} onClickRow={handleClickRow} />

      {selected && (
        <Drawer.Root open={open} onOpenChange={setOpen} modal={false} dismissible={false}>
          <Drawer.Portal>
            <Drawer.Content>
              <Drawer.Close>닫기</Drawer.Close>
              <Drawer.Container>
                <PropertyDetail data={selected.original} />
              </Drawer.Container>

              <VStack className="sticky bottom-[0] left-[0] right-[0] gap-53 bg-lightGray-20 px-40 py-32">
                <div className="break-keep text-blue-50">매물을 구매하면 상세한 정보를 확인할 수 있습니다.</div>
                <HStack className="gap-8">
                  <Button onClick={() => selected.toggleSelected(true)}>매물 선택하기</Button>
                  <Button>장바구니에 넣기</Button>
                </HStack>
              </VStack>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      )}
    </>
  );
};
