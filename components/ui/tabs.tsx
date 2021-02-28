import clsx from 'clsx';

export const Tab: React.FunctionComponent = ({ children }) => {
  return <div className='flex flex-row my-1'>{children}</div>;
};

export const TabItem: React.FunctionComponent<
  { active?: boolean } & React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
> = ({ children, active, ...props }) => {
  return (
    <a
      {...props}
      className={clsx(
        'w-full text-center py-2 border-b-2 hover:bg-gray-300 transition-colors cursor-pointer',
        {
          'border-blue': active,
          'border-gray-300': !active,
        },
        props.className,
      )}
    >
      {children}
    </a>
  );
};
