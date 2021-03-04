import Dialog from '@reach/dialog';
import React from 'react';
import { useQueryClient } from 'react-query';
import {
  useChangeUserPermissionMutation,
  UserInfoFragment,
  UserPermission,
} from '../../api/generated';
import { useUser } from '../../utils/use-user';
import { Button } from '../ui/button';
import { SectionTitle } from '../ui/section-title';

type Props = {
  targetUser?: UserInfoFragment;
  open?: boolean;
  onClose?: () => void;
};
export const UserEditDialog = ({ targetUser, open, onClose }: Props) => {
  const { user } = useUser();
  const {
    mutateAsync: changePermission,
    isLoading: isChangingPermission,
  } = useChangeUserPermissionMutation();
  const queryClient = useQueryClient();
  const [
    updatedPermission,
    setUpdatedPermission,
  ] = React.useState<UserPermission | null>(null);
  const handleChangePermission = React.useCallback(
    async (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (!targetUser) return;

      const perm = e.target.value as UserPermission;
      await changePermission({
        userId: targetUser.id,
        permission: perm,
      });

      setUpdatedPermission(perm);
      queryClient.invalidateQueries('getUsers');
    },
    [targetUser],
  );

  return (
    <Dialog isOpen={open} aria-labelledby='Select' onDismiss={onClose}>
      <SectionTitle>ユーザー変更</SectionTitle>
      {user?.id === targetUser?.id || !targetUser ? (
        <p>変更できません</p>
      ) : (
        <div className='my-2'>
          <label>ユーザーの権限</label>
          <select
            value={updatedPermission ?? targetUser.permission}
            onChange={handleChangePermission}
            disabled={isChangingPermission}
          >
            {Object.values(UserPermission).map((perm) => (
              <option key={perm} value={perm}>
                {perm}
              </option>
            ))}
          </select>
        </div>
      )}
      <hr />
      <Button onClick={onClose}>閉じる</Button>
    </Dialog>
  );
};
