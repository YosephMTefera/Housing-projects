import React, { useEffect, useState } from 'react'
import {ToastContainer}from 'react-toastify'
import {jwtDecode} from 'jwt-decode';
import apiRequest from '../../utils/request';
import ServerError from '../ServerError';
import Loading from '../Loading';

function Settings() {
    const token = sessionStorage.getItem("tID");  
  const decodedToken = jwtDecode(token);
  const userID = decodedToken?.user?.id;
  const [user,setUser] = useState({})
  const [loading,setLoading] = useState(false);
  const [serverError,setServerError] = useState(false);
    useEffect(() => {
      try {
        setLoading(true)
        apiRequest

          .get(`/accusation_acceptor_user_api/get_accusation_acceptor/${userID}`, {
            headers: {
              get_accuser_api: process.env.REACT_APP_GET_ACCUSER_API,
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setLoading(false)
            setUser(res?.data);
          })
          .catch((error) => {
            setLoading(false)
            
            if (error?.response?.status === 500) {
             setServerError(true)
            }
          });
      } catch (error) {
        setLoading(false)
        setServerError(true)
      }
    }, [userID, token]);
    if(serverError) return <ServerError />
  return (
    loading ? <Loading addtionalStyle={"flex justify-center items-center my-[20px]"}/> :<div className="w-[90%]  bg-white mt-[30px] mx-auto">
   <ToastContainer theme='light'/>
    <div className='w-[100%] my-[30px] mx-auto max-lg2:my-[10px]'>
      <span className="font-bold text-[#0C73B8] text-[20px]">Account Settings</span>
        
    </div>
    <div className="mt-[30px] bg-white p-4  rounded-[10px] max-lg2:mt-[10px]">
    
      <div className="w-[100%] mt-[30px] border border-gray-300 p-2 mx-auto flex justify-start items-center gap-[20px] rounded-[10px]">
      <div className="w-[100px] h-[100px] bg-[#0C73B8] text-white rounded-full flex justify-center items-center">
       

       {user?.picture ?   <img
         src={`${process.env.REACT_APP_BACKEND_IMAGES}/AccusationAcceptorImages/${user?.picture}`}
         className="w-[100%] h-[100%] object-cover rounded-full"
         alt=""
       />:<div className="w-[100px] h-[100px] bg-[#0C73B8] text-white rounded-full flex justify-center items-center">
         <span>{user?.firstname?.[0]}</span>
         </div>}
    
         
     
     </div>
        <div className="flex flex-col gap-[5px]">
          <span className="font-bold text-[#0C73B8]">{user?.firstname} {user?.middlename} {user?.lastname}</span>
       
          <span className="text-[12px] text-gray-500">@{user && user?.username}</span>
         
        </div>
      </div>
      <div className="w-[100%] mx-auto p-4  mt-[20px] border border-gray-300 rounded-[10px]">
        <div className="w-[90%] mx-auto">
          <div className="w-[100%] mt-[10px] flex justify-between items-center">
            <span className="font-bold text-[#0C73B8] text-[20px] max-lg2:text-[16px]">
              Personal Information
            </span>
            {user?.status ==="active" ? <span className='py-1 px-4 rounded-[20px] bg-green-600 text-white text-[14px] max-lg2:text-[12px]'>active</span>:  <span className='py-1 px-4 rounded-[20px] bg-red-600 text-white text-[14px] max-lg2:text-[12px]'>inactive</span>}

          </div>
          <div className="w-[40%] mt-[20px]  flex justify-between items-center gap-[50px] max-lg2:w-[60%]">
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[10px]">
                <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">First Name</span>
                <span className='max-lg2:text-[14px]'>{user && user?.firstname}</span>
              </div>
             
              <div className="flex flex-col gap-[10px]">
                <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">Phone</span>
                <span className='max-lg2:text-[12px]'>{user && user?.phone}</span>
              </div>
            </div>
            <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[10px]">
                <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">Middle Name</span>
                <span className='max-lg2:text-[14px]'>{user && user?.middlename}</span>
              </div>
             
              <div className="flex flex-col gap-[10px]">
                <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                  Email Address
                </span>
                <span className='max-lg2:text-[14px]'>{user && user?.email}</span>
              </div>
            </div>
            <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[10px]">
                <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">Last Name</span>
                <span className='max-lg2:text-[14px]'>{user&& user?.lastname}</span>
              </div>

             
              <div className="flex flex-col gap-[10px]">
                <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                Gender
                </span>
                <span className='max-lg2:text-[14px]'>{user && user?.gender}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Settings