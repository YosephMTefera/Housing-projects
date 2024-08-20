import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchArchivalUsers } from "../../REDUX/slices/archivalUsersSlice";
import Loading from "../Loading";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDebounce } from "use-debounce";

function ArchvialUsers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const archvialUsersState = useSelector((state) => state?.archivalUsers);
  const [username, setUsername] = useState("");
  const [phone,setPhone] = useState("")
  const [status, setStatus] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [sortingNum, setSortingNum] = useState(-1);
  const [debouncedUsername] = useDebounce(username, 500);
  const [debouncedPhone] = useDebounce(phone,500)

  useEffect(() => {
    dispatch(fetchArchivalUsers({page:pageNum,sort:sortingNum,status,username:debouncedUsername,phone:debouncedPhone}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum,sortingNum,status,debouncedUsername,debouncedPhone]);


  const handlePrevious = () => {
    if (pageNum <= 1) {
      setPageNum(1);
    } else {
      setPageNum(pageNum - 1);
    }
  };

  const handleNext = () => {
    if (pageNum >= archvialUsersState?.archivalUsers?.totalPages) {
      setPageNum(archvialUsersState?.archivalUsers?.totalPages);
    } else {
      setPageNum(pageNum + 1);
    }
  };
  return (
    <div className="w-[95%] mx-auto h-[82%] mt-[30px] relative bg-white rounded">
      <div className="w-[95%] mx-auto">
        <div className="flex items-center justify-between gap-[10px]  text-[#FBB042]">
          <div className="flex items-center justify-start">
            <BiChevronLeft
              className="text-[40px] cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <span className="text-[20px] font-bold max-lg2:text-[16px]">Archival Users</span>
          </div>

          <div>
            <button
              onClick={() => navigate("/createarchivaluser")}
              className="px-4 py-2 text-white bg-[#FBB042] rounded text-[15px] border border-[#FBB042] hover:bg-transparent hover:text-[#FBB042] transition duration-500 max-lg2:text-[12px]"
            >
              Create archival user
            </button>
          </div>
        </div>

        <div className="w-[100%]  mx-auto p-2 mt-[20px] grid grid-cols-3 gap-[20px]">
          <div className="w-[100%] col-span-1">
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="w-[100%]  p-4 text-[14px] border border-[#FBB042] rounded-[5px] outline-none max-lg2:text-[12px] max-lg2:p-2"
              type="text"
              placeholder="Search by username"
            />
          </div>
          <div className="w-[100%] col-span-1">
            <input
              onChange={(e) => setPhone(e.target.value)}
              className="w-[100%]  p-4 text-[14px] border border-[#FBB042] rounded-[5px] outline-none max-lg2:text-[12px] max-lg2:p-2"
              type="text"
              placeholder="Search by phone"
            />
          </div>

          
          <div className="w-[100%] col-span-1">
            <select
              onChange={(e) => setStatus(e.target.value)}
              className="w-[100%]  p-4 text-[14px] border text-gray-500 border-[#FBB042] rounded-[5px] outline-none max-lg2:text-[12px] max-lg2:p-2"
            
            >
              <option value={""}>Search by Status</option>
              <option value={"active"}>Active</option>
              <option value={"inactive"}>Inactive</option>
            </select>
          </div>
        </div>

        {archvialUsersState?.loading ? (
        <div></div>
      ) : (
        archvialUsersState?.archivalUsers?.archivalusers?.length > 0 &&
        archvialUsersState?.archivalUsers?.totalPages && (
          <div className="w-[100%] flex justify-end items-center my-[20px] gap-5">
            <button
              onClick={handlePrevious}
              className="mx-1 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:w-[20px] max-lg2:h-[20px]"
            >
              <IoIosArrowBack />
            </button>
            <span className="text-gray-600 font-semibold">
              {archvialUsersState?.archivalUsers?.currentPage} of{" "}
              {archvialUsersState?.archivalUsers?.totalPages}
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

        <div className="w-[100%] overflow-auto hide-scroll-bar max-h-[700px]  mt-[30px] mx-auto">
          {archvialUsersState?.loading ? (
            <Loading addtionalStyle={"flex justify-center items-center"} />
          ) : archvialUsersState?.archivalUsers?.archivalusers?.length !== 0 ? (
            <table className="w-[100%]">
              <thead className="bg-[#0C73B8] text-white text-[14px]  sticky top-0 z-10 whitespace-nowrap">
                <tr className="text-[14px] max-lg2:text-[10px]">
                  <th className="px-2 py-4 border-[2px] border-white">#</th>
                  <th className="px-2 py-4 border-[2px] border-white">
                    Profile
                  </th>
                  <th className="px-2 py-4 border-[2px] border-white">
                    Full Name
                  </th>
                  <th className="px-2 py-4 border-[2px] border-white">
                    Username
                  </th>
                
                  <th className="px-2 py-4 border-[2px] border-white">Phone</th>
                 
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
              
                  {archvialUsersState?.archivalUsers?.archivalusers?.map((au, index) => {
                      return (
                        <tr
                          key={index}
                          onClick={()=>navigate(`/archivalUsers/${au?._id}`)}
                          className="text-center border-b border-gray-300 text-gray-600 text-[14px] whitespace-nowrap cursor-pointer max-lg2:text-[12px]"
                        >
                          <td className="py-2">{index + 1}</td>
                          <td className="py-2 px-6  flex justify-center items-center">
                            {au?.picture ? (
                              <div className="w-[50px] h-50px] bg-">
                                <img
                                  className="w-[50px] h-[50px] rounded-full object-cover pointer-events-none"
                                  src={`${process.env.REACT_APP_BACKEND_IMAGES}/ArchivalUserImages/${au?.picture}`}
                                  alt=""
                                />
                              </div>
                            ) : (
                              <div className="w-[50px] h-[50px]">
                                <span>{au?.firstname?.[0]}</span>
                              </div>
                            )}
                          </td>
                          <td className="py-2  px-6  border">
                            {au?.firstname} {au?.middlename} {au?.lastname}
                          </td>

                          <td className="py-2  px-6  border">{au?.username}</td>
                     
                          <td className="py-2  px-6  border">{au?.phone}</td>
                         
                          <td className="py-2 px-6   border">
                            {new Date(au?.createdAt)?.toDateString()}{" "}
                            {/* {new Date(au?.createdAt)?.toLocaleTimeString()} */}
                          </td>
                          <td className="py-2  px-6  border text-[14px] max-lg2:text-[12px]">
                            {au?.status === "active" && (
                              <span className="p-2 rounded-[5px] text-green-600  font-bold">
                                active
                              </span>
                            )}
                            {au?.status === "inactive" && (
                              <span className="p-2 rounded-[5px] text-red-600  font-bold">
                                inactive
                              </span>
                            )}
                          </td>
                          <td className="py-2 border text-[14px] max-lg2:text-[12px]">
                            <button
                              onClick={(e) =>{
                                e.stopPropagation();
                                navigate(`/editarchivaluser/${au?._id}`);}
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
            <div className="uppercase w-[100%] h-[200px] flex items-center justify-center mt-12 max-lg2:mt-5">
              <span className="text-3xl text-[#0C73B8] font-bold max-lg2:text-xl">
                No result found
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArchvialUsers;
