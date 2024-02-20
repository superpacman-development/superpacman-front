'use server';

import { BaseResponse } from '@/utils/createFetch';
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

export async function getAddress(params?: any) {
  if (!params) {
    const emptyList: AddressResponse = [];
    return emptyList;
  }

  const query = new URLSearchParams(params).toString();
  const queryString = query ? `?${query}` : '';
  const response = await createFetchWithAuth<BaseResponse<AddressResponse>>('/apartments/address' + queryString);
  return response.data;
}
