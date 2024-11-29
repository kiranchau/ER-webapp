import React, { useState, useEffect, useRef } from 'react';
import * as SlIcons from 'react-icons/sl';
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as FiIcons from 'react-icons/fi';
import * as PiIcons from 'react-icons/pi';
import * as IoIcons from 'react-icons/io';
import * as LuIcons from 'react-icons/lu';
import MenuBtn from './MenuBtn';
import UseMetricDetailsContext from '../context/UseMetricDetailsContext';
import { useHistory } from "react-router-dom";

const MatricCard = (props) => {
    const [optnShow, setOptnShow] = useState(false);
    const popupRef = useRef(null);
    const metricDetailsContext = UseMetricDetailsContext();
    const history = useHistory()

    const OptnState = () => {
        setOptnShow(!optnShow);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setOptnShow(false);
            }
        };

        if (optnShow) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [optnShow]);

    const handleMetricClick = (metric) => {
        console.log("metric handleMetricClick??", metric);
        history.push(`/dashboard/explore/${props.id}`, {
          dashboard_metric: {
            dashboard: props.selectedDashboard,
            metric: metric,
            metricsDetails: metricDetailsContext.metricData,
          },
        });
      };

    return (
        <div className={`${'mt-3 matricBody border border-neutral-300 rounded-md w-[32%]'} ${props.className}`} >
            <div className='matricHead flex items-center justify-between  border-b border-neutral-300 hover:bg-slate-50 cursor-pointer'>
                <div className='flex items-center py-2 px-4 w-full' onClick={()=>handleMetricClick(props.metric)}>
                    <div className='me-2 w-4'><MdIcons.MdOutlineDragIndicator className='text-base drgBtn' /></div>
                    <h2>{props.title}</h2>
                </div>
                <div className='relative z-10 py-2 px-4' ref={popupRef}>
                    <div onClick={()=>OptnState()}><SlIcons.SlOptionsVertical /></div>
                    {optnShow && <div className='absolute right-3 p-1 bg-white rounded shadow-lg'>
                        <MenuBtn><FaIcons.FaListUl />DrillDown</MenuBtn>
                        <MenuBtn className='relative flex justify-between mOptn'>
                            <div className='flex items-center gap-1 w-full'><FiIcons.FiSend />Send</div><IoIcons.IoIosArrowForward />
                            <div className='absolute -right-[110px] top-0 shadow-lg p-1 SubOptn bg-white'>
                                <MenuBtn><LuIcons.LuMail />Email</MenuBtn>
                                <MenuBtn><PiIcons.PiSlackLogoThin />Slack</MenuBtn>
                            </div>
                        </MenuBtn>
                        <MenuBtn><RiIcons.RiEdit2Line />Edit</MenuBtn>
                        <MenuBtn><RiIcons.RiDeleteBin6Line />Delete</MenuBtn>
                    </div>}
                </div>
            </div>
            <div className='h-[300px] overflow-hidden'>
                {props.children}
            </div>
            <div className='flex justify-between p-2 px-4 text-gray-500'>
                <div className='flex items-center'>
                    <BsIcons.BsDatabaseX />
                    <span className='ml-1'>Sample data</span>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='CompanyIcons'></div>
                    <div className='CompanyIcons'></div>
                </div>
            </div>
        </div>
    );
}

export default MatricCard;
