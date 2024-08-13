import React, { useState } from 'react'
import { BiChevronLeft } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import {BsFillCloudUploadFill} from 'react-icons/bs'

function CreateMemo() {
    const navigate = useNavigate();
    const [memoLetter,setMemoLetter] = useState("")
  return (
    <div className='w-[90%] p-2 mx-auto my-[50px] rounded-[10px] bg-white'>
    <div className='w-[90%] mx-auto mt-[30px] flex flex-col gap-[20px]'>
     <div>
     <div className='flex items-center justify-between gap-[10px]  text-[#0C73B8]'>
       <div className='flex items-center justify-start'>
       <BiChevronLeft onClick={()=>navigate(-1)} className='text-[40px] cursor-pointer' />
       <span className='text-[20px] font-bold'>Create memo</span>
       </div>
      
     </div>
     </div>
     {/* <div>
         {rerror !=="" &&<span>{rerror}</span>}
     </div> */}

     <div className="w-[100%]">
             <label
            
               className="block  font-bold p-2 leading-6 text-[#0C73B8]"
             >
               Title <span className="text-red-700">*</span>
             </label>
             <div className="mt-2">
               <input
               required
                 type="text"
                 // onChange={(e)=>setTitle(e.target.value)}
                 className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
               />
             </div>
           </div>
     
    
  
     
     <div>
     <div className='w-[100%] mt-[30px] flex flex-col gap-[10px]'>
     <span className="font-bold w-[80%]  text-[#0C73B8]">
          Memo Letter <span className="text-red-700">*</span>
         </span>
         <label>
             <input type='file' 
             onChange={(e) => setMemoLetter(e.target.files[0])} 
              hidden />
             <div className='[w-[70%] h-[200px] text-[#0C73B8] flex justify-center gap-[10px]  items-center p-4 mx-auto border border-gray-300 rounded border-dashed cursor-pointer text-center'>
                 <BsFillCloudUploadFill />
                 <span className='font-bold '>Upload Memo Letter</span>

             </div>
         </label>

     </div>
     <div className="w-[100%] my-4 overflow-y-scroll">
  
     {memoLetter && (
       <embed
         src={URL.createObjectURL(memoLetter)}
         type="application/pdf"
         width="100%"
         height="600px"
       />
     )}
   </div>

     <div className="w-[100%] mt-[20px]">
             <label
               htmlFor="last-name"
               className="block font-bold p-2 leading-6 text-[#0C73B8]"
             >
               Remark
             </label>
             <div className="mt-2">
               <textarea
                 rows={6}
                 // onChange={(e)=>setRemark(e.target.value)}
                 className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 resize-none"
               ></textarea>
             </div>
           </div>
     </div>

     <div className='w-[100%] mt-[30px] py-3 flex justify-end items-center gap-[20px]'>
         <button onClick={()=>navigate(-1)}>Cancel</button>
         <button  className="rounded-md bg-[#0C73B8] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Create Memo</button>
     </div>

   
    
     </div>

 </div>
  )
}

export default CreateMemo