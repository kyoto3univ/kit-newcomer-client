import Link from 'next/link';
export const AppHeader = () => {
  return (
    <div className='bg-blue w-full'>
      <div className='container mx-auto py-3 text-white flex items-center justify-between'>
        <Link href='/' passHref>
          <a className='text-2xl'>新入生応援サイト</a>
        </Link>
        <Link href='/login' passHref>
          <a className='text-white' href='#'>
            ログイン
          </a>
        </Link>
      </div>
    </div>
  );
};
