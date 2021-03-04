import Dialog from '@reach/dialog';
import React from 'react';
import { SectionTitle } from '../ui/section-title';
import { UserFinder } from './user-finder';

type Props = {
  open?: boolean;
  onDismiss?: () => void;
} & React.ComponentProps<typeof UserFinder>;
export const UserFinderDialog = ({ open, onDismiss, ...props }: Props) => {
  return (
    <Dialog isOpen={open} aria-labelledby='Select' onDismiss={onDismiss}>
      <SectionTitle>ユーザー選択</SectionTitle>
      <UserFinder {...props} />
    </Dialog>
  );
};
