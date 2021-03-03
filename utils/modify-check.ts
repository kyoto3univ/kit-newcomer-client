import React from 'react';
import {
  ClubEditLevel,
  ClubMemberOnlyFragment,
  UserPermission,
} from '../api/generated';
import { usePermissionCheck, useUser } from './use-user';

export const useClubEditable = (
  club: ClubMemberOnlyFragment,
  level = ClubEditLevel.Editor,
) => {
  const { user } = useUser();
  const enforcePerm = useIsModerator();
  const isEditable = React.useMemo(() => {
    return (
      club.members.find((item) => item.user.id === user?.id)?.level === level ||
      enforcePerm
    );
  }, [user, club.members, enforcePerm]);

  return isEditable;
};

export const useIsModerator = () =>
  usePermissionCheck([UserPermission.Admin, UserPermission.Moderator]);
