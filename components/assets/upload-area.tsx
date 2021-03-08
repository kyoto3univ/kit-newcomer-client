import clsx from 'clsx';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import {
  AssetBasicFragment,
  useUploadAssetMutation,
} from '../../api/generated';
import { Spin } from '../ui/spin';

type Props = {
  onAssetUpload: (asset: AssetBasicFragment) => void;
  clubId: string;
  recommendAspect?: number;
};

export const AssetUploadArea = ({ onAssetUpload, clubId }: Props) => {
  const { mutateAsync: uploadAsset } = useUploadAssetMutation();
  const [isUploading, setUploading] = React.useState(false);

  const handleUpload = React.useCallback((files: File[]) => {
    if (files.length !== 1) {
      alert('One file expected');
      return;
    }

    setUploading(true);

    uploadAsset({
      clubId,
      upload: files[0],
    })
      .then((data) => {
        onAssetUpload(data.uploadAssetFor);
      })
      .catch((e: Error) => {
        alert(e.message ?? 'Unknown error');
      })
      .finally(() => {
        setUploading(false);
      });
  }, []);
  const { getInputProps, getRootProps } = useDropzone({
    onDrop: handleUpload,
    multiple: false,
    disabled: isUploading,
  });

  return (
    <div
      {...getRootProps({
        className: clsx(
          'm-1',
          'border-2',
          'border-dashed',
          'border-gray-300',
          'text-center',
          'p-8 hover:bg-gray-200',
          'hover:border-blue-light',
          'cursor-pointer',
          {
            'bg-gray-300': isUploading,
          },
        ),
      })}
    >
      <input {...getInputProps()} />
      {isUploading ? (
        <span>
          <Spin />
          アップロード中
        </span>
      ) : (
        <span>ここをクリックしてアップロード (JPG, PNG, GIF... / ~ 5MB)</span>
      )}
    </div>
  );
};
