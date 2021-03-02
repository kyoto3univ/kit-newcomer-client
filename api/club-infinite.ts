import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { fetchGQL } from './fetcher';
import {
  GetPublicClubsQuery,
  GetPublicClubsQueryVariables,
  GetPublicClubsDocument,
  ClubBasicFragment,
} from './generated';

export const useGetPublicClubsInfiniteQuery = (limit = 30) => {
  const { data, ...otherProps } = useInfiniteQuery(
    'clubs',
    ({ pageParam = 0 }) => {
      return fetchGQL<GetPublicClubsQuery, GetPublicClubsQueryVariables>(
        GetPublicClubsDocument,
        {
          limit,
          offset: pageParam,
        },
      )();
    },
    {
      getNextPageParam(lastPage, pages) {
        return lastPage.getClubs.count < pages.length * limit
          ? undefined
          : pages.length * limit;
      },
    },
  );
  const count = React.useMemo(() => data?.pages[0].getClubs.count ?? 0, [data]);
  const items = React.useMemo(
    () =>
      data?.pages.reduce<ClubBasicFragment[]>(
        (arr, item) => [...arr, ...item.getClubs.items],
        [],
      ),
    [data],
  );

  return { ...otherProps, count, items };
};
