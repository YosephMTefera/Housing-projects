import React, { useEffect, useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import apiRequest from "../utils/request";
import {jwtDecode} from 'jwt-decode';
import ServerError from "./ServerError";
// import { useDispatch } from "react-redux";
// import { translationAction } from "../REDUX/slices/translationSlice";

function DashboardNavbar() {

  const token = sessionStorage.getItem("tID");
  const decodedToken = jwtDecode(token);
  // const dispatch = useDispatch();
  const userID = decodedToken?.user?.id;
  const [user, setUser] = useState({});
  const [serverError,setServerError] = useState(false)

  useEffect(() => {
    try {
      apiRequest
        .get(`/it_user_api/get_it_user/${userID}`, {
          headers: {
            get_itusers_det_api: process.env.REACT_APP_GET_ITUSERS_DET_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
        
          if(error?.response?.status === 500){
            setServerError(true)
          }
        });
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
            //  onClick={()=>dispatch(sideBarAction.toggleSidebar(!selectState))}
          >
            <BiMenuAltLeft className="text-[40px] text-[#0C73B8]" />
          </div>
          <div>
            <span className="text-[20px] font-bold max-lg2:text-[16px]">
            Hello,{" "}
              <span className="text-[#0C73B8] font-bold">
                {user?.firstname ? user?.firstname : "-"}!
              </span>
            </span>
          </div>
       
        </div>

        <div className="flex flex-col items-center font-semibold uppercase max-lg2:text-[12px]">
          <span className="text-[#0C73B8] ">
          ADDIS ABABA HOUSING DEVELOPMENT CORPORATION
          </span>
          <span className="text-[#FBB042]">IT</span>
        </div>
        <div className="flex items-center gap-[10px]">
        {/* <select onChange={(e)=>dispatch(translationAction.setLan(e.target.value))} className="py-2 px-4 border border-gray-300 rounded-[5px] text-[14px] text-[#0C73B8] outline-none max-lg2:text-[10px]">
            <option>En</option>
            <option>አማ</option>
           
            </select> */}
          <div className="w-[50px] h-[50px] bg-[#0C73B8] text-white rounded-full flex justify-center items-center">
            {user?.picture ? (
              <img
                src={`${process.env.REACT_APP_BACKEND_IMAGES}/ITUserImages/${user?.picture}`}
                className="w-[100%] h-[100%] object-cover rounded-full"
                alt=""
              />
            ) : (
              <div className="w-[50px] h-[50px] bg-[#0C73B8] text-white rounded-full flex justify-center items-center">
                <span>{user?.firstname?.[0]}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[#0C73B] capitalize max-lg2:text-[12px]">
              {user?.firstname} {user?.middlename} {user?.lastname}
            </span>
            <span className="text-gray-500 text-[14px]  max-lg2:text-[10px]">
              @{user?.username}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardNavbar;
