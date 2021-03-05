import React from 'react';
import { UserInfoFragment, UserPermission } from '../../api/generated';
import { PageTitle } from '../../components/title';
import { AppContainer } from '../../components/ui/container';
import { SectionTitle } from '../../components/ui/section-title';
import { UserEditDialog } from '../../components/user/edit-dialog';
import { UserFinder } from '../../components/user/user-finder';
import { useAutoRedirect, usePermissionCheck } from '../../utils/use-user';

const AdminUsersList = () => {
  useAutoRedirect();

  const hasPermission = usePermissionCheck([UserPermission.Admin]);

  const [selectedUser, setSelectedUser] = React.useState<
    UserInfoFragment | undefined
  >(undefined);

  const handleClose = React.useCallback(() => setSelectedUser(undefined), []);

  if (!hasPermission) {
    return (
      <AppContainer>
        <p>Not allowed</p>
      </AppContainer>
    );
  }
  return (
    <AppContainer>
      <PageTitle title='ユーザー一覧' />
      <SectionTitle>ユーザー一覧</SectionTitle>
      <UserFinder onSelect={setSelectedUser} />
      <UserEditDialog
        targetUser={selectedUser}
        open={!!selectedUser}
        onClose={handleClose}
      />
    </AppContainer>
  );
};

export default AdminUsersList;
