import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(process.env.API_ENDPOINT as string);
export const fetchGQL = <TData, TVariables>(
  query: string,
  variables?: TVariables,
): (() => Promise<TData>) => {
  return async () => {
    const headers: Record<string, string> = {};

    if (process.browser) {
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const res = await client.request<TData, TVariables>(
      query,
      variables,
      headers,
    );

    return res;
  };
};
