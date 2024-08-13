import React, { useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { language } from "../../../utils/part-1lan";
import { useNavigate, useParams } from "react-router-dom";
import apiRequest from '../../../utils/request';
import Loading from '../../Loading';
import ServerError from '../../ServerError';

function PresystemDetail() {
    const navigate = useNavigate();
    const {id,type} = useParams();
    const token = sessionStorage.getItem('tID')
    const translationState = useSelector((state)=>state.translation);
    const [presystemLetter,setPresystemLetter] = useState({});
    const [archivalCategory,setArchivalCategory] = useState([]);
    const [noPresystemLetter,setnoPresystemLetter] = useState(false);
    const [loading,setLoading] = useState(false);
    const [serverError,setServerError] = useState(false)

    useEffect(()=>{

        try {
            setLoading(true)
            apiRequest.get(`/archival_letter_api/get_letter/${id}`,{
                headers:{
                  get_geletter_api:process.env.REACT_APP_GET_GELETTER_API,
                    Authorization:`bearer ${token}`
                }
            }).then((res)=>{
                setLoading(false)
                setPresystemLetter(res.data);
            }).catch((error)=>{
                setLoading(false)
                if(error?.response?.status ===500){
                    setServerError(true)
                    
                }
                if(error?.response?.status ===406){
                  setnoPresystemLetter(true);
                }
            })
            
        } catch (error) {
            setLoading(false)
            setServerError(true)
            
        }
      
    },[id,token])

    useEffect(() => {
      try {
        setLoading(true);
        apiRequest
          .get(`/archival_category_api/get_arch_bydocId/${id}/presystem`, {
            headers: {
              Authorization: "Token " + token,
              get_docarchcat_api: process.env.REACT_APP_GET_DOCARCHCAT_API,
            },
          })
          .then((res) => {
            setLoading(false);
            if (res?.status === 200) {
              setServerError(false);
              setArchivalCategory(res?.data);
            }
          })
          .catch((error) => {
            setLoading(false);
            if (error?.response?.status === 500) {
              setServerError(true);
            }
          });
      } catch (error) {
        setLoading(false);
        setServerError(true);
      }
      // eslint-disable-next-line
    }, [id]);

    if(noPresystemLetter) return <div className="w-[80%] mx-auto rounded-[20px] min-h-[200px] py-2 bg-white flex flex-col justify-center items-center  gap-[10px] my-[20px]">
    <span className="font-bold text-[#0C73B8]">
    {translationState?.lan === "En" && language?.noPresystemLetter[0]}
    {translationState?.lan === "Am" && language?.noPresystemLetter[1]}
    </span>
    <button
                onClick={() => navigate(`/`)}
                className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[10px] font-bold max-lg2:text-[10px]"
              >
                {translationState?.lan === "En" && language?.back[0]}
                {translationState?.lan === "Am" && language?.back[1]}
              </button>
  </div>
  
    
    if(serverError) return <ServerError />
  return (
    <div className="w-[100%] bg-white min-h-[90vh]">
    {loading ? <Loading addtionalStyle={"flex justify-center items-center my-[20px]"}/>:   <div className="w-[90%] my-[50px] mx-auto max-lg2:my-[30px]">
     <div className="flex justify-between items-center  gap-[5px]">
       <div className="flex items-center gap-[5px] font-bold text-[#0C73B8]">
         <IoChevronBack
           onClick={() => navigate(-1)}
           className="text-[30px] cursor-pointer"
         />
         <span>{translationState?.lan==="En" && language?.letterInformation[0]}
         {translationState?.lan==="Am" && language?.letterInformation[1]} - 1</span>
         <div className="flex justify-center  items-center text-[14px] font-bold max-lg2:text-[12px]">
           {presystemLetter?.status === "created" && (
             <span className="py-2 px-4 rounded-[20px] text-gray-700">
           ({translationState?.lan==="En" && language?.createdl[0]}
              {translationState?.lan==="Am" && language?.createdl[1]})
             </span>
           )}

           {presystemLetter?.status === "forwarded" && (
             <span className="py-2 px-4 rounded-[5px] text-green-600">
             (  {translationState?.lan==="En" && language?.forwardedl[0]}
              {translationState?.lan==="Am" && language?.forwardedl[1]})
             </span>
           )}
         </div>
       </div>
       <div className="flex items-center gap-[10px]">
      
           <div className="flex gap-[10px]">

            {type !=="cc" &&     <button onClick={()=>navigate(`/letters/forward/presystem/${presystemLetter?._id}`)} className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]">
             {translationState?.lan==="En" && language?.forward[0]}
             {translationState?.lan==="Am" && language?.forward[1]}
             </button>}

         
         {type !=="cc" &&   <button onClick={()=>navigate(`/letters/reply/presystem/${presystemLetter?._id}`)} className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]">
             {translationState?.lan==="En" && language?.reply[0]}
             {translationState?.lan==="Am" && language?.reply[1]}
             </button>}
           
           <button onClick={()=>navigate(`/letters/forward/path/presystem/${presystemLetter?._id}`)} className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]">
             {translationState?.lan==="En" && language?.forwardPath[0]}
             {translationState?.lan==="Am" && language?.forwardPath[1]}
             </button>
             <button onClick={()=>navigate(`/letters/reply/path/presystem/${presystemLetter?._id}`)} className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]">
             {translationState?.lan==="En" && language?.replyPath[0]}
             {translationState?.lan==="Am" && language?.replyPath[1]}
             </button>
           
           </div>

       
       </div>
     </div>

    
     <div className="w-[100%] my-[30px] grid grid-cols-2 gap-[10px]">
     <div className="w-[100%] col-span-1">
         <label
     
           className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
         >
        {translationState?.lan==="En" && language?.letterType[0]}
        {translationState?.lan==="Am" && language?.letterType[1]} 
         </label>
         <div className="mt-2 flex gap-[10px]">
          {presystemLetter?.letter_type ==="in" && <>
            
          {translationState?.lan==="En" &&  <input
             required
             value={language?.incoming[0]}
             disabled
             className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
           />}
            {translationState?.lan==="Am" &&  <input
             required
             value={language?.incoming[1]}
             disabled
             className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
           />}
            
          </>}
          {presystemLetter?.letter_type ==="out" && <>
            
            {translationState?.lan==="En" &&  <input
             required
             value={language?.outgoing[0]}
             disabled
             className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
           />}
            {translationState?.lan==="Am" &&  <input
             required
             value={language?.outgoing[1]}
             disabled
             className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
           />}
              
            </>}
            {presystemLetter?.letter_type ==="internal" && <>
            
            {translationState?.lan==="En" &&  <input
             required
             value={language?.internal[0]}
             disabled
             className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
           />}
            {translationState?.lan==="Am" &&  <input
             required
             value={language?.internal[1]}
             disabled
             className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
           />}
              
            </>}
          
         </div>
       </div>
     <div className="w-[100%] col-span-1">
         <label
     
           className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
         >
        {translationState?.lan==="En" && language?.archivalNumber[0]}
        {translationState?.lan==="Am" && language?.archivalNumber[1]} 
         </label>
         <div className="mt-2 flex gap-[10px]">
           <input
             required
             value={presystemLetter?.letter_number ? presystemLetter?.letter_number:"-"}
             disabled
             className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
           />
         </div>
       </div>
      
     <div className="w-[100%] col-span-1">
         <label
     
           className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
         >
         {translationState?.lan==="En" && language?.letterNumber[0]} {translationState?.lan==="Am" && language?.letterNumber[1]} 
         </label>
         <div className="mt-2 flex gap-[10px]">
           <input
             required
             value={presystemLetter?.nimera ? presystemLetter?.nimera:"-"}
             disabled
             className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
           />
         </div>
       </div>
      
       <div className="w-[100%] col-span-2">
         <label
     
           className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
         >
    {translationState?.lan==="En" && language?.from[0]}
    {translationState?.lan==="Am" && language?.from[1]} 
         </label>
         <div className="mt-2">
           <input
             required
             value={presystemLetter?.sent_from ? presystemLetter?.sent_from:"-"}
             disabled
             className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
           />
         </div>
       </div>

          
       <div className="w-[100%] col-span-2">
         <label
     
           className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
         >
    {translationState?.lan==="En" && language?.to[0]}
    {translationState?.lan==="Am" && language?.to[1]} 
         </label>
         <div className="mt-2">
           <input
             required
             value={presystemLetter?.sent_from ? presystemLetter?.sent_to:"-"}
             disabled
             className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
           />
         </div>
       </div>

      

    

       <div className="w-[100%] col-span-2">
         <label
          
           className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
         >
        {translationState?.lan==="En" && language?.subject[0]}
        {translationState?.lan==="Am" && language?.subject[1]} 
         </label>
         <div className="mt-2 flex gap-[10px]">
           <input
             required
             value={presystemLetter?.subject ? presystemLetter?.subject:"-"}
             disabled
             className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
           />
         </div>
       </div>

       <div className="w-[100%] col-span-1">
         <label
      
           className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
         >
        {translationState?.lan==="En" && language?.letterSent[0]}
        {translationState?.lan==="Am" && language?.letterSent[1]} 
         </label>
         <div className="mt-2 flex gap-[10px]">
           <input
             required
             value={presystemLetter?.sent_date ? presystemLetter?.sent_date:"-"}
             // value={new Date(letterInfo?.letter_sent_date)?.toDateString()}
             disabled
             className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
           />
         </div>
       </div>
       <div className="w-[100%] col-span-1">
         <label
      
           className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
         >
        {translationState?.lan==="En" && language?.letterReceived[0]}
        {translationState?.lan==="Am" && language?.letterReceived[1]} 
         </label>
         <div className="mt-2 flex gap-[10px]">
           <input
             required
             value={presystemLetter?.received_date ? presystemLetter?.received_date:"-"}
            
             disabled
             className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
           />
         </div>
       </div>
       <div className="w-[100%] col-span-2">
         <label
      
           className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
         >
        {translationState?.lan==="En" && language?.noOfAttachment[0]}
        {translationState?.lan==="Am" && language?.noOfAttachment[1]} 
         </label>
         <div className="mt-2 flex gap-[10px]">
           <input
             required
             value={presystemLetter?.no_attachment ? presystemLetter?.no_attachment:"-"}
            
             disabled
             className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
           />
         </div>
       </div>
       <div className="w-[100%] col-span-2">
         <label
      
           className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
         >
        {translationState?.lan==="En" && language?.description[0]}
        {translationState?.lan==="Am" && language?.description[1]} 
         </label>
         <div className="mt-2 flex gap-[10px]">
           <textarea
             required
             value={presystemLetter?.description ? presystemLetter?.description:"-"}
            
             disabled
             className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
           ></textarea>
         </div>
       </div>
       <div className="w-[100%] col-span-1">
         <label
        
           className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
         >
          {translationState?.lan==="En" && language?.createdBy[0]}
          {translationState?.lan==="Am" && language?.createdBy[1]}
         </label>
         <div className="mt-2 flex gap-[10px]">
           <input
             required
       
             value={
              presystemLetter?.createdBy?.firstname +
               " " +
               presystemLetter?.createdBy?.middlename +
               " " +
               presystemLetter?.createdBy?.lastname
             }
             disabled
             className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
           />
         </div>
       </div>
     </div>
     {archivalCategory?.length > 0 &&  <div className="w-[100%] col-span-1">
         <label
      
           className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
         >
        {translationState?.lan==="En" && language?.archivalCategory[0]}
        {translationState?.lan==="Am" && language?.archivalCategory[1]} 
         </label>
         <div className="mt-2 flex gap-[10px]">
    
             <div  className="block flex-1 rounded-md p-4 border-0  bg-gray-100  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]">
            {archivalCategory?.map((archive,index)=>{
              return <div key={index}>
            
       
              
              <span>
              <span>{index + 1}. {" "}</span>{" "}
              {translationState?.lan==="En" && archive?.name_en}
              {translationState?.lan==="Am" && archive?.name_am}
              {" "}

              </span>
              </div>
             
                 })}
            </div>
       
        
         </div>
       </div>}
     {presystemLetter?.letter_attachment && (
       <div className="w-[100%] flex flex-col my-[20px]">
         <span className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
         {translationState?.lan==="En" && language?.letter[0]}
         {translationState?.lan==="Am" && language?.letter[1]}
         </span>
         <div className="w-[100%] my-4 overflow-y-scroll">
           {presystemLetter?.letter_attachment && (
             <embed
               src={`${process.env.REACT_APP_BACKEND_IMAGES}/LetterFiles/${presystemLetter?.letter_attachment}`}
               type="application/pdf"
               width="100%"
               height="800px"
             />
           )}
         </div>
       </div>
     )}
   </div>}



 </div>
  )
}

export default PresystemDetail