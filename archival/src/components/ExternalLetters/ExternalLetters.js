import React, { useEffect,useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLetter } from "../../REDUX/slices/letterSlice";
import {useDebounce} from 'use-debounce';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Loading from "../Loading";

function ExternalLetters() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const letterList = useSelector((state) => state?.letter);
  const [letterNum,setLetterNum] = useState("");
  const [debouncedLetterNum] = useDebounce(letterNum,500);
  const [letterType,setLetterType] = useState("");
  const [status,setStatus] = useState("")
  const [pageNum, setPageNum] = useState(1);
  const [sortingNum, setSortingNum] = useState(-1);

  useEffect(() => {
    dispatch(fetchLetter({page:pageNum,sort:sortingNum,letterNum:debouncedLetterNum,letterType,status}));
    // eslint-disable-next-line
  }, [pageNum,sortingNum,debouncedLetterNum,letterType,status]);

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


  return (
    <div className="w-[100%] mx-auto bg-white overflow-hidden">
      <div className="w-[95%] my-[30px] mx-auto">
        <div className="flex pb-4 justify-between items-center border-b">
          <span className="text-[#0C73B8] font-bold text-[20px] max-lg2:text-[16px]">External Letters</span>
          <button
            onClick={() => navigate("/letters/create_letter")}
            className="py-2 px-4 bg-[#0C73B8] text-white text-[14px] font-bold rounded-[20px] max-lg2:text-[10px]"
          >
            Create Letter
          </button>
        </div>
        <div className="my-[20px] grid grid-cols-3 gap-[10px]">
          <div className="col-span-1 border border-gray-300 p-3 h-[90%] flex items-center gap-[10px] rounded-[5px]">
            <CiSearch className="text-[24px] text-gray-500" />
            <input
              type="text"
              placeholder="Search by letter number"
              onChange={(e)=>setLetterNum(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
            />
          </div>
          <div className="col-span-1 h-[90%] border border-gray-300 p-3 rounded-[5px]">
              <select onChange={(e)=>setLetterType(e.target.value)} className="w-[100%]  bg-transparent outline-none text-[14px] text-gray-500 max-lg2:text-[12px]">
                <option value={""}>Letter type</option>
                <option value={"in"}>In</option>
                <option value={"out"}>Out</option>
              
              </select>
            </div>
          <div className="col-span-1 h-[90%] border border-gray-300 p-3 rounded-[5px]">
              <select onChange={(e)=>setStatus(e.target.value)} className="w-[100%]  bg-transparent outline-none text-[14px] text-gray-500 max-lg2:text-[12px]">
                <option value="">Status</option>
                <option value={"created"}>Created</option>
                <option value={"forwarded"}>Forwarded</option>
      
              </select>
            </div>
        
        </div>
        <div>
    {letterList?.loading ? (
        <div></div>
      ) : (
        letterList?.letters?.totalletters?.length > 0 &&
        letterList?.letters?.totalPages && (
          <div className="w-[100%] flex justify-end items-center my-[20px] gap-5">
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
          </div>
        {/* table */}

        {letterList?.loading ? <Loading addtionalStyle={"flex justify-center items-center my-[30px]"}/> : <div className="max-h-[700px] flex flex-col hide-scroll-bar">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8  hide-scroll-bar">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-[#0C73B8] whitespace-nowrap">
                    <tr className="text-[12px] max-lg2:text-[10px]">
                      <th
                        scope="col"
                        className="px-6 py-3 text-center  font-medium text-white uppercase tracking-wider"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center  font-medium text-white uppercase tracking-wider"
                      >
                        Letter Number
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center  font-medium text-white uppercase tracking-wider"
                      >
                        Letter Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center  font-medium text-white uppercase tracking-wider"
                      >
                        Created By
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center  font-medium text-white uppercase tracking-wider"
                      >
                        Date of Letter Sent
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center  font-medium text-white uppercase tracking-wider"
                      >
                        Created Date
                      </th>
                   
                      <th
                        scope="col"
                        className="px-6 py-3 text-center  font-medium text-white uppercase tracking-wider"
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
                          className="text-center text-[12px] cursor-pointer max-lg2:text-[10px]"
                          onClick={() => navigate(`/letters/${letter._id}`)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex justify-center items-center">
                              <div>
                                <div className="px-6 py-2 whitespace-nowrap  text-center text-gray-500">
                                  {index + 1}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex justify-center items-center">
                          
                                <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                                  {letter?.letter_number
                                    ? letter?.letter_number
                                    : "-"}
                                </div>
                              </div>
                        
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex justify-center items-center">
                     
                                <div className="px-6 py-2 whitespace-nowrap  text-gray-500 uppercase">
                                  {letter?.letter_type
                                    ? letter?.letter_type
                                    : "-"}
                                </div>
                              </div>
                        
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                              {letter?.createdBy
                                ? letter?.createdBy?.firstname +
                                  " " +
                                  letter?.createdBy?.middlename +
                                  " " +
                                  letter?.createdBy?.lastname
                                : "-"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                              {letter?.letter_sent_date
                                ? new Date(
                                    letter?.letter_sent_date
                                  ).toLocaleDateString()
                                : "-"}
                            </div>
                          </td>

                          <td className="px-6 py-2 whitespace-nowrap  text-gray-500">
                            {letter?.createdAt
                              ? new Date(letter?.createdAt).toLocaleDateString()
                              : "-"}
                          </td>
                        

                          <td className="px-6 py-2 whitespace-nowrap max-lg2:text-[10px]">
                          

                              {letter?.status === "created" && (
                                <span
                                  className="px-2 py-1 inline-flex  leading-5
                      font-semibold  bg-gray-300 text-black rounded-[5px]"
                                >
                                  Created
                                </span>
                              )}

                              

                              {letter?.status === "forwarded" && (
                                <span
                                  className="px-2 py-1 inline-flex leading-5
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
        </div>}
  
      </div>
    </div>
  );
}

export default ExternalLetters;
