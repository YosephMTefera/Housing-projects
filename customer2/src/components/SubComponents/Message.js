import React from 'react'
import {CgCheckO} from 'react-icons/cg'
function Message({successMessage}) {
  return (
    <div className='z-[10] absolute top-6 left-[25%] w-[35%] h-[400px] bg-[#FBFBFB] shadow-xl rounded-[10px]'>
            <div className='bg-[#0C73B8] w-[100%] text-[20px] text-white h-[40%] rounded-[10px] flex flex-col justify-center items-center gap-[20px]'>
                <CgCheckO className='text-[50px]'/>
                <span className='uppercase text-[16px] font-bold'>Success</span>

        </div>
        <div className='w-[60%] mx-auto h-[50%] flex justify-center items-center'>
            <span className='font-bold'>{successMessage}</span>


        </div>
    </div>
  )
}

export default Message