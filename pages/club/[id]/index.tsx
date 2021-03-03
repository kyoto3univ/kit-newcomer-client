import { useRouter } from 'next/router';
import { useGetClubDetailsQuery } from '../../../api/generated';
import { MdRenderer } from '../../../components/club/markdown/md-render';
import { TopImage } from '../../../components/club/top-image';
import { AppContainer } from '../../../components/ui/container';
import { Loading } from '../../../components/ui/loading';
import { SectionTitle } from '../../../components/ui/section-title';

const ClubDetailPage = () => {
  const { query } = useRouter();
  const { data, isLoading, isError } = useGetClubDetailsQuery(
    {
      id: query.id as string,
    },
    { enabled: !!query.id },
  );

  if (isLoading) {
    return (
      <AppContainer>
        <Loading />
      </AppContainer>
    );
  }

  if (isError || !data) {
    return (
      <AppContainer>
        <p>Error</p>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <SectionTitle>{data.club.name}</SectionTitle>
      {data.club.topImage && <TopImage asset={data.club.topImage} />}
      <dl>
        {data.club.place && (
          <>
            <dt className='font-bold'>活動場所</dt>
            <dd className='pl-8'>{data.club.place}</dd>
          </>
        )}
        {data.club.schedule && (
          <>
            <dt className='font-bold'>活動時間</dt>
            <dd className='pl-8'>{data.club.schedule}</dd>
          </>
        )}
        {data.club.joinDescription && (
          <>
            <dt className='font-bold'>入部方法</dt>
            <dd className='pl-8'>{data.club.joinDescription}</dd>
          </>
        )}
      </dl>
      {data.club.longDescription && (
        <>
          <h3 className='font-bold'>活動案内</h3>
          <MdRenderer content={data.club.longDescription} />
        </>
      )}
      <dl>
        {data.club.contactUrl && (
          <>
            <dt className='font-bold'>連絡先</dt>
            <dd className='pl-8'>
              <a href={data.club.contactUrl}>{data.club.contactUrl}</a>
            </dd>
          </>
        )}
      </dl>
    </AppContainer>
  );
};

export default ClubDetailPage;
