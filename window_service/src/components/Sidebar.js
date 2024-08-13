import React from "react";
import { FiLogOut } from "react-icons/fi";
import { AiFillDashboard } from "react-icons/ai";
import { Link } from "react-router-dom";
import apiRequest from "../utils/request";
import { FaCheckCircle, FaSuitcase } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { language } from "../utils/part-1lan";
import {useSelector} from 'react-redux'

function Sidebar() {
  const translationState = useSelector((state)=>state.translation)
  const handleLogout = async () => {
    await apiRequest
      .get("/customer_user_api/logout_customer_user")
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
  };
  return (
    <div className="w-[15%] h-[100%] bg-[#0C73B8] fixed top-0 left-0">
      <div className="w-[80%] mx-auto  mt-[30px]  flex flex-col justify-center items-center gap-[20px]">
        <img
          className="w-[80px] h-[80px]  rounded-full object-cover"
          src={require("../CAS/housingLogo.png")}
          alt=""
        />
        <span className="text-white text-center font-bold text-[14px] max-lg2:text-[10px]">
          አዲስ አበባ ቤቶች ልማት ኮርፖሬሽን
        </span>
      </div>
      <div className="flex flex-col justify-between h-[85%]  max-lg2:text-[12px]">
        <div className="w-[80%] mt-[50px] mx-auto flex flex-col gap-[30px]">
          <Link
            to="/"
            className="w-[100%] flex items-center gap-[10px] text-white"
          >
            <AiFillDashboard />
            <span className="font-bold">
            {translationState?.lan ==="En" && language?.dashboard[0]}
            {translationState?.lan ==="Am" && language?.dashboard[1]}
            </span>
          </Link>

          <Link
            to="/cases"
            className="w-[100%] flex items-center gap-[10px] text-white"
          >
            <FaSuitcase />
            <span className="font-bold">
            {translationState?.lan ==="En" && language?.cases[0]}
            {translationState?.lan ==="Am" && language?.cases[1]}
            </span>
          </Link>

          <Link
            to="/createcase"
            className="w-[100%] flex items-center gap-[10px] text-white"
          >
            <IoMdAddCircle />
            <span className="font-bold">
            {translationState?.lan ==="En" && language?.createCase[0]}
            {translationState?.lan ==="Am" && language?.createCase[1]}
            </span>
          </Link>

          <Link
            to="/checkstatus"
            className="w-[100%] flex items-center gap-[10px] text-white"
          >
            <FaCheckCircle />
            <span className="font-bold">
            {translationState?.lan ==="En" && language?.checkStatus[0]}
            {translationState?.lan ==="Am" && language?.checkStatus[1]}
            </span>
          </Link>
        </div>
        <div className="min-h-[150px] my-[20px] ">
        
          <button
            onClick={handleLogout}
            className="w-[80%] my-[30px] mx-auto flex items-center gap-[20px] text-white"
          >
            <FiLogOut />
            <span className="font-bold">
            {translationState?.lan ==="En" && language?.logout[0]}
            {translationState?.lan ==="Am" && language?.logout[1]}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
