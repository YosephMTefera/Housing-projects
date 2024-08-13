import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingSidebar from "../LandingSidebar";
import {HiMenuAlt2} from 'react-icons/hi'
import { useSelector } from "react-redux";
import { language } from "../../utils/part-1lan";


function BottomNav() {
  const navigate = useNavigate();
  const translationState = useSelector((state)=>state.translation);
  const [sideBarOpened,setSidebarOpened] = useState(false);

 
  
  return (
    <div className="mt-[90px] fixed right-0 left-0 min-h-[80px] bg-[#0C73B8] flex items-center max-lg2:mt-[70px]">

      <div className="w-[90%] mx-auto flex justify-between items-center gap-[10px] ">
        <div className="text-[30px] hidden text-white cursor-pointer max-sm1:block">
        <HiMenuAlt2 onClick={()=>setSidebarOpened(!sideBarOpened)}/>
        </div>
        <div className="flex gap-[20px] items-center text-white max-lg2:text-[12px] whitespace-nowrap max-sm1:hidden">
          {translationState?.lan==="En" &&   <a href="/checkstatus" className="hover:underline">
            {language?.checkStatus[0]}
          </a>}
          {translationState?.lan==="Am" &&   <a href="/checkstatus" className="hover:underline">
            የጉዳዮን ሁኔታ ይከታተሉ
          </a>}
        
          {translationState?.lan==="Or" &&   <a href="/checkstatus" className="hover:underline">
            {language?.checkStatus[2]}
          </a>}
        
          {translationState?.lan==="Tg" &&   <a href="/checkstatus" className="hover:underline">
            {language?.checkStatus[3]}
          </a>}
          {translationState?.lan==="Sm" &&   <a href="/checkstatus" className="hover:underline">
            {language?.checkStatus[4]}
          </a>}
          {translationState?.lan==="Af" &&   <a href="/checkstatus" className="hover:underline">
            {language?.checkStatus[5]}
          </a>}
        
        

        
          {translationState?.lan==="En" &&   <a href="/makeaccusation" className="hover:underline">
            {language?.makeAccusation[0]}
          </a>}
          {translationState?.lan==="Am" &&   <a href="/makeaccusation" className="hover:underline">
          {language?.makeAccusation[1]}
          </a>}
        
          {translationState?.lan==="Or" &&   <a href="/makeaccusation" className="hover:underline">
            {language?.makeAccusation[2]}
          </a>}
        
          {translationState?.lan==="Tg" &&   <a href="/makeaccusation" className="hover:underline">
            {language?.makeAccusation[3]}
          </a>}
          {translationState?.lan==="Sm" &&   <a href="/makeaccusation" className="hover:underline">
            {language?.makeAccusation[4]}
          </a>}
          {translationState?.lan==="Af" &&   <a href="/makeaccusation" className="hover:underline">
            {language?.makeAccusation[5]}
          </a>}


          
        </div>
       
        <div className="flex gap-[10px] text-[#0C73B8] text-[12px] font-bold max-lg2:text-[10px]">
          {translationState?.lan === "En" &&  <button
            className="bg-white py-2 px-4 rounded-[20px]"
            onClick={() => navigate("/login")}
          >
            {language?.login[0]}
          </button>}
          {translationState?.lan === "Am" &&  <button
            className="bg-white py-2 px-4 text-[16px] rounded-[20px] max-lg2:text-[12px]"
            onClick={() => navigate("/login")}
          >
            {language?.login[1]}
          </button>}
          {translationState?.lan === "Or" &&  <button
            className="bg-white py-2 px-4 rounded-[20px]"
            onClick={() => navigate("/login")}
          >
            {language?.login[2]}
          </button>}
          {translationState?.lan === "Tg" &&  <button
            className="bg-white py-2 px-4 rounded-[20px] max-lg2:text-[12px]"
            onClick={() => navigate("/login")}
          >
            {language?.login[3]}
          </button>}
          {translationState?.lan === "Sm" &&  <button
            className="bg-white py-2 px-4 rounded-[20px]"
            onClick={() => navigate("/login")}
          >
            {language?.login[4]}
          </button>}
          {translationState?.lan === "Af" &&  <button
            className="bg-white py-2 px-4 rounded-[20px]"
            onClick={() => navigate("/login")}
          >
            {language?.login[5]}
          </button>}

          {/* register */}
          {translationState?.lan === "En" &&  <button
            className="bg-white py-2 px-4 rounded-[20px]"
            onClick={() => navigate("/register")}
          >
            {language?.register[0]}
          </button>}
          {translationState?.lan === "Am" &&  <button
            className="bg-white py-2 px-4 text-[16px] rounded-[20px] max-lg2:text-[12px]"
            onClick={() => navigate("/register")}
          >
            {language?.register[1]}
          </button>}
          
          {translationState?.lan === "Or" &&  <button
            className="bg-white py-2 px-4 rounded-[20px]"
            onClick={() => navigate("/register")}
          >
            {language?.register[2]}
          </button>}
          {translationState?.lan === "Tg" &&  <button
            className="bg-white py-2 px-4 rounded-[20px] max-lg2:text-[12px]"
            onClick={() => navigate("/register")}
          >
            {language?.register[3]}
          </button>}
          {translationState?.lan === "Sm" &&  <button
            className="bg-white py-2 px-4 rounded-[20px]"
            onClick={() => navigate("/register")}
          >
            {language?.register[4]}
          </button>}
          {translationState?.lan === "Af" &&  <button
            className="bg-white py-2 px-4 rounded-[20px]"
            onClick={() => navigate("/register")}
          >
            {language?.register[5]}
          </button>}
        </div>
      </div>
     {sideBarOpened && <LandingSidebar /> } 
    </div>
  );
}

export default BottomNav;
