import React, { useMemo, useState } from 'react';
import DataTable from './DataTable';

const DisplayTable = () => {
    const columns = [
        {
            Header: 'Weighted Amount',
            accessor: 'weighted_amount',
        },
        {
            Header: 'Company Name',
            accessor: 'company_name',
        },
        {
            Header: 'Amount',
            accessor: 'amount',
        },
        {
            Header: 'Stage Name',
            accessor: 'stage_name',
        },
    ]
    
    const [data, setData] = useState([
        {
          "weighted_amount": 50000,
          "company_name": "ABC Inc.",
          "amount": 75000,
          "stage_name": "Negotiation"
        },
        {
          "weighted_amount": 40000,
          "company_name": "XYZ Corp.",
          "amount": 60000,
          "stage_name": "Proposal"
        },
        {
          "weighted_amount": 60000,
          "company_name": "LMN Ltd.",
          "amount": 90000,
          "stage_name": "Discovery"
        },
        {
          "weighted_amount": 35000,
          "company_name": "PQR Co.",
          "amount": 50000,
          "stage_name": "Qualification"
        },
        {
          "weighted_amount": 45000,
          "company_name": "EFG Corp.",
          "amount": 70000,
          "stage_name": "Negotiation"
        },
        {
          "weighted_amount": 55000,
          "company_name": "RST Ltd.",
          "amount": 80000,
          "stage_name": "Proposal"
        },
        {
          "weighted_amount": 48000,
          "company_name": "GHI Inc.",
          "amount": 72000,
          "stage_name": "Discovery"
        },
        {
          "weighted_amount": 30000,
          "company_name": "JKL Co.",
          "amount": 45000,
          "stage_name": "Qualification"
        },
        {
          "weighted_amount": 42000,
          "company_name": "MNO Ltd.",
          "amount": 63000,
          "stage_name": "Negotiation"
        },
        {
          "weighted_amount": 52000,
          "company_name": "STU Corp.",
          "amount": 78000,
          "stage_name": "Proposal"
        }
      ]
      );

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
