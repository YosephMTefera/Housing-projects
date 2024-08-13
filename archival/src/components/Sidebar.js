import React from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import apiRequest from "../utils/request";
import { useSelector } from "react-redux";
import { language } from "../utils/part-1lan";
import {HiMiniDocumentArrowDown} from 'react-icons/hi2'
import {AiOutlineDashboard} from 'react-icons/ai'
import {FaCheckCircle} from 'react-icons/fa'
import { IoArrowBackCircleSharp, IoArrowForwardCircle } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import {SiReadthedocs} from 'react-icons/si'

function Sidebar() {

  const translationState = useSelector((state)=>state.translation);
  const handleLogout = async () => {
    await apiRequest.get("/archival_user_api/logout_archival_user").then(() => {
      sessionStorage.clear();
      window.location.href = "/login";
    });
  };
  return (
    <div className="w-[15%] h-[100%] bg-[#0C73B8] fixed top-0 left-0 overflow-y-auto hide-scroll-bar max-lg1:w-[20%]">
      <div className="w-[80%] mx-auto  mt-[30px]  flex flex-col justify-center items-center gap-[20px]">
        <img
          className="w-[80px] h-[80px] rounded-full object-cover"
          src={require("../CAS/housingLogo.png")}
          alt=""
        />
        <span className="text-white text-center text-[14px] max-lg2:text-[10px]">
          አዲስ አበባ ቤቶች ልማት ኮርፖሬሽን
        </span>
      </div>
      <div className="flex flex-col justify-between h-[80%] max-lg2:text-[12px]">
        <div className="w-[80%] mt-[70px] mx-auto flex flex-col gap-[40px] text-white max-lg2:mt-[40px] max-lg2:gap-[25px]">
        
           <Link to="/" className="w-[100%] flex items-center gap-[10px]">
           <AiOutlineDashboard className="text-[20px]" />
            <span>
            {translationState?.lan==="En" && language?.dashboard[0]} 
            {translationState?.lan==="Am" && language?.dashboard[1]}
            </span>
          </Link>
          <Link to="/cases" className="w-[100%] flex items-center gap-[10px] ">
            <FaCheckCircle  className="text-[20px]" />
            <span>
            {translationState?.lan==="En" && language?.verifyCases[0]} 
            {translationState?.lan==="Am" && language?.verifyCases[1]}
              
              </span>
          </Link>

        

         
          <Link to="/incoming" className="w-[100%] flex items-center gap-[10px]">
          <IoArrowForwardCircle className="text-[20px]" />
            <span>   {translationState?.lan==="En" && language?.incomingLetters[0]} 
            {translationState?.lan==="Am" && language?.incomingLetters[1]}</span>
          </Link>
          <Link to="/outgoing" className="w-[100%] flex items-center gap-[5px]">
          <IoArrowBackCircleSharp  className="text-[20px]"/>
            <span>   {translationState?.lan==="En" && language?.outgoingLetters[0]} 
            {translationState?.lan==="Am" && language?.outgoingLetters[1]}</span>
          </Link>
          <Link to="/internal" className="w-[100%] flex items-center gap-[5px]">
          <HiMiniDocumentArrowDown  className="text-[20px]"/>
            <span>   {translationState?.lan==="En" && language?.internalLetters[0]} 
            {translationState?.lan==="Am" && language?.internalLetters[1]}</span>
          </Link>

          <Link to="/presystem-letters" className="w-[100%] flex items-center gap-[5px]">
          <SiReadthedocs   className="text-[20px]"/>
            <span>   {translationState?.lan==="En" && language?.cutoffLetters[0]} 
            {translationState?.lan==="Am" && language?.cutoffLetters[1]}</span>
          </Link>
          <Link
            to="/letters/archive"
            className="w-[100%] flex items-center gap-[5px]"
          >
            <BiSolidCategory className="text-[20px]"/>
            <span>
            {translationState?.lan==="En" && language?.archivalCategory[0]} 
            {translationState?.lan==="Am" && language?.archivalCategory[1]}
            </span>
            {/* <span>Archival Category</span> */}
          </Link>
        </div>
        <div className="w-[80%] my-[50px] mx-auto flex flex-col gap-[20px] text-white">
          <Link
            to="/myprofile"
            className="w-[100%] flex items-center gap-[5px]"
          >
            <CgProfile className="text-[20px]" />
            <span>
            {translationState?.lan==="En" && language?.profile[0]} 
            {translationState?.lan==="Am" && language?.profile[1]}

            </span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-[100%] mx-auto flex items-center gap-[5px]"
          >
            <FiLogOut className="text-[20px]" />
            <span>
            {translationState?.lan==="En" && language?.logout[0]} 
            {translationState?.lan==="Am" && language?.logout[1]}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
