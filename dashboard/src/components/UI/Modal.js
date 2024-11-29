// Modal.js
import React from 'react';
import * as MdIcons from "react-icons/md";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg z-50 relative">
        <div
          className="absolute cursor-pointer top-[10px] right-[10px] text-sm border rounded-full w-[25px] h-[25px] flex items-center justify-center hover:bg-red-600 hover:text-white"
          type="button"
          onClick={onClose}
        >
          <MdIcons.MdOutlineClose />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
