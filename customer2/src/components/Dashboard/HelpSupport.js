import React from 'react'
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function HelpSupport() {
    const navigate = useNavigate()
  return (
    <div className='w-[90%] my-[30px] mx-auto bg-white min-h-[700px] rounded-[20px]'>
        <div className='w-[95%] mx-auto my-[50px]'>
        <div className="flex items-center font-bold text-[#0C73B8] gap-[5px]">
          <IoChevronBack
            onClick={() => navigate(-1)}
            className="text-[30px] cursor-pointer"
          />
          <span className='text-[20px] max-lg2:text-[16px]'>Help</span>
        </div>
        <div className='w-[80%] mx-auto my-[30px]'>
            <div className='flex flex-col gap-[20px]'>
                <span className='text-[20px] text-[#0C73B8] font-bold'>1. How to apply a case ?</span>
                
                   <div className='w-[90%] mx-auto flex flex-col gap-[10px] text-[14px] text-gray-600'>
                   <li>Click on apply case (sidebar)</li>
                    <li>Choose division</li>
                    <li>Choose case request</li>
                    <li>Choose case number <b className='text-black'>(optional)</b></li>
                    <li>Answer the neccessary question required by the case request</li>
                    <li>Upload an attachment <b className='text-black'>(optional)</b></li>
                    <li>Provide additional remark / description if it supports your case (optional)</li>
                    <li>Click on apply</li>
                   </div>

                
            </div>
        </div>
        </div>
    </div>
  )
}

export default HelpSupport