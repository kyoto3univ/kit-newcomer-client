import { Field, useField } from 'formik';
import React from 'react';
import { ClubTopImageType } from '../../api/generated';
import { ClubImageUploadField } from '../assets/club-image-upload';
import { FormikError } from '../ui/formik-error';
import { FormikTextBox } from '../ui/formik-input';

export const TopImageField = () => {
  const [{ value }] = useField<ClubTopImageType>('topContentType');

  return value === ClubTopImageType.Image ? (
    <ClubImageUploadField
      containerClassName='md:w-2/5 w-full h-60'
      name='topImage'
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
