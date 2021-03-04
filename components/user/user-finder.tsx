import React from 'react';
import {
  useGetUsersQuery,
  UserInfoFragment,
  UserPermission,
} from '../../api/generated';
import { TextBox } from '../ui/input';
import { Pager } from '../ui/pager';
import { Avatar } from './avatar';

type SearchOpts = {
  leastPermission?: UserPermission;
  screenName?: string;
};
type Props = {
  defaultSearch?: SearchOpts;
  onSelect?: (user: UserInfoFragment) => void;
};
export const UserFinder = ({ defaultSearch, onSelect }: Props) => {
  const [page, setPage] = React.useState(0);
  const [search, setSearch] = React.useState(defaultSearch);
  const { isLoading, isError, data } = useGetUsersQuery(
    {
      ...search,
      offset: page * 10,
      limit: 10,
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const handleChangeScreenNameSearch = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSearch: SearchOpts = { ...search, screenName: e.target.value };
      if (newSearch.screenName === '') {
        newSearch.screenName = undefined;
      }
      setSearch(newSearch);
    },
    [search],
  );

  return (
    <div>
      <TextBox
        placeholder='ユーザー名で検索'
        className='w-6/12'
        onChange={handleChangeScreenNameSearch}
      />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {data &&
        (data.getUsers.count === 0 ? (
          <p>No users</p>
        ) : (
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
        ))}
    </div>
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
