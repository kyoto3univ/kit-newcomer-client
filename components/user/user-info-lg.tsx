import React from 'react';
import { UserInfoFragment } from '../../api/generated';
import { Avatar } from './avatar';

type Props = {
  user: UserInfoFragment;
};
export const LargeUserInfo = ({ user }: Props) => {
  return (
    <div className='flex items-center'>
      <Avatar icon={user!.icon || undefined} ringColor='blue' variant='large' />
      <div className='pl-6 flex flex-col'>
        <h2 className='text-2xl text-bold'>{user!.name}</h2>
        <h3 className='text-md text-gray-400'>{user!.screenName}</h3>
      </div>
    </div>
  );
};
