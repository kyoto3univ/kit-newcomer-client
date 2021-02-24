import { ClubBasicFragment } from '../../api/generated';

type Props = {
  club: ClubBasicFragment;
};
export const ClubListItem = ({ club }: Props) => {
  return (
    <div className='py-2 flex flex-row'>
      {club.thumbImage && (
        <img
          src={club.thumbImage.filePath}
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
    </div>
  );
};
