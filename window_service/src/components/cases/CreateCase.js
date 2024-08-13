import React, { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDivision } from "../../REDUX/slices/allDivisionsSlice";
import { fetchAllCaseRequests } from "../../REDUX/slices/getAllCaseRequestSlice";
import { fetchAllQuestions } from "../../REDUX/slices/getAlllQuestionsSlice";
import apiRequest from "../../utils/request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../ServerError";
import Loading from "../Loading";
import { language } from "../../utils/part-1lan";
import ConfirmCase from "./ConfirmCase";

function CreateCase() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translationState = useSelector((state) => state?.translation);
  const divisionState = useSelector((state) => state?.allDivisions);
  const caseRequestsState = useSelector((state) => state?.allCaseRequests);
  const allQuestionsState = useSelector((state) => state?.allQuestions);
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [subCity, setSubCity] = useState("");
  const [woreda, setWoreda] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [housePhoneNumber, setHousePhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [division, setDivision] = useState("");
  const [caseRequest, setCaseRequest] = useState("");
  const [relatedCaseID, setRelatCaseID] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [remark, setRemark] = useState("");
  const [formQuestions, setFormQuestions] = useState([]);
  const [relatedLoading,setRelatedLoading] = useState(false);
  const [confirmModal,setConfirmModal] = useState(false);
  const [serverError, setServerError] = useState(false);

  const findRelatedCaseData = async () => {
    try {
      setRelatedLoading(true)
      await apiRequest
        .post(
          `/customer_case_api/get_case_by_casenum`,
          { casenum: relatedCaseID },
          {
            headers: {
              get_gecase_bycasenum_api:
                process.env.REACT_APP_GET_GECASE_BYCASENUM_API,
            },
          }
        )
        .then((res) => {
          setRelatedLoading(false)
          setFirstname(res?.data?.customer_info?.firstname);
          setMiddlename(res?.data?.customer_info?.middlename);
          setLastname(res?.data?.customer_info?.lastname);
          setSubCity(res?.data?.customer_info?.subcity);
          setWoreda(res?.data?.customer_info?.woreda);
          setHouseNumber(res?.data?.customer_info?.house_number);
          setPhoneNumber(res?.data?.customer_info?.phone_number);
          setHousePhoneNumber(res?.data?.customer_info?.house_phone_number);
          setGender(res?.data?.customer_info?.gender);
          setRemark(res?.data?.customer_info?.remark)
        })
        .catch((error) => {
          setRelatedLoading(false)
          if (error.response.status === 500) {
            setServerError(true);
          }

          translationState?.lan === "En"
            ? toast.error(error?.response?.data?.Message_en)
            : toast.error(error?.response?.data?.Message_am);
        });
    } catch (error) {
      setRelatedLoading(false)
      setServerError(true);
    }
  };

  useEffect(() => {
    dispatch(fetchAllDivision());
    dispatch(fetchAllCaseRequests());
    dispatch(fetchAllQuestions());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const findActiveDivisions = divisionState?.divisions?.filter((div)=>div?.status ==="active");
  const findNotSpecialDivisions = findActiveDivisions?.filter((div)=>div?.special ==="no");


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



  const filterCaseList = caseRequestsState?.caseRequests?.filter((cr)=>cr?.status ==="active");
  const findCaseList = filterCaseList?.filter(
    (cr) => cr?.division === division
  );
  const filteredQuestions = allQuestionsState?.questions?.filter(
    (question) => question?.caselist?._id === caseRequest
  );

  if (serverError) return <ServerError />;

  return (
    <div className="w-[100%] relative">
      <ToastContainer theme="light" />
      <div className="w-[90%] my-[50px] mx-auto max-lg2:my-[30px]">
        <div className="flex items-center font-bold text-[#0C73B8] gap-[5px]">
          <IoChevronBack
            onClick={() => navigate(-1)}
            className="text-[30px] cursor-pointer"
          />
          <span>
          {translationState?.lan==="En" && language?.createCaseForCustomer[0]} 
          {translationState?.lan==="Am" && language?.createCaseForCustomer[1]}
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
        <div className="my-[30px] flex justify-center items-center">
          <span className="text-[#0C73B8] font-bold">
          {translationState?.lan==="En" && language?.customerInformation[0]} 
          {translationState?.lan==="Am" && language?.customerInformation[1]}
          </span>
        </div>
      
        <div className="w-[100%] my-[20px] grid grid-cols-3 gap-[10px]">
          <div className="w-[100%] col-span-1">
            <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
            {translationState?.lan==="En" && language?.firstname[0]} 
            {translationState?.lan==="Am" && language?.firstname[1]} <span className="text-red-700">*</span>
            </label>
            <div className="mt-2">
              <input
                required
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e?.target?.value)}
                className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
              />
            </div>
          </div>
          <div className="w-[100%] col-span-1">
            <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
            {translationState?.lan==="En" && language?.middlename[0]} 
            {translationState?.lan==="Am" && language?.middlename[1]} <span className="text-red-700">*</span>
            </label>
            <div className="mt-2">
              <input
                required
                type="text"
                value={middlename}
                onChange={(e) => setMiddlename(e?.target?.value)}
                className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
              />
            </div>
          </div>
          <div className="w-[100%] col-span-1">
            <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
            {translationState?.lan==="En" && language?.lastname[0]} 
            {translationState?.lan==="Am" && language?.lastname[1]} <span className="text-red-700">*</span>
            </label>
            <div className="mt-2">
              <input
                required
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e?.target?.value)}
                className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
              />
            </div>
          </div>
          <div className="w-[100%] col-span-1">
            <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
            {translationState?.lan==="En" && language?.subCity[0]} 
            {translationState?.lan==="Am" && language?.subCity[1]} <span className="text-red-700">*</span>
            </label>
            <div className="mt-2">
              <input
                required
                type="text"
                value={subCity}
                onChange={(e) => setSubCity(e?.target?.value)}
                className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
              />
            </div>
          </div>
          <div className="w-[100%] col-span-1">
            <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
            {translationState?.lan==="En" && language?.woreda[0]} 
            {translationState?.lan==="Am" && language?.woreda[1]} <span className="text-red-700">*</span>
            </label>
            <div className="mt-2">
              <input
                required
                type="text"
                value={woreda}
                onChange={(e) => setWoreda(e?.target?.value)}
                className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
              />
            </div>
          </div>
          <div className="w-[100%] col-span-1">
            <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
            {translationState?.lan==="En" && language?.houseNumber[0]} 
            {translationState?.lan==="Am" && language?.houseNumber[1]} <span className="text-red-700">*</span>
            </label>
            <div className="mt-2">
              <input
                required
                type="text"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e?.target?.value)}
                className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
              />
            </div>
          </div>
          <div className="w-[100%] col-span-1">
            <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
            {translationState?.lan==="En" && language?.phoneNumber[0]} 
            {translationState?.lan==="Am" && language?.phoneNumber[1]} <span className="text-red-700">*</span>
            </label>
            <div className="mt-2">
              <input
                required
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e?.target?.value)}
                className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
              />
            </div>
          </div>
          <div className="w-[100%] col-span-1">
            <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
            {translationState?.lan==="En" && language?.housePhoneNumber[0]} 
            {translationState?.lan==="Am" && language?.housePhoneNumber[1]}
            </label>
            <div className="mt-2">
              <input
                required
                type="text"
                value={housePhoneNumber}
                onChange={(e) => setHousePhoneNumber(e?.target?.value)}
                className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
              />
            </div>
          </div>
          <div className="w-[100%] col-span-1">
            <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
            {translationState?.lan==="En" && language?.gender[0]} 
            {translationState?.lan==="Am" && language?.gender[1]} <span className="text-red-700">*</span>
            </label>
            <div className="mt-2">
              <select
                value={gender}
                onChange={(e) => setGender(e?.target?.value)}
                className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
              >
                <option value={""}>
                {translationState?.lan==="En" && language?.selectGender[0]} 
                {translationState?.lan==="Am" && language?.selectGender[1]}
                </option>
                <option value={"Male"}>
                {translationState?.lan==="En" && language?.male[0]} 
                {translationState?.lan==="Am" && language?.male[1]}
                </option>
                <option value={"Female"}>
                {translationState?.lan==="En" && language?.female[0]} 
                {translationState?.lan==="Am" && language?.female[1]}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="w-[100%] h-[1px] bg-gray-300 mt-[30px]" />

        <div className="my-[30px] flex justify-center items-center">
          <span className="text-[#0C73B8] font-bold">
          {translationState?.lan==="En" && language?.caseInformation[0]} 
          {translationState?.lan==="Am" && language?.caseInformation[1]}
          </span>
        </div>
        <div className="w-[100%] my-[10px] grid grid-cols-3 gap-[10px]">
          <div className="w-[100%] col-span-1">
            <label
              htmlFor="street-address"
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
            >
                {translationState?.lan==="En" && language?.division[0]} 
                {translationState?.lan==="Am" && language?.division[1]} <span className="text-red-700">*</span>
            </label>
            <div className="mt-2">
              <select
                required
                onChange={(e) => setDivision(e?.target?.value)}
                className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
              >
                <option value={""}>
                {translationState?.lan === "En" && language?.selectDivision[0]}
                {translationState?.lan === "Am" && language?.selectDivision[1]}
                </option>
                {findNotSpecialDivisions?.map((division1, index) => {
                  return (
                    <option key={index} value={division1?._id}>
                          {translationState?.lan==="En" && division1?.name_en} 
                          {translationState?.lan==="Am" && division1?.name_am}
                   
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {findCaseList?.length > 0 && (
            <div className="w-[100%] col-span-1">
              <label
                htmlFor="street-address"
                className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
              >
                     {translationState?.lan==="En" && language?.caseRequest[0]} 
                     {translationState?.lan==="Am" && language?.caseRequest[1]} <span className="text-red-700">*</span>
              </label>
              <div className="mt-2">
                <select
                  required
                  onChange={(e) => setCaseRequest(e?.target?.value)}
className="block w-full p-4 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                >
                  <option value={""}>
                  {translationState?.lan==="En" && language?.selectCaseRequest[0]} 
                  {translationState?.lan==="Am" && language?.selectCaseRequest[1]}
                  </option>
                  {findCaseList?.map((caserequest, index) => {
                    return (
                      <option key={index} value={caserequest?._id}>
                            {translationState?.lan==="En" && caserequest?.case_name_en} 
                            {translationState?.lan==="Am" && caserequest?.case_name_am}
                
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          )}

          <div className="w-[100%] col-span-1">
            <label
              htmlFor="street-address"
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
            >
                {translationState?.lan==="En" && language?.relatedCaseNumber[0]} 
                {translationState?.lan==="Am" && language?.relatedCaseNumber[1]}
            </label>
            <div className="mt-2 flex gap-[10px]">
              <input
                required
                onChange={(e) => setRelatCaseID(e?.target?.value)}
                className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
              />
              {relatedLoading ? <Loading addtionalStyle={"flex justify-center items-center"}/>:  <button
                className="bg-[#0C73B8] text-[14px] rounded-[5px] px-2 text-white"
                onClick={findRelatedCaseData}
              >
              {translationState?.lan==="En" && language?.findRelatedCaseNumber[0]} 
              {translationState?.lan==="Am" && language?.findRelatedCaseNumber[1]}
              </button>}
            
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
                    className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                  >

                   {translationState?.lan === "En" && q?.name_en}
                    {translationState?.lan === "Am" && q?.name_am}
                  
                    {q?.isRequired && <span className="text-red-700">*</span>}
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      onChange={(e) =>
                        handleInputChange(q?._id, e?.target?.value)
                      }
                      type={q?.dataType === "string" ? "text" : "number"}
                      className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
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
                    {q?.isRequired && <span className="text-red-700">*</span>}
                  </label>
                  <div className="mt-2">
                    <textarea
                      required
                      onChange={(e) =>
                        handleInputChange(q?._id, e?.target?.value)
                      }
                      rows={15}
                      className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
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
                        {" "}
                    {q?.isRequired && <span className="text-red-700">*</span>}
                  </label>
                  <div className="mt-2">
                    <select
                      required
                      onChange={(e) =>
                        handleInputChange(q?._id, e?.target?.value)
                      }
                      className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                    >
                      <option value={""}></option>
                      {q?.enumValues?.map((eval2, index) => {
                        return (
                          <option key={index} value={eval2?._id}>
                         {translationState?.lan === "En" && eval2?.expectedValues?.value_en}
                         {translationState?.lan === "Am" && eval2?.expectedValues?.value_am}
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
            </span>
            <label>
              <input
                type="file"
                onChange={(e) => setAttachment(e?.target?.files?.[0])}
                hidden
              />
              <div className="[w-[70%] h-[200px] text-[#0C73B8] flex justify-center gap-[10px]  items-center p-4 mx-auto border border-gray-300 rounded border-dashed cursor-pointer text-center">
                <BsFillCloudUploadFill />
                <span className="text-[14px] font-bold">
                {translationState?.lan === "En" && language?.uploadAttachment[0]}
                {translationState?.lan === "Am" && language?.uploadAttachment[1]}
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
            </label>
            <div className="mt-2">
              <textarea
                required
                value={remark}
                onChange={(e) => setRemark(e?.target?.value)}
                rows={15}
                className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
              ></textarea>
            </div>
          </div>
        </div>

  
  {!confirmModal &&    <div className="w-[100%] mx-auto my-6 py-5 flex items-center justify-end gap-x-6">
            <button
              onClick={() => navigate(-1)}
              className="text-sm  leading-6 text-gray-900 max-lg2:text-[12px]"
            >
           {translationState?.lan === "En" && language?.cancel[0]}
           {translationState?.lan === "Am" && language?.cancel[1]}
            </button>
            <button
              onClick={()=>{window.scrollTo({top:0}); setConfirmModal(true)}}
              className={"rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 max-lg2:text-[12px]"}
            >
            {translationState?.lan === "En" && language?.apply[0]}
            {translationState?.lan === "Am" && language?.apply[1]}
            </button>
          </div>}
       
        
      </div>
   
     {confirmModal && <ConfirmCase filteredQuestions={filteredQuestions} findNotSpecialDivisions={findNotSpecialDivisions} findCaseList={findCaseList} setConfirmModal={setConfirmModal} division={division} caseRequest={caseRequest} formQuestions={formQuestions} remark={remark} attachment={attachment} relatedCaseID={relatedCaseID} firstname={firstname} middlename={middlename} lastname={lastname} subCity={subCity} woreda={woreda} houseNumber={houseNumber} housePhoneNumber={housePhoneNumber} phoneNumber={phoneNumber} gender={gender}/>} 
        

   
   
    </div>
  );
}

export default CreateCase;
