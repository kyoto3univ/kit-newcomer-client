import React from 'react';
import {
  ClubDetailFragment,
  ClubEditLevel,
  ClubModerationState,
  useRequestModerationMutation,
  useSetClubPublishMutation,
} from '../../api/generated';
import { useClubEditable } from '../../utils/modify-check';
import { Alert } from '../ui/alert';
import { Button } from '../ui/button';

type Props = {
  club: ClubDetailFragment;
  refetch: () => void;
};

export const ClubModerationForm = ({ club, refetch }: Props) => {
  const isRequestable = useClubEditable(club, [ClubEditLevel.Owner]);

  const {
    mutateAsync: requestModeration,
    isLoading: isRequestingModeration,
  } = useRequestModerationMutation();
  const {
    mutateAsync: setPublish,
    isLoading: isSettingPublish,
  } = useSetClubPublishMutation();
  const handleRequest = React.useCallback(async () => {
    await requestModeration({ id: club.id });
    refetch();
  }, []);
  const handlePublish = React.useCallback(async () => {
    await setPublish({ id: club.id, published: true });
    refetch();
  }, []);
  const handleUnpublish = React.useCallback(async () => {
    await setPublish({ id: club.id, published: false });
    refetch();
  }, []);

  const isLoading = React.useMemo(() => {
    return isRequestingModeration || isSettingPublish;
  }, [isRequestingModeration, isSettingPublish]);

  if (club.isPublished) {
    return (
      <Alert>
        この活動は公開済みです．
        {isRequestable && (
          <Button
            loading={isLoading}
            disabled={isLoading}
            onClick={handleUnpublish}
          >
            非公開にする
          </Button>
        )}
      </Alert>
    );
  }

  if (club.moderationState === ClubModerationState.NotAccepted) {
    return (
      <Alert>
        この活動はまだ管理者に掲載承認されていません．説明や画像を追加したらリクエストしてください
        {isRequestable && (
          <Button
            loading={isLoading}
            disabled={isLoading}
            onClick={handleRequest}
          >
            掲載をリクエスト
          </Button>
        )}
      </Alert>
    );
  } else if (club.moderationState === ClubModerationState.Waiting) {
    return <Alert>掲載承認依頼済みです．お待ちください</Alert>;
  } else if (club.moderationState === ClubModerationState.Rejected) {
    return (
      <Alert>
        掲載が拒否されました．
        {isRequestable && (
          <Button
            loading={isLoading}
            disabled={isLoading}
            onClick={handleRequest}
          >
            掲載を再度リクエスト
          </Button>
        )}
      </Alert>
    );
  } else if (club.moderationState === ClubModerationState.Accepted) {
    return (
      <Alert>
        掲載が承認されました！活動を公開できます！
        {isRequestable && (
          <Button
            loading={isLoading}
            disabled={isLoading}
            onClick={handlePublish}
          >
            公開する
          </Button>
        )}
      </Alert>
    );
  } else {
    return null;
  }
};
