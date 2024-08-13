import React,{useState,useEffect} from 'react'
import { CiSearch } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { language } from '../../../utils/part-1lan';
import { useDebounce } from 'use-debounce';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Loading from '../../Loading';
import { fetchOutgoingLetter } from '../../../REDUX/slices/outgoingLetterSlice';
import { jwtDecode } from "jwt-decode";
import ServerError from '../../ServerError';



function CreatedoutgoingLetters() {
  const token =sessionStorage.getItem('tID');
  const decodedToken = jwtDecode(token);
  const userID = decodedToken?.user?.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translationState = useSelector((state)=>state.translation);
  const outgoingLetterState = useSelector((state)=>state?.outgoingLetters);
  const [outgoingLetterNum,setOutgoingLetterNum]  = useState("");
  const [debouncedOutgoingLetterNum] = useDebounce(outgoingLetterNum,500);
  const [status,setStatus] = useState("")
  const [late,setLate] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [sortingNum, setSortingNum] = useState(-1);

  useEffect(()=>{
    dispatch(fetchOutgoingLetter({page:pageNum,sort:sortingNum,outgoingLtrNum:debouncedOutgoingLetterNum,late,createdBy:userID,status}))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pageNum,sortingNum,debouncedOutgoingLetterNum,late])

  const handlePrevious = () => {
    if (pageNum <= 1) {
      setPageNum(1);
    } else {
      setPageNum(pageNum - 1);
    }
  };

  const handleNext = () => {
    if (pageNum >= outgoingLetterState?.outgoingLetters?.totalPages) {
      setPageNum(outgoingLetterState?.outgoingLetters?.totalPages);
    } else {
      setPageNum(pageNum + 1);
    }
  };

  if(outgoingLetterState?.error) return <ServerError />
  return (
    <div className="w-[100%] min-h-[90vh] mx-auto bg-white overflow-hidden">
    <div className="w-[95%] my-[30px] mx-auto">
      <div className="flex pb-4 justify-between items-center border-b">
        <span className="text-[#0C73B8] font-bold text-[20px] max-lg2:text-[16px]">        
          {translationState?.lan==="En" && `${language?.createdLetters[0]} (${language?.outgoing[0]})`}
        {translationState?.lan==="Am" && `${language?.createdLetters[1]} (${language?.outgoing[1]})`}</span>
       
      </div>
      <div className="my-[20px] grid grid-cols-4 gap-[10px]">
        <div className="col-span-1 border border-gray-300 p-3 h-[90%] flex items-center gap-[10px] rounded-[5px]">
          <CiSearch className="text-[24px] text-gray-500" />
          {translationState?.lan==="En" &&  <input
            type="text"
            placeholder={language?.searchByLetterNumber[0]}
            onChange={(e)=>setOutgoingLetterNum(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
          />}
          {translationState?.lan==="Am" &&  <input
            type="text"
            placeholder={language?.searchByLetterNumber[1]}
            onChange={(e)=>setOutgoingLetterNum(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
          />}
         
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
          <div className="w-[100%] col-span-1 h-[90%] border border-gray-300 p-3 rounded-[5px]">
          <select onChange={(e)=>setStatus(e.target.value)}  className="w-[100%]  bg-transparent outline-none text-[14px] text-gray-500 max-lg2:text-[12px]">
              <option value="">
              {translationState?.lan==="En" && language?.pending[0]}
              {translationState?.lan==="Am" && language?.pending[1]}
              </option>
              <option value={"forward"}>
              {translationState?.lan==="En" && language?.approved[0]}
              {translationState?.lan==="Am" && language?.approved[1]}
              </option>
              <option value={"reply"}>
              {translationState?.lan==="En" && language?.verfied[0]}
              {translationState?.lan==="Am" && language?.verfied[1]}
              </option>
    
            </select>
          </div>
         
    
      
      </div>
      <div>
  {outgoingLetterState?.loading ? (
      <div></div>
    ) : (
      outgoingLetterState?.outgoingLetters?.outgoingLetters?.length > 0 &&
      outgoingLetterState?.outgoingLetters?.totalPages && (
        <div className="w-[100%] flex justify-end items-center my-[20px] gap-5">
          <button
            onClick={handlePrevious}
            className="mx-1 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:w-[20px] max-lg2:h-[20px]"
          >
            <IoIosArrowBack />
          </button>
          <span className="text-gray-600 font-semibold">
            {outgoingLetterState?.outgoingLetters?.currentPage} of{" "}
            {outgoingLetterState?.outgoingLetters?.totalPages}
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



{outgoingLetterState?.loading ? <Loading addtionalStyle={"flex justify-center items-center"}/>:outgoingLetterState?.outgoingLetters?.outgoingLetters?.length ===0 ?   <div className="flex justify-center items-center my-[30px]">
            <span className="text-[#0C73B8] font-bold text-[18px]">
            {translationState?.lan==="En" && language?.nocreatedLetters[0]} 
            {translationState?.lan==="Am" && language?.nocreatedLetters[1]}
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
                 {translationState?.lan==="En" && language?.late[0]}
                 {translationState?.lan==="Am" && language?.late[1]} 
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
                      className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                    >
                 {translationState?.lan==="En" && language?.approvedDate[0]}
                 {translationState?.lan==="Am" && language?.approvedDate[1]} 
                    </th>

                    <th
                      scope="col"
                      className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                    >
                 {translationState?.lan==="En" && language?.verifiedDate[0]}
                 {translationState?.lan==="Am" && language?.verifiedDate[1]} 
                    </th>

   <th
                      scope="col"
                      className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                    >
                 {translationState?.lan==="En" && language?.status[0]}
                 {translationState?.lan==="Am" && language?.status[1]} 
                    </th>
                    
                  
                  
                
                   
                 
                 
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 border [&>*:nth-child(even)]:bg-[#F9F9F9]">
                  {outgoingLetterState?.outgoingLetters?.outgoingLetters?.map((ol,index)=>{

                    return <tr
                      key={index}
                    className="text-center border border-gray-300 text-[12px] cursor-pointer max-lg2:text-[10px]"
                    onClick={() => navigate(`/letters/outgoing/created/${ol?._id}`)}
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
                            {ol?.outgoing_letter_number ? ol?.outgoing_letter_number:"Not assigned"}
                       
                          </div>
                        </div>
                  
                    </td>
                  
                  
                    <td className="px-6 py-2 whitespace-nowrap border">
                      <div className="flex justify-center items-center">
                    
                          <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                        
                    {ol?.late ==="no" &&  <span
                            className="px-2 py-1 inline-flex  leading-5
                font-semibold  text-gray-500 rounded-[5px]"
                          >
                          {translationState?.lan==="En" && language?.no[0]}
                          {translationState?.lan==="Am" && language?.no[1]} 
                          </span>}
                                
                    {ol?.late ==="yes" &&  <span
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
                      <div className="flex justify-center items-center">
                    
                          <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                            {ol?.createdAt ? ol?.createdAt?.split("T")[0]: "-"}
                       
                          </div>
                        </div>
                  
                    </td>

                    <td className="px-6 py-2 whitespace-nowrap border">
                      <div className="flex justify-center items-center">
                    
                          <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                            {ol?.output_date? ol?.output_date?.split("T")[0]:"-"}
                       
                          </div>
                        </div>
                  
                    </td>

                    <td className="px-6 py-2 whitespace-nowrap border">
                      <div className="flex justify-center items-center">
                    
                          <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                            {ol?.verified_date ? ol?.verified_date?.split("T")[0]:"-"}
                       
                          </div>
                        </div>
                  
                    </td>

                    
                    <td className="px-6 py-2 whitespace-nowrap text-[14px] max-lg2:text-[12px]">
                             

                             {ol?.status === "pending" && (
                               <span
                                 className="px-2 py-1 inline-flex  leading-5
                     font-semibold  bg-gray-300 text-black rounded-[5px]"
                               >
                              {translationState?.lan ==="En" && language?.pending[0]}
                              {translationState?.lan ==="Am" && language?.pending[1]}
                               </span>
                             )}

                             {ol?.status === "output" && (
                               <span
                                 className="px-2 py-1 inline-flex  leading-5
                     font-semibold  bg-black text-white rounded-[5px]"
                               >
                                {translationState?.lan ==="En" && language?.approved[0]}
                                {translationState?.lan ==="Am" && language?.approved[1]}
                               </span>
                             )}

                           
                              {ol?.status === "verified" && (
                               <span
                                 className="px-2 py-1 inline-flex  leading-5
                     font-semibold  bg-green-600 text-white rounded-[5px]"
                               >
                                {translationState?.lan ==="En" && language?.verfied[0]}
                                {translationState?.lan ==="Am" && language?.verfied[1]}
                               </span>
                             )}
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

export default CreatedoutgoingLetters