import React from "react";
import logo from "../media/logo.png";
import { useHistory } from "react-router-dom";
import UseFormContext from "./context/UseFormContext";
import { useFormik } from "formik";
import { forgotSchema } from "../Utils/validations";
import { forgotPass } from "../api/authCrud";

const initialValues = { email: "" };

const ForgotPassword = () => {
  const formContext = UseFormContext();
  const history = useHistory();

  const formik = useFormik({
    initialValues,
    validationSchema: forgotSchema,
    onSubmit: (values, { setSubmitting }) => {
      ForgotPass(values, setSubmitting);
    },
  });

  const {
    errors,
    resetForm,
    getFieldProps,
    handleSubmit,
    touched,
    isSubmitting,
  } = formik;

  async function ForgotPass(values, setSubmitting) {
    console.log("values", values);
    let data = {
      email: values.email,
    };
    forgotPass(data)
      .then((res) => {
        console.log("forgotPass...res", res);
        if (res.status === 200) {
          formContext.setNotifayMessage(res.data.message);
          formContext.setNotifayType("success");
          resetForm();
          history.push("signin");
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          formContext.setNotifayMessage(err.response.data.error);
          formContext.setNotifayType("error");
          resetForm();
        } else {
          resetForm();
        }
      });
  }

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <div className="flex justify-center mb-4">
          <img src={logo} width="50%" alt="Logo" />
        </div>
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-4">
          Forgot Password
        </h2>
        <form onSubmit={formik.handleSubmit} onReset={formik.resetForm}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-xs font-semibold mb-2 text-center"
              htmlFor="username"
            >
              Email ID/User Name
            </label>
            <input
              className="border border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline text-center"
              id="username"
              type="text"
              placeholder="Enter your Email ID"
              name="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-center text-xs text-red-500">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="mb-5"></div>
          <div className="mb-1 flex justify-between items-center">
            <button
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit"
            >
              Continue
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => history.push("/")}
              >
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
