export const TextBox = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
) => {
  return (
    <input
      className='shadow border border-gray-300 focus:ring-blue-light focus:ring rounded m-1 p-1 block w-full outline-none'
      {...props}
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
      className='shadow border border-gray-300 focus:ring-blue-light focus:ring rounded m-1 p-1 block w-full outline-none'
      {...props}
    />
  );
};
