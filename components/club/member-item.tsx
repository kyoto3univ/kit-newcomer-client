import { ClubEditLevel, UserInfoFragment } from '../../api/generated';
import { Avatar } from '../user/avatar';

type Props = {
  user: UserInfoFragment;
  level: ClubEditLevel;
};
export const MemberItem = ({ user, level }: Props) => {
  return (
    <div className='flex justify-between'>
      <div className='flex items-center'>
        {user.icon && <Avatar ringColor='blue' icon={user.icon} />}
        <div className='ml-3'>
          <h3>
            {user.name}
            <span className='border rounded bg-gray-300 ml-2 px-1'>
              {level}
            </span>
          </h3>
          <span className='text-sm text-gray-500'>{user.screenName}</span>
        </div>
      </div>
      <div>
        <a>削除</a>
        <a>通常メンバーに変更</a>
      </div>
    </div>
  );
};
