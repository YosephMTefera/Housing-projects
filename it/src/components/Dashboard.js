import React, { useEffect } from "react";
import { VscVerifiedFilled } from "react-icons/vsc";
import { FcDepartment } from "react-icons/fc";
import { GrUserManager } from "react-icons/gr";
import { FaUsers } from "react-icons/fa"
import { FaArchive } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import {BsFillPatchQuestionFill, BsPersonFillExclamation, BsPersonWorkspace} from 'react-icons/bs'
import {FaBriefcase} from 'react-icons/fa'
import { useSelector, useDispatch } from "react-redux";
import { fetchOfficeUsers } from "../REDUX/slices/officeUsersSlice";
import { fetchArchivalUsers } from "../REDUX/slices/archivalUsersSlice";
import { fetchCustomers } from "../REDUX/slices/customerSlice";
import { fetchDivision } from "../REDUX/slices/divisionSlice";
import { fetchDirectorate } from "../REDUX/slices/directorateSlice";
import { fetchTeams } from "../REDUX/slices/teamSlice";
import { fetchEthicsUsers } from "../REDUX/slices/ethicsUsersSlice";
import { fetchWindowUsers } from "../REDUX/slices/windowUsersSlice";
import { fetchQuestions } from "../REDUX/slices/questionSlice";
import { fetchCaseRequests } from "../REDUX/slices/caseRequestSlice";
import Loading from "./Loading";
// import ServerError from "./ServerError";

