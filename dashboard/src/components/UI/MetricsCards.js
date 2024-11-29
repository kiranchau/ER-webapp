import React from 'react';

const MetricsCards = (props) => {
    return (
        <div key={props.key} className="relative bg-white shadow-md rounded-lg overflow-hidden cursor-pointer group border-[1px] border-neutral-300">
            <div onClick={props.onClick} className="h-58 flex justify-center items-center">
                <img src={props.metricImage} alt={props.metricTitle} className="object-contain max-h-full" />
            </div>
            <div onClick={props.onClick} className="p-4">
                <h2 className="text-xl mb-2">{props.metricTitle}</h2>
                <p className='mt-1 text-xs'>{props.metricDesc}</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-90 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={props.onSet} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded">
                    Add
                </button>
                <button onClick={props.onClick} className="w-full bg-gray-200 text-gray-700 py-1 px-3 rounded hover:bg-gray-300">
                    Preview
                </button>
            </div>
        </div>
    );
}

export default MetricsCards;
