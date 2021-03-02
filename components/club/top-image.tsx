import { AssetDetailsFragment } from '../../api/generated';
import { assetPath } from '../../utils/asset';

type Props = {
  asset: AssetDetailsFragment;
};
export const TopImage = ({ asset }: Props) => {
  return (
    <div className='flex justify-center py-2'>
      <img
        src={assetPath(asset)}
        alt={asset.alternativeDescription ?? ''}
        className='md:w-7/12 sm:w-11/12 w-full'
      />
    </div>
  );
};
