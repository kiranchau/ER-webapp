import React from 'react';

const MenuBtn = (props) => {
    return (
        <button 
        className={`${'flex items-center gap-1 py-1 px-2 hover:bg-gray-100 w-[110px]'} ${props.className}`} 
        type={props.type || 'button'}
        onClick={props.onClick}>
        {props.children}
        </button>
      );
}

export default MenuBtn;
