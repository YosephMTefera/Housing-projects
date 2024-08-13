import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiRequest from "../../utils/request";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import ServerError from "../ServerError";
import { IoChevronBack } from "react-icons/io5";
import Loading from "../Loading";
import { fetchAllQuestions } from "../../REDUX/slices/getAlllQuestionsSlice";
import { language } from "../../utils/part-1lan";
function CaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("tID");
  const dispatch = useDispatch();
  const translationState = useSelector((state) => state?.translation);
  const allQuestionsState = useSelector((state) => state?.allQuestions);
  const [caseInfo, setCaseInfo] = useState({});
  const [caseList, setCaseList] = useState({});
  const [noCaseFound,setNoCaseFound] = useState(false)
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

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
          setLoading(false);
          if (error?.response?.status === 500) {
            setServerError(true);
          }
          if(error?.response?.status ===406){
            setNoCaseFound(true)
          }
        
        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  }, [id, token, translationState.lan]);

  useEffect(() => {
    dispatch(fetchAllQuestions());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      if (caseInfo?.caselist?._id) {
        setLoading(true);

        apiRequest
          .get(`/case_list_api/get_case_list/${caseInfo?.caselist?._id}`, {
            headers: {
              get_casegetlist_api: process.env.REACT_APP_GET_CASEGETLIST_API,
            },
          })
          .then((res) => {
            setLoading(false);
            setCaseList(res.data);
          })
          .catch((error) => {
            setLoading(false);
            if (error?.response?.status === 500) {
              setServerError(true);
            }
          
          });
      }
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  }, [id, token, translationState.lan, caseInfo?.caselist?._id]);

  if(noCaseFound) return <div className="w-[80%] mx-auto border border-dashed border-[#0C73B8] rounded-[20px] min-h-[200px] py-2 bg-white flex flex-col justify-center items-center  gap-[10px] my-[20px]">
  <span className="font-bold text-[#0C73B8]">
  {translationState?.lan === "En" && language?.noCaseFound[0]}
  {translationState?.lan === "Am" && language?.noCaseFound[1]}
  </span>
  <button
              onClick={() => navigate(`/`)}
              className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[10px] font-bold max-lg2:text-[10px]"
            >
              {translationState?.lan === "En" && language?.back[0]}
              {translationState?.lan === "Am" && language?.back[1]}
            </button>
