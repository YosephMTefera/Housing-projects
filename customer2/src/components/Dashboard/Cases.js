import React, { useEffect, useState } from "react";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiRequest from "../../utils/request";
import ServerError from "../ServerError";
import { fetchAllDivision } from "../../REDUX/slices/allDivisionsSlice";
import { fetchAllCaseRequests } from "../../REDUX/slices/getAllCaseRequestSlice";
import { fetchAllQuestions } from "../../REDUX/slices/getAlllQuestionsSlice";
import {jwtDecode} from 'jwt-decode';
import { language } from "../../utils/part-1lan";
import ConfirmCase from "./ConfirmCase";

function Cases() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("tID");
  const decodedToken = jwtDecode(token);
  const userID = decodedToken?.user?.id;
  const translationState = useSelector((state) => state?.translation);
  const divisionState = useSelector((state) => state.allDivisions);
  const caseRequestsState = useSelector((state) => state.allCaseRequests);
  const allQuestionsState = useSelector((state) => state.allQuestions);
  const [division, setDivision] = useState("");
  const [caseRequest, setCaseRequest] = useState("");
  const [relatedCaseID, setRelatCaseID] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [remark, setRemark] = useState("");
  const [formQuestions, setFormQuestions] = useState([]);
  const [relatedCases,setRelatedCases] = useState([])
  const [confirmModal,setConfirmModal] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    
    dispatch(fetchAllDivision());
    dispatch(fetchAllCaseRequests());
    dispatch(fetchAllQuestions());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterActiveDivision = divisionState?.divisions?.filter((div)=>div?.status ==="active");
  const filterNotSpecialDivision = filterActiveDivision?.filter((div)=>div?.special ==="no");

  const handleInputChange = (question, answer) => {
    setFormQuestions((prevFormData) => {
      const updatedFormData = [...prevFormData];

      const existingFieldIndex = updatedFormData.findIndex(
        (field) => field[question]
      );
      if (existingFieldIndex !== -1) {
        updatedFormData[existingFieldIndex] = { [question]: answer };
      } else {
        updatedFormData.push({ [question]: answer });
      }

      return updatedFormData;
    });
  };

  useEffect(()=>{
    apiRequest.get(`/customer_case_api/get_by_case_customerid`,{headers:{
      get_gecases_api:process.env.REACT_APP_GET_GECASES_API,
      Authorization:`Bearer ${token}`
    }}).then((res)=>{
      setRelatedCases(res.data)
    }).catch((error)=>{
      if(error?.response?.status ===500){
        setServerError(true);
      }
      translationState?.lan === "En"
      ? toast.error(error?.response?.data?.Message_en)
      : toast.error(error?.response?.data?.Message_am);
    })
  },[userID,token,translationState])

  const findCaseList = caseRequestsState?.caseRequests?.filter(
    (cr) => cr?.division === division && cr?.status ==="active"
  );
  const filteredQuestions = allQuestionsState?.questions?.filter(
    (question) => question?.caselist?._id === caseRequest
  );

  if(caseRequestsState?.limitError || divisionState?.limitError || allQuestionsState?.limitError) return <div className="w-[80%] mx-auto my-[30px] min-h-[300px] rounded-[10px] bg-white flex justify-center items-center">
     {translationState?.lan === "En" && (
                  <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
                    Please wait 3 minutes before retrying.
                  </p>
                )}
                {translationState?.lan === "Am" && (
                  <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
                    እንደገና ከመሞከሮዎ በፊት 3 ደቂቃ ይጠብቁ።
                  </p>
                )}
                {translationState?.lan === "Or" && (
                  <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
                    Maaloo irra deebi'anii yaaluun dura daqiiqaa 3 eegaa
                  </p>
                )}
                {translationState?.lan === "Tg" && (
                  <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
                    በጃኹም ቅድሚ ዳግማይ ምፍታንኩም 3 ደቓይቕ ተጸበዩ።
                  </p>
                )}
                {translationState?.lan === "Sm" && (
                  <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
                    Fadlan sug 3 daqiiqo ka hor inta aanad isku dayin
                  </p>
                )}
                {translationState?.lan === "Af" && (
                  <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
                    Please wait 3 minutes before retrying.
                  </p>
                )}
