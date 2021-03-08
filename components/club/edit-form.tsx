import { Form, Formik, useFormikContext } from 'formik';
import Link from 'next/link';
import React from 'react';
import { ClubDetailFragment, useUpdateClubMutation } from '../../api/generated';
import {
  clubDtoValidator,
  convertClubToForm,
  convertFormToClubDto,
} from '../../utils/club-dto';
import { Button } from '../ui/button';
import { BasicEditFormFields } from './basic-edit';
import { DetailsEditFormFields } from './details-edit';

type Props = {
  club: ClubDetailFragment;
};

const Submit = () => {
  const { isSubmitting, isValid } = useFormikContext();

  return (
    <Button
      type='submit'
      disabled={isSubmitting || !isValid}
      loading={isSubmitting}
    >
      保存する
    </Button>
  );
};

export const ClubContentEditForm = ({ club }: Props) => {
  const { mutateAsync } = useUpdateClubMutation();

  const handleSubmit = React.useCallback(
    async function (values: ClubDetailFragment) {
      const dto = convertFormToClubDto(values);
      await mutateAsync({
        id: club.id,
        update: dto,
      });
    },
    [club],
  );
  return (
    <Formik
      initialValues={convertClubToForm(club)}
      onSubmit={handleSubmit}
      validationSchema={clubDtoValidator}
      validateOnBlur
      validateOnChange
    >
      <Form>
        <BasicEditFormFields />
        <hr />
        <DetailsEditFormFields />
        <hr />
        <Submit />
        <Link href='/club/[id]' as={`/club/${club.id}`} passHref>
          <a className='pl-4 text-blue-light hover:text-blue hover:underline'>
            プレビュー
          </a>
        </Link>
      </Form>
    </Formik>
  );
};
