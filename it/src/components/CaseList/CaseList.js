import React, { useEffect, useState } from 'react'
import { BiChevronLeft } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { fetchCaseRequests } from '../../REDUX/slices/caseRequestSlice';
import { useDebounce } from 'use-debounce';
import { fetchAllDivision } from '../../REDUX/slices/allDivisionsSlice';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Loading from '../Loading';
import ServerError from '../ServerError';


function CaseList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const caseListState = useSelector((state)=>state?.caseRequests);
    const divisionState = useSelector((state)=>state?.allDivisions);
    const [caseListName,setCaseListName] = useState("");
    const[division,setDivision]  = useState("");
    const [answerBy,setAnswerBy] = useState("");
    const [status,setStatus] = useState("")
    const [debouncedName] = useDebounce(caseListName,500);
    const [pageNum, setPageNum] = useState(1);
    const [sortingNum, setSortingNum] = useState(-1);
  

    useEffect(()=>{
      dispatch(fetchCaseRequests({page:pageNum,sort:sortingNum,status,answerBy,division,searchName:debouncedName}))
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[pageNum,sortingNum,status,answerBy,division,debouncedName])



    useEffect(()=>{
      dispatch(fetchAllDivision())
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    const filterActiveDivision = divisionState?.divisions?.filter((div)=>div?.status ==="active");
    const filerNotSpecial = filterActiveDivision?.filter((div)=>div?.special ==="no");


    const handlePrevious = () => {
      if (pageNum <= 1) {
        setPageNum(1);
      } else {
        setPageNum(pageNum - 1);
      }
    };
  
    const handleNext = () => {
      if (pageNum >= caseListState?.caseRequests?.totalPages) {
        setPageNum(caseListState?.caseRequests?.totalPages);
      } else {
        setPageNum(pageNum + 1);
      }
    };

    if(caseListState?.error) return <ServerError/>

   
  return (
    <div className="w-[100%] bg-white">
        <div className="w-[90%] mt-[30px] mx-auto">
        <div className="flex items-center justify-between gap-[10px]  text-[#FBB042]">
        <div className="flex items-center justify-start">
          <BiChevronLeft
            className="text-[40px] cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <span className="text-[20px] font-bold max-lg2:text-[16px]">Case Requests</span>
        </div>

        <div>
          <button
            onClick={() => navigate("/createcaselist")}
            className="px-4 py-2 text-white bg-[#FBB042] rounded text-[15px] border border-[#FBB042] hover:bg-transparent hover:text-[#FBB042] transition duration-500 max-lg2:text-[12px]"
          >
            Create  case request
          </button>
        </div>
      </div>
      <div className="w-[100%]  mx-auto p-2 mt-[20px] grid grid-cols-4 gap-[20px]">
        <div className="w-[100%] col-span-1">
          <input
            onChange={(e)=>setCaseListName(e.target.value)}
            className="w-[100%]  p-4 text-[14px] border border-[#FBB042] rounded-[5px] outline-none max-lg2:text-[12px] max-lg2:p-2"
            type="text"
            placeholder="Search by name"
          />
        </div>

        <div className="w-[100%] col-span-1">
        <select
        onChange={(e)=>setDivision(e.target.value)}
        className="w-[100%]  p-4 text-[14px] border text-gray-500 border-[#FBB042] rounded-[5px] outline-none max-lg2:text-[12px] max-lg2:p-2"
      
      >
        <option value={""}>Search by division</option>
       {filerNotSpecial?.map((division,index)=>{

        return <option key={index} value={division?._id}>{division?.name_am}</option>
       })}
      
      </select>
        </div>
        <div className="w-[100%] col-span-1">
          <select
            onChange={(e)=>setAnswerBy(e.target.value)}
            className="w-[100%]  p-4 text-[14px] border text-gray-500 border-[#FBB042] rounded-[5px] outline-none max-lg2:text-[12px] max-lg2:p-2"
          
          >
            <option value={""}>Answer by </option>
            <option value={"MainExecutive"}>Main Director</option>
            <option value={"DivisionManagers"}>Division Managers</option>
            <option value={"Directors"}>Directors</option>
            <option value={"TeamLeaders"}>TeamLeaders</option>
            <option value={"Professionals"}>Professionals</option>

          </select>
        </div>
        <div className="w-[100%] col-span-1">
          <select
            onChange={(e)=>setStatus(e.target.value)}
            className="w-[100%]  p-4 text-[14px] border text-gray-500 border-[#FBB042] rounded-[5px] outline-none max-lg2:text-[12px] max-lg2:p-2"
          
          >
            <option value={""}>Search by Status</option>
            <option value={"active"}>Active</option>
            <option value={"inactive"}>Inactive</option>
          </select>
        </div>
      </div> 
      {caseListState?.loading ? (
        <div></div>
      ) : (
        caseListState?.caseRequests?.caselists?.length > 0 &&
        caseListState?.caseRequests?.totalPages && (
          <div className="w-[100%] flex justify-end items-center my-[20px] gap-5">
            <button
              onClick={handlePrevious}
              className="mx-1 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:w-[20px] max-lg2:h-[20px]"
            >
              <IoIosArrowBack />
            </button>
            <span className="text-gray-600 font-semibold">
              {caseListState?.caseRequests?.currentPage} of{" "}
              {caseListState?.caseRequests?.totalPages}
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

      {caseListState?.loading ? <Loading addtionalStyle={"col-span-2 flex justify-center items-center my-[20px]"}/> : caseListState?.caseRequests?.caselists?.length !==0 ? caseListState?.caseRequests?.caselists?.map((caselist,index)=>{

        const divisionName = divisionState?.divisions?.find((division1)=>division1?._id === caselist?.division)?.name_am;


        return <div key={index} onClick={()=>navigate(`/caselist/${caselist?._id}`)} className='w-[100%] col-span-1  flex flex-col  justify-center gap-[10px] border border-dashed border-[#0C73B8] py-6 cursor-pointer rounded-[10px]'>
        <div className='w-[90%] mx-auto'>
        <div className='flex justify-between items-center'>
         <div className='flex items-center gap-[10px]'>
         <span className='font-bold text-[#0C73B8]'>{caselist?.case_name_am}</span>
          {caselist?.status ==="active" ?    <div className='bg-green-600 rounded-[20px] text-[12px] py-1 px-4 max-lg2:text-[10px] '>
            <span className='font-bold text-white  max-lg2:text-[10px]'>active</span>
          </div>:    <div className='bg-red-600 rounded-[20px] text-[12px] py-1 px-4 max-lg2:text-[10px] '>
            <span className='font-bold text-white  max-lg2:text-[10px]'>inactive</span>
          </div>}
         </div>
        </div>
        <div className='mt-[20px] flex flex-col  gap-[10px] text-[14px] max-lg2:text-[12px]'>
          <span className='font-bold'>Division: <span className='text-gray-500 font-normal'>{divisionName}</span></span>
          <span className='font-bold'>Time Limit: <span className='text-gray-500 font-normal'>{caselist?.timelimit} days</span></span>
        </div>
        <div className='mt-[10px] flex items-center gap-[20px] text-[14px] max-lg2:text-[12px]'>
        
        <span className='font-bold'>Answer by: <span className='text-gray-500 font-normal'> {caselist?.answer_by}</span></span>
               <span className='font-bold'>No. of questions: <span className='text-gray-500 font-normal'> {caselist?.questions?.length}</span> </span>
      </div>
        
        <div className='mt-[10px] flex items-center gap-[20px] text-[14px] max-lg2:text-[12px]'>
        
          <span className='font-bold'>Created by: <span className='text-gray-500 font-normal'>{caselist?.createdBy?.firstname} {caselist?.createdBy?.middlename} {caselist?.createdBy?.lastname}</span></span>
                 <span className='text-gray-500'>Created date: {new Date(caselist?.createdAt)?.toDateString()} </span>
        </div>
        </div>

      </div> 
      }) :  <div className="uppercase w-[100%] col-span-2 h-[300px] flex items-center justify-center mt-12">
              <span className="text-3xl text-[#0C73B8] max-lg2:text-xl">No case request found</span>
            </div>}
     </div>

        </div>
    </div>
  )
}

export default CaseList