import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCases } from "../../REDUX/slices/caseSlice";
import { useDebounce } from "use-debounce";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Loading from "../Loading";
import { fetchAllDivision } from "../../REDUX/slices/allDivisionsSlice";
import { language } from "../../utils/part-1lan";

function Cases() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translationState = useSelector((state)=>state.translation);
  const caseState = useSelector((state) => state?.case);
  const divisionState = useSelector((state) => state.allDivisions);
  const [caseNumber, setCaseNumber] = useState("");
  const [debouncedCaseNumber] = useDebounce(caseNumber, 500);
  const [division, setDivision] = useState("");
  const [status, setStatus] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [sortingNum, setSortingNum] = useState(1);

  useEffect(() => {
    dispatch(
      fetchCases({
        page: pageNum,
        sort: sortingNum,
        caseNumber: debouncedCaseNumber,
        division,
        status,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum, sortingNum, debouncedCaseNumber, division, status]);

  useEffect(() => {
    dispatch(fetchAllDivision());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterActiveDivisions = divisionState?.divisions?.filter((div)=>div?.status==="active");
  const notSpecialDivisions = filterActiveDivisions?.filter((div)=>div?.special ==="no");


  const handlePrevious = () => {
    if (pageNum <= 1) {
      setPageNum(1);
    } else {
      setPageNum(pageNum - 1);
    }
  };

  const handleNext = () => {
    if (pageNum >= caseState?.cases?.totalPages) {
      setPageNum(caseState?.cases?.totalPages);
    } else {
      setPageNum(pageNum + 1);
    }
  };

  return (
    <div className="w-[100%] bg-white overflow-hidden">
      <div className="w-[95%] my-[30px] mx-auto">
        <div className="flex pb-4 justify-between items-center border-b">
          <span className="text-[#0C73B8] font-bold text-[20px] max-lg2:text-[16px]">
          {translationState?.lan==="En" && language?.cases[0]} 
          {translationState?.lan==="Am" && language?.cases[1]}
          </span>
        </div>
        <div className="w-[100%] my-[20px] grid grid-cols-3 gap-[10px]">
          <div className="w-[100%]  col-span-1 border border-gray-300 p-3 flex items-center gap-[10px] rounded-[5px] max-lg2:p-2">
            <CiSearch className="text-[24px] text-gray-500" />
            {translationState?.lan==="En" &&    <input
              type="text"
              onChange={(e) => setCaseNumber(e?.target?.value)}
              placeholder={language?.searchByCaseNumber[0]}
              className="flex-1 bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
            />}
              {translationState?.lan==="Am" &&    <input
              type="text"
              onChange={(e) => setCaseNumber(e?.target?.value)}
              placeholder={language?.searchByCaseNumber[1]}
              className="flex-1 bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
            />}
         
          </div>

          <div className="w-[100%] col-span-1 border border-gray-300 p-3 rounded-[5px]">
            <select
              onChange={(e) => setDivision(e?.target?.value)}
              className="w-[100%] flex-1 bg-transparent outline-none text-[14px] text-gray-500 max-lg2:text-[12px]"
            >
              <option value="">
              {translationState?.lan==="En" && language?.searchByDivisionName[0]} 
              {translationState?.lan==="Am" && language?.searchByDivisionName[1]}
              </option>
              {notSpecialDivisions.map((divi, index) => {
                return (
                  <option key={index} value={divi?._id}>
                     {translationState?.lan==="En" && divi?.name_en} 
                     {translationState?.lan==="Am" && divi?.name_am}
                   
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-[100%] col-span-1 border border-gray-300 p-3 rounded-[5px]">
            <select
              onChange={(e) => setStatus(e?.target?.value)}
              className="w-[100%] flex-1 bg-transparent outline-none text-[14px] text-gray-500 max-lg2:text-[12px]"
            >
              <option value={""}>
              {translationState?.lan==="En" && language?.status[0]} 
              {translationState?.lan==="Am" && language?.status[1]}
              </option>
              <option value={"responded"}>
              {translationState?.lan==="En" && language?.responded[0]} 
              {translationState?.lan==="Am" && language?.responded[1]}
              </option>
              <option value={"verified"}>
              {translationState?.lan==="En" && language?.verfied[0]} 
              {translationState?.lan==="Am" && language?.verfied[1]}
              </option>
            </select>
          </div>
        </div>

        <div>
          {caseState?.loading ? (
            <div></div>
          ) : (
            caseState?.cases?.cases?.length > 0 &&
            caseState?.cases?.totalPages && (
              <div className="w-[100%] flex justify-end items-center my-[20px] gap-5">
                <button
                  onClick={handlePrevious}
                  className="mx-1 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:w-[20px] max-lg2:h-[20px]"
                >
                  <IoIosArrowBack />
                </button>
                <span className="text-gray-600 font-semibold">
                  {caseState?.cases?.currentPage} of{" "}
                  {caseState?.cases?.totalPages}
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
                    <option value={1}>
                    {translationState?.lan==="En" && language?.oldest[0]} 
                    {translationState?.lan==="Am" && language?.oldest[1]}
                    </option>
                    <option value={-1}>
                    {translationState?.lan==="En" && language?.latest[0]} 
                    {translationState?.lan==="Am" && language?.latest[1]}
                    </option>
                  </select>
                </div>
              </div>
            )
          )}
        </div>
        {/* table */}

        {caseState?.loading ? (
          <Loading
            addtionalStyle={"flex justify-center items-center my-[30px]"}
          />
        ) : caseState?.cases?.cases?.length === 0 ? (
          <div className="flex justify-center items-center my-[30px]">
            <span className="text-[#0C73B8] font-bold text-[18px]">
            {translationState?.lan==="En" && language?.noCases[0]} 
            {translationState?.lan==="Am" && language?.noCases[1]}
            </span>
          </div>
        ) : (
          <div className="max-h-[700px] flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8  hide-scroll-bar">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full  divide-y divide-gray-200">
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
                   {translationState?.lan==="En" && language?.caseNumber[0]} 
                   {translationState?.lan==="Am" && language?.caseNumber[1]}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center  font-medium text-white uppercase tracking-wider"
                        >
                         {translationState?.lan==="En" && language?.customer[0]} 
                         {translationState?.lan==="Am" && language?.customer[1]}
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-center  font-medium text-white uppercase tracking-wider"
                        >
                     {translationState?.lan==="En" && language?.division[0]} 
                     {translationState?.lan==="Am" && language?.division[1]}
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-center  font-medium text-white uppercase tracking-wider"
                        >
                       {translationState?.lan==="En" && language?.status[0]} 
                       {translationState?.lan==="Am" && language?.status[1]}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {caseState?.cases?.cases?.map((case1, index) => {
                        return (
                          <tr
                            key={index}
                            className="text-center text-[14px]  cursor-pointer max-lg2:text-[12px]"
                            onClick={() => navigate(`/cases/${case1?._id}`)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex justify-center items-center">
                                <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                                  {index + 1}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex justify-center items-center">
                                <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                                  {case1?.case_number
                                    ? case1?.case_number
                                    : "-"}
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex justify-center items-center">
                                <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                                  {case1?.customer_id
                                    ? case1?.customer_id
                                      ? case1?.customer_id?.firstname +
                                        " " +
                                        case1?.customer_id?.middlename +
                                        " " +
                                        case1?.customer_id?.lastname
                                      : "-"
                                    : case1?.customer_info
                                    ? case1?.customer_info?.firstname +
                                      " " +
                                      case1?.customer_info?.middlename +
                                      " " +
                                      case1?.customer_info?.lastname
                                    : "-"}
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap  text-gray-500 capitalize">
                            {translationState?.lan==="En" && case1?.division?.name_en} 
                            {translationState?.lan==="Am" && case1?.division?.name_am}
                             
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap text-[12px] max-lg2:text-[10px]">
                              {case1?.status === "pending" && (
                                <span
                                  className="px-2 py-1 inline-flex  leading-5
                      font-semibold  bg-gray-300 text-black rounded-[5px]"
                                >
                                   {translationState?.lan==="En" && language?.pending[0]} 
                                   {translationState?.lan==="Am" && language?.pending[1]}
                                </span>
                              )}

                              {case1?.status === "ongoing" && (
                                <span
                                  className="px-2 py-1 inline-flex  leading-5
                      font-semibold  bg-black text-white rounded-[5px]"
                                >
                                     {translationState?.lan==="En" && language?.ongoing[0]} 
                                     {translationState?.lan==="Am" && language?.ongoing[1]}
                                </span>
                              )}

                              {case1?.status === "responded" && (
                                <span
                                  className="px-2 py-1 inline-flex  leading-5
                      font-semibold  bg-[#0C73B8] text-white rounded-[5px]"
                                >
                                         {translationState?.lan==="En" && language?.responded[0]} 
                                         {translationState?.lan==="Am" && language?.responded[1]}
                                </span>
                              )}

                              {case1?.status === "verified" && (
                                <span
                                  className="px-2 py-1 inline-flex  leading-5
                      font-semibold  bg-green-600 text-white rounded-[5px]"
                                >
                                         {translationState?.lan==="En" && language?.verfied[0]} 
                                         {translationState?.lan==="Am" && language?.verfied[1]}
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
  );
}

export default Cases;
