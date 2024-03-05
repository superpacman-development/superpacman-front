'use server';

import { BaseResponse, makeRequestUrlWithQueryString } from '@/utils/createFetch';
import { createFetchWithAuth } from '@/utils/createFetchWithAuth';

export type AddressResponse = {
  code: string;
  bigCity?: string;
  city?: string;
  siGunGu?: string;
  eupMyeon?: string;
  dongRi?: string;
  dolomyeong?: string;
  type?: string;
}[];

type AddressRequest = {
  addressType: string;
  bigCityAddressCode?: string;
  middleCityAddressCode?: string;
};

export async function getAddress(params: AddressRequest) {
  const url = makeRequestUrlWithQueryString('/apartments/address', params);
  const response = await createFetchWithAuth<BaseResponse<AddressResponse>>(url);
  return response.data;
}

export type ApartmentsResponse = {
  content: {
    id: number;
    apartCode: string;
    dong?: string;
    ho?: string;
    ownerName?: string;
    ownerPhone?: string;
    directionOfHouse: string;
    floorPlanType: string;
    exclusiveArea: string;
    supplyArea: string;
    floorType: string;
    price: number;
    monthlyRentPrice: number;
    deposit: number;
    monthlyDeposit: number;
    availableMoveInDate: string;
    memo: string;
    managementCost: string;
    confirmationDate?: string; // ?
    confirmationType?: string;
    apartName: string;
    dongAddress: string;
    area: string;
    dongCount: string;
    unitCount: string;
    contractor: string;
    developer: string;
    apartType: string;
    doroAddress: string;
    approvedForUse: string;
    baseFloor: string;
    topFloor: string;
    zipcode: string;
    dongCode: string;
    numberOfParkingSpaces: number;
    createDatetime?: string;
  }[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: { empty: boolean; sorted: boolean; unsorted: boolean };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: { empty: boolean; sorted: boolean; unsorted: boolean };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};

type ApartmentsRequest = {
  page: number;
  size: number;
  sort: string[];
  dongCodes?: string;
  contractTypes?: string;
};

export async function getApartments(params: ApartmentsRequest) {
  const url = makeRequestUrlWithQueryString('/apartments', params);
  const response = await createFetchWithAuth<BaseResponse<ApartmentsResponse>>(url);
  return response.data;
}
