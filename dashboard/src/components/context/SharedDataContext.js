import React, { useState, createContext, useEffect } from "react";
import { custProfileDetails, tokenUpdate } from "../../API/authCrud";

const SharedDataContext = createContext({});

export const SharedDataProvider = ({ children }) => {
  const [filter, setFilter] = useState([]);
  const [payloadFilter, setPayloadFilter] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedMeasureFilter, setSelectedMeasureFilter] = useState("");
  const [selectedMeasureField, setSelectedMeasureField] = useState("");
  const [dataSource, setDataSource] = useState({});
  const [dimension, setDimension] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [category, setCategory] = useState([]);
  const [sort, setSort] = useState([]);
  const [payloadSort, setPayloadSort] = useState("");
  const [xaxis, setXaxis] = useState([]);
  const [yaxis, setYaxis] = useState([]);
  const [queryResult, setQueryResult] = useState([]);
  const [query, setQuery] = useState("");
  const [visualization, setVisualization] = useState({ id: 1 });
  const [metricQueryResult, setMetricQueryResult] = useState([]);
  const [metricMeasureField, setMetricMeasureField] = useState("");
  const [dashboardMetricStatus, setDashboardMetricStatus] = useState(true);
  const [spinnerLoad, setSpinnerLoad] = useState(false);
  const [notifayMessage, setNotifayMessage] = useState("");
  const [notifayType, setNotifayType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [user, setUser] = useState({});
  const [cohortDate, setCohortDate] = useState([]);
  const [measurementDate, setMeasurementDate] = useState([]);
  const [cohortSize, setCohortSize] = useState([]);
  const [additionalColumns, setAdditionalColumns] = useState([]);
  const [measurementField, setMeasurementField] = useState([]);

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      if (localStorage.getItem("userId")) {
        custProfileDetails(localStorage.getItem("userId"))
          .then((res) => {
            if (res.status === 200) {
              setUser(res.data);
            }
          })
          .catch((err) => {
            console.log("customerProfileDetails...err", err);
          });
      } else {
        setUser(JSON.parse(userDetails));
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const refreshToken = {
        refresh: localStorage.getItem("refreshtoken").replace(/['"]+/g, ""),
      };
      tokenUpdate(refreshToken)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("token", JSON.stringify(res.data.access));
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

  const restrictToLettersAndNumbers = (event) => {
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
  };
  
  const contextValue = {
    filter,
    setFilter,
    payloadFilter,
    setPayloadFilter,
    selectedFilter,
    setSelectedFilter,
    selectedMeasureFilter,
    setSelectedMeasureFilter,
    selectedMeasureField,
    setSelectedMeasureField,
    dataSource,
    setDataSource,
    dimension,
    setDimension,
    measure,
    setMeasure,
    sort,
    setSort,
    payloadSort,
    setPayloadSort,
    category,
    setCategory,
    xaxis,
    setXaxis,
    yaxis,
    setYaxis,
    queryResult,
    setQueryResult,
    query,
    setQuery,
    visualization,
    setVisualization,
    metricQueryResult,
    setMetricQueryResult,
    metricMeasureField,
    setMetricMeasureField,
    dashboardMetricStatus,
    setDashboardMetricStatus,
    spinnerLoad,
    setSpinnerLoad,
    notifayType,
    setNotifayType,
    notifayMessage,
    setNotifayMessage,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    user,
    setUser,
    cohortDate,
    setCohortDate,
    measurementDate,
    setMeasurementDate,
    cohortSize,
    setCohortSize,
    additionalColumns,
    setAdditionalColumns,
    measurementField,
    setMeasurementField,
    restrictToLettersAndNumbers,
  };
  return (
    <SharedDataContext.Provider value={contextValue}>
      {children}
    </SharedDataContext.Provider>
  );
};

export default SharedDataContext;
