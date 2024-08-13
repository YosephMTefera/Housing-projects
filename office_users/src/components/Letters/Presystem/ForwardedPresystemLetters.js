import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { language } from '../../../utils/part-1lan';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useDebounce } from 'use-debounce';
import { jwtDecode } from "jwt-decode";
import Loading from '../../Loading';
import ServerError from '../../ServerError';
import { fetchforwardPresystemLetter } from '../../../REDUX/slices/forwardedPresystemLettersSlice';
import apiRequest from '../../../utils/request';

function ForwardedPresystemLetters() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('tID');
  const decodedToken = jwtDecode(token);
  const userID = decodedToken?.user?.id;
  const translationState = useSelector((state)=>state.translation);
  const presystemLetterState = useSelector((state)=>state?.forwardPresystemLetters);
  const [forwardPath,setForwardPath] = useState({})
  const [type,setType] = useState("");
  const [letterNumber,setLetterNumber]  = useState("");
  const [debouncedLetterNumber] = useDebounce(letterNumber,500)
  const [status,setStatus] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [sortingNum, setSortingNum] = useState(-1);
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    dispatch(fetchforwardPresystemLetter({page:pageNum,sort:sortingNum,type,letter_number:debouncedLetterNumber,status}))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pageNum,sortingNum,type,debouncedLetterNumber,status])

  useEffect(() => {
    const fetchForwardPaths = async () => {
      setLoading(true);
      try {
        const forwardPathsData = {};
        for (let preLetter of presystemLetterState?.forwardPresystemLetters?.letters) {
          const response = await  apiRequest
          .get(`/forward_letter_api/get_forward_letter_path/${preLetter?._id}`, {
            headers: {
              Authorization: "Token " + token,
              get_letterfrwdpath_api: process.env.REACT_APP_GET_LETTERFRWDPATH_API,
            },
          })
          forwardPathsData[preLetter?._id] = response?.data?.forwardDocs;
        }
        setLoading(false);
        setForwardPath(forwardPathsData);
      
      } catch (error) {
        setLoading(false);
        
      }
    };

    fetchForwardPaths();
  }, [presystemLetterState, token]);

  const handlePrevious = () => {
    if (pageNum <= 1) {
      setPageNum(1);
    } else {
      setPageNum(pageNum - 1);
    }
  };

  const handleNext = () => {
    if (pageNum >= presystemLetterState?.forwardPresystemLetters?.totalPages) {
      setPageNum(presystemLetterState?.forwardPresystemLetters?.totalPages);
    } else {
      setPageNum(pageNum + 1);
    }
  };






