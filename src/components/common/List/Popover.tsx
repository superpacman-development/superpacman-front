import * as Popover from '@radix-ui/react-popover';
import { PropsWithChildren } from 'react';
import ArrowTopIcon from '~/assets/arrow-top.svg';
import { Checkbox } from '../Checkbox/Checkbox';
import { HStack, VStack } from '../Stack/Stack';

const Root = (props: Popover.PopoverProps) => {
  return <Popover.Root {...props} />;
};

const Trigger = ({ children, ...props }: Popover.PopoverTriggerProps) => {
  return (
    <Popover.Trigger {...props}>
      <HStack className="items-center gap-4">
        {children} <ArrowTopIcon />
      </HStack>
    </Popover.Trigger>
  );
};

const Content = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Popover.Portal>
      <Popover.Content className="vstack rounded-3 border border-solid border-border bg-white drop-shadow-popover">
        {children}
      </Popover.Content>
    </Popover.Portal>
  );
};

const Sort = ({ options }: { options: { text: string; sort: 'asc' | 'desc' }[] }) => {
  return (
    <VStack className="m-8 w-140">
      <p className="h-18 text-12 text-darkGray-40">정렬 순서</p>
      {options.map((option) => (
        <p className="hstack h-28 items-center font-medium text-darkGray-60" key={option.text}>
          {option.text}
        </p>
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

export const ListPopover = {
  Root,
  Trigger,
  Content,
  Sort,
  Filter,
};
