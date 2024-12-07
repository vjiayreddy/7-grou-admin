import * as yup from "yup";
import { matchIsValidTel } from "mui-tel-input";

export const loginFormValidationschema = yup.object().shape({
  mobile: yup
    .string()
    .required("Phone number is required!")
    .test("mobile", "Phone number is not valid", (str, context) => {
      const pn = matchIsValidTel(str);
      return pn;
    }),
  password: yup.string().required("Password is required!"),
});

export const marketFormValidation = yup.object().shape({
  name: yup
    .string()
    .min(3,"must be at least 3 characters long")
    .required("Phone number is required!"),
  openTime: yup.string().required("OpenTime is required!"),
  closeTime: yup.string().required("CloseTime is required!"),

});
