import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useGetPublicClubsInfiniteQuery } from '../../api/club-infinite';
import { ClubListItem } from '../../components/club/list-item';
import { AppContainer } from '../../components/ui/container';
import { Loading } from '../../components/ui/loading';
import { SectionTitle } from '../../components/ui/section-title';

const ClubListPage = () => {
  const {
    count,
    items,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    fetchNextPage,
  } = useGetPublicClubsInfiniteQuery(15);
  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <AppContainer>
      <SectionTitle>部活動一覧</SectionTitle>

      {isLoading ? (
        <Loading />
      ) : isError ? (
        <AppContainer>
          <p>Error</p>
        </AppContainer>
      ) : (
        <div>
          <p>{count}件</p>
          {items!.map((item) => (
            <ClubListItem key={item.id} club={item} />
          ))}
          {hasNextPage &&
            (isFetchingNextPage ? <Loading /> : <div ref={ref} />)}
        </div>
      )}
    </AppContainer>
  );
};

export default ClubListPage;
