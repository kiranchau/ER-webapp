import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MdMoreHoriz } from "react-icons/md";
import { TbNumber123, TbAbc } from "react-icons/tb";
import { CiCalendar } from "react-icons/ci";
import { GetFilterFields } from '../../../../../API/authCrud';
import UseSharedDataContext from '../../../../context/UseSharedDataContext';

const defaultFilters = ['time', 'day', 'week', 'month', 'quarter', 'year'];
const measuresFilters = ['count', 'countdistinct', 'any', 'all'];

const CombinedSelect = ({ label, data, selectedModel, selectedModelField, onUpdateOption, salesforceModelList }) => {
  const initialFilterValue = ['Measures', 'Y-Axis', 'Cohort size', 'Additional columns', 'Measurement field'].includes(label) ? 'count' : 'month';
  const [selectedField, setSelectedField] = useState({});
  const [selectedFilter, setSelectedFilter] = useState(initialFilterValue);
  const [isFieldOpen, setIsFieldOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterFields, setFilterFields] = useState([]);
  const fieldRef = useRef(null);
  const filterRef = useRef(null);
  const sharedDataContext = UseSharedDataContext();
  const [modelData, setModelData] = useState(null);
  const [filteredModelFields, setFilteredModelFields] = useState({})

  const handleFieldClick = useCallback((field) => {
    setSelectedField(field);
    setIsFieldOpen(false);
    onUpdateOption(selectedModelField, field);
  }, [selectedModelField, onUpdateOption]);

  const handleFilterClick = useCallback((filter) => {
    setSelectedFilter(filter);
    setIsFilterOpen(false);
  }, []);

  useEffect(() => {
    if (label === 'Filter') {
      setSelectedFilter(sharedDataContext.selectedFilter.replace(/'/g, ''))
    }
  }, [])

  useEffect(() => {
    console.log("selectedModelField new new??", selectedModelField);

    if (selectedModelField && selectedModelField?.model) {
      const foundModel = salesforceModelList?.find(item =>
        item.fields.some(field => field.model === selectedModelField.model)
      );
      setModelData({
        name: foundModel?.name,
        connector: foundModel?.connector,
        db_table: foundModel?.db_table,
      });
    }
  }, [selectedModelField]);

  useEffect(() => {
    let isMounted = true;
    if (label === 'Filter' && isMounted) {
      try {
        sharedDataContext.setPayloadFilter(
          `${sharedDataContext?.dataSource?.db_table}.${selectedModelField?.db_table_fields}`
        );
        sharedDataContext.setSelectedFilter(`'${selectedFilter && selectedFilter}'`);
      } catch (error) {
        console.error("Error updating shared data context:", error);
      }
    } else if (['Measures', 'Y-Axis', 'Cohort size', 'Additional columns', 'Measurement field'].includes(label) && isMounted) {
      try {
        sharedDataContext.setSelectedMeasureFilter(`${selectedFilter && selectedFilter}`);
        sharedDataContext.setSelectedMeasureField(selectedModelField?.name);
      } catch (error) {
        console.error("Error updating shared data context:", error);
      }
    } else if (label === 'Sort' && isMounted) {
      try {
        sharedDataContext.setPayloadSort(
          `${sharedDataContext?.dataSource?.db_table}.${selectedModelField?.db_table_fields}`
        );
      } catch (error) {
        console.error("Error updating shared data context:", error);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [selectedFilter, sharedDataContext.dataSource, label, selectedModelField]);


  useEffect(() => {
    let isMounted = true;
    if (label === 'Filter' && isMounted) {
      const payload = {
        model: selectedModel,
        field: selectedModelField.name
      };
      GetFilterFields(payload)
        .then(res => {
          if (isMounted) {
            setFilterFields(res.data.response);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [label, selectedModel, selectedModelField]);

  const getFilters = () => {
    if (['Measures', 'Y-Axis', 'Cohort size', 'Additional columns', 'Measurement field'].includes(label)) {
      return measuresFilters;
    } else if (label === 'Filter') {
      return filterFields;
    } else if (selectedModelField.type === 'datetime') {
      return defaultFilters;
    } else {
      return [];
    }
  };

  const filters = getFilters();

  const handleClickOutside = (event) => {
    if (fieldRef.current && !fieldRef.current.contains(event.target)) {
      setIsFieldOpen(false);
    }
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setIsFilterOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // console.log("props.data select??", props.data);
    const getFilteredFields = (visualizationId, label) => {
      // console.log("visualizationId ?>",visualizationId)
      // console.log("label ?>",label)
      let filteredFields = {};

      // Iterate through each category
      for (const category in data) {
        if (data.hasOwnProperty(category)) {
          filteredFields[category] = data[category].filter(field => {
            if ((visualizationId === 2 || visualizationId === 5) && (label === 'X-Axis' || label === 'Cohort date' || label === 'Measurement date')) {
              // Include only datetime fields for visualizationId 5 and x-axis label
              return field.type === 'datetime';
            } else {
              // Include all fields for other cases
              return true;
            }
          });
        }
      }

      return filteredFields;
    }
    const result = getFilteredFields(sharedDataContext.visualization.id, label);
    setFilteredModelFields(result)
  }, [data, label, sharedDataContext.visualization.id]);

  return (
    <div className="bg-gray-50 w-full mb-1">
      <div ref={fieldRef} className="relative">
        <button
          type="button"
          className={`w-full inline-flex justify-between ${filters.length > 0 ? 'rounded-t-md border-t border-l border-r' : 'rounded-md border'}  px-3 py-1 ${['Dimensions', 'X-Axis', 'Category', 'Cohort date', 'Measurement date'].includes(label) ? 'bg-green-100 hover:bg-green-200' : ['Measures', 'Y-Axis', 'Cohort size', 'Additional columns', 'Measurement field'].includes(label) ? 'bg-blue-100 hover:bg-blue-200' : 'bg-white hover:bg-gray-100'} text-sm font-normal text-gray-700 focus:outline-none`}
          onClick={() => setIsFieldOpen(!isFieldOpen)}
        >
          <span className="flex items-center">
            <span className="flex items-center">
              {selectedModelField.type === 'datetime' ? <CiCalendar /> : (selectedModelField.type === 'number' || selectedModelField.type === 'boolean' ? <TbNumber123 /> : <TbAbc />)}
            </span>
            <span className="text-xs text-gray-500 ml-1">{modelData?.name?.replace(/([A-Z])/g, ' $1').trim()}</span>
            <span className="font-bold ml-1">{selectedModelField.name?.replace(/([A-Z])/g, ' $1').trim()}</span>
          </span>
        </button>

        {isFieldOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-x-hidden overflow-y-auto max-h-60">
            <div className="py-1">
              {Object.entries(filteredModelFields).map(([type, fields]) => (
                <div key={type} className="mb-2">
                  <div className="text-xs text-gray-500 pl-2 pb-2">{type.replace(/([A-Z])/g, ' $1').trim()}</div>
                  <div className='ml-2 mr-2 w-full border-b-[0.5px] border-gray-200'></div>
                  {fields.map((field, index) => (
                    <button
                      key={index}
                      className={`block px-4 py-2 text-sm text-gray-700 w-full text-left ${selectedField.name === field.name ? 'bg-gray-100' : ''} hover:bg-gray-100`}
                      onClick={() => handleFieldClick(field)}
                    >
                      {field.name?.replace(/([A-Z])/g, ' $1').trim()}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {filters.length > 0 && (
        <div ref={filterRef} className="relative">
          <button
            type="button"
            className={`w-full inline-flex justify-between rounded-b-md border-b border-l border-r px-3 py-1 ${['Dimensions', 'X-Axis', 'Category', 'Cohort date', 'Measurement date'].includes(label) ? 'bg-green-100 hover:bg-green-200' : ['Measures', 'Y-Axis', 'Cohort size', 'Additional columns', 'Measurement field'].includes(label) ? 'bg-blue-100 hover:bg-blue-200' : 'bg-white hover:bg-gray-100'} text-xs font-normal text-gray-700 focus:outline-none`}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            {selectedFilter !== '' ? typeof selectedFilter === "string" ? selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1) : selectedFilter : 'Select a value'}
          </button>

          {isFilterOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                {filters.map((filter, index) => (
                  <>{filter !== null && (
                    <button
                      key={index}
                      onClick={() => handleFilterClick(filter)}
                      className={`block px-4 py-2 text-sm text-gray-700 w-full text-left ${selectedFilter === filter ? 'bg-gray-100' : ''} hover:bg-gray-100`}
                    >
                      {filter && typeof filter === "string" ? filter.charAt(0).toUpperCase() + filter.slice(1) : filter}
                    </button>
                  )}</>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CombinedSelect;
