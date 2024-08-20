import React, { useEffect, useState } from 'react'
import { BiChevronLeft } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'use-debounce';
import { fetchQuestions } from '../../REDUX/slices/questionSlice';
import ServerError from '../ServerError';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { fetchAllCaseRequests } from '../../REDUX/slices/getAllCaseRequestSlice';
import Loading from '../Loading';

function Questions() {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const allCaseListState = useSelector((state)=>state?.allCaseLists);
    const questionState = useSelector((state)=>state?.questions);
    const [questionName,setQuestionName] = useState("");
    const [caseList,setCaseList] = useState("");
    const [debouncedName] = useDebounce(questionName,500);
    const [pageNum, setPageNum] = useState(1);
    const [sortingNum, setSortingNum] = useState(-1);
  

    useEffect(()=>{
      dispatch(fetchQuestions({page:pageNum,sort:sortingNum,caselist:caseList,searchName:debouncedName}))
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[pageNum,sortingNum,caseList,debouncedName])



    useEffect(()=>{
      dispatch(fetchAllCaseRequests());
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

 


    const handlePrevious = () => {
      if (pageNum <= 1) {
        setPageNum(1);
      } else {
        setPageNum(pageNum - 1);
      }
    };
  
    const handleNext = () => {
      if (pageNum >= questionState?.questions?.totalPages) {
        setPageNum(questionState?.questions?.totalPages);
      } else {
        setPageNum(pageNum + 1);
      }
    };

    if(questionState?.error) return <ServerError/>
  return (
    <div className="w-[100%] bg-white">
        <div className="w-[90%] mt-[30px] mx-auto">
        <div className="flex items-center justify-between gap-[10px]  text-[#FBB042]">
        <div className="flex items-center justify-start">
          <BiChevronLeft
            className="text-[40px] cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <span className="text-[20px] font-bold max-lg2:text-[16px]">Questions</span>
        </div>

        <div>
          <button
            onClick={() => navigate("/createquestions")}
            className="px-4 py-2 text-white bg-[#FBB042] rounded text-[15px] border border-[#FBB042] hover:bg-transparent hover:text-[#FBB042] transition duration-500 max-lg2:text-[12px]"
          >
            Create a question
          </button>
        </div>
      </div>
      <div className="w-[100%]  mx-auto p-2 mt-[20px] grid grid-cols-3 gap-[20px]">
        <div className="w-[100%] col-span-1">
          <input
            onChange={(e)=>setQuestionName(e.target.value)}
            className="w-[100%]  p-4 text-[14px] border border-[#FBB042] rounded-[5px] outline-none max-lg2:text-[12px] max-lg2:p-2"
            type="text"
            placeholder="Search by name"
          />
        </div>

        <div className="w-[100%] col-span-1">
        <select
        onChange={(e)=>setCaseList(e.target.value)}
        className="w-[100%]  p-4 text-[14px] border text-gray-500 border-[#FBB042] rounded-[5px] outline-none max-lg2:text-[12px] max-lg2:p-2"
      
      >
        <option value={""}>Search by case request</option>
       {allCaseListState?.caseRequests?.map((caseList,index)=>{
        return <option key={index} value={caseList?._id}>{caseList?.case_name_am}</option>
       })}
      </select>
        </div>
        
      </div>

      {questionState?.loading ? (
        <div></div>
      ) : (
        questionState?.questions?.questions?.length > 0 &&
        questionState?.questions?.totalPages && (
          <div className="w-[100%] flex justify-end items-center my-[20px] gap-5">
            <button
              onClick={handlePrevious}
              className="mx-1 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:w-[20px] max-lg2:h-[20px]"
            >
              <IoIosArrowBack />
            </button>
            <span className="text-gray-600 font-semibold">
              {questionState?.questions?.currentPage} of{" "}
              {questionState?.questions?.totalPages}
            </span>

            <button
              onClick={handleNext}
              className={
                "mx-1 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:w-[20px] max-lg2:h-[20px]"
              }
            >
              <IoIosArrowForward />
            </button>

            <div className="flex items-center gap-2">
              <select
                value={sortingNum}
                onChange={(e) => setSortingNum(e?.target?.value)}
                className="py-2 px-4 border border-gray-300 rounded-[5px] outline-none text-[14px] font-medium max-lg2:text-[12px]"
              >
                <option value={-1}>Latest</option>
                <option value={1}>Oldest</option>
              </select>
            </div>
          </div>
        )
      )}
      
     <div className='w-[100%] my-[20px] grid grid-cols-2 gap-[20px]'>
      {questionState?.loading ? <Loading addtionalStyle={"col-span-2 flex justify-center items-center my-20px]"}/>:questionState?.questions?.questions?.length === 0 ?  <div className="uppercase col-span-2 w-[100%] h-[300px] flex items-center justify-center mt-12">
              <span className="text-3xl text-[#0C73B8] max-lg2:text-xl">No questions found</span>
            </div>:questionState?.questions?.questions?.map((question,index)=>{
              
                
                const caseRequest = allCaseListState?.caseRequests?.find((caserequest)=>caserequest?._id===question?.caselist?._id);
            
        return  <div key={index} onClick={()=>navigate(`/questions/${question?._id}`)} className='w-[100%] col-span-2  flex flex-col  justify-center gap-[10px] border border-dashed border-[#0C73B8] py-6 cursor-pointer rounded-[10px]'>
        <div className='w-[90%] mx-auto'>
        <div className='flex items-center gap-[10px]'>
          <span className='font-bold text-[#0C73B8]'>{question?.name_am}</span>
          
        </div>
        <div className='mt-[20px] flex items-center gap-[20px] text-[14px] max-lg2:text-[12px]'>
          <span className='font-bold'>Case request: <span className='text-gray-500 font-normal'>{caseRequest?.case_name_am}</span></span>

        </div>
        
        <div className='mt-[10px] flex items-center gap-[20px] text-[14px] max-lg2:text-[12px]'>
        
        <span className='font-bold'>Created by: <span className='text-gray-500 font-normal'>{question?.createdBy?.firstname} {question?.createdBy?.middlename} {question?.createdBy?.lastname}</span></span>
                 <span className='font-bold'>Created date: <span className='text-gray-500 font-normal'>{new Date(question?.createdAt)?.toDateString()}</span></span>
        </div>
        </div>

      </div>
      })}
     
     </div>
        </div>
    </div>
  )
}

export default Questions