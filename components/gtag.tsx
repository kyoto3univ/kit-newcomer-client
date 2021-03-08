import { Router } from 'next/router';

declare global {
  interface Window {
    gtag(...args: unknown[]): void;
  }
}

const GA_ID = process.env.GA_ID;

const pageview = (url: string) => {
  if (GA_ID && process.browser) {
    // 0.5秒空けることで確実に
    setTimeout(() => {
      window.gtag('config', GA_ID, {
        page_path: url,
      });
      console.log('gtag');
    }, 500);
  }
};

if (process.browser) {
  Router.events.on('routeChangeComplete', (url) => pageview(url));
}

export const GALoader = () => {
  return GA_ID ? (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', {
page_path: window.location.pathname,
});`,
        }}
      />
    </>
  ) : null;
};
