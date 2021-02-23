import React from 'react';
import { AppContainer } from '../../components/ui/container';
import { Loading } from '../../components/ui/loading';
import { LargeUserInfo } from '../../components/user/user-info-lg';
import { useAutoRedirect, useUser } from '../../utils/use-user';

const MypageIndex = () => {
  const { isLoading, isLoggedIn, user } = useUser();

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
            <h2 className='text-xl'>所属している部活動</h2>
          </div>
        </>
      )}
    </AppContainer>
  );
};

export default MypageIndex;
