import clsx from 'clsx';

type Props = {
  disabled?: boolean;
  onClick?: () => void;
};

export const Button: React.FunctionComponent<Props> = ({
  disabled,
  children,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'bg-blue-light',
        'border-blue-light',
        'hover:bg-blue',
        'border-2',
        'rounded',
        'text-white',
        'm-1',
        'py-1',
        'px-2',
        {
          'bg-gray-400': disabled,
          'border-gray-400': disabled,
        },
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
