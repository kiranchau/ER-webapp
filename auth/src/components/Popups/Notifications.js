import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseFormContext from "../context/UseFormContext";

const Notifications = () => {
  const formContext = UseFormContext();

  useEffect(() => {
    if (formContext.notifayMessage !== '' && formContext.notifayType !== '') {
      const toastOptions = {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        closeButton: false,
      };

      // Dismiss any existing toasts
      toast.dismiss();

      // Wait for a short duration to ensure the current toast is closed
      setTimeout(() => {
        switch (formContext.notifayType) {
          case "success":
            toast.success(formContext.notifayMessage, toastOptions);
            break;
          case "error":
            toast.error(formContext.notifayMessage, toastOptions);
            break;
          case "warn":
            toast.warn(formContext.notifayMessage, toastOptions);
            break;
          case "info":
            toast.info(formContext.notifayMessage, toastOptions);
            break;
          default:
            toast.info(formContext.notifayMessage, toastOptions);
            break;
        }

        // Clear the message to allow new messages to trigger new toasts
        formContext.setNotifayMessage("");
        formContext.setNotifayType("");
      }, 300); // Adjust the delay as needed
    }
  }, [formContext.notifayMessage,formContext.notifayType]);

  return <ToastContainer />;
};

export default Notifications;
