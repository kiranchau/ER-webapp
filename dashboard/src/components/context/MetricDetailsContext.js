import React, { useState, createContext, useEffect } from "react";
import { tokenUpdate } from "../../API/authCrud";

const MetricDetailsContext = createContext({});

export const MetricDetailsProvider = ({ children }) => {
  const [metricData, setMetricData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const refreshToken = {
        refresh: localStorage.getItem("refreshtoken").replace(/['"]+/g, ""),
      };
      console.log("refreshToken", refreshToken);
      tokenUpdate(refreshToken)
        .then((res) => {
          console.log("res", res);
          if(res.status === 200){
            localStorage.setItem("token", JSON.stringify(res.data.access))
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
      // Call your function here
      // For example, log a message
      console.log("Executing function every 50 minutes");
    }, 50 * 60 * 1000); // 50 minutes in milliseconds
    return () => clearInterval(interval); // Cleanup function to clear interval on unmount
  }, []); // Empty dependency array ensures this effect runs only once on component mount
  
  const contextValue = {
    metricData,
    setMetricData
  };

  return (
    <MetricDetailsContext.Provider value={contextValue}>{children}</MetricDetailsContext.Provider>
  );
};

export default MetricDetailsContext;
