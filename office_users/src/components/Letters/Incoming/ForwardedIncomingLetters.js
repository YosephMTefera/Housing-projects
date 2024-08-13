import React,{useState,useEffect} from 'react'
import { CiSearch } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { language } from '../../../utils/part-1lan';
import { useDebounce } from 'use-debounce';
import { fetchforwardIncomingLetter } from '../../../REDUX/slices/forwardIncomingLettersSlice';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { jwtDecode } from "jwt-decode";
import Loading from '../../Loading';
import ServerError from '../../ServerError';
import apiRequest from '../../../utils/request';


function ForwardedIncomingLetters() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('tID');
  const decodedToken = jwtDecode(token);
  const userID = decodedToken?.user?.id;
  const translationState = useSelector((state)=>state.translation);
  const incomingLetterState = useSelector((state)=>state?.forwardIncomingLetters);
  const [forwardPath,setForwardPath] = useState({})
  const [incomingLetterNum,setIncomingLetterNum]  = useState("");
  const [from,setFrom] = useState("");
  const [debouncedFrom] = useDebounce(from,500);
  const [debouncedIncomingLetterNum] = useDebounce(incomingLetterNum,500)
  const [late,setLate] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [sortingNum, setSortingNum] = useState(-1);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    dispatch(fetchforwardIncomingLetter({page:pageNum,sort:sortingNum,incomingLtrNum:debouncedIncomingLetterNum,attentionFrom:debouncedFrom,late}))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pageNum,sortingNum,debouncedIncomingLetterNum,debouncedFrom,late])

  useEffect(() => {
    const fetchForwardPaths = async () => {
      setLoading(true);
      try {
        const forwardPathsData = {};
        for (let incLetter of incomingLetterState?.forwardIncomingLetters?.incomingLetters) {
          const response = await  apiRequest
          .get(`/forward_incoming_ltr_api/get_forward_inc_letter_path/${incLetter?._id}`, {
            headers: {
              Authorization: "bearer " + token,
              get_frwdpath_incltr_api: process.env.REACT_APP_GET_FRWDPATH_INCLTR_API,
            },
          })
          forwardPathsData[incLetter?._id] = response?.data?.forwardDocs;
        }
        setLoading(false);
        setForwardPath(forwardPathsData);
      
      } catch (error) {
        setLoading(false);
        
      }
    };

    fetchForwardPaths();
  }, [incomingLetterState, token]);


  const handlePrevious = () => {
    if (pageNum <= 1) {
      setPageNum(1);
    } else {
      setPageNum(pageNum - 1);
    }
  };

  const handleNext = () => {
    if (pageNum >= incomingLetterState?.forwardIncomingLetters?.totalPages) {
      setPageNum(incomingLetterState?.forwardIncomingLetters?.totalPages);
    } else {
      setPageNum(pageNum + 1);
    }
  };

  if(incomingLetterState?.error) return <ServerError />
  return (
    <div className="w-[100%] min-h-[90vh] mx-auto bg-white overflow-hidden">
    <div className="w-[95%] my-[30px] mx-auto">
      <div className="flex pb-4 justify-between items-center border-b">
        <span className="text-[#0C73B8] font-bold text-[20px] max-lg2:text-[16px]">        
          {translationState?.lan==="En" && `${language?.forwardedLetters[0]} (${language?.incoming[0]})`}
        {translationState?.lan==="Am" && `${language?.forwardedLetters[1]} (${language?.incoming[1]})`}</span>
       
      </div>
      <div className="my-[20px] grid grid-cols-4 gap-[10px]">
        <div className="col-span-1 border border-gray-300 p-3 h-[90%] flex items-center gap-[10px] rounded-[5px]">
          <CiSearch className="text-[24px] text-gray-500" />
          {translationState?.lan==="En" &&  <input
            type="text"
            placeholder={language?.searchByLetterNumber[0]}
            onChange={(e)=>setIncomingLetterNum(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
          />}
          {translationState?.lan==="Am" &&  <input
            type="text"
            placeholder={language?.searchByLetterNumber[1]}
            onChange={(e)=>setIncomingLetterNum(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
          />}
         
        </div>

          <div className="w-[100%] col-span-1 h-[90%] border border-gray-300 p-3 rounded-[5px]">
        <input
            type="text"
            onChange={(e)=>setFrom(e.target.value)}
            placeholder={translationState?.lan==="En" ? language?.searchByFrom[0]: language?.searchByFrom[1]}
           
            className="w-[100%] flex-1 bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
          />
          </div>
          <div className="w-[100%] col-span-1 h-[90%] border border-gray-300 p-3 rounded-[5px]">
          <select onChange={(e)=>setLate(e.target.value)}  className="w-[100%]  bg-transparent outline-none text-[14px] text-gray-500 max-lg2:text-[12px]">
              <option value="">
              {translationState?.lan==="En" && language?.late[0]}
              {translationState?.lan==="Am" && language?.late[1]}
              </option>
              <option value={"yes"}>
              {translationState?.lan==="En" && language?.yes[0]}
              {translationState?.lan==="Am" && language?.yes[1]}
              </option>
              <option value={"no"}>
              {translationState?.lan==="En" && language?.no[0]}
              {translationState?.lan==="Am" && language?.no[1]}
              </option>
    
            </select>
          </div>
         
    
      
      </div>
      <div>
  {incomingLetterState?.loading ? (
      <div></div>
    ) : (
      incomingLetterState?.forwardIncomingLetters?.incomingLetters?.length > 0 &&
      incomingLetterState?.forwardIncomingLetters?.totalPages && (
        <div className="w-[100%] flex justify-end items-center my-[20px] gap-5">
          <button
            onClick={handlePrevious}
            className="mx-1 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:w-[20px] max-lg2:h-[20px]"
          >
            <IoIosArrowBack />
          </button>
          <span className="text-gray-600 font-semibold">
            {incomingLetterState?.forwardIncomingLetters?.currentPage} of{" "}
            {incomingLetterState?.forwardIncomingLetters?.totalPages}
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



{(loading ||incomingLetterState?.loading) ? <Loading addtionalStyle={"flex justify-center items-center"}/>:incomingLetterState?.forwardIncomingLetters?.incomingLetters?.length ===0 ?   <div className="flex justify-center items-center my-[30px]">
            <span className="text-[#0C73B8] font-bold text-[18px]">
            {translationState?.lan==="En" && language?.noforwardedLetter[0]} 
            {translationState?.lan==="Am" && language?.noforwardedLetter[1]}
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
                            {translationState?.lan==="En" && language?.letterNumber[0]}
                            {translationState?.lan==="Am" && language?.letterNumber[1]} 
                    </th>
                   
                    <th
                      scope="col"
                      className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                    >
                 {translationState?.lan==="En" && language?.from[0]}
                 {translationState?.lan==="Am" && language?.from[1]} 
                    </th>

                    <th
                      scope="col"
                      className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                    >
                 {translationState?.lan==="En" && language?.late[0]}
                 {translationState?.lan==="Am" && language?.late[1]} 
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
                      className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                    >
                       {translationState?.lan==="En" && language?.letterSent[0]}
                       {translationState?.lan==="Am" && language?.letterSent[1]} 
                    </th>
                  
                    <th
                      scope="col"
                      className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                    >
                     {translationState?.lan==="En" && language?.createdDate[0]}
                     {translationState?.lan==="Am" && language?.createdDate[1]} 
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
                  {incomingLetterState?.forwardIncomingLetters?.incomingLetters?.map((il,index)=>{
                                            const incLetterForwardPath = forwardPath[il?._id];
                                            const officeForwardedPath = incLetterForwardPath?.some((ou)=>ou?.from_office_user?._id ===userID);

                    return <tr
                      key={index}
                    className="text-center border border-gray-300 text-[12px] cursor-pointer max-lg2:text-[10px]"
                    onClick={() => navigate(`/letters/incoming/forwarded/${il?._id}`)}
                  >
                    <td className="px-6 py-2 whitespace-nowrap border">
                      <div className="flex justify-center items-center">
                        <div>
                          <div className="px-6 py-2 whitespace-nowrap  text-center text-gray-500">
                            {index + 1}
                          </div>
                        </div>
                      </div>
                    </td>
                     <td className="px-6 py-2 whitespace-nowrap border">
                      <div className="flex justify-center items-center">
                    
                          <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                           {il?.incoming_letter_number}
                          </div>
                        </div>
                  
                    </td>
                  
                    <td className="px-6 py-2 whitespace-nowrap border">
                      <div className="flex justify-center items-center">
                    
                          <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                    {il?.attention_from}
                          </div>
                        </div>
                  
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap border">
                      <div className="flex justify-center items-center">
                    
                          <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                        
                    {il?.late ==="no" &&  <span
                            className="px-2 py-1 inline-flex  leading-5
                font-semibold  text-gray-500 rounded-[5px]"
                          >
                          {translationState?.lan==="En" && language?.no[0]}
                          {translationState?.lan==="Am" && language?.no[1]} 
                          </span>}
                                
                    {il?.late ==="yes" &&  <span
                            className="px-2 py-1 inline-flex  leading-5
                font-semibold  bg-red-600 text-white rounded-[5px]"
                          >
                          {translationState?.lan==="En" && language?.yes[0]}
                          {translationState?.lan==="Am" && language?.yes[1]} 
                          </span>}
                          </div>
                        </div>
                  
                    </td>
                   
                    <td className="px-6 py-2 whitespace-nowrap border">
                      <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                       {il?.createdBy?.firstname}    {il?.createdBy?.middlename}    {il?.createdBy?.lastname}
                      </div>
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap border">
                      <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                      {il?.sent_date}
                      </div>
                    </td>

                    <td className="px-6 py-2 whitespace-nowrap  text-gray-500 border">
          
                    {il?.received_date}
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

export default ForwardedIncomingLetters