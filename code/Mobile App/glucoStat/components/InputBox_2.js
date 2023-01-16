import React from "react";
import { useFormikContext } from "formik";

import InputField from "./InputBox_1";

function AppFormField({ name, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <InputField
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        {...otherProps}
      />
      
    </>
  );
}

export default AppFormField;