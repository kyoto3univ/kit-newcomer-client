import Head from 'next/head';
import React from 'react';

type Props = {
  title: string;
  largeImage?: string | null;
  smallImage?: string | null;
  description?: string | null;
};
export const PageTitle = ({
  title,
  description,
  largeImage,
  smallImage,
}: Props) => {
  const image = largeImage ?? smallImage;
  return (
    <Head>
      <meta property='og:type' content='website' />
      <meta name='twitter:site' content='@f0reachKIT' />
      <meta name='twitter:creator' content='@f0reachKIT' />
      <meta name='twitter:title' content={title} />
      <meta
        name='twitter:card'
        content={largeImage ?? smallImage ? 'summary_large_image' : 'summary'}
      />
      <meta property='og:site_name' content='KIT新入生応援サイト' />
      <meta property='og:locale' content='ja' />
      <meta property='og:title' content={title} />
      {description && (
        <>
          <meta property='og:description' content={description} />
          <meta name='twitter:description' content={description} />
        </>
      )}
      {image && (
        <>
          <meta property='og:image' content={image} />
          <meta name='twitter:image' content={image} />
        </>
      )}
      <link rel='shortcut icon' href='/icon.png' />
      <title>{title} | KIT新入生応援サイト</title>
    </Head>
  );
};
