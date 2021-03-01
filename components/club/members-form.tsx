import { FieldArray, Form, Formik } from 'formik';
import React from 'react';
import { ClubMemberOnlyFragment } from '../../api/generated';
import { Button } from '../ui/button';
import { MemberItem } from './member-item';

type Props = {
  club: ClubMemberOnlyFragment;
};
export const ClubMembersEditForm = ({ club }: Props) => {
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
        <Button>追加</Button>
      </Form>
    </Formik>
  );
};
