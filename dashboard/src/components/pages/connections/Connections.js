import React, { useMemo, useState } from 'react';
import DataTable from './connectionsviews/DataTable';
import salesforceicon from '../../../media/salesforce.png'

const Connections = () => {
    const columns = [
        {
            Header: 'Logo',
            accessor: 'logo',
        },
        {
            Header: 'Brand Name',
            accessor: 'brandName',
        },
        {
            Header: 'Connection Type',
            accessor: 'connectionType',
        },
        {
            Header: 'Data',
            accessor: 'data',
        },
        {
            Header: 'Category',
            accessor: 'category',
        },
    ]
    
    const [data, setData] = useState([
        { id: 1, logo: <img src={salesforceicon} alt='' className='w-8 h-6'/>, brandName: 'Salesforce', connectionType: 'salesforce', data: 'Sales & Support Analytics Sales', category: 'CRM' }, 
    ]);

    const handleDelete = (rowId) => {
        setData(prevData => prevData.filter(row => row.id !== rowId));
    };

    const handleEditSave = (updatedRow) => {
        setData(prevData => prevData.map(row => (row.id === updatedRow.id ? updatedRow : row)));
    };

    return (
        <div className='w-full overflow-y-auto'>
            <h1 className="text-3xl font-bold mb-4">Connections</h1>
            <DataTable columns={columns} data={data} onEditSave={handleEditSave} headings="Connections"/>
        </div>
    );
}

export default Connections;
