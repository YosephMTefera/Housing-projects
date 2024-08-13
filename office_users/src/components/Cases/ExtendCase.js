import React, { useState } from 'react'
import {FaTimes} from 'react-icons/fa'
import Loading from '../Loading';
import apiRequest from '../../utils/request';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';
import ServerError from '../ServerError';
import { language } from '../../utils/part-1lan';

const today = new Date().toISOString().split("T")[0];

function ExtendCase({scheduleInfo,setExtendModal}) {
    const token = sessionStorage.getItem('tID');
    const {id,type} = useParams();
    const translationState = useSelector((state)=>state.translation);
    const [date,setDate] = useState("");
    const [loading,setLoading] = useState(false);
    const [serverError,setServerError] = useState(false);


    const extendCase = async ()=>{
        try {
            setLoading(true)
            await apiRequest.put(`/customer_case_api/ext_schedule_case/${id}/${scheduleInfo?.schedule_id}`,{scheduled_date:date},{headers:{
                get_extcaschedule_api:process.env.REACT_APP_GET_EXTCASCHEDULE_API,
                Authorization:`Bearer ${token}`

            }}).then((res)=>{
                setLoading(false)
                translationState?.lan === "En"
                ? toast.success(res?.data?.Message_en)
                : toast.success(res?.data?.Message_am);
                setTimeout(()=>{
                  window.location.href=`/cases/${id}/${type}`
                },6000)
            }).catch((error)=>{
                setLoading(false);
                if(error.response.status ===500){
                    setServerError(true)
                }
                translationState?.lan === "En"
                ? toast.error(error?.response?.data?.Message_en)
                : toast.error(error?.response?.data?.Message_am);
            })
            
        } catch (error) {
            setLoading(false)
            setServerError(true);
        }
    }

    if(serverError) return <ServerError />
  return (
    <div className='w-[70%] mx-auto fixed left-[25%] top-[230px] z-[1000]'>
    <ToastContainer theme='light'/>
     <div className='bg-white border shadow-md rounded-[10px] w-[80%] mx-auto min-h-[400px]'>
         <div className='w-[90%]  my-[30px] py-3 mx-auto text-[#0C73B8] border-b border-gray-300 flex justify-between items-center'>
                 <span className=' font-bold'>Give Extention to case</span>
             <FaTimes onClick={()=>setExtendModal(false)}   className='font-bold cursor-pointer'/>

         </div>
         <div className='w-[90%] mx-auto my-[20px] flex flex-col gap-[20px] text-[#0C73B8]'>
         <div className="w-[50%] mt-[20px]">
               <label
                 htmlFor="last-name"
                 className="block text-sm font-bold p-2 leading-6 "
               >
                  {translationState?.lan ==="En" && language?.extendDate[0]}
                  {translationState?.lan ==="Am" && language?.extendDate[1]}
               </label>
               <div className="mt-2">
                 <input
                 type='date'
                 min={today}
                 onChange={(e)=>setDate(e.target.value)}
                 
                   className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 resize-none"
                 />
               </div>
             </div>
            

         </div>
         {loading ? <Loading addtionalStyle={"flex justify-end items-center my-[20px]"}/>:<div className="w-[90%] mx-auto mt-[30px] py-3 flex justify-end items-center gap-[20px]">
    
       <button
         onClick={extendCase}
         className={
           "bg-[#FBB042] border border-[#FBB042] text-white px-3 py-2 rounded text-[14px] hover:bg-transparent hover:text-[#FBB042] transition duration-500"
         }
       >
        {translationState?.lan ==="En" && language?.extend[0]}
        {translationState?.lan ==="Am" && language?.extend[1]}
       </button>
     </div>}
     </div>

 </div>
  )
}

export default ExtendCase