import { Dialog } from '@reach/dialog';
import clsx from 'clsx';
import React from 'react';
import {
  AssetBasicFragment,
  useGetAssetsFromClubQuery,
} from '../../api/generated';
import { assetPath } from '../../utils/asset';
import { Button } from '../ui/button';
import { SectionTitle } from '../ui/section-title';
import { AssetUploadArea } from './upload-area';

type Props = {
  onAssetUpdate: (asset: AssetBasicFragment) => void;
  currentAsset?: AssetBasicFragment;
  onDismiss?: () => void;
  open?: boolean;
  clubId: string;
  recommendAspect?: number;
};

export const AssetSelectDialog = ({
  onAssetUpdate,
  onDismiss,
  open,
  clubId,
  currentAsset,
}: Props) => {
  const {
    data: uploadedAssets,
    refetch: refetchAssets,
  } = useGetAssetsFromClubQuery({ clubId, limit: 100 });
  const [selectedAssetId, setSelectedAssetId] = React.useState(
    currentAsset?.id ?? '',
  );

  const handleUpload = React.useCallback((asset: AssetBasicFragment) => {
    refetchAssets();
    setSelectedAssetId(asset.id);
  }, []);

  const handleOk = React.useCallback(() => {
    const asset = uploadedAssets?.getAssetsFromClub.items.find(
      ({ id }) => id === selectedAssetId,
    );
    if (asset) {
      onAssetUpdate(asset);
    } else {
      alert('Internal error');
    }
  }, [selectedAssetId, uploadedAssets]);

  const handleDismiss = React.useCallback(() => {
    setSelectedAssetId(currentAsset?.id ?? '');
    if (onDismiss) onDismiss();
  }, [currentAsset]);

  return (
    <Dialog
      isOpen={open}
      aria-labelledby='Upload image'
      onDismiss={handleDismiss}
    >
      <SectionTitle>画像のアップロード・選択</SectionTitle>
      <AssetUploadArea clubId={clubId} onAssetUpload={handleUpload} />
      <hr />
      <div className='my-2 flex flex-wrap'>
        {uploadedAssets?.getAssetsFromClub.items.map((item) => {
          return (
            <div
              key={item.id}
              className={clsx(
                'm-1 border-2  hover:border-blue-light cursor-pointer',
                {
                  'border-blue': item.id === selectedAssetId,
                  'border-gray-200': item.id !== selectedAssetId,
                },
              )}
              onClick={() => setSelectedAssetId(item.id)}
            >
              <img src={assetPath(item)} className='w-32 h-32 object-contain' />
            </div>
          );
        })}
      </div>
      <hr />
      <Button disabled={selectedAssetId === ''} onClick={handleOk}>
        確定
      </Button>
    </Dialog>
  );
};
