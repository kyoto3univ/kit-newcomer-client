export const Alert: React.FunctionComponent = ({ children }) => {
  return (
    <div className='shadow border border-blue-light rounded md:px-4 px-2 md:py-2 py-1 my-2 md:mx-0 mx-1'>
      {children}
    </div>
  );
};
