import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import '../../SCSS/sidebar.scss';
import * as HiIcons from 'react-icons/hi';
import * as PiIcons from 'react-icons/pi';
import * as VscIcons from 'react-icons/vsc';
import * as MdIcons from 'react-icons/md';
import * as CgIcons from 'react-icons/cg';
import * as FaIcons from "react-icons/fa";
import { TbAlertSquare } from "react-icons/tb";
import Header from "./Header";
import Myprofile from "../popups/Myprofile";

const Sidebar = () => {
  const [inActive, setInActive] = useState(false);
  const [myprofile, setMyprofile] = useState(false);
  const [activePath, setActivePath] = useState('');
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboards", to: '/dashboard', exact: true, icon: <MdIcons.MdOutlineDashboard /> },
    { name: "Metrics Store", to: '/dashboard/metrics', icon: <MdIcons.MdOutlineStore /> },
    { name: "Models & Entities", to: '/dashboard/models-entities', icon: <FaIcons.FaCubes /> },
    { name: "Alerts", to: '/dashboard/alerts', exact: true, icon: <TbAlertSquare /> },
    { name: "Connections", to: '/dashboard/connections', icon: <VscIcons.VscDebugDisconnect /> },
    { name: "Data Explorer", to: '/dashboard/explore', exact: true, icon: <PiIcons.PiDatabase /> },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = menuItems.find(item => {
      if (item.exact) {
        return currentPath === item.to;
      }
      return currentPath.startsWith(item.to);
    });

    if (currentItem) {
      setActivePath(currentItem.name);
    } else {
      setActivePath('');
    }
  }, [location.pathname, menuItems]);

  const handleNavigation = (item) => {
    history.push(item.to);
    setActivePath(item.name);
  };

  return (
    <>
      <Header onClick={() => setInActive(!inActive)} showProfile={() => setMyprofile(true)} />
      <div className={`${inActive ? 'navigation smallNav' : 'navigation bigNav'}`}>
        <div style={{ paddingTop: "70px" }}>
          <ul>
            {menuItems.map((item, index) => (
              <li className="list cursor-pointer" key={index}>
                <a onClick={() => handleNavigation(item)} className={activePath === item.name ? 'active' : undefined}>
                  <b></b>
                  <b></b>
                  <b></b>
                  <span className="icon myIcon">{item.icon}</span>
                  <span className="title">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {myprofile && (
        <div className="absolute bottom-0 right-0 z-30">
          <Myprofile onClick={() => setMyprofile(!myprofile)} />
        </div>
      )}
    </>
  );
};

export default Sidebar;
