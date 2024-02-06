'use client';

import * as Popover from '@radix-ui/react-popover';
import { createColumnHelper } from '@tanstack/table-core';
import RestoreIcon from '~/assets/restore.svg';
import { InputCheckbox } from '../common/Checkbox/InputCheckbox';
import { List } from '../common/List/List';
import { Select } from '../common/Select/Select';
import { HStack, VStack } from '../common/Stack/Stack';

const building = {
  buildingName: 'aa',
  dong: 'bb',
  exclusiveArea: 3,
  floor: 'low',
  desiredAmount: '11',
  moveInDate: '11',
  features: '11',
  createdDate: '11',
};

const columnHelper = createColumnHelper<typeof building>();

const columns = [
  { accessorKey: 'expand' },
  columnHelper.accessor('buildingName', {
    header: () => (
      <Popover.Root>
        <Popover.Trigger>건물이름</Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="PopoverContent" sideOffset={5}>
            <VStack
              className="w-140 bg-white p-8"
              style={{
                borderRadius: '3px',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                background: '#FFF',
                boxShadow: '0px 12px 24px 0px rgba(0, 0, 0, 0.20)',
              }}
            >
              <p>정렬순서</p>
              <p>가나다 오름차순</p>
              <p>가나다 내림차순</p>
            </VStack>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    ),
  }),
  columnHelper.accessor('dong', {
    header: () => '동',
  }),
  columnHelper.accessor('exclusiveArea', {
    header: () => '전용면적',
  }),
  columnHelper.accessor('floor', {
    header: () => '층',
  }),
  columnHelper.accessor('desiredAmount', {
    header: () => '희망금액',
  }),
  columnHelper.accessor('moveInDate', {
    header: () => '입주가능일',
  }),
  columnHelper.accessor('features', {
    header: () => '특징',
  }),
  columnHelper.accessor('createdDate', {
    header: () => '등록일',
  }),
];

export const PropertyList = () => {
  return (
    <VStack className="gap-32 px-42 py-26">
      <h1 className="font-page-title mb-12">매물 목록</h1>
      <HStack className="items-center gap-64">
        <VStack className="gap-8">
          <p className="font-body-bold">지역</p>
          <HStack className="gap-8">
            <Select options={[{ value: '경기', name: '경기도' }]} />
            <Select options={[{ value: '하남', name: '하남시' }]} />
            <Select options={[{ value: '망월', name: '망월동' }]} />
          </HStack>
        </VStack>
        <VStack className="gap-8">
          <p className="font-body-bold">거래유형</p>
          <HStack className="gap-8">
            <InputCheckbox label="매매" />
            <InputCheckbox label="전세" />
            <InputCheckbox label="월세" />
          </HStack>
        </VStack>
        <HStack className="gap-8">
          <RestoreIcon />
          초기화
        </HStack>
      </HStack>

      <List columns={columns} data={[building]} />
    </VStack>
  );
};