</div>


  if (serverError) return <ServerError />;
  return (
    <div className="w-[100%]">
      <ToastContainer theme="light" />
      {loading ? (
        <Loading
          addtionalStyle={"flex justify-center items-center my-[30px]"}
        />
      ) : (
        <div className="w-[90%] my-[50px] mx-auto max-lg2:my-[30px]">
          <div className="flex justify-between items-center  gap-[5px]">
            <div className="flex items-center gap-[5px] font-bold text-[#0C73B8]">
              <IoChevronBack
                onClick={() => navigate(-1)}
                className="text-[30px] cursor-pointer"
              />
              <span>
                {translationState?.lan === "En" && language?.caseInformation[0]}
                {translationState?.lan === "Am" &&
                  language?.caseInformation[1]}{" "}
                {caseInfo?.case_number}
              </span>
            </div>
            <div className="flex items-center gap-[10px]">
              <div>
                <button
                  onClick={() => navigate(`/print/${caseInfo?._id}`)}
                  className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                >
                  {translationState?.lan === "En" && language?.print[0]}
                  {translationState?.lan === "Am" && language?.print[1]}
                </button>
              </div>
              <div className="flex justify-center  items-center text-[14px] font-bold max-lg2:text-[12px]">
                {caseInfo?.status === "pending" && (
                  <span className="py-2 px-4 rounded-[20px] bg-gray-200 text-gray-700">
                    {translationState?.lan === "En" && language?.pending[0]}
                    {translationState?.lan === "Am" && language?.pending[1]}
                  </span>
                )}
                {(caseInfo?.status === "ongoing" ||
                  caseInfo?.status === "responded") && (
                  <span className="py-2 px-4 rounded-[20px] text-black">
                    {translationState?.lan === "En" && language?.processing[0]}
                    {translationState?.lan === "Am" && language?.processing[1]}
                  </span>
                )}

                {caseInfo?.status === "verified" && (
                  <span className="py-2 px-4 rounded-[20px] text-green-600">
                    {translationState?.lan === "En" && language?.responded[0]}
                    {translationState?.lan === "Am" && language?.responded[1]}
                  </span>
                )}
                {caseInfo?.status === "rejected" && (
                  <span className="py-2 px-4 rounded-[5px] text-red-600">
                    {translationState?.lan === "En" && language?.rejected[0]}
                    {translationState?.lan === "Am" && language?.rejected[1]}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="my-[50px] flex justify-center items-center">
            <span className="text-[#0C73B8] font-bold">
              {translationState?.lan === "En" &&
                language?.customerInformation[0]}
              {translationState?.lan === "Am" &&
                language?.customerInformation[1]}
            </span>
          </div>
          <div className="w-[100%] my-[20px] grid grid-cols-3 gap-[10px]">
            <div className="w-[100%] col-span-1">
              <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                {translationState?.lan === "En" && language?.firstname[0]}
                {translationState?.lan === "Am" && language?.firstname[1]}
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  value={
                    caseInfo?.customer_info?.firstname ||
                    caseInfo?.customer_id?.firstname
                  }
                  disabled
                  className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />
              </div>
            </div>
            <div className="w-[100%] col-span-1">
              <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                {translationState?.lan === "En" && language?.middlename[0]}
                {translationState?.lan === "Am" && language?.middlename[1]}
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  value={
                    caseInfo?.customer_info?.middlename ||
                    caseInfo?.customer_id?.middlename
                  }
                  disabled
                  className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />
              </div>
            </div>
            <div className="w-[100%] col-span-1">
              <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                {translationState?.lan === "En" && language?.lastname[0]}
                {translationState?.lan === "Am" && language?.lastname[1]}
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  value={
                    caseInfo?.customer_info?.lastname ||
                    caseInfo?.customer_id?.lastname
                  }
                  disabled
                  className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />
              </div>
            </div>
            <div className="w-[100%] col-span-1">
              <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                {translationState?.lan === "En" && language?.subCity[0]}
                {translationState?.lan === "Am" && language?.subCity[1]}
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  value={
                    caseInfo?.customer_info?.subcity ||
                    caseInfo?.customer_id?.subcity
                  }
                  disabled
                  className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />
              </div>
            </div>
            <div className="w-[100%] col-span-1">
              <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                {translationState?.lan === "En" && language?.woreda[0]}
                {translationState?.lan === "Am" && language?.woreda[1]}
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  value={
                    caseInfo?.customer_info?.woreda ||
                    caseInfo?.customer_id?.woreda
                  }
                  disabled
                  className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />
              </div>
            </div>
            <div className="w-[100%] col-span-1">
              <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                {translationState?.lan === "En" && language?.houseNumber[0]}
                {translationState?.lan === "Am" && language?.houseNumber[1]}
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  value={
                    caseInfo?.customer_info?.house_number ||
                    caseInfo?.customer_id?.house_number
                  }
                  disabled
                  className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />
              </div>
            </div>
            <div className="w-[100%] col-span-1">
              <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                {translationState?.lan === "En" && language?.phoneNumber[0]}
                {translationState?.lan === "Am" && language?.phoneNumber[1]}
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  value={
                    caseInfo?.customer_info?.phone_number ||
                    caseInfo?.customer_id?.phone
                  }
                  disabled
                  className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />
              </div>
            </div>
            <div className="w-[100%] col-span-1">
              <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                {translationState?.lan === "En" &&
                  language?.housePhoneNumber[0]}
                {translationState?.lan === "Am" &&
                  language?.housePhoneNumber[1]}
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  value={
                    caseInfo?.customer_info?.house_phone_number ||
                    caseInfo?.customer_id?.house_phone_number
                  }
                  disabled
                  className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />
              </div>
            </div>
            <div className="w-[100%] col-span-1">
              <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                {translationState?.lan === "En" && language?.gender[0]}
                {translationState?.lan === "Am" && language?.gender[1]}
              </label>
              <div className="mt-2">
                <input
                  required
                  value={
                    caseInfo?.customer_info?.gender ||
                    caseInfo?.customer_id?.gender
                  }
                  disabled
                  className="block flex-1 w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />
              </div>
            </div>
          </div>

          <div className="w-[100%] h-[1px] bg-gray-300 mt-[30px]" />

          <div className="my-[30px] flex justify-center items-center">
            <span className="text-[#0C73B8] font-bold">
              {translationState?.lan === "En" && language?.caseInformation[0]}
              {translationState?.lan === "Am" && language?.caseInformation[1]}
            </span>
          </div>
          <div className="w-[100%] my-[10px] grid grid-cols-2 gap-[10px]">
            <div className="w-[100%] col-span-1">
              <label
                htmlFor="street-address"
                className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
              >
                {translationState?.lan === "En" && language?.division[0]}
                {translationState?.lan === "Am" && language?.division[1]}
              </label>
              <div className="mt-2">
                {translationState?.lan === "En" && (
                  <input
                    required
                    value={caseInfo?.division?.name_en}
                    disabled
                    className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Am" && (
                  <input
                    required
                    value={caseInfo?.division?.name_am}
                    disabled
                    className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                  />
                )}
              </div>
            </div>

            <div className="w-[100%] col-span-1">
              <label
                htmlFor="street-address"
                className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
              >
                {translationState?.lan === "En" && language?.caseRequest[0]}
                {translationState?.lan === "Am" && language?.caseRequest[1]}
              </label>
              <div className="mt-2">
                {translationState?.lan === "En" && (
                  <input
                    required
                    value={caseList?.case_name_en}
                    disabled
                    className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Am" && (
                  <input
                    required
                    value={caseList?.case_name_am}
                    disabled
                    className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                  />
                )}
              </div>
            </div>

            <div className="w-[100%] col-span-1">
              <label
                htmlFor="street-address"
                className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
              >
                {translationState?.lan === "En" && language?.caseNumber[0]}
                {translationState?.lan === "Am" && language?.caseNumber[1]}
              </label>
              <div className="mt-2 flex gap-[10px]">
                <input
                  required
                  value={caseInfo?.case_number}
                  disabled
                  className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />
              </div>
            </div>

            <div className="w-[100%] col-span-1">
              <label
                htmlFor="street-address"
                className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
              >
                {translationState?.lan === "En" &&
                  language?.relatedCaseNumber[0]}
                {translationState?.lan === "Am" &&
                  language?.relatedCaseNumber[1]}
              </label>
              <div className="mt-2 flex gap-[10px]">
                <input
                  required
                  value={
                    caseInfo?.related_case_id ? caseInfo?.related_case_id : "-"
                  }
                  disabled
                  className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />
              </div>
            </div>
            <div className="w-[100%] col-span-1">
              <label
                htmlFor="street-address"
                className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
              >
                {translationState?.lan === "En" && language?.late[0]}
                {translationState?.lan === "Am" && language?.late[1]}
              </label>
              <div className="mt-2 flex gap-[10px]">
                <input
                  required
                  value={caseInfo?.late}
                  disabled
                  className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />
              </div>
            </div>

            {caseInfo?.responded_by && (
              <div className="w-[100%] col-span-1">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                >
                  {translationState?.lan === "En" && language?.respondedBy[0]}
                  {translationState?.lan === "Am" && language?.respondedBy[1]}
                </label>
                <div className="mt-2 flex gap-[10px]">
                  <input
                    required
                    value={
                      caseInfo?.responded_by?.firstname +
                      " " +
                      caseInfo?.responded_by?.middlename +
                      " " +
                      caseInfo?.responded_by?.lastname
                    }
                    disabled
                    className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                  />
                </div>
              </div>
            )}

            {caseInfo?.window_service_id && (
              <div className="w-[100%] col-span-1">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                >
                  {translationState?.lan === "En" && language?.createdBy[0]}
                  {translationState?.lan === "Am" && language?.createdBy[1]}{" "}
                  ({translationState?.lan === "En" && language?.windowService[0]} 
                  {translationState?.lan === "Am" && language?.windowService[1]})
                </label>
                <div className="mt-2 flex gap-[10px]">
                  <input
                    required
                    value={
                      caseInfo?.window_service_id?.firstname +
                      " " +
                      caseInfo?.window_service_id?.middlename +
                      " " +
                      caseInfo?.window_service_id?.lastname
                    }
                    disabled
                    className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                  />
                </div>
              </div>
            )}

            {caseInfo?.createdAt && (
              <div className="w-[100%] col-span-1">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                >
                  
                  {translationState?.lan === "En" && language?.submittedDate[0]}
                   
                  {translationState?.lan === "Am" && language?.submittedDate[1]}
                  
                </label>
                <div className="mt-2 flex gap-[10px]">
                  <input
                    required
                    value={new Date(caseInfo?.createdAt)?.toDateString()}
                    disabled
                    className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                  />
                </div>
              </div>
            )}

            {caseInfo?.ongoing_date && (
              <div className="w-[100%] col-span-1">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                >
             {translationState?.lan === "En" && language?.processingStartDate[0]}
             {translationState?.lan === "Am" && language?.processingStartDate[1]}
                </label>
                <div className="mt-2 flex gap-[10px]">
                  <input
                    required
                    value={new Date(caseInfo?.ongoing_date)?.toDateString()}
                    disabled
                    className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                  />
                </div>
              </div>
            )}

            {caseInfo?.verified_date && (
              <div className="w-[100%] col-span-1">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                >
                {translationState?.lan === "En" && language?.respondedDate[0]}
                {translationState?.lan === "Am" && language?.respondedDate[1]}
                </label>
                <div className="mt-2 flex gap-[10px]">
                  <input
                    required
                    value={new Date(caseInfo?.verified_date)?.toDateString()}
                    disabled
                    className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                  />
                </div>
              </div>
            )}
          </div>
          {/* dynamic question */}

          <div className="w-[100%] h-[1px] bg-gray-300 mt-[30px]" />

          <div className="my-[30px] flex justify-center items-center">
            <span className="text-[#0C73B8] font-bold">
            {translationState?.lan==="En" && language?.filledQuestions[0]} 
            {translationState?.lan==="Am" && language?.filledQuestions[1]}
            </span>
          </div>
          <div className="w-[100%] my-[10px] grid grid-cols-1 gap-[10px]">
            {caseInfo?.form?.length > 0 &&
              caseInfo?.form?.map((question, index) => {
                const findQuestion = allQuestionsState?.questions?.find(
                  (quest) =>
                    quest?._id === question?.list_of_question?.question?._id
                );
                const findAnswer = findQuestion?.enumValues?.find(
                  (answer) => answer?._id === question?.list_of_question?.answer
                )?.expectedValues;

                return (
                  <div key={index} className="w-[100%] col-span-1">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                    >
                                      {translationState?.lan==="En" && question?.list_of_question?.question?.name_en} 
                                      {translationState?.lan==="Am" && question?.list_of_question?.question?.name_am}
                    </label>
                    <div className="mt-2">
                    {translationState?.lan==="En" &&       <input
                        required
                        value={
                          findQuestion?.enumValues?.length !== 0
                            ? findAnswer?.value_en
                            : question?.list_of_question?.answer
                        }
                        disabled
                        className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                      /> }
                       {translationState?.lan==="Am" &&       <input
                        required
                        value={
                          findQuestion?.enumValues?.length !== 0
                            ? findAnswer?.value_am
                            : question?.list_of_question?.answer
                        }
                        disabled
                        className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                      /> }
                    </div>
                  </div>
                );
              })}
          </div>

          {/* remark and attachment */}
          {caseInfo?.remark && (
            <div className="w-[100%] col-span-1 my-[20px]">
              <label
                htmlFor="street-address"
                className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
              >
              {translationState?.lan==="En" && language?.remark[0]} 
              {translationState?.lan==="Am" && language?.remark[1]}
              </label>
              <div className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]">
                {caseInfo?.remark}
              </div>
            </div>
          )}
          {caseInfo?.attachment && (
            <div className="w-[100%] flex flex-col my-[20px]">
              <span className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
              {translationState?.lan==="En" && language?.attachement[0]} 
                      {translationState?.lan==="Am" && language?.attachement[1]}
              </span>
              <div className="w-[100%] my-4 overflow-y-scroll">
                {caseInfo?.attachment && (
                  <embed
                    src={`${process.env.REACT_APP_BACKEND_IMAGES}/CaseFiles/${caseInfo?.attachment}`}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                  />
                )}
              </div>
            </div>
          )}

          {caseInfo?.response_justification?.attachment && (
            <div className="w-[100%] flex flex-col my-[20px]">
              <span className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
              {translationState?.lan==="En" && language?.responseAttachment[0]} 
              {translationState?.lan==="Am" && language?.responseAttachment[1]}
              </span>
              <div className="w-[100%] my-4 overflow-y-scroll">
                {caseInfo?.response_justification?.attachment && (
                  <embed
                    src={`${process.env.REACT_APP_BACKEND_URL2}/${caseInfo?.response_justification?.attachment}`}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                  />
                )}
              </div>
            </div>
          )}

          <div className="w-[100%] h-[1px] bg-gray-300 mt-[30px]" />
          {/* schedule information */}

          {caseInfo?.schedule_program?.length > 0 && (
            <>
              <div className="my-[30px] flex justify-center items-center">
                <span className="text-[#0C73B8] font-bold">
                {translationState?.lan==="En" && language?.scheduleInformation[0]} 
                {translationState?.lan==="Am" && language?.scheduleInformation[1]}
                </span>
              </div>
              <div className="w-[100%] my-[10px] grid grid-cols-2 gap-[10px]">
                {caseInfo?.schedule_program?.map((schedule) => {
                  return (
                    <>
                      {schedule?.schedule?.extended_by && (
                        <div className="w-[100%] col-span-1">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                          >
                                     {translationState?.lan==="En" && language?.extendedBy[0]} 
                                     {translationState?.lan==="Am" && language?.extendedBy[1]}
                          </label>
                          <div className="mt-2">
                            <input
                              required
                              value={
                                schedule?.schedule?.extended_by?.firstname +
                                " " +
                                schedule?.schedule?.extended_by?.middlename +
                                " " +
                                schedule?.schedule?.extended_by?.lastname
                              }
                              disabled
                              className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                            />
                          </div>
                        </div>
                      )}

                      {schedule?.schedule?.extended_date && (
                        <div className="w-[100%] col-span-1">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                          >
                            {translationState?.lan==="En" && language?.extendedDate[0]} 
                            {translationState?.lan==="Am" && language?.extendedDate[1]}
                          </label>
                          <div className="mt-2">
                            <input
                              required
                              value={schedule?.schedule?.extended_date}
                              disabled
                              className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                            />
                          </div>
                        </div>
                      )}

                      {schedule?.schedule?.scheduled_by && (
                        <div className="w-[100%] col-span-1">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                          >
                                   {translationState?.lan==="En" && language?.scheduledBy[0]} 
                                   {translationState?.lan==="Am" && language?.scheduledBy[1]}
                          </label>
                          <div className="mt-2 flex gap-[10px]">
                            <input
                              required
                              value={
                                schedule?.schedule?.scheduled_by?.firstname +
                                " " +
                                schedule?.schedule?.scheduled_by?.middlename +
                                " " +
                                schedule?.schedule?.scheduled_by?.lastname
                              }
                              disabled
                              className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                            />
                          </div>
                        </div>
                      )}

                      {schedule?.schedule?.scheduled_date && (
                        <div className="w-[100%] col-span-1">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                          >
                                {translationState?.lan==="En" && language?.scheduledDate[0]} 
                                {translationState?.lan==="Am" && language?.scheduledDate[1]}
                          </label>
                          <div className="mt-2 flex gap-[10px]">
                            <input
                              required
                              value={schedule?.schedule?.scheduled_date}
                              disabled
                              className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                            />
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
            </>
          )}

          {caseInfo?.rejected_by && (
            <>
              <div className="w-[100%] h-[1px] bg-gray-300 mt-[30px]" />

              <div className="my-[30px] flex justify-center items-center">
                <span className="text-[#0C73B8] font-bold">
                {translationState?.lan==="En" && language?.reasonOfRejection[0]} 
                {translationState?.lan==="Am" && language?.reasonOfRejection[1]}
                </span>
              </div>
              <div className="w-[100%] my-[10px] grid grid-cols-2 gap-[10px]">
                <div className="w-[100%] col-span-1">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                  >
              {translationState?.lan==="En" && language?.rejectedDate[0]} 
              {translationState?.lan==="Am" && language?.rejectedDate[1]}
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      value={new Date(caseInfo?.rejected_date)?.toDateString()}
                      disabled
                      className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                    />
                  </div>
                </div>

                <div className="w-[100%] col-span-2">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                  >
                                     {translationState?.lan==="En" && language?.rejectionJustification[0]} 
                                     {translationState?.lan==="Am" && language?.rejectionJustification[1]}
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      value={caseInfo?.rejection_justification}
                      disabled
                      className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default CaseDetail;
