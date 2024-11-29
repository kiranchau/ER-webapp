import React from 'react';
import '../../SCSS/popups.scss'
import Metrics from '../pages/metrics/Metrics';

const MatricView = () => {
  return (
    <div className="popups flex justify-center items-center w-full">
    <div className="addpopups">
     <Metrics />
    </div>
    </div>
  );
}

export default MatricView;
