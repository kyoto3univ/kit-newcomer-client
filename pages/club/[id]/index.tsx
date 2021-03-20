import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { fetchGQL } from '../../../api/fetcher';
import {
  ClubTopImageType,
  GetClubBasicForIsrDocument,
  GetClubBasicForIsrQuery,
  GetClubBasicForIsrQueryVariables,
  useGetClubDetailsQuery,
} from '../../../api/generated';
import { ClubAdminModerationForm } from '../../../components/club/admin-moderation-form';
import { MdRenderer } from '../../../components/club/markdown/md-render';
import { ClubTopImage } from '../../../components/club/top-image';
import { ClubTopYouTube } from '../../../components/club/top-youtube';
import { PageTitle } from '../../../components/title';
import { Alert } from '../../../components/ui/alert';
import { TextAutoLink } from '../../../components/ui/auto-link';
import { Button } from '../../../components/ui/button';
import { AppContainer } from '../../../components/ui/container';
import { LinkList } from '../../../components/ui/link-list';
import { Loading } from '../../../components/ui/loading';
import { SectionTitle } from '../../../components/ui/section-title';
import { assetPath } from '../../../utils/asset';
import { useIsMember } from '../../../utils/modify-check';

const ClubDetailPage = () => {
  const { query } = useRouter();
  const { data, isLoading, isError, refetch } = useGetClubDetailsQuery(
    {
      id: query.id as string,
    },
    { enabled: !!query.id },
  );
  const { data: isrData } = useQuery<GetClubBasicForIsrQuery>([
    'getClubBasicForIsr',
    {
      id: query.id as string,
    },
  ]);
  const isMember = useIsMember(data?.club);

  if (isLoading) {
    return (
      <AppContainer>
        {isrData && (
          <PageTitle
            title={isrData.club.name}
            description={isrData.club.shortDescription}
            largeImage={
              isrData.club.topImage ? assetPath(isrData.club.topImage) : null
            }
            smallImage={
              isrData.club.thumbImage
                ? assetPath(isrData.club.thumbImage)
                : null
            }
          />
        )}
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
            <dd className='pl-8 whitespace-pre-wrap'>
              <TextAutoLink content={data.club.joinDescription} />
            </dd>
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
              <LinkList content={data.club.contactUrl} />
            </dd>
          </>
        )}
      </dl>
      <ClubAdminModerationForm club={data.club} refetch={refetch} />
    </AppContainer>
  );
};

export default ClubDetailPage;

export const getStaticProps: GetStaticProps<
  { dehydratedState: unknown },
  { id: string }
> = async (props) => {
  if (!props.params?.id) return { props: { dehydratedState: {} } };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ['getClubBasicForIsr', { id: props.params?.id }],
    fetchGQL<GetClubBasicForIsrQuery, GetClubBasicForIsrQueryVariables>(
      GetClubBasicForIsrDocument,
      { id: props.params?.id },
    ),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
