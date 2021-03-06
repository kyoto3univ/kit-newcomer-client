import Link from 'next/link';
import React from 'react';
import {
  useGetModerationWaitCountQuery,
  UserPermission,
} from '../../api/generated';
import { BelongClubList } from '../../components/club/belong-list';
import { PageTitle } from '../../components/title';
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
  const showAdmin = usePermissionCheck([UserPermission.Admin]);
  const showModeration = usePermissionCheck([
    UserPermission.Admin,
    UserPermission.Moderator,
  ]);
  const showNewClub = usePermissionCheck([
    UserPermission.Admin,
    UserPermission.Moderator,
    UserPermission.ClubMember,
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
      <PageTitle title='マイページ' />
      {isLoggedIn && (
        <>
          <LargeUserInfo user={user!} />
          <div className='py-4'>
            {showNewClub && (
              <section className='mb-2'>
                <h2 className='text-xl'>所属している部活動</h2>
                <BelongClubList />
              </section>
            )}
            <section className='mb-2'>
              <h2 className='text-xl'>管理</h2>
              <div className='grid grid-cols-cards col-auto md:gap-4 gap-1'>
                {showModeration && (
                  <Link href='/admin/moderation' passHref>
                    <ContentCard
                      title='承認待ちの活動'
                      description={`${
                        moderationInfo?.getClubs.count ?? 0
                      }件の承認待ちがあります`}
                    />
                  </Link>
                )}
                {showNewClub && (
                  <Link href='/new/club' passHref>
                    <ContentCard
                      title='新しい部活を作成'
                      description='新しい部活動を作成し，公開することができます．'
                    />
                  </Link>
                )}
                {showAdmin && (
                  <>
                    <Link href='/admin/moderation?all=1' passHref>
                      <ContentCard title='全ての活動' />
                    </Link>
                    <Link href='/admin/users' passHref>
                      <ContentCard title='利用者情報' />
                    </Link>
                  </>
                )}
              </div>
            </section>
          </div>
        </>
      )}
    </AppContainer>
  );
};

export default MypageIndex;
