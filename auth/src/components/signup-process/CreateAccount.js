import React, { useState } from 'react';
import UseFormContext from "../context/UseFormContext";

const CreateAccount = ({formik}) => {
  const formContext = UseFormContext();
  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold text-gray-700 text-center mb-6">Create Account</h3>
      <form onSubmit={formik.handleSubmit} onReset={formik.resetForm} className="bg-white px-8 pt-6 pb-8 mb-4 grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="fullName">
            Full Name
          </label>
          <input
            className="border border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline"
            id="fullName"
            type="text"
            name="fullName"
            onInput={formContext.restrictToLetters}
            {...formik.getFieldProps("fullName")}
            placeholder="Full Name"
          />
          {formik.touched.fullName && formik.errors.fullName ? (
              <div className="text-xs text-red-500">
                {formik.errors.fullName}
              </div>
            ) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="companyName">
            Company Name
          </label>
          <input
            className="border border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline"
            id="companyName"
            type="text"
            name="companyName"
            onInput={formContext.restrictToLetters}
            {...formik.getFieldProps("companyName")}
            placeholder="Company Name"
          />
          {formik.touched.companyName && formik.errors.companyName ? (
              <div className="text-xs text-red-500">
                {formik.errors.companyName}
              </div>
            ) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="industry">
            Industry
          </label>
          <input
            className="border border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline"
            id="industry"
            type="text"
            name="industry"
            onInput={formContext.restrictToLetters}
            {...formik.getFieldProps("industry")}
            placeholder="Industry"
          />
          {formik.touched.industry && formik.errors.industry ? (
              <div className="text-xs text-red-500">
                {formik.errors.industry}
              </div>
            ) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="companySize">
            Company Size
          </label>
          <input
            className="border border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline"
            id="companySize"
            type="text"
            name="companySize"
            onInput={formContext.restrictToNumbers}
            {...formik.getFieldProps("companySize")}
            placeholder="Company Size"
          />
          {formik.touched.companySize && formik.errors.companySize ? (
              <div className="text-xs text-red-500">
                {formik.errors.companySize}
              </div>
            ) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="border border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            name="title"
            onInput={formContext.restrictToLetters}
            {...formik.getFieldProps("title")}
            placeholder="Title"
          />
          {formik.touched.title && formik.errors.title ? (
              <div className="text-xs text-red-500">
                {formik.errors.title}
              </div>
            ) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="department">
            Department
          </label>
          <input
            className="border border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline"
            id="department"
            type="text"
            name="department"
            onInput={formContext.restrictToLetters}
            {...formik.getFieldProps("department")}
            placeholder="Department"
          />
          {formik.touched.department && formik.errors.department ? (
              <div className="text-xs text-red-500">
                {formik.errors.department}
              </div>
            ) : null}
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            className="border border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline"
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            maxLength={10}
            onInput={formContext.restrictToNumbers}
            {...formik.getFieldProps("phoneNumber")}
            placeholder="Phone Number"
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="text-xs text-red-500">
                {formik.errors.phoneNumber}
              </div>
            ) : null}
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="companyEmail">
            Company Email ID
          </label>
          <input
            className="border border-gray-300 appearance-none border rounded w-full py-2 px-3 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline"
            id="companyEmail"
            type="email"
            name="companyEmail"
            {...formik.getFieldProps("companyEmail")}
            placeholder="Company Email ID"
          />
          {formik.touched.companyEmail && formik.errors.companyEmail ? (
              <div className="text-xs text-red-500">
                {formik.errors.companyEmail}
              </div>
            ) : null}
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
