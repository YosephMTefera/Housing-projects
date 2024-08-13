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

function ITDetail() {
    const {id} = useParams();
    const token = sessionStorage.getItem('tID');
    const navigate = useNavigate()
    const translationState = useSelector((state)=>state.translation);
    const [itUser,setItuser] = useState({});
    const [loading,setLoading] = useState(false);
    const [serverError,setServerError] = useState(false);

    useEffect(()=>{
        try {
            setLoading(true)
            apiRequest.get(`/it_user_api/get_it_user/${id}`,{headers:{
                get_itusers_det_api:process.env.REACT_APP_GET_ITUSERS_DET_API,
                Authorization:`Bearer ${token}`

            }}).then((res)=>{
                setLoading(false)
                setItuser(res.data);
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
    <div className="w-[100%] my-[50px]">
    <ToastContainer theme="light" />

    <div className="w-[80%] mx-auto p-2 min-h-[250px] bg-white rounded-[10px] max-lg2:w-[90%]">
      <div className="w-[90%] my-[20px] flex items-center justify-start text-[#FBB042] mx-auto font-bold">
        <BiChevronLeft
          className="text-[30px] cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <span className="text-[20px] font-bold capitalize max-lg2:text-[16px]">
        {translationState?.lan ==="En" && language?.itInformation[0]}
        {translationState?.lan ==="Am" && language?.itInformation[1]}
        </span>
      </div>

      {loading ? <Loading addtionalStyle={"flex justify-center items-center my-[50px]"}/>: <div className="w-[80%] mx-auto my-[30px] flex flex-col items-center gap-[50px]">
        {itUser?.picture ? (
          <div className="w-[200px] h-[200px] max-lg2:w-[150px] max-lg2:h-[150px]">
            <img
              className="w-[100%] h-[100%]  rounded-full object-cover pointer-events-none"
              src={`${process.env.REACT_APP_BACKEND_IMAGES}/ITUserImages/${itUser?.picture}`}
              alt=""
            />
          </div>
        ) : (
          <div className="w-[200px] h-[200px] bg-[#0C73B8]  rounded-full flex justify-center items-center">
            <span>{itUser?.firstname?.[0]}</span>
          </div>
        )}

        <div className="w-[80%]  flex flex-col gap-[20px] max-lg2:w-[100%]">
          <div className="w-[80%] mx-auto flex justify-center items-center gap-[10px]">
            <span className="text-[30px] text-[#0C73B8] font-bold max-lg2:text-[20px]">
              {itUser?.firstname} {itUser?.middlename}{" "}
              {itUser?.lastname}
            </span>

           
          </div>
          <div className="w-[80%] my-[30px] mx-auto flex justify-between items-start gap-[50px]">
            <div className="flex flex-col gap-[20px]">
            <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">       {translationState?.lan ==="En" && language?.username[0]}
                {translationState?.lan ==="Am" && language?.username[1]}: </span>
                <span className="max-lg2:text-[12px]">{itUser?.username}</span>
              </span>

              <span className="flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">        {translationState?.lan ==="En" && language?.email[0]}
                {translationState?.lan ==="Am" && language?.email[1]}: </span>{" "}
                <span className="text-gray-500 max-lg2:text-[12px]">
                  {itUser?.email}
                </span>
              </span>
              <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">       {translationState?.lan ==="En" && language?.phoneNumber[0]}
                {translationState?.lan ==="Am" && language?.phoneNumber[1]}: </span>
                <span className="max-lg2:text-[12px]">{itUser?.phone}</span>
              </span>
             
              <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">       {translationState?.lan ==="En" && language?.createdDate[0]}
                {translationState?.lan ==="Am" && language?.createdDate[1]}: </span>
                <span className="max-lg2:text-[12px]"> {new Date(itUser?.createdAt)?.toDateString()}{" "}</span>
              </span>
             
               
            </div>
            <div className="flex  flex-col gap-[20px]">
            
             
            <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">       {translationState?.lan ==="En" && language?.gender[0]}
                {translationState?.lan ==="Am" && language?.gender[1]}: </span>
                <span className="max-lg2:text-[12px]">
                {translationState?.lan ==="En" && itUser?.gender}
                {translationState?.lan ==="Am" && itUser?.gender ==="Male" ? language?.male[1]:language?.female[1]}
                  </span>
              </span>
             
              

              <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">       {translationState?.lan ==="En" && language?.status[0]}
                {translationState?.lan ==="Am" && language?.status[1]}: </span>
                <span className="py-2">
              {itUser?.status === "active" && (
                <span className="p-2 rounded-[5px] bg-green-600 text-[14px] text-white max-lg2:text-[10px]">
                       {translationState?.lan ==="En" && language?.active[0]}
                       {translationState?.lan ==="Am" && language?.active[1]}
                </span>
              )}
              {itUser?.status === "inactive" && (
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
                    itUser?.createdAt
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

export default ITDetail