import React, { useState } from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from 'react-icons/io';
import * as XLSX from 'xlsx';
import Spinner from '../../../UI/Spinner';

const DataTable = ({ columns, data, onEditSave }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        setPageSize,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 5 },
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const { globalFilter, pageIndex, pageSize } = state;

    const [editedRow, setEditedRow] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState(
        data.reduce((acc, row) => {
            acc[row.id] = row.connectionStatus || 'Not Connected';
            return acc;
        }, {})
    );

    const handleEdit = (row) => {
        setEditedRow(row);
    };

    const handleSaveEdit = () => {
        onEditSave(editedRow);
        setEditedRow(null);
    };

    const handleCancelEdit = () => {
        setEditedRow(null);
    };

    const handleConnect = (rowId) => {
        setConnectionStatus((prevStatus) => ({
            ...prevStatus,
            [rowId]: prevStatus[rowId] === 'Connected' ? 'Not Connected' : 'Connected',
        }));
    };

    const handleExport = () => {
        if(data.length > 0){
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Data');
            XLSX.writeFile(wb, 'table_data.xlsx');
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-8 w-full">
            <div className="py-8">
                <div className="mb-4 flex justify-between">
                    <div className='flex'>
                        <input
                            value={globalFilter || ''}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className="px-3 py-1 border rounded-md w-48 ml-2"
                            placeholder="Search..."
                        />
                    </div>
                    <div>
                        <button
                            onClick={handleExport}
                            className=" text-xs px-3 py-1 border rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            Export
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <div className="min-w-full shadow rounded-lg">
                        {columns.length === 0 || data.length === 0 ? (
                            <Spinner />
                        ) : (
                            <>
                                <table {...getTableProps()} className="min-w-full leading-normal w-full">
                                    <thead>
                                        {headerGroups.map(headerGroup => (
                                            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                                                {headerGroup.headers.map(column => (
                                                    <th
                                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 tracking-wider"
                                                        key={column.id}
                                                    >
                                                        <div className='flex items-center '>
                                                        {column.render('Header')}
                                                        <span>
                                                            {column.isSorted
                                                                ? column.isSortedDesc
                                                                    ? <IoIosArrowRoundDown className='ml-1 w-5 h-5'/>
                                                                    : <IoIosArrowRoundUp className='ml-1 w-5 h-5'/>
                                                                : ''}
                                                        </span>
                                                        </div>
                                                    </th>
                                                ))}
                                            </tr>
                                        ))}
                                    </thead>
                                    <tbody {...getTableBodyProps()}>
                                        {page.map(row => {
                                            prepareRow(row);
                                            return (
                                                <tr {...row.getRowProps()} key={row.id}>
                                                    {row.cells.map(cell => (
                                                        <td
                                                            {...cell.getCellProps()}
                                                            className="px-4 py-2 border-b border-gray-200 bg-white text-sm"
                                                            key={cell.column.id}
                                                        >
                                                            {editedRow && editedRow.id === row.original.id ? (
                                                                <input
                                                                    type="text"
                                                                    value={editedRow[cell.column.id] !== undefined ? editedRow[cell.column.id] : cell.value}
                                                                    onChange={(e) => {
                                                                        const updatedRow = {
                                                                            ...editedRow,
                                                                            [cell.column.id]: e.target.value,
                                                                        };
                                                                        setEditedRow(updatedRow);
                                                                    }}
                                                                    className="px-2 py-1 border rounded w-full"
                                                                />
                                                            ) : (
                                                                cell.render('Cell')
                                                            )}
                                                        </td>
                                                    ))}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <div className="py-3 flex justify-between items-center">
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => previousPage()}
                                            disabled={!canPreviousPage}
                                            className="px-3 py-1 border rounded-md"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={() => nextPage()}
                                            disabled={!canNextPage}
                                            className="px-3 py-1 border rounded-md ml-2"
                                        >
                                            Next
                                        </button>
                                    </div>
                                    <span>
                                        Page{' '}
                                        <strong>
                                            {pageIndex + 1} of {pageOptions.length}
                                        </strong>
                                    </span>
                                    <select
                                        value={pageSize}
                                        onChange={(e) => setPageSize(Number(e.target.value))}
                                        className="ml-2 border rounded-md h-[33px]"
                                    >
                                        {[5, 10, 20, 50].map(pageSize => (
                                            <option key={pageSize} value={pageSize}>
                                                Show {pageSize}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataTable;