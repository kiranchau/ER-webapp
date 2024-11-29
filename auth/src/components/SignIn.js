import React, { useEffect } from "react";
import background from "../media/background.png";
import logo from "../media/logo.png";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../Utils/validations";
import UseFormContext from "./context/UseFormContext";
import OtpVerify from "./Popups/OtpVerify";
import { getUserDetails, loginSendOtp, loginVerifyOtp } from "../api/authCrud";
import * as AiIcons from "react-icons/ai";
import "../SCSS/SignUp.scss";

const SignIn = () => {
  const formContext = UseFormContext();
  const history = useHistory();

  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    formContext.setShowPassword(false);
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (values.email !== "" && values.password !== "") {
        let data = {
          email: values.email,
          password: values.password,
        };
        loginSendOtp(data)
          .then((res) => {
            if (res.status === 200) {
              console.log;
              formContext.setPopUps(true);
              formContext.setEmailAdd(values.email);
              formContext.setVerificationScreen("SignIn");
              formContext.setNotifayMessage(res.data.message);
              formContext.setNotifayType("success");
            }
          })
          .catch((err) => {
            if (err.response.status === 429) {
              formContext.setNotifayMessage(err.response.data.error);
              formContext.setNotifayType("error");
            } else if (err.response.status === 400) {
              formContext.setNotifayMessage(err.response.data.error);
              formContext.setNotifayType("error");
            }
          });
      }
    },
  });


  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <div className="flex justify-center mb-4">
          <img src={logo} width="50%" alt="Logo" />
        </div>
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-4">
          Login
        </h2>
        <form onSubmit={formik.handleSubmit} onReset={formik.resetForm}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-xs font-semibold mb-2 text-left"
              htmlFor="username"
            >
              Email ID/User Name
            </label>
            <input
              className="border border-gray-300 appearance-none rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline text-left"
              id="username"
              type="text"
              placeholder="Enter your Email ID"
              name="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-left text-xs text-red-500">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="mb-5 relative">
            <label
              className="block text-gray-700 text-xs font-semibold mb-2 text-left"
              htmlFor="password"
            >
              Enter Password
            </label>
            <input
              className="border border-gray-300 appearance-none rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline text-left"
              id="password"
              type={formContext.showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-left text-xs text-red-500">
                {formik.errors.password}
              </div>
            ) : null}
            <div
              className="absolute top-[40px] transform -translate-y-1/2 right-2 cursor-pointer"
              onClick={() =>
                formContext.setShowPassword(!formContext.showPassword)
              }
            >
              {formContext.showPassword ? (
                <AiIcons.AiFillEyeInvisible className="text-indigo-600" />
              ) : (
                <AiIcons.AiFillEye className="text-indigo-600" />
              )}
            </div>
          </div>
          <div className="mb-1 flex justify-between items-center">
            <button
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="flex justify-between">
            <a
              className="text-xs text-indigo-600 hover:text-indigo-700 cursor-pointer"
              onClick={() => history.push("/signup")}
            >
              Don't have an account?{" "}
            </a>
            <a
              className="text-indigo-600 hover:text-indigo-700 text-xs cursor-pointer"
              onClick={() => history.push("/forgotpassword")}
            >
              Forgot Password?
            </a>
          </div>
        </form>
        <div
          className={`${
            formContext.popUps ? "centerpopups" : "nocenterpopups"
          }`}
        >
          {formContext.popUps ? (
            <OtpVerify
              onClick={() => formContext.setPopUps(!formContext.popUps)}
            />
          ) : (
            ""
          )}
          <div className="blurBg"></div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
