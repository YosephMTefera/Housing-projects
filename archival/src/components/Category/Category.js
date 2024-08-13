import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchArchivalCategory } from "../../REDUX/slices/archivalCategorySlice";
import Loading from "../Loading";
import { FaFolder } from "react-icons/fa";
import { language } from "../../utils/part-1lan";
import { useDebounce } from "use-debounce";
import ServerError from "../ServerError";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
function Category() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translationState = useSelector((state)=>state?.translation);
  const archivalList = useSelector((state) => state?.archivalCategory);
  const [name,setName] = useState("");
  const [debouncedName] = useDebounce(name,500)
  const [status,setStatus] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [sortingNum, setSortingNum] = useState(-1);
  useEffect(() => {
    dispatch(fetchArchivalCategory({page:pageNum,sort:sortingNum,name:debouncedName,status}));
    // eslint-disable-next-line
  }, [pageNum,sortingNum,debouncedName,status]);

  const handlePrevious = () => {
    if (pageNum <= 1) {
      setPageNum(1);
    } else {
      setPageNum(pageNum - 1);
    }
  };

  const handleNext = () => {
    if (pageNum >= archivalList?.archivalCategories?.totalPages) {
      setPageNum(archivalList?.archivalCategories?.totalPages);
    } else {
      setPageNum(pageNum + 1);
    }
  };

  if (archivalList?.error) return <ServerError />;



  return (
    <div className="w-[100%] bg-white overflow-hidden">
      <div className="w-[95%] my-[30px] mx-auto">
        <div className="flex pb-4 justify-between items-center border-b">
          <span className="text-[#0C73B8] font-bold text-[20px] max-lg2:text-[16px]">
          {translationState?.lan ==="En" &&    <span>{language?.archivalCategory[0]}</span>}
          {translationState?.lan ==="Am" &&    <span>{language?.archivalCategory[1]}</span>}
          </span>
          <button
            onClick={() => navigate("/letters/archive/create")}
            className="py-2 px-4 rounded-[5px] bg-[#0C73B8] text-[14px] text-white font-bold max-lg2:text-[10px]"
          >
             {translationState?.lan ==="En" &&    <span>{language?.createCategory[0]}</span>}
             {translationState?.lan ==="Am" &&    <span>{language?.createCategory[1]}</span>}
          </button>
        </div>
        <div className="w-[100%] my-[20px] flex justify-between items-center gap-[20px]">
          <div className="w-[50%] flex items-center gap-[20px]">
            <div className="w-[50%] border border-gray-300 p-3 flex items-center gap-[10px] rounded-[5px]">
              <CiSearch className="text-[24px] text-gray-500" />
              {translationState?.lan ==="En" &&   <input
                type="text"
                placeholder={language?.searchByname[0]}
                onChange={(e)=>setName(e.target.value)}
                className="flex-1 bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
              />}
              {translationState?.lan ==="Am" &&    <input
                type="text"
                placeholder={language?.searchByname[1]}
                onChange={(e)=>setName(e.target.value)}
                className="flex-1 bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
              />}
              
            </div>
            <div className="w-[50%] border border-gray-300 p-3 rounded-[5px]">
              <select onChange={(e)=>setStatus(e.target.value)} className="w-[100%]  bg-transparent text-gray-500 outline-none text-[14px] max-lg2:text-[12px]">
                <option>
                {translationState?.lan ==="En" && language?.status[0]}
                {translationState?.lan ==="Am" &&   language?.status[1]}
                </option>
                <option value={"active"}>
                {translationState?.lan ==="En" && language?.active[0]}
                {translationState?.lan ==="Am" && language?.active[1]}
                </option>
                <option value={"inactive"}>
                {translationState?.lan ==="En" &&  language?.inactive[0]}
                {translationState?.lan ==="Am" &&  language?.inactive[1]}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div>
          {archivalList?.loading ? (
            <div></div>
          ) : (
            archivalList?.archivalCategories?.archivalCategories?.length > 0 &&
            archivalList?.archivalCategories?.totalPages && (
              <div className="w-[100%] flex justify-end items-center my-[20px] gap-5">
                <button
                  onClick={handlePrevious}
                  className="mx-1 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:w-[20px] max-lg2:h-[20px]"
                >
                  <IoIosArrowBack />
                </button>
                <span className="text-gray-600 font-semibold">
                  {archivalList?.archivalCategories?.currentPage} of{" "}
                  {archivalList?.archivalCategories?.totalPages}
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
                    </option>
                    <option value={1}>
                      {translationState?.lan === "En" && language?.oldest[0]}
                      {translationState?.lan === "Am" && language?.oldest[1]}
                    </option>
                  </select>
                </div>
              </div>
            )
          )}
        </div>
        {/* table */}
        {archivalList?.loading ? <Loading addtionalStyle={"flex justify-center items-center my-[20px]"}/>:archivalList?.archivalCategories?.archivalCategories?.length ===0 ? <div>
          <span>
          {translationState?.lan ==="En" &&    <span>{language?.noArchivalCategory[0]}</span>}
          {translationState?.lan ==="Am" &&    <span>{language?.noArchivalCategory[1]}</span>}
          </span>
        </div>:  <div className="w-[100%] grid grid-cols-4 gap-[10px]">
          {archivalList?.archivalCategories?.archivalCategories?.map((category,index)=>{

            return <div key={index} onClick={()=>navigate(`/letters/archive/${category?._id}`)} className="w-[100%] min-h-[150px] col-span-1 p-2 flex justify-center items-center border border-[#d3d2d2] cursor-pointer rounded-[10px]">
                    <div className="w-[90%] mx-auto flex flex-col items-center gap-[10px]">
                          <div className="w-[50px] h-[50px] bg-[#d4ecfc] text-[#0C73B8] flex justify-center items-center rounded-full">
                      <FaFolder />
                      </div>
                      <div className="flex justify-center items-center text-[14px] text-[#0C73B8] font-bold">
                        {translationState?.lan ==="En" &&    <span>{category?.name_en}</span>}
                        {translationState?.lan ==="Am" &&    <span>{category?.name_am}</span>}
                     

                      </div>

                    </div>
            </div>
          })}

</div>}
   
      </div>
    </div>
  );
}

export default Category;
