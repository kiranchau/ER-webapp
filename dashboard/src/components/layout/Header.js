import React from "react";
import { useHistory } from "react-router-dom";
import smlllogo from "../../media/revenue logo.png";
import userprofile from "../../media/userprofile.png";
import "../../SCSS/header.scss";
import * as FiIcons from 'react-icons/fi'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import { useEffect } from "react";
import { useState } from "react";
import UseSharedDataContext from "../context/UseSharedDataContext";

const Header = (props) => {
  const history = useHistory()
  const {user} = UseSharedDataContext();

  return (
    <>
      <div className="headbg p-2 flex justify-between items-center">
        <div className="topSection p-2 flex items-center">
          <img src={smlllogo} className="smallLogo" alt="small Logo" />
          <div type='button' onClick={props.onClick} className="cursor-pointer"><RiIcons.RiBarChartHorizontalFill className="myIcon" /></div>
        </div>
        <div className="w-1/3">
          <div className="relative rounded-full shadow-sm w-full">
            <div className="absolute pointer-events-auto inset-y-0 left-0 pl-3 flex items-center">
              <svg
                className="absolute text-slate-400 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              className="font-sans block text-sm w-full pl-10 py-2 px-3 ring-1 ring-slate-900/10 text-slate-500 rounded-full dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-400"
            />
          </div>
        </div>
        <div className="px-2 flex items-center">
          <div className="float-end px-2">
            <div className="userName">{user?.full_name}</div>
            {/* <div className="userDesig">Marketing Administrator</div> */}
          </div>
          <div className="profileIcon cursor-pointer border" onClick={props.showProfile}><img src={userprofile} alt="" className="w-6 h-6 ml-2 mt-[5px]" /></div>
          <IoIcons.IoIosNotificationsOutline className="myIcon" />
          <span className="cursor-pointer" onClick={(e) => {
            localStorage.clear()
            history.push('/')
          }}> <FiIcons.FiPower className="myIcon" /></span>
        </div>
      </div>
    </>
  );
};

export default Header;
