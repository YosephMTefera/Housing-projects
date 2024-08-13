import React, { useState } from "react";
import { AiFillFolderAdd } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { RiHome5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import { CgOrganisation } from "react-icons/cg";
import {FaClipboard, FaSuitcase} from 'react-icons/fa'
import apiRequest from "../utils/request";


function Sidebar() {
  const [accountDropdownState, setAccountDropDownState] = useState(false);
  const [orgDropdownState, setORGDropDownState] = useState(false);

  const handleLogout = async () => {
    await apiRequest
      .get("/customer_user_api/logout_customer_user")
      .then((res) => {
        sessionStorage.clear();
        window.location.href = "/login";
      })
      .catch((error) => {
        if (
          error?.response?.status === 401
        ) {
          window.location.href = "/login";
        }
      });
  };
  return (
    <div className="w-[15%] h-[100%] bg-[#0C73B8] fixed top-0 left-0 overflow-y-auto hide-scroll-bar">
      <div className="w-[80%] mx-auto  mt-[30px]  flex flex-col justify-center items-center gap-[20px]">
        <img
          className="w-[80px] h-[80px] border rounded-full object-cover"
          src={require("../CAS/housingLogo.png")}
          alt=""
        />
        <span className="text-white text-center text-[14px] max-lg2:text-[12px]">
          አዲስ አበባ ቤቶች ልማት ኮርፖሬሽን
        </span>
      </div>
      <div className="flex flex-col justify-between h-[85%]  max-lg2:text-[10px]">
        <div className="w-[80%] mt-[50px] mx-auto flex flex-col gap-[30px]">
          <Link
            to="/"
            className="w-[100%] flex items-center gap-[20px] text-white"
          >
            <RiHome5Line />
            <span className="font-bold">Dashboard</span>
          </Link>
          <div
            href="/accounts"
            className="relative w-[100%] flex flex-col gap-[20px] text-white"
          >
            <div
              onClick={() => setAccountDropDownState(!accountDropdownState)}
              className="relative w-[100%]  cursor-pointer flex justify-between items-center gap-[20px] text-white"
            >
              <div className="flex items-center gap-[20px]">
                <AiFillFolderAdd />
                <span className="font-bold">Accounts</span>
              </div>
              <div>
                {accountDropdownState ? <BsChevronDown /> : <BsChevronRight />}
              </div>
            </div>

            {accountDropdownState && (
              <div className="w-[70%] text-[14px] mx-auto flex flex-col gap-[20px]  max-lg2:text-[10px] max-lg2:gap-[10px]">
                <Link
                  to="/adminstrators"
                  className="w-[100%] flex items-center gap-[20px]  text-gray-200 hover:text-gray-300"
                >
                  Administrators
                </Link>
                <Link
                  to="/archivalusers"
                  className="w-[100%] flex items-center gap-[20px]  text-gray-200 hover:text-gray-300"
                >
                  Archival users
                </Link>
                <Link
                  to="/windowusers"
                  className="w-[100%] flex items-center gap-[20px]  text-gray-200 hover:text-gray-300"
                >
                  Window Service
                </Link>
                <Link
                  to="/ethicsusers"
                  className="w-[100%] flex items-center gap-[20px]  text-gray-200 hover:text-gray-300"
                >
                  Ethics Users
                </Link>
                <Link
                  to="/customers"
                  className="w-[100%] flex items-center gap-[20px]  text-gray-200 hover:text-gray-300"
                >
                  Customers
                </Link>
              </div>
            )}
          </div>
          {/* ORG Structure */}

          <div
            href="/orgstructure"
            className="relative w-[100%] flex flex-col gap-[20px] text-white"
          >
            <div
              onClick={() => setORGDropDownState(!orgDropdownState)}
              className="relative w-[100%] cursor-pointer flex justify-between items-center gap-[20px] text-white"
            >
              <div className="flex items-center gap-[20px]">
                <CgOrganisation />
                <span className="font-bold">Org. Structure</span>
              </div>
              <div>
                {orgDropdownState ? <BsChevronDown /> : <BsChevronRight />}
              </div>
            </div>

            {orgDropdownState && (
              <div className="w-[70%] text-[14px] mx-auto flex flex-col gap-[20px] max-lg2:text-[10px] max-lg2:gap-[10px]">
                <Link
                  to="/division"
                  className="w-[100%] flex items-center gap-[20px]  text-gray-200 hover:text-gray-300"
                >
                  Division
                </Link>
                <Link
                  to="/directorate"
                  className="w-[100%] flex items-center gap-[20px]  text-gray-200 hover:text-gray-300"
                >
                  Directorate
                </Link>
                <Link
                  to="/teamleader"
                  className="w-[100%] flex items-center gap-[20px]  text-gray-200 hover:text-gray-300"
                >
                  Teams
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/caselist"
            className="w-[100%] flex items-center gap-[20px] text-white"
          >
            <FaSuitcase />
            <span className="font-bold">Case Requests</span>
          </Link>
          <Link
            to="/questions"
            className="w-[100%] flex items-center gap-[20px] text-white"
          >
         <FaClipboard />
            <span className="font-bold">Questions</span>
          </Link>
        </div>
        <div className="max-lg2:my-[10px]">
          <button
            onClick={handleLogout}
            className="w-[80%] my-[100px] mx-auto flex items-center gap-[20px] text-white"
          >
            <FiLogOut />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
