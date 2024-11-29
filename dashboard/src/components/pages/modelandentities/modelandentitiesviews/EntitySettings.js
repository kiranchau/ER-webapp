import React, { useState, useEffect } from 'react';
import DetailsTab from './DetailsTab';
import SQLTab from './SQLTab';
import { IoIosArrowForward } from 'react-icons/io';
import { useLocation, useHistory } from "react-router-dom";

const EntitySettings = () => {
  const location = useLocation();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState('details');
  const [selectedItem, setSelectedItem] = useState(location.state?.item);

  useEffect(() => {
    if (selectedItem) {
      localStorage.setItem('selectedItem', JSON.stringify(selectedItem));
    } else {
      const storedItem = localStorage.getItem('selectedItem');
      if (storedItem) {
        setSelectedItem(JSON.parse(storedItem));
      }
    }
  }, [selectedItem]);

  if (!selectedItem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="PageContent w-full min-h-screen p-5 overflow-auto">
      <div className="flex items-center mb-4">
        <div onClick={() => history.push('/dashboard/models-entities')} className='flex items-center'>
          <span className="text-indigo-600 cursor-pointer">Models And Entities</span>
          <IoIosArrowForward className="text-gray-500" />
        </div>
        <div onClick={() => {
             history.push({
                pathname: "/dashboard/models-entities/details",
                state: { item : selectedItem },
              });
        }} className='flex items-center ml-2'>
          <span className="text-indigo-600 cursor-pointer">{selectedItem.title}</span>
          <IoIosArrowForward className="text-gray-500" />
        </div>
      </div>
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="border-b mb-4">
          <button
            className={`px-4 py-2 ${activeTab === 'details' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'sql' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('sql')}
          >
            SQL
          </button>
        </div>
        {activeTab === 'details' && <DetailsTab />}
        {activeTab === 'sql' && <SQLTab />}
      </div>
    </div>
  );
}

export default EntitySettings;
