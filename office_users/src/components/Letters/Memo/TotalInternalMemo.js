import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { language } from '../../../utils/part-1lan';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Loading from '../../Loading';
import ServerError from '../../ServerError';
import { fetchInternalMemo } from '../../../REDUX/slices/internalMemoSlice';

function TotalInternalMemo() {
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const translationState = useSelector((state)=>state.translation);
    const internalMemoState = useSelector((state)=>state?.internalMemo);
    const [status,setStatus] = useState("")
    const [pageNum, setPageNum] = useState(1);
    const [sortingNum, setSortingNum] = useState(-1);

    useEffect(()=>{
        dispatch(fetchInternalMemo({page:pageNum,sort:sortingNum,createdBy:"",status}))
    
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[pageNum,sortingNum,status])
    
    
      
      const handlePrevious = () => {
        if (pageNum <= 1) {
          setPageNum(1);
        } else {
          setPageNum(pageNum - 1);
        }
      };
    
      const handleNext = () => {
        if (pageNum >= internalMemoState?.internalMemos?.totalPages) {
          setPageNum(internalMemoState?.internalMemos?.totalPages);
        } else {
          setPageNum(pageNum + 1);
        }
      };
    
      if(internalMemoState?.error) return <ServerError />
  return (
    <div className="w-[100%] min-h-[90vh] mx-auto bg-white overflow-hidden">
    <div className="w-[95%] my-[30px] mx-auto">
      <div className="flex pb-4 justify-between items-center border-b">
        <span className="text-[#0C73B8] font-bold text-[20px] max-lg2:text-[16px]">        
          {translationState?.lan==="En" && `${language?.totalInternalMemo[0]}`}
        {translationState?.lan==="Am" && `${language?.totalInternalMemo[1]}`}</span>
       
      </div>
      <div className="my-[20px] grid grid-cols-4 gap-[10px]">
        

          
          

          <div className="w-[100%] col-span-1 h-[90%] border border-gray-300 p-3 rounded-[5px]">
          <select onChange={(e)=>setStatus(e.target.value)}  className="w-[100%]  bg-transparent outline-none text-[14px] text-gray-500 max-lg2:text-[12px]">
              
          <option value="">
              {translationState?.lan==="En" && language?.searchByStatus[0]}
              {translationState?.lan==="Am" && language?.searchByStatus[1]}
              </option>
              <option value="pending">
              {translationState?.lan==="En" && language?.pending[0]}
              {translationState?.lan==="Am" && language?.pending[1]}
              </option>
             
              <option value={"verified"}>
              {translationState?.lan==="En" && language?.verfied[0]}
              {translationState?.lan==="Am" && language?.verfied[1]}
              </option>
    
            </select>
          </div>
         
    
      
      </div>
      <div>
  {internalMemoState?.loading ? (
      <div></div>
    ) : (
      internalMemoState?.internalMemos?.internalMemos?.length > 0 &&
      internalMemoState?.internalMemos?.totalPages && (
        <div className="w-[100%] flex justify-end items-center my-[20px] gap-5">
          <button
            onClick={handlePrevious}
            className="mx-1 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:w-[20px] max-lg2:h-[20px]"
          >
            <IoIosArrowBack />
          </button>
          <span className="text-gray-600 font-semibold">
            {internalMemoState?.internalLetters?.currentPage} of{" "}
            {internalMemoState?.internalLetters?.totalPages}
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



{internalMemoState?.loading ? <Loading addtionalStyle={"flex justify-center items-center"}/>:internalMemoState?.internalMemos?.internalMemos?.length ===0 ?   <div className="flex justify-center items-center my-[30px]">
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
                            {translationState?.lan==="En" && language?.subject[0]}
                            {translationState?.lan==="Am" && language?.subject[1]} 
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
                  {internalMemoState?.internalMemos?.internalMemos?.map((il,index)=>{

                    return <tr
                      key={index}
                    className="text-center border border-gray-300 text-[12px] cursor-pointer max-lg2:text-[10px]"
                    onClick={() => navigate(`/letters/memo/cc/${il?._id}`)}
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
                            {il?.subject ? il?.subject: "-"}
                       
                          </div>
                        </div>
                  
                    </td>

                    
                    <td className="px-6 py-2 whitespace-nowrap border">
                      <div className="flex justify-center items-center">
                    
                          <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                            {il?.createdAt ? il?.createdAt?.split("T")[0]: "-"}
                       
                          </div>
                        </div>
                  
                    </td>


                    <td className="px-6 py-2 whitespace-nowrap border">
                      <div className="flex justify-center items-center">
                    
                          <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                            {il?.verified_date ? il?.verified_date?.split("T")[0]:"-"}
                       
                          </div>
                        </div>
                  
                    </td>

                    
                    <td className="px-6 py-2 whitespace-nowrap text-[14px] max-lg2:text-[12px]">
                             

                             {il?.status === "pending" && (
                               <span
                                 className="px-2 py-1 inline-flex  leading-5
                     font-semibold  bg-gray-300 text-black rounded-[5px]"
                               >
                              {translationState?.lan ==="En" && language?.pending[0]}
                              {translationState?.lan ==="Am" && language?.pending[1]}
                               </span>
                             )}

                          

                           
                              {il?.status === "verified" && (
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

export default TotalInternalMemo