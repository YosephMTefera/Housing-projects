import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import apiRequest from "../../utils/request";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { fetchAllCaseRequests } from "../../REDUX/slices/getAllCaseRequestSlice";
import Loading from "../Loading";
import ServerError from "../ServerError";

function QuestionDetail() {
  const navigate = useNavigate();
  const {id} = useParams();
  const dispatch = useDispatch();
  const translationState = useSelector((state)=>state.translation);
  const caseListState = useSelector((state)=>state.allCaseLists);
  const [question,setQuestion] = useState({});
  const [loading,setLoading] = useState(false);
  const [serverError,setServerError] = useState(false);


  useEffect(()=>{
    apiRequest.get(`/questions_api/get_questions/${id}`,{headers:{
      get_questlist_api:process.env.REACT_APP_GET_QUESTLIST_API,

    }}).then((res)=>{
      setLoading(false);
      setQuestion(res.data);
    }).catch((error)=>{
      setLoading(false);
      if (error?.response?.status === 500) {
        setServerError(true);
      }
    })
  },[id,translationState.lan])

 

  useEffect(() => {
    dispatch(fetchAllCaseRequests());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const findCaseList = caseListState?.caseRequests?.find((caseList)=>caseList?._id===question?.caselist?._id);

 
  


  if(serverError) return <ServerError />
  return (
    <div className="w-[100%] bg-white">
     {loading ? <Loading addtionalStyle={"flex justify-center items-center my-[20px]"}/> : <div className="w-[90%] mt-[30px] mx-auto">
        <div className="flex items-center justify-between gap-[10px]">
          <div className="flex items-center justify-start text-[#FBB042]">
            <BiChevronLeft
              className="text-[40px] cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <span className="text-[20px] font-bold max-lg2:text-[16px]">
              {question?.name_en}
            </span>
          </div>

          <div>
            <button
              onClick={() => navigate(`/editquestions/${question?._id}`)}
              className="px-4 py-2 text-white bg-[#FBB042] rounded text-[15px] border border-[#FBB042] hover:bg-transparent hover:text-[#FBB042] transition duration-500 max-lg2:text-[12px]"
            >
              Edit question
            </button>
          </div>
        </div>

        <div className="w-[70%] mt-[50px] min-h-[200px] mx-auto border  border-dashed border-[#FBB042] flex flex-col items-center rounded-[10px]">
        <div className="w-[90%] mx-auto my-[20px] flex items-center gap-[10px]">
                        <span className="font-bold text-[#0C73B8]">Case List:</span>
                        <span onClick={()=>navigate(`/caselist/${findCaseList?._id}`)} className="text-gray-500 text-[14px] cursor-pointer hover:text-[#0C73B8] hover:underline">{findCaseList?.case_name_am}</span>
                    </div>
            <div className="w-[90%] my-[20px] mx-auto flex justify-between items-center gap-[20px]">
                <div className="flex flex-col gap-[20px]">
                    
                    <div className="flex items-center gap-[10px]">
                        <span className="font-bold text-[#0C73B8]">Type of data:</span>

                        {question?.dataType ==="string" ? <span className="text-gray-500 text-[14px]">Text</span>:    <span className="text-gray-500 text-[14px]">Number</span>}
                    
                    </div>
                    <div className="flex items-center gap-[10px]">
                        <span className="font-bold text-[#0C73B8]">Has selectable values:</span>
                        {question?.hasEnum ==="yes" ?  <span className="text-gray-500 text-[14px]">Yes</span>:  <span className="text-gray-500 text-[14px]">No</span> }
                      
                    </div>
                    <div className="flex items-center gap-[10px]">
                        <span className="font-bold text-[#0C73B8]">Required:</span>
                        {question?.isRequired ==="yes" ?  <span className="text-gray-500 text-[14px]">Yes</span>:  <span className="text-gray-500 text-[14px]">No</span> }
                      
                    </div>
                </div>
                <div className="flex flex-col gap-[20px]">
                <div className="flex items-center gap-[10px]">
                        <span className="font-bold text-[#0C73B8]">Created by:</span>
                        <span className="text-gray-500 text-[14px]">{question?.createdBy?.firstname} {question?.createdBy?.middlename} {question?.createdBy?.lastname}</span>
                    </div>
                    <div className="flex items-center gap-[10px]">
                        <span className="font-bold text-[#0C73B8]">Created date:</span>
                        <span className="text-gray-500 text-[14px]">   {new Date(question?.createdAt)?.toDateString()}{" "}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-[90%] mx-auto my-[50px]">
            <div>
                <span className="font-bold text-[#0C73B8]">Question names</span>
            </div>
            <div className="w-[70%] mt-[20px] mx-auto flex flex-col gap-[20px] text-[14px] text-gray-500">
            {/* <span className="text-[16px] font-bold text-black">Choice {index + 1}</span> */}
                    <span>{question?.name_en} (english)</span>
                    <span>{question?.name_am} (amharic)</span>
                    <span>{question?.name_or} (afan oromo)</span>
                    <span>{question?.name_tg} (tigrigna)</span>
                    <span>{question?.name_af} (afar)</span>
                    <span>{question?.name_sm} (somali)</span>
          

            </div>

        </div>
        <div className="w-[90%] mx-auto my-[50px]">
            <div>
                <span className="font-bold text-[#0C73B8]">Expected values (choices)</span>
            </div>
            <div className="w-[70%] mt-[20px] mx-auto flex  gap-[10px] text-[14px] text-gray-500">
                
                {question?.enumValues?.map((questionValues,index)=>{
                  return <div className="w-[90%]  mx-auto flex flex-col gap-[10px]">
                    <span className="text-[16px] font-bold text-black">Choice {index + 1}</span>
                    <span>{questionValues?.expectedValues?.value_en} (english)</span>
                    <span>{questionValues?.expectedValues?.value_am} (amharic)</span>
                    <span>{questionValues?.expectedValues?.value_or} (afan oromo)</span>
                    <span>{questionValues?.expectedValues?.value_tg} (tigrigna)</span>
                    <span>{questionValues?.expectedValues?.value_af} (afar)</span>
                    <span>{questionValues?.expectedValues?.value_sm} (somali)</span>
                  </div>
                })}
             

            </div>

        </div>
      </div>}
    </div>
  );
}

export default QuestionDetail;