if(presystemLetterState?.error) return <ServerError />
  return (
    <div className="w-[100%] min-h-[90vh] mx-auto bg-white overflow-hidden">
    <div className="w-[95%] my-[30px] mx-auto">
      <div className="flex pb-4 justify-between items-center border-b">
      <span className="text-[#0C73B8] font-bold text-[20px] max-lg2:text-[16px]">        
          {translationState?.lan==="En" && `${language?.forwardedLetters[0]} (${language?.presystem[0]})`}
        {translationState?.lan==="Am" && `${language?.forwardedLetters[1]} (${language?.presystem[1]})`}</span>
       
      </div>
      <div className="my-[20px] grid grid-cols-4 gap-[10px]">
        <div className="col-span-1 border border-gray-300 p-3 h-[90%] flex items-center gap-[10px] rounded-[5px]">
          <CiSearch className="text-[24px] text-gray-500" />
          {translationState?.lan==="En" &&  <input
            type="text"
            placeholder={language?.searchByLetterNumbers[0]}
            onChange={(e)=>setLetterNumber(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
          />}
          {translationState?.lan==="Am" &&  <input
            type="text"
            placeholder={language?.searchByLetterNumbers[1]}
            onChange={(e)=>setLetterNumber(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
          />}
         
        </div>
        <div className="col-span-1 h-[90%] border border-gray-300 p-3 rounded-[5px]">
            <select onChange={(e)=>setType(e.target.value)}  className="w-[100%]  bg-transparent outline-none text-[14px] text-gray-500 max-lg2:text-[12px]">
              <option value="">
              {translationState?.lan==="En" && language?.letterType[0]}
              {translationState?.lan==="Am" && language?.letterType[1]}
              </option>
              <option value={"in"}>
              {translationState?.lan==="En" && language?.incoming[0]}
              {translationState?.lan==="Am" && language?.incoming[1]}
              </option>
              <option value={"out"}>
              {translationState?.lan==="En" && language?.outgoing[0]}
              {translationState?.lan==="Am" && language?.outgoing[1]}
              </option>
              <option value={"internal"}>
              {translationState?.lan==="En" && language?.internal[0]}
              {translationState?.lan==="Am" && language?.internal[1]}
              </option>
    
            </select>
          </div>
   
        
         
        <div className="col-span-1 h-[90%] border border-gray-300 p-3 rounded-[5px]">
            <select onChange={(e)=>setStatus(e.target.value)}  className="w-[100%]  bg-transparent outline-none text-[14px] text-gray-500 max-lg2:text-[12px]">
              <option value="">
              {translationState?.lan==="En" && language?.status[0]}
              {translationState?.lan==="Am" && language?.status[1]}
              </option>
              <option value={"created"}>
              {translationState?.lan==="En" && language?.created[0]}
              {translationState?.lan==="Am" && language?.created[1]}
              </option>
              <option value={"forwarded"}>
              {translationState?.lan==="En" && language?.forwarded[0]}
              {translationState?.lan==="Am" && language?.forwarded[1]}
              </option>
    
            </select>
          </div>
      
      </div>
      <div>
  {presystemLetterState?.loading ? (
      <div></div>
    ) : (
      presystemLetterState?.forwardPresystemLetters?.letters?.length > 0 &&
      presystemLetterState?.forwardPresystemLetters?.totalPages && (
        <div className="w-[100%] flex justify-end items-center my-[20px] gap-5">
          <button
            onClick={handlePrevious}
            className="mx-1 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:w-[20px] max-lg2:h-[20px]"
          >
            <IoIosArrowBack />
          </button>
          <span className="text-gray-600 font-semibold">
            {presystemLetterState?.forwardPresystemLetters?.currentPage} of{" "}
            {presystemLetterState?.forwardPresystemLetters?.totalPages}
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
              <option value={-1}>
              {translationState?.lan==="En" && language?.latest[0]}
              {translationState?.lan==="Am" && language?.latest[1]} 
              </option>
              <option value={1}>
              {translationState?.lan==="En" && language?.oldest[0]}
              {translationState?.lan==="Am" && language?.oldest[1]} 
              </option>
            </select>
          </div>
        </div>
      )
    )}
        </div>
      {/* table */}



{(loading || presystemLetterState?.loading) ? <Loading addtionalStyle={"flex justify-center items-center"}/>:presystemLetterState?.forwardPresystemLetters?.letters?.length ===0 ?   <div className="flex justify-center items-center my-[30px]">
            <span className="text-[#0C73B8] font-bold text-[18px]">
            {translationState?.lan==="En" && language?.noLetter[0]} 
            {translationState?.lan==="Am" && language?.noLetter[1]}
            </span>
          </div>: <div className="max-h-[700px] flex flex-col hide-scroll-bar">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8  hide-scroll-bar">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#0C73B8] whitespace-nowrap">
                  <tr className="text-[12px] max-lg2:text-[10px]">
                    <th
                      scope="col"
                      className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                    >
                      #
                    </th>
                    
                    <th
                      scope="col"
                      className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                    >
                       {translationState?.lan==="En" && language?.archivalNumber[0]}
                       {translationState?.lan==="Am" && language?.archivalNumber[1]} 
                    </th>
                  
                   
                    <th
                      scope="col"
                      className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                    >
                 {translationState?.lan==="En" && language?.letterType[0]}
                 {translationState?.lan==="Am" && language?.letterType[1]} 
                    </th>

                    <th
                      scope="col"
                      className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                    >
                 {translationState?.lan==="En" && language?.noOfAttachment[0]}
                 {translationState?.lan==="Am" && language?.noOfAttachment[1]} 
                    </th>
                  
                    <th
                      scope="col"
                      className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                    >
                     {translationState?.lan==="En" && language?.createdBy[0]}
                     {translationState?.lan==="Am" && language?.createdBy[1]} 
                    </th>
                    <th
                          scope="col"
                          className="px-6 py-4 text-center  font-bold text-white   tracking-wider"
                        >
                           {translationState?.lan ==="En" && language?.forwardedByYou[0]}
                           {translationState?.lan ==="Am" && language?.forwardedByYou[1]}
                        </th>

                 
                
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 border [&>*:nth-child(even)]:bg-[#F9F9F9]">
                  {presystemLetterState?.forwardPresystemLetters?.letters?.map((pl,index)=>{
                       const preLetterForwardPath = forwardPath[pl?._id];
                       const officeForwardedPath = preLetterForwardPath?.some((ou)=>ou?.from_office_user?._id ===userID);

                    return <tr
                      key={index}
                    className="text-center border border-gray-300 text-[12px] cursor-pointer max-lg2:text-[10px]"
                    onClick={() => navigate(`/letters/presystem/forwarded/${pl?._id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap border">
                      <div className="flex justify-center items-center">
                        <div>
                          <div className="px-6 py-2 whitespace-nowrap  text-center text-gray-500">
                            {index + 1}
                          </div>
                        </div>
                      </div>
                    </td>
                     <td className="px-6 py-4 whitespace-nowrap border">
                      <div className="flex justify-center items-center">
                    
                          <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                           {pl?.letter_number}
                          </div>
                        </div>
                  
                    </td>
                  

                  

                    
                    <td className="px-6 py-4 whitespace-nowrap border">
                      <div className="flex justify-center items-center">
                    
                          <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                           {pl?.letter_type}
                          </div>
                        </div>
                  
                    </td>

                    
                    <td className="px-6 py-4 whitespace-nowrap border">
                      <div className="flex justify-center items-center">
                    
                          <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                           {pl?.no_attachment}
                          </div>
                        </div>
                  
                    </td>
                  
                  
                  
                  
                    
                  
                    <td className="px-6 py-4 whitespace-nowrap border">
                      <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                       {pl?.createdBy?.firstname}    {pl?.createdBy?.middlename}    {pl?.createdBy?.lastname}
                      </div>
                    </td>
                  
                    <td className="px-6 py-2 whitespace-nowrap  text-gray-500">
                              {/* {loading ? <Loading addtionalStyle={"flex justify-center  items-center"}/>:officeForwardedPath ? <span>Forwarded</span>:<span>Not Forwarded</span>} */}
                              {loading ? <Loading addtionalStyle={"flex justify-center items-center"}/>:officeForwardedPath ? (
                                <span
                                  className="px-2 py-1 inline-flex  leading-5
                      font-semibold  bg-[#0C73B8] text-white rounded-[5px]"
                                >
                                  {translationState?.lan ==="En" && language?.forwardedBy[0]}
                                  {translationState?.lan ==="Am" && language?.forwardedBy[1]}
                                </span>
                              ):  <span
                              className="px-2 py-1 inline-flex  leading-5
                  font-semibold  bg-red-600 text-white rounded-[5px]"
                            >
                             {translationState?.lan ==="En" && language?.notforwardedYou[0]}
                             {translationState?.lan ==="Am" && language?.notforwardedYou[1]}
                            </span>}
                
                            
                            </td>
                  

                    
                  </tr>
                
                  })}
                 
                   
                      
         
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>}



    </div>
  </div>
  )
}

export default ForwardedPresystemLetters