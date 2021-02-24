import clsx from 'clsx';
import React from 'react';
import { AssetBasicFragment } from '../../api/generated';
import { AssetSelectDialog } from './select-dialog';

type Props = {
  currentAsset?: AssetBasicFragment;
  onAssetUpdate: (asset: AssetBasicFragment) => void;
  placeholderClassName?: string;
  imageClassName?: string;
  containerClassName?: string;
};
export const ClubImageUpload = ({
  currentAsset,
  onAssetUpdate,
  placeholderClassName,
  imageClassName,
  containerClassName,
}: Props) => {
  const [isUploadDialogShown, setUploadDialogShown] = React.useState(false);
  const handleSelectClick = React.useCallback(() => {
    setUploadDialogShown(true);
  }, []);
  return (
    <>
      <div
        className={clsx(
          'border hover:border-gray-300 cursor-pointer bg-gray-100',
          containerClassName,
        )}
        onClick={handleSelectClick}
      >
        {currentAsset ? (
          <img
            src={currentAsset.filePath}
            alt={currentAsset.alternativeDescription ?? 'IMAGE'}
            className={imageClassName}
          />
        ) : (
          <div className={clsx('w-full text-center', placeholderClassName)}>
            画像を追加
          </div>
        )}
      </div>
      <AssetSelectDialog
        open={isUploadDialogShown}
        onAssetUpdate={onAssetUpdate}
      />
    </>
  );
};
