import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ServerError from "../components/ServerError";
import apiRequest from "../utils/request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser } from "react-icons/fa";
import {useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { translationAction } from "../REDUX/slices/translationSlice";
import { language } from "../utils/part-1lan";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translationState = useSelector((state) => state?.translation);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rateLimitTimer, setRateLimitTimer] = useState(null);
  const [loading, setLoading] = useState("");
  const [serverError, setServerError] = useState(false);

  const handleLogin = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);
      await apiRequest
        .post(
          "/archival_user_api/login_archival_user",
          { username, password },
          {
            headers: {
              get_archlogin_api: process.env.REACT_APP_GET_ARCHLOGIN_API,
            },
          }
        )
        .then((response) => {
          if (response?.status === 200) {
            setLoading(false);
            sessionStorage?.setItem("tID", response?.data?.token);
            window.location.href = "/";
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
          translationState.lan === "En"
            ? toast.error(error?.response?.data?.Message_en)
            : toast.error(error?.response?.data?.Message_am);
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
    <div className="w-full min-h-[100vh] bg-gray-100 flex flex-col  items-center">
      <ToastContainer theme="light" />
      <div className="w-[100%] bg-white">
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
      <div className="w-[50%] min-h-[700px] mt-[100px] bg-white rounded-[45px] shadow-xl flex gap-[10px] max-lg2:min-h-[300px] max-lg2:mt-[50px] max-lg1:w-[70%] max-lg:w-[80%] max-md1:w-[90%]">
        <div className="w-[50%]  bg-[#0C73B8] rounded-tl-[45px] rounded-bl-[45px] max-md2:hidden">
          <div className="w-[90%] h-[65%] mx-auto  flex flex-col items-center justify-around">
            <div className="relative  bg-white rounded-full mt-[20px]">
            <img
              src={require("../CAS/HousingAdmin.png")}
              alt=""
              className="w-[150px] h-[150px] rounded-full object-cover max-lg2:w-[100px] max-lg2:h-[100px] max-md2:hidden"
            />
            </div>

            <div className="text-center text-white w-[80%]">
              <span className="text-[30px] font-bold max-lg2:text-[20px]">
                {translationState?.lan==="En" && language?.archvial[0]}
                {translationState?.lan==="Am" && language?.archvial[1]}
             
              </span>
              <p className="text-[12px] my-[10px] max-lg2:text-[10px]">
              {translationState?.lan==="En" && language?.welcomeMessage[0]}
              {translationState?.lan==="Am" && language?.welcomeMessage[1]}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[70%]  flex flex-col gap-[10px] py-4 justify-center items-center max-md2:w-[100%]">
          <div className="relative  bg-white rounded-full  max-lg2:mt-[30px]">
            <img
              src={require("../CAS/housingLogo.png")}
              alt=""
              className="w-[150px] h-[150px] border rounded-full object-cover"
            />
           
          </div>

          <div className="w-[70%] mt-[30px] flex flex-col items-center max-lg2:mt-[10px]">
            <span className="text-[30px] text-[#0C73B8] font-bold max-lg2:text-[20px] hidden max-md2:block">
            {translationState?.lan==="En" && language?.archvial[0]}
            {translationState?.lan==="Am" && language?.archvial[1]}
            </span>
            <span className="text-[30px] text-[#0C73B8] font-bold max-lg2:text-[20px] max-md2:hidden">
            {translationState?.lan==="En" && language?.login[0]}
            {translationState?.lan==="Am" && language?.login[1]}
            </span>
            <span className="text-[14px] text-gray-500 max-lg2:text-[12px] text-center my-[5px]">
            {translationState?.lan==="En" && language?.enteryourUsername[0]}
                {translationState?.lan==="Am" && language?.enteryourUsername[1]}
            </span>
          </div>

          <div className="w-[80%] mt-[30px]  flex flex-col items-center gap-[10px] max-lg2:mt-[10px] max-md2:w-[60%] max-sm1:w-[80%]">
            <div className="w-[90%]  flex items-center justify-between gap-[10px]  bg-[#f0f0f0] p-[15px]  rounded-[5px] border border-[#FBB042] max-lg2:p-[10px]">
             {translationState?.lan ==="En" &&   <input
                type="text"
                placeholder={language?.username[0]}
                className="bg-transparent text-[14px] text-gray-400 flex-auto outline-none max-lg2:text-[12px]"
                onChange={(e) => setUsername(e?.target?.value)}
                required
              />}
               {translationState?.lan ==="Am" &&   <input
                type="text"
                placeholder={language?.username[1]}
                className="bg-transparent text-[14px] text-gray-400 flex-auto outline-none max-lg2:text-[12px]"
                onChange={(e) => setUsername(e?.target?.value)}
                required
              />}
            
            
              <FaUser className="text-gray-600" />
            </div>
            <div className="w-[90%]  flex items-center justify-between gap-[10px]  bg-[#f0f0f0] p-[15px]  rounded-[5px]  border border-[#FBB042] max-lg2:p-[10px]">
              
              {translationState?.lan ==="En" &&  <input
                type="password"
                placeholder={language?.password[0]}
                className="bg-transparent text-[14px] text-gray-400 flex-auto outline-none max-lg2:text-[12px]"
                onChange={(e) => setPassword(e?.target?.value)}
                required
              />}
               {translationState?.lan ==="Am" &&  <input
                type="password"
                placeholder={language?.password[1]}
                className="bg-transparent text-[14px] text-gray-400 flex-auto outline-none max-lg2:text-[12px]"
                onChange={(e) => setPassword(e?.target?.value)}
                required
              />}
             
            </div>
          </div>
          <div className="w-[70%] flex justify-end my-[5px] max-md2:w-[50%] max-sm1:w-[70%]">
            <span
              onClick={() => navigate("/forgotpassword")}
              className="text-[14px] cursor-pointer text-gray-500 hover:underline max-lg2:text-[11px]"
            >
                         {translationState?.lan==="En" && language?.forgotPassword[0]}
                         {translationState?.lan==="Am" && language?.forgotPassword[1]}?
            </span>
          </div>
          {loading ? <Loading addtionalStyle={"flex justify-center items-center my-[20px]"} /> : rateLimitTimer ?     <p className="text-[12px] my-[10px] text-gray-500 text-center">Please wait 3 minutes before retrying.</p>:<div className="w-[70%] max-md2:w-[50%] max-sm1:w-[70%]">
            <button
           
              disabled={loading}
              onClick={handleLogin}
              className={
                loading
                  ? "w-[100%] bg-[#FBB042] border border-[#FBB042] text-white p-[0.7rem] rounded text-[14px] cursor-not-allowed hover:bg-transparent hover:text-[#FBB042] transition duration-500 max-lg2:py-[7px] max-lg2:text-[12px]"
                  : "w-[100%] bg-[#FBB042] border border-[#FBB042] text-white p-[0.7rem] rounded text-[14px] hover:bg-transparent hover:text-[#FBB042] transition duration-500 max-lg2:py-[7px] max-lg2:text-[12px]"
              }
            >
                        {translationState?.lan==="En" && language?.login[0]}
                        {translationState?.lan==="Am" && language?.login[1]}
            </button>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default Login;
