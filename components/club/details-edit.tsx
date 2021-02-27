import { Field } from 'formik';
import React from 'react';
import { ClubDetailFragment } from '../../api/generated';
import { ClubImageUploadField } from '../assets/club-image-upload';
import { FormikError } from '../ui/formik-error';
import { FormikTextArea, FormikTextBox } from '../ui/formik-input';

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
      <Field component={FormikTextBox} name='place' />
      <FormikError name='place' />
      <label htmlFor='schedule'>活動時間</label>
      <Field component={FormikTextBox} name='schedule' />
      <FormikError name='schedule' />
      <label htmlFor='joinDescription'>入部方法</label>
      <Field component={FormikTextArea} name='joinDescription' />
      <FormikError name='joinDescription' />
      <label htmlFor='longDescription'>詳細解説</label>
      <Field component={FormikTextArea} name='longDescription' rows={10} />
      <FormikError name='longDescription' />
      <label htmlFor='contactUrl'>連絡先(URL)</label>
      <Field component={FormikTextBox} name='contactUrl' />
      <FormikError name='contactUrl' />
    </div>
  );
};
