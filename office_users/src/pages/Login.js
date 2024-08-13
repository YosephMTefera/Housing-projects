import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError from '../components/ServerError';
import apiRequest from '../utils/request';
import Loading from '../components/Loading';
import {useDispatch,useSelector} from 'react-redux'
import { translationAction } from '../REDUX/slices/translationSlice';
import { language } from '../utils/part-1lan';
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const translationState = useSelector((state)=>state.translation);
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [rateLimitTimer, setRateLimitTimer] = useState(null);
  const [loading,setLoading] = useState("");
  const [serverError,setServerError] = useState("");


  const handleLogin = async ()=>{
    try {
      setLoading(true);
      await apiRequest
        .post(
          "/office_user_api/login_office_user",
          {
            username,
            password,
          },
          {
            headers: {
              get_user_login_api: process.env.REACT_APP_GET_USER_LOGIN_API,
            },
          }
        )
        .then((res) => {
          setLoading(false);
         
          sessionStorage.setItem('tID',res?.data?.token)
          window.location.href = '/'
        })
        .catch((error) => {
          setLoading(false);
          if(error?.response?.status ===500){
            setServerError(true);

          }
          if(error?.response?.status === 429){

            setRateLimitTimer(180);
            // toast.error("Too many attempts. Please try again later.")
          }
          translationState?.lan === "En" ? toast.error(error.response.data.Message_en): toast.error(error.response.data.Message_am)
       
        });
      
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
    <div className='w-[100%] min-h-[100vh] flex flex-col  items-center rounded-[20px] shadow-lg'>
  <ToastContainer theme='light'/>
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
    <div className="w-[30%] my-[100px] mx-auto flex  min-h-full flex-col items-center justify-center px-6 py-12  lg:px-8 bg-white shadow-xl rounded-[20px] max-lg2:my-[20px] max-lg2:w-[40%] max-lg:w-[70%] max-md1:w-[90%] max-sm1:w-[95%]">
  <div className="w-[100px] min-h-[100px] rounded-full flex justify-center items-center" >
    <img className=" w-[100px] h-[100px] border object-cover rounded-full" src={require('../CAS/housingLogo.png')} alt=""/>

  </div>
  <div className='my-[10px] flex flex-col gap-[5px] justify-center items-center'>
    <span className='font-bold text-[#0C73B8]'>
    {translationState?.lan ==="En" && language?.welcomeMessage[0]}
    {translationState?.lan ==="Am" && language?.welcomeMessage[1]}
    </span>
    <span className='text-gray-500 text-[14px]'>
    {translationState?.lan ==="En" && language?.welcomeSubtitle[0]}
    {translationState?.lan ==="Am" && language?.welcomeSubtitle[1]}
    </span>
  </div>
  <div className='w-[80%] my-[20px] flex flex-col gap-[10px] max-lg2:my-[5px]'>
    <span className='text-[20px] font-bold max-lg2:text-[16px]'>
      {translationState?.lan ==="En" && language?.login[0]}
      {translationState?.lan ==="Am" && language?.login[1]}
    </span>
    <span className='text-gray-500 text-[14px] max-lg2:text-[12px]'>
    {translationState?.lan ==="En" && language?.enteryourCred[0]}
    {translationState?.lan ==="Am" && language?.enteryourCred[1]}
     </span>
  </div>

  <div className="w-[80%]">
    <div className="space-y-6 max-lg2:space-y-2">
      <div>
        <label  className="block text-sm font-bold leading-6 text-gray-900 max-lg2:text-[12px]">
        {translationState?.lan ==="En" && language?.username[0]}
        {translationState?.lan ==="Am" && language?.username[1]}
        </label>
        <div className="mt-2">
          <input  type="text" 
          onChange={(e)=>setUsername(e.target.value)} 
           required className="block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset outline-none p-3  sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label  className="block text-sm font-bold leading-6 text-gray-900">
          {translationState?.lan ==="En" && language?.password[0]}
          {translationState?.lan ==="Am" && language?.password[1]}
          </label>
          
        </div>
        <div className="mt-2">
          <input type="password" 
          onChange={(e)=>setPassword(e.target.value)} 
          required className="block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset outline-none p-3 sm:text-sm sm:leading-6"/>
       
        </div>
        <div className="text-sm w-[100%] flex justify-end mt-[10px] max-lg2:text-[12px]">
            <button  className="font-semibold text-[#0C73B8]" onClick={()=>navigate('/forgotpassword')}>
            {translationState?.lan ==="En" && language?.forgotPassword[0]}
            {translationState?.lan ==="Am" && language?.forgotPassword[1]}
              ?</button>
          </div>
      </div>

      {loading ? <Loading addtionalStyle={"flex justify-center items-center"}/> :  rateLimitTimer ?     <p className="text-[12px] my-[10px] text-gray-500 text-center">Please wait 3 minutes before retrying.</p>: <button onClick={handleLogin}  className="flex w-full justify-center rounded-md bg-[#0C73B8] px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  max-lg2:text-[12px]">
        
      {translationState?.lan ==="En" && language?.login[0]}
      {translationState?.lan ==="Am" && language?.login[1]}
        </button>}

      <div>
      
       
      </div>
    </div>

   
  </div>
    

</div>
    
</div>
  )
}

export default Login