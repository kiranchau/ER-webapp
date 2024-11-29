import React, { useEffect, useState } from "react";
import logo from "../media/logo.png";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { resetPassSchema } from "../Utils/validations";
import * as AiIcons from "react-icons/ai";
import UseFormContext from "./context/UseFormContext";
import { resetPass } from "../api/authCrud";
import "../SCSS/SignUp.scss";

const initialValues = { password: "", confirmPassword: "" };

const ResetPassword = () => {
  const formContext = UseFormContext();
  const history = useHistory();
  const [initialLiveUrlPath1, setInitialLiveUrlPath1] = useState(
    localStorage.getItem("liveUrlPath1").replace(/['"]+/g, "")
  );
  const [initialLiveUrlPath2, setInitialLiveUrlPath2] = useState(
    localStorage.getItem("liveUrlPath2").replace(/['"]+/g, "")
  );

  useEffect(() => {
    formContext.setShowPassword(false);
    formContext.setShowConfirmPassword(false);
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: resetPassSchema,
    onSubmit: (values, { setSubmitting }) => {
      ResetPass(values, setSubmitting);
    },
  });

  async function ResetPass(values, setSubmitting) {
    let data = {
      password: values.password,
    };

    resetPass(data, initialLiveUrlPath1, initialLiveUrlPath2)
      .then((res) => {
        if (res.status === 200) {
          formContext.setNotifayMessage(res.data.message);
          formContext.setNotifayType("success");
          formik.resetForm();
          history.push("/");
        }
      })
      .catch((err) => {
        formik.resetForm();
        if (err.status === 400) {
          formContext.setNotifayMessage(err.data.message);
          formContext.setNotifayType("error");
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <div className="flex justify-center mb-4">
          <img src={logo} width="50%" alt="Logo" />
        </div>
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-4">
          Reset Password
        </h2>
        <form onSubmit={formik.handleSubmit} onReset={formik.resetForm}>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-xs font-semibold mb-2 text-center"
              htmlFor="password"
            >
              Enter Password
            </label>
            <input
              className="border border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline text-center"
              id="password"
              type={formContext.showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-center text-xs text-red-500">
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
              className="block text-gray-700 text-xs font-semibold mb-2 text-center"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              className="border border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline text-center"
              id="confirm-password"
              type={formContext.showConfirmPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="confirmPassword"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-center text-xs text-red-500">
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
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
