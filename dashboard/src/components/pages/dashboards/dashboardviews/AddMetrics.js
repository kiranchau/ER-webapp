import React, { useState } from 'react'
import Metrics from '../../metrics/Metrics'
import MetricsView from '../../metrics/MetricsView';

const AddMetrics = ({dashboard}) => {
  const [selectedMetric, setSelectedMetric] = useState(null);

  const handleCardClick = (metric) => {
    setSelectedMetric(metric);
  };

  const closeModal = () => {
    setSelectedMetric(null);
  };
  return (
    <div className='w-[1000px] h-[650px] overflow-auto'>
        <div className='text-xl ml-5 mt-5 mb-[-50px]'>Add a metric to your dashboard</div>
        {selectedMetric ? (
            <MetricsView metric={selectedMetric} setSelectedMetric={setSelectedMetric} isModal dashboard={dashboard}/>
      ) : (
        <Metrics onCardClick={handleCardClick} isModal dashboard={dashboard}/>
      )}
    </div>
  )
}

export default AddMetrics