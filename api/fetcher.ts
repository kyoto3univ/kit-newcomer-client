import fetch from 'isomorphic-fetch';

export const fetchGQL = <TData, TVariables>(
  query: string,
  variables?: TVariables,
): (() => Promise<TData>) => {
  return async () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (process.browser) {
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    const res = await fetch(process.env.API_ENDPOINT as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0] || 'Error..';
      throw new Error(message);
    }

    return json.data;
  };
};
