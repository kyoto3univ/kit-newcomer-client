import { useRouter } from 'next/router';
import React from 'react';
import { useGetTokenFromTwitterMutation } from '../../api/generated';
import { AppContainer } from '../../components/ui/container';

const LoginCallback = () => {
  const [isNoTokenError, setNoTokenError] = React.useState(false);
  const { mutateAsync, isError } = useGetTokenFromTwitterMutation();
  const { query, replace } = useRouter();
  React.useEffect(() => {
    if (
      typeof query.oauth_token !== 'string' ||
      typeof query.oauth_verifier !== 'string'
    ) {
      return;
    }

    const token = localStorage.getItem('requestToken');
    const tokenSecret = localStorage.getItem('requestTokenSecret');
    if (!tokenSecret || query.oauth_token !== token) {
      setNoTokenError(true);
      return;
    }

    mutateAsync({
      requestToken: query.oauth_token,
      verifier: query.oauth_verifier,
      requestTokenSecret: tokenSecret,
    }).then((response) => {
      const { bearerToken } = response.getBearerFromRequestToken;

      localStorage.setItem('token', bearerToken);
      localStorage.setItem('requestToken', '');
      localStorage.setItem('requestTokenSecret', '');

      replace('/');
    });
  }, [query]);

  if (isNoTokenError) {
    return (
      <AppContainer>
        <p>Error: No token for request mutation</p>
      </AppContainer>
    );
  }

  if (isError) {
    return (
      <AppContainer>
        <p>Error: Server side error</p>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <p>Loading...</p>
    </AppContainer>
  );
};

export default LoginCallback;
