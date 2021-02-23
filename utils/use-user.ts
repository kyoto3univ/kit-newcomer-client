import { useRouter } from 'next/router';
import React from 'react';
import { useGetMyUserQuery } from '../api/generated';

export const useUser = () => {
  const { isFetched, data, isSuccess, refetch } = useGetMyUserQuery(
    {},
    { retry: false, enabled: process.browser },
  );
  const tokenStatus = React.useMemo(
    () => process.browser && !!localStorage.getItem('token'),
    [data, isFetched],
  );

  return {
    isLoading: !isFetched,
    isLoggedIn: isSuccess,
    canBeLoggedIn: tokenStatus,
    user: data?.me,
    refetchUser: refetch,
  };
};

export const useAutoRedirect = (target = '/login') => {
  const { isLoggedIn, isLoading } = useUser();
  const { replace } = useRouter();

  React.useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      replace(target);
    }
  }, [isLoading, isLoggedIn]);
};
