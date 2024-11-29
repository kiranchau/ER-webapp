import React, { useState } from 'react';
import salesforce from '../../media/salesforce.png';
import hubspot from '../../media/hubspot.png';

const Connectors = ({ activeStep, setActiveStep }) => {
  const [cardsData, setCardsData] = useState([
    {
      id: 1,
      title: 'Salesforce',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
      imageUrl: salesforce,
      checked: false,
    },
    {
      id: 2,
      title: 'Hubspot',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
      imageUrl: hubspot,
      checked: false,
    },
  ]);

  const handleCheckboxChange = (id) => {
    setCardsData(cardsData.map(card =>
      card.id === id ? { ...card, checked: !card.checked } : card
    ));
  };

  const handleSkip = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <div className="p-8 pt-0 space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1 text-center">
          <h3 className="text-2xl font-semibold text-gray-700">Connectors</h3>
        </div>
        <div
          className="text-xs text-purple-500 cursor-pointer hover:text-purple-600 hover:border-b hover:border-b-purple-600 ml-auto"
          onClick={handleSkip}
        >
          Skip
        </div>
      </div>
      {cardsData.map((card) => (
        <div key={card.id} className="flex border rounded-lg overflow-hidden shadow-lg h-32">
          <div className="w-1/4 p-4 flex relative">
            <input
              type="checkbox"
              className="form-checkbox h-3 w-3 text-blue-600 absolute top-4 left-4"
              checked={card.checked}
              onChange={() => handleCheckboxChange(card.id)}
            />
            <img src={card.imageUrl} alt={card.title} className="m-auto h-20 w-20 object-contain" />
          </div>
          <div className="w-3/4 p-4">
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="text-gray-700 text-xs">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Connectors;
