import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { BsArrowUpRightSquare } from "react-icons/bs";
import CreateModel from './modelandentitiesviews/CreateModel';
import Modal from '../../UI/Modal';
import Button from '../../UI/Button';
import * as FaIcons from 'react-icons/fa';

const ModelsAndEntities = () => {
  const history = useHistory();
  const [isCreateModelModalOpen, setIsCreateModelModalOpen] = useState(false);
  const [activeAsideOption, setActiveAsideOption] = useState('featured');

  const modelsAndEntities = [
    {
      title: 'State of the Business',
      description: 'Daily snapshots of business state',
      entity: 'MRR State',
    },
    {
      title: 'Deals',
      description: 'Track, and analyze the journey of deals',
      entity: 'Deals',
    },
    {
      title: 'Contacts',
      description: 'Optimizes lead generation and conversion',
      entity: 'Contacts',
    },
    {
      title: 'Invoices',
      description: 'List of invoices',
      entity: 'Invoices',
    },
    {
      title: 'MRR Overview',
      description: 'An overview of the MRR state',
      entity: 'MRR Overview',
    },
    {
      title: 'Devices',
      description: 'List of devices in Google Analytics 4',
      entity: 'Devices',
    },
    {
      title: 'Accounts Revenue',
      description: 'Accounts Revenue',
      entity: 'Accounts Revenue',
    },
    {
      title: 'Conversations',
      description: 'List of conversations in Intercom',
      entity: 'Conversations',
    },
  ];

  const asideSections = {
    explore: [
      { label: 'Recommended for you', value: 'recommended' },
      { label: 'Featured', value: 'featured' },
      { label: 'All', value: 'all' },
    ],
    types: [
      { label: 'Product', value: 'product' },
      { label: 'Marketing', value: 'marketing' },
      { label: 'CSM', value: 'csm' },
      { label: 'CRM', value: 'crm' },
      { label: 'Billing', value: 'billing' },
      { label: 'Alta', value: 'alta' },
    ],
    integrations: [
      { label: 'Salesforce', value: 'salesforce' },
      { label: 'HubSpot', value: 'hubspot' },
    ],
  };

  const handleItemClick = (item) => {
    history.push({
      pathname: "/dashboard/models-entities/details",
      state: { item },
    });
  };

  const handleAsideClick = (option) => {
    setActiveAsideOption(option);
  };

  return (
    <div className="PageContent min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-2 border-b">
        <h1 className="PageTitle">Models & Entities</h1>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="p-1 border border-gray-300 rounded"
          />
          <Button onClick={() => setIsCreateModelModalOpen(true)}><FaIcons.FaPlus />Create</Button>
        </div>
      </header>
      <Modal
        isOpen={isCreateModelModalOpen}
        onClose={() => setIsCreateModelModalOpen(false)}
      >
        <CreateModel />
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
          <h2 className="text-sm text-gray-400 font-light mt-4 mb-2">TYPES</h2>
          <ul className="space-y-1">
            {asideSections.types.map((option) => (
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
          <ul className="space-y-1 mb-16">
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
        </aside>
        <main className="flex-1 ml-6 p-4 overflow-y-auto adHgt">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {modelsAndEntities.map((item, index) => (
              <div key={index} className="relative bg-white shadow-md rounded-lg overflow-hidden cursor-pointer group border border-neutral-300">
                <div onClick={() => handleItemClick(item)} className="p-4">
                  <h2 className="text-xl mb-4">{item.title}</h2>
                  <p className='mt-1 text-sm mb-5'>{item.description}</p>
                  <p className='mt-5 pt-5 text-xs flex'>Main Entity : <div className='mt-1'><div className='flex max-w-fit ml-2 mt-[-7px] bg-indigo-100 text-indigo-600 rounded-lg px-2 py-1'>{item.entity} <BsArrowUpRightSquare className='ml-2 mt-0.5'/></div></div></p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ModelsAndEntities;
