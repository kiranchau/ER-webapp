import React, { useState, useEffect, useRef } from 'react';
import * as BiIcons from 'react-icons/bi';
import * as AiIcons from 'react-icons/ai';
import { MdMoreHoriz } from "react-icons/md";
import UseSharedDataContext from '../context/UseSharedDataContext';

const Select = (props) => {
    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState(props.initialValue || "");
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);
    const sharedDataContext = UseSharedDataContext();
    const [filteredModelFields,setFilteredModelFields] = useState({})

    const handleSelection = (item) => {
        setSelected(item.label ? item.label : item.name);
        setOpen(false);
        setInputValue("");
        props.onChange(item);
    };

    useEffect(() => {
        if (props.initialValue) {
            setSelected(props.initialValue);
        }
    }, [props.initialValue]);

    useEffect(() => {
        // console.log("props.data select??", props.data);
        const getFilteredFields = (visualizationId, label) => {
            // console.log("visualizationId ?>",visualizationId)
            // console.log("label ?>",label)
            let filteredFields = {};

            // Iterate through each category
            for (const category in props.data) {
                if (props.data.hasOwnProperty(category)) {
                    filteredFields[category] = props.data[category].filter(field => {
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
        const result = getFilteredFields(sharedDataContext.visualization.id, props.keyword);
        setFilteredModelFields(result)
    }, [props.data,props.keyword,sharedDataContext.visualization.id]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const filteredData = Object.entries(filteredModelFields).reduce((acc, [type, fields]) => {
        const lowerInputValue = inputValue.toLowerCase();
        if (type.toLowerCase().includes(lowerInputValue)) {
            // If the type matches, include all fields
            acc[type] = fields;
        } else {
            // Otherwise, only include fields that match the input value
            const filteredFields = fields.filter(field => field.name.toLowerCase().includes(lowerInputValue));
            if (filteredFields.length > 0) {
                acc[type] = filteredFields;
            }
        }
        return acc;
    }, {});

    return (
        <div ref={containerRef} className='font-medium relative'>
            <label htmlFor={props.id} className="block mb-2">{props.label}</label>
            <div
                onClick={() => setOpen(!open)}
                className={`${props.placeholder === 'Add field' && 'border text-xs text-gray-400'} bg-white w-full px-2 py-1 flex items-center justify-between rounded cursor-pointer ${!selected && "text-gray-400"}`}>
                {props.placeholder === 'Add field' ? props.placeholder : selected ?
                    selected.length > 30
                        ? `${selected.replace(/([A-Z])/g, ' $1').trim().substring(0, 30)}...`
                        : selected.replace(/([A-Z])/g, ' $1').trim()
                    : props.placeholder}
                {props.placeholder === 'Add field' ? <MdMoreHoriz size={16} /> : <BiIcons.BiChevronDown size={20} className={`${open && 'rotate-180'}`} />}
            </div>
            <ul className={`absolute w-full z-10 bg-white mt-2 overflow-x-hidden overflow-y-auto transition-max-height duration-200 ease-in-out ${open ? "max-h-60" : 'max-h-0'}`}>
                <div className='flex items-center px-2 sticky top-0 bg-white'>
                    <AiIcons.AiOutlineSearch size={18} />
                    <input
                        type='text'
                        id={props.id}
                        name={props.name}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                        placeholder={props.placeholder}
                        className='placeholder:text-gray-300 px-2 py-1 outline-none w-full'
                    />
                </div>
                {Object.entries(filteredData).map(([type, fields]) => (
                    <div key={type}>
                        <li className="text-xs text-gray-500 p-2">{type.replace(/([A-Z])/g, ' $1').trim()}</li>
                        <div className='ml-2 mr-2 w-full border-b-[0.5px] border-gray-200'></div>
                        {fields.map((item) => (
                            <li
                                key={item?.name}
                                className={`p-2 text-sm hover:bg-sky-500 hover:text-white`}
                                onClick={() => handleSelection(item)}
                            >
                                {props.label === 'Visualization' ?
                                    <div className='flex'>
                                        <img src={item?.icon} className='w-10 h-10 object-contain' alt={item?.label} />
                                        <span className='ml-2 mt-[9px]'>{item?.label}</span>
                                    </div>
                                    : <div>{item?.name.replace(/([A-Z])/g, ' $1').trim()}</div>}
                            </li>
                        ))}
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default Select;
