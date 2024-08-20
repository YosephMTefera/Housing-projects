import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import apiRequest from '../../utils/request';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiChevronLeft } from 'react-icons/bi';
import ServerError from '../ServerError';
import Loading from '../Loading';

function WindowUserDetail() {
  const {id} = useParams();
  const token = sessionStorage.getItem('tID');
  const navigate = useNavigate()
  const translationState = useSelector((state)=>state.translation);
  const [windowUser,setWindowuser] = useState({});
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
              setWindowuser(res.data);
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
    <div className="w-[100%] my-[30px]">
      <ToastContainer theme="light" />
  
      <div className="w-[100%] p-2 min-h-[250px] bg-white">
        <div className="w-[90%] flex items-center justify-start text-[#FBB042] mx-auto font-bold">
          <BiChevronLeft
            className="text-[30px] cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <span className="text-[20px] font-bold capitalize max-lg2:text-[16px]">
            Window user Information
          </span>
        </div>

        {loading ? <Loading addtionalStyle={"flex justify-center items-center my-[50px]"}/>: <div className="w-[80%] mx-auto my-[30px] flex flex-col items-center gap-[50px]">
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

              <span className="py-2">
                {windowUser?.status === "active" && (
                  <span className="p-2 rounded-[5px] bg-green-600 text-[14px] text-white max-lg2:text-[10px]">
                    active
                  </span>
                )}
                {windowUser?.status === "inactive" && (
                  <span className="p-2 rounded-[5px] bg-red-600 text-[14px] text-white max-lg2:text-[10px]">
                    inactive
                  </span>
                )}
              </span>
            </div>
            <div className="w-[80%] my-[30px] mx-auto flex justify-between items-start gap-[50px]">
              <div className="flex flex-col gap-[20px]">
                <span className="flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]"> Email: </span>{" "}
                  <span className="text-gray-500 max-lg2:text-[12px]">
                    {windowUser?.email}
                  </span>
                </span>
                <span className="text-gray-500 flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">Phone: </span>
                  <span className="max-lg2:text-[12px]">{windowUser?.phone}</span>
                </span>
                <span className="text-gray-500 flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">Username: </span>
                  <span className="max-lg2:text-[12px]">{windowUser?.username}</span>
                </span>

                <span className="text-gray-500 flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">Created Date: </span>
                  <span className="max-lg2:text-[12px]"> {new Date(windowUser?.createdAt)?.toDateString()}{" "}</span>
                </span>
               
                 
              </div>
              <div className="flex  flex-col gap-[20px]">
              
               
              <span className="text-gray-500 flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">Gender: </span>
                  <span className="max-lg2:text-[12px]">{windowUser?.gender}</span>
                </span>
                {windowUser?.createdBy && <span className="text-gray-500 flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">CreatedBy: </span>
                  <span className="max-lg2:text-[12px]">
                    {windowUser?.createdBy?.firstname}{" "}
                    {windowUser?.createdBy?.middlename}{" "}
                    {windowUser?.createdBy?.lastname}
                  </span>
                </span> }
                

                <span className="text-gray-500 flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">Status: </span>
                  <span className="max-lg2:text-[12px]">{windowUser?.status}</span>
                </span>
             
                <span className="text-gray-500 flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                    Created Time:{" "}
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

export default WindowUserDetail