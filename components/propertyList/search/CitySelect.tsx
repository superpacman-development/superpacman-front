'use client';

import { AddressResponse } from '@/lib/queries';
import { Floating } from '@components/List';
import React, { PropsWithChildren, ReactNode, useContext } from 'react';

type CityFloatingContextType = {
  selected?: string | string[] | null;
  data: AddressResponse;
  getLabel: (city?: AddressResponse[number]) => string | undefined;
};
const CityFloatingContext = React.createContext<CityFloatingContextType>({ data: [], getLabel: () => '' });
const useCityFloatingContext = () => {
  const context = useContext(CityFloatingContext);
  if (!context) {
    throw new Error('Cannot find CityFloatingContext');
  }
  return context;
};

const Root = ({ children, ...props }: PropsWithChildren<CityFloatingContextType>) => {
  return (
    <CityFloatingContext.Provider value={props}>
      <Floating.Root>{children}</Floating.Root>
    </CityFloatingContext.Provider>
  );
};

const Trigger = ({ children }: PropsWithChildren<{}>) => {
  const { data, selected, getLabel } = useCityFloatingContext();
  const selectedLabel = Array.isArray(selected)
    ? selected.length > 0
      ? `${getLabel(data.find((city) => city.code === selected[0]))}${selected.length > 1 ? ` 외 ${selected.length - 1}개` : ''}`
      : undefined
    : getLabel(data.find((city) => city.code === selected));

  return (
    <Floating.Trigger className="cursor-pointer rounded-3 border border-solid border-border bg-lightGray-30 px-8 py-6 shadow-shadow">
      <div>{selectedLabel ?? children}</div>
    </Floating.Trigger>
  );
};

const Content = ({ label, children }: { label: string; children: (context: CityFloatingContextType) => ReactNode }) => {
  const context = useCityFloatingContext();

  return (
    <Floating.Content className="mt-8" align="start">
      <div className="h-fit overflow-auto">
        <div className="m-12">{label}</div>
        <div className="grid grid-cols-3">{children(context)}</div>
      </div>
    </Floating.Content>
  );
};

export const CityFloating = {
  Root,
  Trigger,
  Content,
};
