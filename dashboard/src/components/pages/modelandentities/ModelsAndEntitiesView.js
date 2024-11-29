import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { IoAddCircle, IoSave, IoStatsChart, IoEye, IoEllipsisVertical, IoSettingsSharp, IoTrashBin } from "react-icons/io5";
import DisplayTable from './modelandentitiesviews/DisplayTable';
import Modal from '../../UI/Modal';
import CreateField from './modelandentitiesviews/CreateField';
import MetricSlidingPanel from './modelandentitiesviews/MetricSlidingPanel';

const ModelsAndEntitiesView = () => {
    const location = useLocation();
    const history = useHistory();
    const selectedItem = location.state?.item;
    const [isCreateFieldModalOpen, setIsCreateFieldModalOpen] = useState(false);
    const [isShowFieldsDropdownOpen, setIsShowFieldsDropdownOpen] = useState(false);
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
    const [isMetricSlidingPanelOpen, setIsMetricSlidingPanelOpen] = useState(false);
    const [selectedFields, setSelectedFields] = useState([]);
    const dropdownRef = useRef(null);

    const goBack = () => {
        history.push('/dashboard/models-entities');
    };

    const toggleShowFieldsDropdown = () => {
        setIsShowFieldsDropdownOpen(!isShowFieldsDropdownOpen);
        isMenuModalOpen && setIsMenuModalOpen(!isMenuModalOpen);
    };

    const toggleMenuModal = () => {
        setIsMenuModalOpen(!isMenuModalOpen);
        isShowFieldsDropdownOpen && setIsShowFieldsDropdownOpen(!isShowFieldsDropdownOpen);
    };

    const handleFieldSelection = (field) => {
        if (selectedFields.includes(field)) {
            setSelectedFields(selectedFields.filter(item => item !== field));
        } else {
            setSelectedFields([...selectedFields, field]);
        }
    };

    const handleAllFieldsSelection = () => {
        if (selectedFields.length === allFields.length) {
            setSelectedFields([]);
        } else {
            setSelectedFields(allFields);
        }
    };

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsShowFieldsDropdownOpen(false);
            setIsMenuModalOpen(false);
        }
    };

    const handleEntitySettings = () => {
        history.push({
            pathname: "/dashboard/models-entities/entitysettings",
            state: { item : selectedItem },
        });
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    // Assuming these are your available fields
    const allFields = ['Field1', 'Field2', 'Field3', 'Field4'];

    return (
        <div className="PageContent flex h-screen">
            <div className="w-full p-6">
                <div className="flex items-center mb-4">
                    <span onClick={goBack} className="text-indigo-600 cursor-pointer">Models And Entities</span>
                    <IoIosArrowForward className="text-gray-500" />
                </div>
                <Modal
                    isOpen={isCreateFieldModalOpen}
                    onClose={() => setIsCreateFieldModalOpen(false)}
                >
                    <CreateField />
                </Modal>
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">{selectedItem.title}</h1>
                        <div className="flex space-x-2">
                            <button onClick={() => setIsCreateFieldModalOpen(true)} className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded flex items-center space-x-1">
                                +
                                <span className='ml-1'>Create Field</span>
                            </button>
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded flex items-center space-x-1">
                                <IoSave />
                                <span>Save</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-gray-600">{selectedItem.description}</p>
                        <div className="relative flex space-x-2" ref={dropdownRef}>
                            <button onClick={() => setIsMetricSlidingPanelOpen(true)} className="bg-white hover:bg-gray-100 px-3 py-1 border rounded flex items-center space-x-1">
                                <IoStatsChart />
                                <span>Metrics</span>
                            </button>
                            <button onClick={toggleShowFieldsDropdown} className="bg-white hover:bg-gray-100 px-3 py-1 border rounded flex items-center space-x-1">
                                <IoEye />
                                <span>Show Fields</span>
                            </button>
                            {isShowFieldsDropdownOpen && (
                                <div className="absolute top-full mt-1 w-48 bg-white border rounded shadow-md">
                                    <div className="px-4 py-2">
                                        <label className="flex h-[30px] items-center space-x-2 cursor-pointer">
                                            <input type="checkbox" checked={selectedFields.length === allFields.length} onChange={handleAllFieldsSelection} />
                                            <span>All Fields</span>
                                        </label>
                                        {allFields.map(field => (
                                            <label key={field} className="flex h-[30px]  items-center space-x-2 cursor-pointer">
                                                <input type="checkbox" checked={selectedFields.includes(field)} onChange={() => handleFieldSelection(field)} />
                                                <span>{field}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className='relative flex space-x-2'>
                            <button onClick={toggleMenuModal} className="bg-white hover:bg-gray-100 px-2 py-1 border rounded flex items-center">
                                <IoEllipsisVertical />
                            </button>
                            {isMenuModalOpen && (
                                <div className="absolute right-2 top-full mt-1 w-48 bg-white border rounded shadow-md">
                                    <ul className="">
                                        <li onClick={handleEntitySettings} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                                            <IoSettingsSharp />
                                            <span>Entity Settings</span>
                                        </li>
                                        <li className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded text-red-600">
                                            <IoTrashBin />
                                            <span>Delete Model</span>
                                        </li>
                                    </ul>
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 border rounded-lg">
                    <div className='h-[400px] overflow-auto'><DisplayTable /></div>
                </div>
            </div>
            <MetricSlidingPanel isOpen={isMetricSlidingPanelOpen} onClose={() => setIsMetricSlidingPanelOpen(false)} />
        </div>
    );
};

export default ModelsAndEntitiesView;
