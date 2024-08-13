import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDivision } from "../../REDUX/slices/divisionSlice";
import Loading from "../Loading";
import { useDebounce } from "use-debounce";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ServerError from "../ServerError";

function Division() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const divisionState = useSelector((state) => state?.divisions);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [sortingNum, setSortingNum] = useState(-1);
  const [debouncedName] = useDebounce(name,500);
  const [debouncedStatus] = useDebounce(status,500)

  useEffect(() => {
    dispatch(fetchDivision({page:pageNum,sort:sortingNum,name:debouncedName,status:debouncedStatus}));
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum,sortingNum,debouncedName,debouncedName,debouncedStatus]);


  const handlePrevious = () => {
    if (pageNum <= 1) {
      setPageNum(1);
    } else {
      setPageNum(pageNum - 1);
    }
  };

  const handleNext = () => {
    if (pageNum >= divisionState?.divisions?.totalPages) {
      setPageNum(divisionState?.divisions?.totalPages);
    } else {
      setPageNum(pageNum + 1);
    }
  };
 

  if(divisionState?.error) return <ServerError />
  return (
    <div className="w-[95%] mx-auto h-[82%] mt-[30px] bg-white rounded">
      <div className="w-[95%] mx-auto">
        <div className="flex items-center justify-between gap-[10px]  text-[#FBB042]">
          <div className="flex items-center justify-start">
            <BiChevronLeft
              onClick={() => navigate(-1)}
              className="text-[40px] cursor-pointer max-lg2:text-[30px]"
            />
            <span className="text-[20px] font-bold max-lg2:text-[16px]">Divisions</span>
          </div>

          <div>
            <button
              onClick={() => navigate("/createdivision")}
              className="px-4 py-2 text-white bg-[#FBB042] rounded text-[15px] border border-[#FBB042] hover:bg-transparent hover:text-[#FBB042] transition duration-500 max-lg2:text-[12px]"
            >
              Add new division
            </button>
          </div>
        </div>

        <div className="w-[100%] mx-auto p-2 mt-[20px] grid grid-cols-3 gap-[20px]">
          <div className="w-[100%] col-span-1">
            <input
              onChange={(e) => setName(e?.target?.value)}
              className="w-[100%]  p-4 text-[14px] border border-[#FBB042] rounded-[5px] outline-none max-lg2:py-2 max-lg2:text-[12px]"
              type="text"
              placeholder="Search by division name"
            />
          </div>
         
          <div className="w-[100%]">
            <select
              onChange={(e) => setStatus(e?.target?.value)}
              className="w-[100%]  p-4 text-[14px] border border-[#FBB042] text-gray-500 rounded-[5px] outline-none max-lg2:text-[12px] max-lg2:py-2"
              type="text"
            >
              <option value={""}>Search by Status</option>
              <option value={"active"}>Active</option>
              <option value={"inactive"}>Inactive</option>
            </select>
          </div>
        </div>



      
        {divisionState?.loading ? (
        <div></div>
      ) : (
        divisionState?.divisions?.divisions?.length > 0 &&
        divisionState?.divisions?.totalPages && (
          <div className="w-[100%] flex justify-end items-center my-[20px] gap-5">
            <button
              onClick={handlePrevious}
              className="mx-1 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:w-[20px] max-lg2:h-[20px]"
            >
              <IoIosArrowBack />
            </button>
            <span className="text-gray-600 font-semibold">
              {divisionState?.divisions?.currentPage} of{" "}
              {divisionState?.divisions?.totalPages}
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


        {divisionState?.loading ? (
          <Loading
            addtionalStyle={"my-[20px] flex justify-center items-center"}
          />
        ) : (
          <div className="w-[100%] overflow-auto max-h-[700px] mt-[30px] mx-auto">
            {divisionState?.divisions?.divisions?.length !== 0 ? (
              <table className="w-[100%]">
                <thead className="bg-[#0C73B8] text-white  text-[14px] max-lg2:text-[12px]">
                  <tr>
                    <th className="px-2 py-4 border-[2px] border-white">#</th>

                    <th className="px-2 py-4 border-[2px] border-white">
                      Name
                    </th>
                    <th className="px-2 py-4 border-[2px] border-white">
                      Manager
                    </th>
                    <th className="px-2 py-4 border-[2px] border-white">
                      Special
                    </th>
                    <th className="px-2 py-4 border-[2px] border-white">
                      Created By
                    </th>
                    <th className="px-2 py-4 border-[2px] border-white">
                      Created Date
                    </th>
                   
                    <th className="px-2 py-4 border-[2px] border-white">
                      Status
                    </th>
                    <th className="px-2 py-4 border-[2px] border-white">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="border [&>*:nth-child(even)]:bg-[#F9F9F9]">
                  {divisionState?.divisions?.divisions?.map((fd, index) => {
                               
                        return (
                          <tr
                            key={index}
                            className="text-center border-b border-gray-300 text-gray-600 text-[14px] max-lg2:text-[12px]"
                          >
                            <td className="py-2 border">{index + 1}</td>
                            <td className="py-2 border">
                              {/* {translationState?.lan==="En" && fd?.name_en}
                              {translationState?.lan==="አማ" && fd?.name_am} */}
                              {fd?.name_am}
                           
                              </td>
                            <td className="py-2 border">
                              {fd?.manager ? `${fd?.manager?.firstname} ${fd?.manager?.middlename} ${fd?.manager?.lastname}` : "Not Assigned"} 
                            </td>
                            <td className="py-2 border">
                              {fd?.special ==="yes" ? "Yes":"No"} 
                            </td>
                            <td className="py-2 border">
                             {fd?.createdBy?.firstname}  {fd?.createdBy?.middlename}  {fd?.createdBy?.lastname}
                            </td>

                            <td className="py-2 border">
                              {new Date(fd?.createdAt)?.toDateString()}
                            </td>
                            {/* <td className="py-2 border">
                              {new Date(fd?.createdAt)?.toLocaleTimeString()}
                            </td> */}
                            <td className="py-2 border text-[14px] max-lg2:text-[12px] font-bold">
                              {fd?.status === "active" && (
                                <span className="p-2 rounded-[5px] text-green-600">
                                  active
                                </span>
                              )}
                              {fd?.status === "inactive" && (
                                <span className="p-2 rounded-[5px] text-red-600">
                                  inactive
                                </span>
                              )}
                            </td>

                            <td className="py-2 border text-[14px] max-lg2:text-[12px]">
                              <button
                                onClick={() =>
                                  navigate(`/editdivision/${fd?._id}`)
                                }
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
                <span className="text-5xl text-gray-700">
                  No divisions available
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Division;
