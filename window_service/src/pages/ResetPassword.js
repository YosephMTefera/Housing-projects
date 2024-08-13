import React, { useState,useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaKey } from "react-icons/fa";
import {useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import apiRequest from "../utils/request";
import { translationAction } from "../REDUX/slices/translationSlice";
import ServerError from "../components/ServerError";
import Loading from "../components/Loading";
import { language } from "../utils/part-1lan";

function ResetPassword() {
  const dispatch = useDispatch();
  const translationState = useSelector((state) => state?.translation);
  const [password, setPassword] = useState("");
  const [reTypePassword, setRetypePassword] = useState("");
  const [rateLimitTimer, setRateLimitTimer] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id, token } = useParams();
  const [serverError, setServerError] = useState(false);

  const handleReset = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);
      if (password !== reTypePassword) {
        translationState.lan === "En"
          ? toast.error("Password and Re-Type Password did not match")
          : toast.error("የይለፍ ቃል እና እንደገና የተጻፈው የይለፍ ቃል አልተዛመደም።");
      }
      await apiRequest
        .put(
          `/window_service_user_api/reset_window_service_user/${id}/${token}`,
          {
            password: password,
          },
          {
            headers: {
              get_windres_api: process.env.REACT_APP_GET_WINDRES_API,
            },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            toast.success(res?.data?.Message);
            translationState.lan === "En"
              ? toast.success(res?.data?.Message_en)
              : toast.success(res?.data?.Message_am);
            setTimeout(() => {
              setLoading(false);
              window.location.href = `/login`;
            }, 5000);
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error?.response?.status === 500) {
            setServerError(true);
          }
          if(error?.response?.status === 429){

            setRateLimitTimer(180);
            
          }
          translationState.lan === "En"
            ? toast.error(error?.response?.data?.Message_en)
            : toast.error(error?.response?.data?.Message_am);
          if (error?.response?.status === 500) {
            setServerError(true);
          }
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
      <div className="w-[100%] bg-white z-[1000]">
        <div className="w-[80%] h-[50px] mx-auto flex justify-end items-center">
          <select
          value={translationState?.lan}
            onChange={(e) =>
              dispatch(translationAction?.setLan(e?.target?.value))
            }
            className="py-1 px-4 border border-gray-300 rounded-[5px] text-[14px] text-[#0C73B8] outline-none max-lg2:text-[10px]"
          >
            <option value={"En"}>En</option>
            <option value={"Am"}>አማ</option>
          </select>
        </div>
      </div>
     
      <div className="w-[30%] shadow-md rounded-[10px] bg-white mt-[100px] z-[10] p-4 max-lg2:mt-[50px] flex flex-col items-center gap-[30px] max-lg2:w-[50%] max-lg1:w-[70%] max-sm1:w-[90%]">
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
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
            />}

            {translationState?.lan ==="Am" &&   <input
              type="password"
              placeholder={language?.password[1]}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
            />}
          
          </div>
          <div className="flex flex-col gap-[10px]">
            <span className="text-[14px] font-bold text-[#0C73B8]">
            {translationState?.lan ==="En" && language?.retypePassword[0]}
            {translationState?.lan ==="Am" && language?.retypePassword[1]}
            </span>
            {translationState?.lan ==="En" &&       <input
              type="password"
              placeholder={language?.retypePassword[0]}
              onChange={(e) => setRetypePassword(e.target.value)}
              className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
            />}
            {translationState?.lan ==="Am" &&  <input
              type="password"
              placeholder={language?.retypePassword[1]}
              onChange={(e) => setRetypePassword(e.target.value)}
              className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
            /> }     
      
          </div>
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
          </> :
          <div className="w-[80%] mx-auto">
            <button
              disabled={loading}
              onClick={handleReset}
              className="w-[100%] border border-[#FDC00D] bg-[#FDC00D] hover:bg-transparent hover:text-[#FDC00D] py-2 px-4 text-white rounded-[5px] transition duration-500 max-lg2:text-[12px]"
            >
         {translationState?.lan ==="En" && language?.resetPassword[0]}
         {translationState?.lan ==="Am" && language?.resetPassword[1]}
            </button>
          </div>
        )}
        <div className="w-[90%] mx-auto text-[14px] flex justify-center items-center gap-[10px]">
          <AiOutlineArrowLeft />
          <a href="/login">
          {translationState?.lan ==="En" && language?.backToLogin[0]}
          {translationState?.lan ==="Am" && language?.backToLogin[1]}
          </a>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
