import React, { useState } from "react";
import DataTable from "../connections/connectionsviews/DataTable";
import salesforceicon from "../../../media/salesforce.png";

const AlertsMain = () => {
  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "Last Triggers",
      accessor: "lastTriggers",
    },
    {
      Header: "Created By",
      accessor: "created by",
    },
    {
      Header: "Is Muted?",
      accessor: "is muted",
    },
  ];

  const [data, setData] = useState([]);

  return (
    <div className="w-full overflow-y-auto">
      <h1 className="text-3xl font-bold mb-4">Alerts</h1>
      <DataTable columns={columns} data={data} headings="Alerts" />
    </div>
  );
};

export default AlertsMain;
