import React from 'react';
import { useGetAuthorizeInfoMutation } from '../../api/generated';
import { AppHeader } from '../../components/app-header';
import { Button } from '../../components/ui/button';
import { AppContainer } from '../../components/ui/container';
import { SectionTitle } from '../../components/ui/section-title';

const Login = () => {
  const { mutate, data, isSuccess, isLoading } = useGetAuthorizeInfoMutation();
  const handleLoginClick = React.useCallback(() => {
    if (!process.browser) return;

    mutate({});
  }, []);

  React.useEffect(() => {
    if (isSuccess && data) {
      const {
        requestToken,
        requestTokenSecret,
        callbackUrl,
      } = data.getAuthorizeInfo;

      localStorage.setItem('requestToken', requestToken);
      localStorage.setItem('requestTokenSecret', requestTokenSecret);

      location.href = callbackUrl;
    }
  }, [data, isSuccess]);

  return (
    <div>
      <AppHeader />
      <AppContainer>
        <SectionTitle>ログイン</SectionTitle>
        <Button
          loading={isLoading}
          disabled={isLoading || isSuccess}
          onClick={handleLoginClick}
        >
          Login with twitter
        </Button>
      </AppContainer>
    </div>
  );
};

export default Login;
