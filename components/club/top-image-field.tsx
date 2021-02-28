import { Field, useField } from 'formik';
import React from 'react';
import { ClubDetailFragment, ClubTopImageType } from '../../api/generated';
import { ClubImageUploadField } from '../assets/club-image-upload';
import { FormikError } from '../ui/formik-error';
import { FormikTextBox } from '../ui/formik-input';

type Props = {
  clubId: string;
  currentClub: ClubDetailFragment;
};
export const TopImageField = ({ clubId, currentClub }: Props) => {
  const [{ value }] = useField<ClubTopImageType>('topContentType');

  return value === ClubTopImageType.Image ? (
    <ClubImageUploadField
      containerClassName='md:w-2/5 w-full h-60'
      name='topImageId'
      clubId={clubId}
      initialAsset={currentClub.topImage ?? undefined}
      allowEmpty
    />
  ) : (
    <div className='w-full flex flex-col'>
      <label htmlFor='videoUrl'>YouTube URL</label>
      <Field component={FormikTextBox} name='videoUrl' />
      <FormikError name='videoUrl' />
    </div>
  );
};
