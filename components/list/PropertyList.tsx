'use client';
import { Drawer } from '@components/Drawer';
import { Floating, List } from '@components/List';
import { createColumnHelper } from '@tanstack/table-core';
import ArrowOutwardIcon from '~/assets/arrow-outward.svg';

const building = {
  buildingName: '개포래미안포레스트 행복주택',
  dong: '1107동',
  exclusiveArea: '59.97㎡',
  floor: '고층',
  desiredAmount: '매매 121,000',
  moveInDate: '24년 2월 하순',
  features: '신축 첫입주',
  createdDate: '24.11.16',
};

const columnHelper = createColumnHelper<typeof building>();

const columns = [
  columnHelper.accessor('buildingName', {
    header: () => (
      <Floating.Root>
        <Floating.Trigger>건물이름</Floating.Trigger>
        <Floating.Content>
          <Floating.Sort
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
            options={[
              { text: '오름차순', sort: 'asc' },
              { text: '내림차순', sort: 'desc' },
            ]}
          />
        </Floating.Content>
      </Floating.Root>
    ),
  }),
  columnHelper.accessor('exclusiveArea', {
    header: () => (
      <Floating.Root>
        <Floating.Trigger>공급면적</Floating.Trigger>
        <Floating.Content>
          <Floating.Sort
            options={[
              { text: '오름차순', sort: 'asc' },
              { text: '내림차순', sort: 'desc' },
            ]}
          />
        </Floating.Content>
      </Floating.Root>
    ),
  }),
  columnHelper.accessor('floor', {
    header: () => (
      <Floating.Root>
        <Floating.Trigger>층고</Floating.Trigger>
        <Floating.Content>
          <Floating.Sort
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
  columnHelper.accessor('desiredAmount', {
    header: () => (
      <Floating.Root>
        <Floating.Trigger>희망금액</Floating.Trigger>
        <Floating.Content>
          <Floating.Sort
            options={[
              { text: '금액 높은 순', sort: 'desc' },
              { text: '금액 낮은 순', sort: 'asc' },
            ]}
          />
        </Floating.Content>
      </Floating.Root>
    ),
  }),
  columnHelper.accessor('moveInDate', {
    header: () => (
      <Floating.Root>
        <Floating.Trigger>입주가능일</Floating.Trigger>
        <Floating.Content>
          <Floating.Sort
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
  columnHelper.accessor('features', {
    header: () => '특징',
  }),
  columnHelper.accessor('createdDate', {
    header: () => (
      <Floating.Root>
        <Floating.Trigger>등록일</Floating.Trigger>
        <Floating.Content>
          <Floating.Sort
            options={[
              { text: '최신 순', sort: 'desc' },
              { text: '오래된 순', sort: 'asc' },
            ]}
          />
        </Floating.Content>
      </Floating.Root>
    ),
  }),
  {
    id: 'link',
    maxSize: 30,
    cell: () => {
      return (
        <div className="text-blue-50">
          <Drawer.Root>
            <Drawer.Trigger>
              <ArrowOutwardIcon />
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Content>hihi</Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      );
    },
  },
];

export const PropertyList = () => {
  return <List columns={columns} data={[building]} />;
};
