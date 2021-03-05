import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { useCreateNewClubMutation, UserPermission } from '../../api/generated';
import { PageTitle } from '../../components/title';
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
      <PageTitle title='新しい部活動の作成' />
      <Formik
        initialValues={{
          name: '',
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <h3 className='text-xl'>部活動作成の流れ</h3>
          <ol className='list-decimal'>
            <li>
              ここから部活動を作成し，説明文や画像を掲載する．
              <br />
              また他のメンバーのアカウントを追加することで，共同編集することもできます．
            </li>
            <li>
              掲載をリクエストする．
              掲載基準に満たない部活動や，情報の不備がなければ承認されます．
            </li>
            <li>承認されれば，好きなタイミングで公開することができます！</li>
          </ol>
          <hr />
          <label htmlFor='name'>部活名</label>
          <Field
            as={TextBox}
            name='name'
            required
            maxLength={32}
            placeholder='Awesome Club activity'
            disabled={isLoading}
            className='w-full'
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
