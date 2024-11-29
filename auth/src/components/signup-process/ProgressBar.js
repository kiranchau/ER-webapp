import React from 'react';

function ProgressBar({ steps, activeStep }) {
  return (
    <div className="flex items-center mt-6 mb-6">
      {steps.map((step, index) => (
        <React.Fragment key={step.title}>
          {index !== 0 && <div className={`flex-1 h-1 mt-[-16px] ${activeStep >= index ? 'bg-indigo-600' : 'bg-indigo-200'}`}></div>}
          <div className="relative flex flex-col items-center">
            <div className={`w-6 h-6 flex items-center justify-center rounded-full border ${activeStep >= index ? 'border-indigo-600' : 'border-indigo-500'} ${activeStep === index ? 'bg-indigo-600 text-white' : 'bg-indigo-600 text-white'}`}>
              {activeStep > index ? <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg> : index + 1}
            </div>
            <p className="text-xs mt-1">{step.title}</p>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default ProgressBar;
