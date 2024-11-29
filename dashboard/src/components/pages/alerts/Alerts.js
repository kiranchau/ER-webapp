import React from "react";
import AlertsSource from "./AlertsSource";
import AlertDisplay from "./AlertDisplay";
import { IoIosArrowForward } from "react-icons/io";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Alerts = () => {
  const history = useHistory();
  return (
    <div className="bg-gray-100 p-[0px] mt-[64px] w-full z-10">
      <div className="flex ">
        <div className="w-1/2 bg-white h-screen overflow-hidden p-5">
          <div style={{ width: "80%" }}>
            <div
              onClick={() => {history.push("/dashboard/alerts")}}
              className="flex items-center mb-2"
            >
              <span className="text-indigo-600 cursor-pointer">Alerts</span>
              <IoIosArrowForward className="text-gray-500" />
            </div>
          </div>
          <div className='text-2xl py-5'>Create alert</div>
          <AlertsSource />
        </div>
        <div className="w-1/2">
          <div className="flex items-center justify-center">
            <AlertDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
