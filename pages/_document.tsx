import Document, { Head, Html, Main, NextScript } from 'next/document';
import { GALoader } from '../components/gtag';

export default class MyDocument extends Document {
  public render() {
    return (
      <Html lang='ja'>
        <Head />
        <body>
          <Main />
          <NextScript />
          <GALoader />
        </body>
      </Html>
    );
  }
}
