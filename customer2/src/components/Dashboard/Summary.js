import React, { useEffect,useState } from "react";
import { TbProgress } from "react-icons/tb";
import CaseSummaryTable from "./CaseSummaryTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchCases } from "../../REDUX/slices/caseSlice";
import {jwtDecode} from 'jwt-decode';
import {VscServerProcess} from 'react-icons/vsc'
import {MdPending, MdVerified} from 'react-icons/md'
import apiRequest from "../../utils/request";
import ServerError from "../ServerError";
import { ToastContainer, toast } from "react-toastify";
import { language } from "../../utils/part-1lan";
import {GiCancel} from 'react-icons/gi'



function Summary() {
  const token = sessionStorage.getItem('tID');
  const decodedToken = jwtDecode(token);
  const userID = decodedToken?.user?.id;
  const dispatch = useDispatch();
  const translationState = useSelector((state)=>state.translation);
  const caseState = useSelector((state) => state?.cases);
  const [customerAnalysis,setCustomerAnalysis] = useState({})
  const [serverError,setServerError] = useState(false);


  useEffect(()=>{

    dispatch(fetchCases({page:"",sort:"",name:"",phone:"",caseNumber:"",status:"",customer_id:userID}))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

 
 



 useEffect(()=>{
  apiRequest.get('/customer_case_api/get_case_cust',{headers:{
    get_cascusanalysis_api:process.env.REACT_APP_GET_CASCUSANALYSIS_API,
    Authorization:`Bearer ${token}`
  }}).then((res)=>{
    setCustomerAnalysis(res.data);
  }).catch((error)=>{
    if(error.response.status ===500){
      setServerError(true)

    }
    if(error?.response?.status === 429){
      toast.error("Too many  attempts. Please try again later.")
    }

  })
 },[token])

 if(caseState?.limitError) return <div className="w-[80%] mx-auto my-[30px] min-h-[300px] rounded-[10px] bg-white flex justify-center items-center">
 <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">Please wait 3 minutes before retrying.</p>
</div>


 if(serverError) return <ServerError />


  return (
    <div className="w-[100%]">
     <ToastContainer theme="light"/>
      <div className="w-[90%] mt-[30px] mx-auto max-md2:w-[95%]">
        <div className="w-[100%]">
          <div className="w-[100%] mx-auto  grid grid-cols-4  gap-[20px] max-lg1:grid-cols-2  max-md1:grid-cols-2 max-sm1:grid-cols-1 max-sm1:w-[80%]">
            <div className="w-[100%] h-[200px] col-span-1 bg-white rounded-[10px] shadow border border-sky-700 border-opacity-50 flex items-center max-lg2:h-[150px]">
              <div className="w-[80%] mx-auto flex flex-col   items-center gap-[20px]">
                <div className="w-[100px] h-[100px] bg-[#1677AA1A] rounded-full flex items-center justify-center text-[#1677AA] max-lg2:w-[70px] max-lg2:h-[70px]">
                  <TbProgress className="text-[30px]" />
                </div>
                <div className="flex items-center gap-[10px] max-md2:flex-row max-md2:items-center max-md2:gap-[10px]">
                  <span className="text-[30px] text-[#1677AA] font-bold  max-lg2:text-[16px]">
                    {customerAnalysis?.totalCases}
                  </span>
                  {translationState?.lan==="En" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.totalCases[0]}</span>}
            {translationState?.lan==="Am" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.totalCases[1]}</span>}
            {translationState?.lan==="Or" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.totalCases[2]}</span>}
            {translationState?.lan==="Tg" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.totalCases[3]}</span>}
            {translationState?.lan==="Sm" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.totalCases[4]}</span>}
            {translationState?.lan==="Af" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.totalCases[5]}</span>}
               
                </div>
              </div>
            </div>

            <div className="w-[100%] h-[200px] col-span-1 bg-white rounded-[10px] shadow border border-sky-700 border-opacity-50 flex items-center max-lg2:h-[150px]">
              <div className="w-[80%] mx-auto flex flex-col items-center gap-[20px] max-md2:flex-col">
                <div className="w-[100px] h-[100px] bg-[#1677AA1A] rounded-full flex items-center justify-center text-[#1677AA] max-lg2:w-[70px] max-lg2:h-[70px]">
                  <MdPending   className="text-[30px]" />
                </div>
                <div className="flex items-center gap-[10px] max-[885px]:flex-row max-md2:items-center max-md2:gap-[10px]">
                  <span className="text-[25px] text-[#1677AA] font-bold max-lg2:text-[16px]">
                 {customerAnalysis?.pendingCases}
                  </span>
                  {translationState?.lan==="En" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.pendingCases[0]}</span>}
            {translationState?.lan==="Am" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.pendingCases[1]}</span>}
            {translationState?.lan==="Or" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.pendingCases[2]}</span>}
            {translationState?.lan==="Tg" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.pendingCases[3]}</span>}
            {translationState?.lan==="Sm" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.pendingCases[4]}</span>}
            {translationState?.lan==="Af" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.pendingCases[5]}</span>}

                </div>
              </div>
            </div>

            <div className="w-[100%] h-[200px] col-span-1 bg-white rounded-[10px] shadow border border-sky-700 border-opacity-50 flex items-center max-lg2:h-[150px]">
              <div className="w-[80%] mx-auto flex flex-col items-center gap-[20px] max-md2:flex-col">
                <div className="w-[100px] h-[100px] bg-[#1677AA1A] rounded-full flex items-center justify-center text-[#1677AA] max-lg2:w-[70px] max-lg2:h-[70px]">
                  <VscServerProcess  className="text-[30px]" />
                </div>
                <div className="flex items-center gap-[10px] max-md2:flex-row max-md2:items-center max-md2:gap-[10px]">
                  <span className="text-[25px] text-[#1677AA] font-bold max-lg2:text-[16px]">
                 {customerAnalysis?.processingCases}
                  </span>
                  {translationState?.lan==="En" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.processingCases[0]}</span>}
            {translationState?.lan==="Am" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.processingCases[1]}</span>}
            {translationState?.lan==="Or" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.processingCases[2]}</span>}
            {translationState?.lan==="Tg" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.processingCases[3]}</span>}
            {translationState?.lan==="Sm" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.processingCases[4]}</span>}
            {translationState?.lan==="Af" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.processingCases[5]}</span>}
                </div>
              </div>
            </div>
            <div className="w-[100%] h-[200px] col-span-1 bg-white rounded-[10px] shadow border border-sky-700 border-opacity-50 flex items-center max-lg2:h-[150px]">
              <div className="w-[80%] mx-auto flex flex-col items-center gap-[20px] max-md2:flex-col">
                <div className="w-[100px] h-[100px] bg-[#1677AA1A] rounded-full flex items-center justify-center text-[#1677AA] max-lg2:w-[70px] max-lg2:h-[70px]">
                  <MdVerified   className="text-[30px]" />
                </div>
                <div className="flex items-center gap-[10px] max-[885px]:flex-row max-[885px]:items-center max-[885px]:gap-[10px]">
                  <span className="text-[25px] text-[#1677AA] font-bold max-lg2:text-[16px]">
                 {customerAnalysis?.respondedCases}
                  </span>
                  {translationState?.lan==="En" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.respondedCases[0]}</span>}
            {translationState?.lan==="Am" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.respondedCases[1]}</span>}
            {translationState?.lan==="Or" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.respondedCases[2]}</span>}
            {translationState?.lan==="Tg" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.respondedCases[3]}</span>}
            {translationState?.lan==="Sm" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.respondedCases[4]}</span>}
            {translationState?.lan==="Af" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.respondedCases[5]}</span>}
                </div>
              </div>
            </div>
            <div className="w-[100%] h-[200px] col-span-1 bg-white rounded-[10px] shadow border border-sky-700 border-opacity-50 flex items-center max-lg2:h-[150px]">
              <div className="w-[80%] mx-auto flex flex-col items-center gap-[20px] max-md2:flex-col">
                <div className="w-[100px] h-[100px] bg-[#1677AA1A] rounded-full flex items-center justify-center text-[#1677AA] max-lg2:w-[70px] max-lg2:h-[70px]">
                  <GiCancel    className="text-[30px]" />
                </div>
                <div className="flex items-center gap-[10px] max-[885px]:flex-row max-[885px]:items-center max-[885px]:gap-[10px]">
                  <span className="text-[25px] text-[#1677AA] font-bold max-lg2:text-[16px]">
                 {customerAnalysis?.rejectedCases}
                  </span>
                  {translationState?.lan==="En" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.rejectedCases[0]}</span>}
            {translationState?.lan==="Am" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.rejectedCases[1]}</span>}
            {translationState?.lan==="Or" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.rejectedCases[2]}</span>}
            {translationState?.lan==="Tg" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.rejectedCases[3]}</span>}
            {translationState?.lan==="Sm" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.rejectedCases[4]}</span>}
            {translationState?.lan==="Af" &&    <span className="text-[16px] text-gray-500 max-lg2:text-[14px] max-lg1:text-[12px]">{language?.rejectedCases[5]}</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[50px] flex flex-col">
          <div className="w-[100%] flex justify-center items-center gap-[20px]">
          {translationState?.lan ==="En" &&  <span className="text-[#0C73B8] text-[20px] font-bold text-center max-lg2:text-[16px]">{language?.recentCases[0]}</span> }
            {translationState?.lan ==="Am" &&  <span className="text-[#0C73B8] text-[20px] font-bold text-center max-lg2:text-[16px]">{language?.recentCases[1]}</span> }
            {translationState?.lan ==="Or" &&  <span className="text-[#0C73B8] text-[20px] font-bold text-center max-lg2:text-[16px]">{language?.recentCases[2]}</span> }
            {translationState?.lan ==="Tg" &&  <span className="text-[#0C73B8] text-[20px] font-bold text-center max-lg2:text-[16px]">{language?.recentCases[3]}</span> }
            {translationState?.lan ==="Sm" &&  <span className="text-[#0C73B8] text-[20px] font-bold text-center max-lg2:text-[16px]">{language?.recentCases[4]}</span> }
            {translationState?.lan ==="Af" &&  <span className="text-[#0C73B8] text-[20px] font-bold text-center max-lg2:text-[16px]">{language?.recentCases[5]}</span> }
         
          
          </div>
          <div className="w-[100%]">
          <CaseSummaryTable customerCases={caseState}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
