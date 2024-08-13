import React, { useState } from 'react'
import { AiFillFolderAdd, AiOutlineClose } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { RiHome5Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import {  FaSuitcase } from 'react-icons/fa';
import { BsChevronDown, BsChevronRight } from 'react-icons/bs';
import { CgOrganisation } from 'react-icons/cg';
import { TbProgress } from 'react-icons/tb';

function ResponsiveSidebar() {
   
    const [accountDropdownState, setAccountDropDownState] = useState(false);
    const [orgDropdownState, setORGDropDownState] = useState(false);

  
  return (
    <div className="w-[50%] h-[92%]  fixed top-[100px] left-0 bg-[#0C73B8] z-10 min-[750px]:hidden">
        <div className="w-[80%] mx-auto  mt-[30px]  flex justify-end items-center">
     <AiOutlineClose className='text-white text-[30px] cursor-pointer' 
  
    />
    </div>
  
    <div className="flex flex-col justify-between h-[85%]  max-[1500px]:text-[14px]">
      <div className="w-[80%] mt-[50px] mx-auto flex flex-col gap-[30px]">
        <Link
          to="/"
          className="w-[100%] flex items-center gap-[20px] text-white"
        >
          <RiHome5Line />
          <span className="font-medium">Dashboard</span>
        </Link>
        <div
          href="/accounts"
          className="relative w-[100%] flex flex-col gap-[20px] text-white"
        >
          <div
            onClick={() => setAccountDropDownState(!accountDropdownState)}
            className="relative w-[100%] cursor-pointer flex justify-between items-center gap-[20px] text-white"
          >
            <div className="flex items-center gap-[20px]">
              <AiFillFolderAdd />
              <span className="font-medium">Accounts</span>
            </div>
            <div>
              {accountDropdownState ? <BsChevronDown /> : <BsChevronRight />}
            </div>
          </div>

          {accountDropdownState && (
            <div className="w-[70%] text-[14px] mx-auto flex flex-col gap-[20px]">
          
            
              <Link
                to="/adminstrators"
                className="w-[100%] flex items-center gap-[20px] text-white hover:text-gray-400"
              >
                Administrators
              </Link>
              
              <Link
                to="/adminstrators"
                className="w-[100%] flex items-center gap-[20px] text-white hover:text-gray-400"
              >
                Archival
              </Link>
            
            </div>
          )}
        </div>
        

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
              <span className="font-medium">Org. Structure</span>
            </div>
            <div>
              {orgDropdownState ? <BsChevronDown /> : <BsChevronRight />}
            </div>
          </div>

          {orgDropdownState && (
            <div className="w-[70%] text-[14px] mx-auto flex flex-col gap-[20px]">
              <Link
                to="/division"
                className="w-[100%] flex items-center gap-[20px] text-white hover:text-gray-400"
              >
                Division
              </Link>
              <Link
                to="/directorate"
                className="w-[100%] flex items-center gap-[20px] text-white hover:text-gray-400"
              >
                Directorate
              </Link>
              <Link
                to="/teamleader"
                className="w-[100%] flex items-center gap-[20px] text-white hover:text-gray-400"
              >
                Teams
              </Link>
            </div>
          )}
        </div>
      
        <Link
          to="/casetype_add"
          className="w-[100%] flex items-center gap-[20px] text-white"
        >
          <FaSuitcase />
          <span className="font-medium">Case List</span>
        </Link>
      </div>
      <div className="w-[80%] mx-auto flex flex-col gap-[20px]">
        <Link
          to="/"
          className="w-[100%] flex items-center gap-[20px] text-white"
        >
          <TbProgress />
          <span>Help and Support</span>
        </Link>
        <button
     
          className="w-[100%] mx-auto flex items-center gap-[20px] text-white"
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  </div>
  )
}

export default ResponsiveSidebar