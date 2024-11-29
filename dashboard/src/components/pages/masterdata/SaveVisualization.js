import React, { useEffect, useState } from 'react';
import { CreateDashboardMetrics, SaveMetricsDetails, SaveVisualizationMetrics, UpdateMetrics, allMatricsDashboard } from '../../../API/authCrud';
import UseSharedDataContext from '../../context/UseSharedDataContext';

const SaveVisualization = ({ setIsSaveVisualizationModalOpen, dashboard, dashboardMetric }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dashboard: '',
    saveToMarketplace: false,
  });
  const [dashboards, setDashboards] = useState([]);
  const sharedDataContext = UseSharedDataContext();

  const [user, setUser] = useState({})
  let userDetails = localStorage.getItem('userDetails')
  useEffect(() => {
    console.log("userDetails ?", JSON.parse(userDetails))
    setUser(JSON.parse(userDetails))
  }, [userDetails])

  useEffect(() => {
    allMatricsDashboard().then(res => {
      setDashboards(res.data);
    }).catch(err => {
      console.error("Error fetching dashboards:", err);
    });
  }, []);

  useEffect(() => {
    if (dashboard && dashboard.id) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        dashboard: dashboard.id.toString(),
      }));
    }
  }, [dashboard]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      description: formData.description,
      marketplace: formData.saveToMarketplace
    };

    if (dashboardMetric !== undefined) {
      UpdateMetrics(dashboardMetric.metric.id, payload).then(res => {
        console.log("UpdateMetrics ?", res)
        setIsSaveVisualizationModalOpen(false)
      }).catch(err => {
        console.log(err)
      })
    } else {
      SaveVisualizationMetrics(payload).then(res => {
        console.log("SaveVisualizationMetrics ??", res.data);
        const dashboardMetricsPayload = {
          metric_id: res.data.id,
          dashboard_id: formData.dashboard,
        };
        CreateDashboardMetrics(dashboardMetricsPayload).then(res => {
          console.log("CreateDashboardMetrics ??", res);
        }).catch(err => {
          console.log(err);
        });

        const contextStates = {
          filter: sharedDataContext.filter,
          selectedFilter: sharedDataContext.selectedFilter,
          selectedMeasureFilter: sharedDataContext.selectedMeasureFilter,
          selectedMeasureField: sharedDataContext.selectedMeasureField,
          dataSource: sharedDataContext.dataSource,
          dimension: sharedDataContext.dimension,
          measure: sharedDataContext.measure,
          sort: sharedDataContext.sort
        };
        const dynamicPayload = Object.keys(contextStates)
          .filter(key => contextStates[key] !== undefined && contextStates[key] !== null && contextStates[key] !== '')
          .map(key => ({
            source_type: "models",
            field_name: key,
            field_value: contextStates[key],
            metric_id: res.data.id,
            visualization_id: sharedDataContext.visualization.id,
            source_id: sharedDataContext.dataSource.id,
            stored_query: sharedDataContext.query
          }));

        SaveMetricsDetails(dynamicPayload).then(res => {
          console.log("SaveMetricsDetails ??", res);
          if(res.status === 201){
            console.log("SaveMetricsDetails ?? 101", res);
            sharedDataContext.setNotifayMessage("Master Data Visualization Successfully.");
            sharedDataContext.setNotifayType("success");
            setIsSaveVisualizationModalOpen(false)
          }
        }).catch(err => {
          sharedDataContext.setNotifayMessage("Master Data Visualization Not Successfully Insert.");
          sharedDataContext.setNotifayType("error");
          console.log(err);
        });

      }).catch(err => {
        console.log(err);
      });
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Save Visualization</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-[400px] h-[33px] border border-gray-300 rounded-md shadow-sm text-xs p-2"
            placeholder="Enter a name"
            maxLength={100}
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Description (Optional)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className='text-xs'
            style={{
              border: "1px solid #D9D9D9",
              borderRadius: "5px",
              padding: "5px",
              marginTop: "0px",
              width: "400px",
              height: "110px",
            }}
            rows="3"
            placeholder="Enter a short description"
          ></textarea>
          <div className="text-right text-gray-500 text-xs mt-1">
            {formData.description.length}/250
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Dashboard</label>
          <select
            name="dashboard"
            value={formData.dashboard}
            onChange={handleChange}
            className="block w-[400px] h-[33px] mt-1 border rounded-md shadow-sm py-2 px-3 text-xs"
            disabled={!!dashboard} // Disable the select if dashboard prop is provided
          >
            <option value="" disabled>Choose dashboard</option>
            {dashboards.length > 0 && dashboards.map((item, index) => (
              <option key={index} value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center mb-6">
          {/* <span className="text-gray-700">Save to {JSON.parse(userDetails).customer.org_name} marketplace</span> */}
          <span className="text-gray-700">Save to marketplace</span>
          <input
            type="checkbox"
            name="saveToMarketplace"
            checked={formData.saveToMarketplace}
            onChange={handleChange}
            className="form-checkbox ml-2 h-4 w-4 text-indigo-600"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="text-gray-700 hover:text-gray-900"
            onClick={() => setIsSaveVisualizationModalOpen(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default SaveVisualization;
