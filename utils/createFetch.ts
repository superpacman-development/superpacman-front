type Promiseable<T> = T | Promise<T>;
export type FetchParameters = Parameters<typeof fetch>;
export type HTTPClient<R = Response> = ReturnType<typeof httpClient<R>>;

export type BaseResponse<T extends Record<string, any>> = {
  data: T;
  code: number;
  message: string;
};

export interface HTTPClientOption<T = Response> extends Omit<NonNullable<FetchParameters[1]>, 'body'> {
  baseUrl?: string;
  interceptors?: {
    request?(
      input: NonNullable<FetchParameters[0]>,
      init: NonNullable<FetchParameters[1]>,
    ): Promiseable<FetchParameters[1]>;
    response?(response: Response): Promiseable<T>;
  };
}

const applyBaseUrl = (input: FetchParameters[0], baseUrl?: string) => {
  if (!baseUrl) {
    return input;
  }

  if (typeof input === 'object' && 'url' in input) {
    return new URL(input.url, baseUrl);
  }

  return new URL(input, baseUrl);
};

function httpClient<T = Response>({ baseUrl, interceptors = {}, ...requestInit }: HTTPClientOption<T> = {}) {
  return async function <R = T extends Response ? Response : T>(
    input: FetchParameters[0],
    init?: FetchParameters[1],
  ): Promise<R> {
    const url = applyBaseUrl(input, baseUrl);
    const option = { ...requestInit, ...init };
    const interceptorAppliedOption = interceptors.request ? await interceptors.request(url, option) : option;
    const response = await fetch(url, interceptorAppliedOption);

    if (interceptors.response) {
      return (await interceptors.response(response)) as R;
    }

    return response as R;
  };
}

export const createFetch = httpClient({
  baseUrl: 'https://api.superpacman.co.kr',
  headers: { 'Content-Type': 'application/json' },
  interceptors: {
    request(request, init) {
      if (process.env.NODE_ENV === 'development') {
        console.log('====================================================================');
        console.log('Request:', request, init);
      }
      return init;
    },
    async response(response) {
      if (response.status === 401) {
        // redirect("/login");
      }

      try {
        const data = await response.json();
        // process.env.NODE_ENV === 'development' && console.log('Response:', data);
        return data;
      } catch (e) {
        // eslint-disable-next-line no-console
        process.env.NODE_ENV === 'development' && console.error('Failed to parse response body as JSON.', e);
        return null;
      }
    },
  },
});

type ParameterValue = string | number | ParameterValue[];
export function makeRequestUrlWithQueryString(url: string, params?: Record<string, ParameterValue | null | undefined>) {
  const objectWithoutOptionalValue = JSON.parse(JSON.stringify(params));
  const query = new URLSearchParams(objectWithoutOptionalValue as Record<string, string>).toString();
  const queryString = query ? `?${query}` : '';
  return url + queryString;
}
