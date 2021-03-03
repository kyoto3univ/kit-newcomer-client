import Link from 'next/link';
import { AppContainer } from '../components/ui/container';
import { ContentCard } from '../components/ui/content-card';

const Index = () => {
  return (
    <AppContainer>
      <div className='grid grid-cols-cards col-auto gap-4 items-center justify-around'>
        <Link href='/club' passHref>
          <ContentCard
            title='部活動紹介'
            description='KITの部活動を紹介します'
          />
        </Link>
      </div>
    </AppContainer>
  );
};

export default Index;
