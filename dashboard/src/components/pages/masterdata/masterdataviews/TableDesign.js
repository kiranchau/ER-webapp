import React, { useState } from 'react';
import DataTable from './DataTable';
import QueryDisplay from './QueryDisplay';
import UseSharedDataContext from '../../../context/UseSharedDataContext';

const TableDesign = ({ columns, setColumns, data, setData }) => {
    const [toggleTab, setToggleTab] = useState(1);
    const sharedDataContext = UseSharedDataContext();
    
    const toggleState = (index) => {
        setToggleTab(index);
    };

    const handleEditSave = (updatedRow) => {
        setData(prevData => prevData.map(row => (row.id === updatedRow.id ? updatedRow : row)));
    };

    const tabMenu = [
        { id: 1, title: "Table" },
        { id: 2, title: "Drilldown" },
        { id: 3, title: "SQL" }
    ];

    const renderContent = () => {
        if (toggleTab === 1) {
            return <DataTable columns={columns} data={data} onEditSave={handleEditSave} />;
        }
        if (toggleTab === 2) {
            return <DataTable columns={columns} data={data} onEditSave={handleEditSave} />;
        }
        if (toggleTab === 3) {
            return <QueryDisplay query={sharedDataContext.query}/>;
        }
    };

    return (
            <div className='col-span-2 bg-gray-50 px-3 pt-[20px] h-screen overflow-y-auto'>
                <div className='flex justify-between items-center py-2 border-b'>
                    <div className='flex gap-3 text-xs'>
                        {tabMenu.map((menu) => (
                            <button key={menu.id}
                                className={toggleTab === menu.id ? "border px-2 py-1 rounded-md bg-indigo-100 border-indigo-600 text-indigo-600" : "border px-2 py-1 rounded-md"}
                                onClick={() => toggleState(menu.id)}>
                                {menu.title}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    {renderContent()}
                </div>
            </div>
    );
};

export default TableDesign;
