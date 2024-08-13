import React,{useState,useEffect} from 'react'
import { FaBriefcase } from "react-icons/fa";
import {FaPeopleGroup} from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../utils/request';
import {useDispatch, useSelector} from 'react-redux'
import {ToastContainer,toast} from 'react-toastify'
import { MdAssignmentLate, MdWatchLater } from 'react-icons/md';
import { fetchCustomers } from '../../REDUX/slices/customerSlice';
import { language } from '../../utils/part-1lan';


function DashboardCards() {
  const navigate  = useNavigate();
  const token = sessionStorage.getItem('tID');
  const dispatch = useDispatch()
  const customerList = useSelector((state) => state.customers);
  const translationState = useSelector((state)=>state.translation);
  const [dashboardAnalytics,setDashboardAnalytics] = useState({});
  const [lateCaseAnalysis,setLateCaseAnalysis] = useState({});

  useEffect(()=>{
    apiRequest.get('/office_user_api/get_analytics',{headers:{
      get_users_api:process.env.REACT_APP_GET_USERS_API,
      Authorization:`Bearer ${token}`
    }}).then((res)=>{
      setDashboardAnalytics(res.data);
    }).catch((error)=>{
      translationState?.lan ==="En" &&   toast.error(error?.response?.data?.Message_en);
      translationState?.lan ==="Am" &&   toast.error(error?.response?.data?.Message_am);

    })
  },[token,translationState.lan])


  useEffect(()=>{
    apiRequest.get('/customer_case_api/get_late_case',{headers:{
      get_ltecanalysis_api:process.env.REACT_APP_GET_LTECANALYSIS_API,
      Authorization:`Bearer ${token}`
    }}).then((res)=>{
      // ("Current Late Cases: ",res.data)
      setLateCaseAnalysis(res.data);
    }).catch((error)=>{
      translationState?.lan ==="En" &&   toast.error(error?.response?.data?.Message_en);
      translationState?.lan ==="Am" &&   toast.error(error?.response?.data?.Message_am);

    })
  },[token,translationState.lan])

  useEffect(() => {
    dispatch(fetchCustomers({page:"",sort:"",name:"",phone:"",status:""}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="w-[100%] min-h-[150px] flex justify-between items-center gap-[10px]">
    <ToastContainer theme='light'/>
    
    {/* cases */}
    <div onClick={()=>navigate('/totalcases')} className="w-[25%] h-[150px] p-2 bg-white rounded-[10px] border border-gray-300 cursor-pointer max-lg2:h-[120px]">
      <div className="w-[80%] my-[20px] mx-auto flex justify-between max-lg2:w-[90%]">
        <div className="flex flex-col gap-[10px]">
          <span className="text-[12px] text-gray-500 max-lg2:text-[10px]">
          {translationState?.lan ==="En" && language?.totalCases[0]}
          {translationState?.lan ==="Am" && language?.totalCases[1]}
          </span>
          <span className="font-bold text-[40px] text-[#0C73B8] max-lg2:text-[30px]">{dashboardAnalytics?.totalCases}</span>
     
        </div>
        {/* icon */}
        <div className="w-[80px] h-[80px]  flex justify-center  rounded-full">
          <FaBriefcase className="text-[#0C73B8] text-[40px] max-lg2:text-[30px]" />
        </div>
      </div>
    </div>
    
     <div onClick={()=>navigate('/totallatecases')} className="w-[25%] h-[150px] p-2 bg-white rounded-[10px] border border-gray-300 cursor-pointer max-lg2:h-[120px]">
      <div className="w-[80%] my-[20px] mx-auto flex justify-between max-lg2:w-[90%]">
        <div className="flex flex-col gap-[10px]">
          <span className="text-[12px] text-gray-500 max-lg2:text-[10px]">
          {translationState?.lan ==="En" && language?.totalLateCases[0]}
          {translationState?.lan ==="Am" && language?.totalLateCases[1]}
          </span>
          <span className="font-bold text-[40px] text-[#0C73B8] max-lg2:text-[30px]">{dashboardAnalytics?.lateCases}</span>
        </div>
        {/* icon */}
        <div className="w-[80px] h-[80px]  flex justify-center  rounded-full">
          <MdWatchLater  className="text-[#0C73B8] text-[40px] max-lg2:text-[30px]" />
        </div>
      </div>
    </div>
    <div onClick={()=>navigate('/currentlatecases')} className="w-[25%] h-[150px] p-2 bg-white rounded-[10px] border border-gray-300 cursor-pointer max-lg2:h-[120px]">
      <div className="w-[80%] my-[20px] mx-auto flex justify-between max-lg2:w-[90%]">
        <div className="flex flex-col gap-[10px]">
          <span className="text-[12px] text-gray-500 max-lg2:text-[10px]">
          {translationState?.lan ==="En" && language?.currentLateCases[0]}
          {translationState?.lan ==="Am" && language?.currentLateCases[1]}
          </span>
          <span className="font-bold text-[40px] text-[#0C73B8] max-lg2:text-[30px]">{lateCaseAnalysis ? lateCaseAnalysis?.totalCases:'-'}</span>
        </div>
        {/* icon */}
        <div className="w-[80px] h-[80px] flex justify-center  rounded-full">
          <MdAssignmentLate  className="text-[#0C73B8] text-[40px] max-lg2:text-[30px]" />
        </div>
      </div>
    </div>

    <div  className="w-[25%] h-[150px] p-2 bg-white rounded-[10px] border border-gray-300 max-lg2:h-[120px]">
      <div className="w-[80%] my-[20px] mx-auto flex justify-between max-lg2:w-[90%]">
        <div className="flex flex-col gap-[10px]">
          <span className="text-[12px] text-gray-500 max-lg2:text-[10px]">
          {translationState?.lan ==="En" && language?.totalOnlineCustomers[0]}
          {translationState?.lan ==="Am" && language?.totalOnlineCustomers[1]}
          </span>
          <span className="font-bold text-[40px] text-[#0C73B8] max-lg2:text-[30px]">{customerList?.customers?.totalCustomers}</span>
        </div>
     
        <div className="w-[80px] h-[80px]  flex justify-center  rounded-full">
          <FaPeopleGroup  className="text-[#0C73B8] text-[40px] max-lg2:text-[30px]" />
        </div>
      </div>
    </div>
   
   
  </div>
  )
}

export default DashboardCards