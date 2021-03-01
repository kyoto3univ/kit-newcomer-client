import Dialog from '@reach/dialog';
import React from 'react';
import {
  useGetUsersQuery,
  UserInfoFragment,
  UserPermission,
} from '../../api/generated';
import { Pager } from '../ui/pager';
import { SectionTitle } from '../ui/section-title';
import { Avatar } from './avatar';

type Props = {
  leastPermission?: UserPermission;
  open?: boolean;
  onSelect?: (user: UserInfoFragment) => void;
};
export const UserFinder = ({ leastPermission, open, onSelect }: Props) => {
  const [page, setPage] = React.useState(0);
  const { isLoading, isError, data } = useGetUsersQuery(
    {
      leastPermission,
      offset: page * 10,
      limit: 10,
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  return (
    <Dialog isOpen={open} aria-labelledby='Select'>
      <SectionTitle>ユーザー選択</SectionTitle>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {data && (
        <div className='my-1'>
          {data.getUsers.items.map((item) => (
            <UserListItem key={item.id} user={item} onSelect={onSelect} />
          ))}
          <Pager
            total={Math.ceil(data.getUsers.count / 10)}
            current={page}
            onChange={(page) => setPage(page)}
          />
        </div>
      )}
    </Dialog>
  );
};

const UserListItem = ({
  user,
  onSelect,
}: {
  user: UserInfoFragment;
  onSelect?: (user: UserInfoFragment) => void;
}) => {
  const handleSelect = React.useCallback(() => {
    onSelect && onSelect(user);
  }, [user, onSelect]);

  return (
    <div
      className='flex items-center hover:bg-gray-300 py-1 px-2 cursor-pointer'
      onClick={handleSelect}
    >
      {user.icon && <Avatar ringColor='blue' icon={user.icon} />}
      <div className='ml-3'>
        <h3>
          {user.name}
          <span className='border rounded bg-gray-100 ml-2 px-1'>
            {user.permission}
          </span>
        </h3>
        <span className='text-sm text-gray-500'>{user.screenName}</span>
      </div>
    </div>
  );
};
