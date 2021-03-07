import clsx from 'clsx';
import { FieldHookConfig, useField } from 'formik';
import React from 'react';
import { AssetBasicFragment } from '../../api/generated';
import { assetPath } from '../../utils/asset';
import { AssetSelectDialog } from './select-dialog';

type Props = {
  currentAsset?: AssetBasicFragment;
  onAssetUpdate: (asset: AssetBasicFragment | null) => void;
  placeholderClassName?: string;
  imageClassName?: string;
  containerClassName?: string;
  clubId: string;
  allowEmpty?: boolean;
};
export const ClubImageUpload = ({
  currentAsset,
  onAssetUpdate,
  placeholderClassName,
  imageClassName,
  containerClassName,
  clubId,
  allowEmpty,
}: Props) => {
  const [isUploadDialogShown, setUploadDialogShown] = React.useState(false);
  const handleSelectClick = React.useCallback(() => {
    setUploadDialogShown(true);
  }, []);
  const handleDismiss = React.useCallback(() => {
    setUploadDialogShown(false);
  }, []);
  const handleAssetUpdate = React.useCallback(
    (asset: AssetBasicFragment | null) => {
      setUploadDialogShown(false);
      onAssetUpdate(asset);
    },
    [onAssetUpdate],
  );
  return (
    <>
      <div
        className={clsx(
          'shadow',
          'border',
          'hover:border-blue-light',
          'cursor-pointer',
          'bg-gray-100',
          'flex items-center justify-center',
          containerClassName,
        )}
        onClick={handleSelectClick}
      >
        {currentAsset ? (
          <img
            src={assetPath(currentAsset, 'lthumb')}
            alt={currentAsset.alternativeDescription ?? 'IMAGE'}
            className={clsx(
              'object-contain max-h-full max-w-full',
              imageClassName,
            )}
          />
        ) : (
          <div className={clsx('w-full text-center', placeholderClassName)}>
            画像を追加
          </div>
        )}
      </div>
      <AssetSelectDialog
        open={isUploadDialogShown}
        onAssetUpdate={handleAssetUpdate}
        onDismiss={handleDismiss}
        clubId={clubId}
        allowEmpty={allowEmpty}
        currentAsset={currentAsset}
      />
    </>
  );
};

type FieldProps = Omit<Props, 'currentAsset' | 'onAssetUpdate' | 'clubId'> &
  FieldHookConfig<AssetBasicFragment | null> & {
    onAssetUpdate?: (asset: AssetBasicFragment | null) => void;
  };
export const ClubImageUploadField = (props: FieldProps) => {
  const [{ value }, , { setValue }] = useField<AssetBasicFragment | null>(
    props,
  );
  const [{ value: clubId }] = useField('id');

  const handleAssetUpdate = React.useCallback(
    (asset: AssetBasicFragment | null) => {
      setValue(asset);
      if (props.onAssetUpdate) {
        props.onAssetUpdate(asset);
      }
    },
    [props.onAssetUpdate],
  );

  return (
    <ClubImageUpload
      {...props}
      clubId={clubId}
      currentAsset={value ?? undefined}
      onAssetUpdate={handleAssetUpdate}
    />
  );
};
