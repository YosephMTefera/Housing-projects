import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../ServerError";
import apiRequest from "../../utils/request";
import Loading from "../Loading";
import { language } from "../../utils/part-1lan";

function ForwardPathDetail() {
  const {type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const token = sessionStorage.getItem('tID');
  const { forwardPath, document_id,forward_id } = location.state;
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



  if (!forwardPath || !document_id)
    return (
      <div className="w-[90%] mx-auto min-h-[250px] my-[30px] flex flex-col justify-center items-center gap-[10px] bg-white rounded-[10px]">
        <span className="text-[#0C73B8] text-[14px]">Something went wrong</span>
        <button
          onClick={() => navigate(-1)}
          className="py-2 px-4 text-white text-[14px] bg-[#0C73B8] rounded-[5px]"
        >
          Reload Page
        </button>
      </div>

    );

   


  if (serverError) return <ServerError />;
  return (
    <div className="w-[90%] my-[20px] mx-auto p-2 bg-white rounded-[10px]">
     <ToastContainer theme="light"/>
{loading ? <Loading addtionalStyle={"flex justify-center  items-center my-[30px]"}/>:      <div className="w-[95%] my-[20px] mx-auto">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-[10px] text-[#0C73B8]">
              <BiChevronLeft
                onClick={() => navigate(-1)}
                className="text-[40px] cursor-pointer"
              />
              <span className="text-[18px] font-bold max-lg2:text-[14px]">
              {translationState?.lan ==="En" && language?.forwardedInformation[0]}
              {translationState?.lan ==="Am" && language?.forwardedInformation[1]}
               
                {type === "case" && (
                  <span className="text-[18px] text-[#0C73B8] font-semibold  max-lg2:text-[14px]">
                    {` case number - ${document_id}`}
                  </span>
                )}
                
                {type === "letter" && (
                  <span className="text-[18px] text-[#0C73B8] font-semibold  max-lg2:text-[14px]">
                    {`  letter number - ${document_id}`}
                  </span>
                )}
              </span>
            </div>
            <div>
              <button onClick={()=>navigate(`/print/${forwardPath?._id}/${forward_id}/forward`)} className="py-2 px-4 bg-[#0C73B8] text-white text-[14px] font-bold rounded-[20px] max-lg2:text-[12px]">
              {translationState?.lan ==="En" && language?.print[0]}
              {translationState?.lan ==="Am" && language?.print[1]}
              </button>
            </div>

           
          </div>
          <div className="w-[100%]">
            <div className="w-[100%] my-[40px] flex flex-col gap-[20px]">
              <div className="w-[100%] flex justify-between items-center gap-[50px]">
                <div className="flex flex-col gap-[20px]">
                  <span className="flex items-center gap-[10px] max-lg2:text-[12px]">
                    <span className="font-bold text-[#0C73B8]">{translationState?.lan ==="En" && language?.from[0]}
                    {translationState?.lan ==="Am" && language?.from[1]}
                      : </span>
                       {forwardPath?.from_window_user && (
                                    <div className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                      {forwardPath?.from_window_user?.firstname}{" "}
                                      {forwardPath?.from_window_user?.middlename}{" "}
                                      {forwardPath?.from_window_user?.lastname} (window service)
                                
                                    </div>
                                  )}
                                {forwardPath?.from_customer_user && (
                                    <div className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                      {forwardPath?.from_customer_user?.firstname}{" "}
                                      {forwardPath?.from_customer_user?.middlename}{" "}
                                      {forwardPath?.from_customer_user?.lastname} (customer)
                                
                                    </div>
                                  )}
                                     {forwardPath?.from_office_user && (
                                    <div className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                      {forwardPath?.from_office_user?.firstname}{" "}
                                      {forwardPath?.from_office_user?.middlename}{" "}
                                      {forwardPath?.from_office_user?.lastname} {" "}
                                     ({forwardPath?.from_office_user?.position}) 
                                
                                    </div>
                                  )}
                  </span>
                 
                  <span className="text-gray-500 flex items-center gap-[10px] max-lg2:text-[12px]">
                    <span className="font-bold text-[#0C73B8]">
                    {translationState?.lan ==="En" && language?.forwardedDate[0]}
                    {translationState?.lan ==="Am" && language?.forwardedDate[1]}:{" "}
                    </span>
                    <span>{forwardPath?.forwarded_date?.split("T")[0]}</span>
                  </span>
                  <span className="text-gray-500 flex items-center gap-[10px] max-lg2:text-[12px]">
                    <span className="font-bold text-[#0C73B8]">
                    {translationState?.lan ==="En" && language?.forwaededTime[0]}
                    {translationState?.lan ==="Am" && language?.forwaededTime[1]}:{" "}
                    </span>
                    <span>
                      {new Date(
                        forwardPath?.forwarded_date
                      ).toLocaleTimeString()}
                    </span>
                  </span>
                </div>
                <div className="w-[100%] flex  flex-col gap-[20px]">
                  <span className="text-gray-500 flex items-center gap-[10px] max-lg2:text-[12px]">
                    <span className="font-bold text-[#0C73B8]">
                    {translationState?.lan ==="En" && language?.to[0]}
                    {translationState?.lan ==="Am" && language?.to[1]}
                      : </span>
                    <span>
                      {" "}
                      {forwardPath?.to?.firstname} {forwardPath?.to?.middlename}{" "}
                      {forwardPath?.to?.lastname} ({forwardPath?.to?.position})
                    </span>
                  </span>

                  {forwardPath?.paraph && forwardPath?.paraph !== "" && (
                    <span className="text-gray-500 flex items-center gap-[10px] max-lg2:text-[12px]">
                      <span className="font-bold text-[#0C73B8]">Paraph: </span>
                      <span>{forwardPath?.paraph}</span>
                    </span>
                  )}

                  <span className="text-gray-500 flex items-center gap-[10px] max-lg2:text-[12px]">
                    <span className="font-bold text-[#0C73B8] capitalize">
                      {type}     {translationState?.lan ==="En" && language?.status[0]}
                      {translationState?.lan ==="Am" && language?.status[1]}:{" "}
                    </span>
                    <span className="px-2 py-1">
              
                   
                      {documentData?.status === "pending" && (
                        <span
                          className="px-2 py-1 inline-flex text-xs leading-5
                      font-semibold  bg-gray-300 text-black rounded-[5px]"
                        >
                          {translationState?.lan ==="En" && language?.pending[0]}
                          {translationState?.lan ==="Am" && language?.pending[1]}
                        </span>
                      )}
                      {documentData?.status === "ongoing" && (
                        <span
                          className="px-2 py-1 inline-flex text-xs leading-5
                      font-semibold  bg-black text-white rounded-[5px]"
                        >
                           {translationState?.lan ==="En" && language?.ongoing[0]}
                           {translationState?.lan ==="Am" && language?.ongoing[1]}
                        </span>
                      )}
                      {documentData?.status === "responded" && (
                        <span
                          className="px-2 py-1 inline-flex text-[14px] leading-5
                      font-semibold  bg-[#0C73B8] text-white rounded-[5px] max-lg2:text-[12px]"
                        >
                          {translationState?.lan ==="En" && language?.responded[0]}
                          {translationState?.lan ==="Am" && language?.responded[1]}
                        </span>
                      )}
                         {documentData?.status === "verified" && (
                        <span
                          className="px-2 py-1 inline-flex text-[14px] leading-5
                      font-semibold  bg-green-600 text-white rounded-[5px] max-lg2:text-[12px]"
                        >
                        {translationState?.lan ==="En" && language?.verfied[0]}
                        {translationState?.lan ==="Am" && language?.verfied[1]}
                        </span>
                      )}
                         {documentData?.status === "rejected" && (
                        <span
                          className="px-2 py-1 inline-flex text-[14px] leading-5
                      font-semibold  bg-green-600 text-white rounded-[5px] max-lg2:text-[12px]"
                        >
                        {translationState?.lan ==="En" && language?.rejected[0]}
                        {translationState?.lan ==="Am" && language?.rejected[1]}
                        </span>
                      )}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {forwardPath?.remark && (
            <div className="w-[60%] my-[20px] flex flex-col gap-[5px]">
              <span className="font-bold text-[#0C73B8]">
              {documentData?.status === "verified" && (
                        <span
                          className="px-2 py-1 inline-flex text-[14px] leading-5
                      font-semibold  bg-green-600 text-white rounded-[5px] max-lg2:text-[12px]"
                        >
                        {translationState?.lan ==="En" && language?.remark[0]}
                        {translationState?.lan ==="Am" && language?.remark[1]}
                        </span>
                      )}
              </span>
              <p className="text-gray-500 leading-[30px]">
                {forwardPath?.remark}
              </p>
            </div>
          )}

          <div className="w-[100%] grid grid-cols-1 gap-[10px]">
         {documentData?.attachment &&    <div className="w-[100%] h-[700px] my-4 col-span-1 overflow-y-scroll">
              {/* <PDFViewer fileUrl={fileURL} /> */}
              <div className="my-[20px]">
                <span className="font-bold text-[#0C73B8] capitalize">
                  {type}      {translationState?.lan ==="En" && language?.attachement[0]}
                  {translationState?.lan ==="Am" && language?.attachement[1]}
                </span>
              </div>
           

              {type === "case"  && (<>
              
              
              <embed
                  src={`${process.env.REACT_APP_BACKEND_IMAGES}/CaseFiles/${documentData?.attachment}`}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                />
              </>
             
              )}

              {type === "letter"  && (
                <>
                
              
              <embed
                  src={`${process.env.REACT_APP_BACKEND_IMAGES}/LetterFiles/${documentData?.letter_attachment}`}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                />
                </>
              
              )}
            </div>}

            
            {/* {type==="case" &&  forwardPath?.attachment && (
              <div className="w-[100%] h-[700px] my-4 col-span-1 overflow-y-scroll">
                
                <div className="my-[20px]">
                  <span className="font-bold text-[#0C73B8]">Attachment</span>
                </div>

                <embed
                  src={`${process.env.REACT_APP_BACKEND_IMAGES}/CaseForwardFiles/${forwardPath?.attachment}`}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                />
              </div>
            )} */}
            
               {/* {type==="letter" &&  forwardPath?.attachment && (
              <div className="w-[100%] h-[700px] my-4 col-span-1 overflow-y-scroll">
            
                <div className="my-[20px]">
                  <span className="font-bold text-[#0C73B8]">Attachment</span>
                </div>

                <embed
                  src={`${process.env.REACT_APP_BACKEND_IMAGES}/LetterForwardFiles/${forwardPath?.attachment}`}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                />
              </div>
            )} */}
        
          </div>
        </div>
      </div>}
    </div>
  );
}

export default ForwardPathDetail;
