import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";

interface CheckBoxFieldComponentProps {
  id: string;
  name: string;
  control: Control<FieldValues, object> | any;
  rules?: any;
  label: string;
  defaultValue: boolean;
  checkBoxProps: CheckboxProps;
  onChangeCheckBox?: (value: boolean) => void;
}

const CheckBoxFieldComponent = ({
  id,
  name,
  control,
  rules,
  label,
  defaultValue,
  checkBoxProps,
  onChangeCheckBox
}: CheckBoxFieldComponentProps) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      rules={rules}
      render={({ field: { onChange, value, ...rest }, fieldState }) => {
        return (
          <>
            <FormControlLabel
              label={label}
              control={
                <Checkbox
                  {...rest}
                  id={id}
                  checked={value}
                  onChange={(e) => {
                    onChange(e.target.checked);
                    onChangeCheckBox?.(e.target.checked as boolean);
                  }}
                  {...checkBoxProps}
                />
              }
            />

            {!!fieldState?.error && (
              <FormHelperText sx={{ marginLeft: 0 }} error={true}>
                {fieldState?.error?.message}
              </FormHelperText>
            )}
          </>
        );
      }}
    />
    // <FormControlLabel
    //   label=""
    //   control={

    //   }
    //   sx={{ width: "100%" }}
    // ></FormControlLabel>
  );
};

export default CheckBoxFieldComponent;
