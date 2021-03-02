import React from 'react';
import {
  ClubEditLevel,
  useChangeUserLevelMutation,
  useDeleteUserFromClubMutation,
  UserInfoFragment,
} from '../../api/generated';
import { useUser } from '../../utils/use-user';
import { Button } from '../ui/button';
import { Avatar } from '../user/avatar';

type Props = {
  user: UserInfoFragment;
  level: ClubEditLevel;
  refetch: () => void;
  clubId: string;
  currentLevel?: ClubEditLevel;
};
export const MemberItem = ({
  user,
  level,
  clubId,
  refetch,
  currentLevel,
}: Props) => {
  const { user: currentUser } = useUser();
  const { mutateAsync: deleteUser } = useDeleteUserFromClubMutation();
  const { mutateAsync: changeUserLevel } = useChangeUserLevelMutation();

  const handleLevelChange = React.useCallback(
    async (e: React.ChangeEvent<HTMLSelectElement>) => {
      await changeUserLevel({
        userId: user.id,
        clubId,
        level: e.target.value as ClubEditLevel,
      });
      refetch();
    },
    [],
  );
  const handleDelete = React.useCallback(async () => {
    await deleteUser({
      userId: user.id,
      clubId,
    });
    refetch();
  }, []);

  return (
    <div className='flex justify-between'>
      <div className='flex items-center'>
        {user.icon && <Avatar ringColor='blue' icon={user.icon} />}
        <div className='ml-3'>
          <h3>
            {user.name}
            <span className='border rounded bg-gray-300 ml-2 px-1'>
              {level}
            </span>
          </h3>
          <span className='text-sm text-gray-500'>{user.screenName}</span>
        </div>
      </div>
      {user.id != currentUser?.id && currentLevel === ClubEditLevel.Owner && (
        <div>
          <select value={level} onChange={handleLevelChange}>
            {Object.values(ClubEditLevel).map((perm) => (
              <option key={perm} value={perm}>
                {perm}
              </option>
            ))}
          </select>
          <Button onClick={handleDelete}>削除</Button>
        </div>
      )}
    </div>
  );
};
