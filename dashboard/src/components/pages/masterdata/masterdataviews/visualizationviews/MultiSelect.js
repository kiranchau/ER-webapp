import React, { useEffect, useState } from 'react';
import CombinedSelect from './CombinedSelect';
import Select from '../../../../UI/Select';
import UseSharedDataContext from '../../../../context/UseSharedDataContext';

const MultiSelect = ({ label, data, selectedModel, salesforceModelList }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const sharedDataContext = UseSharedDataContext();

  const handleAddOption = (option) => {
    if (label === 'X-Axis' || label === 'Category' || label === 'Cohort date' || label === 'Measurement date') {
      setSelectedOptions([option]);
    } else {
      setSelectedOptions((prevOptions) => [...prevOptions, option]);
    }
  };

  useEffect(() => {
    if (sharedDataContext.dashboardMetricStatus === false) {
      setSelectedOptions([])
    }
  }, [sharedDataContext.dashboardMetricStatus])

  useEffect(() => {
    switch (label) {
      case 'Dimensions':
      case 'X-Axis':
      case 'Category':
        if (sharedDataContext.dimension.length > 0) {
          if (label === 'X-Axis' || label === 'Category') {
            if (selectedOptions[0] !== sharedDataContext.dimension[0]) {
              setSelectedOptions([sharedDataContext.dimension[0]]);
            }
          } else if (label === 'Dimensions') {
            setSelectedOptions(sharedDataContext.dimension);
          }
        }
        break;
      case 'Cohort date':
        if (sharedDataContext.cohortDate.length > 0) {
          if (selectedOptions[0] !== sharedDataContext.cohortDate[0]) {
            setSelectedOptions([sharedDataContext.cohortDate[0]]);
          }
        }
        break;
      case 'Measurement date':
        if (sharedDataContext.measurementDate.length > 0) {
          if (selectedOptions[0] !== sharedDataContext.measurementDate[0]) {
            setSelectedOptions([sharedDataContext.measurementDate[0]]);
          }
        }
        break;
      case 'Measures':
      case 'Y-Axis':
        if (sharedDataContext.measure.length > 0) {
          setSelectedOptions(sharedDataContext.measure);
        }
        break;
      case 'Cohort size':
        if (sharedDataContext.cohortSize.length > 0) {
          setSelectedOptions(sharedDataContext.cohortSize);
        }
        break;
      case 'Additional columns':
        if (sharedDataContext.additionalColumns.length > 0) {
          setSelectedOptions(sharedDataContext.additionalColumns);
        }
        break;
      case 'Measurement field':
        if (sharedDataContext.measurementField.length > 0) {
          setSelectedOptions(sharedDataContext.measurementField);
        }
        break;
      case 'Filter':
        if (sharedDataContext.filter.length > 0) {
          setSelectedOptions(sharedDataContext.filter);
        }
        break;
      case 'Sort':
        if (sharedDataContext.sort.length > 0) {
          setSelectedOptions(sharedDataContext.sort);
        }
        break;
      default:
        break;
    }
  }, [sharedDataContext.dimension, sharedDataContext.cohortDate, sharedDataContext.measurementDate, sharedDataContext.measure, sharedDataContext.cohortSize, sharedDataContext.additionalColumns, sharedDataContext.measurementField, sharedDataContext.filter, sharedDataContext.sort, label]);

  useEffect(() => {
    switch (label) {
      case 'Dimensions':
        sharedDataContext.setDimension(selectedOptions);
        break;
      case 'Measures':
      case 'Y-Axis':
        sharedDataContext.setMeasure(selectedOptions);
        break;
      case 'X-Axis':
      case 'Category':
        sharedDataContext.setDimension(selectedOptions);
        break;
      case 'Cohort date':
        sharedDataContext.setCohortDate(selectedOptions);
        break;
      case 'Measurement date':
        sharedDataContext.setMeasurementDate(selectedOptions);
        break;
      case 'Cohort size':
        sharedDataContext.setCohortSize(selectedOptions);
        break;
      case 'Additional columns':
        sharedDataContext.setAdditionalColumns(selectedOptions);
        break;
      case 'Measurement field':
        sharedDataContext.setMeasurementField(selectedOptions);
        break;
      case 'Filter':
        sharedDataContext.setFilter(selectedOptions);
        break;
      case 'Sort':
        sharedDataContext.setSort(selectedOptions);
        break;
      default:
        break;
    }
  }, [selectedOptions, label, sharedDataContext]);

  const handleRemoveOption = (option) => {
    setSelectedOptions((prevOptions) => prevOptions.filter((opt) => opt !== option));
  };

  const handleUpdateOption = (oldOption, newOption) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.map((opt) => (opt === oldOption ? newOption : opt))
    );
  };

  return (
    <div className={`flex flex-col p-4 bg-gray-50 w-full 
      ${(['X-Axis', 'Y-Axis', 'Filter', 'Sort'].includes(label) ? 'rounded-md ' : '')} 
      ${(['Dimensions', 'Category'].includes(label) ? 'rounded-t-md ' : 'rounded-b-md ')}
    `}>
      {!['X-Axis', 'Y-Axis', 'Filter', 'Sort'].includes(label) && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative mb-1">
        <Select placeholder="Add field" data={data} onChange={handleAddOption} keyword={label} />
      </div>

      {selectedOptions.map((option, index) => (
        <div key={index} className="flex items-center space-x-4">
          <CombinedSelect
            label={label}
            data={data}
            selectedModel={selectedModel}
            selectedModelField={option}
            onUpdateOption={handleUpdateOption}
            salesforceModelList={salesforceModelList}
          />
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => handleRemoveOption(option)}
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 8.586l2.293-2.293a1 1 0 011.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 011.414-1.414L10 8.586z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default MultiSelect;
