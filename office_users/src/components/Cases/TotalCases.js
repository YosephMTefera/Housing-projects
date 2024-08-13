import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCases } from "../../REDUX/slices/caseSlice";
import ServerError from "../ServerError";
import Loading from "../Loading";
import { useDebounce } from "use-debounce";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { fetchAllDivision } from "../../REDUX/slices/allDivisionsSlice";
import { language } from "../../utils/part-1lan";

function TotalCases() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translationState = useSelector((state)=>state.translation)
  const caseList = useSelector((state) => state?.cases);
  const divisionList = useSelector((state) => state.allDivisions);
  const [caseNumber, setCaseNumber] = useState("");
  const [debouncedCaseNumber] = useDebounce(caseNumber, 500);
  const [division, setDivision] = useState("");
  const [late, setLate] = useState("");
  const [status, setStatus] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [sortingNum, setSortingNum] = useState(-1);

  useEffect(() => {
    dispatch(
      fetchCases({
        page: pageNum,
        sort: sortingNum,
        status,
        division,
        caseNumber: debouncedCaseNumber,
        late,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum, sortingNum, status, division, debouncedCaseNumber, late]);

  useEffect(() => {
    dispatch(fetchAllDivision());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlePrevious = () => {
    if (pageNum <= 1) {
      setPageNum(1);
    } else {
      setPageNum(pageNum - 1);
    }
  };

  const handleNext = () => {
    if (pageNum >= caseList?.cases?.totalPages) {
      setPageNum(caseList?.cases?.totalPages);
    } else {
      setPageNum(pageNum + 1);
    }
  };

  if (caseList?.error) return <ServerError />;

  return (
    <div className="w-[95%] my-[30px] mx-auto bg-white rounded-[20px]">
      <div className="w-[90%] my-[30px] mx-auto">
        <div className="w-[100%] flex items-center justify-start   text-[#0C73B8] mt-[50px] mx-auto font-bold">
          <BiChevronLeft
            className="text-[30px] cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <span className="text-[20px]">
          {translationState?.lan ==="En" && language?.totalCases[0]}
          {translationState?.lan ==="Am" && language?.totalCases[1]}
          </span>
        </div>
        <div className="my-[20px] grid grid-cols-4 gap-[10px]">
          <div className="w-[100%] border border-gray-400 p-3 flex items-center gap-[10px] rounded-[5px]">
            <CiSearch className="text-[24px] text-gray-500" />
            {translationState?.lan ==="En" &&  <input
              type="text"
              placeholder={language?.searchByCaseNumber[0]}
              onChange={(e)=>setCaseNumber(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
            />}
            {translationState?.lan ==="Am" &&  <input
              type="text"
              placeholder={language?.searchByCaseNumber[1]}
              onChange={(e)=>setCaseNumber(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
            />}
          </div>

          <div className="w-[100%] border border-gray-400 p-3 rounded-[5px]">
            <select
              onChange={(e) => setDivision(e.target.value)}
              className="w-[100%] flex-1 bg-transparent outline-none text-[14px]"
            >
              <option value={""}>
              {translationState?.lan ==="En" && language?.searchByDivisionName[0]}
              {translationState?.lan ==="Am" && language?.searchByDivisionName[1]}
              </option>
              {divisionList?.divisions?.map((division1, index) => {
                return (
                  <option key={index} value={division1?._id}>
                        {translationState?.lan ==="En" && division1?.name_en}
                        {translationState?.lan ==="Am" && division1?.name_am}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-[100%] border border-gray-400 p-3 rounded-[5px]">
            <select
              onChange={(e) => setLate(e.target.value)}
              className="w-[100%] flex-1 bg-transparent outline-none text-[14px]"
            >
              <option value={""}>
              {translationState?.lan ==="En" && language?.searchByLateCases[0]}
              {translationState?.lan ==="Am" && language?.searchByLateCases[1]}
              </option>
              <option value={"no"}>
              {translationState?.lan ==="En" && language?.no[0]}
              {translationState?.lan ==="Am" && language?.no[1]}
              </option>
              <option value={"yes"}>
              {translationState?.lan ==="En" && language?.yes[0]}
              {translationState?.lan ==="Am" && language?.yes[1]}
              </option>
            </select>
          </div>
          <div className="w-[100%] border border-gray-400 p-3 rounded-[5px]">
            <select
              onChange={(e) => setStatus(e.target.value)}
              className="w-[100%] flex-1 bg-transparent outline-none text-[14px]"
            >
              <option value={""}>
              {translationState?.lan ==="En" && language?.searchByStatus[0]}
              {translationState?.lan ==="Am" && language?.searchByStatus[1]}
              </option>
              <option value={"pending"}>
              {translationState?.lan ==="En" && language?.pending[0]}
              {translationState?.lan ==="Am" && language?.pending[1]}
              </option>
              <option value={"ongoing"}>
              {translationState?.lan ==="En" && language?.ongoing[0]}
              {translationState?.lan ==="Am" && language?.ongoing[1]}
              </option>
              <option value={"responded"}>
              {translationState?.lan ==="En" && language?.respond[0]}
              {translationState?.lan ==="Am" && language?.respond[1]}
              </option>
              <option value={"verified"}>
              {translationState?.lan ==="En" && language?.verfied[0]}
              {translationState?.lan ==="Am" && language?.verfied[1]}
              </option>
              <option value={"rejected"}>
              {translationState?.lan ==="En" && language?.rejected[0]}
              {translationState?.lan ==="Am" && language?.rejected[1]}
              </option>
            </select>
          </div>
        </div>

        {caseList?.loading ? (
          <div></div>
        ) : (
          caseList?.cases?.cases?.length > 0 &&
          caseList?.cases?.totalPages && (
            <div className="w-[100%] mx-auto flex justify-end items-center my-[20px] gap-5">
              <button
                onClick={handlePrevious}
                className="mx-1 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:w-[20px] max-lg2:h-[20px]"
              >
                <IoIosArrowBack />
              </button>
              <span className="text-gray-600 font-semibold">
                {caseList?.cases?.currentPage} of {caseList?.cases?.totalPages}
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
                  {translationState?.lan ==="En" && language?.latest[0]}
                  {translationState?.lan ==="Am" && language?.latest[1]}
                  </option>
                  <option value={1}>
                  {translationState?.lan ==="En" && language?.oldest[0]}
                  {translationState?.lan ==="Am" && language?.oldest[1]}
                  </option>
                </select>
              </div>
            </div>
          )
        )}
        {/* table */}
        {caseList?.loading ? (
          <Loading addtionalStyle={"flex justify-center items-center"} />
        ) : caseList?.cases?.cases?.length === 0 ? (
          <div>
            <span className="text-[#0C73B8] text-[14px]">
            {translationState?.lan ==="En" && language?.noCasesFound[0]}
            {translationState?.lan ==="Am" && language?.noCasesFound[1]}
            </span>
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
                                {translationState?.lan ==="En" && language?.caseNumber[0]}
                                {translationState?.lan ==="Am" && language?.caseNumber[1]}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-center  font-bold text-white   tracking-wider"
                        >
                                   {translationState?.lan ==="En" && language?.customerName[0]}
                                   {translationState?.lan ==="Am" && language?.customerName[1]}
                       
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-4 text-center  font-bold text-white   tracking-wider"
                        >
                          {translationState?.lan ==="En" && language?.division[0]}
                          {translationState?.lan ==="Am" && language?.division[1]}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-center font-bold text-white   tracking-wider"
                        >
                    {translationState?.lan ==="En" && language?.late[0]}
                    {translationState?.lan ==="Am" && language?.late[1]}
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-4 text-center  font-bold text-white   tracking-wider"
                        >
                          {translationState?.lan ==="En" && language?.submittedDate[0]}
                          {translationState?.lan ==="Am" && language?.submittedDate[1]}
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-4 text-center  font-bold text-white   tracking-wider"
                        >
                           {translationState?.lan ==="En" && language?.status[0]}
                          {translationState?.lan ==="Am" && language?.status[1]}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {caseList?.cases?.cases?.map((case1, index) => {
                        return (
                          <tr
                            key={index}
                            className="text-center text-[12px] cursor-pointer"
                            onClick={() => navigate(`/cases/${case1?._id}/normal`)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex justify-center items-center">
                                <div className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                  {index + 1}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex justify-center items-center">
                                <div className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                  {case1?.case_number}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex justify-center items-center">
                                {case1?.customer_id && (
                                  <div className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {case1?.customer_id?.firstname}{" "}
                                    {case1?.customer_id?.middlename}{" "}
                                    {case1?.customer_id?.lastname}
                                  </div>
                                )}

                                {case1?.customer_info && (
                                  <div className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {case1?.customer_info?.firstname}{" "}
                                    {case1?.customer_info?.middlename}{" "}
                                    {case1?.customer_info?.lastname}{" "}
                                  </div>
                                )}
                              </div>
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                            {translationState?.lan ==="En" && case1?.division?.name_en}
                          {translationState?.lan ==="Am" && case1?.division?.name_am}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                            {translationState?.lan ==="En" && case1?.late}
                            {translationState?.lan ==="Am" && case1?.late ==="yes" ? language?.yes[1]:language?.no[1]}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                              {case1?.createdAt?.split("T")[0]}
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap">
                              {case1?.status === "pending" && (
                                <span
                                  className="px-2 py-1 inline-flex text-xs leading-5
                      font-semibold  bg-gray-300 text-black rounded-[5px]"
                                >
                              {translationState?.lan ==="En" && language?.pending[0]}
                              {translationState?.lan ==="Am" && language?.pending[1]}
                                </span>
                              )}

                              {case1?.status === "ongoing" && (
                                <span
                                  className="px-2 py-1 inline-flex text-xs leading-5
                      font-semibold  bg-black text-white rounded-[5px]"
                                >
                                  {translationState?.lan ==="En" && language?.ongoing[0]}
                                  {translationState?.lan ==="Am" && language?.ongoing[1]}
                                </span>
                              )}

                              {case1?.status === "responded" && (
                                <span
                                  className="px-2 py-1 inline-flex text-xs leading-5
                      font-semibold  bg-[#0C73B8] text-white rounded-[5px]"
                                >
                                  {translationState?.lan ==="En" && language?.responded[0]}
                                  {translationState?.lan ==="Am" && language?.responded[1]}
                                </span>
                              )}

                              {case1?.status === "verified" && (
                                <span
                                  className="px-2 py-1 inline-flex text-xs leading-5
                      font-semibold  bg-green-600 text-white rounded-[5px]"
                                >
                                {translationState?.lan ==="En" && language?.verfied[0]}
                                {translationState?.lan ==="Am" && language?.verfied[1]}
                                </span>
                              )}
                              {case1?.status === "rejected" && (
                                <span
                                  className="px-2 py-1 inline-flex text-xs leading-5
                      font-semibold  bg-green-600 text-white rounded-[5px]"
                                >
                                {translationState?.lan ==="En" && language?.rejected[0]}
                                {translationState?.lan ==="Am" && language?.rejected[1]}
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

export default TotalCases;
