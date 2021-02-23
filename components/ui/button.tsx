import clsx from 'clsx';
import { Spin } from './spin';

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  loading?: boolean;
};

export const Button: React.FunctionComponent<Props> = ({
  disabled,
  loading,
  children,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'border-2',
        'rounded',
        'text-white',
        'm-1',
        'py-1',
        'px-2',
        {
          'bg-gray-400': disabled,
          'border-gray-400': disabled,
          'bg-blue-light': !disabled,
          'border-blue-light': !disabled,
          'hover:bg-blue': !disabled,
          'cursor-not-allowed': disabled,
        },
      )}
      disabled={disabled}
    >
      {loading && <Spin />}
      {children}
    </button>
  );
};
