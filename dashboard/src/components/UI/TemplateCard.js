import React from 'react';

const TemplateCard = (props) => {
    return (
        <div key={props.key} className="relative bg-white shadow-md rounded-lg overflow-hidden cursor-pointer group border border-neutral-300">
            <div className="h-20 flex items-center px-4 pt-4">
                <img src={props.tempImage} alt={props.tempTitle} className="object-contain max-h-full" />
            </div>
            <div className="p-4">
                <h2 className="text-xl mb-2">{props.tempTitle}</h2>
                <p className='mt-1 text-xs'>{props.tempDesc}</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-90 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={props.onClick} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded">
                    Add
                </button>
            </div>
        </div>
    );
}

export default TemplateCard;
