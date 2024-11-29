import React, { useEffect, useState } from 'react';
import TableDesign from './TableDesign';
import LineChart from './LineChart';
import BarChart from './BarChart';
import PieChart from './PieChart';
import BubbleChart from './BubbleChart';
import AreaChart from './AreaChart';
import ColumnChart from './ColumnChart';
import Spinner from '../../../UI/Spinner';
import TrendChart from './TrendChart';

const SplitDesign = ({ columns, data, visualizationType }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timer to hide the spinner after 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Clean up the timer if the component unmounts before the timer completes
    return () => clearTimeout(timer);
  }, []);

  const renderChart = () => {
    switch (visualizationType) {
      case 4:
        return <AreaChart />;
      case 5:
        return <TrendChart />;
      case 6:
        return <LineChart />;
      case 7:
        return <BarChart />;
      case 8:
        return <BubbleChart />;
      case 9:
        return <ColumnChart />;
      case 10:
        return <PieChart />;
      default:
        return <div className='flex justify-center'>No data available</div>;
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='flex flex-col justify-center items-center p-5'>
      <div className='w-full mb-5'>
        {renderChart()}
      </div>
      <hr className='w-full border-t border-gray-300 my-5' />
      <div className='w-full'>
        <TableDesign columns={columns} data={data} />
      </div>
    </div>
  );
}

export default SplitDesign;
