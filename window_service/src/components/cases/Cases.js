import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useDebounce } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import { fetchCases } from "../../REDUX/slices/caseSlice";
import ServerError from "../ServerError";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import { language } from "../../utils/part-1lan";

function Cases() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("tID");
  const decodedToken = jwtDecode(token);
  const userID = decodedToken?.user?.id;
  const translationState = useSelector((state)=>state.translation)
  const caseState = useSelector((state) => state.getCases);
  const [caseNumber, setCaseNumber] = useState("");
  const [debouncedCaseNumber] = useDebounce(caseNumber, 500);
  const [status, setStatus] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [sortingNum, setSortingNum] = useState(-1);

  useEffect(() => {
    dispatch(
      fetchCases({
        page: pageNum,
        sort: sortingNum,
        name: "",
        phone: "",
        caseNumber: debouncedCaseNumber,
        status,
        windowService: userID,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum, sortingNum, debouncedCaseNumber, status]);

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

  if (caseState?.error) return <ServerError />;

  return (
    <div className="w-[100%]  mx-auto bg-white">
      <div className="w-[90%] mx-auto">
        <div className="w-[100%] flex items-center justify-start   text-[#0C73B8] mt-[50px] mx-auto font-bold max-lg2:mt-[20px]">
          <BiChevronLeft
            className="text-[30px] cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <span className="text-[20px] max-lg2:text-[16px]">
          {translationState?.lan ==="En" && language?.cases[0]}
          {translationState?.lan ==="Am" && language?.cases[1]}
          </span>
        </div>
        <div className="my-[20px]">
          <div className="w-[100%] grid grid-cols-3 gap-[10px]">
            <div className="w-[100%] col-span-1 border border-gray-400 p-3 flex items-center gap-[10px] rounded-[5px]">
              <CiSearch className="text-[24px] text-gray-500 " />
              {translationState?.lan ==="En" &&    <input
                type="text"
                placeholder={language?.caseNumber[0]}
                onChange={(e) => setCaseNumber(e?.target?.value)}
                className="flex-1 bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
              />}
                 {translationState?.lan ==="Am" &&    <input
                type="text"
                placeholder={language?.caseNumber[1]}
                onChange={(e) => setCaseNumber(e?.target?.value)}
                className="flex-1 bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
              />}
          
           
            </div>

            <div className="w-[100%]">
              <select
                onChange={(e) => setStatus(e?.target?.value)}
                className="w-[100%]  col-span-1 text-gray-500 text-[14px] border border-gray-400 p-3 flex items-center gap-[10px] rounded-[5px] outline-none"
                type="text"
              >
                <option value={""}>
                  
                {translationState?.lan ==="En" && language?.searchByStatus[0]}
                {translationState?.lan ==="Am" && language?.searchByStatus[1]}</option>
                <option value={"pending"}>
                  {translationState?.lan ==="En" && language?.pending[0]}
                  {translationState?.lan ==="Am" && language?.pending[1]}
                </option>
                <option value={"ongoing"}>
                {translationState?.lan ==="En" && language?.ongoing[0]}
                {translationState?.lan ==="Am" && language?.ongoing[1]}
                </option>
                <option value={"responded"}>
                {translationState?.lan ==="En" && language?.responded[0]}
                {translationState?.lan ==="Am" && language?.responded[1]}
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
        </div>
        <div className="w-[100%] my-[20px] flex  justify-end items-center gap-[10px]">
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
          </div>
        </div>
        {/* table */}
        {caseState?.loading ? (
          <Loading addtionalStyle={"flex justify-center items-center"} />
        ) : caseState?.cases?.cases?.length === 0 ? (
          <div className="flex justify-center items-center my-[30px]">
            <span className="text-[#0C73B8] text-[14px]">
            {translationState?.lan ==="En" && language?.noCases[0]}
            {translationState?.lan ==="Am" && language?.noCases[1]}
          
            </span>
          </div>
        ) : caseState?.cases?.cases?.length === 0 ? (
          <div className="uppercase w-[100%] h-[300px] flex items-center justify-center mt-12">
            <span className="text-5xl text-gray-700">
            {translationState?.lan ==="En" && language?.noCases[0]}
            {translationState?.lan ==="Am" && language?.noCases[1]}
            </span>
          </div>
        ) : (
          <div className="max-h-[700px] flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8  hide-scroll-bar">
              <div className="py-2  inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#0C73B8]  whitespace-nowrap">
                      <tr className="text-[14px] max-lg2:text-[12px]">
                        <th
                          scope="col"
                          className="px-6 py-4   font-bold text-white  tracking-wider max-lg2:py-3"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4   font-bold text-white   tracking-wider max-lg2:py-3"
                        >
                              {translationState?.lan ==="En" && language?.caseNumber[0]}
                              {translationState?.lan ==="Am" && language?.caseNumber[1]}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4   font-bold text-white   tracking-wider  max-lg2:py-3"
                        >
                               {translationState?.lan ==="En" && language?.customerName[0]}
                               {translationState?.lan ==="Am" && language?.customerName[1]}
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-4   font-bold text-white   tracking-wider max-lg2:py-3"
                        >
                         {translationState?.lan ==="En" && language?.division[0]}
                         {translationState?.lan ==="Am" && language?.division[1]}
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-4   font-bold text-white   tracking-wider max-lg2:py-3"
                        >
                            {translationState?.lan ==="En" && language?.createdDate[0]}
                            {translationState?.lan ==="Am" && language?.createdDate[1]}
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-4   font-bold text-white   tracking-wider max-lg2:py-3"
                        >
                        {translationState?.lan ==="En" && language?.status[0]}
                        {translationState?.lan ==="Am" && language?.status[1]}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 [&>*:nth-child(even)]:bg-[#F9F9F9]">
                      {caseState?.cases?.cases?.map((case1, index) => {
                        return (
                          <tr
                            key={index}
                            onClick={() => navigate(`/${case1?._id}`)}
                            className="text-[14px] max-lg2:text-[12px] cursor-pointer"
                          >
                            <td className="px-6 py-4 whitespace-nowrap max-lg2:py-1">
                              <div className="flex justify-center items-center">
                                <div>
                                  <div className="px-6 py-2 whitespace-nowrap text-[12px] text-gray-500">
                                    {index + 1}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap max-lg2:py-1">
                              <div className="flex justify-center items-center">
                                <div>
                                  <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                                    {case1?.case_number}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap max-lg2:py-1">
                              {case1?.customer_id ? (
                                <div className="flex justify-center items-center">
                                  <div>
                                    <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                                      {case1?.customer_id?.firstname}{" "}
                                      {case1?.customer_id?.middlename}{" "}
                                      {case1?.customer_id?.lastname}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex justify-center items-center">
                                  <div>
                                    <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                                      {case1?.customer_info?.firstname}{" "}
                                      {case1?.customer_info?.middlename}{" "}
                                      {case1?.customer_info?.lastname}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap max-lg2:py-1">
                              <div className="flex justify-center items-center">
                                <div>
                                  <div className="px-6 py-2 whitespace-nowrap text-gray-500">
                                  
                                    {translationState?.lan ==="En" && case1?.division?.name_en}
                                    {translationState?.lan ==="Am" && case1?.division?.name_am}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap max-lg2:py-1">
                              <div className="flex justify-center items-center">
                                <div>
                                  <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                                    {new Date(case1?.createdAt)?.toDateString()}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-2    text-[12px]   font-bold">
                              <div className="flex justify-center  items-center">
                                {case1?.status === "pending" && (
                                  <span className="p-2 rounded-[5px] bg-gray-200 text-gray-500">
                                   {translationState?.lan ==="En" && language?.pending[0]}
                                   {translationState?.lan ==="Am" && language?.pending[1]}
                                  </span>
                                )}
                                {case1?.status === "ongoing" && (
                                  <span className="p-2 rounded-[5px] bg-black text-white">
                                      {translationState?.lan ==="En" && language?.ongoing[0]}
                                      {translationState?.lan ==="Am" && language?.ongoing[1]}
                                  </span>
                                )}
                                {case1?.status === "responded" && (
                                  <span className="p-2 rounded-[5px] bg-[#0C73B8]  text-white">
                                    {translationState?.lan ==="En" && language?.responded[0]}
                                    {translationState?.lan ==="Am" && language?.responded[1]}
                                  </span>
                                )}
                                {case1?.status === "verified" && (
                                  <span className="p-2 rounded-[5px] bg-green-600 text-white">
                                 {translationState?.lan ==="En" && language?.verfied[0]}
                                 {translationState?.lan ==="Am" && language?.verfied[1]}
                                  </span>
                                )}
                                {case1?.status === "rejected" && (
                                  <span className="p-2 rounded-[5px] bg-red-600 text-white">
                                   {translationState?.lan ==="En" && language?.rejected[0]}
                                   {translationState?.lan ==="Am" && language?.rejected[1]}
                                  </span>
                                )}
                              </div>
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
