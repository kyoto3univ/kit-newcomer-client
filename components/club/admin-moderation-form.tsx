import React from 'react';
import {
  ClubDetailFragment,
  ClubModerationState,
  useAcceptModerationMutation,
  useRejectModerationMutation,
} from '../../api/generated';
import { useIsModerator } from '../../utils/modify-check';
import { Alert } from '../ui/alert';
import { Button } from '../ui/button';

type Props = {
  club: ClubDetailFragment;
  refetch: () => void;
};

export const ClubAdminModerationForm = ({ club, refetch }: Props) => {
  const isModerator = useIsModerator();

  const {
    mutateAsync: acceptModeration,
    isLoading: isAcceptLoading,
  } = useAcceptModerationMutation();
  const {
    mutateAsync: rejectModeration,
    isLoading: isRejectLoading,
  } = useRejectModerationMutation();

  const handleAccept = React.useCallback(async () => {
    await acceptModeration({ id: club.id });
    refetch();
  }, []);
  const handleReject = React.useCallback(async () => {
    await rejectModeration({ id: club.id });
    refetch();
  }, []);

  const isLoading = React.useMemo(() => {
    return isAcceptLoading || isRejectLoading;
  }, [isAcceptLoading, isRejectLoading]);

  if (!isModerator) return null;

  if (club.moderationState === ClubModerationState.Waiting) {
    return (
      <Alert>
        掲載承認待ちです．
        <Button loading={isLoading} disabled={isLoading} onClick={handleAccept}>
          承認する
        </Button>
        <Button loading={isLoading} disabled={isLoading} onClick={handleReject}>
          拒否する
        </Button>
      </Alert>
    );
  } else {
    return null;
  }
};
