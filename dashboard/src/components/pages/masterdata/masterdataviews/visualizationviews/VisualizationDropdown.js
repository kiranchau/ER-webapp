import React, { useEffect, useRef, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { getVisualizationList } from '../../../../../API/authCrud';
import tableicon from '../../../../../media/visualization icons/table.png';
import cohorticon from '../../../../../media/visualization icons/cohort.png';
import trendtableicon from '../../../../../media/visualization icons/trendtable.png';
import areacharticon from '../../../../../media/visualization icons/areachart.png';
import trendicon from '../../../../../media/visualization icons/trend.png';
import linecharticon from '../../../../../media/visualization icons/linechart.png';
import barcharticon from '../../../../../media/visualization icons/barchart.png';
import bubblecharticon from '../../../../../media/visualization icons/bubblechart.png';
import columncharticon from '../../../../../media/visualization icons/columnchart.png';
import piecharticon from '../../../../../media/visualization icons/piechart.png';
import paragraphicon from '../../../../../media/visualization icons/paragraph.png';
import singlevalueicon from '../../../../../media/visualization icons/singlevalue.png';
import sankeyicon from '../../../../../media/visualization icons/sankey.png';
import flowcharticon from '../../../../../media/visualization icons/flowchart.png';
import funnelicon from '../../../../../media/visualization icons/funnel.png';
import gaugeicon from '../../../../../media/visualization icons/gauge.png';
import UseSharedDataContext from '../../../../context/UseSharedDataContext';

const iconMapping = {
  table: tableicon,
  cohort: cohorticon,
  trendtable: trendtableicon,
  areachart: areacharticon,
  trend: trendicon,
  linechart: linecharticon,
  barchart: barcharticon,
  bubblechart: bubblecharticon,
  columnchart: columncharticon,
  piechart: piecharticon,
  "paragraph(notyetsupported)": paragraphicon,
  singlevalue: singlevalueicon,
  sankey: sankeyicon,
  "flow(notyetsupported)": flowcharticon,
  funnel: funnelicon,
  gauge: gaugeicon,
};

const VisualizationDropdown = ({ visualizationType, setVisualizationType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visualizationList, setVisualizationList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState({ name: visualizationType, icon: tableicon });
  const dropdownRef = useRef(null);
  const sharedDataContext = UseSharedDataContext();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item) => {
    console.log("visualization item ??", item)
    setSelectedItem(item);
    sharedDataContext.setVisualization(item)
    setVisualizationType(item.name);
    setIsOpen(false);
  };

  useEffect(() => {
    try{
      const updatedVisualization = {
        ...sharedDataContext.visualization,
        icon: iconMapping[sharedDataContext.visualization.name?.toLowerCase().replace(/\s/g, '')],
      };
      setSelectedItem(updatedVisualization);
    }catch(err){
      console.log("updatedVisualization err??",err)
    }
  }, [sharedDataContext.visualization]);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    getVisualizationList()
      .then(res => {
        if (isMounted) {
          const updatedList = res.data.map(item => ({
            ...item,
            icon: iconMapping[item.name.toLowerCase().replace(/\s/g, '')]
          }));
          setVisualizationList(updatedList);

          const uniqueCategories = [...new Set(res.data.map(item => item.category))];
          setCategories(uniqueCategories);
        }
      })
      .catch(err => {
        if (isMounted) {
          console.log(err);
        }
      });
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      isMounted = false;
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block mb-2">
        Visualization
      </label>
      <div
        onClick={toggleDropdown}
        className={`bg-white w-full px-3 py-1 flex items-center justify-between rounded cursor-pointer border border-gray-300 shadow-sm ${!selectedItem ? 'text-gray-400' : ''}`}
      >
        {selectedItem !== null ? (
          <div className="flex items-center">
            <img src={selectedItem.icon === undefined ? tableicon : selectedItem.icon} alt="" className="w-6 h-6 mr-2" />
            <div>{selectedItem.name === undefined ? 'Table' : selectedItem.name}</div>
          </div>
        ) :
          'Select a Visualization'
        }
        <BiChevronDown size={20} className={`${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-full">
          {categories.map(category => (
            <div key={category} className="p-2">
              <h2 className="text-sm">{category}</h2>
              <div className="flex flex-wrap space-x-4">
                {visualizationList.filter(item => item.category === category).map(item => (
                  <div key={item.id} className="relative group m-1">
                    <button
                      className="rounded p-1 border border-gray-200 hover:bg-blue-100"
                      onClick={() => handleSelect(item)}
                    >
                      <img src={item.icon} alt="" className="w-8 h-8" />
                    </button>
                    <div className="absolute bottom-5 flex-col items-center hidden mb-6 group-hover:flex">
                      <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg rounded-md">
                        {item.name}
                      </span>
                      <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VisualizationDropdown;
