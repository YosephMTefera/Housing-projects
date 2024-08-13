import React from 'react'
import { FaHandPointRight } from 'react-icons/fa'
import { LuPcCase } from 'react-icons/lu'
import {useSelector} from 'react-redux'
import {language} from '../utils/part-1lan'

function LandingSidebar() {
  const translationState = useSelector((state)=>state?.translation)
  return (
    <div className='w-[100%] min-h-[150px] bg-white fixed top-[150px] left-0 hidden max-sm1:block'>
        <div className='w-[80%] mt-[50px] text-[#0C73B8] mx-auto flex flex-col gap-[20px]'>
            <div className='flex items-center gap-[10px] hover:underline'>
            <LuPcCase />
            <a href='/checkstatus'>
            {translationState?.lan === "En" &&
                          language?.checkCaseStatus[0]}
                        {translationState?.lan === "Am" &&
                          language?.checkCaseStatus[1]}
            </a>
            </div> 
            <div className='flex items-center gap-[10px] hover:underline'>
            <FaHandPointRight />
            <a href='/makeaccusation'>
            {translationState?.lan === "En" &&
                          language?.makeAccusation[0]}
                        {translationState?.lan === "Am" &&
                          language?.makeAccusation[1]}</a>
            </div> 

        </div>
    </div>
  )
}

export default LandingSidebar