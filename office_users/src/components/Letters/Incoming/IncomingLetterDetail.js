import React,{useState,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoChevronBack } from "react-icons/io5";
import { language } from "../../../utils/part-1lan";
import { jwtDecode } from "jwt-decode";
import Loading from "../../Loading";
import apiRequest from "../../../utils/request";
import ServerError from "../../ServerError";

function IncomingLetterDetail() {
  const navigate = useNavigate();
  const { id,type } = useParams();
  const token = sessionStorage.getItem('tID')
  const decodedToken = jwtDecode(token);
  const userID = decodedToken?.user?.id;
  const translationState = useSelector((state)=>state.translation);
  const [incomingLetter,setIncomingLetter] = useState({});
  const [archivalCategory,setArchivalCategory] = useState([]);
  const [user,setUser] = useState({})
  const [loading,setLoading] = useState(false);
  const [serverError,setServerError] = useState(false)


  useEffect(() => {
    setLoading(true);
    try {
      apiRequest
        .get(`/office_user_api/get_office_user/${userID}`, {
          headers: {
            get_user_api: process.env.REACT_APP_GET_USER_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setUser(res.data);
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
  }, [userID, token]);

  useEffect(()=>{

      try {
          setLoading(true)
          apiRequest.get(`/incoming_ltr/get_incoming_ltr/${id}`,{
              headers:{
                  get_incltrs_api:process.env.REACT_APP_GET_INCLTRS_API,
                  Authorization:`bearer ${token}`
              }
          }).then((res)=>{
              setLoading(false)
              setIncomingLetter(res.data);
          }).catch((error)=>{
              setLoading(false)
              if(error?.response?.status ===500){
                  setServerError(true)
                  
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
        .get(`/archival_category_api/get_arch_bydocId/${id}/incomingLtr`, {
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
  
  if(serverError) return <ServerError />
  

  return (
    <div className="w-[100%] bg-white">
    {loading ? <Loading addtionalStyle={"flex justify-center items-center my-[20px]"}/>:   <div className="w-[90%] my-[50px] mx-auto max-lg2:my-[30px]">
     <div className="flex justify-between items-center  gap-[5px]">
       <div className="flex items-center gap-[5px] font-bold text-[#0C73B8]">
         <IoChevronBack
           onClick={() => navigate(-1)}
           className="text-[30px] cursor-pointer"
         />
         <span>{translationState?.lan==="En" && language?.letterInformation[0]}
         {translationState?.lan==="Am" && language?.letterInformation[1]} - 1</span>
        
       </div>
       <div className="flex items-center gap-[10px]">
        
           <div className="flex gap-[10px]">
            {type !== "cc" && <>
            {user?.level !=="Professionals" && <button onClick={()=>navigate(`/letters/forward/incoming/${incomingLetter?._id}`)} className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]">
             {translationState?.lan==="En" && language?.forward[0]}
             {translationState?.lan==="Am" && language?.forward[1]}
             </button>}
             
             <button onClick={()=>navigate(`/letters/reply/incoming/${incomingLetter?._id}`)} className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]">
             {translationState?.lan==="En" && language?.reply[0]}
             {translationState?.lan==="Am" && language?.reply[1]}
             </button>
            </>}
          
           
           <button onClick={()=>navigate(`/letters/forward/path/incoming/${incomingLetter?._id}`)} className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]">
             {translationState?.lan==="En" && language?.forwardPath[0]}
             {translationState?.lan==="Am" && language?.forwardPath[1]}
             </button>
             <button onClick={()=>navigate(`/letters/reply/path/incoming/${incomingLetter?._id}`)} className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]">
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
        {translationState?.lan==="En" && language?.letterNumber[0]}
        {translationState?.lan==="Am" && language?.letterNumber[1]} 
         </label>
         <div className="mt-2 flex gap-[10px]">
           <input
             required
             value={incomingLetter?.incoming_letter_number ? incomingLetter?.incoming_letter_number:"-"}
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
             value={incomingLetter?.attention_from ? incomingLetter?.attention_from:"-"}
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
             value={incomingLetter?.subject ? incomingLetter?.subject:"-"}
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
             value={incomingLetter?.sent_date ? incomingLetter?.sent_date:"-"}
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
             value={incomingLetter?.received_date ? incomingLetter?.received_date:"-"}
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
          {translationState?.lan==="En" && language?.createdBy[0]}
          {translationState?.lan==="Am" && language?.createdBy[1]}
         </label>
         <div className="mt-2 flex gap-[10px]">
           <input
             required
       
             value={
              incomingLetter?.createdBy?.firstname +
               " " +
               incomingLetter?.createdBy?.middlename +
               " " +
               incomingLetter?.createdBy?.lastname
             }
             disabled
             className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
           />
         </div>
       </div>
       
       <div className="w-[100%] col-span-1">
         <label
      
           className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
         >
        {translationState?.lan==="En" && language?.noOfAttachment[0]}
        {translationState?.lan==="Am" && language?.noOfAttachment[1]} 
         </label>
         <div className="mt-2 flex gap-[10px]">
           <input
             required
             value={incomingLetter?.no_attachment ? incomingLetter?.no_attachment:"0"}
            
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

     {incomingLetter?.main_letter && (
       <div className="w-[100%] flex flex-col my-[20px]">
         <span className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
         {translationState?.lan==="En" && language?.letter[0]}
         {translationState?.lan==="Am" && language?.letter[1]}
         </span>
         <div className="w-[100%] my-4 overflow-y-scroll">
           {incomingLetter?.main_letter && (
             <embed
               src={`${process.env.REACT_APP_BACKEND_IMAGES}/IncomingLetterFiles/${incomingLetter?.main_letter}`}
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

export default IncomingLetterDetail