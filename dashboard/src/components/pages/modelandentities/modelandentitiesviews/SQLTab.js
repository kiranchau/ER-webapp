import React, { useState } from 'react';

const SQLTab = () => {
  const [sqlQuery, setSqlQuery] = useState("SELECT * FROM salesforce opportunity");
  const [tableData, setTableData] = useState([
    { RECORDTYPEID: 'oLKMZoo0002RCcTes', ISDELETED: true, ISCLOSED: false, PROBABILITY: 30, LEADSOURCE: 'Linkedin' },
    { RECORDTYPEID: 'oLKMZoo0002RCcTes', ISDELETED: true, ISCLOSED: false, PROBABILITY: 30, LEADSOURCE: 'Ebooks' },
    { RECORDTYPEID: 'oLK4Xooo000Mqlaee3', ISDELETED: true, ISCLOSED: false, PROBABILITY: 50, LEADSOURCE: 'Google ads' },
    { RECORDTYPEID: 'oLKMZoo0002RCcTes', ISDELETED: true, ISCLOSED: false, PROBABILITY: 30, LEADSOURCE: 'Google ads' },
  ]);

  const handleSqlQueryChange = (e) => {
    setSqlQuery(e.target.value);
  };

  const handleRunSql = () => {
    console.log("Running SQL Query:", sqlQuery);
    const mockResponseData = [
      { RECORDTYPEID: 'oLMKZoo1234RCcTes', ISDELETED: false, ISCLOSED: true, PROBABILITY: 60, LEADSOURCE: 'Email' },
      { RECORDTYPEID: 'oLMKZoo5678RCcTes', ISDELETED: false, ISCLOSED: true, PROBABILITY: 80, LEADSOURCE: 'Direct' },
    ];
    setTableData(mockResponseData);
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700">SQL</label>
        <textarea
          className="mt-1 p-2 border rounded w-full h-40"
          value={sqlQuery}
          onChange={handleSqlQueryChange}
        />
      </div>
      <div className="mb-4">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          onClick={handleRunSql}
        >
          Run SQL
        </button>
      </div>
      <div>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2">RECORDTYPEID</th>
              <th className="py-2">ISDELETED</th>
              <th className="py-2">ISCLOSED</th>
              <th className="py-2">PROBABILITY</th>
              <th className="py-2">LEADSOURCE</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="py-2">{row.RECORDTYPEID}</td>
                <td className="py-2"><input type="checkbox" checked={row.ISDELETED} readOnly /></td>
                <td className="py-2"><input type="checkbox" checked={row.ISCLOSED} readOnly /></td>
                <td className="py-2">{row.PROBABILITY}</td>
                <td className="py-2">{row.LEADSOURCE}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SQLTab;
