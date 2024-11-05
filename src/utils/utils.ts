import { theme } from "../AppStyles";

export const getBorderColorFormik = (fieldName, dirty, errors, touched) => {
  return dirty && !errors[fieldName]
    ? "green"
    : touched[fieldName] && errors[fieldName]
    ? theme.colors.red
    : "#E5E7E8";
};
