import Link from 'next/link';
import React from 'react';
import {
  useGetModerationWaitCountQuery,
  UserPermission,
} from '../../api/generated';
import { BelongClubList } from '../../components/club/belong-list';
import { AppContainer } from '../../components/ui/container';
import { ContentCard } from '../../components/ui/content-card';
import { Loading } from '../../components/ui/loading';
import { LargeUserInfo } from '../../components/user/user-info-lg';
import {
  useAutoRedirect,
  usePermissionCheck,
  useUser,
} from '../../utils/use-user';

const MypageIndex = () => {
  const { isLoading, isLoggedIn, user } = useUser();
  const showModeration = usePermissionCheck([
    UserPermission.Admin,
    UserPermission.Moderator,
  ]);
  const { data: moderationInfo } = useGetModerationWaitCountQuery(
    {},
    {
      enabled: showModeration,
    },
  );

  useAutoRedirect();

  if (isLoading) {
    return (
      <AppContainer>
        <Loading />
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      {isLoggedIn && (
        <>
          <LargeUserInfo user={user!} />
          <div className='py-4'>
            <section className='mb-2'>
              <h2 className='text-xl'>所属している部活動</h2>
              <BelongClubList />
            </section>
            {showModeration && (
              <section className='mb-2'>
                <h2 className='text-xl'>管理</h2>
                <div className='grid grid-cols-cards col-auto gap-4'>
                  <Link href='/me/moderation' passHref>
                    <ContentCard
                      title='承認待ちの活動'
                      description={`${
                        moderationInfo?.getClubs.count ?? 0
                      }件の承認待ちがあります`}
                    />
                  </Link>
                </div>
              </section>
            )}
          </div>
        </>
      )}
    </AppContainer>
  );
};

export default MypageIndex;
