import React, { useState, useEffect, useRef } from 'react';
import { CiPlay1 } from 'react-icons/ci';
import UseSharedDataContext from '../../../context/UseSharedDataContext';

const CreateField = () => {
  const sharedContext = UseSharedDataContext();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [key, setKey] = useState('');
  const [fieldType, setFieldType] = useState('Dimension');
  const [valueType, setValueType] = useState('String');
  const [mapping, setMapping] = useState('');
  const [valueFormat, setValueFormat] = useState('');
  const [isMappingOpen, setIsMappingOpen] = useState(false);
  const mappingRef = useRef(null);
  const [wordCount, setWordCount] = useState(0);

  const handleDescriptionChange = (e) => {
    const words = e.target.value.split("").filter(Boolean);
    if (words.length <= 250) {
      setDescription(e.target.value);
      setWordCount(words.length);
    }
  };


  const handleApplyFormula = () => {
    setIsMappingOpen(false);
  };

  const handleClickOutside = (event) => {
    if (mappingRef.current && !mappingRef.current.contains(event.target)) {
      setIsMappingOpen(false);
    }
  };

  useEffect(() => {
    if (isMappingOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMappingOpen]);

  return (
    <div className="p-8 bg-gray-50 w-[1000px] h-[650px] flex flex-col">
      <h1 className="text-2xl font-semibold mb-4">Field Settings</h1>
      <div className="flex flex-1 space-x-8">
        {/* Left Section */}
        <div className="w-3/5 pr-4">
          <form className="space-y-4">
            {/* Name */}
            <div>
              <label className="block mb-2 text-sm font-medium">Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full p-2 border rounded h-[33px]"
                maxLength={100}
                onInput={sharedContext.restrictToLettersAndNumbers}
              />
            </div>
            
            {/* Description */}
            <div>
            <div className='flex justify-between'>
            <label className="block mb-2 text-sm font-medium">Description</label>
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
              <label className="block mb-2 text-sm font-medium">Key</label>
              <input 
                type="text" 
                value={key} 
                onChange={(e) => setKey(e.target.value)} 
                className="w-full p-2 border rounded h-[33px]"
                maxLength={100}
                onInput={sharedContext.restrictToLettersAndNumbers}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Field Type */}
              <div>
                <label className="block mb-2 text-sm font-medium">Field Type</label>
                <select 
                  value={fieldType} 
                  onChange={(e) => setFieldType(e.target.value)}
                  className="w-full p-2 border rounded h-[33px]"
                >
                  <option value="Dimension">Dimension</option>
                  <option value="Measure">Measure</option>
                  {/* Add other options here */}
                </select>
              </div>
              
              {/* Value Type */}
              <div>
                <label className="block mb-2 text-sm font-medium">Value Type</label>
                <select 
                  value={valueType} 
                  onChange={(e) => setValueType(e.target.value)}
                  className="w-full p-2 border rounded h-[33px]"
                >
                  <option value="String">String</option>
                  <option value="Number">Number</option>
                  <option value="Boolean">Boolean</option>
                  {/* Add other options here */}
                </select>
              </div>
            </div>

            {/* Mapping */}
            <div className="relative" ref={mappingRef}>
              <label className="block mb-2 text-sm font-medium">Mapping</label>
              <input 
                type="text" 
                value={mapping} 
                onClick={() => setIsMappingOpen(!isMappingOpen)} 
                readOnly 
                className="w-full p-2 border rounded cursor-pointer h-[33px]"
                placeholder='Enter SQL formula'
              />
              {isMappingOpen && (
                <div className="absolute z-10 bottom-[calc(100%+10px)] w-full bg-white border rounded shadow-xl">
                  <div className="p-4">
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
                </div>
              )}
            </div>

            {/* Value Format */}
            <div>
              <label className="block mb-2 text-sm font-medium">Value Format</label>
              <input 
                type="text" 
                value={valueFormat} 
                onChange={(e) => setValueFormat(e.target.value)} 
                className="w-full p-2 border rounded h-[33px]"
                maxLength={100}
              />
              <a href="#" className="text-blue-500 text-sm">View value formatters</a>
            </div>
          </form>
        </div>

        {/* Right Section */}
        <div className="w-2/5 pl-4 border-l relative">
          <div className="border p-4 h-full flex flex-col justify-center">
            <h2 className="text-lg font-medium mb-4">Field Preview</h2>
            <p>Click on Preview to see your field data displayed here</p>
          </div>
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <button className="flex px-3 py-1 bg-white text-indigo-600 border rounded"><CiPlay1 className='mt-[3px] mr-1'/> Preview</button>
            <button className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded">Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateField;
