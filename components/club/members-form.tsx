import { FieldArray, Form, Formik } from 'formik';
import React from 'react';
import {
  ClubBasicFragment,
  ClubMemberOnlyFragment,
  useAddUserToClubMutation,
  UserInfoFragment,
} from '../../api/generated';
import { Button } from '../ui/button';
import { UserFinder } from '../user/user-finder';
import { MemberItem } from './member-item';

type Props = {
  club: ClubMemberOnlyFragment & ClubBasicFragment;
  refetch: () => void;
};
export const ClubMembersEditForm = ({ club, refetch }: Props) => {
  const [isUserFinderOpen, setIsUserFinderOpen] = React.useState(false);
  const { mutateAsync, isLoading: isAdding } = useAddUserToClubMutation();
  const handleAddClick = React.useCallback(() => setIsUserFinderOpen(true), []);
  const handleDismiss = React.useCallback(() => setIsUserFinderOpen(false), []);
  const handleAddUser = React.useCallback(async (user: UserInfoFragment) => {
    await mutateAsync({
      clubId: club.id,
      userId: user.id,
    });
    refetch();
    setIsUserFinderOpen(false);
  }, []);

  return (
    <Formik initialValues={{ members: club.members }} onSubmit={() => {}}>
      <Form>
        <FieldArray
          name='members'
          render={(helper) => {
            return (
              <div>
                {helper.form.values.members.map(
                  (member: ClubMemberOnlyFragment['members'][0]) => {
                    return <MemberItem key={member.user.id} {...member} />;
                  },
                )}
              </div>
            );
          }}
        />
        <Button onClick={handleAddClick} loading={isAdding}>
          追加
        </Button>
        <UserFinder
          open={isUserFinderOpen}
          onDismiss={handleDismiss}
          onSelect={handleAddUser}
        />
      </Form>
    </Formik>
  );
};
