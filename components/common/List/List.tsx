'use client';

import { cn } from '@/utils/cn';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Checkbox } from '../Checkbox/Checkbox';
import { Divider } from '../Divider';
import { HStack, VStack } from '../Stack/Stack';
import { Pagination } from './Pagination';

export const List = <T extends any>({ columns, data }: { columns: ColumnDef<T, any>[]; data: T[] }) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      rowSelection,
    },
    // getRowId: row => row.id,
  });

  return (
    <div className="p-2">
      <VStack className="w-full gap-8">
        {table.getHeaderGroups().map((headerGroup) => (
          <HStack key={headerGroup.id} className="w-full items-center py-8">
            <div className="w-70">
              <label className="hstack gap-4">
                <Checkbox
                  checked={table.getIsAllRowsSelected()}
                  // indeterminate={table.getIsSomeRowsSelected()}
                  onCheckedChange={(checked) =>
                    checked === 'indeterminate' ? undefined : table.toggleAllRowsSelected(checked)
                  } // or getToggleAllPageRowsSelectedHandler
                />
                선택
              </label>
            </div>
            {headerGroup.headers.map((header) => (
              <div key={header.id} className="flex-1">
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </div>
            ))}
          </HStack>
        ))}

        {table.getRowModel().rows.map((row) => (
          <HStack
            key={row.id}
            className={cn(
              'w-full items-center rounded-3 bg-lightGray-10 py-16 outline outline-1 outline-deepNeutrals-30',
              row.getIsSelected() && 'outline-blue-50',
            )}
          >
            <div className="hstack w-70 flex-none">
              <Checkbox
                checked={row.getIsSelected()}
                disabled={!row.getCanSelect()}
                onCheckedChange={(checked) => (checked === 'indeterminate' ? undefined : row.toggleSelected(checked))}
                className="pl-16"
              />
              <Divider className="ml-16" />
            </div>

            {row.getVisibleCells().map((cell) => (
              <div key={cell.id} className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </HStack>
        ))}
      </VStack>

      <HStack className="mt-50 justify-center">
        <Pagination
          total={1}
          pageSize={table.getState().pagination.pageSize}
          currentPage={table.getState().pagination.pageIndex + 1}
          setCurrentPage={table.setPageIndex}
        />
      </HStack>

      <div>{table.getRowModel().rows.length}개</div>
    </div>
  );
};
