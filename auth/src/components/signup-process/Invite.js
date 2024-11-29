import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

const Invite = () => {
  const history = useHistory();
  const [emails, setEmails] = useState([]);
  const [emailInput, setEmailInput] = useState('');

  const handleAddEmail = () => {
    if (emailInput.trim() !== '') {
      setEmails([...emails, emailInput.trim()]);
      setEmailInput('');
    }
  };

  const handleRemoveEmail = (index) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const handleSkip = () => {
    history.push('/dashboard')
  };


  return (
    <div className="p-8 pt-0 space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1 text-center">
          <h3 className="text-2xl font-semibold text-gray-700">Invite</h3>
        </div>
        <div
          className="text-xs text-purple-500 cursor-pointer hover:text-purple-600 hover:border-b hover:border-b-purple-600 ml-auto"
          onClick={handleSkip}
        >
          Skip
        </div>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <div className="flex flex-wrap gap-2">
          {emails.map((email, index) => (
            <div key={index} className="bg-gray-100 rounded-md px-2 py-1 flex items-center">
              <span className="mr-1 text-xs ">{email}</span>
              <button
                className="ml-1 text-xs text-red-500 hover:text-red-700 focus:outline-none"
                onClick={() => handleRemoveEmail(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <input
            type="email"
            className="w-[600px] text-xs px-2 py-2 rounded-md border border border-gray-300"
            placeholder="Enter email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <button
            className="ml-2 text-xs px-2 py-1 bg-white text-black border border-gray-300 rounded-sm flex items-center justify-center shadow-sm hover:border-gray-400"
            onClick={handleAddEmail}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invite;
