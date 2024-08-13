import React from 'react'

function ServerError() {
  return (
    <div className="w-[100%] min-h-[50vh] flex justify-center items-center">
<div className='w-[90%] mx-auto flex flex-col justify-center items-center gap-[20px]'>
<span className='text-[40px] font-bold text-[#0C73B8] capitalize'>Something went wrong</span>
<span className='text-center text-[14px] text-gray-500'>It seems like there was an error connecting to the server. Please try again later. Thank you for your patience.</span>
    <button onClick={()=>window?.location?.reload()} className='py-2 px-4 bg-[#0C73B8] rounded-[5px] text-white text-[12px]'>Reload</button>
</div>
      </div>
  )
}

export default ServerError