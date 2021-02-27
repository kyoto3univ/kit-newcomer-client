import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import {
  UpdateClubDto,
  useGetClubDetailsQuery,
  UserPermission,
  useUpdateClubMutation,
} from '../../../api/generated';
import { BasicEditFormFields } from '../../../components/club/basic-edit';
import { DetailsEditFormFields } from '../../../components/club/details-edit';
import { Button } from '../../../components/ui/button';
import { AppContainer } from '../../../components/ui/container';
import { Loading } from '../../../components/ui/loading';
import { SectionTitle } from '../../../components/ui/section-title';
import {
  clubDtoValidator,
  convertClubToForm,
  convertFormToClubDto,
} from '../../../utils/club-dto';
import {
  useAutoRedirect,
  usePermissionCheck,
  useUser,
} from '../../../utils/use-user';

const ClubEdit = () => {
  const { isLoading, isLoggedIn } = useUser();
  const hasPermission = usePermissionCheck([
    UserPermission.Admin,
    UserPermission.Moderator,
    UserPermission.ClubMember,
  ]);
  const { query } = useRouter();
  const { data, isSuccess } = useGetClubDetailsQuery(
    {
      id: query.id as string,
    },
    {
      enabled: !isLoading && hasPermission,
    },
  );
  const { mutate, isLoading: isUpdating } = useUpdateClubMutation();

  const handleSubmit = React.useCallback(
    (values: UpdateClubDto) => {
      const dto = convertFormToClubDto(values);
      mutate({
        id: query.id as string,
        update: dto,
      });
    },
    [query],
  );

  useAutoRedirect();

  if (isLoading) {
    return (
      <AppContainer>
        <Loading />
      </AppContainer>
    );
  }

  if (isLoggedIn && !hasPermission) {
    return (
      <AppContainer>
        <p>Not allowed</p>
      </AppContainer>
    );
  }

  if (!isSuccess) {
    return (
      <AppContainer>
        <p>Error</p>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <SectionTitle>{data!.club.name}の編集</SectionTitle>
      <Formik
        initialValues={convertClubToForm(data!.club)}
        onSubmit={handleSubmit}
        validationSchema={clubDtoValidator}
        validateOnBlur
        validateOnChange
      >
        <Form>
          <BasicEditFormFields
            clubId={data!.club.id}
            currentClub={data!.club}
          />
          <hr />
          <DetailsEditFormFields
            clubId={data!.club.id}
            currentClub={data!.club}
          />
          <hr />
          <Button type='submit' disabled={isUpdating}>
            保存する
          </Button>
        </Form>
      </Formik>
    </AppContainer>
  );
};

export default ClubEdit;
