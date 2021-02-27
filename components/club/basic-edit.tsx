import { Field } from 'formik';
import { ClubBasicFragment } from '../../api/generated';
import { ClubImageUploadField } from '../assets/club-image-upload';
import { TextArea, TextBox } from '../ui/input';

type Props = {
  clubId: string;
  currentClub: ClubBasicFragment;
};
export const BasicEditFormFields = ({ clubId, currentClub }: Props) => {
  return (
    <div className='py-2 flex flex-row'>
      <ClubImageUploadField
        name='thumbImageId'
        containerClassName='w-24 h-24'
        initialAsset={currentClub.thumbImage ?? undefined}
        clubId={clubId}
        allowEmpty
      />
      <div className='pl-2 w-full'>
        <label htmlFor='name'>部活名</label>
        <Field
          as={TextBox}
          name='name'
          placeholder='部活名'
          className='text-lg text-blue-light w-full'
        />
        <label htmlFor='shortDescription'>短い説明</label>
        <Field
          as={TextArea}
          name='shortDescription'
          placeholder='短い説明'
          className='text-gray-700 my-1 w-full'
        />
      </div>
    </div>
  );
};
