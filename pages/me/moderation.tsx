import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useGetModerationWaitClubsInfiniteQuery } from '../../api/club-infinite';
import { ClubListItem } from '../../components/club/list-item';
import { AppContainer } from '../../components/ui/container';
import { Loading } from '../../components/ui/loading';
import { SectionTitle } from '../../components/ui/section-title';
import { useAutoRedirect } from '../../utils/use-user';

const ClubModerationPage = () => {
  const {
    count,
    items,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetModerationWaitClubsInfiniteQuery(15);
  const { ref, inView } = useInView();

  useAutoRedirect();

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <AppContainer>
      <SectionTitle>承認待ち活動</SectionTitle>

      {isLoading ? (
        <Loading />
      ) : isError ? (
        <AppContainer>
          <p>Error</p>
        </AppContainer>
      ) : (
        <div>
          <p>{count}件</p>
          {items?.map((item) => <ClubListItem key={item.id} club={item} />) ??
            null}
          {hasNextPage &&
            (isFetchingNextPage ? <Loading /> : <div ref={ref} />)}
        </div>
      )}
    </AppContainer>
  );
};

export default ClubModerationPage;
