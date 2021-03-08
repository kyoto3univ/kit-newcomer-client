import Link from 'next/link';
import { useUser } from '../utils/use-user';
import { Spin } from './ui/spin';
import { Avatar } from './user/avatar';
export const AppHeader = () => {
  const { isLoggedIn, isLoading, user } = useUser();
  return (
    <div className='bg-blue w-full'>
      <div className='container mx-auto text-white flex items-center justify-between md:px-2 px-1'>
        <Link href='/' passHref>
          <a className='md:text-2xl text-xl py-3'>新入生応援サイト</a>
        </Link>
        {isLoading ? (
          <Spin />
        ) : isLoggedIn ? (
          <Link href='/me' passHref>
            <a className='text-white flex items-center' href='#'>
              <Avatar icon={user!.icon || undefined} />
              <span className='pl-1 md:inline hidden'>マイページ</span>
            </a>
          </Link>
        ) : (
          <Link href='/login' passHref>
            <a className='text-white py-3' href='#'>
              ログイン
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};
