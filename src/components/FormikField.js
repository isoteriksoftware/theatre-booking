import { TextField } from "@material-ui/core";
import { useField } from "formik";

const FormikField = ({label, ...props}) => {
  const [field, meta] = useField(props);

  return (
    <>
      <TextField
        fullWidth
        label={label}
        {...field}
        {...props}
        error={meta.touched && meta.error ? true : false}
        helperText={meta.touched ? meta.error : ''}
      />
    </>
  );
};

export default FormikField;