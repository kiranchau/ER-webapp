import React, { useEffect } from "react";
import * as MdIcons from "react-icons/md";
import Input from "../UI/Input";
import UseSharedDataContext from "../context/UseSharedDataContext";
import * as AiIcons from "react-icons/ai";
import { useFormik } from "formik";
import { passChangeSchema } from "../../Utils/validations";
import { passwordChange } from "../../API/authCrud";
import "../../SCSS/changePass.scss";

const initialValues = { email: "", old_password: "", new_password: "" };

const ChangePassword = (props) => {
  const sharedContext = UseSharedDataContext();

  useEffect(()=>{
    sharedContext.setShowPassword(false);
    sharedContext.setShowConfirmPassword(false);
  },[]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: passChangeSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const data = {
        email: values.email,
        old_password: values.old_password,
        new_password: values.new_password,
      };
      props.onClose();
      passwordChange(data)
        .then((res) => {
          console.log("passwordChange...res", res);
          if (res.status === 200) {
            sharedContext.setNotifayMessage(res.data.message);
            sharedContext.setNotifayType("success");
          }
        })
        .catch((err) => {
          console.log("passwordChange...err", err);
          if (err.response.status === 404) {
            sharedContext.setNotifayMessage(err.response.data.error);
            sharedContext.setNotifayType("error");
          } else if (err.response.status === 400) {
            sharedContext.setNotifayMessage(err.response.data.error);
            sharedContext.setNotifayType("error");
          } else {
            sharedContext.setNotifayType("error");
          }
        });
    },
  });

  return (
    <div className="flex justify-center items-center h-full w-full ">
      <div className="bg-white w-1/4 p-10 rounded relative -mb-[60px]">
        <div
          className="absolute cursor-pointer top-[10px] right-[10px] text-sm border rounded-full w-[25px] h-[25px] flex items-center justify-center hover:bg-indigo-600 hover:text-white"
          type="button"
          onClick={props.onClose}
        >
          <MdIcons.MdOutlineClose />
        </div>
        <center>
          <div className="text-xl">
            <b>Change Password</b>
          </div>

          <div className="pt-5">
            <Input
              label="Email ID"
              id="email"
              name="email"
              {...formik.getFieldProps("email")}
              error={
                formik.touched.email &&
                formik.errors.email && (
                  <p className="text-left">{formik.errors.email}</p>
                )
              }
            />
          </div>
          <div className="pt-5 relative">
            <Input
              label="Old Password"
              id="old_password"
              type={sharedContext.showPassword ? "text" : "password"}
              name="old_password"
              {...formik.getFieldProps("old_password")}
              error={
                formik.touched.old_password &&
                formik.errors.old_password && (
                  <p className="text-left">{formik.errors.old_password}</p>
                )
              }
            />
            <div
              className="absolute top-[58px] transform -translate-y-1/2 right-2 cursor-pointer"
              onClick={() =>
                sharedContext.setShowPassword(!sharedContext.showPassword)
              }
            >
              {sharedContext.showPassword ? (
                <AiIcons.AiFillEyeInvisible className="text-indigo-500" />
              ) : (
                <AiIcons.AiFillEye className="text-indigo-500" />
              )}
            </div>
          </div>
          <div className="pt-5 relative">
            <Input
              label="New Password"
              id="new_password"
              name="new_password"
              type={sharedContext.showConfirmPassword ? "text" : "password"}
              {...formik.getFieldProps("new_password")}
              error={
                formik.touched.new_password &&
                formik.errors.new_password && (
                  <p className="text-left">{formik.errors.new_password}</p>
                )
              }
            />
            <div
              className="absolute top-[58px] transform -translate-y-1/2 right-2 cursor-pointer"
              onClick={() =>
                sharedContext.setShowConfirmPassword(
                  !sharedContext.showConfirmPassword
                )
              }
            >
              {sharedContext.showConfirmPassword ? (
                <AiIcons.AiFillEyeInvisible className="text-indigo-500" />
              ) : (
                <AiIcons.AiFillEye className="text-indigo-500" />
              )}
            </div>
          </div>
          <div className="flex gap-3 w-1/2 mt-8">
            <button
              type="button"
              className="inline-block w-full rounded-md text-sm border hover:bg-blue-600 hover:text-white"
              onClick={props.onClose}
            >
              Close
            </button>
            <button
              disabled={formik.isSubmitting}
              onClick={formik.handleSubmit}
              className="inline-block w-full rounded-md text-sm border bg-blue-600 py-2 text-white hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </center>
      </div>
    </div>
  );
};

export default ChangePassword;
