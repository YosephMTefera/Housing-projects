import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { fetchCases } from "../../REDUX/slices/caseSlice";
import { useDispatch, useSelector } from "react-redux";
import {jwtDecode} from 'jwt-decode';
import Loading from "../Loading";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ServerError from "../ServerError";
import { language } from "../../utils/part-1lan";


function CaseStatus() {
  const token = sessionStorage.getItem('tID');
  const decodedToken = jwtDecode(token);
  const userID = decodedToken?.user?.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translationState = useSelector((state)=>state.translation);
  const caseState = useSelector((state) => state?.cases);
  const [pageNum, setPageNum] = useState(1);
  const [sortingNum, setSortingNum] = useState(-1);

  useEffect(()=>{
    dispatch(fetchCases({page:pageNum,sort:sortingNum,name:"",phone:"",caseNumber:"",status:"",customer_id:userID}))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pageNum,sortingNum,userID])

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

  if(caseState?.limitError) return <div className="w-[80%] mx-auto my-[30px] min-h-[300px] rounded-[10px] bg-white flex justify-center items-center">
  <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">Please wait 3 minutes before retrying.</p>
</div>

  if(caseState?.error) return <ServerError />

  return (
    <div className="w-[95%] mx-auto max-h-[82%] mt-[30px] p-4 relative bg-white rounded">
      <div className="w-[95%] mt-[30px] mx-auto">
        <div className="flex items-center justify-start gap-[10px] text-[#FBB042]">
          <BiChevronLeft
            onClick={() => navigate(-1)}
            className="text-[40px] cursor-pointer max-lg2:text-[30px]"
          />
          <span className="text-[20px] font-bold max-lg2:text-[16px]">
          {translationState?.lan === "En" && language?.caseStatus[0]}
          {translationState?.lan === "Am" && language?.caseStatus[1]}
                    {translationState?.lan === "Or" && language?.caseStatus[2]}
                    {translationState?.lan === "Tg" && language?.caseStatus[3]}
                    {translationState?.lan === "Sm" && language?.caseStatus[4]}
                    {translationState?.lan === "Af" && language?.caseStatus[5]} 
          </span>
        </div>
      </div>
      <div>
    {caseState?.loading ? (
        <div></div>
      ) : (
        caseState?.cases?.cases?.length > 0 &&
        caseState?.cases?.totalPages && (
          <div className="w-[95%] mx-auto flex justify-end items-center my-[20px] gap-5">
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
                {translationState?.lan === "En" && language?.latest[0]}
          {translationState?.lan === "Am" && language?.latest[1]}
                    {translationState?.lan === "Or" && language?.latest[2]}
                    {translationState?.lan === "Tg" && language?.latest[3]}
                    {translationState?.lan === "Sm" && language?.latest[4]}
                    {translationState?.lan === "Af" && language?.latest[5]} 
                </option>
                <option value={1}>
                {translationState?.lan === "En" && language?.oldest[0]}
          {translationState?.lan === "Am" && language?.oldest[1]}
                    {translationState?.lan === "Or" && language?.oldest[2]}
                    {translationState?.lan === "Tg" && language?.oldest[3]}
                    {translationState?.lan === "Sm" && language?.oldest[4]}
                    {translationState?.lan === "Af" && language?.oldest[5]} 
                </option>
              </select>
            </div>
          </div>
        )
      )}
          </div>

      <div className="w-[95%] mt-[30px] mx-auto flex justify-between items-center">
        <div className="w-[100%] max-h-[560px] overflow-auto">
          {caseState?.loading ? <Loading addtionalStyle={"flex justify-center items-center my-[30px]"}/> :caseState?.cases?.cases?.length === 0 ? (
           <div className="capitalize w-[80%] h-[300px] my-[50px] mx-auto bg-white rounded-[10px] flex items-center justify-center mt-12">
           <span className="text-lg text-[#0C73B8] font-bold">
           {translationState?.lan === "En" && language?.noAvailableCase[0]}
          {translationState?.lan === "Am" && language?.noAvailableCase[1]}
                    {translationState?.lan === "Or" && language?.noAvailableCase[2]}
                    {translationState?.lan === "Tg" && language?.noAvailableCase[3]}
                    {translationState?.lan === "Sm" && language?.noAvailableCase[4]}
                    {translationState?.lan === "Af" && language?.noAvailableCase[5]} 
           </span>
  
        
         </div>
          ) : (
            <table className="w-[100%]">
              <thead className="bg-[#0C73B8] text-white  text-[14px] max-lg2:text-[12px]">
                <tr>
                  <th className="px-2 py-4 border-[2px] border-white">#</th>
                  <th className="px-2 py-4 border-[2px] border-white">
                  {translationState?.lan === "En" && language?.caseNumber[0]}
          {translationState?.lan === "Am" && language?.caseNumber[1]}
                    {translationState?.lan === "Or" && language?.caseNumber[2]}
                    {translationState?.lan === "Tg" && language?.caseNumber[3]}
                    {translationState?.lan === "Sm" && language?.caseNumber[4]}
                    {translationState?.lan === "Af" && language?.caseNumber[5]} 
                  </th>
                  <th className="px-2 py-4 border-[2px] border-white">
                  {translationState?.lan === "En" && language?.status[0]}
          {translationState?.lan === "Am" && language?.status[1]}
                    {translationState?.lan === "Or" && language?.status[2]}
                    {translationState?.lan === "Tg" && language?.status[3]}
                    {translationState?.lan === "Sm" && language?.status[4]}
                    {translationState?.lan === "Af" && language?.status[5]} 
                  </th>
                </tr>
              </thead>
              <tbody className="border [&>*:nth-child(even)]:bg-[#F9F9F9]">
                {caseState?.cases?.cases?.map((fc, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => navigate(`/dashboard/case/${fc?._id}`,{state:{
                        case_number:fc?.case_number
                      }})}
                      className="text-center border-b border-gray-300 text-gray-600 cursor-pointer max-lg2:text-[12px]"
                    >
                      <td className="py-3 border">{index + 1}</td>
                      <td className="py-3 border">{fc?.case_number ? fc?.case_number : "-"}</td>
                      <td className="py-3 border text-[14px] max-lg2:text-[10px]">
                        {fc?.status === "pending" && (
                          <span className="py-2 px-4 bg-gray-300 rounded-[5px] max-sm1:py-1.5">
                              {translationState?.lan === "En" && language?.pending[0]}
          {translationState?.lan === "Am" && language?.pending[1]}
                    {translationState?.lan === "Or" && language?.pending[2]}
                    {translationState?.lan === "Tg" && language?.pending[3]}
                    {translationState?.lan === "Sm" && language?.pending[4]}
                    {translationState?.lan === "Af" && language?.pending[5]} 
                          </span>
                        )}
                        {(fc?.status === "ongoing" ||
                          fc?.status === "responded") && (
                          <span className="py-3 px-4 bg-[#FBB042] rounded-[5px] text-white max-sm1:py-1.5">
                                {translationState?.lan === "En" && language?.processing[0]}
          {translationState?.lan === "Am" && language?.processing[1]}
                    {translationState?.lan === "Or" && language?.processing[2]}
                    {translationState?.lan === "Tg" && language?.processing[3]}
                    {translationState?.lan === "Sm" && language?.processing[4]}
                    {translationState?.lan === "Af" && language?.processing[5]} 
                          </span>
                        )}
                        {(fc?.status === "verified") && (
                          <span className="py-2 px-4 bg-green-600 rounded-[5px] text-white max-sm1:py-1.5">
                                   {translationState?.lan === "En" && language?.responded[0]}
          {translationState?.lan === "Am" && language?.responded[1]}
                    {translationState?.lan === "Or" && language?.responded[2]}
                    {translationState?.lan === "Tg" && language?.responded[3]}
                    {translationState?.lan === "Sm" && language?.responded[4]}
                    {translationState?.lan === "Af" && language?.responded[5]} 
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default CaseStatus;
