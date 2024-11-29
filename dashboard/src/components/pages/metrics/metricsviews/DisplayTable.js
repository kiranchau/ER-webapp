import React, { useMemo, useState } from 'react';
import DataTable from './DataTable';

const DisplayTable = ({ columns, setColumns, data, setData }) => {
    const handleDelete = (rowId) => {
        setData(prevData => prevData.filter(row => row.id !== rowId));
    };

    const handleEditSave = (updatedRow) => {
        setData(prevData => prevData.map(row => (row.id === updatedRow.id ? updatedRow : row)));
    };

    return (
        <div className='w-full overflow-y-auto'>
            <DataTable columns={columns} data={data} onEditSave={handleEditSave} />
        </div>
    );
}

export default DisplayTable;
