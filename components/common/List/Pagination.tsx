'use client';

import { cn } from '@/utils/cn';
import { HStack } from '@components/Stack';
import ArrowLeftIcon from '~/assets/arrow-left.svg';

const PAGE_COUNT_SIZE = 10;

export const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}) => {
  const start = Math.floor(currentPage / PAGE_COUNT_SIZE) * PAGE_COUNT_SIZE;
  const end = start + PAGE_COUNT_SIZE < totalPages ? start + PAGE_COUNT_SIZE : totalPages;
  const currentPageArray = Array.from({ length: end - start }, (_, i) => start + 1 + i);

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
