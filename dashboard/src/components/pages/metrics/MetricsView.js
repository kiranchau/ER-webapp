import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import DisplayTable from './metricsviews/DisplayTable';
import LineChart from './metricsviews/LineChart';
import PieChart from './metricsviews/PieChart';
import BarChart from './metricsviews/BarChart';
import Modal from '../../UI/Modal';
import AddToDashboard from './metricsviews/AddToDashboard';
import { GetMetricDetails, GetQueryResult } from '../../../API/authCrud';
import UseSharedDataContext from '../../context/UseSharedDataContext';
import ColumnChart from './metricsviews/ColumnChart';
import BubbleChart from './metricsviews/BubbleChart';
import AreaChart from './metricsviews/AreaChart';
import TrendChart from './metricsviews/TrendChart';

const MetricsView = ({ metric, setSelectedMetric, isModal, dashboard }) => {
  const location = useLocation();
  const history = useHistory();
  const selectedMetric = metric || location.state?.metric;
  const [isAddToDashboardModalOpen, setIsAddToDashboardModalOpen] = useState(false);
  const sharedDataContext = UseSharedDataContext();
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [metricsDetails, setMetricsDetails] = useState([]);
  const [metricResult, setMetricResult] = useState([])
  const [metricMeasureField, setMetricMeasureField] = useState('')

  const generateColumns = (data) => {
    const keys = Object.keys(data[0] || {});
    return keys.map(key => ({
      Header: key === 'count' ? `${metricsDetails.find(item => item.field_name === 'dataSource')?.field_value.name} - ${key.charAt(0).toUpperCase() + key.slice(1)} (${metricsDetails.find(item => item.field_name === 'selectedMeasureField')?.field_value})` : `${metricsDetails.find(item => item.field_name === 'dataSource')?.field_value.name} - ${key.charAt(0).toUpperCase() + key.slice(1)}`,
      accessor: key.toLowerCase(),
    }));
  };

  const formatData = (data) => {
    return data.map(item => {
      const formattedItem = {};
      if (item) {
        for (const key in item) {
          formattedItem[key.toLowerCase()] = item[key];
        }
      }
      return formattedItem;
    });
  };

  useEffect(() => {
    setColumns(generateColumns(metricResult));
    setData(formatData(metricResult));
  }, [metricResult]);

  useEffect(() => {
    if (selectedMetric && selectedMetric.id) {
      GetMetricDetails()
        .then(res => {
          const metricDetailsArray = [];
          res.data.forEach(details => {
            if (details.metric_id === selectedMetric.id) {
              metricDetailsArray.push(details);
            }
          });
          setMetricsDetails(metricDetailsArray)
          if(metricDetailsArray.find(item => item.field_name === 'filter')?.field_value.map(item => item.db_table_fields) !== "" && 
          metricDetailsArray.find(item => item.field_name === 'selectedFilter')?.field_value !== "" && 
          metricDetailsArray.find(item => item.field_name === 'selectedMeasureFilter')?.field_value !== "" &&  
          metricDetailsArray.find(item => item.field_name === 'dataSource')?.field_value.db_table !== undefined 
          && metricDetailsArray.find(item => item.field_name === 'dimension')?.field_value.length > 0 
          && metricDetailsArray.find(item => item.field_name === 'measure')?.field_value.length > 0){
                      // Now that metric details are set, fetch query results
          const dimensionArray = metricDetailsArray.find(item => item.field_name === 'dimension')?.field_value.map(outeritem => `${metricDetailsArray.find(item => item.field_name === 'dataSource')?.field_value.db_table}.${outeritem.db_table_fields}`) || [];
          const measureArray = metricDetailsArray.find(item => item.field_name === 'measure')?.field_value.map(outeritem => `${metricDetailsArray.find(item => item.field_name === 'dataSource')?.field_value.db_table}.${outeritem.db_table_fields}`) || [];
          const data = {
            filter: `${metricDetailsArray.find(item => item.field_name === 'dataSource')?.field_value.db_table}.${metricDetailsArray.find(item => item.field_name === 'filter')?.field_value.map(item => item.db_table_fields).join('.')}` || '',
            selectedFilter: metricDetailsArray.find(item => item.field_name === 'selectedFilter')?.field_value || '',
            selectedMeasureFilter: metricDetailsArray.find(item => item.field_name === 'selectedMeasureFilter')?.field_value || '',
            data_source: metricDetailsArray.find(item => item.field_name === 'dataSource')?.field_value.db_table || {},
            dimension: dimensionArray,
            measure: measureArray,
            sort: metricDetailsArray.find(item => item.field_name === 'sort')?.field_value.length > 0 && `${metricDetailsArray.find(item => item.field_name === 'dataSource')?.field_value.db_table}.${metricDetailsArray.find(item => item.field_name === 'sort')?.field_value.map(item => item.db_table_fields).join('.')}` || '',
          };
          // sharedDataContext.setMetricMeasureField(metricDetailsArray.find(item => item.field_name === 'selectedMeasureField')?.field_value)
          setMetricMeasureField(metricDetailsArray.find(item => item.field_name === 'selectedMeasureField')?.field_value)
          GetQueryResult(data)
            .then(queryRes => {
              // sharedDataContext.setMetricQueryResult(queryRes.data.results);
              setMetricResult(queryRes.data.results)
            })
            .catch(err => {
              console.error("Error fetching data:", err);
            });
          }
        })
        .catch(err => {
          console.error("Error fetching metric details:", err);
        });
    }
  }, [selectedMetric]);

  const renderContent = () => {
    switch (selectedMetric.visualization_id) {
      case 1:
        return (
          <div className='h-[400px] overflow-auto'><DisplayTable columns={columns} setColumns={setColumns} data={data} setData={setData}/></div>
        );
      case 4:
        return <div className="h-40"><AreaChart metricResult={metricResult} metricMeasureField={metricMeasureField}/></div>;
      case 5:
        return <div className="h-40"><TrendChart metricResult={metricResult} metricMeasureField={metricMeasureField}/></div>;
      case 6:
        return <div className="h-[400px]"><LineChart metricResult={metricResult} metricMeasureField={metricMeasureField}/></div>;
      case 7:
        return <div className="h-[400px]"><BarChart metricResult={metricResult} metricMeasureField={metricMeasureField}/></div>;
      case 8:
        return <div className="h-[400px]"><BubbleChart metricResult={metricResult} metricMeasureField={metricMeasureField}/></div>;
      case 9:
        return <div className="h-[400px]"><ColumnChart metricResult={metricResult} metricMeasureField={metricMeasureField}/></div>;
      case 10:
        return <div className="h-[400px]"><PieChart metricResult={metricResult} metricMeasureField={metricMeasureField}/></div>;
      default:
        return <div className="h-64">No content available</div>;
    }
  };

  const goBack = () => {
    if (isModal) {
      setSelectedMetric(null)
    } else {
      history.goBack();
    }
  };

  return (
    <div className="PageContent flex h-screen">
      {/* Left Section */}
      <Modal
        isOpen={isAddToDashboardModalOpen}
        onClose={() => setIsAddToDashboardModalOpen(false)}
      >
        <AddToDashboard selectedMetric={selectedMetric} dashboard={dashboard} setIsAddToDashboardModalOpen={setIsAddToDashboardModalOpen} />
      </Modal>
      <div className="w-4/5 p-6">
        <div className="flex items-center mb-4">
          <span onClick={goBack} className="text-indigo-600 cursor-pointer">Metrics Store</span>
          <IoIosArrowForward className="text-gray-500" />
        </div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{selectedMetric.title}</h1>
          <p className="text-gray-600">{selectedMetric.description}</p>
        </div>
        <div className="bg-white p-4 border rounded-lg">
          {renderContent()}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/5 p-6 flex items-start justify-center">
        <button onClick={() => setIsAddToDashboardModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md">
          Add to Dashboard
        </button>
      </div>
    </div>
  );
};

export default MetricsView;