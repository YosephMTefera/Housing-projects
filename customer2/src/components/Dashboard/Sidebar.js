import React, { useState } from "react";
import { RiHome5Line } from "react-icons/ri";
import { TbProgress } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { LuPcCase } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import apiRequest from "../../utils/request";
import ServerError from "../ServerError";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { language } from "../../utils/part-1lan";



function Sidebar() {
  const translationState = useSelector((state)=>state.translation);
  const [serverError,setServerError] = useState(false)
  const handleLogout = async () => {
   try {
    await apiRequest
    .get("/customer_user_api/logout_customer_user")
    .then(() => {
      sessionStorage.clear();
      window.location.href = "/";
    }).catch((error)=>{
      if(error?.response?.status ===500){
        setServerError(true);
      }
      if(error?.response?.status === 429){
        toast.error("Too many attempts. Please try again later.")
      }
     
    });
    
   } catch (error) {
    setServerError(true)
    
   }
  };

  if(serverError) return <ServerError />
  return (
    <div className="w-[17%]  h-[100%] fixed top-0 left-0 border-r bg-[#0C73B8] max-lg1:w-[20%] max-md2:w-[30%] max-md2:hidden">
      <ToastContainer theme="light"/>
      <div className="w-[100%]  mt-[30px]  flex flex-col justify-center items-center gap-[10px]">
        <img
          className="w-[80px] h-[80px] rounded-full object-cover"
          src={require("../../CAS/housingLogo.png")}
          alt=""
        />
        <span className="text-white text-center text-[14px] max-lg2:text-[10px]">
          አዲስ አበባ ቤቶች ልማት ኮርፖሬሽን
        </span>
      </div>
      <div className="flex flex-col justify-between h-[85%] max-lg2:text-[14px] max-lg2:h-[80%]">
        <div className="w-[80%] mt-[100px] mx-auto flex flex-col gap-[40px] text-white font-bold max-lg2:mt-[70px] max-lg2:text-[12px]">
          <Link
            to="/dashboard"
            className="w-[100%] flex items-center gap-[20px]"
          >
            <RiHome5Line />
            {translationState?.lan==="En" &&    <span>{language?.dashboard[0]}</span>}
            {translationState?.lan==="Am" &&    <span>{language?.dashboard[1]}</span>}
            {translationState?.lan==="Or" &&    <span>{language?.dashboard[2]}</span>}
            {translationState?.lan==="Tg" &&    <span>{language?.dashboard[3]}</span>}
            {translationState?.lan==="Sm" &&    <span>{language?.dashboard[4]}</span>}
            {translationState?.lan==="Af" &&    <span>{language?.dashboard[5]}</span>}
            
          </Link>
          <Link
            to="/dashboard/cases"
            className="w-[100%] flex items-center gap-[20px]"
          >
            <LuPcCase />
            {translationState?.lan==="En" &&    <span>{language?.applyCase[0]}</span>}
            {translationState?.lan==="Am" &&    <span>{language?.applyCase[1]}</span>}
            {translationState?.lan==="Or" &&    <span>{language?.applyCase[2]}</span>}
            {translationState?.lan==="Tg" &&    <span>{language?.applyCase[3]}</span>}
            {translationState?.lan==="Sm" &&    <span>{language?.applyCase[4]}</span>}
            {translationState?.lan==="Af" &&    <span>{language?.applyCase[5]}</span>}
          </Link>
          <Link
            to="/dashboard/casestatus"
            className="w-[100%] flex items-center gap-[20px]"
          >
            <TbProgress />
           
            {translationState?.lan==="En" &&    <span>{language?.caseStatus[0]}</span>}
            {translationState?.lan==="Am" &&    <span>{language?.caseStatus[1]}</span>}
            {translationState?.lan==="Or" &&    <span>{language?.caseStatus[2]}</span>}
            {translationState?.lan==="Tg" &&    <span>{language?.caseStatus[3]}</span>}
            {translationState?.lan==="Sm" &&    <span>{language?.caseStatus[4]}</span>}
            {translationState?.lan==="Af" &&    <span>{language?.caseStatus[5]}</span>}
          </Link>
      
        </div>
        <div className="w-[80%] my-[30px] mx-auto flex flex-col gap-[20px] text-white font-semibold max-lg2:text-[12px]">
          
          <Link
            to="/dashboard/settings"
            className="w-[100%] flex items-center gap-[20px]"
          >
            <CgProfile />
      
            {translationState?.lan==="En" &&    <span>{language?.profile[0]}</span>}
            {translationState?.lan==="Am" &&    <span>{language?.profile[1]}</span>}
            {translationState?.lan==="Or" &&    <span>{language?.profile[2]}</span>}
            {translationState?.lan==="Tg" &&    <span>{language?.profile[3]}</span>}
            {translationState?.lan==="Sm" &&    <span>{language?.profile[4]}</span>}
            {translationState?.lan==="Af" &&    <span>{language?.profile[5]}</span>}
          </Link>
          {/* <Link
            to="/dashboard/help"
            className="w-[100%] flex items-center gap-[20px]"
          >
         <IoMdHelpCircle />

            <span>Help</span>
          </Link> */}
          <button
            onClick={handleLogout}
            className="w-[100%] mx-auto flex items-center gap-[20px]"
          >
            <FiLogOut />
         
            {translationState?.lan==="En" &&    <span>{language?.logout[0]}</span>}
            {translationState?.lan==="Am" &&    <span>{language?.logout[1]}</span>}
            {translationState?.lan==="Or" &&    <span>{language?.logout[2]}</span>}
            {translationState?.lan==="Tg" &&    <span>{language?.logout[3]}</span>}
            {translationState?.lan==="Sm" &&    <span>{language?.logout[4]}</span>}
            {translationState?.lan==="Af" &&    <span>{language?.logout[5]}</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
