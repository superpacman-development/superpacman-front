'use client';

import { HStack } from '@/components/common/Stack/Stack';
import { cn } from '@/utils/cn';
import ArrowLeftIcon from '~/assets/arrow-left.svg';

export const Pagination = ({
  total,
  currentPage,
  pageSize,
  setCurrentPage,
}: {
  total: number;
  currentPage: number;
  pageSize: number;
  setCurrentPage: (currentPage: number) => void;
}) => {
  const numPages = Math.ceil(total / pageSize);
  const currentPageArray = Array(numPages)
    .fill(0)
    .map((_, i) => i + 1);

  return (
    <HStack>
      <button>
        <ArrowLeftIcon />
      </button>
      <HStack className="gap-8">
        {currentPageArray?.map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentPage(i - 1)}
            className={cn(
              'rounded-3 border border-solid bg-lightGray-40 [&]:h-34 [&]:w-34',
              currentPage === i ? 'border-blue-50' : 'border-border',
            )}
          >
            {i}
          </button>
        ))}
      </HStack>
      <button>
        <ArrowLeftIcon className="rotate-180" />
      </button>
    </HStack>
  );
};
