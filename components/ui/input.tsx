import clsx from 'clsx';

export const TextBox = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
) => {
  return (
    <input
      {...props}
      className={clsx(
        'shadow border border-gray-300 focus:ring-blue-light focus:ring rounded m-1 p-1 block outline-none',
        props.className,
      )}
    />
  );
};

export const TextArea = (
  props: React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
) => {
  return (
    <textarea
      {...props}
      className={clsx(
        'shadow border border-gray-300 focus:ring-blue-light focus:ring rounded m-1 p-1 block outline-none',
        props.className,
      )}
    />
  );
};
