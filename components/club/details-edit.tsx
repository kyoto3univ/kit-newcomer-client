import { Field } from 'formik';
import { ClubDetailFragment } from '../../api/generated';
import { ClubImageUploadField } from '../assets/club-image-upload';
import { TextArea, TextBox } from '../ui/input';

type Props = {
  clubId: string;
  currentClub: ClubDetailFragment;
};
export const DetailsEditFormFields = ({ clubId, currentClub }: Props) => {
  return (
    <div className='py-2 flex flex-col'>
      <div className='flex justify-center'>
        <ClubImageUploadField
          containerClassName='md:w-2/5 w-full h-60'
          name='topImageId'
          clubId={clubId}
          initialAsset={currentClub.topImage ?? undefined}
          allowEmpty
        />
      </div>
      <label htmlFor='place'>活動場所</label>
      <Field as={TextBox} name='place' />
      <label htmlFor='schedule'>活動時間</label>
      <Field as={TextBox} name='schedule' />
      <label htmlFor='joinDescription'>入部方法</label>
      <Field as={TextArea} name='joinDescription' />
      <label htmlFor='longDescription'>詳細解説</label>
      <Field as={TextArea} name='longDescription' rows={10} />
      <label htmlFor='contactUrl'>連絡先(URL)</label>
      <Field as={TextBox} name='contactUrl' />
    </div>
  );
};
