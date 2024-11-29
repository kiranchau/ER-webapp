import React, { useState, useEffect } from "react";
import background from "../media/background.png";
import logo from "../media/logo.png";
import googleLogo from "../media/google.png";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { signupSchema } from "../Utils/validations";
import UseFormContext from "./context/UseFormContext";
import OtpVerify from "./Popups/OtpVerify";
import { sendOtp } from "../api/authCrud";
import * as AiIcons from "react-icons/ai";
import "../SCSS/SignUp.scss";

const SignUp = () => {
  const formContext = UseFormContext();
  const history = useHistory();

  useEffect(() => {
    formContext.setShowPassword(false);
    formContext.setShowConfirmPassword(false);
  }, []);

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit: (values, { setSubmitting }) => {
      const { email, password, confirmPassword } = values;
      if (email !== "" && password !== "" && confirmPassword !== "") {
        const data = { email, password };
        sendOtp(data)
          .then((res) => {
            if (res.status === 200) {
              formContext.setPopUps(true);
              formContext.setEmailAdd(email);
              formContext.setPasswordAdd(password);
              formContext.setVerificationScreen("SignUp");
              formContext.setNotifayMessage(res.data.message);
              formContext.setNotifayType("success");
            }
          })
          .catch((err) => {
            formContext.setNotifayMessage("OTP Not Send.");
            formContext.setNotifayType("error");
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
          Registration
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
              className="border border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline text-left"
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
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-xs font-semibold mb-2 text-left"
              htmlFor="password"
            >
              Enter Password
            </label>
            <input
              className="border border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline text-left"
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
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-xs font-semibold mb-2 text-left"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              className="border border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline text-left"
              id="confirm-password"
              type={formContext.showConfirmPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="confirmPassword"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-left text-xs text-red-500">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
            <div
              className="absolute top-[40px] transform -translate-y-1/2 right-2 cursor-pointer"
              onClick={() =>
                formContext.setShowConfirmPassword(
                  !formContext.showConfirmPassword
                )
              }
            >
              {formContext.showConfirmPassword ? (
                <AiIcons.AiFillEyeInvisible className="text-indigo-600" />
              ) : (
                <AiIcons.AiFillEye className="text-indigo-600" />
              )}
            </div>
          </div>
          <div className="mb-2 flex justify-between items-center">
            <button
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-gray-600 text-xs mb-2">
            Already have an account?{" "}
            <a
              className="text-blue-500 cursor-pointer"
              onClick={() => history.push("/")}
            >
              Login
            </a>
          </p>
          <p className="text-gray-600 text-xs mb-4 flex">
            {" "}
            <hr className="w-[143px] mt-2 mr-1" />
            or Sign up using <hr className="w-[143px] mt-2 ml-1" />{" "}
          </p>
          <button
            className="hover:bg-gray-100 py-2 px-3 rounded border border-gray-300 w-full flex items-center justify-center"
            type="button"
          >
            <img src={googleLogo} alt="Google Logo" className="h-5 mr-2" />
          </button>
        </div>
      </div>
      <div
        className={`${formContext.popUps ? "centerpopups" : "nocenterpopups"}`}
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
  );
};

export default SignUp;
