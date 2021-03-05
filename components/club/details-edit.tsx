import { Field } from 'formik';
import React from 'react';
import { FormikError } from '../ui/formik-error';
import { FormikTextArea, FormikTextBox } from '../ui/formik-input';
import { RadioButton } from '../ui/radio';
import { ClubMarkdownEditorField } from './markdown/md-edit-field';
import { TopImageField } from './top-image-field';

export const DetailsEditFormFields = () => {
  return (
    <div className='py-2 flex flex-col'>
      <div className='flex flex-col items-center'>
        <div className='flex flex-row my-1'>
          <div className='mx-2'>
            <Field
              as={RadioButton}
              name='topContentType'
              value='IMAGE'
              id='topContentType_IMAGE'
              type='radio'
            />
            <label className='pl-2' htmlFor='topContentType_IMAGE'>
              画像
            </label>
          </div>
          <div className='mx-2'>
            <Field
              as={RadioButton}
              name='topContentType'
              value='YOU_TUBE'
              id='topContentType_YOU_TUBE'
              type='radio'
            />
            <label className='pl-2' htmlFor='topContentType_YOU_TUBE'>
              YouTube
            </label>
          </div>
        </div>
        <TopImageField />
      </div>
      <label htmlFor='place'>活動場所</label>
      <Field component={FormikTextBox} name='place' placeholder='○○館' />
      <FormikError name='place' />
      <label htmlFor='schedule'>活動時間</label>
      <Field
        component={FormikTextBox}
        name='schedule'
        placeholder='○曜日○○時～ / 不定期'
      />
      <FormikError name='schedule' />
      <label htmlFor='joinDescription'>入部方法</label>
      <Field
        component={FormikTextArea}
        name='joinDescription'
        placeholder='xxxxxx@edu.kit.ac.jpから連絡する / 代表者ツイッターからDM'
      />
      <FormikError name='joinDescription' />
      <label htmlFor='longDescription'>詳細説明</label>
      <ClubMarkdownEditorField name='longDescription' />
      <FormikError name='longDescription' />
      <label htmlFor='contactUrl'>連絡先(URL)</label>
      <Field
        component={FormikTextBox}
        name='contactUrl'
        placeholder='https://twitter.com/○○ / https://peing.net/○○'
      />
      <FormikError name='contactUrl' />
    </div>
  );
};
