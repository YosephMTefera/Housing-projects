import React,{useEffect, useState} from "react";
import Navbar from "../Navbar";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate,useLocation } from "react-router-dom";
import apiRequest from "../../utils/request";
import {useDispatch,useSelector} from 'react-redux'
import { applicationAction } from "../../REDUX/slices/applicationSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../ServerError";
import Loading from "../Loading";
import { language } from "../../utils/part-1lan";

function OTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const {email} = location.state;
  const translationState = useSelector((state)=>state.translation);
  const [otp,setOtp] = useState("");
  const [rateLimitTimer, setRateLimitTimer] = useState(null);
  const [loading,setLoading] = useState(false);
  const [serverError,setServerError] = useState(false);

  const validateOTP = async ()=>{
    try {
      setLoading(true);

      await apiRequest.post('/customer_user_api/validate_customer_otp',{email,otp},{headers:{
        get_cusval_api:process.env.REACT_APP_GET_CUSVAL_API,
      }}).then(()=>{
        setLoading(false);
        navigate('/login');
        dispatch(applicationAction.setOtpScreen(false))
       

      }).catch((error)=>{
        setLoading(false);
        if(error?.response?.status ===500){
          setServerError(true)
        }
        if(error?.response?.status === 429){

          setRateLimitTimer(180);
        
        }
        translationState.lan ==="En" && toast.error(error?.response?.data?.Message_en)
        translationState.lan ==="Am" && toast.error(error?.response?.data?.Message_em)
      })
      
    } catch (error) {
      setServerError(true)
      
    }
  }

  const resendOTP = async ()=>{
    try {
      setLoading(true);

      await apiRequest.put('/customer_user_api/resend_customer_otp',{email},{headers:{
        get_cusresend_api:process.env.REACT_APP_GET_CUSRESEND_API,
      }}).then((res)=>{
        setLoading(false);
      
      translationState?.lan ==="En" && toast.success(res?.data?.Message_en);
      translationState?.lan ==="Am" && toast.success(res?.data?.Message_am)
       

      }).catch((error)=>{
        setLoading(false);
        if(error?.response?.status ===500){
          setServerError(true)
        }
        translationState.lan ==="En" && toast.error(error?.response?.data?.Message_en)
        translationState.lan ==="Am" && toast.error(error?.response?.data?.Message_em)
      })
      
    } catch (error) {
      setServerError(true)
      
    }
  }

  useEffect(() => {
    if (rateLimitTimer) {
      const timer = setInterval(() => {
        setRateLimitTimer((prev) => (prev > 1 ? prev - 1 : null));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [rateLimitTimer]);

  if(serverError) return <ServerError />
  return (
    <div className="w-[100%] min-h-[100vh] p-2 bg-gray-50">
      <Navbar />
      <ToastContainer  theme="light"/>
      <div
       
        className="w-[90%] mx-auto mt-[120px]  text-[#0C73B8] cursor-pointer flex items-center gap-[10px]"
      >
        <MdOutlineArrowBackIosNew  onClick={() => navigate(-1)} className="text-[20px]" />
        <span  onClick={() => navigate(-1)} className="font-bold">Back</span>
      </div>
      <div className="w-[80%]  mx-auto max-md1:w-[90%]">
        <div class="w-[100%] relative flex flex-col justify-center overflow-hidden  py-12">
          <div class="w-[50%] min-h-[300px] relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto   rounded-2xl max-lg2:w-[80%] max-lg:w-[100%]">
            <div class="mx-auto flex w-full flex-col space-y-16">
              <div class="flex flex-col items-center justify-center text-center space-y-2">
                <div class="font-bold text-3xl max-sm1:text-xl">
                  <p className="text-[#0C73B8]">
                  {translationState?.lan==="En" && language?.verifyYourEmail[0]}
                  {translationState?.lan==="Am" && language?.verifyYourEmail[1]} 
                  </p>
                </div>
                <div class="flex flex-row text-sm font-medium text-gray-400">
                  <p>   {translationState?.lan==="En" && language?.weHaveSentACode[0]}
                  {translationState?.lan==="Am" && language?.weHaveSentACode[1]} {email}</p>
                </div>
              </div>

              <div className="w-[100%]">
                <div className="w-[100%]">
                  <div class="flex flex-col space-y-16">
                    <div className="w-[100%] mx-auto   flex flex-row items-center gap-[20px] justify-between max-sm1:w-[90%]">
                    <div className="w-[50%] mx-auto max-sm1:w-[100%]">
                      <input type="number" onChange={(e)=>setOtp(e.target.value)} className="w-[100%] py-2 px-4 rounded-[5px] border border-gray-300 outline-none"/>
                    </div>
                     
                    </div>

                    <div className="flex flex-col space-y-5">
                      <div className="flex justify-center items-center ">
                        {loading ? <Loading addtionalStyle={"flex justify-center items-center my-[10px]"} />:rateLimitTimer ?     <p className="text-[12px] my-[10px] text-gray-500 text-center">Please wait 3 minutes before retrying.</p>:    <button onClick={validateOTP} className="max-sm1:w-[100%] flex flex-row items-center justify-center text-center w-[50%] border rounded-xl outline-none py-5 bg-[#0C73B8] border-none text-white text-sm shadow-sm">
                        {translationState?.lan==="En" && language?.verifyEmail[0]}
                        {translationState?.lan==="Am" && language?.verifyEmail[1]}
                        </button>}
                     
                      </div>

                      <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                        <p>     {translationState?.lan==="En" && language?.didntrecievecode[0]}
                        {translationState?.lan==="Am" && language?.didntrecievecode[1]}?</p>{" "}
                        <button
                          className="flex flex-row items-center text-[#0C73B8]"
                        
                           onClick={resendOTP}
                        
                        >
                            {translationState?.lan==="En" && language?.resend[0]}
                            {translationState?.lan==="Am" && language?.resend[1]}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTP;
