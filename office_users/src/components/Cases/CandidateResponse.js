import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiRequest from "../../utils/request";
import { useSelector } from "react-redux";
import { IoChevronBack } from "react-icons/io5";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Loading from "../Loading";
import ServerError from "../ServerError";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { language } from "../../utils/part-1lan";

function CandidateResponse() {
  const { id } = useParams();
  const token = sessionStorage.getItem("tID");
  const navigate = useNavigate();
  const translationState = useSelector((state) => state.translation);
  const [candidateResponse, setCandidateResponse] = useState({});
  const [caseInfo, setCaseInfo] = useState({});
  const [replyPath, setReplyPath] = useState([]);
  const [editorData, setEditorData] = useState("");
  const [attachmentType, setAttachmentType] = useState("");
  const [selectedAttachment, setSelectedAttachment] = useState(null);
  const [attachment, setAttachment] = useState(null);

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleEditorChange = (editor) => {
    const data = editor.getData();

    setEditorData(data);
  };

  const getCandidateResponse = async ()=>{
    try {
      setLoading(true);

      apiRequest
        .get(`/cand_resp/get_cand_resp/${id}`, {
          headers: {
            get_candrespsng_api: process.env.REACT_APP_GET_CANDRESPSNG_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setCandidateResponse(res.data);
          setEditorData(res?.data?.response_txt);
          setSelectedAttachment(res?.data?.attachment_from_reply);
         
        })
        .catch((error) => {
          if (error?.response?.status === 500) {
            setServerError(true);
          }
        
        });
    } catch (error) {
      setServerError(true);
    }

  }

  useEffect(() => {

    getCandidateResponse()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      setLoading(true);

      apiRequest
        .get(`/reply_case_api/get_reply_path/${id}`, {
          headers: {
            get_rplypath_api: process.env.REACT_APP_GET_RPLYPATH_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setReplyPath(res.data.repliedDocs);
        })
        .catch((error) => {
          if (error?.response?.status === 500) {
            setServerError(true);
          }

        });
    } catch (error) {
      setServerError(true);
    }
  }, [id, token, translationState.lan]);


  const findCaseHasAttachement = replyPath?.filter(
    (caseattach) => caseattach?.attachment !== ""
  );


  useEffect(() => {
    try {
      setLoading(true);

      apiRequest
        .get(`/customer_case_api/get_case/${id}`, {
          headers: {
            get_gecase_api: process.env.REACT_APP_GET_GECASE_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setCaseInfo(res.data);
        })
        .catch((error) => {
          if (error?.response?.status === 500) {
            setServerError(true);
          }
      
        });
    } catch (error) {
      setServerError(true);
    }
  }, [id, token, translationState.lan]);



  const handleCandidateResponse = async ()=>{
    try {

      const candidateData = new FormData();
      candidateData.append('response_txt',editorData);
      
   selectedAttachment && candidateData.append('attachment_from_reply',selectedAttachment);
   attachment && candidateData.append('attachment_from_upload',attachment);


    

  

      setLoading(true);

      await apiRequest.post(`/cand_resp/crt_upd/${id}`,candidateData,{headers:{
        get_candsolby_api:process.env.REACT_APP_GET_CANDSOLBY_API,
        Authorization:`Bearer ${token}`
      }}).then((res)=>{
        setLoading(false)
        setSelectedAttachment("");
        setAttachment("")
        toast.success(res.data.Message_en)
        
        translationState?.lan ==="En" && toast.success(res.data.Message_en)
        setAttachmentType("")
   
        getCandidateResponse();
      
      
      
      }).catch((error)=>{
        setLoading(false)
        if(error?.response?.status ===500){
          setServerError(true)
        }
        translationState?.lan ==="En" && toast.error(error?.response?.data?.Message_en)
      })
      
    } catch (error) {
      setLoading(false);
      setServerError(true)
      
    }
  }

  
  const handleDetachResponse = async ()=>{
    try {

      setLoading(true);

      await apiRequest.put(`/cand_resp/det_attach/${id}`,{
        type:candidateResponse?.attachment_from_reply ? "reply":"upload"
      },{headers:{
        get_candetach_api:process.env.REACT_APP_GET_CANDETACH_API,
        Authorization:`Bearer ${token}`
      }}).then((res)=>{
    
        setLoading(false)
        translationState?.lan ==="En" && toast.success(res.data.Message_en)
        translationState?.lan ==="Am" && toast.success(res.data.Message_am)
   
        getCandidateResponse();
      
      }).catch((error)=>{
        setLoading(false)
        if(error?.response?.status ===500){
          setServerError(true)
        }
        translationState?.lan ==="En" && toast.error(error?.response?.data?.Message_en)
        translationState?.lan ==="Am" && toast.error(error?.response?.data.Message_am)
      })
      
    } catch (error) {
      setLoading(false);
      setServerError(true)
      
    }
  }


  if (serverError) return <ServerError />;
  return loading ? (
    <Loading
      addtionalStyle={"w-[100%] flex justify-between items-center my-[30px]"}
    />
  ) : (
    <div className="w-[90%]  my-[20px] mx-auto bg-white rounded-[10px]">
      <ToastContainer  theme="light"/>
      <div className="w-[90%] mx-auto my-[50px] max-lg2:my-[30px]">
        <div className="flex justify-between items-center border-b border-gray-300 py-4">
          <div className="flex items-center gap-[5px] font-bold text-[#0C73B8]">
            <IoChevronBack
              onClick={() => navigate(-1)}
              className="text-[30px] cursor-pointer max-lg2:text-[20px]"
            />
            <span className="text-[20px] font-bold max-lg2:text-[16px] notosans">
            {translationState?.lan === "En" && language?.candidateResponseCase[0]}
            {translationState?.lan === "Am" && language?.candidateResponseCase[1]} - {caseInfo?.case_number}
            </span>
          </div>
        
          <div className="flex items-center gap-[10px]">
          <div>
                  <button
                    onClick={()=>navigate(`/response/history/${id}`)}
                    className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                  >
                  {translationState?.lan === "En" && language?.updatedBy[0]}
                  {translationState?.lan === "Am" && language?.updatedBy[1]} 
                  </button>
                </div>
            {(candidateResponse?.attachment_from_reply ||
              candidateResponse?.attachment_from_upload) && (
              <>
                
                <div>
                  <button onClick={handleDetachResponse} className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]">
                  {translationState?.lan === "En" && language?.detach[0]}
                  {translationState?.lan === "Am" && language?.detach[1]} 
                  </button>
                </div>
              
              </>
            )}{" "}

            {Object?.keys(candidateResponse)?.length > 0 &&   <div>
                  <button
                    onClick={()=>navigate(`/preview/${id}`)}
                    className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                  >
              {translationState?.lan === "En" && language?.preview[0]}
              {translationState?.lan === "Am" && language?.preview[1]}
                  </button>
                </div>}
           

            {loading ? <Loading addtionalStyle={"flex justify-end items-center my-[10px]"}/>:<div>
              <button onClick={handleCandidateResponse} className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]">
              {translationState?.lan === "En" && language?.save[0]}
              {translationState?.lan === "Am" && language?.save[1]}
              </button>
            </div>}
            
          </div>
        </div>

        {/*  */}
      

          <div className="w-[100%] my-[10px] grid grid-cols-2 gap-[10px]">
          <div className="w-[100%] col-span-1">
              <label
                htmlFor="street-address"
                className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
              >
                     {translationState?.lan === "En" && language?.created[0]}
                     {translationState?.lan === "Am" && language?.created[1]}
              </label>
              <div className="mt-2">
                <input
                  required
                  value={candidateResponse?.created_by ? candidateResponse?.created_by?.firstname + " " + candidateResponse?.created_by?.middlename + " "+ candidateResponse?.created_by?.lastname + " --- " + candidateResponse?.created_by?.position : "---"}
                  disabled
                  className="block w-full  flex-1 font-bold rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />
              </div>
            </div>

          </div>


        <div className="w-[100%] h-[1px] bg-gray-300 mt-[30px]" />


        <div className="flex flex-col gap-[20px]">
          <div className="w-[100%] mt-[20px]">
            <label
              htmlFor="last-name"
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
            >
              {translationState?.lan === "En" && language?.response[0]}
              {translationState?.lan === "Am" && language?.response[1]}
              <span className="text-red-700">*</span>
            </label>
            <div className="mt-2">
              <div className="w-[100%]">
                <CKEditor
                  data={editorData}
                  editor={ClassicEditor}
                  
                  config={{
                    toolbar: [
                      "bold",
                      "italic",
                      "insertTable",
                      "bulletedList",
                      "numberedList",
                    ],
                  }}
                  onChange={(e, editor) => handleEditorChange(editor)}
                  className="custom-editor"
                />
              </div>
            </div>
          </div>
          {!candidateResponse?.attachment_from_reply &&
            !candidateResponse?.attachment_from_upload && (
              <div className="w-[100%] mt-[20px]">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-bold p-2 leading-6 text-[#0C73B8]"
                >
                 {translationState?.lan === "En" && language?.attachementType[0]}
                 {translationState?.lan === "Am" && language?.attachement[1]}
                </label>
                <select
                  onChange={(e) => setAttachmentType(e.target.value)}
                  className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                >
                  <option value={""}></option>
                  <option value={"reply"}>
                  {translationState?.lan === "En" && language?.fromReply[0]}
                  {translationState?.lan === "Am" && language?.fromReply[1]}
                  </option>
                  <option value={"upload"}>
                  {translationState?.lan === "En" && language?.fromUpload[0]}
                  {translationState?.lan === "Am" && language?.fromUpload[1]}
                  </option>
                </select>
              </div>
            )}

          {attachmentType === "reply" && (
            <>
              {findCaseHasAttachement?.length === 0 ? (
                <span>          {translationState?.lan === "En" && language?.noReplyFOund[0]}
                  {translationState?.lan === "Am" && language?.noReplyFOund[1]}</span>
              ) : (
                <div className="w-[100%]">
                  {findCaseHasAttachement?.map((fc, index) => {
                    return (
                      <div key={index} className="flex flex-col gap-[10px]">
                        <div className="flex flex-col gap-[20px]">
                     <span  className="font-bold flex items-center my-[10px] gap-[10px] max-lg2:text-[14px]">
                     <input
              type="checkbox"
              checked={selectedAttachment === fc?.attachment}
              onChange={() => setSelectedAttachment(fc?.attachment)}
            />
               
                            <span>{index + 1}. {fc?.attachment}</span> <span onClick={()=> setSelectedAttachment(fc?.attachment)} className="text-[#FBB042] text-[14px] font-bold cursor-pointer">(View attachment)</span>
                          </span>
                          
                        </div>
                        {selectedAttachment === fc?.attachment && (
                          <div className="w-[100%] my-[20px]">
                            {fc?.attachment}
                            <embed
                              src={`${process.env.REACT_APP_BACKEND_IMAGES}/CaseReplyFiles/${fc?.attachment}`}
                              type="application/pdf"
                              width="100%"
                              height="700px"
                              
                            />
                          </div>
                        )}
                     
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {attachmentType === "upload" && (
            <>
              <div className="w-[100%] mt-[50px] flex flex-col gap-[10px]">
                <span className="text-[14px] font-bold w-[80%] text-[#0C73B8]">
                {translationState?.lan === "En" && language?.attachement[0]}
                  {translationState?.lan === "Am" && language?.attachement[1]} 
                </span>
                <label>
                  <input
                    type="file"
                    onChange={(e) => setAttachment(e.target.files[0])}
                    hidden
                  />
                  <div className="[w-[70%] h-[200px] flex justify-center gap-[10px] text-[#0C73B8]  items-center p-4 mx-auto border border-gray-300 rounded border-dashed cursor-pointer text-center">
                    <BsFillCloudUploadFill />
                    <span className="text-[14px] font-bold">
                    {translationState?.lan === "En" && language?.uploadAttachment[0]}
                    {translationState?.lan === "Am" && language?.uploadAttachment[1]} 
                    </span>
                  </div>
                </label>
              </div>

              <div className="w-[100%] my-4 overflow-y-scroll">
            
                {attachment && attachment !=="" && (
                  <embed
                    src={URL.createObjectURL(attachment)}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                  />
                
                  
                )}
              </div>
            </>
          )}
        </div>

        {(candidateResponse?.attachment_from_reply || candidateResponse?.attachment_from_upload) && <div className="w-[100%] mt-[50px] flex flex-col gap-[10px]">
         <span className="text-[14px] font-bold w-[80%] text-[#0C73B8]">
                  File Attachment
                </span>
                  {(candidateResponse?.attachment_from_reply) && (
                          <div className="w-[100%] my-[20px]">
                            <embed
                              src={`${process.env.REACT_APP_BACKEND_IMAGES}/CaseReplyFiles/${candidateResponse?.attachment_from_reply}`}
                              type="application/pdf"
                              width="100%"
                              height="700px"
                            />
                          </div>
                        )}

                  {(candidateResponse?.attachment_from_upload) && (
                          <div className="w-[100%] my-[20px]">
                            <embed
                              src={`${process.env.REACT_APP_BACKEND_IMAGES}/CaseReplyFiles/${candidateResponse?.attachment_from_upload}`}
                              type="application/pdf"
                              width="100%"
                              height="700px"
                            />
                          </div>
                  )}
        </div>}


      </div>

     
    </div>
  );
}

export default CandidateResponse;


