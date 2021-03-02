import React from 'react';
import {
  ClubBasicFragment,
  ClubEditLevel,
  ClubMemberOnlyFragment,
  useAddUserToClubMutation,
  UserInfoFragment,
} from '../../api/generated';
import { useUser } from '../../utils/use-user';
import { Button } from '../ui/button';
import { UserFinder } from '../user/user-finder';
import { MemberItem } from './member-item';

type Props = {
  club: ClubMemberOnlyFragment & ClubBasicFragment;
  refetch: () => void;
};
export const ClubMembersEditForm = ({ club, refetch }: Props) => {
  const [isUserFinderOpen, setIsUserFinderOpen] = React.useState(false);
  const { mutateAsync, isLoading: isAdding } = useAddUserToClubMutation();
  const { user } = useUser();
  const handleAddClick = React.useCallback(() => setIsUserFinderOpen(true), []);
  const handleDismiss = React.useCallback(() => setIsUserFinderOpen(false), []);
  const handleAddUser = React.useCallback(async (user: UserInfoFragment) => {
    await mutateAsync({
      clubId: club.id,
      userId: user.id,
    });
    refetch();
    setIsUserFinderOpen(false);
  }, []);
  const currentLevel = React.useMemo(() => {
    return club.members.find((item) => item.user.id === user?.id)?.level;
  }, [user, club.members]);

  return (
    <div>
      <div>
        {club.members.map((member) => {
          return (
            <MemberItem
              key={member.user.id}
              {...member}
              clubId={club.id}
              refetch={refetch}
              currentLevel={currentLevel}
            />
          );
        })}
      </div>
      {currentLevel === ClubEditLevel.Owner && (
        <>
          <Button onClick={handleAddClick} loading={isAdding}>
            追加
          </Button>
          <UserFinder
            open={isUserFinderOpen}
            onDismiss={handleDismiss}
            onSelect={handleAddUser}
          />
        </>
      )}
    </div>
  );
};
