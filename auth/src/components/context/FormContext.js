import React, { useState, createContext, useEffect } from "react";

const FormContext = createContext({});

export const FormProvider = ({ children }) => {
  const [popUps, setPopUps] = useState(false);
  const [emailAdd, setEmailAdd] = useState("");
  const [passwordAdd, setPasswordAdd] = useState("");
  const [verificationScreen, setVerificationScreen] = useState("");
  const [notifayType, setNotifayType] = useState("");
  const [notifayMessage, setNotifayMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [liveUrlPath1, setLiveUrlPath1] = useState();
  const [liveUrlPath2, setLiveUrlPath2] = useState();

  const restrictToLetters = (event) => {
    event.target.value = event.target.value.replace(/[^a-zA-Z\s]/g, "");
  };

  const restrictToNumbers = (event) => {
    event.target.value = event.target.value.replace(/[^0-9-]/g, "");
  };

  const contextValue = {
    setPopUps,
    popUps,
    setEmailAdd,
    emailAdd,
    setPasswordAdd,
    passwordAdd,
    setVerificationScreen,
    verificationScreen,
    notifayMessage,
    setNotifayMessage,
    notifayType,
    setNotifayType,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    liveUrlPath1,
    setLiveUrlPath1,
    liveUrlPath2,
    setLiveUrlPath2,
    restrictToLetters,
    restrictToNumbers,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

export default FormContext;
