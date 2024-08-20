import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { fetchDirectorate } from "../../REDUX/slices/directorateSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import { useDebounce } from "use-debounce";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ServerError from "../ServerError";
import { fetchAllDivision } from "../../REDUX/slices/allDivisionsSlice";


function Directorate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const directorateState = useSelector((state) => state?.directorates);
  const divisionState = useSelector((state)=>state?.allDivisions);
  const [directorateName, setDirectorateName] = useState("");
  const [division,setDivision] = useState("");
  const [status, setStatus] = useState("");
  const [debouncedName] = useDebounce(directorateName,500);
  const [pageNum, setPageNum] = useState(1);
  const [sortingNum, setSortingNum] = useState(-1);

  useEffect(() => {
  
    dispatch(fetchDirectorate({page:pageNum,sort:sortingNum,status,searchName:debouncedName,division}));
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum,sortingNum,status,debouncedName,division]);

  useEffect(()=>{
    dispatch(fetchAllDivision())
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  const filterActiveDivision = divisionState?.divisions?.filter((div)=>div?.status ==="active");
  // const filerNotSpecial = filterActiveDivision?.filter((div)=>div?.special ==="no");

  const handlePrevious = () => {
    if (pageNum <= 1) {
      setPageNum(1);
    } else {
      setPageNum(pageNum - 1);
    }
  };

  const handleNext = () => {
    if (pageNum >= directorateState?.directorates?.totalPages) {
      setPageNum(directorateState?.directorates?.totalPages);
    } else {
      setPageNum(pageNum + 1);
    }
  };


  if(directorateState.error) return <ServerError />
  return (
    <div className="w-[95%] mx-auto h-[82%] mt-[30px] bg-white rounded">
      <div className="w-[95%] mx-auto">
        <div className="flex items-center justify-between gap-[10px]  text-[#FBB042]">
          <div className="flex items-center justify-start">
            <BiChevronLeft
              onClick={() => navigate(-1)}
              className="text-[40px] cursor-pointer max-lg2:text-[30px]"
            />
            <span className="text-[20px] font-bold max-lg2:text-[16px]">Directorate</span>
          </div>

          <div className="flex items-center gap-[20px]">
            <button
              onClick={() => navigate("/createdirectorate")}
              className="px-4 py-2 text-white bg-[#FBB042] rounded text-[15px] border border-[#FBB042] hover:bg-transparent hover:text-[#FBB042] transition duration-500 max-lg2:text-[12px]"
            >
              Add new directorate
            </button>
          </div>
        </div>

        <div className="w-[100%] mx-auto p-2 mt-[20px] grid grid-cols-3 gap-[20px]">
         
          <div className="w-[100%]">
            <input
              onChange={(e) => setDirectorateName(e?.target?.value)}
              className="w-[100%]  p-4 text-[14px] border border-[#FBB042] rounded-[5px] outline-none max-lg2:text-[12px] max-lg2:py-2 "
              type="text"
              placeholder="Search by directorate name"
            />
          </div>
          <div className="w-[100%] col-span-1">
        <select
        onChange={(e)=>setDivision(e.target.value)}
        className="w-[100%]  p-4 text-[14px] border text-gray-500 border-[#FBB042] rounded-[5px] outline-none max-lg2:text-[12px] max-lg2:p-2"
      
      >
        <option value={""}>Search by division</option>
       {filterActiveDivision?.map((division,index)=>{

        return <option key={index} value={division?._id}>{division?.name_am}</option>
       })}
      
      </select>
        </div>
          <div className="w-[100%]">
            <select
              onChange={(e) => setStatus(e?.target?.value)}
              className="w-[100%]  p-4 text-[14px] border border-[#FBB042] rounded-[5px] outline-none max-lg2:text-[12px] max-lg2:py-2 "
              type="text"
            >
              <option value={""}>Search by Status</option>
              <option value={"active"}>Active</option>
              <option value={"inactive"}>Inactive</option>
            </select>
          </div>
        </div>

        
        {directorateState?.loading ? (
        <div></div>
      ) : (
        directorateState?.directorates?.directorates?.length > 0 &&
        directorateState?.directorates?.totalPages && (
          <div className="w-[100%] flex justify-end items-center my-[20px] gap-5">
            <button
              onClick={handlePrevious}
              className="mx-1 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:w-[20px] max-lg2:h-[20px]"
            >
              <IoIosArrowBack />
            </button>
            <span className="text-gray-600 font-semibold">
              {directorateState?.directorates?.currentPage} of{" "}
              {directorateState?.directorates?.totalPages}
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

        {directorateState?.loading ? (
          <Loading addtionalStyle={"flex my-[20px] justify-center items-center"} />
        ) : directorateState?.directorates?.directorates?.length !== 0 ? (
          <table className="w-[100%] my-[30px]">
            <thead className="bg-[#0C73B8] text-white  text-[14px] max-lg2:text-[12px]">
              <tr>
                <th className="px-2 py-4 border-[2px] border-white">#</th>

                <th className="px-2 py-4 border-[2px] border-white">Name</th>
                <th className="px-2 py-4 border-[2px] border-white">
                  Division
                </th>
                <th className="px-2 py-4 border-[2px] border-white">Manager</th>
                <th className="px-2 py-4 border-[2px] border-white">
                  Created By
                </th>
               
                <th className="px-2 py-4 border-[2px] border-white">Status</th>
                <th className="px-2 py-4 border-[2px] border-white">Action</th>
              </tr>
            </thead>
            <tbody className="border [&>*:nth-child(even)]:bg-[#F9F9F9]">
              {directorateState?.directorates?.directorates?.map((directorate, index) => {
            

                    return (
                      <tr
                        key={index}
                        onClick={() =>
                          navigate(`/directorate/${directorate?._id}`)
                        }
                        className="text-center border-b border-gray-300 text-gray-600 text-[14px] cursor-pointer max-lg2:text-[12px]"
                      >
                        <td className="py-2 px-4 border">{index + 1}</td>

                        <td className="py-2 px-4 border capitalize">
                          {directorate?.name_am}
                        </td>
                        <td className="py-2 px-4 border capitalize">{directorate?.division?.name_am}</td>
                        <td className="py-2 px-4 border">
                          {directorate?.manager ? `${directorate?.manager?.firstname} ${directorate?.manager?.middlename} ${directorate?.manager?.lastname}`:'Not Assigned'}
                       
                        </td>
                     
                        <td className="py-2 px-4 border">
                          {directorate?.createdBy?.firstname} {directorate?.createdBy?.middlename} {directorate?.createdBy?.lastname}
                        </td>
                       
                        <td className="py-2 px-4 border text-[14px] max-lg2:text-[10px]">
                          {directorate?.status === "active" && (
                            <span className="p-2 rounded-[5px] bg-green-600  text-white">
                              active
                            </span>
                          )}
                          {directorate?.status === "inactive" && (
                            <span className="p-2 rounded-[5px] bg-red-600  text-white">
                              inactive
                            </span>
                          )}
                        </td>

                        <td className="py-2 px-4 border flex items-center justify-center gap-[20px] text-[14px] max-lg2:text-[12px]">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/editdirectorate/${directorate?._id}`);
                            }}
                            className="bg-[#0C73B8] text-white  py-2 px-4 rounded-[5px]"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        ) : (
          <div className="uppercase w-[100%] h-[300px] flex items-center justify-center mt-12">
            <span className="text-3xl text-[#0C73B8] max-lg2:text-xl">
              No result found
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Directorate;
