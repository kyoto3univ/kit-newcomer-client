import Head from 'next/head';
import React from 'react';

type Props = {
  title: string;
};
export const PageTitle = ({ title }: Props) => {
  return (
    <Head>
      <title>{title} | KIT新入生応援サイト</title>
    </Head>
  );
};
