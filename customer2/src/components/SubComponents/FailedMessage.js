import React from 'react'
import {FaTimesCircle} from 'react-icons/fa'

function FailedMessage({failedMessage}) {
  return (
    <div className='z-[10] absolute top-6 left-[25%] w-[35%] h-[400px] bg-[#FBFBFB] shadow-xl rounded-[10px]'>
    <div className='bg-red-800 w-[100%] text-[20px] text-white h-[40%] rounded-[10px] flex flex-col justify-center items-center gap-[20px]'>
        <FaTimesCircle className='text-[50px]'/>
        <span className='uppercase text-[16px] font-bold'>Failed</span>

</div>
<div className='w-[60%] mx-auto h-[50%] flex justify-center items-center'>
    <span className='font-bold text-center'>{failedMessage}</span>


</div>

</div>
  )
}

export default FailedMessage