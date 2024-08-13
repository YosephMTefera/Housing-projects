import React, { useEffect,useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import apiRequest from "../utils/request";
import { jwtDecode } from "jwt-decode";
import Loading from "./Loading";
import ServerError from "./ServerError";
import { useSelector } from "react-redux";
import { language } from "../utils/part-1lan";

function UserProfile() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("tID");
  const decodedToken = jwtDecode(token);
  const userID = decodedToken?.user?.id;
  const translationState = useSelector((state)=>state.translation)
  const [user, setUser] = useState({});
  const [loading,setLoading] = useState(false);
  const [serverError,setServerError] = useState(false);

  useEffect(() => {
  try {
    setLoading(true)
    apiRequest
      .get(`/archival_user_api/get_archival_user/${userID}`, {
        headers: {
          Authorization: "Token " + token,
          get_archuser_api: process.env.REACT_APP_GET_ARCHUSER_API,
        },
      })
      .then((res) => {
        setLoading(false);
        setUser(res.data);
      }).catch((error)=>{
        if(error?.response?.status ===500){
          setServerError(true)
        }
      });
    
  } catch (error) {
    setServerError(true)
    
  }
  }, [userID, token]);

  



  if(serverError) return <ServerError />


  return (
    <div className="w-[90%] bg-white mt-[30px] mx-auto">
      <div className="flex items-center gap-[10px] text-[#0C73B8]">
        <BiChevronLeft
          onClick={() => navigate(-1)}
          className="text-[40px] cursor-pointer max-lg2:text-[30px]"
        />
        <span className="font-bold  text-[20px] max-lg2:text-[16px]">
        {translationState?.lan==="En" && language?.myProfile[0]} 
                   {translationState?.lan==="Am" && language?.myProfile[1]}
        </span>
      </div>
      {loading ? <Loading addtionalStyle={"flex justify-center items-center my-[30px]"}/> :    <div className="mt-[30px] bg-white p-4  rounded-[10px] max-lg2:mt-0">
        <div className="w-[100%] mt-[30px] border border-gray-300 p-2 mx-auto flex justify-start items-center gap-[20px] rounded-[10px]">
          <div className="w-[80px] h-[80px] bg-[#6A6A6A] rounded-full">
            {user?.picture ? (
              <img
                src={`${process.env.REACT_APP_BACKEND_IMAGES}/ArchivalUserImages/${user?.picture}`}
                className="w-[100%] h-[100%] object-cover rounded-full"
                alt=""
              />
            ) : (
              <div className="w-[80px] h-[80px] bg-[#0C73B8] text-white rounded-full flex justify-center items-center">
                <span>{user?.firstname?.[0]}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-[5px]">
            <span className="font-bold text-[#0C73B8]">
              {user?.firstname} {user?.middlename}{" "}
              {user?.lastname}
            </span>
            <span className="text-[12px] text-gray-500">
              @{user?.username}
            </span>
          
          </div>
        </div>
        <div className="w-[100%] mx-auto p-4  mt-[20px] border border-gray-300 rounded-[10px]">
          <div className="w-[95%] mx-auto">
            <div className="w-[100%] mt-[10px] flex justify-between items-center">
              <span className="font-bold text-[#0C73B8] text-[20px] max-lg2:text-[16px]">
              {translationState?.lan==="En" && language?.personalInformation[0]} 
              {translationState?.lan==="Am" && language?.personalInformation[1]}
              </span>
              {user?.status ==="active" &&   <span className="py-1 px-4 rounded-[20px] bg-green-600 text-white capitalize max-lg2:text-[12px]">
                {translationState?.lan==="En" && language?.active[0]} 
                {translationState?.lan==="Am" && language?.active[1]}
              </span>}
              {user?.status ==="inactive" &&   <span className="py-1 px-4 rounded-[20px] bg-red-600 text-white capitalize max-lg2:text-[12px]">
                {translationState?.lan==="En" && language?.inactive[0]} 
              {translationState?.lan==="Am" && language?.inactive[1]}
              </span>}
            
            </div>
            <div className="w-[80%] mt-[20px] flex justify-between items-center gap-[50px] max-lg2:w-[100%]">
              <div className="flex flex-col gap-[20px]">
                <div className="flex flex-col gap-[10px]">
                  <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                  {translationState?.lan==="En" && language?.createdDate[0]} 
                  {translationState?.lan==="Am" && language?.createdDate[1]}
                  </span>
                  <span className="max-lg2:text-[14px]">
                    {user?.createdAt
                      ? new Date(user?.createdAt).toDateString()
                      : "-"}
                  </span>
                </div>

                <div className="flex flex-col gap-[10px]">
                  <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                  {translationState?.lan==="En" && language?.phoneNumber[0]} 
                  {translationState?.lan==="Am" && language?.phoneNumber[1]}
                  </span>
                  <span className="max-lg2:text-[14px]">
                    {user?.phone}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[20px]">
                <div className="flex flex-col gap-[10px]">
                  <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                  {translationState?.lan==="En" && language?.createdTime[0]} 
                  {translationState?.lan==="Am" && language?.createdTime[1]}
                  </span>
                  <span className="max-lg2:text-[14px]">
                    {user?.createdAt
                      ? new Date(
                          user?.createdAt
                        ).toLocaleTimeString()
                      : "-"}
                  </span>
                </div>

                <div className="flex flex-col gap-[10px]">
                  <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                  {translationState?.lan==="En" && language?.email[0]} 
                  {translationState?.lan==="Am" && language?.email[1]}
                  </span>
                  <span className="max-lg2:text-[14px]">
                    {user?.email
                      ? user?.email
                        
                      : "-"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[20px]">
                <div className="flex flex-col gap-[10px]">
                  <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                  {translationState?.lan==="En" && language?.createdBy[0]} 
                  {translationState?.lan==="Am" && language?.createdBy[1]}
                  </span>
                  <span className="max-lg2:text-[14px]">
                    {user?.createdBy?.firstname +
                      " " +
                      user?.createdBy?.middlename +
                      " " +
                      user?.createdBy?.lastname }
                     
                  </span>
                </div>

                <div className="flex flex-col gap-[10px]">
                  <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                  {translationState?.lan==="En" && language?.gender[0]} 
                  {translationState?.lan==="Am" && language?.gender[1]}
                  </span>
                  <span className="max-lg2:text-[14px]">
                  {translationState?.lan==="En" &&  user?.gender} 
                  {translationState?.lan==="Am" &&   user?.gender ==="Male" ? language?.male[1]:language?.female[1]}
                 
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
   
    </div>
  );
}

export default UserProfile;
