import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
// import { RiHome5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import apiRequest from "../utils/request";
import { FaSuitcase } from "react-icons/fa";
import { IoMdSettings} from 'react-icons/io'
import ServerError from "./ServerError";

function Sidebar() {
  const [serverError,setServerError] = useState(false)


  const handleLogout = async () => {
   try {
    await apiRequest
    .get("/accusation_acceptor_user_api/logout_accusation_acceptor")
    .then((res) => {
      sessionStorage.clear();
      window.location.href = "/login";
    })
    .catch((error) => {
      if (
        error.response.status === 401 &&
        error.response.data.Message === "Token expired. Please log in again."
      ) {
        window.location.href = "/login";
      }
    });
    
   } catch (error) {
    setServerError(true)
    
   }
  };
  if(serverError) return <ServerError />
  return (
    <div className="w-[15%] h-[100%] bg-[#0C73B8] fixed top-0 left-0">
      <div className="w-[80%] mx-auto  mt-[30px]  flex flex-col justify-center items-center gap-[20px]">
        <img
          className="w-[80px] h-[80px] border rounded-full object-cover"
          src={require("../CAS/housingLogo.png")}
          alt=""
        />
        <span className="text-white text-center text-[14px] max-lg2:text-[10px]">
          አዲስ አበባ ቤቶች ልማት ኮርፖሬሽን
        </span>
      </div>
      <div className="flex flex-col justify-between h-[85%]  max-lg2:text-[12px]">
        <div className="w-[80%] mt-[50px] mx-auto flex flex-col gap-[30px]">
        

<Link
            to="/"
            className="w-[100%] flex items-center gap-[10px] text-white"
          >
            <FaSuitcase />
            <span className="font-bold">Accusations</span>
          </Link>
    
      
       

        
         
        </div>
        <div className="min-h-[150px] my-[20px] ">
        <Link
            to={"/settings"}
            className="w-[80%] my-[30px] mx-auto flex items-center gap-[20px] text-white"
          >
           <IoMdSettings />
            <span className="font-bold">Account Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-[80%] my-[30px] mx-auto flex items-center gap-[20px] text-white"
          >
            <FiLogOut />
            <span className="font-bold">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
