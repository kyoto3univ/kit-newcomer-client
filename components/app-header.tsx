import Link from 'next/link';
import { useUser } from '../utils/use-user';
import { Spin } from './ui/spin';
export const AppHeader = () => {
  const { isLoggedIn, isLoading } = useUser();
  return (
    <div className='bg-blue w-full'>
      <div className='container mx-auto py-3 text-white flex items-center justify-between'>
        <Link href='/' passHref>
          <a className='text-2xl'>新入生応援サイト</a>
        </Link>
        {isLoading ? (
          <Spin />
        ) : isLoggedIn ? (
          <Link href='/me' passHref>
            <a className='text-white' href='#'>
              test
            </a>
          </Link>
        ) : (
          <Link href='/login' passHref>
            <a className='text-white' href='#'>
              ログイン
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};
