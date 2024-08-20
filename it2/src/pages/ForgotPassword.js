import React,{useState,useEffect} from 'react'
import {FaKey} from 'react-icons/fa'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import apiRequest from '../utils/request';
import { ToastContainer,toast } from 'react-toastify';
// import { translationAction } from '../REDUX/slices/translationSlice';
import ServerError from '../components/ServerError';
import {  useSelector } from "react-redux";
import Loading from '../components/Loading';
function ForgotPassword() {
  // const dispatch = useDispatch();
  const translationState = useSelector((state) => state.translation);
  const [email, setEmail] = useState("");
  const [rateLimitTimer, setRateLimitTimer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleForgotPassword = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);

      await apiRequest
        .post(
          "/it_user_api/forgot_it_user",
          { email: email },
          {
            headers: {
              get_itusers_forgot_api: process.env.REACT_APP_GET_ITUSERS_FORGOT_API,

            },
          }
        )
        .then((response) => {
          
          if (response?.status === 200) {
            setLoading(false);
            setEmail("");
            translationState?.lan ==="En" ?   toast.success(response?.data?.Message_en):  toast.success(response?.data?.Message_am);;
          
          }
        })
        .catch((error) => {
          setLoading(false);
          if(error?.response?.status ===500){
            setServerError(true)
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
    <div className="w-[100%] flex flex-col  items-center h-[100vh]">
   <ToastContainer theme='light'/>
   {/* <div className="w-[100%] h-[60px] flex items-center z-[100] bg-white border">
        <div className="w-[80%] mx-auto flex justify-end items-center">
          <select
            onChange={(e) => dispatch(translationAction.setLan(e.target.value))}
            className="py-1 px-4 border border-gray-300 rounded-[5px] text-[14px] text-[#0C73B8] outline-none max-lg2:text-[10px]"
          >
            <option value={"En"}>En</option>
            <option value={"Am"}>አማ</option>
          </select>
        </div>
      </div> */}
    <div className=' w-[100%] h-[100%] flex between absolute top-0 left 0'>
    <img className='w-[100%] h-[100%] absolute left-0 top-0 right-0' src={require('../CAS/hero-bg 2.png')} alt="" />
      <img src={require('../CAS/hero-bg 1.png')} alt=""  className='w-[50%] h-[100%] absolute right-0 top-0'/>
    </div>
  <div className="w-[30%] mt-[100px] shadow-md rounded-[10px] bg-white z-[10] p-4 flex flex-col items-center gap-[30px] max-lg2:mt-[50px] max-lg2:w-[50%] max-lg1:w-[70%] max-sm1:w-[90%]">
    <div className="w-[80%] mx-auto flex flex-col mt-[10px] justify-center items-center gap-[20px]">
      <div className="w-[70px] h-[70px] flex items-center justify-center   bg-[#ffefbf] rounded-full">
        <FaKey className=" text-[34px] text-[#FBB042] " />
      </div>

      <span className="text-[20px] text-[#0C73B8]">Forgot password?</span>
    
     
    </div>

    <div className="w-[80%] mx-auto flex flex-col gap-[10px]">
     <div>
      <span className="text-[14px] font-bold text-[#0C73B8]">Email</span>
      {/* {emailSent && <span className="text-[12px] font-bold text-green-600 flex items-center gap-[10px]"><AiFillCheckCircle />  Email Sent: please check your email</span>} */}
     </div>
      <input
        type="email"
        placeholder="Enter your email"
        onChange={(e)=>setEmail(e.target.value)}
        className="border border-[#FBB042] outline-none py-3 px-4 rounded-[5px] text-[14px] w-[100%]"
      />
    </div>
    {loading ? <Loading addtionalStyle={"flex justify-center items-center my-[20px]"}/>: rateLimitTimer ?     <p className="text-[12px] my-[10px] text-gray-500 text-center">Please wait 3 minutes before retrying.</p>:  <div className="w-[80%] mx-auto">
      <button 
      onClick={handleForgotPassword} 
      className="w-[100%] bg-[#FBB042] py-2 px-4 text-white rounded-[5px]">
      Get reset link
      </button>
    </div>}
   
    <div className="w-[90%] mx-auto text-[14px] flex justify-center items-center gap-[10px]">
      <AiOutlineArrowLeft />
      <a href="/login">Back to Login</a>
    </div>
  </div>
</div>
  )
}

export default ForgotPassword