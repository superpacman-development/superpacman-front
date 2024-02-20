'use server';

import { FetchParameters, createFetch } from '@/utils/createFetch';
import { cookies } from 'next/headers';

export async function createFetchWithAuth<R = Response>(input: FetchParameters[0], init?: FetchParameters[1]) {
  if (!cookies().has('token')) {
    throw new Error('No permission');
  }

  const options = { ...init };
  options.headers = { ...options.headers, Authorization: `Bearer ${cookies().get('token')!.value}` };

  return createFetch<R>(input, options);
}
