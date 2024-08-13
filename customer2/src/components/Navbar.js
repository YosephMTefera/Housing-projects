import React from "react";
import { translationAction } from "../REDUX/slices/translationSlice";
import {useDispatch, useSelector} from 'react-redux';
import { language } from "../utils/part-1lan";



function Navbar() {
  const dispatch = useDispatch()
  const translationState = useSelector((state)=>state.translation);

  return (
    <div className="fixed top-0 left-0 right-0 h-[90px] bg-white z-[1000] flex items-center shadow-md max-lg2:h-[70px]">
      <div className="w-[90%]  mx-auto flex justify-between items-center">
        <div className="flex items-center gap-[10px]">
          
          <div className="flex items-center gap-[10px] border border-gray-300 rounded-full">
          <img
         
         src={require("../CAS/logo2 (1).png")}
         alt=""
         className="max-lg2:w-[50px] max-lg2:h-[50px]"
       />
          </div>
        </div>
        <div className="flex  items-center gap-[30px] px-2 text-[14px] text-[#0C73B8] font-bold max-md2:hidden">
          <div className="flex flex-col items-center font-semibold uppercase max-sm1:hidden">
            {translationState?.lan==="En" &&  <span className="uppercase text-[#0C73B8] max-lg2:text-[12px]">
            {language?.companyName[0]}
            </span>}
            {translationState?.lan==="Am" &&  <span className="uppercase text-[20px] text-[#0C73B8] max-lg2:text-[12px]">
            {language?.companyName[1]}
            </span>}
            {translationState?.lan==="Or" &&  <span className="uppercase  text-[#0C73B8] max-lg2:text-[12px]">
            {language?.companyName[2]}
            </span>}
            {translationState?.lan==="Tg" &&  <span className="uppercase text-[20px] text-[#0C73B8] max-lg2:text-[12px]">
            {language?.companyName[3]}
            </span>}
            {translationState?.lan==="Sm" &&  <span className="uppercase  text-[#0C73B8] max-lg2:text-[12px]">
            {language?.companyName[4]}
            </span>}
            {translationState?.lan==="Af" &&  <span className="uppercase  text-[#0C73B8] max-lg2:text-[12px]">
            {language?.companyName[5]}
            </span>}

            {translationState?.lan==="En" &&    <span className="text-[#FBB042] max-lg2:text-[10px]">{language?.customer[0]}</span>}
            {translationState?.lan==="Am" &&    <span className="text-[#FBB042] max-lg2:text-[10px]">{language?.customer[1]}</span>}
            {translationState?.lan==="Or" &&    <span className="text-[#FBB042] max-lg2:text-[10px]">{language?.customer[2]}</span>}
            {translationState?.lan==="Tg" &&    <span className="text-[#FBB042] max-lg2:text-[10px]">{language?.customer[3]}</span>}
            {translationState?.lan==="Sm" &&    <span className="text-[#FBB042] max-lg2:text-[10px]">{language?.customer[4]}</span>}
            {translationState?.lan==="Af" &&    <span className="text-[#FBB042] max-lg2:text-[10px]">{language?.customer[5]}</span>}
         
          </div>
        </div>
        <div className="flex items-center gap-[10px]">
          <select value={translationState?.lan} onChange={(e)=>dispatch(translationAction.setLan(e.target.value))} className="py-3  border border-gray-300 rounded-[5px] text-[14px] text-[#0C73B8] bg-transparent outline-none max-lg2:text-[10px] max-lg2:py-2">
            <option value={"En"}>English</option>
            <option value={"Am"}>አማርኛ</option>
            {/* <option value={"Or"}>Afaan Oromoo</option>
            <option value={"Tg"}>ትግርኛ</option>
            <option value={"Sm"}>Somali</option>
            <option value={"Af"}>Afar</option> */}
            </select>
        
           <img
              className="w-[80px] h-[80px] rounded-full border object-cover max-lg2:w-[50px] max-lg2:h-[50px]"
              src={require("../CAS/housingLogo.png")}
              alt=""
            />
        </div>
      </div>
      

    </div>
  );
}

export default Navbar;
