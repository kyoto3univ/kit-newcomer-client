import { ErrorMessage } from 'formik';

type Props = {
  name: string;
};
export const FormikError = (props: Props) => {
  return (
    <ErrorMessage {...props} component='div' className='text-red-600 block' />
  );
};
