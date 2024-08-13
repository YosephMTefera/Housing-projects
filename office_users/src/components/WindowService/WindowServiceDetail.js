import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import apiRequest from '../../utils/request';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiChevronLeft } from 'react-icons/bi';
import ServerError from '../ServerError';
import Loading from '../Loading';
import { language } from '../../utils/part-1lan';
import { FaBriefcase } from 'react-icons/fa';
import { MdWatchLater } from 'react-icons/md';


function WindowServiceDetail() {
    const {id} = useParams();
    const token = sessionStorage.getItem('tID');
    const navigate = useNavigate()
    const translationState = useSelector((state)=>state.translation);
    const [windowUser,setWindowUser] = useState({});
    const [windowAnalysis,setWindowAnalysis] = useState({})
    const [loading,setLoading] = useState(false);
    const [serverError,setServerError] = useState(false);
    

    useEffect(()=>{
        try {
            setLoading(true)
            apiRequest.get(`/window_service_user_api/get_window_service_user/${id}`,{headers:{
                get_winduser_api:process.env.REACT_APP_GET_WINDUSER_API,
                Authorization:`Bearer ${token}`

            }}).then((res)=>{
                setLoading(false)
                setWindowUser(res.data);
            }).catch((error)=>{
              setLoading(false)
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
          apiRequest.get(`/letter_analysis/get_ws_analysis/${id}`,{headers:{
            get_windservanalysis_api:process.env.REACT_APP_GET_WINDSERVANALYSIS_API,
              Authorization:`Bearer ${token}`

          }}).then((res)=>{
              setLoading(false)
              setWindowAnalysis(res.data);
          }).catch((error)=>{
            setLoading(false)
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
        <span className="text-[20px] font-bold  max-lg2:text-[16px]">
        {translationState?.lan ==="En" && language?.windowServiceInformation[0]}
        {translationState?.lan ==="Am" && language?.windowServiceInformation[1]}
        </span>
      </div>

      <div className='w-[90%] mx-auto my-[20px] grid grid-cols-4 gap-[10px]'>
      <div  className="w-[100%] h-[150px] p-2 bg-white rounded-[10px] border border-gray-300 max-lg2:h-[120px]">
      <div className="w-[80%] my-[20px] mx-auto flex justify-between max-lg2:w-[90%]">
        <div className="flex flex-col gap-[10px]">
          <span className="text-[12px] text-gray-500 max-lg2:text-[10px]">
          {translationState?.lan ==="En" && language?.totalCases[0]}
          {translationState?.lan ==="Am" && language?.totalCases[1]}
          </span>
          <span className="font-bold text-[40px] text-[#0C73B8] max-lg2:text-[30px]">{windowAnalysis?.totalCases}</span>
     
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
          {translationState?.lan ==="En" && language?.currentDateCases[0]}
          {translationState?.lan ==="Am" && language?.currentDateCases[1]}
          </span>
          <span className="font-bold text-[40px] text-[#0C73B8] max-lg2:text-[30px]">{windowAnalysis?.currentDateCases}</span>
        </div>
        {/* icon */}
        <div className="w-[80px] h-[80px]  flex justify-center  rounded-full">
          <MdWatchLater  className="text-[#0C73B8] text-[40px] max-lg2:text-[30px]" />
        </div>
      </div>
    </div>
      </div>

      {loading ? <Loading addtionalStyle={"flex justify-center items-center my-[50px]"}/>: <div className="w-[80%] mx-auto my-[40px] flex flex-col items-center gap-[50px]">
        {windowUser?.picture ? (
          <div className="w-[200px] h-[200px] max-lg2:w-[150px] max-lg2:h-[150px]">
            <img
              className="w-[100%] h-[100%]  rounded-full object-cover pointer-events-none"
              src={`${process.env.REACT_APP_BACKEND_IMAGES}/WindowServiceUserImages/${windowUser?.picture}`}
              alt=""
            />
          </div>
        ) : (
          <div className="w-[200px] h-[200px] bg-[#0C73B8]  rounded-full flex justify-center items-center">
            <span>{windowUser?.firstname?.[0]}</span>
          </div>
        )}

        <div className="w-[80%]  flex flex-col gap-[20px]">
          <div className="w-[80%] mx-auto flex justify-center items-center gap-[10px]">
            <span className="text-[30px] text-[#0C73B8] font-bold max-lg2:text-[20px]">
              {windowUser?.firstname} {windowUser?.middlename}{" "}
              {windowUser?.lastname}
            </span>

           
          </div>
          <div className="w-[80%] my-[30px] mx-auto flex justify-between items-start gap-[50px] max-lg2:w-[100%]">
            <div className="flex flex-col gap-[20px]">
            <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">  {translationState?.lan ==="En" && language?.username[0]}
                {translationState?.lan ==="Am" && language?.username[1]}: </span>
                <span className="max-lg2:text-[12px]">{windowUser?.username}</span>
              </span>

              <span className="flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">  {translationState?.lan ==="En" && language?.email[0]}
                {translationState?.lan ==="Am" && language?.email[1]}: </span>{" "}
                <span className="text-gray-500 max-lg2:text-[12px]">
                  {windowUser?.email}
                </span>
              </span>
              <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">  {translationState?.lan ==="En" && language?.phoneNumber[0]}
                {translationState?.lan ==="Am" && language?.phoneNumber[1]}: </span>
                <span className="max-lg2:text-[12px]">{windowUser?.phone}</span>
              </span>
             
              <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">  {translationState?.lan ==="En" && language?.createdDate[0]}
                {translationState?.lan ==="Am" && language?.createdDate[1]}: </span>
                <span className="max-lg2:text-[12px]"> {new Date(windowUser?.createdAt)?.toDateString()}{" "}</span>
              </span>
             
               
            </div>
            <div className="flex  flex-col gap-[20px]">
            
             
            <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">  {translationState?.lan ==="En" && language?.gender[0]}
                {translationState?.lan ==="Am" && language?.gender[1]}: </span>
                <span className="max-lg2:text-[12px]">
                {translationState?.lan ==="En" && windowUser?.gender}
                {translationState?.lan ==="Am" && windowUser?.gender ==="Male" && language?.male[1]}
                {translationState?.lan ==="Am" && windowUser?.gender ==="Female" &&language?.female[1]}
                  </span>
              </span>
             
              <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">  {translationState?.lan ==="En" && language?.createdBy[0]}
                {translationState?.lan ==="Am" && language?.createdBy[1]}: </span>
                <span className="max-lg2:text-[12px]">{windowUser?.createdBy?.firstname} {windowUser?.createdBy?.middlename} {windowUser?.createdBy?.lastname}</span>
              </span>

              <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">  {translationState?.lan ==="En" && language?.status[0]}
                {translationState?.lan ==="Am" && language?.status[1]}: </span>
                <span className="py-2">
              {windowUser?.status === "active" && (
                <span className="p-2 rounded-[5px] bg-green-600 text-[14px] text-white max-lg2:text-[10px]">
                    {translationState?.lan ==="En" && language?.active[0]}
                    {translationState?.lan ==="Am" && language?.active[1]}
                </span>
              )}
              {windowUser?.status === "inactive" && (
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
                    windowUser?.createdAt
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

export default WindowServiceDetail