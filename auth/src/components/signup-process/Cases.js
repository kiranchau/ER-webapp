import React, { useState } from 'react';
import case1 from '../../media/case1.png';
import case2 from '../../media/case2.png';
import case11 from '../../media/case11.png';
import case22 from '../../media/case22.png';

const Cases = ({ activeStep, setActiveStep }) => {
  const [cardsData, setCardsData] = useState([
    {
      id: 1,
      title: 'Sales Pipeline',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
      image: case1,
      bgimage: case11
    },
    {
      id: 2,
      title: 'Lead Tracking',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
      image: case2,
      bgimage: case22
    },
    {
      id: 3,
      title: 'Win/Loss Analysis',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
      image: case1,
      bgimage: case11
    },
    {
      id: 4,
      title: 'Goals Forecasting',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
      image: case2,
      bgimage: case22
    },
    // Add more cards as needed
  ]);

  const handleSkip = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <div className="p-8 pt-0 space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1 text-center">
          <h3 className="text-2xl font-semibold text-gray-700">Cases</h3>
        </div>
        <div
          className="text-xs text-purple-500 cursor-pointer hover:text-purple-600 hover:border-b hover:border-b-purple-600 ml-auto"
          onClick={handleSkip}
        >
          Skip
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="flex border rounded-lg overflow-hidden shadow-lg"
            style={{ backgroundImage: `url(${card.bgimage})`, backgroundSize: 'cover' }}
          >
            <div className="w-3/4 p-4 bg-white bg-opacity-75">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-gray-700 text-xs mb-8">{card.description}</p>
            </div>
            <div className="w-1/4 relative">
              <img src={card.image} alt={card.title} className="absolute bottom-2 right-2 m-auto h-20 w-20 object-contain" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cases;
