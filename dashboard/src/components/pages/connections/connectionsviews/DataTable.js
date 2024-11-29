import React, { useState, useEffect } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import { FaInfoCircle } from "react-icons/fa";
import Modal from "../../../UI/Modal";
import IntegrationGuide from "./IntegrationGuide";
import { salesforceLogin } from "../../../../API/authCrud";
import Button from "../../../UI/Button";
import * as FaIcons from "react-icons/fa";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const DataTable = ({ columns, data, onEditSave, headings }) => {
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
  const history = useHistory();
  const { globalFilter, pageIndex, pageSize } = state;

  const [editedRow, setEditedRow] = useState(null);
  const [isIntegrationGuideModalOpen, setIsIntegrationGuideModalOpen] =
    useState(false);

  // Load connection status from localStorage
  const loadConnectionStatus = () => {
    const storedStatus =
      JSON.parse(localStorage.getItem("connectionStatus")) || {};
    return data.reduce((acc, row) => {
      acc[row.id] = storedStatus[row.id] || "Not Connected";
      return acc;
    }, {});
  };

  const [connectionStatus, setConnectionStatus] =
    useState(loadConnectionStatus);

  // Save connection status to localStorage
  const saveConnectionStatus = (status) => {
    localStorage.setItem("connectionStatus", JSON.stringify(status));
  };

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
    salesforceLogin()
      .then((res) => {
        console.log("salesforceLogin", res);
        // Extract the URL from the HTML response
        const parser = new DOMParser();
        const doc = parser.parseFromString(res.data, "text/html");
        const redirectUrl = doc
          .querySelector("script")
          .textContent.match(/window.location.href ='([^']+)'/)[1];

        if (redirectUrl) {
          window.open(redirectUrl, "_blank"); // Open the URL in a new tab

          // Simulate successful login and update connection status
          const updatedStatus = {
            ...connectionStatus,
            [rowId]: "Connected",
          };
          setConnectionStatus(updatedStatus);
          saveConnectionStatus(updatedStatus);
        }
      })
      .catch((err) => {
        console.log("salesforceLogin", err);
      });
  };

  const handleInfoClick = (row) => {
    setIsIntegrationGuideModalOpen(true);
    console.log("Info button clicked for row:", row);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 w-full">
      <div className="py-8">
        <div className="mb-4 flex justify-between">
          <h1 className="text-2xl">{headings}</h1>
          <div className="flex items-center">
            <input
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="px-3 py-1 border rounded-md w-48 mr-2"
              placeholder="Search..."
            />
            {headings === "Alerts" && (
              <Button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full flex items-center hover:bg-indigo-700" onClick={()=>{history.push("/dashboard/alerts/add")}}>
                <FaIcons.FaPlus className="mr-2" />
                Add Alert
              </Button>
            )}
          </div>
        </div>
        <Modal
          isOpen={isIntegrationGuideModalOpen}
          onClose={() => setIsIntegrationGuideModalOpen(false)}
        >
          <IntegrationGuide />
        </Modal>
        <div className="overflow-x-auto">
          <div className="min-w-full shadow rounded-lg overflow-hidden">
            <table
              {...getTableProps()}
              className="min-w-full leading-normal w-full"
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    key={headerGroup.id}
                  >
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                        key={column.id}
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                      </th>
                    ))}
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                      key="action"
                    >
                      Action
                    </th>
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} key={row.id}>
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                          key={cell.column.id}
                        >
                          {editedRow && editedRow.id === row.original.id ? (
                            <input
                              type="text"
                              value={
                                editedRow[cell.column.id] !== undefined
                                  ? editedRow[cell.column.id]
                                  : cell.value
                              }
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
                            cell.render("Cell")
                          )}
                        </td>
                      ))}
                      <td
                        className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                        key={`action-${row.id}`}
                      >
                        <div className="flex space-x-2">
                          <button
                            className={`mb-2 px-3 py-1 border rounded-md ${
                              connectionStatus[row.original.id] === "Connected"
                                ? "bg-green-600 text-white"
                                : "bg-indigo-600 hover:bg-indigo-700 text-white"
                            }`}
                            onClick={() => handleConnect(row.original.id)}
                          >
                            {connectionStatus[row.original.id] === "Connected"
                              ? "Connected"
                              : "Connect"}
                          </button>
                          <button
                            className="w-6 h-6 mt-1 border-none rounded-md text-gray-500"
                            onClick={() => handleInfoClick(row.original)}
                          >
                            <FaInfoCircle />
                          </button>
                        </div>
                      </td>
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
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>
              </span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="ml-2 border rounded-md h-[33px]"
              >
                {[5, 10, 20, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
