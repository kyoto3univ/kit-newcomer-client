import { useRouter } from 'next/router';
import React from 'react';
import { useGetAuthorizeInfoMutation } from '../../api/generated';
import { PageTitle } from '../../components/title';
import { Button } from '../../components/ui/button';
import { AppContainer } from '../../components/ui/container';
import { SectionTitle } from '../../components/ui/section-title';
import { useUser } from '../../utils/use-user';

const Login = () => {
  const { mutateAsync, isSuccess, isLoading } = useGetAuthorizeInfoMutation();
  const { canBeLoggedIn, isLoggedIn } = useUser();
  const { replace } = useRouter();
  const handleLoginClick = React.useCallback(() => {
    if (!process.browser) return;

    mutateAsync({}).then((response) => {
      const {
        requestToken,
        requestTokenSecret,
        callbackUrl,
      } = response.getAuthorizeInfo;

      localStorage.setItem('requestToken', requestToken);
      localStorage.setItem('requestTokenSecret', requestTokenSecret);

      location.href = callbackUrl;
    });
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      replace('/');
    }
  }, [isLoggedIn]);

  return (
    <div>
      <AppContainer>
        <PageTitle title='ログイン' />
        <SectionTitle>ログイン</SectionTitle>
        <p>
          Twitterアカウントでログインすることで，部活動を作成することができます．
          他にもお気に入りなどの便利機能を使えるようになる予定です．
        </p>
        <Button
          loading={isLoading}
          disabled={isLoading || isSuccess || canBeLoggedIn || isLoggedIn}
          onClick={handleLoginClick}
        >
          Login with twitter
        </Button>
      </AppContainer>
    </div>
  );
};

export default Login;
