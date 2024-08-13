import React, { useState } from 'react'
import {FaTimes} from 'react-icons/fa'
import Loading from '../Loading';
import apiRequest from '../../utils/request';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';
import ServerError from '../ServerError';

function RespondToCase({setRespondModal}) {
    const token = sessionStorage.getItem('tID');
    const {id} = useParams();
    const translationState = useSelector((state)=>state.translation);
    const [subject,setSubject] = useState("");
    const [response,setResponse] = useState("");
    const [loading,setLoading] = useState(false);
    const [serverError,setServerError] = useState(false);


    const respondToCase = async ()=>{
        try {
            setLoading(true)
            await apiRequest.put(`/customer_case_api/respond_case/${id}`,{subject,response_txt:response},{headers:{
                get_casrespschedule_api:process.env.REACT_APP_GET_CASRESPSCHEDULE_API,
                Authorization:`Bearer ${token}`

            }}).then((res)=>{
                setLoading(false)
                // setRespondModal(false)
                translationState?.lan === "En"
                ? toast.success(res?.data?.Message_en)
                : toast.success(res?.data?.Message_am);
            }).catch((error)=>{
                setLoading(false);
                if(error.response.status ===500){
                    setServerError(true)
                }
                translationState?.lan === "En"
                ? toast.error(error?.response?.data?.Message_en)
                : toast.error(error?.response?.data?.Message_am);
            })
            
        } catch (error) {
            setServerError(true);
        }
    }

    if(serverError) return <ServerError />
  return (
    <div className='w-[80%] mx-auto fixed left-[20%] top-[230px] z-[10000] max-lg2:top-[50px]'>
       <ToastContainer theme='light'/>
        <div className='bg-white border shadow-md rounded-[10px] w-[80%] mx-auto min-h-[700px]'>
            <div className='w-[90%]  my-[30px] py-3 mx-auto text-[#0C73B8] border-b border-gray-300 flex justify-between items-center max-lg2:my-[10px]'>
                    <span className=' font-bold'>Respond to case</span>
                <FaTimes onClick={()=>setRespondModal(false)}  className='font-bold cursor-pointer'/>

            </div>
            <div className='w-[90%] mx-auto my-[20px] flex flex-col gap-[20px] text-[#0C73B8] max-lg2:my-[0px] max-lg2:gap-[5px]'>
            <div className="w-[100%] mt-[20px] max-lg2:mt-[0px]">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-bold p-2 leading-6 "
                  >
                    Subject
                  </label>
                  <div className="mt-2">
                    <input
                    onChange={(e)=>setSubject(e.target.value)}
                    
                      className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 resize-none"
                    />
                  </div>
                </div>
                <div className="w-[100%] mt-[20px] max-lg2:mt-[0px]">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-bold p-2 leading-6"
                  >
                 Response 
                  </label>
                  <div className="mt-2">
                    <textarea
                      rows={10}
                      onChange={(e)=>setResponse(e.target.value)}
                      className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 resize-none"
                    ></textarea>
                  </div>
                </div>

            </div>
            {loading ? <Loading addtionalStyle={"flex justify-end items-center my-[20px]"}/>:<div className="w-[90%] mx-auto mt-[30px] py-3 flex justify-end items-center gap-[20px]">
       
          <button
            onClick={respondToCase}
            className={
              "bg-[#FBB042] border border-[#FBB042] text-white px-3 py-2 rounded text-[14px] hover:bg-transparent hover:text-[#FBB042] transition duration-500"
            }
          >
            Respond
          </button>
        </div>}
        </div>

    </div>
  )
}

export default RespondToCase