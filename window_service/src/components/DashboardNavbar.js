import React, { useEffect, useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import apiRequest from "../utils/request";
import {jwtDecode} from 'jwt-decode';
import ServerError from "./ServerError";
import {useSelector,useDispatch} from 'react-redux'
import { translationAction } from "../REDUX/slices/translationSlice";
import { language } from "../utils/part-1lan";


function DashboardNavbar() {
  const token = sessionStorage.getItem("tID");
  const decodedToken = jwtDecode(token);
  const userID = decodedToken?.user?.id;
  const dispatch = useDispatch();
  const translationState = useSelector((state)=>state.translation);
  const [user, setUser] = useState({});
  const [serverError,setServerError] = useState(false);

  useEffect(() => {
    try {
      apiRequest
        .get(`/window_service_user_api/get_window_service_user/${userID}`, {
          headers: {
            get_winduser_api: process.env.REACT_APP_GET_WINDUSER_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        
    } catch (error) {
      setServerError(true)
    }
  }, [userID, token]);


  if(serverError) return <ServerError />

  return (
    <div className="w-[100%] bg-white h-[100px] flex items-center shadow-md border max-lg2:h-[80px]">
      <div className="w-[90%] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <div
            className="min-[750px]:hidden cursor-pointer"
         
          >
            <BiMenuAltLeft className="text-[40px] text-[#0C73B8]" />
          </div>
          {user &&  <div>
            <span className="text-[20px] font-bold max-lg2:text-[14px]">
            {translationState?.lan ==="En" && language?.Hello[0]}
            {translationState?.lan ==="Am" && language?.Hello[1]},{" "}
              <span className="text-[#0C73B8] font-bold">
              {user?.firstname} 
              </span>
            </span>
          </div>}
       
        </div>

        <div className="flex flex-col items-center font-semibold uppercase">
          <span className="text-[#0C73B8] font-bold max-lg2:text-[12px]">
          {translationState?.lan ==="En" && language?.companyName[0]}
          {translationState?.lan ==="Am" && language?.companyName[1]}
        
          </span>
          <span className="text-[#FBB042] max-lg2:text-[10px]">
          {translationState?.lan ==="En" && language?.windowService[0]}
          {translationState?.lan ==="Am" && language?.windowService[1]}
          </span>
        </div>
        <div className="flex items-center gap-[10px]">
        <select value={translationState?.lan} onChange={(e)=>dispatch(translationAction.setLan(e.target.value))} className="py-1 px-4 border border-gray-300 rounded-[5px] text-[14px] text-[#0C73B8] outline-none max-lg2:text-[10px]">
            <option value={"En"}>En</option>
            <option value={"Am"}>Am</option>
           
            </select>
          <div className="w-[50px] h-[50px] bg-[#0C73B8] text-white rounded-full flex justify-center items-center">
            {user&& user?.picture ? (
              <img
                src={`${process.env.REACT_APP_BACKEND_IMAGES}/WindowServiceUserImages/${user?.picture}`}
                className="w-[100%] h-[100%] object-cover rounded-full"
                alt=""
              />
            ) : (
              <div className="w-[50px] h-[50px] bg-[#0C73B8] text-white rounded-full flex justify-center items-center">
                <span>{user?.firstname?.[0]}</span>
              </div>
            )}
          </div>
          {user &&  <div className="flex flex-col">
       
       <span className="font-bold text-[#0C73B] capitalize max-lg2:text-[12px]">
         {user?.firstname} {user?.middlename} {user?.lastname}
   
       </span>
       <span className="text-gray-500 text-[14px]  max-lg2:text-[10px]">
         @{user?.username}
   
       </span>
     </div>}
         
        </div>
      </div>
    </div>
  );
}

export default DashboardNavbar;
