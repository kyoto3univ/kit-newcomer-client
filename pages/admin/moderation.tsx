import { useRouter } from 'next/router';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useAllClubsInfiniteQuery } from '../../api/club-infinite';
import { ClubModerationState } from '../../api/generated';
import { ClubListItem } from '../../components/club/list-item';
import { PageTitle } from '../../components/title';
import { AppContainer } from '../../components/ui/container';
import { Loading } from '../../components/ui/loading';
import { SectionTitle } from '../../components/ui/section-title';
import { useAutoRedirect } from '../../utils/use-user';

const ClubModerationPage = () => {
  const { query } = useRouter();
  const {
    count,
    items,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
  } = useAllClubsInfiniteQuery(
    query['all'] ? undefined : ClubModerationState.Waiting,
    15,
  );
  const { ref, inView } = useInView();

  useAutoRedirect();

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <AppContainer>
      <PageTitle title='活動一覧(管理)' />
      <SectionTitle>活動一覧</SectionTitle>

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
