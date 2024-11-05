// import { theme } from "@/AppStyles";
import { TextField } from "@mui/material";
import React from "react";
import HeaderLabelComponent from "./commonHeader/HeaderLabelComponent";
import { theme } from "../AppStyles";

interface InputTextFieldCommonProps {
  label?: string;
  onChange?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value?: any;
  name?: string | undefined;
  borderColor?: string;
  disabled?: boolean;
  maxLength?: number;
  labelInput?: string;
  placeholder?: string;
  required?: boolean;
  dataCy?: string;
  regex?: any;
  disabledRed?: boolean;
  height?: string;
  marginTop?: string;
  marginBottom?: string;
}
export const handleKeyPress = (event: any, typeRegex?: any) => {
  const charCode = event.which || event.keyCode;

  if (charCode === 13) {
    return;
  }

  const char = String.fromCharCode(charCode);
  const regex = typeRegex ? typeRegex : /^[a-zA-ZÁÉÍÓÚáéíóúÑñ0-9\s]+$/;
  if (!regex.test(char)) {
    event.preventDefault();
  }
};
export const handlePaste = (event: any, typeRegex?: any) => {
  const pastedText = event.clipboardData.getData("text");
  const regex = typeRegex ? typeRegex : /^[a-zA-ZÁÉÍÓÚáéíóúÑñ0-9\s]+$/;
  if (!regex.test(pastedText)) {
    event.preventDefault();
  }
};

const InputTextFieldCommon = ({
  onChange,
  onBlur,
  value,
  name,
  disabled = false,
  maxLength = 100,
  labelInput = "",
  placeholder = "Ingrese datos",
  borderColor = "#E5E7E8",
  required = false,
  dataCy = "cy-input-text-field",
  regex,
  height = "5.4rem",
  disabledRed = false,
  marginTop = "none",
  marginBottom = "none",
}: InputTextFieldCommonProps) => {
  return (
    <div style={{ marginTop, marginBottom }}>
      <HeaderLabelComponent
        title={labelInput}
        required={required}
        borderColor={borderColor}
        dataCy={dataCy}
        color="white"
      />
      <TextField
        data-cy={dataCy}
        placeholder={placeholder}
        type="text"
        onChange={onChange}
        onBlur={(e) => {
          if (onBlur) {
            onBlur(e);
          }
        }}
        value={value}
        name={name}
        sx={{
          maxWidth: "100%",
          width: "100%",
          borderRadius: "0.8rem",
          "& .Mui-disabled": {
            backgroundColor: borderColor,
          },
          "& fieldset": {
            border: `0.1rem solid ${borderColor}`,
            borderRadius: "0.8rem",
            height: height,
            boxShadow: "0px 5px 30px rgba(231, 231, 234, 0.62)",
          },
          "& .MuiInputBase-root": {
            borderRadius: "0.8rem",
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "0.8rem",
            },
          },

          "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
            {
              border: `${disabled && disabledRed && "0.1rem solid red"}`,
            },
        }}
        disabled={disabled}
        inputProps={{
          style: {
            padding: "1.4rem 1.4rem",
            color: theme.colors.primaryLabel,
            fontWeight: 500,
            lineHeight: "2rem",
            fontSize: "1.4rem",
            fontFamily: theme.fontFamilies.primaryFont,
            backgroundColor: `${
              disabled ? theme.colors.secondarySurface : theme.colors.white
            }`,
            borderRadius: "0.8rem",
          },
          maxLength: maxLength,
          autoComplete: "off",
        }}
        // onKeyPress={(e) => {
        //   handleKeyPress(e, regex);
        // }}
        // onPaste={(e) => {
        //   handlePaste(e, regex);
        // }}
      />
    </div>
  );
};
export default InputTextFieldCommon;
