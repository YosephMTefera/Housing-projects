import React, { useEffect, useState } from "react";
import { IoDocumentsSharp } from "react-icons/io5";
import { BsClipboardCheckFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import {jwtDecode} from 'jwt-decode';
import Loading from "../Loading";
import apiRequest from "../../utils/request";
import ServerError from "../ServerError";
import { language } from "../../utils/part-1lan";

function Dashboard() {
  const token = sessionStorage.getItem('tID');
  const decodedToken = jwtDecode(token);
  const userID = decodedToken?.user?.id;
  const translationState = useSelector((state)=>state.translation);
  const caseState = useSelector((state)=>state.allCases);
  const [user,setUser] = useState({})
  const [windowServiceAnalysis,setWindowServiceAnalysis] = useState({})
  const [loading,setLoading] = useState(false);
  const [serverError,setServerError] = useState(false)


  useEffect(() => {
    try {
      setLoading(true);
      apiRequest
        .get(`/customer_case_api/get_case_ws`, {
          headers: {
            get_windservanalysis_api: process.env.REACT_APP_GET_WINDSERVANALYSIS_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setWindowServiceAnalysis(res.data);
        });
    } catch (error) {
      setServerError(true);
    }
  }, [token]);



  useEffect(() => {
    try {
      setLoading(true);
      apiRequest
        .get(`/window_service_user_api/get_window_service_user/${userID}`, {
          headers: {
            get_winduser_api: process.env.REACT_APP_GET_WINDUSER_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setUser(res.data);
        });
    } catch (error) {
      setServerError(true);
    }
  }, [userID, token]);


  
  if (serverError) return <ServerError />;




  return (
    (loading || caseState?.loading) ? <Loading addtionalStyle={"flex justify-center items-center my-[30px]"} />   :<div className="w-[95%] min-h-[80vh] mx-auto bg-white mt-[30px] rounded">
      {/* <span>Dashboard</span> */}
      <div className="grid grid-cols-4 gap-[20px]">
        <div className="w-[100%] h-[150px] col-span-1 border border-gray-300 rounded-[10px] flex items-center max-lg2:h-[100px]">
          <div className="w-[80%] mx-auto flex justify-between">
            <div className="flex flex-col gap-[5px]">
              {" "}
              <span className="text-[40px] text-[#0C73B8] font-bold max-lg2:text-[30px]">{windowServiceAnalysis?.totalCases}</span>
              <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
              {translationState?.lan ==="En" && language?.totalCases[0]}
              {translationState?.lan ==="Am" && language?.totalCases[1]}
              </span>
            </div>
            <div className="w-[50px] h-[50px] bg-[#f3f6f8] text-[#0C73B8] flex justify-center items-center rounded-full">
              <IoDocumentsSharp className="text-[24px] max-lg2:text-[20px]"/>
            </div>
          </div>
        </div>
       
        
        <div className="w-[100%] h-[150px] col-span-1 border border-gray-300 rounded-[10px] flex items-center max-lg2:h-[100px]">
          <div className="w-[80%] mx-auto flex justify-between">
            <div className="flex flex-col gap-[5px]">
              {" "}
              <span className="text-[40px] text-[#0C73B8] font-bold max-lg2:text-[30px]">{windowServiceAnalysis?.currentDateCases}</span>
              <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
              {translationState?.lan ==="En" && language?.caseCreatedToday[0]}
              {translationState?.lan ==="Am" && language?.caseCreatedToday[1]}
              </span>
            </div>
            <div className="w-[50px] h-[50px] bg-[#f3f6f8] text-[#0C73B8] flex justify-center items-center rounded-full">
              <BsClipboardCheckFill className="text-[24px] max-lg2:text-[20px]"/>
            </div>
          </div>
        </div>
      </div>
<div className="mt-[30px] bg-white p-4  rounded-[10px] max-lg2:mt-[10px]">
      
        <div className="w-[100%] mt-[30px] border border-gray-300 p-2 mx-auto flex justify-start items-center gap-[20px] rounded-[10px]">
          <div className="w-[100px] h-[100px] bg-[#0C73B8] text-white rounded-full flex justify-center items-center">
            {user?.picture ? (
              <img
                src={`${process.env.REACT_APP_BACKEND_IMAGES}/WindowServiceUserImages/${user?.picture}`}
                className="w-[100%] h-[100%] object-cover rounded-full"
                alt=""
              />
            ) : (
              <div className="w-[100px] h-[100px] bg-[#0C73B8] text-white rounded-full flex justify-center items-center">
                <span>{user?.firstname?.[0]}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-[5px]">
            <span className="font-bold text-[#0C73B8]">
              {user?.firstname} {user?.middlename} {user?.lastname}
            </span>
            <span className="text-[12px] text-gray-500">@{user?.username}</span>
          </div>
        </div>
        <div className="w-[100%] mx-auto p-4  mt-[20px] border border-gray-300 rounded-[10px]">
          <div className="w-[90%] mx-auto">
            <div className="w-[100%] mt-[10px] flex justify-between items-center">
              <span className="font-bold text-[#0C73B8] text-[20px] max-lg2:text-[16px]">
              {translationState?.lan ==="En" && language?.personalInformation[0]}
              {translationState?.lan ==="Am" && language?.personalInformation[1]}
              </span>
              {user?.status ==="active" &&   <span className="py-1 px-4 rounded-[20px] bg-green-600 text-white text-[14px] max-lg2:text-[12px]">
              {translationState?.lan ==="En" && language?.active[0]}
              {translationState?.lan ==="Am" && language?.active[1]}
              </span>}

              {user?.status ==="inactive" && <span className="py-1 px-4 rounded-[20px] bg-red-600 text-white text-[14px] max-lg2:text-[12px]">
              {translationState?.lan ==="En" && language?.inactive[0]}
              {translationState?.lan ==="Am" && language?.inactive[1]}
              </span>}
            
            </div>
            <div className="w-[40%] mt-[20px]  flex justify-between items-center gap-[50px] max-lg2:w-[60%]">
              <div className="flex flex-col gap-[20px]">
                <div className="flex flex-col gap-[10px]">
                  <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                  {translationState?.lan ==="En" && language?.firstname[0]}
                  {translationState?.lan ==="Am" && language?.firstname[1]}
                  </span>
                  <span className="max-lg2:text-[14px]">{user?.firstname}</span>
                </div>

                <div className="flex flex-col gap-[10px]">
                  <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                  {translationState?.lan ==="En" && language?.phoneNumber[0]}
                  {translationState?.lan ==="Am" && language?.phoneNumber[1]}
                  </span>
                  <span className="max-lg2:text-[12px]">{user?.phone}</span>
                </div>
              </div>
              <div className="flex flex-col gap-[20px]">
                <div className="flex flex-col gap-[10px]">
                  <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                  {translationState?.lan ==="En" && language?.middlename[0]}
                  {translationState?.lan ==="Am" && language?.middlename[1]}
                  </span>
                  <span className="max-lg2:text-[14px]">
                    {user?.middlename}
                  </span>
                </div>

                <div className="flex flex-col gap-[10px]">
                  <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                  {translationState?.lan ==="En" && language?.emailAddress[0]}
                  {translationState?.lan ==="Am" && language?.emailAddress[1]}
                  </span>
                  <span className="max-lg2:text-[14px]">{user?.email}</span>
                </div>
              </div>
              <div className="flex flex-col gap-[20px]">
                <div className="flex flex-col gap-[10px]">
                  <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                  {translationState?.lan ==="En" && language?.lastname[0]}
                  {translationState?.lan ==="Am" && language?.lastname[1]}
                  </span>
                  <span className="max-lg2:text-[14px]">{user?.lastname}</span>
                </div>

                <div className="flex flex-col gap-[10px]">
                  <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                  {translationState?.lan ==="En" && language?.gender[0]}
                  {translationState?.lan ==="Am" && language?.gender[1]}
                  </span>
                  <span className="max-lg2:text-[14px]">{user?.gender}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
