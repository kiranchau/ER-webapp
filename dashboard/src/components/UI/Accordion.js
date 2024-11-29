import React, { useEffect, useState } from 'react';
import * as BiIcons from 'react-icons/bi';
import UseSharedDataContext from '../context/UseSharedDataContext';

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);
  const [isClickActive, setIsClickActive] = useState(false);
  const sharedDataContext = UseSharedDataContext();

  useEffect(() => {
    if (title === 'X-Axis' && sharedDataContext.dimension > 0) {
      setIsActive(true);
    } else if (title === 'Y-Axis' && sharedDataContext.measure > 0) {
      setIsActive(true);
    } else if (title === 'Filter' && sharedDataContext.filter > 0) {
      setIsActive(true);
    } else if (title === 'Sort' && sharedDataContext.sort > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [sharedDataContext.dimension,sharedDataContext.measure,sharedDataContext.filter,sharedDataContext.sort,title]);

  return (
    <div className='accordion-item border-y cursor-pointer'>
      <div
        className='accordion-title flex justify-between px-2 py-1 text-white'
        onClick={() => setIsClickActive(!isClickActive)}
      >
        <div className='text-black'>{title}</div>
        <div className='flex items-center'>
          {isClickActive || isActive ? <BiIcons.BiSolidUpArrow /> : <BiIcons.BiSolidDownArrow />}
        </div>
      </div>
      {(isClickActive || isActive) && (
        <div className='accordion-content px-2 py-1 pb-3'>{content}</div>
      )}
    </div>
  );
};

export default Accordion;
