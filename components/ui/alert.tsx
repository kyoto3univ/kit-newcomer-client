export const Alert: React.FunctionComponent = ({ children }) => {
  return (
    <div className='shadow border border-blue-light rounded px-4 py-2 my-2'>
      {children}
    </div>
  );
};
