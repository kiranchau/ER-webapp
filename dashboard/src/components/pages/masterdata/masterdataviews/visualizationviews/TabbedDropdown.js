import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import UseSharedDataContext from '../../../../context/UseSharedDataContext';
import { GetDataSource } from '../../../../../API/authCrud';
import Spinner from '../../../../UI/Spinner';

const TabbedDropdown = ({ tabs, salesforceModelList, setModelFields, selectedModel, setSelectedModel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[1].name);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const sharedDataContext = UseSharedDataContext()

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSelectChange = (value) => {
    console.log("value table ??", value)
    setSelectedModel(value.name);
    GetDataSource().then(res => {
      console.log("res.data source ??", res.data)
      let dataSourceItem = res.data.find(item => item.source_type === value.connector);
      let dataSourceId = dataSourceItem ? dataSourceItem.id : null;
      sharedDataContext.setDataSource({
        id: dataSourceId,
        name: value.name,
        db_table: value.db_table
      })
    }).catch(err => {
      console.log(err)
    })
    // const selectedModel = salesforceModelList.find(model => model.name === value.name);
    // setModelFields(selectedModel.fields);
    setIsOpen(false);
  };

  useEffect(()=>{
    setSelectedModel(sharedDataContext?.dataSource?.name)
  },[sharedDataContext.dataSource])

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      <label className="block mb-2">
        Data Source
      </label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-white w-full px-3 py-1 flex items-center justify-between rounded cursor-pointer border border-gray-300 shadow-sm ${!selectedModel && "text-gray-400"}`}
      >
        {selectedModel ? selectedModel.replace(/([A-Z])/g, ' $1').trim() : 'Select a Data Source'}
        <BiChevronDown size={20} className={`${isOpen && 'rotate-180'}`} />
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-full flex">
          <div className="w-1/4 border-r">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className={`block w-full px-4 py-2 text-left ${activeTab === tab.name ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'} focus:outline-none`}
                onClick={() => handleTabChange(tab.name)}
              >
                {tab.name}
              </button>
            ))}
          </div>
          <div className="w-3/4">
            <div className="flex items-center px-2 sticky top-0 bg-white">
              <AiOutlineSearch size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                placeholder="Search..."
                className="placeholder-gray-300 px-2 py-1 outline-none w-full"
              />
            </div>
            {salesforceModelList.length <= 0 ? (
                <Spinner />
            ) : (
              tabs.find(tab => tab.name === activeTab).data
                .filter(item => item.name.toLowerCase().includes(searchTerm))
                .map((item, index) => (
                  <button
                    key={index}
                    className={`block w-full px-4 py-2 text-left text-gray-700 hover:bg-sky-500 hover:text-white focus:outline-none ${selectedModel !== undefined && selectedModel === item.label ? 'bg-sky-600 text-white' : ''}`}
                    onClick={() => handleSelectChange(item)}
                  >
                    {item.icon && <img src={item.icon} alt={item.name} className="inline-block w-5 h-5 mr-2" />}
                    {item.name.replace(/([A-Z])/g, ' $1').trim()}
                  </button>
                ))
            )}
            {tabs.find(tab => tab.name === activeTab).data
              .filter(item => item.name.toLowerCase().includes(searchTerm))
              .map((item, index) => (
                <button
                  key={index}
                  className={`block w-full px-4 py-2 text-left text-gray-700 hover:bg-sky-500 hover:text-white focus:outline-none ${selectedModel !== undefined && selectedModel === item.label ? 'bg-sky-600 text-white' : ''}`}
                  onClick={() => handleSelectChange(item)}
                >
                  {item.icon && <img src={item.icon} alt={item.name} className="inline-block w-5 h-5 mr-2" />}
                  {item.name.replace(/([A-Z])/g, ' $1').trim()}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TabbedDropdown;
