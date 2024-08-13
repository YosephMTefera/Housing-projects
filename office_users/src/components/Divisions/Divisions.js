import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDivisions } from "../../REDUX/slices/divisionSlice";
import ServerError from "../ServerError";
import Loading from "../Loading";
import { useDebounce } from "use-debounce";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { language } from "../../utils/part-1lan";

function Divisions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translationState = useSelector((state)=>state.translation);
  const divisionList = useSelector((state) => state?.divisions);
  const [name,setName] = useState("");
  const [debouncedName] = useDebounce(name,500);
  const [status,setStatus] = useState("")
  const [pageNum, setPageNum] = useState(1);
  const [sortingNum, setSortingNum] = useState(-1);

  useEffect(() => {
    dispatch(fetchDivisions({page:pageNum,sort:sortingNum,name:debouncedName,status}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum,sortingNum,debouncedName,status]);


  const handlePrevious = () => {
    if (pageNum <= 1) {
      setPageNum(1);
    } else {
      setPageNum(pageNum - 1);
    }
  };

  const handleNext = () => {
    if (pageNum >= divisionList?.divisions?.totalPages) {
      setPageNum(divisionList?.divisions?.totalPages);
    } else {
      setPageNum(pageNum + 1);
    }
  };


  if (divisionList?.error) return <ServerError />;
  return (
    <div className="w-[95%] my-[50px] mx-auto bg-white rounded-[20px]">
      <div className="w-[95%] flex items-center justify-start   text-[#0C73B8] mt-[50px] mx-auto font-bold">
        <BiChevronLeft
          className="text-[30px] cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <span className="text-[20px]">
        {translationState?.lan ==="En" && language?.divisions[0]}
        {translationState?.lan ==="Am" && language?.divisions[1]}
        </span>
      </div>
      <div className="w-[95%]   mx-auto p-2 mt-[20px] grid grid-cols-2 gap-[20px] max-md1:justify-between">
        
        <div className="w-[100%] col-span-1 max-md1:flex-1">
        {translationState?.lan ==="En" &&  <input
            onChange={(e)=>setName(e.target.value)}
            className="w-[100%]  p-3 text-[14px] border border-gray-300 rounded-[5px] outline-none"
            type="text"
            placeholder={language?.searchByDivisionName[0]}
          />}
        {translationState?.lan ==="Am" &&  <input
            onChange={(e)=>setName(e.target.value)}
            className="w-[100%]  p-3 text-[14px] border border-gray-300 rounded-[5px] outline-none"
            type="text"
            placeholder={language?.searchByDivisionName[1]}
          />}
         
        </div>

       
        <div className="w-[100%] col-span-1">
          <select
            onChange={(e)=>setStatus(e.target.value)}
            className="w-[100%]  p-3 text-[14px] border border-gray-300 rounded-[5px] outline-none"
            type="text"
          >
             <option value={""}>
            {translationState?.lan ==="En" && language?.searchByStatus[0]}
            {translationState?.lan ==="Am" && language?.searchByStatus[1]}
            </option>
            <option value={"active"}>
            {translationState?.lan ==="En" && language?.active[0]}
            {translationState?.lan ==="Am" && language?.active[1]}
            </option>
            <option value={"inactive"}>
            {translationState?.lan ==="En" && language?.inactive[0]}
            {translationState?.lan ==="Am" && language?.inactive[1]}
            </option>
          </select>
        </div>
      </div>

      {divisionList?.loading ? (
              <div></div>
            ) : (
              divisionList?.divisions?.divisions?.length > 0 &&
              divisionList?.divisions?.totalPages && (
                <div className="w-[95%] mx-auto flex justify-end items-center my-[20px] gap-5">
                  <button
                    onClick={handlePrevious}
                    className="mx-1 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:w-[20px] max-lg2:h-[20px]"
                  >
                    <IoIosArrowBack />
                  </button>
                  <span className="text-gray-600 font-semibold">
                    {divisionList?.divisions?.currentPage} of{" "}
                    {divisionList?.divisions?.totalPages}
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

{divisionList?.loading ? <Loading addtionalStyle={"flex justify-center items-center my-[20px]"} />:divisionList?.divisions?.divisions?.length===0 ? <div className="w-[100%] flex justify-center items-center my-[30px]">
        <span className="text-[#0C73B8] text-[14px] font-bold">
        {translationState?.lan ==="En" && language?.noDivision[0]}
        {translationState?.lan ==="Am" && language?.noDivision[1]}
        </span>
</div> :  <div className="w-[95%] h-[100%] my-[30px] mx-auto flex justify-between items-center">
        <table className="w-[100%] bg-white">
          <thead className="bg-[#0C73B8] text-white  text-[14px] max-lg2:text-[12px]">
            <tr>
              <th className="px-2 py-4 border-[2px] border-white">#</th>

              <th className="px-2 py-4 border-[2px] border-white">
              {translationState?.lan ==="En" && language?.divisionName[0]}
              {translationState?.lan ==="Am" && language?.divisionName[1]}
              </th>
              <th className="px-2 py-4 border-[2px] border-white">
              {translationState?.lan ==="En" && language?.manager[0]}
              {translationState?.lan ==="Am" && language?.manager[1]}
              </th>
              <th className="px-2 py-4 border-[2px] border-white">
              {translationState?.lan ==="En" && language?.special[0]}
              {translationState?.lan ==="Am" && language?.special[1]}
              </th>
              <th className="px-2 py-4 border-[2px] border-white">
              {translationState?.lan ==="En" && language?.createdAt[0]}
              {translationState?.lan ==="Am" && language?.createdAt[1]}
              </th>
              <th className="px-2 py-4 border-[2px] border-white">
              {translationState?.lan ==="En" && language?.status[0]}
              {translationState?.lan ==="Am" && language?.status[1]}
              </th>
            </tr>
          </thead>
          <tbody className="border [&>*:nth-child(even)]:bg-[#F9F9F9]">
            {divisionList?.divisions?.divisions?.map((division, index) => {
          

              return (
                <tr
                  key={index}
                  onClick={() => navigate(`/divisions/${division?._id}`)}
                  className="text-center border-b border-gray-300 text-gray-600 text-[14px] cursor-pointer max-lg2:text-[12px]"
                >
                  <td className="px-2 py-4 border-[2px] border-white">
                    {index + 1}
                  </td>

                  <td className="px-2 py-4 border-[2px] border-white">
                 
                    {translationState?.lan ==="En" && division?.name_en}
                    {translationState?.lan ==="Am" && division?.name_am}
                  </td>
                  <td className="px-2 py-4 border-[2px] border-white">
                    {division?.manager ? `${division?.manager?.firstname} ${division?.manager?.middlename} ${division?.manager?.lastname}` :"Not Assigned"}

                  </td>
                  <td className="px-2 py-4 border-[2px] border-white">
                 
                  {division?.special ==="yes" ? <>
                      {translationState?.lan ==="En" && language?.yes[0]}
                      {translationState?.lan ==="Am" && language?.yes[1]}
                    </>:<>
                    {translationState?.lan ==="En" && language?.no[0]}
                    {translationState?.lan ==="Am" && language?.no[1]}
                    </>}
                  </td>
                  <td className="px-2 py-4 border-[2px] border-white">
                    {division?.createdAt?.split("T")[0]}
                  </td>
                
                  <td className="px-6 py-2 whitespace-nowrap text-[14px] max-lg2:text-[10px]">
                         {division?.status ==="active" &&  <span
                            className="px-2 py-1 inline-flex leading-5
                      font-semibold  bg-green-600 text-white rounded-[5px]"
                          >
                        {translationState?.lan ==="En" && language?.active[0]}
                        {translationState?.lan ==="Am" && language?.active[1]}
                          </span>}

                          {division?.status ==="inactive" &&  <span
                            className="px-2 py-1 inline-flex leading-5
                      font-semibold  bg-red-600 text-white rounded-[5px]"
                          >
                         {translationState?.lan ==="En" && language?.inactive[0]}
                         {translationState?.lan ==="Am" && language?.inactive[1]}
                          </span>}
                         
                         
                        </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>}
    </div>
  );
}

export default Divisions;
