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
import Navbar from '../Navbar';
function ReadyToPrint() {
  const {id} = useParams();
  const navigate= useNavigate();
  const translationState = useSelector((state)=>state?.translation);
    const [printableCase,setPrintableCase] = useState(null);
    const [rateLimitTimer, setRateLimitTimer] = useState(null);
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
          if (error?.response?.status === 500) {
            setServerError(true);
          }
          if(error?.response?.status === 429){
          
              setRateLimitTimer(180);
            
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

    useEffect(() => {
      if (rateLimitTimer) {
        const timer = setInterval(() => {
          setRateLimitTimer((prev) => (prev > 1 ? prev - 1 : null));
        }, 1000);
        return () => clearInterval(timer);
      }
    }, [rateLimitTimer]);
  
    if (rateLimitTimer)
      return (
        <div className="w-[80%] mx-auto my-[30px] min-h-[300px] rounded-[10px] bg-white flex justify-center items-center">
             {translationState?.lan === "En" && (
                  <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
                    Please wait 3 minutes before retrying.
                  </p>
                )}
                {translationState?.lan === "Am" && (
                  <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
                    እንደገና ከመሞከሮዎ በፊት 3 ደቂቃ ይጠብቁ።
                  </p>
                )}
                {translationState?.lan === "Or" && (
                  <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
                    Maaloo irra deebi'anii yaaluun dura daqiiqaa 3 eegaa
                  </p>
                )}
                {translationState?.lan === "Tg" && (
                  <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
                    በጃኹም ቅድሚ ዳግማይ ምፍታንኩም 3 ደቓይቕ ተጸበዩ።
                  </p>
                )}
                {translationState?.lan === "Sm" && (
                  <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
                    Fadlan sug 3 daqiiqo ka hor inta aanad isku dayin
                  </p>
                )}
                {translationState?.lan === "Af" && (
                  <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
                    Please wait 3 minutes before retrying.
                  </p>
                )}
        </div>
      );
    
    if(serverError) return <ServerError />
  return (
    <div className='w-[80%] my-[150px] mx-auto rounded-[10px] max-lg2:my-[100px] max-sm1:w-[90%]'>
       <Navbar />
        <ToastContainer theme='light'/>
        {loading ? <Loading addtionalStyle={"flex justify-center items-center my-[30px]"}/> :   <div className='w-[90%] mx-auto flex flex-col'>
        <div className="flex my-[20px] items-center gap-[5px] font-bold text-[#0C73B8]">
              <IoChevronBack
                onClick={() => navigate(-1)}
                className="text-[30px] cursor-pointer"
              />
                         {translationState?.lan === "En" && language?.print[0]}
                    {translationState?.lan === "Am" && language?.print[1]}
                    {translationState?.lan === "Or" && language?.print[2]}
                    {translationState?.lan === "Tg" && language?.print[3]}
                    {translationState?.lan === "Sm" && language?.print[4]}
                    {translationState?.lan === "Af" && language?.print[5]}
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