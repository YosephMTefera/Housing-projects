import React,{useState,useEffect} from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'
import apiRequest from '../../utils/request';
import {jwtDecode} from 'jwt-decode';
import ServerError from '../ServerError';
import { useDispatch, useSelector } from 'react-redux';
import { applicationAction } from '../../REDUX/slices/applicationSlice';
import { translationAction } from '../../REDUX/slices/translationSlice';
import { language } from '../../utils/part-1lan';



function DashboardNavbar() {
  const token = sessionStorage.getItem('tID');
  const decodedToken = jwtDecode(token);
  const userID = decodedToken?.user?.id;
  const dispatch = useDispatch();
  const translationState = useSelector((state)=>state.translation);
  const applicationState = useSelector((state)=>state.application);
  const [user,setUser] = useState({});
  const [rateLimitTimer, setRateLimitTimer] = useState(null);
  const [serverError,setServerError] = useState(false);

  

  useEffect(()=>{

   try {
    apiRequest.get(`/customer_user_api/get_customer_user/${userID}`,{
      headers:{
        get_cuserlist_api:process.env.REACT_APP_GET_CUSERLIST_API,
        Authorization:`Bearer ${token}`
      }
    }).then((res)=>{
      
      setUser(res.data);
    }).catch((error)=>{
      if(error?.response?.status ===500){
        setServerError(true);
      }
      if(error?.response?.status === 429){
          
        setRateLimitTimer(180);
      
    }
      
    })
    
   } catch (error) {
    setServerError(true)
    
   }
  },[userID,token])

  useEffect(() => {
    if (rateLimitTimer) {
      const timer = setInterval(() => {
        setRateLimitTimer((prev) => (prev > 1 ? prev - 1 : null));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [rateLimitTimer]);

  
  if(rateLimitTimer) return <div className="w-[80%] mx-auto my-[30px] min-h-[300px] rounded-[10px] bg-white flex justify-center items-center">
    <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">Please wait 3 minutes before retrying.</p>
  </div>



  if(serverError) return <ServerError/>

  return (
    <div className="w-[100%] bg-white h-[100px] border flex items-center sticky top-0 z-[100] max-lg2:h-[80px]">
      <div className="w-[90%] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <div className="hidden max-md2:block cursor-pointer"
           onClick={()=>dispatch(applicationAction.setSideBarOpened(!applicationState.sidebarOpened))}
           >
            <BiMenuAltLeft className="text-[40px] text-[#0C73B8]" />
          </div>
          <div className='font-bold text-[20px] max-lg2:text-[16px] max-md2:hidden'>
            <span> {translationState?.lan ==="En" &&  <span className="text-[#FBB042]">{language?.Hello[0]}</span> }
            {translationState?.lan ==="Am" &&  <span className="text-[#FBB042]">{language?.Hello[1]}</span> }
            {translationState?.lan ==="Or" &&  <span className="text-[#FBB042]">{language?.Hello[2]}</span> }
            {translationState?.lan ==="Tg" &&  <span className="text-[#FBB042]">{language?.Hello[3]}</span> }
            {translationState?.lan ==="Sm" &&  <span className="text-[#FBB042]">{language?.Hello[4]}</span> }
            {translationState?.lan ==="Af" &&  <span className="text-[#FBB042]">{language?.Hello[5]}</span> } {user ? <span className='text-[#0C73B8]'>{user?.firstname}!</span> :"-"}</span>
          </div>
          <div className="max-md2:w-[60px] max-md2:h-[60px]">
           

            <img className="w-[100%] h-[100%] object-cover border rounded-full hidden max-md2:block" src={require("../../CAS/HousingDevelopmentLogo.png")} alt=""  />
          </div>
        
        </div>

        <div className="flex flex-col items-center font-semibold uppercase max-lg1:hidden">
        {translationState?.lan==="En" &&  <span className="uppercase text-[#0C73B8] max-lg2:text-[12px]">
            {language?.companyName[0]}
            </span>}
            {translationState?.lan==="Am" &&  <span className="uppercase text-[20px] text-[#0C73B8] max-lg2:text-[12px]">
            {language?.companyName[1]}
            </span>}
            {translationState?.lan==="Or" &&  <span className="uppercase  text-[#0C73B8] max-lg2:text-[12px]">
            {language?.companyName[2]}
            </span>}
            {translationState?.lan==="Tg" &&  <span className="uppercase text-[20px] text-[#0C73B8] max-lg2:text-[12px]">
            {language?.companyName[3]}
            </span>}
            {translationState?.lan==="Sm" &&  <span className="uppercase  text-[#0C73B8] max-lg2:text-[12px]">
            {language?.companyName[4]}
            </span>}
            {translationState?.lan==="Af" &&  <span className="uppercase  text-[#0C73B8] max-lg2:text-[12px]">
            {language?.companyName[5]}
            </span>}
            {translationState?.lan ==="En" &&  <span className="text-[#FBB042] max-lg2:text-[10px]">{language?.customerDashboard[0]}</span> }
            {translationState?.lan ==="Am" &&  <span className="text-[#FBB042] max-lg2:text-[10px]">{language?.customerDashboard[1]}</span> }
            {translationState?.lan ==="Or" &&  <span className="text-[#FBB042] max-lg2:text-[10px]">{language?.customerDashboard[2]}</span> }
            {translationState?.lan ==="Tg" &&  <span className="text-[#FBB042] max-lg2:text-[10px]">{language?.customerDashboard[3]}</span> }
            {translationState?.lan ==="Sm" &&  <span className="text-[#FBB042] max-lg2:text-[10px]">{language?.customerDashboard[4]}</span> }
            {translationState?.lan ==="Af" &&  <span className="text-[#FBB042] max-lg2:text-[10px]">{language?.customerDashboard[5]}</span> }
        
        </div>
        <div className="flex items-center gap-[10px]">
        <select value={translationState?.lan} onChange={(e)=>dispatch(translationAction.setLan(e.target.value))} className="py-3  border border-gray-300 rounded-[5px] text-[14px] bg-transparent text-[#0C73B8] outline-none max-lg2:text-[10px]">
            
            <option value={"En"}>English</option>
            <option value={"Am"}>አማርኛ</option>
            {/* <option value={"Or"}>Afaan Oromo</option>
            <option value={"Tg"}>Tigrigna</option>
            <option value={"Af"}>Afar</option>
            <option value={"Sm"}>Somali</option> */}
           
            </select>
      
          <div className="w-[50px] h-[50px] bg-[#0C73B8] text-white rounded-full flex justify-center items-center">
       

            {user?.picture ?   <img
              src={`${process.env.REACT_APP_BACKEND_IMAGES}/CustomerImages/${user?.picture}`}
              className="w-[100%] h-[100%] object-cover rounded-full"
              alt=""
            />:<div className="w-[50px] h-[50px] bg-[#0C73B8] text-white rounded-full flex justify-center items-center">
              <span>{user?.firstname?.[0]}</span>
              </div>}
          
          </div>

          {user &&  <div className="flex flex-col max-sm1:hidden">
            <span className="font-bold text-[#0C73B] capitalize max-lg2:text-[12px]">
              {user?.firstname} {user?.middlename} {user?.lastname}
            </span>
            {translationState?.lan ==="En" &&  <span className="text-gray-500 text-[14px]  max-lg2:text-[10px]">{language?.customer[0]}</span> }
            {translationState?.lan ==="Am" &&  <span className="text-gray-500 text-[14px]  max-lg2:text-[10px]">{language?.customer[1]}</span> }
            {translationState?.lan ==="Or" &&  <span className="text-gray-500 text-[14px]  max-lg2:text-[10px]">{language?.customer[2]}</span> }
            {translationState?.lan ==="Tg" &&  <span className="text-gray-500 text-[14px]  max-lg2:text-[10px]">{language?.customer[3]}</span> }
            {translationState?.lan ==="Sm" &&  <span className="text-gray-500 text-[14px]  max-lg2:text-[10px]">{language?.customer[4]}</span> }
            {translationState?.lan ==="Af" &&  <span className="text-gray-500 text-[14px]  max-lg2:text-[10px]">{language?.customer[5]}</span> }
    
          </div>}
         
        </div>
      </div>
    </div>
  )
}

export default DashboardNavbar