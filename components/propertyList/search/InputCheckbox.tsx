'use client';

import { cn } from '@/utils/cn';
import { Checkbox, CheckboxProps } from '@components/Checkbox';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const InputCheckbox = (props: CheckboxProps & { name: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const value = (searchParams.getAll('contractTypes') as string[] | null) ?? [];
  const checked = value.includes(props.name);

  const onCheckedChange = (checked: boolean) => {
    const newArray = checked ? [...value, props.name] : value.filter((type) => type !== props.name);

    const params = new URLSearchParams(searchParams);
    params.delete('contractTypes');
    newArray.forEach((value) => params.append('contractTypes', value));

    const query = params.toString() ? `?${params.toString()}` : '';
    router.replace(`${pathname}${query}`);
  };

  return (
    <Checkbox
      {...props}
      checked={checked}
      onCheckedChange={(checked) => checked !== 'indeterminate' && onCheckedChange(checked)}
      wrapperClassName={cn(
        'cursor-pointer rounded-3 border border-solid bg-lightGray-30 px-8 py-6 shadow-shadow',
        checked ? 'border-blue-50' : 'border-border',
      )}
    />
  );
};
