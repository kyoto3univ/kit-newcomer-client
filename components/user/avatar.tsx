import clsx from 'clsx';

type Props = {
  icon?: string;
  variant?: 'large' | 'normal';
  ringColor?: 'white' | 'blue';
};
export const Avatar = ({
  icon,
  variant = 'normal',
  ringColor = 'white',
}: Props) => {
  return (
    <div>
      <img
        src={icon}
        alt='Avatar'
        className={clsx('object-fill', 'rounded-full', {
          'ring-2': variant === 'normal',
          'ring-4': variant === 'large',
          'h-10': variant === 'normal',
          'h-32': variant === 'large',
          'ring-white': ringColor === 'white',
          'ring-blue-light': ringColor === 'blue',
        })}
      />
    </div>
  );
};
