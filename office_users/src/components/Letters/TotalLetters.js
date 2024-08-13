import React, { useEffect,useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import ServerError from "../ServerError";
import Loading from "../Loading";
import { fetchLetters } from "../../REDUX/slices/LetterSlice";
import { useDebounce } from "use-debounce";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function TotalLetters() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const letterList = useSelector((state) => state?.letters);
    const [letterNumber,setLetterNumber] = useState("");
    const [debouncedLetterNumber] = useDebounce(letterNumber,500);
    const [from,setFrom] = useState("");
    const [debouncedFrom] = useDebounce(from,500);
    const [to,setTo] = useState("");
    const [debouncedTo] = useDebounce(to,500)
    const [status,setStatus] = useState("")
    const [pageNum, setPageNum] = useState(1);
    const [sortingNum, setSortingNum] = useState(-1);

  
    useEffect(() => {
      dispatch(fetchLetters({page:pageNum,sort:sortingNum,letterNumber:debouncedLetterNumber,status,sentFrom:debouncedFrom,sentTo:debouncedTo}));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNum,sortingNum,debouncedLetterNumber,status,debouncedFrom,debouncedTo]);



    const handlePrevious = () => {
      if (pageNum <= 1) {
        setPageNum(1);
      } else {
        setPageNum(pageNum - 1);
      }
    };
    
    const handleNext = () => {
      if (pageNum >= letterList?.letters?.totalPages) {
        setPageNum(letterList?.letters?.totalPages);
      } else {
        setPageNum(pageNum + 1);
      }
    };

  
    if (letterList?.error) return <ServerError />;
  return (
    <div className="w-[95%] my-[30px] mx-auto bg-white rounded-[20px]">
    <div className="w-[90%] my-[30px] mx-auto">
      <div className="w-[100%] flex items-center justify-start   text-[#0C73B8] mt-[50px] mx-auto font-bold">
        <BiChevronLeft
          className="text-[30px] cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <span className="text-[20px]">Total Letters</span>
      </div>
      <div className="my-[20px] grid grid-cols-4 gap-[10px]">
      
          <div className="w-[100%] border border-gray-400 p-3 flex items-center gap-[10px] rounded-[5px]">
            <CiSearch className="text-[24px] text-gray-500" />
            <input
              type="text"
              placeholder="Search by letter number"
              onChange={(e)=>setLetterNumber(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[14px]"
            />
          </div>
          <div className="w-[100%] border border-gray-400 p-3 flex items-center gap-[10px] rounded-[5px]">
            <CiSearch className="text-[24px] text-gray-500" />
            <input
              type="text"
              placeholder="Search by from"
              onChange={(e)=>setFrom(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[14px]"
            />
          </div>
          <div className="w-[100%] border border-gray-400 p-3 flex items-center gap-[10px] rounded-[5px]">
            <CiSearch className="text-[24px] text-gray-500" />
            <input
              type="text"
              placeholder="Search by to"
              onChange={(e)=>setTo(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[14px]"
            />
          </div>

          
         
          <div className="w-[100%] border border-gray-400 p-3 rounded-[5px]">
            <select onChange={(e)=>setStatus(e.target.value)} className="w-[100%] flex-1 bg-transparent outline-none text-[14px]">
              <option value={""}>Filter by status</option>
              <option value={"created"}>Created</option>
              <option value={"forwarded"}>Forwarded</option>
          
            </select>
       
        </div>
       
      </div>


      {letterList?.loading ? (
              <div></div>
            ) : (
              letterList?.letters?.totalletters?.length > 0 &&
              letterList?.letters?.totalPages && (
                <div className="w-[100%] mx-auto flex justify-end items-center my-[20px] gap-5">
                  <button
                    onClick={handlePrevious}
                    className="mx-1 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:w-[20px] max-lg2:h-[20px]"
                  >
                    <IoIosArrowBack />
                  </button>
                  <span className="text-gray-600 font-semibold">
                    {letterList?.letters?.currentPage} of{" "}
                    {letterList?.letters?.totalPages}
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
      {/* table */}
      {letterList?.loading ? (
        <Loading addtionalStyle={"flex justify-center items-center"} />
      ) : letterList?.letters?.totalletters?.length === 0 ? (
        <div>
          <span className="text-[#0C73B8] text-[14px]">No letters found</span>
        </div>
      ) : (
        <div className="max-h-[700px] flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8  hide-scroll-bar">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-[#0C73B8]  whitespace-nowrap">
                    <tr className="text-[14px]">
                      <th
                        scope="col"
                        className="px-6 py-4 text-center  font-bold text-white  tracking-wider"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-center  font-bold text-white   tracking-wider"
                      >
                        Letter Number
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-center  font-bold text-white   tracking-wider"
                      >
                        From
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-4 text-center  font-bold text-white   tracking-wider"
                      >
                        To
                      </th>
                   

                      <th
                        scope="col"
                        className="px-6 py-4 text-center  font-bold text-white   tracking-wider"
                      >
                       Sent Date
                      </th>
                   
                      <th
                        scope="col"
                        className="px-6 py-4 text-center  font-bold text-white   tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {letterList?.letters?.totalletters?.map((letter, index) => {
                      return (
                        <tr
                          key={index}
                          className="text-center text-[12px]"
                          // onClick={()=>navigate(`/cases/${case1.id}`)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex justify-center items-center">
                              <div className="ml-4">
                                <div className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                  {index + 1}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex justify-center items-center">
                              <div className="ml-4">
                                <div className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                  {letter?.letter_number}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex justify-center items-center">
                              <div className="ml-4">
                            <div className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                  {letter?.sent_from}{" "}
                               
                                </div>

                               
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex justify-center items-center">
                              <div className="ml-4">
                            <div className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                  {letter?.sent_to}{" "}
                               
                                </div>

                               
                              </div>
                            </div>
                          </td>

                          

                          <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                            {letter?.createdAt?.split("T")[0]}
                          </td>
                         
                          

                          <td className="px-6 py-2 whitespace-nowrap">
                           

                            {letter?.status === "created" && (
                              <span
                                className="px-2 py-1 inline-flex text-xs leading-5
                    font-semibold  bg-gray-300 text-black rounded-[5px]"
                              >
                                Created
                              </span>
                            )}



                            {letter?.status === "forwarded" && (
                              <span
                                className="px-2 py-1 inline-flex text-xs leading-5
                    font-semibold  bg-green-600 text-white rounded-[5px]"
                              >
                                Forwarded
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  )
}

export default TotalLetters