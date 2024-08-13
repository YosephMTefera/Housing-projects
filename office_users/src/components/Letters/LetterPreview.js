import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ServerError from "../ServerError";
import Loading from "../Loading";
import { IoChevronBack } from "react-icons/io5";
import apiRequest from "../../utils/request";
import { language } from "../../utils/part-1lan";
function LetterPreview() {

    const { type,id,path_type } = useParams();
    const navigate = useNavigate();
    const token = sessionStorage.getItem("tID");
    const translationState = useSelector((state) => state?.translation);
    const [outgoingLetter,setOutgoingLetter] = useState({});
    const [internalLetter,setInternalLetter] = useState({});
    const [internalMemo,setInternalMemo] = useState({});
    const [printablePath, setPrintablePath] = useState(null);
    const [outputLoading,setoutputLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(false);

    const getOutgoingData =async ()=>{
      try {
        setLoading(true);
        apiRequest.get(`/outgoing_ltr_api/get_output_ltrs/${id}`,{
          headers:{
            get_outputltr_api:process.env.REACT_APP_GET_OUTPUTLTR_API,
            Authorization:`bearer ${token}`
          }
  
        }).then((res)=>{
          setLoading(false);
          setOutgoingLetter(res.data);
       
        }).catch((error)=>{
          setLoading(false)
          if(error?.response?.status ===500){
            setServerError(true)
          }
        })
        
      } catch (error) {
        setLoading(false)
        setServerError(true);
        
      }
    }
    const getInternalData =async ()=>{
      try {
        setLoading(true);
        apiRequest.get(`/internal_ltr_api/get_internal_ltrs/${id}`,{
          headers:{
            get_intltr_api:process.env.REACT_APP_GET_INTLTR_API,
            Authorization:`bearer ${token}`
          }
  
        }).then((res)=>{
          setLoading(false);
          setInternalLetter(res.data);
       
        }).catch((error)=>{
          setLoading(false)
          if(error?.response?.status ===500){
            setServerError(true)
          }
        })
        
      } catch (error) {
        setLoading(false)
        setServerError(true);
        
      }
    }

    const getInternalMemoData =async ()=>{
      try {
        setLoading(true);
        apiRequest.get(`/internal_memo_api/get_internal_memos/${id}`,{
          headers:{
            get_intmemo_api:process.env.REACT_APP_GET_INTMEMO_API,
            Authorization:`bearer ${token}`
          }
  
        }).then((res)=>{
          setLoading(false);
          setInternalMemo(res.data);
       
        }).catch((error)=>{
          setLoading(false)
          if(error?.response?.status ===500){
            setServerError(true)
          }
        })
        
      } catch (error) {
        setLoading(false)
        setServerError(true);
        
      }
    }

    useEffect(()=>{
      getOutgoingData()
      getInternalData()
      getInternalMemoData();
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id,token])

    
  useEffect(() => {
    try {
      setLoading(true);

      if(type ==="outgoing"){
        apiRequest
        .get(`/outgoing_ltr_api/prt_output_ltr/${id}`, {
          headers: {
            get_prvoutputltr_api: process.env.REACT_APP_GET_PRVOUTPUTLTR_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setPrintablePath(res.data);
        })
        .catch((error) => {
          setLoading(false)
          if (error?.response?.status === 500) {
            setServerError(true);
          }
          translationState?.lan === "En"
            ? toast.error(error?.response?.data?.Message_en)
            : toast.error(error?.response?.data?.Message_am);
        });
      }
      if(type ==="internal"){
        apiRequest
        .get(`/internal_ltr_api/prt_internal_ltr/${id}`, {
          headers: {
            get_prvintltr_api: process.env.REACT_APP_GET_PRVINTLTR_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setPrintablePath(res.data);
        })
        .catch((error) => {
          setLoading(false)
          if (error?.response?.status === 500) {
            setServerError(true);
          }
          translationState?.lan === "En"
            ? toast.error(error?.response?.data?.Message_en)
            : toast.error(error?.response?.data?.Message_am);
        });
      }

      if(type ==="memo"){
        apiRequest
        .get(`/internal_memo_api/prt_internal_memo/${id}`, {
          headers: {
            get_prvintmemo_api: process.env.REACT_APP_GET_PRVINTMEMO_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setPrintablePath(res.data);
        })
        .catch((error) => {
          if (error?.response?.status === 500) {
            setServerError(true);
          }
          translationState?.lan === "En"
            ? toast.error(error?.response?.data?.Message_en)
            : toast.error(error?.response?.data?.Message_am);
        });
      }
     
    } catch (error) {
        setServerError(true)
    }
  }, [id, token, translationState?.lan,type]);

  const handleOutputResponse = async ()=>{
    try {
      if(type ==="outgoing"){
        setoutputLoading(true)
        await apiRequest.put(`/outgoing_ltr_api/resp_output_ltr/${id}`,{},{headers:{
          get_outputltrsign_api:process.env.REACT_APP_GET_OUTPUTLTRSIGN_API,
          Authorization:`Bearer ${token}`
  
        }}).then((res)=>{
          setoutputLoading(false);
       
  
         window.location.href = `/letters/${type}/${path_type}/${id}`
          
      
        }).catch((error)=>{
          setoutputLoading(false)
          if(error?.response?.status === 500){
            setServerError(true)
          }
  
          translationState?.lan ==="En" &&  toast.error(error?.response?.data?.Message_en)
          translationState?.lan ==="Am" &&  toast.error(error?.response?.data?.Message_am)
        })

      }
      if(type ==="internal"){
        setoutputLoading(true)
        await apiRequest.put(`/internal_ltr_api/resp_internal_ltr/${id}`,{},{headers:{
          get_appintltr_api:process.env.REACT_APP_GET_APPINTLTR_API,
          Authorization:`Bearer ${token}`
  
        }}).then(()=>{
          setoutputLoading(false);
       
  
         window.location.href = `/letters/${type}/${path_type}/${id}`
          
      
        }).catch((error)=>{
          setoutputLoading(false)
          if(error?.response?.status === 500){
            setServerError(true)
          }
  
          translationState?.lan ==="En" &&  toast.error(error?.response?.data?.Message_en)
          translationState?.lan ==="Am" &&  toast.error(error?.response?.data?.Message_am)
        })

      }

      if(type ==="memo"){
        setoutputLoading(true)
        await apiRequest.put(`/internal_memo_api/verfy_internal_memo/${id}`,{},{headers:{
          get_prvintmemo_api:process.env.REACT_APP_GET_PRVINTMEMO_API,
          Authorization:`Bearer ${token}`
  
        }}).then((res)=>{
          setoutputLoading(false);
         window.location.href = `/letters/${type}/${path_type}/${id}`
          
      
        }).catch((error)=>{
          setoutputLoading(false)
          if(error?.response?.status === 500){
            setServerError(true)
          }
  
          translationState?.lan ==="En" &&  toast.error(error?.response?.data?.Message_en)
          translationState?.lan ==="Am" &&  toast.error(error?.response?.data?.Message_am)
        })

      }
     

      
    } catch (error) {
        setoutputLoading(false);
      setServerError(true)
      
    }
  }



  if (serverError) return <ServerError />;
  return (
    <div className="w-[80%] my-[30px] mx-auto rounded-[10px] bg-white">
    {loading ? (
      <Loading
        addtionalStyle={"flex justify-center items-center my-[30px]"}
      />
    ) : (
      <div className="w-[90%] mx-auto flex flex-col">
        <div className="flex my-[20px] justify-between items-center  font-bold text-[#0C73B8]">
          <div className="flex items-center gap-[5px]">
            <IoChevronBack
              onClick={() => navigate(-1)}
              className="text-[30px] cursor-pointer"
            />
            <span className="font-bold">
            {translationState?.lan==="En" && language?.preview[0]} 
            {translationState?.lan==="Am" && language?.preview[1]}
            </span>
          </div>
          {outputLoading ? <Loading addtionalStyle={"flex justify-end items-center my-[10px]"} />:<div className="flex items-center gap-[10px]">
           
           
           {(outgoingLetter?.status ==="pending") &&  <button onClick={handleOutputResponse}  className="py-2 px-4 bg-[#0C73B8] font-bold rounded-[20px] text-white text-[12px] max-lg2:text-[10px]">
           {translationState?.lan==="En" && language?.approve[0]} 
           {translationState?.lan==="Am" && language?.approve[1]}
            </button>}
               
           {(internalLetter?.status ==="pending") &&  <button onClick={handleOutputResponse}  className="py-2 px-4 bg-[#0C73B8] font-bold rounded-[20px] text-white text-[12px] max-lg2:text-[10px]">
           {translationState?.lan==="En" && language?.approve[0]} 
           {translationState?.lan==="Am" && language?.approve[1]}
            </button>}
                   
           {(internalMemo?.status ==="pending") &&  <button onClick={handleOutputResponse}  className="py-2 px-4 bg-[#0C73B8] font-bold rounded-[20px] text-white text-[12px] max-lg2:text-[10px]">
           {translationState?.lan==="En" && language?.approve[0]} 
           {translationState?.lan==="Am" && language?.approve[1]}
            </button>}

          </div>}
          
        </div>
        <div className="w-[100%] h-[1px]  bg-gray-300" />
        <div className="my-[20px]">
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
      </div>
    )}
  </div>
  )
}

export default LetterPreview