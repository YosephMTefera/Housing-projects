import React, { useState,useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import apiRequest from "../utils/request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../components/ServerError";
import Loading from "../components/Loading";
import {useDispatch,  useSelector } from "react-redux";
import { translationAction } from "../REDUX/slices/translationSlice";
import { language } from "../utils/part-1lan";

function ForgotPassword() {
  const token = sessionStorage.getItem("tID");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translationState = useSelector((state) => state?.translation);
  const [email, setEmail] = useState("");
  const [rateLimitTimer, setRateLimitTimer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      await apiRequest
        .post(
          "/window_service_user_api/forgot_window_service_user",
          { email },
          {
            headers: {
              "Content-Type": "application/json",
              get_windfor_api: process.env.REACT_APP_GET_WINDFOR_API,
            },
          }
        )
        .then((res) => {
          setLoading(false);
          setEmail("");
          translationState?.lan === "En"
            ? toast.success(res?.data?.Message_en)
            : toast.success(res?.data?.Message_am);
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
          translationState?.lan === "En"
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
    <div className="w-[100%] flex flex-col  items-center h-[100vh] bg-gray-100">
      <ToastContainer theme="light" />
      <div className="w-[100%] z-[1000] bg-white">
        <div className="w-[80%] h-[50px] mx-auto flex justify-end items-center">
          <select
          value={translationState?.lan}
            onChange={(e) =>
              dispatch(translationAction.setLan(e?.target?.value))
            }
            className="py-1 px-4 border border-gray-300 rounded-[5px] text-[14px] text-[#0C73B8] outline-none max-lg2:text-[10px]"
          >
            <option value={"En"}>En</option>
            <option value={"Am"}>አማ</option>
          </select>
        </div>
      </div>
      {/* <div className=" w-[100%] h-[100%] flex between absolute top-0 left 0">
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
      </div> */}
      <div className="w-[30%] shadow-md mt-[100px] rounded-[10px] bg-white z-[10] p-4 flex flex-col items-center gap-[30px] max-lg2:mt-[50px] max-lg2:w-[50%] max-lg1:w-[70%] max-sm1:w-[90%]">
        <div className="w-[80%] mx-auto flex flex-col mt-[10px] justify-center items-center gap-[20px]">
          <div className="w-[70px] h-[70px] flex items-center justify-center   bg-[#ffefbf] rounded-full">
            <FaKey className=" text-[34px] text-[#FDC00D] " />
          </div>

          <span className="text-[20px] text-[#0C73B8] font-bold max-lg2:text-[16px]">
          {translationState?.lan ==="En" && language?.forgotPassword[0]}
          {translationState?.lan ==="Am" && language?.forgotPassword[1]}?
          
          </span>
        </div>

        <div className="w-[80%] mx-auto flex flex-col gap-[10px]">
          <div>
            <span className="text-[14px] font-bold text-[#0C73B8]">
            {translationState?.lan ==="En" && language?.email[0]}
            {translationState?.lan ==="Am" && language?.email[1]}

            </span>
           
          </div>
          {translationState?.lan ==="En" &&   <input
          
          type="email"
          value={email}
          placeholder={language.enteryouremail[0]}
          onChange={(e) => setEmail(e?.target?.value)}
          className="border border-[#FDC00D] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%] max-lg2:text-[12px]"
        />}
          {translationState?.lan ==="Am" &&   <input
          
          type="email"
          value={email}
          placeholder={language?.enteryouremail[1]}
          onChange={(e) => setEmail(e?.target?.value)}
          className="border border-[#FDC00D] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%] max-lg2:text-[12px]"
        />}
        
        </div>

        {loading ? (
          <Loading addtionalStyle={"flex justify-center items-center"} />
        ) : (
          rateLimitTimer ? <>
              {translationState?.lan ==="En" &&   <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">Please wait 3 minutes before retrying.</p>}
    {translationState?.lan ==="Am" &&   <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">እንደገና ከመሞከሮዎ በፊት 3 ደቂቃ ይጠብቁ።</p>}
    {translationState?.lan ==="Or" &&   <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">Maaloo irra deebi'anii yaaluun dura daqiiqaa 3 eegaa</p>}
    {translationState?.lan ==="Tg" &&   <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">በጃኹም ቅድሚ ዳግማይ ምፍታንኩም 3 ደቓይቕ ተጸበዩ።</p>}
    {translationState?.lan ==="Sm" &&   <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">Fadlan sug 3 daqiiqo ka hor inta aanad isku dayin</p>}
    {translationState?.lan ==="Af" &&   <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">Please wait 3 minutes before retrying.</p>}
          
          </>  :
          <div className="w-[80%] mx-auto">
            <button
              disabled={loading}
              onClick={handleForgotPassword}
              className="w-[100%] border border-[#FDC00D] bg-[#FDC00D] hover:bg-transparent hover:text-[#FDC00D] py-2 px-4 text-white rounded-[5px] transition duration-500 max-lg2:text-[12px]"
            >
                {translationState?.lan ==="En" && language?.getResetLink[0]}
                {translationState?.lan ==="Am" && language?.getResetLink[1]}
            </button>
          </div>
        )}

        {!token && (
          <div className="w-[90%] mx-auto text-[14px] flex justify-center items-center gap-[10px] max-lg2:text-[12px]">
            <AiOutlineArrowLeft />
            <button onClick={() => navigate("/login")}>
            {translationState?.lan ==="En" && language?.backToLogin[0]}
            {translationState?.lan ==="Am" && language?.backToLogin[1]}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
