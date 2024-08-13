import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import apiRequest from "../../utils/request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading";
import ServerError from "../ServerError";
import { language } from "../../utils/part-1lan";

function ReplyPathDetail() {
  const { type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const token = sessionStorage.getItem('tID');
  const { replyPath, document_id,reply_Id } = location.state;
  const translationState = useSelector((state)=>state.translation);
  const [documentData,setDocumentData] = useState({});
  const [loading,setLoading] = useState(false);
  const [serverError,setServerError] = useState(false);

  useEffect(() => {
    try {
      if (type === "case") {
        setLoading(true)
        apiRequest.get(`/customer_case_api/get_case/${document_id}`,{headers:{
          get_gecase_api:process.env.REACT_APP_GET_GECASE_API,
          Authorization:`Bearer ${token}`
        
        }}).then((res)=>{
          setLoading(false)
          setDocumentData(res.data);
        }).catch((error)=>{
          if(error?.response?.status ===500){
            setServerError(true);
          }
          translationState?.lan ==="En" &&   toast.error(error?.response?.data?.Message_en);
          translationState?.lan ==="Am" &&   toast.error(error?.response?.data?.Message_am);
        })
      }  else if (type === "letter") {
        setLoading(true)
        apiRequest.get(`/archival_letter_api/get_letter/${document_id}`,{headers:{
          get_geletter_api:process.env.REACT_APP_GET_GELETTER_API,
          Authorization:`Bearer ${token}`
        
        }}).then((res)=>{
          setLoading(false)
          setDocumentData(res.data);
        }).catch((error)=>{
          if(error?.response?.status ===500){
            setServerError(true);
          }
          translationState?.lan ==="En" &&   toast.error(error?.response?.data?.Message_en);
          translationState?.lan ==="Am" &&   toast.error(error?.response?.data?.Message_am);
        })
      }
      else{
        toast.error(
          "Please specify the type of case, complaint, or letter for which you want to check the forwarded path"
        );
      }
      
    } catch (error) {
      setServerError(true)
      
    }
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);




  if(serverError) return <ServerError />
  return (
    <div className="w-[90%] my-[20px] mx-auto p-2 bg-white rounded-[10px]">
       <ToastContainer theme="light"/>
    {loading ? <Loading addtionalStyle={"flex justify-center items-center my-[30px]"}/> :  <div className="w-[95%] my-[20px] mx-auto">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
          <div className="flex items-center justify-start gap-[10px] text-[#0C73B8]">
            <BiChevronLeft
              onClick={() => navigate(-1)}
              className="text-[40px] cursor-pointer"
            />
            <span className="text-[18px] font-bold max-lg2:text-[16px]">
            {translationState?.lan==="En" && language?.replyPathFor[0]}
            {translationState?.lan==="Am" && language?.replyPathFor[1]} {" "}
              {type === "case" && (
                <span className="text-[18px] text-[#0C73B8] font-semibold max-lg2:text-[16px]">
                  {`case number - ${document_id}`}
                </span>
              )}
             
              {type === "letter" && (
                <span className="text-[18px] text-[#0C73B8] font-semibold max-lg2:text-[16px]">
                  {`letter number - ${document_id}`}
                </span>
              )}
            </span>
          </div>

          <div>
              <button 
              onClick={()=>navigate(`/print/${replyPath?._id}/${reply_Id}/reply`)} 
              className="py-2 px-4 bg-[#0C73B8] text-white text-[14px] font-bold rounded-[20px]">
                    {translationState?.lan === "En" && language?.print[0]}
                    {translationState?.lan === "Am" && language?.print[1]}
              </button>
            </div>

          </div>
        
          <div className="w-[80%]">
            <div className="w-[90%] my-[40px] flex flex-col gap-[20px]">
              <div className="w-[100%] flex justify-between items-start gap-[50px]">
                <div className="flex flex-col gap-[30px]">
                  <span className="flex items-center gap-[10px] max-lg2:text-[12px]">
                    <span className="font-bold text-[#0C73B8]">{translationState?.lan==="En" && language?.from[0]}
                    {translationState?.lan==="Am" && language?.from[1]}: </span>{" "}
                   
                    {replyPath?.from_office_user && (
                      <div className="whitespace-nowrap  text-gray-500">
                       {replyPath?.from_office_user?.firstname} {replyPath?.from_office_user?.middlename}{" "}
                                      {replyPath?.from_office_user?.lastname} ({replyPath?.from_office_user?.position})
                      </div>
                    )}
                  </span>

                    {replyPath?.to &&  <span className="text-gray-500 flex items-center gap-[10px] max-lg2:text-[12px]">
                    <span className="font-bold text-[#0C73B8]">{translationState?.lan==="En" && language?.to[0]}
                    {translationState?.lan==="Am" && language?.to[1]}: </span>
                    <span>
                      {" "}
                      {replyPath?.to?.firstname} {replyPath?.to?.middlename} {replyPath?.to?.lastname} (
                              {replyPath?.to?.position})
                    </span>
                  </span> }
                 
                
                  <span className="text-gray-500 flex items-center gap-[10px] max-lg2:text-[12px]">
                    <span className="font-bold text-[#0C73B8]">
                    {translationState?.lan==="En" && language?.repliedDate[0]}
          {translationState?.lan==="Am" && language?.repliedDate[1]}:{" "}
                    </span>
                    <span>{replyPath?.replied_date?.split("T")[0]}</span>
                  </span>

                  <span className="text-gray-500 flex items-center gap-[10px] max-lg2:text-[12px]">
                    <span className="font-bold text-[#0C73B8]">
                    {translationState?.lan ==="En" && language?.repliedTime[0]}
                    {translationState?.lan ==="Am" && language?.repliedTime[1]}:{" "}
                    </span>
                    <span>
                      {new Date(
                        replyPath?.replied_date
                      ).toLocaleTimeString()}
                    </span>
                  </span>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="w-[60%] my-[20px] flex flex-col gap-[5px] max-lg2:w-[90%] max-lg2:text-[14px]">
            <span className="font-bold text-[#0C73B8]">{translationState?.lan==="En" && language?.remark[0]}
            {translationState?.lan==="Am" && language?.remark[1]}</span>
          
      
            
            <div
            className="custom-heading"
            dangerouslySetInnerHTML={{ __html: replyPath?.remark }}
          ></div> 
          </div>
          <div className="w-[100%] grid grid-cols-1 gap-[20px]">
            {documentData?.attachment &&   <div className="w-[100%] h-[700px] my-4 col-span-1">
           
              <div className="my-[20px]">
                {type === "letter" ? (
                  <span className="font-bold text-[#0C73B8]">
                   {translationState?.lan==="En" && language?.letterAttachment[0]}
                   {translationState?.lan==="Am" && language?.letterAttachment[1]}
                  </span>
                ) : (
                  <span className="font-bold text-[#0C73B8]">
             {translationState?.lan==="En" && language?.caseAttachment[0]}
             {translationState?.lan==="Am" && language?.caseAttachment[1]}
                  </span>
                )}
              </div>

              {type === "case" && documentData?.attachment && (
                <embed
                  src={`${process.env.REACT_APP_BACKEND_IMAGES}/CaseFiles/${documentData?.attachment}`}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                />
              )}

          

              {type === "letter" && documentData?.attachment && (
                <embed
                  src={`${process.env.REACT_APP_BACKEND_IMAGES}/LetterFiles/${documentData?.letter_attachment}`}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                />
              )}
            </div>}
          

            {replyPath?.attachment && (
              <div className="w-[100%] h-[700px] my-[30px] col-span-1">
               
                <div className="my-[20px]">
                  <span className="font-bold text-[#0C73B8]">
                          {translationState?.lan==="En" && language?.replyAttachment[0]}
             {translationState?.lan==="Am" && language?.replyAttachment[1]}
                  </span>
                </div>

                {type === "case" && (
                  <embed
                    src={`${process.env.REACT_APP_BACKEND_IMAGES}/CaseReplyFiles/${replyPath?.attachment}`}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                  />
                )}

               

                {type === "letter" && (
                  <embed
                    src={`${process.env.REACT_APP_BACKEND_IMAGES}/LetterReplyFiles/${replyPath?.attachment}`}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>}
    </div>
  );
}

export default ReplyPathDetail;
