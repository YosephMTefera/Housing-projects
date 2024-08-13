import React, { useEffect } from "react";
import DashboardNavbar from "./DashboardNavbar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Divisions from "./Divisions/Divisions";
import Cases from "./Cases/Cases";
import IT from "./IT/IT";
import CreateIT from "./IT/CreateIT";
import EditIT from "./IT/EditIT";
import DivisionDetail from "./Divisions/DivisionDetail";
import DirectorateDetail from "./Directorate/DirectorateDetail";
import MyProfile from "./Profile/MyProfile";
import TotalCases from "./Cases/TotalCases";
import AddParaph from "./Profile/Paraph/AddParaph";
import CaseDetail from "./Cases/CaseDetail";
import Forward from "./Forward/Forward";
import ForwardPath from "./Forward/ForwardPath";
import ReplyPath from "./Reply/ReplyPath";
import Respond from "./Respond";
import ForwardPathDetail from "./Forward/ForwardPathDetail";
import Reply from "./Reply/Reply";
import Archival from "./Archival/Archival";
import Customers from "./Customers/Customers";
import TeamDetail from "./Teams/TeamDetail";
import ReplyPathDetail from "./Reply/ReplyPathDetail";
import TeamMembersDetail from "./Teams/TeamMembersDetail";
import RepliedCases from "./Cases/RepliedCases";
import { useDispatch, useSelector } from "react-redux";
import DirectorDashboard from "./DirectorDashboard";
import TeamDashboard from "./TeamDashboard";
import {jwtDecode} from 'jwt-decode';
import { fetchAllOfficeUsers } from "../REDUX/slices/getAllOfficeUsersSlice";
import ITDetail from "./IT/ITDetail";
import ArchivalDetail from "./Archival/ArchivalDetail";
import CustomerDetail from "./Customers/CustomerDetail";
import WindowService from "./WindowService/WindowService";
import WindowServiceDetail from "./WindowService/WindowServiceDetail";
import Ethics from "./EthicsAndCorrpution/Ethics";
import EthicsDetail from "./EthicsAndCorrpution/EthicsDetail";
import Print from "./Print/Print";
import CcCases from "./Cases/CcCases";
import TotalLateCases from "./Cases/TotalLateCases";
import CurrentLateCases from "./Cases/CurrentLateCases";
import PageNotFound from "./PageNotFound";
import CandidateResponse from "./Cases/CandidateResponse";
import Preview from "./Cases/Preview";
import ResponseHistory from "./Cases/ResponseHistory";
import IncomingLetterDetail from "./Letters/Incoming/IncomingLetterDetail";
import ForwardedIncomingLetters from "./Letters/Incoming/ForwardedIncomingLetters";
import ForwardedOutgoingLetters from "./Letters/outgoing/ForwardedOutgoingLetters";
import OutgoingLetterDetail from "./Letters/outgoing/OutgoingLetterDetail";
import CcOutgoingLetter from "./Letters/outgoing/CcOutgoingLetter";
import CcIncomingLetter from "./Letters/Incoming/CcIncomingLetter";
import RepliedIncomingLetter from "./Letters/Incoming/RepliedIncomingLetter";
import RepliedOutgoingLetter from "./Letters/outgoing/RepliedOutgoingLetter";
import InternalForwardedLetters from "./Letters/Internal/InternalForwardedLetters";
import RepliedInternalLetters from "./Letters/Internal/RepliedInternalLetters";
import CcInternalLetter from "./Letters/Internal/CcInternalLetter";
import ForwardedInternalMemo from "./Letters/Memo/ForwardedInternalMemo";
import RepliedInternalMemo from "./Letters/Memo/RepliedInternalMemo";
import CcInternalMemo from "./Letters/Memo/CcInternalMemo";
import InternalMemoDetail from "./Letters/Memo/InternalMemoDetail";
import InternalLetterDetail from "./Letters/Internal/InternalLetterDetail";
import CreateInternalLetter from "./Letters/Internal/CreateInternalLetter";
import LetterForwardPath from "./Letters/LetterForwardPath";
import LetterForwardPathDetail from "./Letters/LetterForwardPathDetail";
import LetterPrint from "./Letters/LetterPrint";
import LetterReplyPath from "./Letters/LetterReplyPath";
import LetterReplyPathDetail from "./Letters/LetterReplyPathDetail";
import Forwardletter from "./Letters/Forwardletter";
import ReplyLetter from "./Letters/ReplyLetter";
import LetterDashboardAnalysis from "./LetterAnalysis/LetterDashboardAnalysis";
import CreateOutgoingLetter from "./Letters/outgoing/CreateOutgoingLetter";
import CreatedoutgoingLetters from "./Letters/outgoing/CreatedoutgoingLetters";
import LetterPreview from "./Letters/LetterPreview";
import LetterUpdatedBy from "./Letters/LetterUpdatedBy";
import CreatedInternalLetter from "./Letters/Internal/CreatedInternalLetter";
import TotalIncomingLetters from "./Letters/Incoming/TotalIncomingLetters";
import TotalOutgoingLetters from "./Letters/outgoing/TotalOutgoingLetters";
import TotalInternalLetters from "./Letters/Internal/TotalInternalLetters";
import TotalPresystemLetters from "./Letters/Presystem/TotalPresystemLetters";
import PresystemDetail from "./Letters/Presystem/PresystemDetail";
import TotalPreSystemLetterDetail from "./Letters/Presystem/TotalPreSystemLetterDetail";
import ForwardedPresystemLetters from "./Letters/Presystem/ForwardedPresystemLetters";
import RepliedPresystemLetters from "./Letters/Presystem/RepliedPresystemLetters";
import CcPresystemLetters from "./Letters/Presystem/CcPresystemLetters";
import CreateInternalMemo from "./Letters/Memo/CreateInternalMemo";
import CreatedInternalMemo from "./Letters/Memo/CreatedInternalMemo";
import TotalInternalMemo from "./Letters/Memo/TotalInternalMemo";
import Schedule from "./Schedule/Schedule";
import SchedulePrint from "./Schedule/SchedulePrint";


