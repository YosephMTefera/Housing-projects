import React, { useEffect, useState } from 'react'
import apiRequest from '../../utils/request';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from '../Loading';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError from '../ServerError';
import { IoChevronBack } from 'react-icons/io5';
import { language } from '../../utils/part-1lan';

function SchedulePrint() {
    const navigate= useNavigate();
    const token = sessionStorage.getItem('tID');
    const location = useLocation();
    const {currentDate} = location.state || {};
    const translationState = useSelector((state)=>state?.translation);
    const [printablePath,setPrintablePath] = useState(null);
    const [dateError,setDateError] = useState(false);
    const [loading,setLoading] = useState(false);
    const [serverError,setServerError] = useState(false);


    useEffect(()=>{
        try {
            if(location.state && currentDate && currentDate !==""){
                setLoading(true);
                apiRequest.get(`/customer_case_api/print_case_schedule?date=${currentDate}`,{headers:{
                    get_extfourth_api:process.env.REACT_APP_GET_EXTFOURTH_API,
                 Authorization:`Bearer ${token}`
         
               }}).then((res)=>{
                 setLoading(false);
                 setPrintablePath(res.data);
         
               }).catch((error) => {
                setLoading(false)
                 if (error?.response?.status === 500) {
                   setServerError(true);
                 }
                 translationState?.lan === "En"
                 ? toast.error(error?.response?.data?.Message_en)
                 : toast.error(error?.response?.data?.Message_am);
               });

            }
            else{
                setDateError(true)
            }
        } catch (error) {
            setLoading(false)
          setServerError(true);
          
        }
      },[location.state,currentDate,token,translationState?.lan])

      

      if(dateError) return <div className='w-[90%] mx-auto my-[20px] bg-white flex justify-center items-center'>
        <span className='text-[14px] my-[20px] text-[#0C73B8] font-bold'>
        {translationState?.lan ==="En" && language?.invalidDate[0]}
        {translationState?.lan ==="Am" && language?.invalidDate[1]}
        </span>
      </div>
      
      if(serverError) return <ServerError />
  return (
    <div className='w-[80%] my-[30px] mx-auto rounded-[10px] bg-white'>
    <ToastContainer theme='light'/>
    {loading ? <Loading addtionalStyle={"flex justify-center items-center my-[30px]"}/> :   <div className='w-[90%] mx-auto flex flex-col'>
    <div className="flex my-[20px] items-center gap-[5px] font-bold text-[#0C73B8]">
          <IoChevronBack
            onClick={() => navigate(-1)}
            className="text-[30px] cursor-pointer"
          />
 
          {<span>  {translationState?.lan ==="En" && `${language?.appointmentDate[0]} ${language?.print[0]}`}
          {translationState?.lan ==="Am" && ` ${language?.appointmentDate[1]} ${language?.print[1]}`}</span>}
        

        
             
        </div>
        <div className='w-[100%] h-[1px]  bg-gray-300'/>
        <div className='my-[20px]'>
            
            <div className="w-[100%] my-4 overflow-y-scroll">
              {printablePath && (
                <embed
                src={`${process.env.REACT_APP_BACKEND_IMAGES}/${printablePath}`}
                  type="application/pdf"
                  width="100%"
                  height="800px"
                />
              )}
            </div>
        </div>
    </div>}
 
</div>
  )
}

export default SchedulePrint