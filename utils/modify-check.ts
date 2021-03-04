import React from 'react';
import {
  ClubEditLevel,
  ClubMemberOnlyFragment,
  UserPermission,
} from '../api/generated';
import { usePermissionCheck, useUser } from './use-user';

export const useClubEditable = (
  club?: ClubMemberOnlyFragment,
  levels = [ClubEditLevel.Editor, ClubEditLevel.Owner],
) => {
  const enforcePerm = useIsModerator();
  const isMember = useIsMember(club, levels);
  const isEditable = enforcePerm || isMember;

  return isEditable;
};

export const useIsMember = (
  club?: ClubMemberOnlyFragment,
  levels = [ClubEditLevel.Editor, ClubEditLevel.Owner],
) => {
  const { user } = useUser();
  const isMember = React.useMemo(() => {
    const currentLevel = club?.members.find((item) => item.user.id === user?.id)
      ?.level;
    return currentLevel && levels.includes(currentLevel);
  }, [user, club?.members]);

  return isMember;
};

export const useIsModerator = () =>
  usePermissionCheck([UserPermission.Admin, UserPermission.Moderator]);
