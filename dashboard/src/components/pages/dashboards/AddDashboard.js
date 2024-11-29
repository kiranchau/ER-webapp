import React, { useState } from "react";
import { addMatricsDashboard } from "../../../API/authCrud";
import UseSharedDataContext from "../../context/UseSharedDataContext";

const AddDashboard = ({ setIsAddDashboardModalOpen }) => {
  const sharedContext = UseSharedDataContext();
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [wordCount, setWordCount] = useState(0);

  const handleDescriptionChange = (e) => {
    const words = e.target.value.split("").filter(Boolean);
    if (words.length <= 250) {
      setDescription(e.target.value);
      setWordCount(words.length);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePrivacyChange = (e) => {
    setPrivacy(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    const data = {
      name: name,
      description: description,
      privacy: privacy,
    };
    addMatricsDashboard(data)
      .then((res) => {
        console.log("reswer", res);
        if (res.status === 201) {
          sharedContext.setNotifayMessage("Dashboard Created.");
          sharedContext.setNotifayType("success");
          setIsAddDashboardModalOpen(false);
        }
      })
      .catch((err) => {
        sharedContext.setNotifayMessage("Something went wrong..");
        sharedContext.setNotifayType("error");
        console.log("err", err);
      });
  };

  const handleCancel = () => {
    console.log("Form cancelled");
    setIsAddDashboardModalOpen(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl mb-4">Add Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleNameChange}
            className="mt-1 block w-[500px] border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Enter a name"
            maxLength={100}
          />
        </div>
        <div className="mb-4">
          <div className="flex justify-between">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="description"
            >
              Description (optional)
            </label>
            <p className="text-sm text-gray-500">{wordCount}/250</p>
          </div>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter a description for your dashboard"
            rows="5"
            style={{
              border: "1px solid #D9D9D9",
              borderRadius: "5px",
              padding: "5px",
              marginTop: "0px",
              width: "500px",
              height: "110px",
            }}
          />
        </div>
        <div className="mb-4">
          <span className="block text-sm font-medium text-gray-700">
            Privacy
          </span>
          <div className="mt-1">
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="privacy"
                value="public"
                checked={privacy === "public"}
                onChange={handlePrivacyChange}
                className="form-radio"
              />
              <span className="ml-2">Public</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="privacy"
                value="private"
                checked={privacy === "private"}
                onChange={handlePrivacyChange}
                className="form-radio"
              />
              <span className="ml-2">Private</span>
            </label>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="mr-4 bg-gray-200 text-gray-700 px-3 py-1 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md"
          >
            Add Dashboard
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDashboard;
