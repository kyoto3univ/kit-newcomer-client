import Link from 'next/link';
import { ClubBasicFragment } from '../../api/generated';
import { assetPath } from '../../utils/asset';

type Props = {
  club: ClubBasicFragment;
  link?: 'edit' | 'view';
};
export const ClubListItem = ({ club, link = 'view' }: Props) => {
  return (
    <Link
      href={link === 'edit' ? '/club/[id]/edit' : '/club/[id]'}
      as={link === 'edit' ? `/club/${club.id}/edit` : `/club/${club.id}`}
      passHref
    >
      <a className='py-2 flex flex-row border-b border-gray-400'>
        {club.thumbImage && (
          <img
            src={assetPath(club.thumbImage)}
            alt={club.thumbImage.alternativeDescription ?? 'Club image'}
            className='w-24 h-24 object-cover'
          />
        )}
        <div className='pl-2'>
          <h2 className='text-lg text-blue-light'>{club.name}</h2>
          {club.shortDescription && (
            <p className='text-gray-700 py-1'>{club.shortDescription}</p>
          )}
        </div>
      </a>
    </Link>
  );
};
