import React from 'react';
import { IoClose } from "react-icons/io5";

const MetricSlidingPanel = ({ isOpen, onClose }) => {
    return (
        <div className={`fixed bottom-0 right-0 h-[580px] w-[600px] bg-white border transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
            <div className="p-4 flex justify-between items-center border-b">
                <h2 className="text-lg font-bold">Metrics</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <IoClose size={24} />
                </button>
            </div>
            <div className="p-4 flex justify-between">
                <input
                    type="text"
                    placeholder="Search metrics..."
                    className="w-[200px] px-3 py-1 border rounded-md"
                />
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md w-[110px]">
                    + Add Metric
                </button>
                {/* Add more content here if needed */}
            </div>
        </div>
    );
};

export default MetricSlidingPanel;
