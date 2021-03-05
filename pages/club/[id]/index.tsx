import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import {
  ClubTopImageType,
  useGetClubDetailsQuery,
} from '../../../api/generated';
import { ClubAdminModerationForm } from '../../../components/club/admin-moderation-form';
import { MdRenderer } from '../../../components/club/markdown/md-render';
import { ClubTopImage } from '../../../components/club/top-image';
import { ClubTopYouTube } from '../../../components/club/top-youtube';
import { PageTitle } from '../../../components/title';
import { Alert } from '../../../components/ui/alert';
import { Button } from '../../../components/ui/button';
import { AppContainer } from '../../../components/ui/container';
import { Loading } from '../../../components/ui/loading';
import { SectionTitle } from '../../../components/ui/section-title';
import { useIsMember } from '../../../utils/modify-check';

const ClubDetailPage = () => {
  const { query } = useRouter();
  const { data, isLoading, isError, refetch } = useGetClubDetailsQuery(
    {
      id: query.id as string,
    },
    { enabled: !!query.id },
  );
  const isMember = useIsMember(data?.club);

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
      <PageTitle title={data.club.name} />
      <SectionTitle>
        {data.club.name}
        {!data.club.isPublished && (
          <span className='border rounded bg-gray-300 text-gray-800 ml-2 px-1'>
            未公開
          </span>
        )}
      </SectionTitle>

      {isMember && (
        <Alert>
          <Link href='/club/[id]/edit' as={`/club/${data.club.id}/edit`}>
            <a>
              <Button>編集する</Button>
            </a>
          </Link>
        </Alert>
      )}
      {data.club.topContentType === ClubTopImageType.Image ? (
        data.club.topImage && <ClubTopImage asset={data.club.topImage} />
      ) : (
        <ClubTopYouTube url={data.club.videoUrl!} />
      )}
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
      <ClubAdminModerationForm club={data.club} refetch={refetch} />
    </AppContainer>
  );
};

export default ClubDetailPage;
