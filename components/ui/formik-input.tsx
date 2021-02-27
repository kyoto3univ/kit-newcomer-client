import clsx from 'clsx';
import { FieldProps } from 'formik';
import { TextArea, TextBox } from './input';

export const FormikTextBox = ({
  field,
  form,
  ...props
}: FieldProps<string> & React.ComponentProps<typeof TextBox>) => {
  const error = !!form.errors[field.name];
  return (
    <TextBox
      {...field}
      {...props}
      className={clsx(props.className, {
        'ring-red-600': error,
        ring: error,
      })}
    />
  );
};

export const FormikTextArea = ({
  field,
  form,
  ...props
}: FieldProps<string> & React.ComponentProps<typeof TextArea>) => {
  const error = !!form.errors[field.name];
  return (
    <TextArea
      {...field}
      {...props}
      className={clsx(props.className, {
        'ring-red-600': error,
        ring: error,
      })}
    />
  );
};
