import React, { useState } from 'react';

const DetailsTab = () => {
  // Initialize state for each input field
  const [name, setName] = useState("Opportunities");
  const [description, setDescription] = useState("List of opportunities and their properties");
  const [key, setKey] = useState("opportunities");
  const [defaultDateField, setDefaultDateField] = useState("Select date field");
  const [primaryKey, setPrimaryKey] = useState("Id");
  const [title, setTitle] = useState("Name");

  // Handle save button click
  const handleSave = () => {
    // You can process or save the form data here
    const formData = { name, description, key, defaultDateField, primaryKey, title };
    console.log("Form Data:", formData);
    // Add your save logic here
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          className="mt-1 p-2 border rounded w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <input
          className="mt-1 p-2 border rounded w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Key</label>
        <input
          className="mt-1 p-2 border rounded w-full"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Default date field</label>
        <input
          className="mt-1 p-2 border rounded w-full"
          value={defaultDateField}
          onChange={(e) => setDefaultDateField(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Primary key</label>
        <input
          className="mt-1 p-2 border rounded w-full"
          value={primaryKey}
          onChange={(e) => setPrimaryKey(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          className="mt-1 p-2 border rounded w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default DetailsTab;
