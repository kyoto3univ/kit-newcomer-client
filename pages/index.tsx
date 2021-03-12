import Link from 'next/link';
import React from 'react';
import { PageTitle } from '../components/title';
import { AppContainer } from '../components/ui/container';
import { ContentCard } from '../components/ui/content-card';
import { SectionTitle } from '../components/ui/section-title';

const Index = () => {
  return (
    <AppContainer>
      <PageTitle title='トップページ' />
      <section>
        <SectionTitle>KIT新入生応援サイトとは？</SectionTitle>
        <p className='my-2'>
          昨年度も京都工芸繊維大学の新入生向けに部活動情報などを発信した新入生応援サイトが，
          より高機能になって今年も帰ってきました．
          <br />
          新入生向けの部活動情報を掲載しています！
        </p>
      </section>
      <section>
        <SectionTitle>新入生向け情報をチェックしよう！</SectionTitle>
        <div className='grid grid-cols-cards col-auto gap-4 items-center justify-around'>
          <Link href='/club' passHref>
            <ContentCard
              title='部活・サークル紹介'
              description='京都工芸繊維大学の部活動・サークルを紹介します．'
            />
          </Link>
        </div>
      </section>
    </AppContainer>
  );
};

export default Index;
