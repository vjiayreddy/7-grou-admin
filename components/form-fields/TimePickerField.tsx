import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Control, Controller, FieldValues } from "react-hook-form";

import React from "react";
import { TimePicker, TimePickerProps } from "@mui/x-date-pickers/TimePicker";
import { Dayjs } from "dayjs";

interface FormTimePickerFieldProps {
  id?: string;
  name: string;
  control: Control<FieldValues, object> | any;
  rules?: any;
  label: string;
  defaultValue: any;
  timePickerProps?: TimePickerProps<Dayjs>;
  size?: "small" | "medium";
  ampm?: boolean;
}

const FormTimePickerField = ({
  name,
  control,
  rules,
  label,
  size,
  defaultValue,
  ampm,
}: FormTimePickerFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({
        field: { ref, onBlur, name, onChange, ...field },
        fieldState,
      }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            {...field}
            inputRef={ref}
            label={label}
            ampm={ampm}
            onChange={(date) => {
              onChange(date);
            }}
            slotProps={{
              textField: {
                required: true,
                onBlur,
                name,
                size: size,
                error: !!fieldState?.error,
                helperText: fieldState?.error?.message,
                fullWidth: true,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default FormTimePickerField;
