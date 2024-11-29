import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Please enter a valid email address."
    )
    .required("Email is required."),
  password: yup
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

export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Please enter a valid email address."
    )
    .required("Email is required."),
  password: yup
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long.")
    .max(25, "Password must not exceed 25 characters.")
    .required("Password is required.")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?([^\w\s]|[_]))(?!.* ).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match.")
    .required("Please confirm your password."),
});

export const createAccountSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .max(100, "Minimium 100 characters are allowed."),
  title: yup
    .string()
    .required("Title is required")
    .max(100, "Minimium 100 characters are allowed."),
  department: yup
    .string()
    .required("Department is required")
    .max(100, "Minimium 100 characters are allowed."),
  companyName: yup
    .string()
    .required("Company name is required")
    .max(100, "Minimium 100 characters are allowed."),
  companyEmail: yup
    .string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Please enter a valid email address."
    )
    .required("Email is required."),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits.")
    .required("Phone No is required."),
  companySize: yup.string().required("Company size is required"),
  industry: yup
    .string()
    .required("Industry is required")
    .max(100, "Minimium 100 characters are allowed."),
});

export const forgotSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Please enter a valid email address."
    )
    .required("Email is required."),
});

export const resetPassSchema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long.")
    .max(25, "Password must not exceed 25 characters.")
    .required("Password is required.")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?([^\w\s]|[_]))(?!.* ).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match.")
    .required("Please confirm your password."),
});
