import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { useCreateNewClubMutation, UserPermission } from '../../api/generated';
import { Button } from '../../components/ui/button';
import { AppContainer } from '../../components/ui/container';
import { TextBox } from '../../components/ui/input';
import { Loading } from '../../components/ui/loading';
import { useAutoRedirect, useUser } from '../../utils/use-user';

type FormProps = {
  name: string;
};
const NewClub = () => {
  const { mutateAsync, isLoading } = useCreateNewClubMutation();
  const { isLoading: isUserLoading, isLoggedIn, user } = useUser();
  const { push } = useRouter();

  const handleSubmit = React.useCallback((values: FormProps) => {
    mutateAsync({ name: values.name }).then(({ createNewClub }) => {
      push('/club/[id]/edit', `/club/${createNewClub.id}/edit`);
    });
  }, []);

  useAutoRedirect();

  if (isUserLoading) {
    return (
      <AppContainer>
        <Loading />
      </AppContainer>
    );
  }

  if (
    !isLoggedIn ||
    ![
      UserPermission.Admin,
      UserPermission.ClubMember,
      UserPermission.Moderator,
    ].includes(user!.permission)
  ) {
    return (
      <AppContainer>
        <p>Not allowed operation.</p>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <Formik
        initialValues={{
          name: '',
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <label htmlFor='name'>部活名</label>
          <Field
            as={TextBox}
            name='name'
            required
            maxLength={32}
            placeholder='Awesome Club activity'
            disabled={isLoading}
          ></Field>
          <ErrorMessage name='name' />

          <Button disabled={isLoading} type='submit'>
            作成する
          </Button>
        </Form>
      </Formik>
    </AppContainer>
  );
};

export default NewClub;
