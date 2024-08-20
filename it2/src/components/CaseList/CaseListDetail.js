import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import apiRequest from "../../utils/request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../ServerError";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import { fetchAllDivision } from "../../REDUX/slices/allDivisionsSlice";
import { fetchAllQuestions } from "../../REDUX/slices/getAlllQuestionsSlice";
import { FaTrashAlt } from "react-icons/fa";

function CaseListDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('tID');
  const translationState = useSelector((state) => state?.translation);
  const divisonState = useSelector((state) => state?.allDivisions);
  const questionState = useSelector((state) => state.allQuestions);
  const [caseList, setCaseList] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    dispatch(fetchAllDivision());
    dispatch(fetchAllQuestions());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      apiRequest
        .get(`/case_list_api/get_case_list/${id}`, {
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
          translationState?.lan === "En"
            ? toast.error(error?.response?.data?.Message_en)
            : toast.error(error?.response?.data?.Message_am);
        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  }, [id, translationState.lan]);

  const findDivision = divisonState?.divisions?.find(
    (division) => division?._id === caseList?.division
  );

  const filterQuestions = questionState?.questions?.filter(
    (question) => question?.caselist?._id === id
  );


  const handleRemoveQuestion = async (quest_id)=>{
    try {
      await apiRequest.put(`/case_list_api/remove_ques_case_list/${id}/${quest_id}`,{},{headers:{
        get_remquecaselist_api: process.env.REACT_APP_GET_REMQUECASELIST_API,
        Authorization:`Bearer ${token}`

      }}).then(()=>{
        dispatch(fetchAllQuestions());
      }).catch((error)=>{
        if (error?.response?.status === 500) {
          setServerError(true);
        }
        translationState?.lan === "En"
          ? toast.error(error?.response?.data?.Message_en)
          : toast.error(error?.response?.data?.Message_am);

      })
      
    } catch (error) {
      setServerError(true)
    }
  }

  if (serverError) return <ServerError />;
  return (
    <div className="w-[100%] bg-white">
      <ToastContainer theme="light" />
      {loading ? (
        <Loading
          addtionalStyle={"flex justify-center items-center my-[20px]"}
        />
      ) : (
        <div className="w-[90%] mt-[30px] mx-auto">
          <div className="flex items-center justify-between gap-[10px]">
            <div className="flex items-center justify-start text-[#FBB042]">
              <BiChevronLeft
                className="text-[40px] cursor-pointer"
                onClick={() => navigate(-1)}
              />
              <span className="text-[20px] font-bold max-lg2:text-[16px]">
                {caseList?.case_name_am}
              </span>
            </div>

            <div>
              <button
                onClick={() => navigate(`/editcaselist/${caseList?._id}`)}
                className="px-4 py-2 text-white bg-[#FBB042] rounded text-[15px] border border-[#FBB042] hover:bg-transparent hover:text-[#FBB042] transition duration-500 max-lg2:text-[12px]"
              >
                Edit case request
              </button>
            </div>
          </div>
          <div className="w-[70%] mt-[50px] min-h-[200px] mx-auto border  border-dashed border-[#FBB042] flex items-center rounded-[10px]">
            <div className="w-[90%] mx-auto flex justify-between items-center gap-[20px]">
              <div className="flex flex-col gap-[20px]">
                <div className="flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                    Name:
                  </span>
                  <span className="text-gray-500 text-[14px] max-lg2:text-[12px]">
                    {caseList?.case_name_am}
                  </span>
                </div>
                <div className="flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                    Division:
                  </span>
                  <span className="text-gray-500 text-[14px] max-lg2:text-[12px]">
                    {findDivision?.name_am}
                  </span>
                </div>
                <div className="flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                    Answered by:
                  </span>
                  <span className="text-gray-500 text-[14px] max-lg2:text-[12px]">
                    {caseList?.answer_by}
                  </span>
                </div>
                <div className="flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                    Time Limit:
                  </span>
                  <span className="text-gray-500 text-[14px] max-lg2:text-[12px]">
                    {caseList?.timelimit} days
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[20px]">
                <div className="flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                    Created by:
                  </span>
                  <span className="text-gray-500 text-[14px] max-lg2:text-[12px]">
                    {caseList?.createdBy?.firstname} {caseList?.createdBy?.middlename}{" "}
                    {caseList?.createdBy?.lastname}
                  </span>
                </div>
                <div className="flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                    Created date:
                  </span>
                  <span className="text-gray-500 text-[14px] max-lg2:text-[12px]">
                    {new Date(caseList?.createdAt)?.toDateString()}{" "}
                  </span>
                </div>
                <div className="flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                    status:
                  </span>
                  {caseList?.status === "active" ? (
                    <div className="bg-green-600 rounded-[20px] text-[12px] py-1 px-4 max-lg2:text-[10px] ">
                      <span className="font-bold text-white  max-lg2:text-[10px]">
                        active
                      </span>
                    </div>
                  ) : (
                    <div className="bg-red-600 rounded-[20px] text-[12px] py-1 px-4 max-lg2:text-[10px] ">
                      <span className="font-bold text-white  max-lg2:text-[10px]">
                        inactive
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[70%] mx-auto my-[50px]">
            <div>
              <span className="font-bold text-[#0C73B8]">Questions</span>
             
            </div>

            <div className="w-[90%] mt-[20px] mx-auto flex flex-col gap-[20px] text-[14px] text-gray-500">
              {questionState?.loading ? <Loading addtionalStyle={"flex justify-center items-center my-[20px]"}/> :filterQuestions?.length === 0 ? (
                <div className="w-[100%] text-[#0C73B8] my-[20px] font-bold flex justify-center items-center">
                  <span>This case request does not have any questions.</span>
                </div>
              ) : (
                filterQuestions?.map((question, index) => {
                  return (
                    <div  key={index} className="flex items-center gap-[10px]">
                      <span onClick={()=>navigate(`/questions/${question?._id}`)} className="hover:text-[#0C73B8] hover:underline cursor-pointer">{index+1}. {question?.name_am}</span>
                     <div onClick={()=>handleRemoveQuestion(question?._id)} className="w-[30px] h-[30px] rounded-[10px] bg-[#0C73B8] flex justify-center items-center">
                     <FaTrashAlt  className="text-white font-bold cursor-pointer"/>
                     </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CaseListDetail;
