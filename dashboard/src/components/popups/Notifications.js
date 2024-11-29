import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseSharedDataContext from "../context/UseSharedDataContext";

const Notifications = () => {
  const sharedContext = UseSharedDataContext();

  useEffect(() => {
    if (sharedContext.notifayMessage !== '' && sharedContext.notifayType !== '') {
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
        switch (sharedContext.notifayType) {
          case "success":
            toast.success(sharedContext.notifayMessage, toastOptions);
            break;
          case "error":
            toast.error(sharedContext.notifayMessage, toastOptions);
            break;
          case "warn":
            toast.warn(sharedContext.notifayMessage, toastOptions);
            break;
          case "info":
            toast.info(sharedContext.notifayMessage, toastOptions);
            break;
          default:
            toast.info(sharedContext.notifayMessage, toastOptions);
            break;
        }

        // Clear the message to allow new messages to trigger new toasts
        sharedContext.setNotifayMessage("");
      }, 300); // Adjust the delay as needed
    }
  }, [sharedContext.notifayType,sharedContext.notifayMessage]);

  return <ToastContainer />;
};

export default Notifications;
