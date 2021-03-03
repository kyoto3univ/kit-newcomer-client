import React from 'react';
import {
  ClubEditLevel,
  ClubMemberOnlyFragment,
  UserPermission,
} from '../api/generated';
import { usePermissionCheck, useUser } from './use-user';

export const useClubEditable = (
  club: ClubMemberOnlyFragment,
  levels = [ClubEditLevel.Editor],
) => {
  const { user } = useUser();
  const enforcePerm = useIsModerator();
  const isEditable = React.useMemo(() => {
    const currentLevel = club.members.find((item) => item.user.id === user?.id)
      ?.level;
    return (currentLevel && levels.includes(currentLevel)) || enforcePerm;
  }, [user, club.members, enforcePerm]);

  return isEditable;
};

export const useIsModerator = () =>
  usePermissionCheck([UserPermission.Admin, UserPermission.Moderator]);
