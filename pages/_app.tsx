import { AppProps } from 'next/app';
import '../styles/base.css';

export default ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};
