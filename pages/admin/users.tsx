import { AppContainer } from '../../components/ui/container';
import { SectionTitle } from '../../components/ui/section-title';
import { UserFinder } from '../../components/user/user-finder';

const AdminUsersList = () => {
  return (
    <AppContainer>
      <SectionTitle>ユーザー一覧</SectionTitle>
      <UserFinder />
    </AppContainer>
  );
};

export default AdminUsersList;
