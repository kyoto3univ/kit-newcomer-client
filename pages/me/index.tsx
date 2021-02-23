import { useRouter } from 'next/router';
import React from 'react';
import { AppContainer } from '../../components/ui/container';
import { LargeUserInfo } from '../../components/user/user-info-lg';
import { useUser } from '../../utils/use-user';

const MypageIndex = () => {
  const { isLoading, isLoggedIn, user } = useUser();
  const { replace } = useRouter();
  React.useEffect(() => {
    if (process.browser && !isLoading && !isLoggedIn) {
      replace('/login');
    }
  }, [isLoading, isLoggedIn]);

  if (isLoading) {
    return (
      <AppContainer>
        <p>Loading</p>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <LargeUserInfo user={user!} />
      <div className='py-4'>
        <h2 className='text-xl'>所属している部活動</h2>
      </div>
    </AppContainer>
  );
};

export default MypageIndex;