function Dashboard() {
  const dispatch = useDispatch();
  const officersList = useSelector((state) => state?.officeUsers);
  const archivalsList = useSelector((state) => state?.archivalUsers);
  const ethicsUserList = useSelector((state)=>state?.ethicsUsers);
  const windowUserList = useSelector((state)=>state?.windowServiceUsers);
  const customersList = useSelector((state) => state?.customers);
  const divisionsList = useSelector((state) => state?.divisions);
  const directoratesList = useSelector((state) => state?.directorates);
  const teamsList = useSelector((state) => state?.teams);
  const caseList = useSelector((state)=>state?.caseRequests);
  const questionList = useSelector((state)=>state?.questions);

  useEffect(() => {
    dispatch(fetchOfficeUsers({page:"",sort:"",status:"",username:"",division:"",level:"",phone:""}));
    dispatch(fetchArchivalUsers({page:"",sort:"",status:"",username:"",phone:""}));
    dispatch(fetchEthicsUsers({page:"",sort:"",status:"",username:"",phone:""}))
    dispatch(fetchWindowUsers({page:"",sort:"",status:"",username:"",phone:""}))
    dispatch(fetchCustomers({page:"",sort:"",status:"",phone:""}));
    dispatch(fetchDivision({page:"",sort:"",name:"",status:""}));
    dispatch(fetchDirectorate({page:"",sort:"",status:"",searchName:""}));
    dispatch(fetchTeams({page:"",sort:"",name:"",status:"",directorate:""}));
    dispatch(fetchCaseRequests({page:"",sort:"",status:"",answerBy:"",division:"",searchName:""}))
    dispatch(fetchQuestions({page:"",sort:"",caselist:"",searchName:""}))
    // eslint-disable-next-line
  }, []);

  if(officersList?.loading || archivalsList?.loading || ethicsUserList?.loading  || windowUserList?.loading || customersList?.loading || divisionsList?.loading || directoratesList?.loading || teamsList?.loading || caseList?.loading || caseList?.loading || questionList?.loading) return <Loading addtionalStyle={"flex justify-center items-center my-[30px]"}/>

  // if(officersList?.error || archivalsList?.error || ethicsUserList?.error  || windowUserList?.error || customersList?.error || divisionsList?.error || directoratesList?.error || teamsList?.error || caseList?.error || caseList?.error || questionList?.error) return <ServerError />

  return (
    <div className="w-[95%] min-h-[80vh] mx-auto bg-white mt-[30px] rounded">
      <div className="w-[95%] my-[50px] mx-auto grid grid-cols-3 justify-center items-center gap-[50px] max-lg2:my-[10px] max-lg2:gap-[30px]">
        {/* 3 */}
        <div className="w-[100%] col-span-1 h-[263px] bg-white rounded-[10px] shadow border border-sky-700 border-dashed border-opacity-50 flex items-center  max-lg2:h-[150px]">
          <div className="w-[80%] mx-auto flex items-center gap-[20px]">
            <div className="w-[150px] h-[150px] bg-[#1677AA1A] rounded-full flex items-center justify-center text-[#1677AA] max-lg2:w-[100px] max-lg2:h-[100px] max-lg1:w-[70px] max-lg1:h-[70px]">
              <VscVerifiedFilled className="text-7xl max-lg2:text-5xl max-lg1:text-4xl" />
            </div>
            <div className="flex flex-col  max-[650px]:gap-[10px]">
              <span className="text-[25px] text-[#1677AA] font-bold">
                {officersList?.officeUsers?.totalOfficeUsers}
              </span>
              <span className="text-[14px] text-gray-500">Administrators</span>
            </div>
          </div>
        </div>

        <div className="w-[100%] h-[263px]  col-span-1 bg-white rounded-[10px] shadow border border-sky-700 border-dashed border-opacity-50 flex items-center  max-lg2:h-[150px]">
          <div className="w-[80%] mx-auto flex items-center gap-[20px]">
            <div className="w-[150px] h-[150px] bg-[#1677AA1A] rounded-full flex items-center justify-center text-[#1677AA] max-lg2:w-[100px] max-lg2:h-[100px] max-lg1:w-[70px] max-lg1:h-[70px]">
          
              <FaArchive className="text-7xl max-lg2:text-5xl max-lg1:text-4xl" />
            </div>
            <div className="flex flex-col  max-[650px]:gap-[10px]">
              <span className="text-[25px] text-[#1677AA] font-bold">
                {archivalsList?.archivalUsers?.totalArchivalUsers}
              </span>
              <span className="text-[14px] text-gray-500">Archival Users</span>
            </div>
          </div>
        </div>

        <div className="w-[100%] h-[263px] bg-white rounded-[10px] shadow border border-sky-700 border-dashed border-opacity-50 flex items-center   max-lg2:h-[150px]">
          <div className="w-[80%] mx-auto flex items-center gap-[20px]">
            <div className="w-[150px] h-[150px] bg-[#1677AA1A] rounded-full flex items-center justify-center text-[#1677AA] max-lg2:w-[100px] max-lg2:h-[100px] max-lg1:w-[70px] max-lg1:h-[70px]">
              <FaUsers className="text-7xl max-lg2:text-5xl max-lg1:text-4xl" />
            </div>
            <div className="flex flex-col max-[650px]:gap-[10px]">
              <span className="text-[25px] text-[#1677AA] font-bold">
                {customersList?.customers?.totalCustomers}
              </span>
              <span className="text-[14px] text-gray-500">Customers</span>
            </div>
          </div>
        </div>

        <div className="w-[100%] h-[263px] bg-white rounded-[10px] shadow border border-sky-700 border-dashed border-opacity-50 flex items-center   max-lg2:h-[150px]">
          <div className="w-[80%] mx-auto flex items-center gap-[20px]">
            <div className="w-[150px] h-[150px] bg-[#1677AA1A] rounded-full flex items-center justify-center text-[#1677AA] max-lg2:w-[100px]  max-lg2:h-[100px] max-lg1:w-[70px] max-lg1:h-[70px]">
              <FcDepartment className="text-7xl max-lg2:text-5xl max-lg1:text-4xl" />
            </div>
            <div className="flex flex-col  max-[650px]:gap-[10px]">
              <span className="text-[25px] text-[#1677AA] font-bold">
                {divisionsList?.divisions?.totalDivisions}
              </span>
              <span className="text-[14px] text-gray-500">Divisions</span>
            </div>
          </div>
        </div>

        <div className="w-[100%] h-[263px] bg-white rounded-[10px] shadow border border-sky-700 border-dashed border-opacity-50 flex items-center max-lg2:h-[150px]">
          <div className="w-[80%] mx-auto flex items-center gap-[20px]">
            <div className="w-[150px] h-[150px] bg-[#1677AA1A] rounded-full flex items-center justify-center text-[#1677AA] max-lg2:w-[100px] max-lg2:h-[100px] max-lg1:w-[70px] max-lg1:h-[70px]">
            <GrUserManager className="text-7xl max-lg2:text-5xl max-lg1:text-4xl" />
            </div>
            <div className="flex flex-col max-[650px]:gap-[10px]">
              <span className="text-[25px] text-[#1677AA] font-bold">
                {directoratesList?.directorates?.totalDirectorates}
              </span>
              <span className="text-[14px] text-gray-500">Directorates</span>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[263px] bg-white rounded-[10px] shadow border border-sky-700 border-dashed border-opacity-50 flex items-center max-lg2:h-[150px]">
          <div className="w-[80%] mx-auto flex items-center gap-[20px]">
            <div className="w-[150px] h-[150px] bg-[#1677AA1A] rounded-full flex items-center justify-center text-[#1677AA] max-lg2:w-[100px] max-lg2:h-[100px] max-lg1:w-[70px] max-lg1:h-[70px]">
              <AiOutlineTeam className="text-7xl max-lg2:text-5xl max-lg1:text-4xl" />
            </div>
            <div className="flex flex-col  max-[650px]:gap-[10px]">
              <span className="text-[25px] text-[#1677AA] font-bold">
                {teamsList?.teams?.totalTeams}
              </span>
              <span className="text-[14px] text-gray-500">Teams</span>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[263px] bg-white rounded-[10px] shadow border border-sky-700 border-dashed border-opacity-50 flex items-center  max-lg2:h-[150px]">
          <div className="w-[80%] mx-auto flex items-center gap-[20px]">
            <div className="w-[150px] h-[150px] bg-[#1677AA1A] rounded-full flex items-center justify-center text-[#1677AA] max-lg2:w-[100px] max-lg2:h-[100px]">
              
              <BsPersonWorkspace className="text-7xl max-lg2:text-5xl"/>
            </div>
            <div className="flex flex-col  max-[650px]:gap-[10px]">
              <span className="text-[25px] text-[#1677AA] font-bold">
                {windowUserList?.windowUsers?.totalWindowServiceUsers}
              </span>
              <span className="text-[14px] text-gray-500">Window Service</span>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[263px] bg-white rounded-[10px] shadow border border-sky-700 border-dashed border-opacity-50 flex items-center  max-lg2:h-[150px]">
          <div className="w-[80%] mx-auto flex items-center gap-[20px]">
            <div className="w-[150px] h-[150px] bg-[#1677AA1A] rounded-full flex items-center justify-center text-[#1677AA] max-lg2:w-[100px] max-lg2:h-[100px]">
              
            
              <BsPersonFillExclamation className="text-7xl max-lg2:text-5xl"/>
            </div>
            <div className="flex flex-col  max-[650px]:gap-[10px]">
              <span className="text-[25px] text-[#1677AA] font-bold">
                {ethicsUserList?.ethicsUsers?.totalAccusationAcceptors}
              </span>
              <span className="text-[14px] text-gray-500">Ethics Users</span>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[263px] bg-white rounded-[10px] shadow border border-sky-700 border-dashed border-opacity-50 flex items-center  max-lg2:h-[150px]">
          <div className="w-[80%] mx-auto flex items-center gap-[20px]">
            <div className="w-[150px] h-[150px] bg-[#1677AA1A] rounded-full flex items-center justify-center text-[#1677AA] max-lg2:w-[100px] max-lg2:h-[100px]">
             
              <FaBriefcase className="text-7xl max-lg2:text-5xl"  />
            </div>
            <div className="flex flex-col  max-[650px]:gap-[10px]">
              <span className="text-[25px] text-[#1677AA] font-bold">
                {caseList?.caseRequests?.totalCaseList}
              </span>
              <span className="text-[14px] text-gray-500">Case Lists</span>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[263px] bg-white rounded-[10px] shadow border border-sky-700 border-dashed border-opacity-50 flex items-center  max-lg2:h-[150px]">
          <div className="w-[80%] mx-auto flex items-center gap-[20px]">
            <div className="w-[150px] h-[150px] bg-[#1677AA1A] rounded-full flex items-center justify-center text-[#1677AA] max-lg2:w-[100px] max-lg2:h-[100px]">
            <BsFillPatchQuestionFill className="text-7xl max-lg2:text-5xl"/>
            
          
            </div>
            <div className="flex flex-col  max-[650px]:gap-[10px]">
              <span className="text-[25px] text-[#1677AA] font-bold">
                {questionList?.questions?.totalQuestions}
              </span>
              <span className="text-[14px] text-gray-500">Questions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
