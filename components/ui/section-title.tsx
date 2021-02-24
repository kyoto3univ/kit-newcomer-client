import clsx from 'clsx';

export const SectionTitle: React.FunctionComponent = ({ children }) => {
  return (
    <h2
      className={clsx(
        'text-blue-light',
        'border-b-4',
        'text-xl',
        'border-blue',
      )}
    >
      {children}
    </h2>
  );
};
