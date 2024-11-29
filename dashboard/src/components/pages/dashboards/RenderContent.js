import React, { useEffect } from 'react';
import DisplayTable from './dashboardviews/DisplayTable';
import AreaChart from './dashboardviews/AreaChart';
import LineChart from './dashboardviews/LineChart';
import BarChart from './dashboardviews/BarChart';
import BubbleChart from './dashboardviews/BubbleChart';
import ColumnChart from './dashboardviews/ColumnChart';
import PieChart from './dashboardviews/PieChart';
import { GetMetricDetails, GetQueryResult } from '../../../API/authCrud';
import UseSharedDataContext from '../../context/UseSharedDataContext';
import { useState } from 'react';
import UseMetricDetailsContext from '../../context/UseMetricDetailsContext';
import TrendChart from './dashboardviews/TrendChart';

const RenderContent = ({ metric, metricsDetails, setMetricsDetails }) => {
  const sharedDataContext = UseSharedDataContext();
  const metricDetailsContext = UseMetricDetailsContext();
  const [metricResult, setMetricResult] = useState([])
  const [metricMeasureField, setMetricMeasureField] = useState('')
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const generateColumns = (data) => {
    const keys = Object.keys(data[0] || {});
    return keys.map((key) => ({
      Header:
        key === "count"
          ? `${metricsDetails.find((item) => item.field_name === "dataSource")
            ?.field_value.name
          } - ${key.charAt(0).toUpperCase() + key.slice(1)} (${metricsDetails.find(
            (item) => item.field_name === "selectedMeasureField"
          )?.field_value
          })`
          : `${metricsDetails.find((item) => item.field_name === "dataSource")
            ?.field_value.name
          } - ${key.charAt(0).toUpperCase() + key.slice(1)}`,
      accessor: key.toLowerCase(),
    }));
  };

  const formatData = (data) => {
    return data.map((item) => {
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
    fetchMetricDetails(metric)
  }, [metric])

  const fetchMetricDetails = async (metric) => {
    try {
      const res = await GetMetricDetails();
      const metricDetailsArray = res.data.filter(details => details.metric_id === metric.id);
      setMetricsDetails(prevState => [...prevState, ...metricDetailsArray]);
      metricDetailsContext.setMetricData(metricDetailsArray)
      if(metricDetailsArray.find(item => item.field_name === 'filter')?.field_value.map(item => item.db_table_fields) !== "" && 
      metricDetailsArray.find(item => item.field_name === 'selectedFilter')?.field_value !== "" && 
      metricDetailsArray.find(item => item.field_name === 'selectedMeasureFilter')?.field_value !== "" &&  
      metricDetailsArray.find(item => item.field_name === 'dataSource')?.field_value.db_table !== undefined 
      && metricDetailsArray.find(item => item.field_name === 'dimension')?.field_value.length > 0 
      && metricDetailsArray.find(item => item.field_name === 'measure')?.field_value.length > 0){
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
  
        // sharedDataContext.setMetricMeasureField(metricDetailsArray.find(item => item.field_name === 'selectedMeasureField')?.field_value);
        setMetricMeasureField(metricDetailsArray.find(item => item.field_name === 'selectedMeasureField')?.field_value)
        const queryRes = await GetQueryResult(data);
        // sharedDataContext.setMetricQueryResult(queryRes.data.results);
        setMetricResult(queryRes.data.results)
       }
    } catch (error) {
      console.error("Error fetching metric details:", error);
    }
  };
  switch (metric.visualization_id) {
    case 1:
      return <div className='h-[400px] overflow-auto'><DisplayTable columns={columns} setColumns={setColumns} data={data} setData={setData} /></div>;
    case 4:
      return <div className="h-40"><AreaChart metricResult={metricResult} metricMeasureField={metricMeasureField} /></div>;
    case 5:
      return <div className="h-40"><TrendChart metricResult={metricResult} metricMeasureField={metricMeasureField} /></div>;
    case 6:
      return <div className="h-[400px]"><LineChart metricResult={metricResult} metricMeasureField={metricMeasureField} /></div>;
    case 7:
      return <div className="h-[400px]"><BarChart metricResult={metricResult} metricMeasureField={metricMeasureField} /></div>;
    case 8:
      return <div className="h-[400px]"><BubbleChart metricResult={metricResult} metricMeasureField={metricMeasureField} /></div>;
    case 9:
      return <div className="h-[400px]"><ColumnChart metricResult={metricResult} metricMeasureField={metricMeasureField} /></div>;
    case 10:
      return <div className="h-[400px]"><PieChart metricResult={metricResult} metricMeasureField={metricMeasureField} /></div>;
    default:
      return <div className="h-64">No content available</div>;
  }
};

export default RenderContent;
