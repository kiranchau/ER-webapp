import React, { useState, useRef, useEffect } from 'react';
import { CiPlay1 } from "react-icons/ci";
import { GoArrowLeft } from "react-icons/go";
import UseSharedDataContext from '../../../context/UseSharedDataContext';

const CreateModel = () => {
  const sharedContext = UseSharedDataContext();
  const [dataSource, setDataSource] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [key, setKey] = useState('');
  const [table, setTable] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [showTableDropdown, setShowTableDropdown] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [mapping, setMapping] = useState('');
  const [wordCount, setWordCount] = useState(0);

  const dropdownRef = useRef(null);

  const handleDescriptionChange = (e) => {
    const words = e.target.value.split("").filter(Boolean);
    if (words.length <= 250) {
      setDescription(e.target.value);
      setWordCount(words.length);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowTableDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleApplyFormula = () => {
    // Handle applying the formula here
  };

  return (
    <div className="flex w-[1200px] h-[600px] mx-auto mt-10 shadow-lg rounded-lg overflow-hidden">
      {/* Left Section */}
      <div className="w-2/5 p-4 bg-white border-r">
        <h2 className='text-xl mb-5 mt-[-20px]'>New Model</h2>
        <form className="space-y-4">
          {/* Data Source */}
          <div>
            <label className="block mb-2 text-sm font-medium ">Data Source</label>
            <select
              value={dataSource}
              onChange={(e) => setDataSource(e.target.value)}
              className="w-full p-2 border rounded text-xs h-[33px]"
            >
              <option value="">Select Data Source</option>
              {/* Add options here */}
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium ">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded text-xs h-[33px]"
              maxLength={100}
              onInput={sharedContext.restrictToLettersAndNumbers}
            />
          </div>

          {/* Description */}
          <div>
            <div className='flex justify-between'>
            <label className="block mb-2 text-sm font-medium ">Description</label>
            <p className="text-sm">{wordCount}/250</p>
            </div>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              style={{
                border: "1px solid #D9D9D9",
                borderRadius: "5px",
                padding: "5px",
                marginTop: "0px",
                width: "100%",
                height: "110px",
                fontSize: '14px'
              }}
            />
          </div>

          {/* Key */}
          <div>
            <label className="block mb-2 text-sm font-medium ">Key</label>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full p-2 border rounded text-xs h-[33px]"
              maxLength={100}
              onInput={sharedContext.restrictToLettersAndNumbers}
            />
          </div>

          {/* Table */}
          <div>
            <label className="block mb-2 text-sm font-medium ">Table</label>
            <div className="relative" ref={dropdownRef}>
              <input
                type="text"
                value={table}
                onChange={(e) => setTable(e.target.value)}
                onFocus={() => setShowTableDropdown(true)}
                className="w-full p-2 border rounded text-xs h-[33px]"
                placeholder='Select...'
              />
              {showTableDropdown && (
                <div className="absolute left-0 right-0 bottom-[calc(100%+10px)] mt-1 bg-white border rounded shadow-lg z-10">
                  {!showFormula ? (
                    <div className="p-4">
                      <input
                        type="text"
                        placeholder="Search table..."
                        className="w-full p-2 border rounded text-xs"
                      />
                      <button
                        onClick={() => setShowFormula(true)}
                        className="w-full mt-4 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
                      >
                        Formula
                      </button>
                    </div>
                  ) : (
                    <div className="p-4">
                      <div onClick={() => setShowFormula(false)} className="flex items-center mb-4 cursor-pointer">
                        <GoArrowLeft className='mt-[-1px] mr-1' />
                        <span className="text-xs">Choose Table</span>
                      </div>
                      <label className="block mb-2 text-sm font-medium">SQL</label>
                      <textarea
                        value={mapping}
                        onChange={(e) => setMapping(e.target.value)}
                        placeholder="Enter SQL formula"
                        style={{
                          border: "1px solid #D9D9D9",
                          borderRadius: "5px",
                          padding: "5px",
                          marginTop: "0px",
                          width: "100%",
                          height: "110px",
                          fontSize: '14px'
                        }}
                      />
                      <button
                        onClick={handleApplyFormula}
                        className="w-full mt-4 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
                      >
                        Apply Formula
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Hidden Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isHidden}
              onChange={(e) => setIsHidden(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm font-medium ">Hidden</label>
          </div>

          {/* Private Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm font-medium ">Private</label>
          </div>
        </form>
      </div>
      {/* Right Section */}
      <div className="w-3/5 p-6 bg-gray-50">
        <div className="p-4 h-full flex flex-col justify-between">
          <div className='border h-full mb-4 p-4 bg-white rounded-lg flex justify-center'>
            <h2 className="text-sm font-medium">Execute query to see preview</h2>
            {/* Preview content goes here */}
          </div>
          <div className="flex justify-end space-x-2">
            <button className="flex items-center px-3 py-1 bg-white border rounded text-indigo-600 hover:bg-gray-100 focus:outline-none">
              <CiPlay1 className='mr-2' /> Preview
            </button>
            <button className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded focus:outline-none">Create Model</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModel;
