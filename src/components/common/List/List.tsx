'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { Checkbox } from '../Checkbox/Checkbox';
import { HStack, VStack } from '../Stack/Stack';
import { makeData } from './makeData';
import { Pagination } from './Pagination';

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = makeData(20);

// const columnHelper = createColumnHelper<Person>();

// const columns = [
//   columnHelper.accessor('firstName', {
//     cell: info => info.getValue(),
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor(row => row.lastName, {
//     id: 'lastName',
//     cell: info => <i>{info.getValue()}</i>,
//     header: () => <span>Last Name</span>,
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor('age', {
//     header: () => 'Age',
//     cell: info => info.renderValue(),
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor('visits', {
//     header: () => <span>Visits</span>,
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor('status', {
//     header: 'Status',
//     footer: info => info.column.id,
//   }),
//   columnHelper.accessor('progress', {
//     header: 'Profile Progress',
//     footer: info => info.column.id,
//   }),
// ];

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
    // getRowId: row => row.uuid,
  });

  useEffect(() => {
    console.log(rowSelection);
  }, [rowSelection]);

  return (
    <div className="p-2">
      <VStack className="w-full gap-8">
        {table.getHeaderGroups().map(headerGroup => (
          <HStack key={headerGroup.id} className="w-full px-16 items-center">
            <div className="w-50">
              <Checkbox
                checked={table.getIsAllRowsSelected()}
                // indeterminate={table.getIsSomeRowsSelected()}
                onCheckedChange={checked =>
                  checked === 'indeterminate' ? undefined : table.toggleAllRowsSelected(checked)} // or getToggleAllPageRowsSelectedHandler
              />
            </div>
            {headerGroup.headers.map(header => (
              <div key={header.id} className="flex-1">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
              </div>
            ))}
          </HStack>
        ))}
        {table.getRowModel().rows.map(row => (
          <HStack
            key={row.id}
            className="w-full p-16 items-center bg-lightGray-10 border border-solid border-deepNeutrals-30"
          >
            <div className="w-50">
              <Checkbox
                checked={row.getIsSelected()}
                disabled={!row.getCanSelect()}
                onCheckedChange={checked => checked === 'indeterminate' ? undefined : row.toggleSelected(checked)}
              />
            </div>
            {row.getVisibleCells().map(cell => (
              <div key={cell.id} className="flex-1">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </HStack>
        ))}
      </VStack>

      <HStack className="justify-center mt-50">
        <Pagination
          total={100}
          pageSize={table.getState().pagination.pageSize}
          currentPage={table.getState().pagination.pageIndex + 1}
          setCurrentPage={table.setPageIndex}
        />
      </HStack>

      {
        /* <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div> */
      }
      <div>{table.getRowModel().rows.length}개</div>
    </div>
  );
};
