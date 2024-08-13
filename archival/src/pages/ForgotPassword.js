import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaKey } from "react-icons/fa";
import ServerError from "../components/ServerError";
import apiRequest from "../utils/request";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { translationAction } from "../REDUX/slices/translationSlice";
import { language } from "../utils/part-1lan";

function ForgotPassword() {
  const dispatch = useDispatch();
  const translationState = useSelector((state) => state?.translation);
  const [emailFill, setEmailFill] = useState("");
  const [rateLimitTimer, setRateLimitTimer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleForgotPassword = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);

      await apiRequest
        .post(
          "/archival_user_api/forgot_archival_user",
          { email: emailFill },
          {
            headers: {
              get_forarch_api: process.env.REACT_APP_GET_FORARCH_API,
            },
          }
        )
        .then((response) => {
          if (response?.status === 200) {
            setLoading(false);
            setEmailFill("");
            translationState.lan === "En"
              ? toast.success(response?.data?.Message_en)
              : toast.success(response?.data?.Message_am);
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
    <div className="w-[100%] flex flex-col  items-center h-[100vh] bg-gray-100">
      <ToastContainer theme="light" />
      <div className="w-[100%] bg-white z-[1000]">
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
   
      <div className="w-[30%] shadow-md my-[100px] rounded-[45px] bg-white z-[10] p-4 flex flex-col items-center gap-[30px] max-lg1:w-[70%] max-sm1:w-[90%]">
        <div className="w-[80%] mx-auto flex flex-col mt-[10px] justify-center items-center gap-[20px]">
          <div className="w-[70px] h-[70px] flex items-center justify-center   bg-[#ffefbf] rounded-full">
            <FaKey className=" text-[34px] text-[#FBB042] " />
          </div>

          <span className="text-[20px] text-[#0C73B8] font-bold">
          {translationState?.lan==="En" && language?.forgotPassword[0]}
          {translationState?.lan==="Am" && language?.forgotPassword[1]}?
          </span>
        </div>

        <div className="w-[80%] mx-auto flex flex-col gap-[10px]">
          <div>
            <span className="text-[14px] font-bold text-[#0C73B8] max-lg2:text-[12px]">
            {translationState?.lan==="En" && language?.email[0]}
            {translationState?.lan==="Am" && language?.email[1]}
            </span>
            {/* {emailSent && <span className="text-[12px] font-bold text-green-600 flex items-center gap-[10px]"><AiFillCheckCircle />  Email Sent: please check your email</span>} */}
          </div>
          {translationState?.lan ==="En" &&  <input
            type="email"
            value={emailFill}
            placeholder={language?.enteryouremail[0]}
            onChange={(e) => setEmailFill(e?.target?.value)}
            className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%] max-lg2:text-[12px]"
          />}

{translationState?.lan ==="Am" &&  <input
            type="email"
            value={emailFill}
            placeholder={language?.enteryouremail[1]}
            onChange={(e) => setEmailFill(e?.target?.value)}
            className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%] max-lg2:text-[12px]"
          />}
         
        </div>

        {loading ? <Loading addtionalStyle={"flex justify-center items-center my-[20px]"} /> : rateLimitTimer ?     <p className="text-[12px] my-[10px] text-gray-500 text-center">Please wait 3 minutes before retrying.</p>:<div className="w-[80%] max-md2:w-[50%] max-sm1:w-[70%]">
            <button
           
              disabled={loading}
              onClick={handleForgotPassword}
              className={
                loading
                  ? "w-[100%] bg-[#FBB042] border border-[#FBB042] text-white p-[0.7rem] rounded text-[14px] cursor-not-allowed hover:bg-transparent hover:text-[#FBB042] transition duration-500 max-lg2:py-[7px] max-lg2:text-[12px]"
                  : "w-[100%] bg-[#FBB042] border border-[#FBB042] text-white p-[0.7rem] rounded text-[14px] hover:bg-transparent hover:text-[#FBB042] transition duration-500 max-lg2:py-[7px] max-lg2:text-[12px]"
              }
            >
            {translationState?.lan==="En" && language?.getResetLink[0]}
            {translationState?.lan==="Am" && language?.getResetLink[1]}
            </button>
          </div>}
        
        <div className="w-[90%] mx-auto text-[14px] flex justify-center items-center gap-[10px] max-lg2:text-[12px]">
          <AiOutlineArrowLeft />
          <a href="/login">
          {translationState?.lan==="En" && language?.backToLogin[0]}
          {translationState?.lan==="Am" && language?.backToLogin[1]}
          
          </a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
