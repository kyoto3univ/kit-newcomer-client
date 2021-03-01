import React from 'react';
import { UserInfoFragment } from '../../api/generated';
import { Avatar } from './avatar';

type Props = {
  user: UserInfoFragment;
};
export const UserListItem = ({ user }: Props) => {
  return (
    <div className='flex items-center'>
      {user.icon && <Avatar ringColor='blue' icon={user.icon} />}
      <div className='ml-3'>
        <h3>
          {user.name}
          <span className='border rounded bg-gray-300 ml-2 px-1'>
            {user.permission}
          </span>
        </h3>
        <span className='text-sm text-gray-500'>{user.screenName}</span>
      </div>
    </div>
  );
};
