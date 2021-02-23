import { AppProps } from 'next/app';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppHeader } from '../components/app-header';

import '../styles/base.css';

const App = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = React.useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <AppHeader />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default App;
