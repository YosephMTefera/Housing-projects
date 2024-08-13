import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import apiRequest from "../../utils/request";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ServerError from "../ServerError";
import Loading from "../Loading";
import { IoChevronBack } from "react-icons/io5";
import { fetchAllQuestions } from "../../REDUX/slices/getAlllQuestionsSlice";
import RateService from "./RateService";
import { jwtDecode } from "jwt-decode";
import { language } from "../../utils/part-1lan";

function CaseDetail() {
  const { id } = useParams();
  const location = useLocation();
  const { case_number } = location.state ||{};
  const token = sessionStorage.getItem("tID");
  const decodedToken = jwtDecode(token);
  const userID = decodedToken?.user?.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translationState = useSelector((state) => state.translation);
  const allQuestionsState = useSelector((state) => state.allQuestions);
  const [caseInfo, setCaseInfo] = useState({});
  const [caseList, setCaseList] = useState({});
  const [caseRatingInfo, setCaseRatingInfo] = useState({});
  const [rateModal, setRateModal] = useState(false);
  const [rateLimitTimer, setRateLimitTimer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    try {
      if (case_number) {
        setLoading(true);

        apiRequest
          .post(
            `/customer_case_api/get_case_by_casenum`,
            { casenum: case_number },
            {
              headers: {
                get_gecase_bycasenum_api:
                  process.env.REACT_APP_GET_GECASE_BYCASENUM_API,
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            setLoading(false);
            setCaseInfo(res?.data);
          })
          .catch((error) => {
            
            setLoading(false);
            if (error?.response?.status === 500) {
           
              setServerError(true);
            }
            if(error?.response?.status === 429){
          
              setRateLimitTimer(180);
            
          }
            translationState?.lan === "En" && toast.error(error?.response?.data?.Message_en)
            translationState?.lan === "Am" && toast.error(error?.response?.data?.Message_am)
            translationState?.lan === "Or" && toast.error(error?.response?.data?.Message_or)
            translationState?.lan === "Tg" && toast.error(error?.response?.data?.Message_tg)
            translationState?.lan === "Sm" && toast.error(error?.response?.data?.Message_sm)
            translationState?.lan === "Af" && toast.error(error?.response?.data?.Message_af)
           
            
          });
      }
    } catch (error) {
      
      setLoading(false);
      setServerError(true);
    }
  }, [case_number, token, translationState.lan]);

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
            if(error?.response?.status === 429){
          
              setRateLimitTimer(180);
            
          }
          });
      }
    } catch (error) {
     
      setLoading(false);
      setServerError(true);
    }
  }, [id, token, translationState.lan, caseInfo?.caselist?._id]);

  useEffect(() => {
    try {
      if (caseInfo?._id) {
        setLoading(true);

        apiRequest
          .get(`/div_rate/get_rating_bycase/${caseInfo?._id}`, {
            headers: {
              get_ratbyca_api: process.env.REACT_APP_GET_RATBYCA_API,
            },
          })
          .then((res) => {
       
            setLoading(false);
            setCaseRatingInfo(res.data);
          })
          .catch((error) => {
            setLoading(false);
            if (error?.response?.status === 500) {
         
              setServerError(true);
            }
            if(error?.response?.status === 429){
          
              setRateLimitTimer(180);
            
          }
          });
      }
    } catch (error) {
 
      setLoading(false);
      setServerError(true);
    }
  }, [id, token, caseInfo?._id]);

  useEffect(() => {
    if (rateLimitTimer) {
      const timer = setInterval(() => {
        setRateLimitTimer((prev) => (prev > 1 ? prev - 1 : null));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [rateLimitTimer]);


  if(rateLimitTimer) return <div className="w-[80%] mx-auto my-[30px] min-h-[300px] rounded-[10px] bg-white flex justify-center items-center">
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
      {loading ? (
        <Loading
          addtionalStyle={"flex justify-center items-center my-[30px]"}
        />
      ) : (
        <div className="w-[90%] my-[50px] mx-auto max-lg2:my-[30px]">
          <div className="flex justify-between items-center  gap-[5px]">
            <div className="flex items-center gap-[5px] font-bold text-[#0C73B8] max-lg2:text-[14px]">
              <IoChevronBack
                onClick={() => navigate(-1)}
                className="text-[30px] cursor-pointer max-lg2:text-[24px]"
              />
              <span>{caseInfo?.case_number}</span>
              <div className="ml-5 flex justify-center  items-center text-[12px] font-bold max-lg2:text-[10px]">
                {caseInfo?.status === "pending" && (
                  <span className="py-2 px-4 rounded-[20px] bg-gray-200 text-gray-700">
                   {translationState?.lan === "En" && language?.pending[0]}
                        {translationState?.lan === "Am" && language?.pending[1]}
                        {translationState?.lan === "Or" && language?.pending[2]}
                        {translationState?.lan === "Tg" && language?.pending[3]}
                        {translationState?.lan === "Sm" && language?.pending[4]}
                        {translationState?.lan === "Af" && language?.pending[5]}
                  </span>
                )}
                {(caseInfo?.status === "ongoing" ||
                  caseInfo?.status === "responded") && (
                    <span className="py-2 px-4 rounded-[20px] bg-[#FBB042] text-white">
                          {translationState?.lan === "En" &&
                            language?.processing[0]}
                          {translationState?.lan === "Am" &&
                            language?.processing[1]}
                          {translationState?.lan === "Or" &&
                            language?.processing[2]}
                          {translationState?.lan === "Tg" &&
                            language?.processing[3]}
                          {translationState?.lan === "Sm" &&
                            language?.processing[4]}
                          {translationState?.lan === "Af" &&
                            language?.processing[5]}
                    </span>
                  )}
                {caseInfo?.status === "verified" && (
                  <span className="py-2 px-4 rounded-[20px] bg-green-600 text-white max-lg2:text-[10px]">
                       {translationState?.lan === "En" &&
                          language?.responded[0]}
                        {translationState?.lan === "Am" &&
                          language?.responded[1]}
                        {translationState?.lan === "Or" &&
                          language?.responded[2]}
                        {translationState?.lan === "Tg" &&
                          language?.responded[3]}
                        {translationState?.lan === "Sm" &&
                          language?.responded[4]}
                        {translationState?.lan === "Af" &&
                          language?.responded[5]}
                  </span>
                )}
                {caseInfo?.status === "rejected" && (
                  <span className="py-2 px-4 rounded-[5px] bg-red-600 text-white">
                   {translationState?.lan === "En" && language?.rejected[0]}
                        {translationState?.lan === "Am" && language?.rejected[1]}
                        {translationState?.lan === "Or" && language?.rejected[2]}
                        {translationState?.lan === "Tg" && language?.rejected[3]}
                        {translationState?.lan === "Sm" && language?.rejected[4]}
                        {translationState?.lan === "Af" && language?.rejected[5]}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="w-[100%] h-[1px] bg-gray-300 mt-[30px]" />

          <div className="my-[30px] flex justify-between items-center">
          {translationState?.lan === "En" && (
                  <span className="text-[#0C73B8] text-[20px] font-bold max-lg2:text-[16px]">
                    {language?.caseInformation[0]
                      ? language?.caseInformation[0]
                      : "Case Information"}
                  </span>
                )}
                {translationState?.lan === "Am" && (
                  <span className="text-[#0C73B8] text-[20px] font-bold max-lg2:text-[16px]">
                    {language?.caseInformation[1]
                      ? language?.caseInformation[1]
                      : "Case Information"}
                  </span>
                )}
                {translationState?.lan === "Or" && (
                  <span className="text-[#0C73B8] text-[20px] font-bold max-lg2:text-[16px]">
                    {language?.caseInformation[2]
                      ? language?.caseInformation[2]
                      : "Case Information"}
                  </span>
                )}
                {translationState?.lan === "Tg" && (
                  <span className="text-[#0C73B8] text-[20px] font-bold max-lg2:text-[16px]">
                    {language?.caseInformation[3]
                      ? language?.caseInformation[3]
                      : "Case Information"}
                  </span>
                )}
                {translationState?.lan === "Sm" && (
                  <span className="text-[#0C73B8] text-[20px] font-bold max-lg2:text-[16px]">
                    {language?.caseInformation[4]
                      ? language?.caseInformation[4]
                      : "Case Information"}
                  </span>
                )}
                {translationState?.lan === "Af" && (
                  <span className="text-[#0C73B8] text-[20px] font-bold max-lg2:text-[16px]">
                    {language?.caseInformation[5]
                      ? language?.caseInformation[5]
                      : "Case Information"}
                  </span>
                )}
            <div className="flex gap-8">
              <div>
                <button
                  onClick={() => navigate(`/print/${caseInfo?._id}`)}
                  className="p-2 px-4 text-[12px] font-bold text-white bg-[#0C73B8] rounded-[20px] max-lg2:text-[10px]"
                >
               {translationState?.lan === "En" && language?.print[0]}
                      {translationState?.lan === "Am" && language?.print[1]}
                      {translationState?.lan === "Or" && language?.print[2]}
                      {translationState?.lan === "Tg" && language?.print[3]}
                      {translationState?.lan === "Sm" && language?.print[4]}
                      {translationState?.lan === "Af" && language?.print[5]}
                </button>
              </div>
              <div className="flex items-center gap-[10px]">
                {caseInfo?.status === "verified" &&
                  caseRatingInfo?.rateCustomer?._id !== userID && (
                    <div
                      onClick={() => setRateModal(true)}
                      className="flex justify-center  items-center text-[14px] font-bold max-lg2:text-[12px]"
                    >
                      <button className="py-2 px-4 bg-[#0C73B8] text-white font-bold rounded-[20px]">
                      {translationState?.lan === "En" && language?.rateService[0]}
                      {translationState?.lan === "Am" && language?.rateService[1]}
                      {translationState?.lan === "Or" && language?.rateService[2]}
                      {translationState?.lan === "Tg" && language?.rateService[3]}
                      {translationState?.lan === "Sm" && language?.rateService[4]}
                      {translationState?.lan === "Af" && language?.rateService[5]}
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
          <div className="w-[100%] my-[10px] grid grid-cols-2 gap-[10px] max-md1:grid-cols-1">
            <div className="w-[100%] col-span-1">
              <label
             
                className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
              >
                  {translationState?.lan === "En" && language?.division[0]}
                    {translationState?.lan === "Am" && language?.division[1]}
                    {translationState?.lan === "Or" && language?.division[2]}
                    {translationState?.lan === "Tg" && language?.division[3]}
                    {translationState?.lan === "Sm" && language?.division[4]}
                    {translationState?.lan === "Af" && language?.division[5]}
              </label>
              <div className="mt-2">
              {translationState?.lan === "En" &&   <input
                  required
                  value={caseInfo?.division?.name_en}
                  disabled
                  className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />}
                    {translationState?.lan === "Am" &&   <input
                  required
                  value={caseInfo?.division?.name_am}
                  disabled
                  className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />}
                    {translationState?.lan === "Or" &&   <input
                  required
                  value={caseInfo?.division?.name_or}
                  disabled
                  className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />}
                    {translationState?.lan === "Tg" &&   <input
                  required
                  value={caseInfo?.division?.name_tg}
                  disabled
                  className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />}
                    {translationState?.lan === "Sm" &&   <input
                  required
                  value={caseInfo?.division?.name_sm}
                  disabled
                  className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />}
                    {translationState?.lan === "Af" &&   <input
                  required
                  value={caseInfo?.division?.name_af}
                  disabled
                  className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />}

              
              </div>
            </div>

            <div className="w-[100%] col-span-1">
              <label
              
                className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
              >
                {translationState?.lan === "En" && language?.caseRequest[0]}
                    {translationState?.lan === "Am" && language?.caseRequest[1]}
                    {translationState?.lan === "Or" && language?.caseRequest[2]}
                    {translationState?.lan === "Tg" && language?.caseRequest[3]}
                    {translationState?.lan === "Sm" && language?.caseRequest[4]}
                    {translationState?.lan === "Af" && language?.caseRequest[5]}
              </label>
              <div className="mt-2">
              {translationState?.lan === "En" &&     <input
                  required
                  value={caseList?.case_name_en}
                  disabled
                  className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />}
                    {translationState?.lan === "Am" &&     <input
                  required
                  value={caseList?.case_name_am}
                  disabled
                  className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />}
                    {translationState?.lan === "Or" &&     <input
                  required
                  value={caseList?.case_name_or}
                  disabled
                  className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />}
                    {translationState?.lan === "Tg" &&     <input
                  required
                  value={caseList?.case_name_tg}
                  disabled
                  className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />}
                    {translationState?.lan === "Sm" &&     <input
                  required
                  value={caseList?.case_name_sm}
                  disabled
                  className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />}
                    {translationState?.lan === "Af" &&     <input
                  required
                  value={caseList?.case_name_af}
                  disabled
                  className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />}
            
              </div>
            </div>

            <div className="w-[100%] col-span-1">
              <label
                htmlFor="street-address"
                className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
              >
                 {translationState?.lan === "En" && language?.caseNumber[0]}
                    {translationState?.lan === "Am" && language?.caseNumber[1]}
                    {translationState?.lan === "Or" && language?.caseNumber[2]}
                    {translationState?.lan === "Tg" && language?.caseNumber[3]}
                    {translationState?.lan === "Sm" && language?.caseNumber[4]}
                    {translationState?.lan === "Af" && language?.caseNumber[5]}
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
                    {translationState?.lan === "Or" &&
                      language?.relatedCaseNumber[2]}
                    {translationState?.lan === "Tg" &&
                      language?.relatedCaseNumber[3]}
                    {translationState?.lan === "Sm" &&
                      language?.relatedCaseNumber[4]}
                    {translationState?.lan === "Af" &&
                      language?.relatedCaseNumber[5]}
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
                    {translationState?.lan === "Or" && language?.late[2]}
                    {translationState?.lan === "Tg" && language?.late[3]}
                    {translationState?.lan === "Sm" && language?.late[4]}
                    {translationState?.lan === "Af" && language?.late[5]}
              </label>
              <div className="mt-2 flex gap-[10px]">
                {translationState?.lan ==="En" &&  <input
                  required
                  value={caseInfo?.late}
                  disabled
                  className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />}
                   {translationState?.lan ==="Am" &&  <input
                  required
                  value={caseInfo?.late ==="yes" ? language?.yes[1]: language?.no[1]}
                  disabled
                  className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />}
                     {translationState?.lan ==="Or" &&  <input
                  required
                  value={caseInfo?.late ==="yes" ? language?.yes[2]: language?.no[2]}
                  disabled
                  className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />}
                     {translationState?.lan ==="Tg" &&  <input
                  required
                  value={caseInfo?.late ==="yes" ? language?.yes[3]: language?.no[3]}
                  disabled
                  className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />}
                     {translationState?.lan ==="Sm" &&  <input
                  required
                  value={caseInfo?.late ==="yes" ? language?.yes[4]: language?.no[4]}
                  disabled
                  className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />}
                     {translationState?.lan ==="Af" &&  <input
                  required
                  value={caseInfo?.late ==="yes" ? language?.yes[5]: language?.no[5]}
                  disabled
                  className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                />}
               
              </div>
            </div>

            {caseInfo?.status === "verified" && caseInfo?.responded_by && (
              <div className="w-[100%] col-span-1">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                >
                  {translationState?.lan === "En" &&
                        language?.respondedBy[0]}
                      {translationState?.lan === "Am" &&
                        language?.respondedBy[1]}
                      {translationState?.lan === "Or" &&
                        language?.respondedBy[2]}
                      {translationState?.lan === "Tg" &&
                        language?.respondedBy[3]}
                      {translationState?.lan === "Sm" &&
                        language?.respondedBy[4]}
                      {translationState?.lan === "Af" &&
                        language?.respondedBy[5]}
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

            {caseInfo?.createdAt && (
              <div className="w-[100%] col-span-1">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                >
            {translationState?.lan === "En" &&
                        language?.submittedDate[0]}
                      {translationState?.lan === "Am" &&
                        language?.submittedDate[1]}
                      {translationState?.lan === "Or" &&
                        language?.submittedDate[2]}
                      {translationState?.lan === "Tg" &&
                        language?.submittedDate[3]}
                      {translationState?.lan === "Sm" &&
                        language?.submittedDate[4]}
                      {translationState?.lan === "Af" &&
                        language?.submittedDate[5]}
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
                   {translationState?.lan === "En" &&
                        language?.processingStartDate[0]}
                      {translationState?.lan === "Am" &&
                        language?.processingStartDate[1]}
                      {translationState?.lan === "Or" &&
                        language?.processingStartDate[2]}
                      {translationState?.lan === "Tg" &&
                        language?.processingStartDate[3]}
                      {translationState?.lan === "Sm" &&
                        language?.processingStartDate[4]}
                      {translationState?.lan === "Af" &&
                        language?.processingStartDate[5]}
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
                   {translationState?.lan === "En" &&
                        language?.respondedDate[0]}
                      {translationState?.lan === "Am" &&
                        language?.respondedDate[1]}
                      {translationState?.lan === "Or" &&
                        language?.respondedDate[2]}
                      {translationState?.lan === "Tg" &&
                        language?.respondedDate[3]}
                      {translationState?.lan === "Sm" &&
                        language?.respondedDate[4]}
                      {translationState?.lan === "Af" &&
                        language?.respondedDate[5]}
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
            {translationState?.lan === "En" &&
                    language?.filledQuestions[0]}
                  {translationState?.lan === "Am" &&
                    language?.filledQuestions[1]}
                  {translationState?.lan === "Or" &&
                    language?.filledQuestions[2]}
                  {translationState?.lan === "Tg" &&
                    language?.filledQuestions[3]}
                  {translationState?.lan === "Sm" &&
                    language?.filledQuestions[4]}
                  {translationState?.lan === "Af" &&
                    language?.filledQuestions[5]}
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
                               {translationState?.lan === "En" && question?.list_of_question?.question?.name_en}
                    {translationState?.lan === "Am" && question?.list_of_question?.question?.name_am}
                    {translationState?.lan === "Or" && question?.list_of_question?.question?.name_or}
                    {translationState?.lan === "Tg" && question?.list_of_question?.question?.name_tg}
                    {translationState?.lan === "Sm" && question?.list_of_question?.question?.name_sm}
                    {translationState?.lan === "Af" && question?.list_of_question?.question?.name_af}
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
                       {translationState?.lan==="Or" &&       <input
                        required
                        value={
                          findQuestion?.enumValues?.length !== 0
                            ? findAnswer?.value_or
                            : question?.list_of_question?.answer
                        }
                        disabled
                        className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                      /> }

{translationState?.lan==="Tg" &&       <input
                        required
                        value={
                          findQuestion?.enumValues?.length !== 0
                            ? findAnswer?.value_tg
                            : question?.list_of_question?.answer
                        }
                        disabled
                        className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                      /> }
                       {translationState?.lan==="Sm" &&       <input
                        required
                        value={
                          findQuestion?.enumValues?.length !== 0
                            ? findAnswer?.value_sm
                            : question?.list_of_question?.answer
                        }
                        disabled
                        className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                      /> }
                       {translationState?.lan==="Af" &&       <input
                        required
                        value={
                          findQuestion?.enumValues?.length !== 0
                            ? findAnswer?.value_af
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
            
                className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
              >
                {translationState?.lan === "En" &&
                    language?.description[0]}
                  {translationState?.lan === "Am" &&
                    language?.description[1]}
                  {translationState?.lan === "Or" &&
                    language?.description[2]}
                  {translationState?.lan === "Tg" &&
                    language?.description[3]}
                  {translationState?.lan === "Sm" &&
                    language?.description[4]}
                  {translationState?.lan === "Af" &&
                    language?.description[5]}
              </label>
              <div className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]">
                {caseInfo?.remark}
              </div>
            </div>
          )}
          {(caseInfo?.attachment || caseInfo?.attachment !== "") && (
            <div className="w-[100%] flex flex-col my-[20px]">
              <span className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
              {translationState?.lan === "En" &&
                    language?.attachement[0]}
                  {translationState?.lan === "Am" &&
                    language?.attachement[1]}
                  {translationState?.lan === "Or" &&
                    language?.attachement[2]}
                  {translationState?.lan === "Tg" &&
                    language?.attachement[3]}
                  {translationState?.lan === "Sm" &&
                    language?.attachement[4]}
                  {translationState?.lan === "Af" &&
                    language?.attachement[5]}
              </span>
              <div className="w-[100%] my-4 overflow-y-scroll">
                {caseInfo?.attachment && (
                  <embed
                    src={`${process.env.REACT_APP_BACKEND_IMAGES}/CaseFiles/${caseInfo?.attachment}`}
                    type="application/pdf"
                    width="100%"
                    height="800px"
                  />
                )}
              </div>
            </div>
          )}

          {caseInfo?.status === "verified" &&
            (caseInfo?.response_justification?.attachment ||
              caseInfo?.response_justification?.attachment !== "") && (
              <div className="w-[100%] flex flex-col my-[20px]">
                <span className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                {translationState?.lan === "En" &&
                    language?.responseAttachment[0]}
                  {translationState?.lan === "Am" &&
                    language?.responseAttachment[1]}
                  {translationState?.lan === "Or" &&
                    language?.responseAttachment[2]}
                  {translationState?.lan === "Tg" &&
                    language?.responseAttachment[3]}
                  {translationState?.lan === "Sm" &&
                    language?.responseAttachment[4]}
                  {translationState?.lan === "Af" &&
                    language?.responseAttachment[5]}
                </span>
                <div className="w-[100%] my-4 overflow-y-scroll">
                  {caseInfo?.response_justification?.attachment && (
                    <embed
                      src={`${process.env.REACT_APP_BACKEND_IMAGES}/${caseInfo?.response_justification?.attachment}`}
                      type="application/pdf"
                      width="100%"
                      height="800px"
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
                {translationState?.lan === "En" &&
                    language?.scheduleInformation[0]}
                  {translationState?.lan === "Am" &&
                    language?.scheduleInformation[1]}
                  {translationState?.lan === "Or" &&
                    language?.scheduleInformation[2]}
                  {translationState?.lan === "Tg" &&
                    language?.scheduleInformation[3]}
                  {translationState?.lan === "Sm" &&
                    language?.scheduleInformation[4]}
                  {translationState?.lan === "Af" &&
                    language?.scheduleInformation[5]}
                </span>
              </div>
              <div className="w-[100%] my-[10px] grid grid-cols-2 gap-[10px] max-md1:grid-cols-1">
                {caseInfo?.schedule_program?.map((schedule) => {
                  return (
                    <>
                      {schedule?.schedule?.extended_by && (
                        <div className="w-[100%] col-span-1">
                          <label
                          
                            className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                          >
                                       {translationState?.lan === "En" &&
                    language?.extendedBy[0]}
                  {translationState?.lan === "Am" &&
                    language?.extendedBy[1]}
                  {translationState?.lan === "Or" &&
                    language?.extendedBy[2]}
                  {translationState?.lan === "Tg" &&
                    language?.extendedBy[3]}
                  {translationState?.lan === "Sm" &&
                    language?.extendedBy[4]}
                  {translationState?.lan === "Af" &&
                    language?.extendedBy[5]}
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
                                        {translationState?.lan === "En" &&
                    language?.extendedDate[0]}
                  {translationState?.lan === "Am" &&
                    language?.extendedDate[1]}
                  {translationState?.lan === "Or" &&
                    language?.extendedDate[2]}
                  {translationState?.lan === "Tg" &&
                    language?.extendedDate[3]}
                  {translationState?.lan === "Sm" &&
                    language?.extendedDate[4]}
                  {translationState?.lan === "Af" &&
                    language?.extendedDate[5]}
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
                                 {translationState?.lan === "En" &&
                    language?.scheduledBy[0]}
                  {translationState?.lan === "Am" &&
                    language?.scheduledBy[1]}
                  {translationState?.lan === "Or" &&
                    language?.scheduledBy[2]}
                  {translationState?.lan === "Tg" &&
                    language?.scheduledBy[3]}
                  {translationState?.lan === "Sm" &&
                    language?.scheduledBy[4]}
                  {translationState?.lan === "Af" &&
                    language?.scheduledBy[5]}
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
                            
                            className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                          >
                                  {translationState?.lan === "En" &&
                    language?.scheduledDate[0]}
                  {translationState?.lan === "Am" &&
                    language?.scheduledDate[1]}
                  {translationState?.lan === "Or" &&
                    language?.scheduledDate[2]}
                  {translationState?.lan === "Tg" &&
                    language?.scheduledDate[3]}
                  {translationState?.lan === "Sm" &&
                    language?.scheduledDate[4]}
                  {translationState?.lan === "Af" &&
                    language?.scheduledDate[5]}
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
                {translationState?.lan === "En" &&
                    language?.reasonOfRejection[0]}
                  {translationState?.lan === "Am" &&
                    language?.reasonOfRejection[1]}
                  {translationState?.lan === "Or" &&
                    language?.reasonOfRejection[2]}
                  {translationState?.lan === "Tg" &&
                    language?.reasonOfRejection[3]}
                  {translationState?.lan === "Sm" &&
                    language?.reasonOfRejection[4]}
                  {translationState?.lan === "Af" &&
                    language?.reasonOfRejection[5]}
                </span>
              </div>
              <div className="w-[100%] my-[10px] grid grid-cols-2 gap-[10px] max-md1:grid-cols-1">
                <div className="w-[100%] col-span-2">
                  <label
                   
                    className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                  >
                              {translationState?.lan === "En" &&
                    language?.rejectedDate[0]}
                  {translationState?.lan === "Am" &&
                    language?.rejectedDate[1]}
                  {translationState?.lan === "Or" &&
                    language?.rejectedDate[2]}
                  {translationState?.lan === "Tg" &&
                    language?.rejectedDate[3]}
                  {translationState?.lan === "Sm" &&
                    language?.rejectedDate[4]}
                  {translationState?.lan === "Af" &&
                    language?.rejectedDate[5]}
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
                        {translationState?.lan === "En" &&
                    language?.rejectionJustification[0]}
                  {translationState?.lan === "Am" &&
                    language?.rejectionJustification[1]}
                  {translationState?.lan === "Or" &&
                    language?.rejectionJustification[2]}
                  {translationState?.lan === "Tg" &&
                    language?.rejectionJustification[3]}
                  {translationState?.lan === "Sm" &&
                    language?.rejectionJustification[4]}
                  {translationState?.lan === "Af" &&
                    language?.rejectionJustification[5]}
                  </label>
                  <div className="mt-2">
                    <textarea
                      required
                      value={caseInfo?.rejection_justification}
                      disabled
                      className="block w-full flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                    ></textarea>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}


      {rateModal && <RateService setRateModal={setRateModal} />}

    </div>
  );
}

export default CaseDetail;
