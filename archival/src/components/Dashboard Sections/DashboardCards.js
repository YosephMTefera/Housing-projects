import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { language } from '../../utils/part-1lan';
import {ToastContainer, toast} from 'react-toastify';
import { HiDocument, HiMiniClipboardDocumentCheck, HiOutlineDocumentArrowDown, HiOutlineDocumentArrowUp } from 'react-icons/hi2';
import apiRequest from '../../utils/request';
import ServerError from '../ServerError';
import {SiReadthedocs} from 'react-icons/si'

function DashboardCards() {
    

    const token = sessionStorage.getItem('tID');
    const translationState = useSelector((state)=>state.translation);
    const [totalLetters,setTotalLetters] = useState({});
    const [serverError,setServerError] = useState(false)
  
    useEffect(()=>{
      try {
        apiRequest.get('/letter_analysis/total_letter_analysis',{
          headers:{
          get_incletters_api:process.env.REACT_APP_GET_INCLETTERS_API,
          Authorization:`Bearer ${token}`
        }}).then((res)=>{
          setTotalLetters(res.data);
        }).catch((error)=>{
  
          if(error?.response?.status ===500){
            setServerError(true);        }
          translationState?.lan === "En"
          ? toast.error(error?.response?.data?.Message_en)
          : toast.error(error?.response?.data?.Message_am);
  
        })
        
      } catch (error) {
        setServerError(true);
  
        
      }
    },[token,translationState])
  
    if(serverError) return <ServerError />
  return (
    <div className="w-[100%] min-h-[150px] flex justify-between items-center gap-[10px]">
    <ToastContainer theme='light'/>
    
    {/* cases */}
    <div  className="w-[25%] h-[150px] p-2 bg-white rounded-[10px] border border-gray-300  max-lg2:h-[120px]">
      <div className="w-[80%] my-[20px] mx-auto flex justify-between max-lg2:w-[90%]">
        <div className="flex flex-col gap-[10px]">
          <span className="text-[12px] text-gray-500 max-lg2:text-[10px]">
          {translationState?.lan ==="En" && language?.verifiedCases[0]}
          {translationState?.lan ==="Am" && language?.verifiedCases[1]}
          </span>
          <span className="font-bold text-[40px] text-[#0C73B8] max-lg2:text-[30px]">{totalLetters?.verfiedcases}</span>
        </div>
        {/* icon */}
        <div className="w-[80px] h-[80px]  flex justify-center  rounded-full">
          <HiMiniClipboardDocumentCheck  className="text-[#0C73B8] text-[40px] max-lg2:text-[30px]" />
        </div>
      </div>
    </div>
    
     <div  className="w-[25%] h-[150px] p-2 bg-white rounded-[10px] border border-gray-300  max-lg2:h-[120px]">
      <div className="w-[80%] my-[20px] mx-auto flex justify-between max-lg2:w-[90%]">
        <div className="flex flex-col gap-[10px]">
          <span className="text-[12px] text-gray-500 max-lg2:text-[10px]">
          {translationState?.lan ==="En" && language?.incomingLetters[0]}
          {translationState?.lan ==="Am" && language?.incomingLetters[1]}
          </span>
          <span className="font-bold text-[40px] text-[#0C73B8] max-lg2:text-[30px]">{totalLetters?.incomingLetters ? totalLetters?.incomingLetters:"-"}</span>
        </div>
        {/* icon */}
        <div className="w-[80px] h-[80px]  flex justify-center  rounded-full">
        <HiOutlineDocumentArrowDown   className="text-[#0C73B8] text-[40px] max-lg2:text-[30px]" />

        </div>
      </div>
    </div>
    <div  className="w-[25%] h-[150px] p-2 bg-white rounded-[10px] border border-gray-300  max-lg2:h-[120px]">
      <div className="w-[80%] my-[20px] mx-auto flex justify-between max-lg2:w-[90%]">
        <div className="flex flex-col gap-[10px]">
          <span className="text-[12px] text-gray-500 max-lg2:text-[10px]">
          {translationState?.lan ==="En" && language?.outgoingLetters[0]}
          {translationState?.lan ==="Am" && language?.outgoingLetters[1]}
          </span>
          <span className="font-bold text-[40px] text-[#0C73B8] max-lg2:text-[30px]">{totalLetters?.outVerifiedOutgoingLetters ? totalLetters?.outVerifiedOutgoingLetters:"-"}</span>
        </div>
        {/* icon */}
        <div className="w-[80px] h-[80px] flex justify-center  rounded-full">
        <HiOutlineDocumentArrowUp   className="text-[#0C73B8] text-[40px] max-lg2:text-[30px]" />
        </div>
      </div>
    </div>

    <div  className="w-[25%] h-[150px] p-2 bg-white rounded-[10px] border border-gray-300 max-lg2:h-[120px]">
      <div className="w-[80%] my-[20px] mx-auto flex justify-between max-lg2:w-[90%]">
        <div className="flex flex-col gap-[10px]">
          <span className="text-[12px] text-gray-500 max-lg2:text-[10px]">
          {translationState?.lan ==="En" && language?.internalLetters[0]}
          {translationState?.lan ==="Am" && language?.internalLetters[1]}
          </span>
          <span className="font-bold text-[40px] text-[#0C73B8] max-lg2:text-[30px]">{totalLetters?.outVerifiedInternalLetters ? totalLetters?.outVerifiedInternalLetters:"-"}</span>
        </div>
     
        <div className="w-[80px] h-[80px]  flex justify-center  rounded-full">
          <HiDocument   className="text-[#0C73B8] text-[40px] max-lg2:text-[30px]" />
        </div>
      </div>
    </div>
    <div  className="w-[25%] h-[150px] p-2 bg-white rounded-[10px] border border-gray-300 max-lg2:h-[120px]">
      <div className="w-[80%] my-[20px] mx-auto flex justify-between max-lg2:w-[90%]">
        <div className="flex flex-col gap-[10px]">
          <span className="text-[12px] text-gray-500 max-lg2:text-[10px]">
          {translationState?.lan ==="En" && language?.cutoffLetters[0]}
          {translationState?.lan ==="Am" && language?.cutoffLetters[1]}
          </span>
          <span className="font-bold text-[40px] text-[#0C73B8] max-lg2:text-[30px]">{totalLetters?.presystemLetters ? totalLetters?.presystemLetters:"-"}</span>
        </div>
     
        <div className="w-[80px] h-[80px]  flex justify-center  rounded-full">
        <SiReadthedocs  className="text-[#0C73B8] text-[40px] max-lg2:text-[30px]" />
        </div>
      </div>
    </div>
   
   
  </div>
  )
}

export default DashboardCards