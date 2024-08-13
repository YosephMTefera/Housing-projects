import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaKey } from "react-icons/fa";
import apiRequest from "../../utils/request";
import { ToastContainer, toast } from "react-toastify";
import {useSelector} from 'react-redux'
import ServerError from "../ServerError";
import Navbar from "../Navbar";
import Loading from "../Loading";
import { language } from "../../utils/part-1lan";

function ForgotPassword() {
  const translationState = useSelector((state)=>state.translation)
  const [emailFill, setEmailFill] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleForgotPassword = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);

      await apiRequest
        .post(
          "/customer_user_api/forgot_customer_user",
          { email: emailFill },
          {
            headers: {
              get_forgotcuser_api: process.env.REACT_APP_GET_FORGOTCUSER_API,
            },
          }
        )
        .then((response) => {
          if (response?.status === 200) {
            setLoading(false);
            setEmailFill("");
            translationState?.lan ==="En" && toast.success(response?.data?.Message_en);
            translationState?.lan ==="Am" && toast.success(response?.data?.Message_am);
            
          }
        })
        .catch((error) => {
          setLoading(false);
          if(error?.response?.status ===500){
            setServerError(true)
          }
          if(error?.response?.status === 429){
            toast.error("Too many attempts. Please try again later.")
          }
          translationState?.lan ==="En" &&   toast.error(error?.response?.data?.Message_en);
          translationState?.lan ==="Am" &&   toast.error(error?.response?.data?.Message_am);
        
        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };

  if (serverError) return <ServerError />;
  return (
    <div className="w-[100%] flex justify-center items-center h-[100vh]">
      <Navbar/>
      <ToastContainer theme="light"/>
      <div className=" w-[100%] h-[100%] flex between absolute top-0 left 0">
        <img
          className="w-[100%] h-[100%] absolute left-0 top-0 right-0"
          src={require("../../CAS/hero-bg 2.png")}
          alt=""
        />
        <img
          src={require("../../CAS/hero-bg 1.png")}
          alt=""
          className="w-[50%] h-[100%] absolute right-0 top-0"
        />
      </div>
      <div className="w-[30%] shadow-md rounded-[10px] bg-white z-[10] p-4 flex flex-col items-center gap-[30px] max-lg2:w-[50%] max-lg1:w-[70%] max-sm1:w-[90%]">
        <div className="w-[80%] mx-auto flex flex-col mt-[10px] justify-center items-center gap-[20px]">
          <div className="w-[70px] h-[70px] flex items-center justify-center   bg-[#ffefbf] rounded-full">
            <FaKey className=" text-[34px] text-[#FBB042] " />
          </div>

          <span className="text-[20px] text-[#0C73B8]">
          {translationState?.lan === "En" && language?.forgotPassword[0]}
          {translationState?.lan === "Am" && language?.forgotPassword[1]}
          {translationState?.lan === "Or" && language?.forgotPassword[2]}
          {translationState?.lan === "Tg" && language?.forgotPassword[3]}
          {translationState?.lan === "Sm" && language?.forgotPassword[4]}
          {translationState?.lan === "Af" && language?.forgotPassword[5]}?
          </span>
        </div>

        <div className="w-[80%] mx-auto flex flex-col gap-[10px]">
          <div>
            <span className="text-[14px] font-bold text-[#0C73B8]">
          {translationState?.lan === "En" && language?.email[0]}
          {translationState?.lan === "Am" && language?.email[1]}
          {translationState?.lan === "Or" && language?.email[2]}
          {translationState?.lan === "Tg" && language?.email[3]}
          {translationState?.lan === "Sm" && language?.email[4]}
          {translationState?.lan === "Af" && language?.email[5]}
            </span>
          </div>
          {translationState?.lan ==="En" &&  <input
            type="email"
            value={emailFill}
            placeholder={language.enteryouremail[0]}
            onChange={(e) => setEmailFill(e?.target?.value)}
            className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
          />}
            {translationState?.lan ==="Am" &&  <input
            type="email"
            value={emailFill}
            placeholder={language.enteryouremail[1]}
            onChange={(e) => setEmailFill(e?.target?.value)}
            className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
          />}

{translationState?.lan ==="Or" &&  <input
            type="email"
            value={emailFill}
            placeholder={language.enteryouremail[2]}
            onChange={(e) => setEmailFill(e?.target?.value)}
            className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
          />}

{translationState?.lan ==="Tg" &&  <input
            type="email"
            value={emailFill}
            placeholder={language.enteryouremail[3]}
            onChange={(e) => setEmailFill(e?.target?.value)}
            className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
          />}

{translationState?.lan ==="Sm" &&  <input
            type="email"
            value={emailFill}
            placeholder={language.enteryouremail[4]}
            onChange={(e) => setEmailFill(e?.target?.value)}
            className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
          />}
          {translationState?.lan ==="Af" &&  <input
            type="email"
            value={emailFill}
            placeholder={language.enteryouremail[5]}
            onChange={(e) => setEmailFill(e?.target?.value)}
            className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
          />}
       
       
        </div>
        {loading ? <Loading addtionalStyle={"flex justify-center items-center my-[10px]"}/> : <div className="w-[80%] mx-auto">
          <button
            type="submit"
            disabled={loading}
            onClick={handleForgotPassword}
            className={
              loading
                ? "w-[100%] bg-[#FBB042] border border-[#FBB042] text-white p-[0.7rem] rounded text-[14px] cursor-not-allowed hover:bg-transparent hover:text-[#FBB042] transition duration-500"
                : "w-[100%] bg-[#FBB042] border border-[#FBB042] text-white p-[0.7rem] rounded text-[14px] hover:bg-transparent hover:text-[#FBB042] transition duration-500"
            }
          >
          {translationState?.lan === "En" && language?.getResetLink[0]}
          {translationState?.lan === "Am" && language?.getResetLink[1]}
          {translationState?.lan === "Or" && language?.getResetLink[2]}
          {translationState?.lan === "Tg" && language?.getResetLink[3]}
          {translationState?.lan === "Sm" && language?.getResetLink[4]}
          {translationState?.lan === "Af" && language?.getResetLink[5]}
          </button>
        </div>}
       
        <div className="w-[90%] mx-auto text-[14px] flex justify-center items-center gap-[10px]">
          <AiOutlineArrowLeft />
          <a href="/login">
          {translationState?.lan === "En" && language?.backToLogin[0]}
          {translationState?.lan === "Am" && language?.backToLogin[1]}
          {translationState?.lan === "Or" && language?.backToLogin[2]}
          {translationState?.lan === "Tg" && language?.backToLogin[3]}
          {translationState?.lan === "Sm" && language?.backToLogin[4]}
          {translationState?.lan === "Af" && language?.backToLogin[5]}
          </a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
