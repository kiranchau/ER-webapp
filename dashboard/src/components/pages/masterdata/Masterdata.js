import React, { useEffect, useState } from 'react';
import TableDesign from './masterdataviews/TableDesign';
import SplitDesign from './masterdataviews/SplitDesign';
import LineChart from './masterdataviews/LineChart';
import BarChart from './masterdataviews/BarChart';
import PieChart from './masterdataviews/PieChart';
import BubbleChart from './masterdataviews/BubbleChart';
import Visualization from './Visualization';
import SaveVisualization from './SaveVisualization';
import Modal from '../../UI/Modal';
import UseSharedDataContext from '../../context/UseSharedDataContext';
import { GetQueryResult, getVisualizationList } from '../../../API/authCrud';
import { useHistory, useLocation } from "react-router-dom";
import ColumnChart from './masterdataviews/ColumnChart';
import AreaChart from './masterdataviews/AreaChart';
import { IoIosArrowForward } from 'react-icons/io';
import * as FaIcons from 'react-icons/fa'
import TrendChart from './masterdataviews/TrendChart';
import CohortAnalysis from './masterdataviews/CohortAnalysis';

const Masterdata = () => {
  const [toggleTab, setToggleTab] = useState(3);
  const [visualizationType, setVisualizationType] = useState('Table');
  const [isSaveVisualizationModalOpen, setIsSaveVisualizationModalOpen] = useState(false);
  const sharedDataContext = UseSharedDataContext();
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const history = useHistory()
  const location = useLocation()
  const { dashboard, dashboard_metric } = location.state || {};
  const [openVisual, setOpenVisual] = useState(false);

  const resetSharedDataContext = () => {
    sharedDataContext.setVisualization({ id: 1 });
    sharedDataContext.setDimension([]);
    sharedDataContext.setMeasure([]);
    sharedDataContext.setFilter([]);
    sharedDataContext.setSort([]);
    sharedDataContext.setDataSource({});
    sharedDataContext.setSelectedFilter('');
    sharedDataContext.setSelectedMeasureFilter('');
    sharedDataContext.setSelectedMeasureField('');
    sharedDataContext.setQueryResult([]);
    sharedDataContext.setQuery('');
  };

  const generateColumns = (data) => {
    const keys = Object.keys(data[0] || {});
    return keys.map(key => ({
      Header: key === 'count' ? `${sharedDataContext.dataSource.name} - ${key.charAt(0).toUpperCase() + key.slice(1)} (${sharedDataContext.selectedMeasureField})` : `${sharedDataContext.dataSource.name} - ${key.charAt(0).toUpperCase() + key.slice(1)}`,
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
    setColumns(generateColumns(sharedDataContext.queryResult));
    setData(formatData(sharedDataContext.queryResult));
  }, [sharedDataContext.queryResult]);

  useEffect(() => {
    sharedDataContext.setDimension([...sharedDataContext.cohortDate,...sharedDataContext.measurementDate])
  }, [sharedDataContext.cohortDate, sharedDataContext.measurementDate]);
  useEffect(() => {
    console.log("sharedDataContext.dimension ?",sharedDataContext.dimension)
  }, [sharedDataContext.dimension]);

  useEffect(() => {
    sharedDataContext.setMeasure([...sharedDataContext.cohortSize, ...sharedDataContext.additionalColumns, ...sharedDataContext.measurementField])
  }, [sharedDataContext.cohortSize, sharedDataContext.additionalColumns, sharedDataContext.measurementField]);
  useEffect(() => {
    console.log("sharedDataContext.measure ?",sharedDataContext.measure)
  }, [sharedDataContext.measure]);
  useEffect(() => {
    console.log("sharedDataContext.selectedMeasureFilter ?",sharedDataContext.selectedMeasureFilter)
  }, [sharedDataContext.selectedMeasureFilter]);


  useEffect(() => {
    try {
      if (dashboard_metric === undefined) {
        setTimeout(() => {
          resetSharedDataContext();
        }, 1000)
        sharedDataContext.setDashboardMetricStatus(false)
      } else {
        const detailsArray = dashboard_metric.metricsDetails.filter(item => {
          return item.metric_id == dashboard_metric.metric.id;
        });

        getVisualizationList().then(res => {
          let currentVisualization = res.data.filter(item =>
            item.id === detailsArray.map(item => item.visualization_id)[0]
          );
          sharedDataContext.setVisualization(currentVisualization[0]);
        }).catch(err => {
          console.log(err);
        });

        const updateContext = (field, setValue) => {
          const value = detailsArray.find(item => item.field_name === field)?.field_value;
          if (value) setValue(value);
        };

        updateContext('dimension', sharedDataContext.setDimension);
        updateContext('measure', sharedDataContext.setMeasure);
        updateContext('filter', sharedDataContext.setFilter);
        updateContext('sort', sharedDataContext.setSort);
        updateContext('dataSource', sharedDataContext.setDataSource);
        updateContext('selectedFilter', sharedDataContext.setSelectedFilter);
        updateContext('selectedMeasureFilter', sharedDataContext.setSelectedMeasureFilter);
        updateContext('selectedMeasureField', sharedDataContext.setSelectedMeasureField);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }, [dashboard_metric]);

  const toggleState = (index) => {
    setToggleTab(index);
  };
 
  useEffect(() => {
    let isMounted = true;
    if(sharedDataContext.payloadFilter !== "" && sharedDataContext.selectedFilter !== "" && sharedDataContext.selectedMeasureFilter !== "" &&  sharedDataContext.dataSource.db_table !== undefined && sharedDataContext.dimension.length > 0 && sharedDataContext.measure.length > 0){
      const dimensionArray = sharedDataContext.dimension.map(item => `${item?.db_table}.${item?.db_table_fields}`);
      const measureArray = sharedDataContext.measure.map(item => `${item?.db_table}.${item?.db_table_fields}`);
      const data = {
        filter: sharedDataContext.payloadFilter,
        selectedFilter: sharedDataContext.selectedFilter,
        selectedMeasureFilter: sharedDataContext.selectedMeasureFilter,
        data_source: sharedDataContext.dataSource.db_table,
        dimension: dimensionArray,
        measure: measureArray,
        sort: sharedDataContext.payloadSort
      };
      GetQueryResult(data)
        .then(res => {
          if (isMounted) {
            console.log("query result ??", res.data.results);
            sharedDataContext.setQueryResult(res.data.results);
            sharedDataContext.setQuery(res.data.query);
          }
        })
        .catch(err => {
          if (isMounted) {
            console.log(err);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [sharedDataContext.payloadFilter, sharedDataContext.selectedFilter, sharedDataContext.selectedMeasureFilter, sharedDataContext.dataSource, sharedDataContext.dimension, sharedDataContext.measure, sharedDataContext.payloadSort]);

  const tabMenu = [
    { id: 1, title: "Table" },
    { id: 2, title: "Chart" },
    { id: 3, title: "Split" }
  ];

  const renderContent = () => {
    if (toggleTab === 1) {
      return <TableDesign columns={columns} setColumns={setColumns} data={data} setData={setData} />;
    }
    if (toggleTab === 2) {
      switch (sharedDataContext.visualization.id) {
        case 2:
          return <CohortAnalysis />;
        case 4:
          return <AreaChart />;
        case 5:
          return <TrendChart />;
        case 6:
          return <LineChart />;
        case 7:
          return <BarChart />;
        case 8:
          return <BubbleChart />;
        case 9:
          return <ColumnChart />;
        case 10:
          return <PieChart />;
        default:
          return <div className="h-64">No content available</div>;
      }
    }
    if (toggleTab === 3) {
      return <SplitDesign columns={columns} data={data} visualizationType={sharedDataContext.visualization.id} />;
    }
  };

  return (
    <div className='flex w-full'>
      <div className='bg-gray-50 px-3 pt-[65px] h-screen overflow-y-auto flex-auto w-[60vw]'>
        <div className='relative'>
        {dashboard_metric && (
          <div className='flex mt-2'>
            <div
              onClick={() => history.push("/dashboard")}
              className="flex items-center mb-2"
            >
              <span className="text-indigo-600 cursor-pointer">Dashboards</span>
              <IoIosArrowForward className="text-gray-500" />
            </div>
            <div
              onClick={() => history.push(`/dashboard/details/${dashboard_metric.dashboard.id}`)}
              className="flex items-center ml-2 mb-2"
            >
              <span className="text-indigo-600 cursor-pointer">{dashboard_metric.dashboard.name}</span>
              <IoIosArrowForward className="text-gray-500" />
            </div>
          </div>
        )}
        <div className='text-xl border-b py-1'>{dashboard_metric ? dashboard_metric.metric.name : 'Explore'}</div>
        <div onClick={() => setOpenVisual(!openVisual)} className=' text-gray-400 absolute -right-[12px] border-s-2 border-y-2 rounded-s top-0 p-1 cursor-pointer'>
        { openVisual ? <FaIcons.FaArrowRight  /> :
        <FaIcons.FaArrowLeft />}
        </div>
        </div>
        <div className='flex justify-between items-center py-2 border-b'>
          <div className='flex gap-3 text-xs'>
            {tabMenu.map((menu, index) => (
              <button key={index}
                className={toggleTab === menu.id ? "border px-2 py-1 rounded-md bg-indigo-100 border-indigo-600 text-indigo-600" : "border px-2 py-1 rounded-md"}
                onClick={() => toggleState(menu.id)}>
                {menu.title}
              </button>
            ))}
          </div>
          <Modal
            isOpen={isSaveVisualizationModalOpen}
            onClose={() => setIsSaveVisualizationModalOpen(false)}
          >
            <SaveVisualization setIsSaveVisualizationModalOpen={setIsSaveVisualizationModalOpen} dashboard={dashboard} dashboardMetric={dashboard_metric}/>
          </Modal>
          <div className='flex gap-3 text-xs'>
            <button className='border px-4 py-1 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white'>Refresh</button>
            <button className='border px-4 py-1 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white' onClick={() => {
              setIsSaveVisualizationModalOpen(true);
            }}>Save</button>
          </div>
        </div>
        <div>
          {renderContent()}
        </div>
      </div>
      <div className={`${'max-w-[400px] bg-gray-300 pt-[65px] px-2 h-screen flex-auto'} ${openVisual ? "-mr-[500px] hidden" :" mr-0 transition duration-150 ease-out"}`}>
        <Visualization visualizationType={visualizationType} setVisualizationType={setVisualizationType} columns={columns} setColumns={setColumns} />
      </div>
      
    </div>
  );
};

export default Masterdata;
