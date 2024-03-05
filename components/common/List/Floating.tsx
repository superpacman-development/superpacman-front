import { cn } from '@/utils/cn';
import { Checkbox } from '@components/Checkbox';
import * as Popover from '@radix-ui/react-popover';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ArrowBottomIcon from '~/assets/arrow-bottom.svg';
import { HStack, VStack } from '../Stack';

const Root = (props: Popover.PopoverProps) => {
  return <Popover.Root {...props} />;
};

const Trigger = ({ children, ...props }: Popover.PopoverTriggerProps) => {
  return (
    <Popover.Trigger {...props} className={cn('group', props.className)}>
      <HStack className="items-center gap-4">
        {children} <ArrowBottomIcon />
      </HStack>
    </Popover.Trigger>
  );
};

const Content = ({ className, ...props }: Popover.PopoverContentProps) => {
  return (
    <Popover.Portal>
      <Popover.Content
        {...props}
        className={cn('vstack rounded-3 border border-solid border-border bg-white drop-shadow-popover', className)}
      />
    </Popover.Portal>
  );
};

const Sort = ({ id, options }: { id: string; options: { text: string; sort: 'asc' | 'desc' }[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChangeSort = (id: string, type: 'asc' | 'desc') => {
    const search = new URLSearchParams(searchParams);
    search.set('sort', [id, type].join(','));
    const query = search.toString() ? `?${search.toString()}` : '';
    router.replace(`${pathname}${query}`);
  };

  return (
    <VStack className="m-8 w-140">
      <p className="h-18 text-12 text-darkGray-40">정렬 순서</p>
      {options.map((option) => (
        <Popover.Close asChild key={option.text}>
          <p
            className="hstack h-28 cursor-pointer items-center font-medium text-darkGray-60"
            onClick={() => handleChangeSort(id, option.sort)}
          >
            {option.text}
          </p>
        </Popover.Close>
      ))}
    </VStack>
  );
};

type FilterValue = string | number | FilterValue[];

const Filter = ({
  name,
  type,
  options,
}: {
  name?: string;
  type: 'radio' | 'checkbox';
  options: { text: string; value: FilterValue }[];
}) => {
  return (
    <VStack className="m-8 w-140 before:-mx-8 before:mb-14 before:border-t before:border-solid before:border-border">
      {name && <p className="h-18 text-12 text-darkGray-40">{name}</p>}
      {options.map((option) => (
        <p className="hstack h-28 items-center font-medium text-darkGray-60" key={option.text}>
          {type === 'checkbox' && <Checkbox label={option.text} />}
          {type === 'radio' && <input type="radio" value={option.text} />}
        </p>
      ))}
    </VStack>
  );
};

export const Floating = {
  Root,
  Trigger,
  Content,
  Sort,
  Filter,
};
