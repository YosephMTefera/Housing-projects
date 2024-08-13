import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import apiRequest from '../../utils/request';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiChevronLeft } from 'react-icons/bi';
import ServerError from '../ServerError';
import Loading from '../Loading';
import { language } from '../../utils/part-1lan';
import { FaBriefcase } from 'react-icons/fa';
import { MdAssignmentLate, MdWatchLater } from 'react-icons/md';
import { FaPeopleGroup } from 'react-icons/fa6';


function ArchivalDetail() {
    const {id} = useParams();
    const token = sessionStorage.getItem('tID');
    const navigate = useNavigate()
    const translationState = useSelector((state)=>state.translation);
    const [archivalAnalysis,setArchivalAnalysis] = useState({})
    const [archival,setArchival] = useState({});
    const [loading,setLoading] = useState(false);
    const [serverError,setServerError] = useState(false);
    

    useEffect(()=>{
        try {
            setLoading(true)
            apiRequest.get(`/archival_user_api/get_archival_user/${id}`,{headers:{
                get_archuser_api:process.env.REACT_APP_GET_ARCHUSER_API,
                Authorization:`Bearer ${token}`

            }}).then((res)=>{
                setLoading(false)
                setArchival(res.data);
            }).catch((error)=>{
                if(error.response.status ===500){
                    setServerError(true);
                }
                translationState.lan ==="En" ? toast.error(error?.response?.data?.Message_en):toast.error(error?.response?.data?.Message_am)

            })
            
        } catch (error) {
            setLoading(false)
            setServerError(true)
            
        }
    },[id,token,translationState]);

    useEffect(()=>{
      try {
          setLoading(true)
          apiRequest.get(`/letter_analysis/get_arch_analysis_all/${id}`,{headers:{
            get_extfirst_api:process.env.REACT_APP_GET_EXTFIRST_API,
              Authorization:`Bearer ${token}`

          }}).then((res)=>{
              setLoading(false)
              setArchivalAnalysis(res.data);
          }).catch((error)=>{
              if(error.response.status ===500){
                  setServerError(true);
              }
              translationState.lan ==="En" ? toast.error(error?.response?.data?.Message_en):toast.error(error?.response?.data?.Message_am)

          })
          
      } catch (error) {
          setLoading(false)
          setServerError(true)
          
      }
  },[id,token,translationState]);




    if(serverError) return <ServerError />
  return (
    <div className="w-[100%]">
    <ToastContainer theme="light" />

    <div className="w-[100%] mx-auto p-2 min-h-[250px] bg-white rounded-[10px] max-lg2:w-[90%]">
      <div className="w-[90%] my-[20px] flex items-center justify-start text-[#FBB042] mx-auto font-bold">
        <BiChevronLeft
          className="text-[30px] cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <span className="text-[20px] font-bold capitalize max-lg2:text-[16px]">
        {translationState?.lan ==="En" && language?.archivalInformation[0]}
        {translationState?.lan ==="Am" && language?.archivalInformation[1]}
        </span>
      </div>
      <div className='w-[90%] mx-auto my-[20px] grid grid-cols-4 gap-[10px]'>
      <div  className="w-[100%] h-[150px] p-2 bg-white rounded-[10px] border border-gray-300 max-lg2:h-[120px]">
      <div className="w-[80%] my-[20px] mx-auto flex justify-between max-lg2:w-[90%]">
        <div className="flex flex-col gap-[10px]">
          <span className="text-[12px] text-gray-500 max-lg2:text-[10px]">
          {translationState?.lan ==="En" && language?.verifiedCases[0]}
          {translationState?.lan ==="Am" && language?.verifiedCases[1]}
          </span>
          <span className="font-bold text-[40px] text-[#0C73B8] max-lg2:text-[30px]">{archivalAnalysis?.verifiedCases}</span>
     
        </div>
        {/* icon */}
        <div className="w-[80px] h-[80px]  flex justify-center  rounded-full">
          <FaBriefcase className="text-[#0C73B8] text-[40px] max-lg2:text-[30px]" />
        </div>
      </div>
    </div>
    
     <div  className="w-[100%] h-[150px] p-2 bg-white rounded-[10px] border border-gray-300  max-lg2:h-[120px]">
      <div className="w-[80%] my-[20px] mx-auto flex justify-between max-lg2:w-[90%]">
        <div className="flex flex-col gap-[10px]">
          <span className="text-[12px] text-gray-500 max-lg2:text-[10px]">
          {translationState?.lan ==="En" && language?.createdIncomingLetters[0]}
          {translationState?.lan ==="Am" && language?.createdIncomingLetters[1]}
          </span>
          <span className="font-bold text-[40px] text-[#0C73B8] max-lg2:text-[30px]">{archivalAnalysis?.createdIncomingLtrsNumber}</span>
        </div>
        {/* icon */}
        <div className="w-[80px] h-[80px]  flex justify-center  rounded-full">
          <MdWatchLater  className="text-[#0C73B8] text-[40px] max-lg2:text-[30px]" />
        </div>
      </div>
    </div>
    <div  className="w-[100%] h-[150px] p-2 bg-white rounded-[10px] border border-gray-300  max-lg2:h-[120px]">
      <div className="w-[80%] my-[20px] mx-auto flex justify-between max-lg2:w-[90%]">
        <div className="flex flex-col gap-[10px]">
          <span className="text-[12px] text-gray-500 max-lg2:text-[10px]">
          {translationState?.lan ==="En" && language?.verifiedInternalLetters[0]}
          {translationState?.lan ==="Am" && language?.verifiedInternalLetters[1]}
          </span>
          <span className="font-bold text-[40px] text-[#0C73B8] max-lg2:text-[30px]">{archivalAnalysis ? archivalAnalysis?.verifiedInternalLtrsNumber:'-'}</span>
        </div>
        {/* icon */}
        <div className="w-[80px] h-[80px] flex justify-center  rounded-full">
          <MdAssignmentLate  className="text-[#0C73B8] text-[40px] max-lg2:text-[30px]" />
        </div>
      </div>
    </div>

    <div  className="w-[100%] h-[150px] p-2 bg-white rounded-[10px] border border-gray-300 max-lg2:h-[120px]">
      <div className="w-[80%] my-[20px] mx-auto flex justify-between max-lg2:w-[90%]">
        <div className="flex flex-col gap-[10px]">
          <span className="text-[12px] text-gray-500 max-lg2:text-[10px]">
          {translationState?.lan ==="En" && language?.verifiedOutgoingLetters[0]}
          {translationState?.lan ==="Am" && language?.verifiedOutgoingLetters[1]}
          </span>
          <span className="font-bold text-[40px] text-[#0C73B8] max-lg2:text-[30px]">{archivalAnalysis ? archivalAnalysis?.verifiedOutgoingLtrsNumber:'-'}</span>
        </div>
     
        <div className="w-[80px] h-[80px]  flex justify-center  rounded-full">
          <FaPeopleGroup  className="text-[#0C73B8] text-[40px] max-lg2:text-[30px]" />
        </div>
      </div>
    </div>
      </div>


      {loading ? <Loading addtionalStyle={"flex justify-center items-center my-[50px]"}/>: <div className="w-[100%] mx-auto my-[30px]  flex flex-col items-center gap-[50px]">
        {archival?.picture ? (
          <div className="w-[200px] h-[200px] max-lg2:w-[150px] max-lg2:h-[150px]">
            <img
              className="w-[100%] h-[100%]  rounded-full object-cover pointer-events-none"
              src={`${process.env.REACT_APP_BACKEND_IMAGES}/ArchivalUserImages/${archival?.picture}`}
              alt=""
            />
          </div>
        ) : (
          <div className="w-[200px] h-[200px] bg-[#0C73B8]  rounded-full flex justify-center items-center">
            <span>{archival?.firstname?.[0]}</span>
          </div>
        )}

        <div className="w-[80%]  flex flex-col gap-[20px]">
          <div className="w-[80%] mx-auto flex justify-center items-center gap-[10px]">
            <span className="text-[30px] text-[#0C73B8] font-bold max-lg2:text-[20px]">
              {archival?.firstname} {archival?.middlename}{" "}
              {archival?.lastname}
            </span>

           
          </div>
          <div className="w-[80%] my-[30px] mx-auto flex justify-between items-start gap-[50px] max-lg2:w-[100%]">
            <div className="flex flex-col gap-[20px]">
            <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">    {translationState?.lan ==="En" && language?.username[0]}
                {translationState?.lan ==="Am" && language?.username[1]}: </span>
                <span className="max-lg2:text-[12px]">{archival?.username}</span>
              </span>

              <span className="flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">    {translationState?.lan ==="En" && language?.email[0]}
                {translationState?.lan ==="Am" && language?.email[1]}: </span>{" "}
                <span className="text-gray-500 max-lg2:text-[12px]">
                  {archival?.email}
                </span>
              </span>
              <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">    {translationState?.lan ==="En" && language?.phoneNumber[0]}
                {translationState?.lan ==="Am" && language?.phoneNumber[1]}: </span>
                <span className="max-lg2:text-[12px]">{archival?.phone}</span>
              </span>
             
              <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">    {translationState?.lan ==="En" && language?.createdDate[0]}
                {translationState?.lan ==="Am" && language?.createdDate[1]}: </span>
                <span className="max-lg2:text-[12px]"> {new Date(archival?.createdAt)?.toDateString()}{" "}</span>
              </span>
             
               
            </div>
            <div className="flex  flex-col gap-[20px]">
            
             
            <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">    {translationState?.lan ==="En" && language?.gender[0]}
                {translationState?.lan ==="Am" && language?.gender[1]}: </span>
                <span className="max-lg2:text-[12px]">
                {translationState?.lan ==="En" && archival?.gender}
                {translationState?.lan ==="Am" && archival?.gender ==="Male" ? language?.male[1]:language?.female[1]}
                  </span>
              </span>
             
              <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">{translationState?.lan ==="En" && language?.createdBy[0]}
                {translationState?.lan ==="Am" && language?.createdBy[1]}: </span>
                <span className="max-lg2:text-[12px]">{archival?.createdBy?.firstname} {archival?.createdBy?.middlename} {archival?.createdBy?.lastname}</span>
              </span>

              <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">        {translationState?.lan ==="En" && language?.status[0]}
                {translationState?.lan ==="Am" && language?.status[1]}: </span>
                <span className="py-2">
              {archival?.status === "active" && (
                <span className="p-2 rounded-[5px] bg-green-600 text-[14px] text-white max-lg2:text-[10px]">
                      {translationState?.lan ==="En" && language?.active[0]}
                      {translationState?.lan ==="Am" && language?.active[1]}
                </span>
              )}
              {archival?.status === "inactive" && (
                <span className="p-2 rounded-[5px] bg-red-600 text-[14px] text-white max-lg2:text-[10px]">
                       {translationState?.lan ==="En" && language?.inactive[0]}
                       {translationState?.lan ==="Am" && language?.inactive[1]}
                </span>
              )}
            </span>
              </span>
           
              <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                {translationState?.lan ==="En" && language?.createdTime[0]}
                {translationState?.lan ==="Am" && language?.createdTime[1]}:{" "}
                </span>
                <span className="max-lg2:text-[12px]">
                 
                  {new Date(
                    archival?.createdAt
                  )?.toLocaleTimeString()}
                </span>
              </span>
            </div>
           
          </div>
        </div>
      </div>}

     
    </div>
  
  </div>
  )
}

export default ArchivalDetail