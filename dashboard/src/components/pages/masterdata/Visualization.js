import React, { useEffect, useState } from 'react';
import TabbedDropdown from './masterdataviews/visualizationviews/TabbedDropdown';
import Accordion from '../../UI/Accordion';
import Select from '../../UI/Select';
import MultiSelect from './masterdataviews/visualizationviews/MultiSelect';
import TableIcon from '../../../media/home1.png';
import LineIcon from '../../../media/home4.png';
import BarIcon from '../../../media/home5.png';
import PieIcon from '../../../media/home6.png';
import BubbleIcon from '../../../media/home2.png';
import VisualizationDropdown from './masterdataviews/visualizationviews/VisualizationDropdown';
import { GetSalesforceModels, getVisualizationList } from '../../../API/authCrud';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { RxDragHandleDots2 } from "react-icons/rx";
import UseSharedDataContext from '../../context/UseSharedDataContext';

const Visualization = ({ visualizationType, setVisualizationType, columns, setColumns }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [salesforceModelList, setSalesforceModelList] = useState([]);
  const [modelFields, setModelFields] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const sharedDataContext = UseSharedDataContext();

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedColumns = Array.from(columns);
    const [removed] = reorderedColumns.splice(result.source.index, 1);
    reorderedColumns.splice(result.destination.index, 0, removed);
    setColumns(reorderedColumns);
  };

  const metrics = [
    { name: 'Active Subscriptions' },
    { name: 'ACV' },
    { name: 'ARPU' },
    { name: 'ARR' },
    { name: 'Churned Customers' },
    { name: 'First Month MRR' },
    { name: 'MRR' }
  ];

  const dataSourceTabs = [
    { name: 'Metrics', data: metrics },
    { name: 'Models', data: salesforceModelList }
  ];

  const accordionData = [
    {
      title: 'X-Axis', content: <MultiSelect label="X-Axis"
        data={modelFields}
        selectedModel={selectedModel}
      />
    },
    {
      title: 'Y-Axis', content: <MultiSelect label="Y-Axis"
        data={modelFields}
        selectedModel={selectedModel}
      />
    },
    {
      title: 'Filter', content: <MultiSelect label="Filter"
        data={modelFields}
        selectedModel={selectedModel}
      />
    },
    {
      title: 'Sort', content: <MultiSelect label="Sort"
        data={modelFields}
        selectedModel={selectedModel}
      />
    },
  ];

  const handleVisualizationChange = (value) => {
    setVisualizationType(value.label);
  };

  useEffect(() => {
    let isMounted = true;
    GetSalesforceModels().then(res => {
      if (isMounted) {
        console.log("salesforce models ??", res.data);
        if (res.data.length > 0) {
          const filteredDataArray = res.data.filter(item => item.db_table !== '');
          setSalesforceModelList(filteredDataArray);
        }
      }
    }).catch(err => {
      if (isMounted) {
        console.log("salesforce models ??", err);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const groupedFields = salesforceModelList.reduce((acc, model) => {
        if (!acc[model.name]) {
            acc[model.name] = [];
        }
        model.fields.forEach(field => {
            acc[model.name].push(field);
        });
        return acc;
    }, {});

    let reorderedFields = {};
    if (selectedModel && groupedFields[selectedModel]) {
        // Add the selected model to the top
        reorderedFields[selectedModel] = groupedFields[selectedModel];
        // Remove the selected model from the original grouped fields
        delete groupedFields[selectedModel];
    }
    
    // Add the rest of the models to the reordered fields
    reorderedFields = { ...reorderedFields, ...groupedFields };
    setModelFields(reorderedFields);
}, [salesforceModelList, selectedModel]);

  return (
    <>
      <div className='overflow-y-auto visualHgt'>
        <div>
          <VisualizationDropdown visualizationType={visualizationType} setVisualizationType={setVisualizationType} />
        </div>
        <div className="py-5">
          <TabbedDropdown tabs={dataSourceTabs} salesforceModelList={salesforceModelList} setModelFields={setModelFields} selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
        </div>
        <div className="noScrollbar h-full overflow-auto">
          {sharedDataContext.visualization.id === 1 ? (
            <div>
              <div className="mb-4 space-y-[-30px]">
                <MultiSelect label="Dimensions"
                  data={modelFields}
                  selectedModel={selectedModel}
                  salesforceModelList={salesforceModelList}
                />
                <MultiSelect label="Measures"
                  data={modelFields}
                  selectedModel={selectedModel}
                  salesforceModelList={salesforceModelList}
                />
              </div>
              {
                accordionData.slice(2).map(({ title, content }) => (
                  <Accordion key={title} title={title} content={content} />
                ))
              }
              <Accordion title="Series" content={<div className="">
                {columns.length === 0 ? (
                  <div className="text-center py-8">
                    <p>No columns available</p>
                  </div>
                ) : (
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="droppable">
                      {(provided) => (
                        <div className='bg-white p-4 rounded-md' {...provided.droppableProps} ref={provided.innerRef}>
                          {columns.map((column, index) => (
                            <Draggable key={column.accessor} draggableId={column.accessor} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="flex items-center px-3 py-1 border rounded-md mb-2 bg-white"
                                >
                                  <RxDragHandleDots2 /><span className='ml-5'>{column.Header}</span>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                )}
              </div>} />
            </div>
          ) : sharedDataContext.visualization.id === 2 ? (<div>
            <div className="mb-4 space-y-[-30px]">
              <MultiSelect label="Cohort size"
                data={modelFields}
                selectedModel={selectedModel}
                salesforceModelList={salesforceModelList}
              />
              <MultiSelect label="Cohort date"
                data={modelFields}
                selectedModel={selectedModel}
                salesforceModelList={salesforceModelList}
              />
              <MultiSelect label="Additional columns"
                data={modelFields}
                selectedModel={selectedModel}
                salesforceModelList={salesforceModelList}
              />
            </div>
            <div className="mb-4 space-y-[-30px]">
              <MultiSelect label="Measurement field"
                data={modelFields}
                selectedModel={selectedModel}
                salesforceModelList={salesforceModelList}
              />
              <MultiSelect label="Measurement date"
                data={modelFields}
                selectedModel={selectedModel}
                salesforceModelList={salesforceModelList}
              />
            </div>
            {accordionData.slice(2).map(({ title, content }) => (
              <Accordion key={title} title={title} content={content} />
            ))}
          </div>) : sharedDataContext.visualization.id === 10 ? (<div>
            <div className="mb-4 space-y-[-30px]">
              <MultiSelect label="Category"
                data={modelFields}
                selectedModel={selectedModel}
                salesforceModelList={salesforceModelList}
              />
              <MultiSelect label="Measures"
                data={modelFields}
                selectedModel={selectedModel}
                salesforceModelList={salesforceModelList}
              />
            </div>
            {accordionData.slice(2).map(({ title, content }) => (
              <Accordion key={title} title={title} content={content} />
            ))}
          </div>) : (
            accordionData.map(({ title, content }) => (
              <Accordion key={title} title={title} content={content} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Visualization;
