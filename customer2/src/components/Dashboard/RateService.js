import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from '../Loading';
import apiRequest from '../../utils/request';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ServerError from '../ServerError';
import { language } from '../../utils/part-1lan';

function RateService(props) {
    
    let limit = props.limit || 5;
    const {id} = useParams();
    const token = sessionStorage.getItem('tID');
    const translationState = useSelector((state)=>state.translation);    
    const [initialValue, setInitialValue] =useState(props.currentValue || 1);
    const [requestLimit,setRequestLimit] = useState(false)
    const [loading,setLoading] = useState(false);
    const [serverError,setServerError] = useState(false);

    const handleClick = event => {
      
        setInitialValue(+event.target.getAttribute("data"));
        if (props.callback) {
        props.callback(+event.target.getAttribute("data"));
        }
      };

      const handleDoubleClick = event => {
        if (+event.target.getAttribute("data") === 1) {
          setInitialValue(0);
          if (props.callback) {
            props.callback(+event.target.getAttribute("data"));
          }
        }
      };

      const rateDivision = async () =>{
        try {
            setLoading(true);
            await apiRequest.post('/div_rate/create_custrate',{rateNum:initialValue,rateCase:id},{headers:{
                get_cratingrate_api:process.env.REACT_APP_GET_CRATINGRATE_API,
                Authorization:`Bearer ${token}`

            }}).then((res)=>{
                setLoading(false)
                setRequestLimit(false)
                props.setRateModal(false);
                window.location.href = `/dashboard/case/${id}`
                translationState?.lan==="En" && toast.success(res.data?.Message_en)
                translationState?.lan==="Am" && toast.success(res?.data?.Message_am)

            }).catch((error)=>{
                setLoading(false);
                if(error?.repsonse?.status ===500){
                  setRequestLimit(false)
                    setServerError(true)
                }
                if(error?.response?.status === 429){
                  setRequestLimit(true)
                 
                }

                translationState?.lan==="En" && toast.error(error?.response?.data?.Message_en)
                translationState?.lan==="Am" && toast.error(error?.response?.data?.Message_am)
                

            })
            
        } catch (error) {
          setServerError(true)
            
        }
      }

      if(requestLimit) return <div className="w-[80%] mx-auto my-[30px] min-h-[300px] rounded-[10px] bg-white flex justify-center items-center">
      <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">Please wait 3 minutes before retrying.</p>
    </div>

    if(serverError) return <ServerError />
  return (
    <div className='w-[70%] mx-auto fixed left-[25%] top-[230px] max-lg2:top-[150px]  max-lg:left-[27%] max-md2:w-[90%] max-md2:left-[5%] max-sm1:w-[95%] max-sm1:left-[2.5%]'>
    <ToastContainer theme='light' className={"z-[1000]"}/>
     <div className='bg-white border shadow-md rounded-[10px] w-[80%] mx-auto min-h-[400px] max-lg:w-[100%]'>
         <div className='w-[90%]  my-[30px] py-3 mx-auto text-[#0C73B8] border-b border-gray-300 flex justify-between items-center'>
                 <span className=' font-bold'>
                 {translationState?.lan === "En" && language?.rateService[0]}
                    {translationState?.lan === "Am" && language?.rateService[1]}
                    {translationState?.lan === "Or" && language?.rateService[2]}
                    {translationState?.lan === "Tg" && language?.rateService[3]}
                    {translationState?.lan === "Sm" && language?.rateService[4]}
                    {translationState?.lan === "Af" && language?.rateService[5]}
                 </span>
             <FaTimes 
             onClick={()=>props.setRateModal(false)}   
             className='font-bold cursor-pointer'/>

         </div>
         <div className='w-[90%] mx-auto my-[20px] flex flex-col gap-[20px] text-[#0C73B8]'>
         <div className="w-[100%] flex justify-center items-center mt-[20px]">
         <div onClick={handleClick} onDoubleClick={handleDoubleClick}>
      {[...new Array(limit).keys()].map(param => (
        <span
          key={param}
          data={param + 1}
          className={param < initialValue ? "star rated max-md1:text-[14px] max-sm1:text-[10px]" : "star max-md1:text-[14px] max-sm1:text-[10px]"}
        />
      ))}
    </div>

            
             </div>
            

         </div>
         {loading ? <Loading addtionalStyle={"flex justify-end items-center my-[20px]"}/>:<div className="w-[90%] mx-auto mt-[30px] py-3 flex justify-end items-center gap-[20px]">
    
       <button
         onClick={rateDivision}
         className={
           "bg-[#FBB042] border border-[#FBB042] text-white px-3 py-2 rounded text-[14px] hover:bg-transparent hover:text-[#FBB042] transition duration-500"
         }
       >
         Rate
       </button>
     </div>}
     </div>

 </div>
  )
}

export default RateService