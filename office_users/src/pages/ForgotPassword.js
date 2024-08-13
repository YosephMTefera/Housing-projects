import React, { useEffect, useState } from 'react'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {FaKey} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import apiRequest from '../utils/request';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError from '../components/ServerError';
import Loading from '../components/Loading';
import {  useDispatch, useSelector } from 'react-redux';
import { translationAction } from '../REDUX/slices/translationSlice';
import { language } from '../utils/part-1lan';

function ForgotPassword() {
  const token = sessionStorage.getItem('tID');
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const translationState = useSelector((state)=>state.translation);
  const [email, setEmail] = useState("");
  const [rateLimitTimer, setRateLimitTimer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      await apiRequest
        .post(
          "/office_user_api/forgot_office_user",
          { email },
          {
            headers: {
              "Content-Type": "application/json",
              get_user_forgot_api: process.env.REACT_APP_GET_USER_FORGOT_API,
            },
          }
        )
        .then((res) => {
          setLoading(false);
          translationState?.lan === "En" ? toast.success(res.data.Message_en): toast.success(res.data.Message_am)
        })
        .catch((error) => {
          setLoading(false);
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
    <div className="w-[100%] flex flex-col justify-start items-center h-[100vh]">
    <ToastContainer theme='light'/>
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
    <div className="w-[30%] my-[100px] shadow-md rounded-[10px] bg-white z-[10] p-4 flex flex-col items-center gap-[30px] max-lg2:w-[50%] max-lg2:my-[50px] max-lg1:w-[70%] max-sm1:w-[90%]">
      <div className="w-[80%] mx-auto flex flex-col mt-[10px] justify-center items-center gap-[20px]">
        <div className="w-[70px] h-[70px] flex items-center justify-center   bg-[#ffefbf] rounded-full">
          <FaKey className=" text-[34px] text-[#FDC00D] " />
        </div>

        <span className="text-[20px] text-[#0C73B8]">
        {translationState?.lan ==="En" && language?.forgotPassword[0]}
        {translationState?.lan ==="Am" && language?.forgotPassword[1]}
          ?</span>
      
      </div>

      <div className="w-[80%] mx-auto flex flex-col gap-[10px]">
        <div>
          <span className="text-[14px] font-bold text-[#0C73B8]">
          {translationState?.lan ==="En" && language?.email[0]}
          {translationState?.lan ==="Am" && language?.email[1]}
          </span>
          {/* {emailSent && (
            <span className="text-[12px] font-bold text-green-600 flex items-center gap-[10px]">
              <AiFillCheckCircle /> Email Sent: please check your email
            </span>
          )} */}
        </div>
        {translationState?.lan ==="En" &&     <input
          type="email"
          // value={email}
          placeholder={language?.enteryouremail[0]}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-[#FDC00D] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
        />}
        {translationState?.lan ==="Am" &&     <input
          type="email"
          // value={email}
          placeholder={language?.enteryouremail[1]}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-[#FDC00D] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
        />}
    
      </div>

      {loading ? <Loading  addtionalStyle={"flex justify-center items-center"}/>:  <div className="w-[80%] mx-auto">
       
      {rateLimitTimer ?     <p className="text-[12px] my-[10px] text-gray-500 text-center">Please wait 3 minutes before retrying.</p>:  <button
        disabled={loading}
       onClick={handleForgotPassword}
          className="w-[100%] border border-[#FDC00D] bg-[#FDC00D] hover:bg-transparent hover:text-[#FDC00D] py-2 px-4 text-white rounded-[5px] transition duration-500 max-lg2:text-[14px]"
        >
            {translationState?.lan ==="En" && language?.getResetLink[0]}
            {translationState?.lan ==="Am" && language?.getResetLink[1]}
        </button>}
       
      

      </div>}
     
      {!token &&    <div className="w-[90%] mx-auto text-[14px] flex justify-center items-center gap-[10px] max-lg2:text-[12px]">
        <AiOutlineArrowLeft />
        <button onClick={()=>navigate('/login')}>
        {translationState?.lan ==="En" && language?.backToLogin[0]}
        {translationState?.lan ==="Am" && language?.backToLogin[1]}
        </button>
      </div>}
   
    </div>
  </div>
  )
}

export default ForgotPassword