import { Control, Controller, useForm } from "react-hook-form";
import { DatePicker, DatePickerProps } from "antd";
import { useState } from "react";
import dayjs from "dayjs";

const DatePickerField = ({ onChange, value, setDate, ...props }) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={{
        required: "This field is required"
      }}
      render={({ field, fieldState }) => {
        return (
          <>
            <DatePicker
              placeholder={props.placeholder}
              status={fieldState.error ? "error" : undefined}
              ref={field.ref}
              name={field.name}
              onBlur={field.onBlur}
              value={value}
              onChange={(e) => {
                onChange(e)
                setDate(e.toDate())
              }}
            />
            <br />
            {fieldState.error ? (
              <span style={{ color: "red" }}>{fieldState.error?.message}</span>
            ) : null}
          </>
        );
      }}
    />
  );
};

export default DatePickerField