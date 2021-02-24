import { Dialog, DialogOverlay, DialogContent } from '@reach/dialog';
import React from 'react';
import { AssetBasicFragment } from '../../api/generated';
import { SectionTitle } from '../ui/section-title';

type Props = {
  onAssetUpdate: (asset: AssetBasicFragment) => void;
  open?: boolean;
};
export const AssetSelectDialog = ({ onAssetUpdate, open }: Props) => {
  return (
    <Dialog isOpen={open}>
      <SectionTitle>画像のアップロード・選択</SectionTitle>
    </Dialog>
  );
};
