import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosMail } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import apiRequest from "../../utils/request";
import Loading from "../SubComponents/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useSelector } from "react-redux";
import ServerError from "../ServerError";
import Footer from "../Footer";
import { language } from "../../utils/part-1lan";

function SignIn() {
  const navigate = useNavigate();
  const translationState = useSelector((state) => state.translation);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rateLimitTimer, setRateLimitTimer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await apiRequest
        .post(
          "/customer_user_api/login_customer_user",
          {
            email,
            password,
          },
          {
            headers: {
              get_cuserlog_api: process.env.REACT_APP_GET_CUSERLOG_API,
            },
          }
        )
        .then((res) => {
          setLoading(false);

          sessionStorage.setItem("tID", res?.data?.token);

          window.location.href = "/dashboard";
        })
        .catch((error) => {
     
          setLoading(false);
          if (error?.response?.status === 500) {
            setServerError(true);
          }
          if(error?.response?.status === 429){

            setRateLimitTimer(180);
          
          }
          translationState?.lan === "En" &&
            toast.error(error?.response?.data?.Message_en);
          translationState?.lan === "Am" &&
            toast.error(error?.response?.data?.Message_am);
            translationState?.lan === "Or" &&
            toast.error(error?.response?.data?.Message_or);
            translationState?.lan === "Tg" &&
            toast.error(error?.response?.data?.Message_tg);
            translationState?.lan === "Sm" &&
            toast.error(error?.response?.data?.Message_sm);
            translationState?.lan === "Af" &&
            toast.error(error?.response?.data?.Message_af);
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
    <div className="w-[100%]   mx-auto   mt-[150px] h-[90%] max-lg2:mt-[100px]">
      <ToastContainer theme="light" />
      <Navbar />
      <div className="w-[90%] mx-auto my-[20px] text-[#0C73B8] cursor-pointer flex items-center gap-[10px]">
        <MdOutlineArrowBackIosNew
          onClick={() => navigate("/")}
          className="text-[20px]"
        />
        {translationState?.lan==="En" &&     <span onClick={() => navigate("/")} className="font-bold">
          Home
        </span>}
        {translationState?.lan==="Am" &&     <span onClick={() => navigate("/")} className="font-bold text-[20px]">
        መነሻ
        </span>}
        {translationState?.lan==="Or" &&     <span onClick={() => navigate("/")} className="font-bold">
        madda
        </span>}
        {translationState?.lan==="Tg" &&     <span onClick={() => navigate("/")} className="font-bold text-[20px]">
        መሰረት
        </span>}
        {translationState?.lan==="Sm" &&     <span onClick={() => navigate("/")} className="font-bold">
        asal ahaan
        </span>}
        {translationState?.lan==="Af" &&     <span onClick={() => navigate("/")} className="font-bold">
        Home
        </span>}
      </div>
     
      <div className="w-[100%]  min-h-[70vh] flex justify-center items-center">
        <div className="w-[30%]   flex flex-col justify-center items-center mx-auto border border-gray-200 rounded-[10px]  p-4 max-lg:w-[70%] max-sm1:w-[90%]">
          <div className="w-[100%] text-[40px] flex flex-col justify-center items-center  font-bold max-lg2:text-[30px] max-sm1:text-[24px]">
           {translationState?.lan ==="En" &&    <span className="text-[#0C73B8] text-center">
            {language?.logintoyourAccount[0]}
            </span>}
            {translationState?.lan ==="Am" &&    <span className="text-[#0C73B8] text-center">
            {language?.logintoyourAccount[1]}
            </span>}
            {translationState?.lan ==="Or" &&    <span className="text-[#0C73B8] text-center">
            {language?.logintoyourAccount[2]}
            </span>}
            {translationState?.lan ==="Tg" &&    <span className="text-[#0C73B8] text-center">
            {language?.logintoyourAccount[3]}
            </span>}
            {translationState?.lan ==="Sm" &&    <span className="text-[#0C73B8] text-center">
            {language?.logintoyourAccount[4]}
            </span>}
            {translationState?.lan ==="Af" &&    <span className="text-[#0C73B8] text-center">
            {language?.logintoyourAccount[5]}
            </span>}
         
            <div className="w-[30%] mt-[10px] h-[5px] bg-[#FBB042] max-lg2:w-[30%] max-lg2:h-[3px] max-md2:w-[20%] max-sm1:w-[40%]"></div>
          </div>
          <div className="w-[80%] mx-auto mt-[20px] flex justify-center items-center">
          {translationState?.lan ==="En" &&    <span className="text-gray-500 text-[14px] text-center">
            {language?.welcomeMessage[0]}
            </span>}
            {translationState?.lan ==="Am" &&    <span className="text-gray-500 text-center">
            {language?.welcomeMessage[1]}
            </span>}
            {translationState?.lan ==="Or" &&    <span className="text-gray-500 text-[14px] text-center">
            {language?.welcomeMessage[2]}
            </span>}
            {translationState?.lan ==="Tg" &&    <span className="text-gray-500 text-center">
            {language?.welcomeMessage[3]}
            </span>}
            {translationState?.lan ==="Sm" &&    <span className="text-gray-500 text-center">
            {language?.welcomeMessage[4]}
            </span>}
            {translationState?.lan ==="Af" &&    <span className="text-gray-500 text-center">
            {language?.welcomeMessage[5]}
            </span>}

          </div>

          <div className="w-[90%] mx-auto flex items-center gap-[10px] bg-gray-100 rounded-[10px] mt-[60px] p-4  border border-[#FBB042] max-lg2:p-3 max-lg2:text-[12px] max-sm1:w-[90%]">
            <IoIosMail className="text-gray-500 " />
            {translationState?.lan==="En" &&     <input
              type="email"
              placeholder={language.email[0] ? language.email[0]:"email" }
              onChange={(e) => setEmail(e?.target?.value)}
              className="w-[100%] bg-transparent outline-none"
            />}
             {translationState?.lan==="Am" &&     <input
              type="email"
              placeholder={language.email[1] ? language.email[1]:"email" }
              onChange={(e) => setEmail(e?.target?.value)}
              className="w-[100%] bg-transparent outline-none"
            />}
              {translationState?.lan==="Or" &&     <input
              type="email"
              placeholder={language.email[2] ? language.email[2]:"email" }
              onChange={(e) => setEmail(e?.target?.value)}
              className="w-[100%] bg-transparent outline-none"
            />}
              {translationState?.lan==="Tg" &&     <input
              type="email"
              placeholder={language.email[3] ? language.email[3]:"email" }
              onChange={(e) => setEmail(e?.target?.value)}
              className="w-[100%] bg-transparent outline-none"
            />}
             {translationState?.lan==="Sm" &&     <input
              type="email"
              placeholder={language.email[4] ? language.email[4]:"email" }
              onChange={(e) => setEmail(e?.target?.value)}
              className="w-[100%] bg-transparent outline-none"
            />}
              {translationState?.lan==="Af" &&     <input
              type="email"
              placeholder={language.email[5] ? language.email[5]:"email" }
              onChange={(e) => setEmail(e?.target?.value)}
              className="w-[100%] bg-transparent outline-none"
            />}
        
          </div>
          <div className="w-[90%] mx-auto flex items-center gap-[10px] bg-gray-100 rounded-[10px] mt-[10px] p-4 border border-[#FBB042] max-lg2:p-3 max-lg2:text-[12px] max-sm1:w-[90%]">
            <RiLockPasswordLine className="text-gray-500 " />
            {translationState?.lan ==="En" &&   <input
              type="password"
              placeholder={language.password[0] ? language.password[0]:"Password" }
              onChange={(e) => setPassword(e?.target?.value)}
              className="w-[100%] bg-transparent outline-none"
            /> }
              {translationState?.lan ==="Am" &&   <input
              type="password"
              placeholder={language.password[1] ? language.password[1]:"Password" }
              onChange={(e) => setPassword(e?.target?.value)}
              className="w-[100%] bg-transparent outline-none"
            /> }
                {translationState?.lan ==="Or" &&   <input
              type="password"
              placeholder={language.password[2] ? language.password[2]:"Password" }
              onChange={(e) => setPassword(e?.target?.value)}
              className="w-[100%] bg-transparent outline-none"
            /> }
               {translationState?.lan ==="Tg" &&   <input
              type="password"
              placeholder={language.password[3] ? language.password[3]:"Password" }
              onChange={(e) => setPassword(e?.target?.value)}
              className="w-[100%] bg-transparent outline-none"
            /> }
               {translationState?.lan ==="Sm" &&   <input
              type="password"
              placeholder={language.password[4] ? language.password[4]:"Password" }
              onChange={(e) => setPassword(e?.target?.value)}
              className="w-[100%] bg-transparent outline-none"
            /> }
               {translationState?.lan ==="Af" &&   <input
              type="password"
              placeholder={language.password[5] ? language.password[5]:"Password" }
              onChange={(e) => setPassword(e?.target?.value)}
              className="w-[100%] bg-transparent outline-none"
            /> }
         
         
          </div>

          {loading ? (
            <Loading
              addtionalStyle={
                "w-[80%] mx-auto mt-[30px] mx-auto flex items-center justify-center"
              }
            />
          ) : (
            <div className="w-[90%] mx-auto mt-[10px]  max-sm1:w-[90%]">
               {rateLimitTimer ?  <>
                {translationState?.lan === "En" && (
          <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
            Please wait 3 minutes before retrying.
          </p>
        )}
        {translationState?.lan === "Am" && (
          <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
            እንደገና ከመሞከሮዎ በፊት 3 ደቂቃ ይጠብቁ።
          </p>
        )}
        {translationState?.lan === "Or" && (
          <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
            Maaloo irra deebi'anii yaaluun dura daqiiqaa 3 eegaa
          </p>
        )}
        {translationState?.lan === "Tg" && (
          <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
            በጃኹም ቅድሚ ዳግማይ ምፍታንኩም 3 ደቓይቕ ተጸበዩ።
          </p>
        )}
        {translationState?.lan === "Sm" && (
          <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
            Fadlan sug 3 daqiiqo ka hor inta aanad isku dayin
          </p>
        )}
        {translationState?.lan === "Af" && (
          <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
            Please wait 3 minutes before retrying.
          </p>
        )}
               </>:   <button
                onClick={handleSignIn}
                className="w-[100%] py-4 font-bold text-white rounded-[10px] mx-auto bg-[#FBB042] max-lg2:py-3 max-lg2:text-[12px]"
              >
                {translationState?.lan ==="En" && language.login[0]}
                {translationState?.lan ==="Am" && language.login[1]}
                {translationState?.lan ==="Or" && language.login[2]}
                {translationState?.lan ==="Tg" && language.login[3]}
                {translationState?.lan ==="Sm" && language.login[4]}
                {translationState?.lan ==="Af" && language.login[5]}
            
              </button>}
           
            </div>
          )}

          <div className="w-[90%] mx-auto mt-[10px] flex justify-end items-center  max-sm1:w-[90%]">
            <span
              onClick={() => navigate("/forgotpassword")}
              className="text-[14px]  text-[#777777] hover:underline cursor-pointer max-lg2:text-[12px]"
            >
              {translationState?.lan==="En" && language.forgotPassword[0] }
              {translationState?.lan==="Am" && language.forgotPassword[1] }
              {translationState?.lan==="Or" && language.forgotPassword[2] }
              {translationState?.lan==="Tg" && language.forgotPassword[3] }
              {translationState?.lan==="Sm" && language.forgotPassword[4] }
              {translationState?.lan==="Af" && language.forgotPassword[5] }?
             
            </span>
          </div>
          <div className="w-[70%] mt-[20px] flex items-center justify-between  max-lg2:w-[80%]  max-sm1:w-[90%]">
            <div className="w-[40%] h-[1px] bg-gray-300"></div>
            {translationState?.lan ==="En" &&  <span className="text-[14px]  max-lg2:text-[12px]">OR</span>}
            {translationState?.lan ==="Am" &&  <span className="text-[14px]  max-lg2:text-[12px]">ወይም</span>}
            {translationState?.lan ==="Or" &&  <span className="text-[14px]  max-lg2:text-[12px]">Yookaan</span>}
            {translationState?.lan ==="Tg" &&  <span className="text-[14px]  max-lg2:text-[12px]">ወይ</span>}
            {translationState?.lan ==="Sm" &&  <span className="text-[14px]  max-lg2:text-[12px]">Ama</span>}
            {translationState?.lan ==="Af" &&  <span className="text-[14px]  max-lg2:text-[12px]">OR</span>}

           
            <div className="w-[40%] h-[1px] bg-gray-300"></div>
          </div>
          <div className="w-[90%] mx-auto mt-[30px] max-lg2:mt-[10px]  max-sm1:w-[90%]">
            <button
              onClick={() => navigate("/register")}
              className="w-[100%] py-4 text-[#FBB042] font-bold rounded-[10px] mx-auto bg-transparent border border-[#FBB042] max-lg2:py-3 max-lg2:text-[12px]"
            >
           {translationState?.lan==="En" && language.register[0] }
              {translationState?.lan==="Am" && language.register[1] }
              {translationState?.lan==="Or" && language.register[2] }
              {translationState?.lan==="Tg" && language.register[3] }
              {translationState?.lan==="Sm" && language.register[4] }
              {translationState?.lan==="Af" && language.register[5] }
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignIn;
