import * as yup from "yup";
export const passChangeSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Please enter a valid email address."
    )
    .required("Email is required."),
  old_password: yup
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long.")
    .max(25, "Password must not exceed 25 characters.")
    .required("Password is required.")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?([^\w\s]|[_]))(?!.* ).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  new_password: yup
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long.")
    .max(25, "Password must not exceed 25 characters.")
    .required("Password is required.")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?([^\w\s]|[_]))(?!.* ).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
});

export const myProfileSchema = yup.object().shape({
  full_name: yup
    .string()
    .required("Full Name is required.")
    .max(100, "Minimium 100 characters are allowed."),
  email: yup
    .string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Please enter a valid email address."
    )
    .required("Email is required."),
});
