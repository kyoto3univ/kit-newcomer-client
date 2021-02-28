import { useRouter } from 'next/router';
import React from 'react';
import { useGetClubDetailsQuery, UserPermission } from '../../../api/generated';
import { ClubContentEditForm } from '../../../components/club/edit-form';
import { AppContainer } from '../../../components/ui/container';
import { Loading } from '../../../components/ui/loading';
import { SectionTitle } from '../../../components/ui/section-title';
import { Tab, TabItem } from '../../../components/ui/tabs';
import {
  useAutoRedirect,
  usePermissionCheck,
  useUser,
} from '../../../utils/use-user';

const ClubEdit = () => {
  const { isLoading, isLoggedIn } = useUser();
  const hasPermission = usePermissionCheck([
    UserPermission.Admin,
    UserPermission.Moderator,
    UserPermission.ClubMember,
  ]);
  const { query } = useRouter();
  const { data, isSuccess } = useGetClubDetailsQuery(
    {
      id: query.id as string,
    },
    {
      enabled: !isLoading && hasPermission,
    },
  );
  const [activeSection, setActiveSection] = React.useState<
    'general' | 'members'
  >('general');

  useAutoRedirect();

  if (isLoading) {
    return (
      <AppContainer>
        <Loading />
      </AppContainer>
    );
  }

  if (isLoggedIn && !hasPermission) {
    return (
      <AppContainer>
        <p>Not allowed</p>
      </AppContainer>
    );
  }

  if (!isSuccess) {
    return (
      <AppContainer>
        <p>Error</p>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <SectionTitle>{data!.club.name}の編集</SectionTitle>
      <Tab>
        <TabItem
          active={activeSection === 'general'}
          onClick={() => setActiveSection('general')}
        >
          部活情報
        </TabItem>
        <TabItem
          active={activeSection === 'members'}
          onClick={() => setActiveSection('members')}
        >
          部員編集
        </TabItem>
      </Tab>
      {activeSection === 'general' ? (
        <ClubContentEditForm club={data!.club} />
      ) : (
        <div></div>
      )}
    </AppContainer>
  );
};

export default ClubEdit;
