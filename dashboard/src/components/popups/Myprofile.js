import React, { useEffect, useState } from "react";
import * as MdIcons from "react-icons/md";
import * as TiIcons from "react-icons/ti";
import Input from "../UI/Input";
import ChangePassword from "./ChangePassword";
import { custProfileDetails, custProfileUpdate } from "../../API/authCrud";
import { useFormik } from "formik";
import { myProfileSchema } from "../../Utils/validations";
import UseSharedDataContext from "../context/UseSharedDataContext";


const Myprofile = ({ onClick }) => {
  const { sharedDataContext, user, setUser } = UseSharedDataContext();
  const [pschange, setPsChange] = useState(false);
  const [id] = useState(localStorage.getItem("userId"));
  const [initialValues, setInitialValues] = useState({
    full_name: "",
    email: "",
    customer: "",
  });

  useEffect(() => {
    if (id) {
      custProfileDetails(id)
        .then((res) => {
          if (res.status === 200) {
            const { full_name, email, customer } = res.data;
            setInitialValues({
              full_name,
              email,
              customer,
            });
          }
        })
        .catch((err) => {
          console.log("customerProfileDetails...err", err);
        });
    }
  }, [id]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: myProfileSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log("values", values);
      const { full_name, email } = values;
      const data = {
        full_name,
        email,
        customer: initialValues.customer,
      };
      custProfileUpdate(data, id)
        .then((res) => {
          console.log("custProfileUpdate...res", res);
          if (res.status === 200) {
            localStorage.setItem("userDetails", JSON.stringify(res.data));
            setUser(res.data);
            sharedDataContext.setNotifayMessage("User Profile updated successfully!");
            sharedDataContext.setNotifayType("success");
          }
          onClick();
        })
        .catch((err) => {
          sharedDataContext.setNotifayMessage(
            "Failed to update the user profile. Please try again."
          );
          sharedDataContext.setNotifayType("error");
        });
      //   setSubmitting(false);
    },
  });

  return (
    <>
      <div className="w-screen h-screen blrBG">
        <div className="flex justify-center items-center h-full w-full ">
          <div className="bg-white w-1/2 p-10 rounded relative -mb-[60px]">
            <div
              className="absolute cursor-pointer top-[10px] right-[10px] text-sm border rounded-full w-[25px] h-[25px] flex items-center justify-center hover:bg-red-600 hover:text-white"
              type="button"
              onClick={onClick}
            >
              <MdIcons.MdOutlineClose />
            </div>
            {/* <div className='flex items-end -mt-28'>
                    <div className='relative'>
                        <div className='w-28 h-28 rounded-full bg-blue-200 shadow-xl'>
                        </div>
                        <div className='bg-white absolute bottom-1 right-2 p-1 rounded-full font-md'>
                            <TiIcons.TiEdit />
                        </div>
                    </div>
                    <div><b>Lastname Firstname</b></div>
                </div> */}
            <div className="pt-3">
              <div className="grid lg:grid-cols-2 sm:grid-cols-1  gap-10">
                <div>
                  <Input
                    label="Full Name"
                    id="fullname"
                    name="full_name"
                    type="text"
                    {...formik.getFieldProps("full_name")}
                    error={
                      formik.touched.full_name &&
                      formik.errors.full_name && (
                        <p className="text-left">{formik.errors.full_name}</p>
                      )
                    }
                  />
                </div>
                <div>
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
                {/* <div>
                            <Input label="First Name" id='firstname' />
                        </div> */}
              </div>
              <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-10 mt-3">
                <div className="flex items-end">
                  <button
                    className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => setPsChange(!pschange)}
                  >
                    Change Password
                  </button>
                </div>
                {/* <div>
                            <Input label="Phone Number" id='firstname' />
                        </div> */}
              </div>
              {/* <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-10 mt-3'>
                        <div className="">
                            <label>Address</label>
                            <br></br>
                            <textarea
                                placeholder='Address'
                                style={{
                                    border: "1px solid #D9D9D9",
                                    borderRadius: "5px",
                                    padding: "5px",
                                    marginTop: "0px",
                                    width: "100%",
                                    height: "80%"
                                }}
                            />
                        </div>
                        <div>
                            <Input label="City" id='firstname' />
                            <div className='mt-5'>
                                <Input label="Country" id='firstname' />
                            </div>
                        </div>
                    </div> */}
              {/* <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-10 mt-3'>
                        <div>
                        
                            <Input label="Reference" id='firstname' />
                        </div>
                        
                    </div> */}
              <div className="mt-3">
                <h1>Privacy Policy</h1>
                <p className="text-xs">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="flex gap-3 w-1/2 mt-8">
                  <button
                    type="button"
                    className="inline-block w-full rounded-md text-sm border hover:bg-blue-600 hover:text-white"
                    onClick={onClick}
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
              </div>
            </div>
          </div>
        </div>
      </div>
      {pschange && (
        <div className="w-screen h-screen blrBG">
          <ChangePassword onClose={() => setPsChange(!pschange)} />
        </div>
      )}
    </>
  );
};

export default Myprofile;
