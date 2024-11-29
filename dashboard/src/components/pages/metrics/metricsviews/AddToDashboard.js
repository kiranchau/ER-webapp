import React, { useEffect, useState } from "react";
import {
  allMatricsDashboard,
  CreateDashboardMetrics,
} from "../../../../API/authCrud";
import UseSharedDataContext from "../../../context/UseSharedDataContext";

const AddToDashboard = ({
  selectedMetric,
  dashboard,
  setIsAddToDashboardModalOpen,
}) => {
  const [dashboards, setDashboards] = useState([]);
  const [selectedDashboardId, setSelectedDashboardId] = useState("");
  const sharedContext = UseSharedDataContext();

  useEffect(() => {
    allMatricsDashboard()
      .then((res) => {
        setDashboards(res.data);
      })
      .catch((err) => {
        console.error("Error fetching dashboards:", err);
      });
  }, []);

  useEffect(() => {
    if (dashboard && dashboard.id) {
      setSelectedDashboardId(dashboard.id.toString());
    }
  }, [dashboard]);

  const handleDashboardSelect = (event) => {
    const selectedId = event.target.value;
    setSelectedDashboardId(selectedId);
  };

  const handleAddClick = () => {
    if (!selectedDashboardId) {
      console.log("No dashboard selected");
      return;
    }

    const dashboardMetricsPayload = {
      metric_id: selectedMetric.id,
      dashboard_id: selectedDashboardId,
    };

    CreateDashboardMetrics(dashboardMetricsPayload)
      .then((res) => {
        if (res.status === 201) {
          sharedContext.setNotifayMessage("Add " + selectedMetric?.name + " Successfully.");
          sharedContext.setNotifayType("success");
          setIsAddToDashboardModalOpen(false);
          console.log("CreateDashboardMetrics response:", res);
        }
      })
      .catch((err) => {
        sharedContext.setNotifayMessage("Something went wrong.");
        sharedContext.setNotifayType("error");
        console.error("Error in CreateDashboardMetrics:", err);
      });
  };

  const selectedDashboard = dashboards.find(
    (dashboard) => dashboard.id === parseInt(selectedDashboardId)
  );

  console.log("Selected Dashboard Details:", selectedDashboard);

  return (
    <div className="w-[600px] overflow-auto bg-white rounded-lg shadow-lg p-6">
      <div className="text-xl ml-2 mt-2 mb-4">
        Add '{selectedMetric.name}' to dashboard
      </div>
      <div className="mt-4">
        <div className="text-sm ml-1 mt-2 mb-1">Dashboard</div>
        <select
          className="block w-full h-[33px] mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-xs"
          onChange={handleDashboardSelect}
          value={selectedDashboardId}
          disabled={!!dashboard}
        >
          <option value="" disabled>
            Select Dashboard
          </option>
          {dashboards.length > 0 &&
            dashboards.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium bg-indigo-600 hover:bg-indigo-700 text-white sm:ml-3 sm:w-auto sm:text-sm"
          onClick={handleAddClick}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddToDashboard;
