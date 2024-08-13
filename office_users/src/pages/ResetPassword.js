import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaKey } from "react-icons/fa";
import { useParams } from "react-router-dom";
import ServerError from "../components/ServerError";
import { ToastContainer, toast } from "react-toastify";
import apiRequest from "../utils/request";
import {useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { translationAction } from '../REDUX/slices/translationSlice';
import { language } from '../utils/part-1lan';
function ResetPassword() {
  const { id, token } = useParams();
  const dispatch = useDispatch();
  const translationState = useSelector((state)=>state.translation);
  const [password, setPassword] = useState("");
  const [reTypePassword, setRetypePassword] = useState("");
  const [rateLimitTimer, setRateLimitTimer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleReset = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);
      if (password !== reTypePassword) {
        toast.error("Password and Re-Type Password did not match");
      }
      await apiRequest
        .put(
          `/office_user_api/reset_office_user/${id}/${token}`,
          {
            password: password,
          },
          {
            headers: {
              get_user_reset_api: process.env.REACT_APP_GET_USER_RESET_API,
            },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            translationState?.lan === "En" ? toast.success(res.data.Message_en): toast.success(res.data.Message_am)
            setTimeout(() => {
              setLoading(false);
              window.location.href = `/login`;
            }, 6000);
          }
        })
        .catch((error) => {
          setLoading(false);
    
          if (error?.response?.status === 500) {
            setServerError(true);
          }
          if(error?.response?.status === 429){

            setRateLimitTimer(180);
            // toast.error("Too many attempts. Please try again later.")
          }
          
          translationState?.lan === "En" ? toast.error(error.response.data.Message_en): toast.error(error.response.data.Message_am)
        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };
  useEffect(() => {
    if (rateLimitTimer) {
      const timer = setInterval(() => {
        setRateLimitTimer((prev) => (prev > 1 ? prev - 1 : null));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [rateLimitTimer]);
  if (serverError) return <ServerError />;
  return (
    <div className="w-[100%] flex flex-col  items-center h-[100vh]">
        <ToastContainer theme="light" />
      <div className="w-[100%] bg-white z-[100]">
        <div className="w-[80%] h-[50px] mx-auto flex justify-end items-center">
          <select
          value={translationState?.lan}
            onChange={(e) => dispatch(translationAction.setLan(e.target.value))}
            className="py-1 px-4 border border-gray-300 rounded-[5px] text-[14px] text-[#0C73B8] outline-none max-lg2:text-[10px]"
          >
            <option value={"En"}>En</option>
            <option value={"Am"}>አማ</option>
          </select>
        </div>
      </div>
    <div className=" w-[100%] h-[100%] flex between absolute top-0 left 0">
      <img
        className="w-[100%] h-[100%] absolute left-0 top-0 right-0"
        src={require("../CAS/hero-bg 2.png")}
        alt=""
      />
      <img
        src={require("../CAS/hero-bg 1.png")}
        alt=""
        className="w-[50%] h-[100%] absolute right-0 top-0"
      />
    </div>
    <div className="w-[30%] shadow-md rounded-[10px] my-[100px] bg-white z-[10] p-4 flex flex-col items-center gap-[30px] max-lg2:my-[50px] max-lg2:w-[50%] max-lg1:w-[70%] max-sm1:w-[90%]">
    
      <div className="w-[80%] mx-auto flex flex-col mt-[10px] justify-center items-center gap-[20px]">
        <div className="w-[70px] h-[70px] flex items-center justify-center   bg-[#ffefbf] rounded-full">
          <FaKey className=" text-[34px] text-[#FBB042] " />
        </div>

        <span className="text-[20px] text-[#0C73B8]">
        {translationState?.lan ==="En" && language?.resetPassword[0]}
        {translationState?.lan ==="Am" && language?.resetPassword[1]}?</span>
      </div>

      <div className="w-[80%] mx-auto flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[10px]">
        {translationState?.lan ==="En" &&   <input
            type="password"
            placeholder={language?.password[0]}
            onChange={(e) => setPassword(e?.target?.value)}
            className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%] max-lg2:text-[12px]"
          />}
        {translationState?.lan ==="Am" &&   <input
            type="password"
            placeholder={language?.password[1]}
            onChange={(e) => setPassword(e?.target?.value)}
            className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%] max-lg2:text-[12px]"
          />}
        
        </div>
        <div className="flex flex-col gap-[10px]">
          <span className="text-[14px] font-bold text-[#0C73B8] max-lg2:text-[12px]">
          {translationState?.lan ==="En" && language?.retypePassword[0]}
          {translationState?.lan ==="Am" && language?.retypePassword[1]}
          </span>
          {translationState?.lan ==="En" &&   <input
            type="password"
            placeholder={language?.retypePassword[0]}
            onChange={(e) => setRetypePassword(e?.target?.value)}
            className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%] max-lg2:text-[12px]"
          />}
        {translationState?.lan ==="Am" &&    <input
            type="password"
            placeholder={language?.retypePassword[1]}
            onChange={(e) => setRetypePassword(e?.target?.value)}
            className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%] max-lg2:text-[12px]"
          />}
        
        </div>
      </div>
      {loading ? <Loading  addtionalStyle={"flex justify-center items-center"}/>: rateLimitTimer ?     <p className="text-[12px] my-[10px] text-gray-500 text-center">Please wait 3 minutes before retrying.</p>:  <div className="w-[80%] mx-auto">
 
 <button
   disabled={loading}
   onClick={handleReset}
   className={
     loading
       ? "w-[100%] bg-[#FBB042] border border-[#FBB042] text-white px-3 py-2 rounded cursor-not-allowed hover:bg-transparent hover:text-[#FBB042] transition duration-500 max-lg2:text-[12px]"
       : "w-[100%] bg-[#FBB042] border border-[#FBB042] text-white px-3 py-2 rounded hover:bg-transparent hover:text-[#FBB042] transition duration-500 max-lg2:text-[12px]"
   }
 >
   {translationState?.lan ==="En" && language?.resetPassword[0]}
   {translationState?.lan ==="Am" && language?.resetPassword[1]}
 </button>
</div>}
    
      <div className="w-[90%] mx-auto text-[14px] flex justify-center items-center gap-[10px] max-lg2:text-[12px]">
        <AiOutlineArrowLeft />
        <a href="/login">
        {translationState?.lan ==="En" && language?.backToLogin[0]}
        {translationState?.lan ==="Am" && language?.backToLogin[1]}
        </a>
      </div>
    </div>
  </div>
  )
}

export default ResetPassword