</div>

  if (serverError) return <ServerError />;

  return (
    <div className="w-[100%] bg-white">
      <ToastContainer theme="light" />

      {!confirmModal && <div className="w-[90%] my-[50px] mx-auto max-lg2:my-[30px]">
        <div className="flex items-center font-bold text-[#0C73B8] gap-[5px]">
          <IoChevronBack
            onClick={() => navigate(-1)}
            className="text-[30px] cursor-pointer"
          />
          <span>
          {translationState?.lan === "En" && language?.applyCase[0]}
          {translationState?.lan === "Am" && language?.applyCase[1]}
                    {translationState?.lan === "Or" && language?.applyCase[2]}
                    {translationState?.lan === "Tg" && language?.applyCase[3]}
                    {translationState?.lan === "Sm" && language?.applyCase[4]}
                    {translationState?.lan === "Af" && language?.applyCase[5]} 
          </span>
        </div>


      <div className="w-[100%] min-h-[150px] my-[20px] border border-dashed border-gray-300 rounded-[10px]">
        <div className="w-[90%] mx-auto my-[20px] flex flex-col gap-[10px]">
            <span className="my-[10px] font-bold text-[#0C73B8]">
            {translationState?.lan === "En" && language?.instructions[0]}
                    {translationState?.lan === "Am" && language?.instructions[1]}
                    {translationState?.lan === "Or" && language?.instructions[2]}
                    {translationState?.lan === "Tg" && language?.instructions[3]}
                    {translationState?.lan === "Sm" && language?.instructions[4]}
                    {translationState?.lan === "Af" && language?.instructions[5]} 
            </span>
          <ul className="flex flex-col gap-[10px]">
            <li className="text-[14px] text-gray-500 tabular-nums">

            {translationState?.lan === "En" && language?.requriedInstructions[0]}
                    {translationState?.lan === "Am" && language?.requriedInstructions[1]}
                    {translationState?.lan === "Or" && language?.requriedInstructions[2]}
                    {translationState?.lan === "Tg" && language?.requriedInstructions[3]}
                    {translationState?.lan === "Sm" && language?.requriedInstructions[4]}
                    {translationState?.lan === "Af" && language?.requriedInstructions[5]} 

            </li>

            <li className="text-[14px] text-gray-500">
            {translationState?.lan === "En" && language?.fileSizeInstuction[0]}
                    {translationState?.lan === "Am" && language?.fileSizeInstuction[1]}
                    {translationState?.lan === "Or" && language?.fileSizeInstuction[2]}
                    {translationState?.lan === "Tg" && language?.fileSizeInstuction[3]}
                    {translationState?.lan === "Sm" && language?.fileSizeInstuction[4]}
                    {translationState?.lan === "Af" && language?.fileSizeInstuction[5]} 
          </li>
            
          </ul>

        </div>
      </div>
      
        <div className="w-[100%] my-[40px] grid grid-cols-3 gap-[10px] max-lg1:grid-cols-2 max-sm1:grid-cols-1">
          <div className="w-[100%] col-span-1">
            <label
            
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
            >
                    {translationState?.lan === "En" && language?.division[0]}
                    {translationState?.lan === "Am" && language?.division[1]}
                    {translationState?.lan === "Or" && language?.division[2]}
                    {translationState?.lan === "Tg" && language?.division[3]}
                    {translationState?.lan === "Sm" && language?.division[4]}
                    {translationState?.lan === "Af" && language?.division[5]} <span className="text-red-700">*</span>
            </label>
            <div className="mt-2">
              <select
                required
                onChange={(e) => setDivision(e.target.value)}
                className="block w-full rounded-md bg-transparent p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
              >
                <option value={""}>
                {translationState?.lan === "En" && language?.selectDivision[0]}
                    {translationState?.lan === "Am" && language?.selectDivision[1]}
                    {translationState?.lan === "Or" && language?.selectDivision[2]}
                    {translationState?.lan === "Tg" && language?.selectDivision[3]}
                    {translationState?.lan === "Sm" && language?.selectDivision[4]}
                    {translationState?.lan === "Af" && language?.selectDivision[5]}
                </option>
                {filterNotSpecialDivision?.map((division1, index) => {
                  return (
                    <option key={index} value={division1?._id}>
                    {translationState?.lan === "En" && division1?.name_en}
                    {translationState?.lan === "Am" && division1?.name_am}
                    {translationState?.lan === "Or" && division1?.name_or}
                    {translationState?.lan === "Tg" && division1?.name_tg}
                    {translationState?.lan === "Sm" && division1?.name_sm}
                    {translationState?.lan === "Af" && division1?.name_af}
                      
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {findCaseList?.length > 0 && (
            <div className="w-[100%] col-span-1">
              <label
               
                className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px] max-lg2:p-2"
              >
                {translationState?.lan === "En" && language?.caseRequest[0]}
                    {translationState?.lan === "Am" && language?.caseRequest[1]}
                    {translationState?.lan === "Or" && language?.caseRequest[2]}
                    {translationState?.lan === "Tg" && language?.caseRequest[3]}
                    {translationState?.lan === "Sm" && language?.caseRequest[4]}
                    {translationState?.lan === "Af" && language?.caseRequest[5]} <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <select
                  required
                  onChange={(e) => setCaseRequest(e.target.value)}
                  className="block w-full rounded-md bg-transparent p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                >
                  <option value={""}>
                  {translationState?.lan === "En" && language?.selectCaseRequest[0]}
                    {translationState?.lan === "Am" && language?.selectCaseRequest[1]}
                    {translationState?.lan === "Or" && language?.selectCaseRequest[2]}
                    {translationState?.lan === "Tg" && language?.selectCaseRequest[3]}
                    {translationState?.lan === "Sm" && language?.selectCaseRequest[4]}
                    {translationState?.lan === "Af" && language?.selectCaseRequest[5]}
                  </option>
                  {findCaseList?.map((caserequest, index) => {
                    return (
                      <option key={index} value={caserequest?._id}>
                        
                        {translationState?.lan === "En" && caserequest?.case_name_en}
                    {translationState?.lan === "Am" && caserequest?.case_name_am}
                    {translationState?.lan === "Or" && caserequest?.case_name_or}
                    {translationState?.lan === "Tg" && caserequest?.case_name_tg}
                    {translationState?.lan === "Sm" && caserequest?.case_name_sm}
                    {translationState?.lan === "Af" && caserequest?.case_name_af}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          )}

          <div className="w-[100%] col-span-1">
            <label
           
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
            >
               {translationState?.lan === "En" && language?.selectRelatedCaseNumber[0]}
              {translationState?.lan === "Am" && language?.selectRelatedCaseNumber[1]}
                    {translationState?.lan === "Or" && language?.selectRelatedCaseNumber[2]}
                    {translationState?.lan === "Tg" && language?.selectRelatedCaseNumber[3]}
                    {translationState?.lan === "Sm" && language?.selectRelatedCaseNumber[4]}
                    {translationState?.lan === "Af" && language?.selectRelatedCaseNumber[5]} 
            </label>
            <div className="mt-2 flex gap-[10px]">
              <select
                required
                onChange={(e) => setRelatCaseID(e.target.value)}
                className="block w-full rounded-md p-4 border-0 bg-transparent  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
              >
                <option value={""}>
                {translationState?.lan === "En" && language?.relatedCaseNumber[0]}
                {translationState?.lan === "Am" && language?.relatedCaseNumber[1]}
                    {translationState?.lan === "Or" && language?.relatedCaseNumber[2]}
                    {translationState?.lan === "Tg" && language?.relatedCaseNumber[3]}
                    {translationState?.lan === "Sm" && language?.relatedCaseNumber[4]}
                    {translationState?.lan === "Af" && language?.relatedCaseNumber[5]} 
                </option>
                {relatedCases?.map((case1,index)=>{
                  return <option key={index} value={case1?.case_number}>{case1?.case_number}</option>
                })}
              </select>
            </div>
          </div>
        </div>
        {/* dynamic question */}
        <div className="w-[100%] my-[20px] flex flex-col gap-[20px]">
          {filteredQuestions?.map((q, index) => {
            if (q?.inputType === "normal_input") {
              return (
                <div key={index} className="w-[100%]">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-bold p-2 leading-6  text-[#0C73B8] max-lg2:text-[12px]"
                  >
                
                    {translationState?.lan === "En" && q?.name_en}
                    {translationState?.lan === "Am" && q?.name_am}
                    {translationState?.lan === "Or" && q?.name_or}
                    {translationState?.lan === "Tg" && q?.name_tg}
                    {translationState?.lan === "Sm" && q?.name_sm}
                    {translationState?.lan === "Af" && q?.name_af}
                    {q?.isReqired && <span className="text-red-700">*</span>}
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      onChange={(e) =>
                        handleInputChange(q?._id, e.target.value)
                      }
                      type={q?.dataType === "string" ? "text" : "number"}
                      className="block w-full rounded-md p-4 border-0 bg-transparent  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2"
                    />
                  </div>
                </div>
              );
            } else if (q?.inputType === "text_area") {
              return (
                <div key={index} className="w-[100%]">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                  >
                  {translationState?.lan === "En" && q?.name_en}
                  {translationState?.lan === "Am" && q?.name_am}
                  {translationState?.lan === "Or" && q?.name_or}
                  {translationState?.lan === "Tg" && q?.name_tg}
                  {translationState?.lan === "Sm" && q?.name_sm}
                  {translationState?.lan === "Af" && q?.name_af}
                    {q?.isReqired && <span className="text-red-700">*</span>}
                  </label>
                  <div className="mt-2">
                    <textarea
                      required
                      onChange={(e) =>
                        handleInputChange(q?._id, e.target.value)
                      }
                      rows={15}
                      className="block w-full rounded-md p-4  border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2"
                    ></textarea>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index} className="w-[100%]">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                  >
                          {translationState?.lan === "En" && q?.name_en}
                    {translationState?.lan === "Am" && q?.name_am}
                    {translationState?.lan === "Or" && q?.name_or}
                    {translationState?.lan === "Tg" && q?.name_tg}
                    {translationState?.lan === "Sm" && q?.name_sm}
                    {translationState?.lan === "Af" && q?.name_af}
                    {q?.isReqired && <span className="text-red-700">*</span>}
                  </label>
                  <div className="mt-2">
                    <select
                      required
                      onChange={(e) =>
                        handleInputChange(q?._id, e.target.value)
                      }
                      className="block w-full rounded-md p-4 bg-transparent border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2"
                    >
                      <option value={""}></option>
                      {q?.enumValues?.map((eval2, index) => {
                        return (
                          <option key={index} value={eval2?._id}>
                     {translationState?.lan === "En" && eval2?.expectedValues?.value_en}
                    {translationState?.lan === "Am" && eval2?.expectedValues?.value_am}
                    {translationState?.lan === "Or" && eval2?.expectedValues?.value_or}
                    {translationState?.lan === "Tg" && eval2?.expectedValues?.value_tg}
                    {translationState?.lan === "Sm" && eval2?.expectedValues?.value_sm}
                    {translationState?.lan === "Af" && eval2?.expectedValues?.value_af}
                           
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              );
            }
          })}
        </div>

        {/* remark and attachment */}
        <div className="w-[100%] flex flex-col my-[20px]">
          <div className="w-[100%] mt-[30px] flex flex-col gap-[10px]">
            <span className="text-[14px] font-bold w-[80%] text-[#0C73B8]">
            {translationState?.lan === "En" && language?.attachement[0]}
            {translationState?.lan === "Am" && language?.attachement[1]}
                    {translationState?.lan === "Or" && language?.attachement[2]}
                    {translationState?.lan === "Tg" && language?.attachement[3]}
                    {translationState?.lan === "Sm" && language?.attachement[4]}
                    {translationState?.lan === "Af" && language?.attachement[5]} 
            </span>
            <label>
              <input
                type="file"
                onChange={(e) => setAttachment(e.target.files[0])}
                hidden
              />
              <div className="[w-[70%] h-[200px] text-[#0C73B8] flex justify-center gap-[10px]  items-center p-4 mx-auto border border-gray-300 rounded border-dashed cursor-pointer text-center">
                <BsFillCloudUploadFill />
                <span className="text-[14px] font-bold">
                {translationState?.lan === "En" && language?.uploadAttachment[0]}
                {translationState?.lan === "Am" && language?.uploadAttachment[1]}
                    {translationState?.lan === "Or" && language?.uploadAttachment[2]}
                    {translationState?.lan === "Tg" && language?.uploadAttachment[3]}
                    {translationState?.lan === "Sm" && language?.uploadAttachment[4]}
                    {translationState?.lan === "Af" && language?.uploadAttachment[5]} 
                    {" "}
                    ({translationState?.lan === "En" && language?.fileSize[0]}
                    {translationState?.lan === "Am" && language?.fileSize[1]}
                    {translationState?.lan === "Or" && language?.fileSize[2]}
                    {translationState?.lan === "Tg" && language?.fileSize[3]}
                    {translationState?.lan === "Sm" && language?.fileSize[4]}
                    {translationState?.lan === "Af" && language?.fileSize[5]}) 
                </span>
              </div>
            </label>
          </div>

          <div className="w-[100%] my-4 overflow-y-scroll">
            {attachment && (
              <embed
                src={URL.createObjectURL(attachment)}
                type="application/pdf"
                width="100%"
                height="600px"
              />
            )}
          </div>
          <div className="w-[100%]">
            <label
              htmlFor="street-address"
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
            >
                {translationState?.lan === "En" && language?.remark[0]}
             {translationState?.lan === "Am" && language?.remark[1]}
                    {translationState?.lan === "Or" && language?.remark[2]}
                    {translationState?.lan === "Tg" && language?.remark[3]}
                    {translationState?.lan === "Sm" && language?.remark[4]}
                    {translationState?.lan === "Af" && language?.remark[5]} 
            </label>
            <div className="mt-2">
              <textarea
                required
                onChange={(e) => setRemark(e.target.value)}
                rows={15}
                className="block w-full rounded-md p-4 border-0 resize-none  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2"
              ></textarea>
            </div>
          </div>
        </div>


{!confirmModal &&   <div className="w-[100%] mx-auto my-6 py-5 flex items-center justify-end gap-x-6">
            <button
              onClick={() => navigate(-1)}
              className="text-sm  leading-6 text-gray-900 max-lg2:text-[12px]"
            >
                 {translationState?.lan === "En" && language?.cancel[0]}
              {translationState?.lan === "Am" && language?.cancel[1]}
                    {translationState?.lan === "Or" && language?.cancel[2]}
                    {translationState?.lan === "Tg" && language?.cancel[3]}
                    {translationState?.lan === "Sm" && language?.cancel[4]}
                    {translationState?.lan === "Af" && language?.cancel[5]} 
            </button>
            <button
              onClick={()=>{window.scrollTo({
                top:0
              });setConfirmModal(true)}}
              className={

                "rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 max-lg2:text-[12px]"
              }
            >
                {translationState?.lan === "En" && language?.apply[0]}
            {translationState?.lan === "Am" && language?.apply[1]}
                    {translationState?.lan === "Or" && language?.apply[2]}
                    {translationState?.lan === "Tg" && language?.apply[3]}
                    {translationState?.lan === "Sm" && language?.apply[4]}
                    {translationState?.lan === "Af" && language?.apply[5]} 
            </button>
          </div>}
      
        
        
      </div>}
      {confirmModal && <ConfirmCase filteredQuestions={filteredQuestions}  findNotSpecialDivisions={filterNotSpecialDivision} findCaseList={findCaseList} setConfirmModal={setConfirmModal} division={division} caseRequest={caseRequest} formQuestions={formQuestions} remark={remark} attachment={attachment} relatedCaseID={relatedCaseID}/>} 
  
    </div>
  );
}

export default Cases;
