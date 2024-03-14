'use client';

import { cn } from '@/utils/cn';
import { Checkbox } from '@components/Checkbox';
import {
  flexRender,
  getCoreRowModel,
  Row,
  RowData,
  RowSelectionState,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Divider } from '../Divider';
import { HStack, VStack } from '../Stack';
import { Pagination } from './Pagination';

import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    size?: string | number;
    minSize?: string | number;
    width?: string | number;
  }
}

const DEFAULT_COLUMN_WIDTH = '100px';

export const List = <T extends any>({
  onClickRow,
  ...options
}: {
  onClickRow?: (row: Row<T>) => void;
} & Omit<TableOptions<T>, 'getCoreRowModel'>) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    ...options,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      ...options.state,
      rowSelection,
    },
    // getRowId: row => row.id,
  });

  return (
    <div className="p-2">
      <VStack className="w-full gap-8">
        {table.getHeaderGroups().map((headerGroup) => (
          <HStack key={headerGroup.id} className="h-48 w-full items-center gap-8 py-8">
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
              <div
                key={header.id}
                className="shrink flex-grow overflow-hidden text-ellipsis whitespace-pre-line break-words"
                {...{
                  style: {
                    width: header.column.columnDef.meta?.width || DEFAULT_COLUMN_WIDTH,
                    minWidth: header.column.columnDef.meta?.minSize || 'auto',
                    flexGrow: header.column.columnDef.meta?.size || 1,
                  },
                }}
              >
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </div>
            ))}
          </HStack>
        ))}

        {table.getRowModel().rows.map((row) => (
          <HStack
            key={row.id}
            className={cn(
              'h-48 w-full items-center gap-8 rounded-3 bg-lightGray-10 py-16 outline outline-1 outline-deepNeutrals-30 hover:bg-lightGray-30 hover:outline-deepNeutrals-40',
              row.getIsSelected() && 'outline-blue-50',
              onClickRow && 'cursor-pointer',
            )}
            onClick={() => onClickRow?.(row)}
          >
            <div className="hstack w-70 flex-none">
              <Checkbox
                checked={row.getIsSelected()}
                disabled={!row.getCanSelect()}
                onCheckedChange={(checked) => (checked === 'indeterminate' ? undefined : row.toggleSelected(checked))}
                className="pl-16"
                onClick={(e) => e.stopPropagation()}
              />
              <Divider className="ml-16" />
            </div>

            {row.getVisibleCells().map((cell) => (
              <div
                key={cell.id}
                className="min-w-100 line-clamp-2 shrink flex-grow overflow-hidden text-ellipsis whitespace-pre-line break-words"
                {...{
                  style: {
                    width: cell.column.columnDef.meta?.width || DEFAULT_COLUMN_WIDTH,
                    flexShrink: cell.column.columnDef.meta?.minSize || 'auto',
                    flexGrow: cell.column.columnDef.meta?.size || 1,
                  },
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </HStack>
        ))}
      </VStack>

      <HStack className="mt-50 justify-center">
        <Pagination
          totalPages={table.getPageCount()}
          currentPage={table.getState().pagination.pageIndex + 1}
          setCurrentPage={table.setPageIndex}
        />
      </HStack>

      <HStack className="gap-12">
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 15, 20, 25].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}개씩 보기
            </option>
          ))}
        </select>

        <div>전체 매물 개수 {table.getRowCount()}</div>
      </HStack>
    </div>
  );
};
