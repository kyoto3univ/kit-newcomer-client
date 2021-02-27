import clsx from 'clsx';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export const RadioButton = (props: Props) => {
  return (
    <input
      {...props}
      type='radio'
      className={clsx(
        'focus:ring-blue-light h-4 w-4 text-blue border-gray-300',
        props.className,
      )}
    />
  );
};
