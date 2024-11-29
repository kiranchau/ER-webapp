import React, { useEffect, useState } from 'react';
import tableicon from '../../../media/home1.png';
import bubbleicon from '../../../media/home2.png';
import cohorticon from '../../../media/home3.png';
import lineicon from '../../../media/home4.png';
import baricon from '../../../media/home5.png';
import pieicon from '../../../media/home6.png';
import template from '../../../media/template.png';
import { useHistory } from "react-router-dom";
import Modal from '../../UI/Modal';
import AddToDashboard from './metricsviews/AddToDashboard';
import Button from '../../UI/Button';
import * as FaIcons from 'react-icons/fa';
import { GetMetricsList, GetMetricDetails } from '../../../API/authCrud';
import UseSharedDataContext from '../../context/UseSharedDataContext';
import Spinner from '../../UI/Spinner';
import MetricsCards from '../../UI/MetricsCards';
import TemplateCard from '../../UI/TemplateCard';

const Metrics = ({ onCardClick, isModal, dashboard }) => {
  const history = useHistory();
  const sharedDataContext = UseSharedDataContext();
  const [activeTab, setActiveTab] = useState('metrics');
  const [isAddToDashboardModalOpen, setIsAddToDashboardModalOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState({});
  const [activeAsideOption, setActiveAsideOption] = useState('recommended');
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    let isMounted = true;
    sharedDataContext.setSpinnerLoad(true);
    const fetchData = async () => {
      try {
        const metricsListResponse = await GetMetricsList();
        const metricsList = metricsListResponse.data;
        const metricDetailsResponse = await GetMetricDetails();

        const metricsPromises = metricsList.map(async (metric) => {
          try {
            const matchedMetric = metricDetailsResponse.data.find(
              (details) => details.metric_id === metric.id
            );

            if (matchedMetric) {
              return {
                ...metric,
                visualization_id: matchedMetric.visualization_id,
              };
            } else {
              return null;
            }
          } catch (err) {
            console.error('Error fetching metric details:', err);
            return null;
          }
        });

        const resolvedMetrics = await Promise.all(metricsPromises);
        console.log("resolvedMetrics ??", resolvedMetrics)
        const updatedMetrics = resolvedMetrics.filter((metric) => metric !== null && metric.marketplace === true);
        console.log("updatedMetrics ??", updatedMetrics)
        if (isMounted) {
          setMetrics(updatedMetrics);
          sharedDataContext.setSpinnerLoad(false);
        }
      } catch (err) {
        console.error('Error fetching metrics list:', err);
        sharedDataContext.setSpinnerLoad(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const getMetricIcon = (visualization_id) => {
    switch (visualization_id) {
      case 1:
        return tableicon;
      case 2:
        return cohorticon;
      case 3:
        return tableicon;
      case 4:
        return lineicon;
      case 5:
        return lineicon;
      case 6:
        return lineicon;
      case 7:
        return baricon;
      case 8:
        return bubbleicon;
      case 9:
        return baricon;
      case 10:
        return pieicon;
      case 11:
        return tableicon;
      case 12:
        return tableicon;
      case 13:
        return tableicon;
      case 14:
        return tableicon;
      case 15:
        return tableicon;
      case 16:
        return tableicon;
      default:
        return '';
    }
  };

  const templates = [
    {
      image: template,
      title: 'State of the Business',
      description: 'State of the business dashboard based on stripe analytics',
    },
    {
      image: template,
      title: 'Funnel Overview',
      description: 'State of the business dashboard based on stripe analytics',
    },
    {
      image: template,
      title: 'Contracts Overview',
      description: 'State of the business dashboard based on stripe analytics',
    },
    {
      image: template,
      title: 'Funnel Cohort Analysis',
      description: 'State of the business dashboard based on stripe analytics',
    },
    {
      image: template,
      title: 'Sales Performance',
      description: 'State of the business dashboard based on stripe analytics',
    },
    {
      image: template,
      title: 'Sales Pipeline',
      description: 'State of the business dashboard based on stripe analytics',
    },
    {
      image: template,
      title: 'Leads Management',
      description: 'State of the business dashboard based on stripe analytics',
    },
    {
      image: template,
      title: 'Sales Rep Dashboard',
      description: 'State of the business dashboard based on stripe analytics',
    },
  ];

  const asideSections = {
    explore: [
      { label: 'Recommended for you', value: 'recommended' },
      { label: 'All', value: 'all' },
    ],
    byTeam: [
      { label: 'Executive', value: 'executive' },
      { label: 'Marketing', value: 'marketing' },
      { label: 'Sales', value: 'sales' },
      { label: 'Product', value: 'product' },
      { label: 'Finance', value: 'finance' },
      { label: 'Service', value: 'service' },
    ],
    integrations: [
      { label: 'Salesforce', value: 'salesforce' },
      { label: 'HubSpot', value: 'hubspot' },
    ],
    models: [
      { label: 'State of the Business', value: 'state-of-business' },
      { label: 'Invoices', value: 'invoices' },
      { label: 'MRR Overview', value: 'mrr-overview' },
      { label: 'Devices', value: 'devices' },
      { label: 'Leads', value: 'leads' },
      { label: 'Conversations', value: 'conversations' },
      { label: 'Opportunities', value: 'opportunities' },
      { label: 'Accounts Revenue', value: 'accounts-revenue' },
      { label: 'Sales Flow', value: 'sales-flow' },
      { label: 'Team Performance', value: 'team-performance' },
      { label: 'Task Tracking', value: 'task-tracking' },
      { label: 'Product Analytics', value: 'product-analytics' },
      { label: 'Balance Transactions', value: 'balance-transactions' },
      { label: 'ROI', value: 'roi' },
      { label: 'Website Overview', value: 'website-overview' },
      { label: 'Deals', value: 'deals' },
    ],
  };

  const handleCardClick = (metric) => {
    if (isModal && onCardClick) {
      onCardClick(metric);
    } else {
      history.push({
        pathname: "/dashboard/metrics/details",
        state: { metric },
      });
    }
  };

  const handleAsideClick = (option) => {
    setActiveAsideOption(option);
  };

  return (
    <div className="PageContent min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-2 border-b">
        <h1 className="PageTitle">Metrics</h1>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="p-1 border border-gray-300 rounded"
          />
          <Button onClick={() => history.push('/dashboard/explore', { dashboard: dashboard })}> <FaIcons.FaPlus />Create Metric</Button>
        </div>
      </header>
      <Modal
        isOpen={isAddToDashboardModalOpen}
        onClose={() => setIsAddToDashboardModalOpen(false)}
      >
        <AddToDashboard selectedMetric={selectedMetric} dashboard={dashboard} setIsAddToDashboardModalOpen={setIsAddToDashboardModalOpen} />
      </Modal>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-1/5 bg-white p-4 rounded shadow-md overflow-y-auto adHgt">
          <h2 className="text-gray-400 font-light mb-2">EXPLORE</h2>
          <ul className="space-y-1">
            {asideSections.explore.map((option) => (
              <li
                key={option.value}
                className={`cursor-pointer ${activeAsideOption === option.value ? 'text-indigo-600' : ''}`}
                onClick={() => handleAsideClick(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
          <h2 className="text-sm text-gray-400 font-light mt-4 mb-2">BY TEAM</h2>
          <ul className="space-y-1">
            {asideSections.byTeam.map((option) => (
              <li
                key={option.value}
                className={`cursor-pointer ${activeAsideOption === option.value ? 'text-indigo-600' : ''}`}
                onClick={() => handleAsideClick(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
          <h2 className="text-sm text-gray-400 font-light mt-4 mb-2">INTEGRATIONS</h2>
          <ul className="space-y-1">
            {asideSections.integrations.map((option) => (
              <li
                key={option.value}
                className={`cursor-pointer ${activeAsideOption === option.value ? 'text-indigo-600' : ''}`}
                onClick={() => handleAsideClick(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
          <h2 className="text-sm text-gray-400 font-light mt-4 mb-2">MODELS</h2>
          <ul className="space-y-1 mb-16">
            {asideSections.models.map((option) => (
              <li
                key={option.value}
                className={`cursor-pointer ${activeAsideOption === option.value ? 'text-indigo-600' : ''}`}
                onClick={() => handleAsideClick(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 ml-6 p-4 overflow-y-auto adHgt">
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setActiveTab('metrics')}
              className={`px-4 py-2 rounded ${activeTab === 'metrics' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-200'}`}
            >
              Metrics
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-4 py-2 rounded ${activeTab === 'templates' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-200'}`}
            >
              Templates
            </button>
          </div>
          {activeTab === 'metrics' ? (
            <>
              {sharedDataContext.spinnerLoad === true ? (
                <Spinner />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {metrics.length > 0 && metrics.map((metric, index) => (
                    <MetricsCards 
                    key={index}
                    onClick={() => handleCardClick(metric)}
                    metricImage={getMetricIcon(metric.visualization_id)}
                    metricTitle={metric.name}
                    metricDesc={metric.description}
                    onSet={() => {
                        setSelectedMetric(metric);
                        setIsAddToDashboardModalOpen(true);
                      }}
                  />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {templates.map((template, index) => (
                <>
                <TemplateCard 
                  key={index}
                  tempImage={template.image}
                  tempTitle={template.title}
                  tempDesc={template.description}
                  onClick={() => setIsAddToDashboardModalOpen(true)}
                />
                {/* <div key={index} className="relative bg-white shadow-md rounded-lg overflow-hidden cursor-pointer group border border-neutral-300">
                  <div className="h-20 flex items-center px-4 pt-4">
                    <img src={template.image} alt={template.title} className="object-contain max-h-full" />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl mb-2">{template.title}</h2>
                    <p className='mt-1 text-xs'>{template.description}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-90 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={() => setIsAddToDashboardModalOpen(true)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded">
                      Add
                    </button>
                  </div>
                </div> */}
                </>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Metrics;
