import React, { useEffect, useState } from "react";
import apiRequest from "../../utils/request";
import { useNavigate, useParams } from "react-router-dom";
import ServerError from "../ServerError";
import { ToastContainer, toast } from "react-toastify";
import { BiChevronLeft } from "react-icons/bi";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import { language } from "../../utils/part-1lan";

function LetterReplyPath() {
  const navigate = useNavigate();
  const { id, type } = useParams();
  const [replyPath, setReplyPath] = useState({});
  const [serverError, setServerError] = useState(false);
  const token = sessionStorage?.getItem("tID");
  const translationState = useSelector((state)=>state.translation);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    if (type === "incoming") {
     setLoading(true);
       apiRequest
         .get(`/reply_incoming_ltr_api/get_reply_inc_ltr_path/${id}`, {
           headers: {
             Authorization: "bearer " + token,
             get_rplyincltrpath_api: process.env.REACT_APP_GET_RPLYINCLTRPATH_API,
           },
         })
         .then((res) => {
           setLoading(false);
           if (res?.status === 200) {
             setServerError(false);
             setReplyPath(res?.data);
           }
         })
         .catch((error) => {
           setLoading(false);
           if (error?.response?.status === 500) {
             setServerError(true);
           }
  
             
           
         });
     } else if (type === "outgoing") {
       setLoading(true);
       apiRequest
         .get(`/rply_outgoing_ltr_api/get_reply_outg_ltr_path/${id}`, {
           headers: {
             Authorization: "Token " + token,
             get_rpldoutptltrpath_api: process.env.REACT_APP_GET_RPLDOUTPTLTRPATH_API,
           },
         })
         .then((res) => {
           setLoading(false);
           if (res?.status === 200) {
             setServerError(false);
             setReplyPath(res?.data);
           }
         })
         .catch((error) => {
           setLoading(false);
           if (error?.response?.status === 500) {
             setServerError(true);
           } 
        
         });
     }else if (type === "internal") {
       setLoading(true);
       apiRequest
         .get(`/rply_internal_ltr_api/get_reply_intl_ltr_path/${id}`, {
           headers: {
             Authorization: "Token " + token,
             get_rplyintltrpath_api: process.env.REACT_APP_GET_RPLYINTLTRPATH_API,
           },
         })
         .then((res) => {
           setLoading(false);
 
           if (res?.status === 200) {
             setServerError(false);
             setReplyPath(res?.data);
           }
         })
         .catch((error) => {
          setLoading(false)
           setServerError(false);
           if (error?.response?.status === 500) {
             setServerError(true);
           } 
    
           
         });
     }
     else if (type === "presystem") {
      setLoading(true);
      apiRequest
        .get(`/reply_letter_api/get_reply_ltr_path/${id}`, {
          headers: {
            Authorization: "Token " + token,
            get_rplypathltr_api: process.env.REACT_APP_GET_RPLYPATHLTR_API,
          },
        })
        .then((res) => {
          setLoading(false);

          if (res?.status === 200) {
            setServerError(false);
            setReplyPath(res?.data);
          }
        })
        .catch((error) => {
         setLoading(false)
          setServerError(false);
          if (error?.response?.status === 500) {
            setServerError(true);
          } 
   
          
        });
    }
    else if (type === "memo") {
      setLoading(true);
      apiRequest
        .get(`/rply_internal_memo_api/get_reply_memo_ltr_path/${id}`, {
          headers: {
            Authorization: "Token " + token,
            get_rplyintmemspath_api: process.env.REACT_APP_GET_RPLYINTMEMSPATH_API,
          },
        })
        .then((res) => {
          setLoading(false);

          if (res?.status === 200) {
            setServerError(false);
            setReplyPath(res?.data);
          }
        })
        .catch((error) => {
         setLoading(false)
          setServerError(false);
          if (error?.response?.status === 500) {
            setServerError(true);
          } 
   
          
        });
    }
     
     else {
      setLoading(false)
       translationState?.lan==="En" &&  toast.error(language?.letterTypeOption[0]);
       translationState?.lan==="Am" &&  toast.error(language?.letterTypeOption[1]);
     }
     // eslint-disable-next-line
   }, [type, id]);
 
 

 
   if (serverError) return <ServerError />;
  return (
    <div className="w-[100%] py-4 min-h-[90vh] bg-white">
    <div className="w-[95%] mx-auto">
      <ToastContainer theme="light" />
      <div className="flex justify-between items-center gap-5">
        <div className="flex items-center justify-start gap-[10px] text-[#0C73B8]">
          <BiChevronLeft
            onClick={() => navigate(-1)}
            className="text-[40px] cursor-pointer"
          />
          <span className="text-[20px] font-bold max-lg2:text-[16px]">
           
            {type === "incoming" && (
              <span className="text-[20px] text-[#0C73B8] font-semibold max-lg2:text-[16px]">
                
                {translationState?.lan ==="En" && `${language?.replyPathIncoming[0]} - ${id}`}
                {translationState?.lan ==="Am" && `${language?.replyPathIncoming[1]} - ${id}`}

              </span>
            )}
            {type === "outgoing" && (
              <span className="text-[20px] text-[#0C73B8] font-semibold max-lg2:text-[16px]">
                              {translationState?.lan ==="En" && `${language?.replyPathOutgoing[0]} - ${id}`}
                              {translationState?.lan ==="Am" && `${language?.replyPathOutgoing[1]} - ${id}`}
              </span>
            )}
            {type === "internal" && (
              <span className="text-[20px] text-[#0C73B8] font-semibold max-lg2:text-[16px]">
        {translationState?.lan ==="En" && `${language?.replyPathInternal[0]} - ${id}`}
        {translationState?.lan ==="Am" && `${language?.replyPathInternal[1]} - ${id}`}
              </span>
            )}
                {type === "presystem" && (
              <span className="text-[20px] text-[#0C73B8] font-semibold max-lg2:text-[16px]">
        {translationState?.lan ==="En" && `${language?.replyPathDetailPresystem[0]} - ${id}`}
        {translationState?.lan ==="Am" && `${language?.replyPathDetailPresystem[1]} - ${id}`}
              </span>
            )}
              {type === "memo" && (
              <span className="text-[20px] text-[#0C73B8] font-semibold max-lg2:text-[16px]">
        {translationState?.lan ==="En" && `${language?.replyPathDetailMemo[0]} - ${id}`}
        {translationState?.lan ==="Am" && `${language?.replyPathDetailMemo[1]} - ${id}`}
              </span>
            )}
          </span>
        </div>
      </div>

      {loading ? <Loading addtionalStyle={"flex justify-center items-center my-[30px]"}/> : (Object.keys(replyPath)?.length ===0 || replyPath?.repliedDocs?.length === 0) ?  <div className="flex justify-center items-center my-[30px]">
          <span className="text-[#0C73B8] font-bold text-[18px]">
          {translationState?.lan==="En" && language?.noReplyPathLetter[0]} 
          {translationState?.lan==="Am" && language?.noReplyPathLetter[1]}
          </span>
        </div> :<div className="max-h-[800px] my-[30px] flex flex-col">
        <div className="w-[100%]  -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8  hide-scroll-bar">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#0C73B8]  whitespace-nowrap">
                  <tr className="text-[14px] max-lg2:text-[12px]">
                    <th
                      scope="col"
                      className="px-6 py-4 border-[2px] border-white  text-center  font-bold text-white  tracking-wider"
                    >
                      #
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-4 border-[2px] border-white  text-center  font-bold text-white   tracking-wider"
                    >
                        {translationState?.lan ==="En" && language?.from[0]}
                        {translationState?.lan ==="Am" && language?.from[1]}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 border-[2px] border-white  text-center  font-bold text-white   tracking-wider"
                    >
                      {translationState?.lan ==="En" && language?.to[0]}
                      {translationState?.lan ==="Am" && language?.to[1]}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 border-[2px] border-white  text-center  font-bold text-white   tracking-wider"
                    >
                      {translationState?.lan ==="En" && language?.cc[0]}
                      {translationState?.lan ==="Am" && language?.cc[1]}
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-4 border-[2px] border-white  text-center  font-bold text-white   tracking-wider"
                    >
                       {translationState?.lan ==="En" && language?.repliedDate[0]}
                       {translationState?.lan ==="Am" && language?.repliedDate[1]}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 border-[2px] border-white  text-center  font-bold text-white   tracking-wider"
                    >
                       {translationState?.lan ==="En" && language?.repliedTime[0]}
                       {translationState?.lan ==="Am" && language?.repliedTime[1]}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 border-[2px] border-white  text-center  font-bold text-white   tracking-wider"
                    >
                       {translationState?.lan ==="En" && language?.action[0]}
                       {translationState?.lan ==="Am" && language?.action[1]}
                    </th>

                  
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 border [&>*:nth-child(even)]:bg-[#F9F9F9]">
                  {replyPath?.repliedDocs?.map((fc, index) => {
                    return (
                      <tr
                        key={index}
                        className="text-center text-[14px] cursor-pointer max-lg2:text-[12px]"
                        onClick={() =>
                          navigate(`/letters/reply/path/${type}/${id}/${index}`)
                   
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap border">
                          <div className="flex justify-center items-center">
                            <div>
                              <div className="px-6 py-2 whitespace-nowrap   text-gray-500">
                               {index + 1}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap border">
                          <div className="flex justify-center items-center">
                            <div className="ml-4d">
                              <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                                {fc?.from_achival_user
                                  ?  <>
                                  {fc?.from_achival_user?.firstname +
                                    " " +
                                    fc?.from_achival_user?.middlename +
                                    " " +
                                    fc?.from_achival_user?.lastname}
                                    {" "}
                                    (
                            {translationState?.lan ==="En" && language?.archivalUser[0]}
                           {translationState?.lan ==="Am" && language?.archivalUser[1]})
                                  </>
                                
                                  : fc?.from_office_user
                                  ? <div className="flex flex-col gap-[5px]">
                                  {fc?.from_office_user?.firstname +
                                    " " +
                                    fc?.from_office_user?.middlename +
                                    " " +
                                    fc?.from_office_user?.lastname
                                  }
                                   <span>{ fc?.from_office_user?.position}</span> 
                                  
                                  </div> 
                                  : "-"}



                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-2 whitespace-nowrap  text-gray-500 ">
                          <div className="flex flex-col justify-center items-center">
                          {fc?.to?.firstname +
                            " " +
                            fc?.to?.middlename +
                            " " +
                            fc?.to?.lastname 
                    
                          }
                          <span className="text-[12px]">{fc?.to?.position}</span>
                          </div>
                          
                         

                        </td>
                        <td className="px-6 py-2 whitespace-nowrap  text-gray-500 ">
                          <div className="flex flex-col justify-center items-center">
                          {fc?.cc
                    
                          }
                         
                          </div>
                          </td>

                        <td className="px-6 py-2 whitespace-nowrap  text-gray-500 border">
                          {new Date(fc?.replied_date).toDateString()}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap  text-gray-500 border">
                          {new Date(fc?.replied_date).toLocaleTimeString()}
                        </td>

                        <td className="px-6 py-2 whitespace-nowrap  text-gray-500 border">
                          <button onClick={(e)=>{e.stopPropagation();navigate(`/letters/print/reply/${type}/${replyPath?.replyId}/${fc?._id}`)}} className="py-2 px-4 bg-[#0C73B8] text-white text-[12px] rounded-[5px] max-lg2:text-[10px]">
                          {translationState?.lan ==="En" && language?.print[0]}
                          {translationState?.lan ==="Am" && language?.print[1]}
                      
                          </button>
                        </td>
                       
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>}

    </div>
  </div>
  )
}

export default LetterReplyPath