import React,{useState} from 'react'
import { FiLogOut } from 'react-icons/fi';
import { LuPcCase } from 'react-icons/lu';
import { RiHome5Line } from 'react-icons/ri';
import { TbProgress } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import apiRequest from '../utils/request';
import {language} from "../utils/part-1lan"
import {useSelector} from 'react-redux'
import { CgProfile } from "react-icons/cg";
import ServerError from './ServerError';


function ResponsiveSidebar() {
  const translationState = useSelector((state)=>state?.translation)
  const [serverError,setServerError] = useState(false)
  const handleLogout = async () => {
   try {
    await apiRequest
    .get("/customer_user_api/logout_customer_user")
    .then(() => {
      sessionStorage.clear();
      window.location.href = "/";
    }).catch(()=>{
      setServerError(true);
    });
    
   } catch (error) {
    setServerError(true)
    
   }
  };

  if(serverError) return <ServerError />
  return (
    <div className="w-[40%] h-[92%]  fixed top-[80px] left-0 bg-[#0C73B8] z-10 hidden max-md2:block">
    
    <div className="flex flex-col justify-between h-[85%] max-sm1:text-[12px]">
      <div className='mt-[30px]'>
        <div className='w-[80%] mx-auto my-[30px] text-white font-bold'>
          <span>
          {translationState?.lan === "En" && "Navigation"}
          {translationState?.lan === "Am" && "ናቪጌሽን"}
          </span>
        </div>

      <div className="w-[80%]  mx-auto flex flex-col gap-[30px]">
        <Link
          to="/dashboard"
          className="w-[100%] flex items-center gap-[20px] text-white"
        >
          <RiHome5Line />
          <span>
          {translationState?.lan === "En" &&
                          language?.dashboard[0]}
                        {translationState?.lan === "Am" &&
                          language?.dashboard[1]}
          </span>
        </Link>
        <Link
          to="/dashboard/cases"
          className="w-[100%] flex items-center gap-[20px] text-white"
        >
          <LuPcCase />
          <span>
          {translationState?.lan === "En" &&
                          language?.applyCase[0]}
                        {translationState?.lan === "Am" &&
                          language?.applyCase[1]}
                                      {translationState?.lan==="Or" &&    <span>{language?.applyCase[2]}</span>}
            {translationState?.lan==="Tg" &&    <span>{language?.applyCase[3]}</span>}
            {translationState?.lan==="Sm" &&    <span>{language?.applyCase[4]}</span>}
            {translationState?.lan==="Af" &&    <span>{language?.applyCase[5]}</span>}
          </span>
        </Link>
        <Link
          to="/dashboard/casestatus"
          className="w-[100%] flex items-center gap-[20px] text-white"
        >
          <TbProgress />
          <span>
          {translationState?.lan === "En" &&
                          language?.caseStatus[0]}
                        {translationState?.lan === "Am" &&
                          language?.caseStatus[1]}
                                      {translationState?.lan==="Or" &&    <span>{language?.caseStatus[2]}</span>}
            {translationState?.lan==="Tg" &&    <span>{language?.caseStatus[3]}</span>}
            {translationState?.lan==="Sm" &&    <span>{language?.caseStatus[4]}</span>}
            {translationState?.lan==="Af" &&    <span>{language?.caseStatus[5]}</span>}
          </span>
        </Link>
       
      </div>

      </div>
     
    
      <div className="w-[80%] mx-auto flex flex-col gap-[20px]">
       
      <Link
            to="/dashboard/settings"
           className="w-[100%] mx-auto flex items-center gap-[20px] text-white"
          >
            <CgProfile />
      
            {translationState?.lan==="En" &&    <span>{language?.profile[0]}</span>}
            {translationState?.lan==="Am" &&    <span>{language?.profile[1]}</span>}
            {translationState?.lan==="Or" &&    <span>{language?.profile[2]}</span>}
            {translationState?.lan==="Tg" &&    <span>{language?.profile[3]}</span>}
            {translationState?.lan==="Sm" &&    <span>{language?.profile[4]}</span>}
            {translationState?.lan==="Af" &&    <span>{language?.profile[5]}</span>}
          </Link>
        <button
          onClick={handleLogout}
          className="w-[100%] mx-auto flex items-center gap-[20px] text-white"
        >
          <FiLogOut />
          <span>
          {translationState?.lan === "En" &&
                          language?.logout[0]}
                        {translationState?.lan === "Am" &&
                          language?.logout[1]}

{translationState?.lan==="Or" &&    <span>{language?.logout[2]}</span>}
            {translationState?.lan==="Tg" &&    <span>{language?.logout[3]}</span>}
            {translationState?.lan==="Sm" &&    <span>{language?.logout[4]}</span>}
            {translationState?.lan==="Af" &&    <span>{language?.logout[5]}</span>}
          </span>
        </button>
      </div>
    </div>
  </div>
  )
}

export default ResponsiveSidebar