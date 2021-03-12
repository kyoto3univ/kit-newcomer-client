import Head from 'next/head';
import React from 'react';

type Props = {
  title: string;
};
export const PageTitle = ({ title }: Props) => {
  return (
    <Head>
      <meta property='og:type' content='website' />
      <meta name='twitter:site' content='@f0reachKIT' />
      <meta name='twitter:creator' content='@f0reachKIT' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:card' content='summary' />
      <meta property='og:site_name' content='KIT新入生応援サイト' />
      <meta property='og:locale' content='ja' />
      <meta property='og:title' content={title} />
      <link rel='shortcut icon' href='/icon.png' />
      <title>{title} | KIT新入生応援サイト</title>
    </Head>
  );
};