function Content() {
  const token = sessionStorage.getItem('tID');
  const decodedToken = jwtDecode(token);
  const userID = decodedToken?.user?.id
  const dispatch = useDispatch();
  const officeUserList = useSelector((state)=>state.getAllOfficeUsers);


  useEffect(()=>{
    dispatch(fetchAllOfficeUsers());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  const findOfficeUser = officeUserList?.officeUsers?.find((user)=>user?._id===userID);


  return (
    <div className="w-[83%] absolute right-0 z-[-1]  flex flex-col">
      <DashboardNavbar />
      <Routes>
        
      {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers") && <Route path="/" element={<Dashboard />} />}
      {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers") && <Route path="/letteranalysis" element={<LetterDashboardAnalysis />} />}
      {findOfficeUser && (findOfficeUser?.level ==="Directors") && <Route path="/" element={<DirectorDashboard />} />}
      {findOfficeUser && (findOfficeUser?.level ==="TeamLeaders") && <Route path="/" element={<TeamDashboard />} />}
      {findOfficeUser && (findOfficeUser?.level ==="Professionals") &&  <Route path="/" element={<Cases />}/>}
      
        

        {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers") &&   <Route path="/divisions" element={<Divisions />} />}
      
      {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers") &&    <Route path="/divisions/:id" element={<DivisionDetail />} />}
      
      {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers" || findOfficeUser?.level==="Directors") && <Route path={ "/directorate/:id"} element={<DirectorateDetail />} />}
       
       {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers" || findOfficeUser?.level==="Directors" ) &&   <Route path="/teams/:id" element={<TeamDetail />} />}
       {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers" || findOfficeUser?.level==="Directors" || findOfficeUser?.level==="TeamLeaders" ) &&   <Route path="/member_information/:id" element={<TeamMembersDetail />} />}
      
      {/*  cases */}
       {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers" || findOfficeUser?.level==="Directors" || findOfficeUser?.level==="TeamLeaders" ) &&   <Route path="/cases" element={<Cases />} />}
       {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers" || findOfficeUser?.level==="Directors" || findOfficeUser?.level==="TeamLeaders" || findOfficeUser?.level==="Professionals" ) &&   <Route path="/cases/:id/:type" element={<CaseDetail />} />} 
       {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers" || findOfficeUser?.level==="Directors" || findOfficeUser?.level==="TeamLeaders" || findOfficeUser?.level==="Professionals" ) &&    <Route path="/cccases" element={<CcCases />} />}
       {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers") && <Route path="/totalcases" element={<TotalCases />} />}
       {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers") && <Route path="/totallatecases" element={<TotalLateCases />} />}
       {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers") && <Route path="/currentlatecases" element={<CurrentLateCases />} />}
       {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers" || findOfficeUser?.level==="Directors" || findOfficeUser?.level==="TeamLeaders" || findOfficeUser?.level==="Professionals" ) &&    <Route path="/repliedcases" element={<RepliedCases />} />}  
       {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers" || findOfficeUser?.level==="Directors" || findOfficeUser?.level==="TeamLeaders" || findOfficeUser?.level==="Professionals" ) &&    <Route path="/candidateresponse/:id" element={<CandidateResponse  />} />}  
       
       




       {/* forward */}
       {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers" || findOfficeUser?.level==="Directors" || findOfficeUser?.level==="TeamLeaders") &&   <Route path="/forward/:id/:type" element={<Forward />} />  }
       {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers" || findOfficeUser?.level==="Directors" || findOfficeUser?.level==="TeamLeaders" || findOfficeUser?.level==="Professionals" ) &&       <Route path="/forward_path/:id/:type" element={<ForwardPath />} />}
       {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers" || findOfficeUser?.level==="Directors" || findOfficeUser?.level==="TeamLeaders") &&       <Route path="/forward_path_information/:id/:type" element={<ForwardPathDetail />}/>}

       {/* reply */}
       {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers" || findOfficeUser?.level==="Directors" || findOfficeUser?.level==="TeamLeaders" || findOfficeUser?.level==="Professionals" ) &&      <Route path="/reply/:id/:type" element={<Reply />} />}
       {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers" || findOfficeUser?.level==="Directors" || findOfficeUser?.level==="TeamLeaders" || findOfficeUser?.level==="Professionals" ) &&       <Route path="/reply_path/:id/:type" element={<ReplyPath />} />}
       {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers" || findOfficeUser?.level==="Directors" || findOfficeUser?.level==="TeamLeaders" || findOfficeUser?.level==="Professionals" ) &&        <Route path="/reply_path_information/:id/:type" element={<ReplyPathDetail />}/>}
       
       {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers" || findOfficeUser?.level==="Directors" || findOfficeUser?.level==="TeamLeaders" || findOfficeUser?.level==="Professionals" ) &&        <Route path="/reply_path_information/:id/:type" element={<ReplyPathDetail />}/>}
       
       {/* PRINT */}
       {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers" || findOfficeUser?.level==="Directors" || findOfficeUser?.level==="TeamLeaders" || findOfficeUser?.level==="Professionals" ) &&        <Route path="/print/:id/:forward_id/:type" element={<Print />}/>}
       
       {/* CANDIDATE RESPONSE */}
       {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers" || findOfficeUser?.level==="Directors" || findOfficeUser?.level==="TeamLeaders" || findOfficeUser?.level==="Professionals" ) &&        <Route path="/preview/:id" element={<Preview />}/>}

       {/* RESPONSE HISTORY */}
       {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers" || findOfficeUser?.level==="Directors" || findOfficeUser?.level==="TeamLeaders" || findOfficeUser?.level==="Professionals" ) &&        <Route path="/response/history/:id" element={<ResponseHistory />}/>}
       
        {/* paraph */}
       {findOfficeUser&& (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers" || findOfficeUser?.level==="Directors" || findOfficeUser?.level==="TeamLeaders") &&   <Route path="/add_paraph" element={<AddParaph />} />}

        
        {/* IT */}
       {findOfficeUser&& findOfficeUser?.level === "MainExecutive" && <Route path="/it" element={<IT />} />}
       {findOfficeUser&& findOfficeUser?.level === "MainExecutive" && <Route path="/it/:id" element={<ITDetail />} />}
       {findOfficeUser && findOfficeUser?.level === "MainExecutive" && (<Route path="/it/create" element={<CreateIT />} />)}
        {findOfficeUser && findOfficeUser?.level === "MainExecutive" && (<Route path="/it/edit/:id" element={<EditIT />} />)}

        {/* respond document */}

        {findOfficeUser && (findOfficeUser?.level === "MainExecutive" || findOfficeUser?.level === "DivisionManagers") && (<Route path="/respond/:id/:type" element={<Respond />} />)}
     


        {/* archival */}
        {findOfficeUser && (findOfficeUser?.level === "MainExecutive" || findOfficeUser?.level === "DivisionManagers") && (<Route path="/archival" element={<Archival />} />)}
        {findOfficeUser && (findOfficeUser?.level === "MainExecutive" || findOfficeUser?.level === "DivisionManagers") && (<Route path="/archival/:id" element={<ArchivalDetail />} />)}

        {/* customers */}
        {(findOfficeUser?.level === "MainExecutive" || findOfficeUser?.level === "DivisionManagers") && (<Route path="/customers" element={<Customers />} />)}
        {(findOfficeUser?.level === "MainExecutive" || findOfficeUser?.level === "DivisionManagers") && (<Route path="/customers/:id" element={<CustomerDetail />} />)}

        {/* window service users */}
        {(findOfficeUser?.level === "MainExecutive" || findOfficeUser?.level === "DivisionManagers") && (<Route path="/window" element={<WindowService />} />)}
        {(findOfficeUser?.level === "MainExecutive" || findOfficeUser?.level === "DivisionManagers") && (<Route path="/window/:id" element={<WindowServiceDetail />} />)}

        {/* ethics users*/}

        {(findOfficeUser?.level === "MainExecutive" || findOfficeUser?.level === "DivisionManagers") && (<Route path="/ethics" element={<Ethics />} />)}
        {(findOfficeUser?.level === "MainExecutive" || findOfficeUser?.level === "DivisionManagers") && (<Route path="/ethics/:id" element={<EthicsDetail />} />)}

        {/* Letters */}

        <Route path="/letters/forward/path/:type/:id" element={<LetterForwardPath />} />
        <Route path="/letters/forward/path/:type/:id/:forward_id" element={<LetterForwardPathDetail />}/>
        <Route path="/letters/reply/path/:type/:id" element={<LetterReplyPath />} />
        <Route path="/letters/reply/path/:type/:id/:reply_id" element={<LetterReplyPathDetail />}/>
        <Route path="/letters/print/:path_type/:type/:id/:doc_id" element={<LetterPrint />}/>  
        <Route path="/letters/forward/:type/:id" element={<Forwardletter/>}/>
        <Route path="/letters/reply/:type/:id" element={<ReplyLetter />}/>
       <Route path="/letters/preview/:type/:path_type/:id" element={<LetterPreview />} />
        <Route path="/letters/updatedby/:letter_type/:type/:id" element={<LetterUpdatedBy />}/>

        {/* Incoming */}
        
        {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers") &&   <Route path="/letters/incoming/total" element={<TotalIncomingLetters/>} />}
        <Route path="/letters/incoming/forwarded" element={<ForwardedIncomingLetters />}/>
        <Route path="/letters/incoming/replied" element={<RepliedIncomingLetter />}/>
        <Route path="/letters/incoming/:type/:id" element={<IncomingLetterDetail />}/>
        <Route path="/letters/incoming/cc" element={<CcIncomingLetter />}/>

        {/* Outgoing */}
        {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers") &&   <Route path="/letters/outgoing/total" element={<TotalOutgoingLetters/>} />}
        <Route path="/letters/outgoing/create" element={<CreateOutgoingLetter />}/>
        <Route path="/letters/outgoing/created-letters" element={<CreatedoutgoingLetters />}/>
        <Route path="/letters/outgoing/forwarded" element={<ForwardedOutgoingLetters />}/>
        <Route path="/letters/outgoing/replied" element={<RepliedOutgoingLetter />}/>
        <Route path="/letters/outgoing/:type/:id" element={<OutgoingLetterDetail />}/>
        <Route path="/letters/outgoing/cc" element={<CcOutgoingLetter />}/>

        {/* Internal */}
        {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers") &&   <Route path="/letters/internal/total" element={<TotalInternalLetters/>} />}
        <Route path="/letters/internal/create" element={<CreateInternalLetter />}/> 
        <Route path="/letters/internal/created-letters" element={<CreatedInternalLetter />}/>
        <Route path="/letters/internal/forwarded" element={<InternalForwardedLetters />}/>
        <Route path="/letters/internal/replied" element={<RepliedInternalLetters />}/>
        <Route path="/letters/internal/cc" element={<CcInternalLetter />}/> 
        <Route path="/letters/internal/:type/:id" element={<InternalLetterDetail />}/>
    

        {/* Presystem Letters  */}
        {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers") &&   <Route path="/letters/presystem/total" element={<TotalPresystemLetters/>} />}
        <Route path="/letters/total/presystem/:type/:id" element={<TotalPreSystemLetterDetail />}/>
        <Route path="/letters/presystem/forwarded" element={<ForwardedPresystemLetters />}/>
        <Route path="/letters/presystem/replied" element={<RepliedPresystemLetters />}/>
        <Route path="/letters/presystem/cc" element={<CcPresystemLetters />}/> 
        <Route path="/letters/presystem/:type/:id" element={<PresystemDetail />}/>

        {/* Memo */}
        {findOfficeUser && (findOfficeUser?.level ==="MainExecutive" || findOfficeUser?.level==="DivisionManagers") &&   <Route path="/letters/memo/total" element={<TotalInternalMemo />} />}
        <Route path="/letters/memo/create" element={<CreateInternalMemo/>} />
        <Route path="/letters/memo/created-memo" element={<CreatedInternalMemo />}/>
        <Route path="/letters/memo/forwarded" element={<ForwardedInternalMemo />}/>
        <Route path="/letters/memo/replied" element={<RepliedInternalMemo />}/>
        <Route path="/letters/memo/cc" element={<CcInternalMemo />}/>
        <Route path="/letters/memo/:type/:id" element={<InternalMemoDetail  />}/>

        <Route path="/schedule" element={<Schedule />}/>
        <Route path="/schedule/print" element={<SchedulePrint />}/>

 
        <Route path="/settings" element={<MyProfile />} />
       {findOfficeUser &&  <Route path="*" element={<PageNotFound />}/>}
      </Routes>
    </div>
  );
}

export default Content;
