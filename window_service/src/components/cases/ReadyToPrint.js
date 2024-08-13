import React, { useEffect, useState } from 'react'
import apiRequest from '../../utils/request';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from '../Loading';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError from '../ServerError';
import { IoChevronBack } from 'react-icons/io5';
import { language } from '../../utils/part-1lan';
function ReadyToPrint() {
  const {id} = useParams();
  const navigate= useNavigate();
  const translationState = useSelector((state)=>state?.translation);
    const [printableCase,setPrintableCase] = useState(null);
    const [loading,setLoading] = useState(false);
    const [serverError,setServerError] = useState(false);

    useEffect(()=>{
      try {

  
        setLoading(true);
         apiRequest.get(`/customer_case_api/print_case/${id}`,{headers:{
          get_prcase_api:process.env.REACT_APP_GET_PRCASE_API,
  
        }}).then((res)=>{
          setLoading(false);
          setPrintableCase(res.data);
  
        }).catch((error) => {
          setLoading(false)
          if (error?.response?.status === 500) {
            setServerError(true);
          }
          translationState?.lan === "En"
          ? toast.error(error?.response?.data?.Message_en)
          : toast.error(error?.response?.data?.Message_am);
        });
        
      } catch (error) {
        setLoading(false)
        setServerError(true)
        
      }
    },[id,translationState?.lan])
    
    if(serverError) return <ServerError />
  return (
    <div className='w-[80%] my-[30px] mx-auto rounded-[10px]'>
        <ToastContainer theme='light'/>
        {loading ? <Loading addtionalStyle={"flex justify-center items-center my-[30px]"}/> :   <div className='w-[90%] mx-auto flex flex-col'>
        <div className="flex my-[20px] items-center gap-[5px] font-bold text-[#0C73B8]">
              <IoChevronBack
                onClick={() => navigate(-1)}
                className="text-[30px] cursor-pointer"
              />
              <span>
              {translationState?.lan==="En" && language?.print[0]} 
              {translationState?.lan==="Am" && language?.print[1]}
              </span>
            </div>
            <div className='w-[100%] h-[1px]  bg-gray-300'/>
            <div className='my-[20px]'>
                
                <div className="w-[100%] my-4 overflow-y-scroll">
                  {printableCase && (
                    <embed
                    src={`${process.env.REACT_APP_BACKEND_IMAGES}/${printableCase}`}
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

export default ReadyToPrint