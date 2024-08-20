import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOfficeUsers } from "../../REDUX/slices/officeUsersSlice";
import Loading from "../Loading";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDebounce } from "use-debounce";
import { fetchAllDivision } from "../../REDUX/slices/allDivisionsSlice";
function Adminstrator() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const divisionsList = useSelector((state) => state?.allDivisions);
  const officeUsersState = useSelector((state) => state?.officeUsers);
  const [username, setUsername] = useState("");
  const [level, setLevel] = useState("");
  const [status, setStatus] = useState("");
  const [division,setDivision] = useState("");
  const [phone,setPhone] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [sortingNum, setSortingNum] = useState(-1);
  const [debouncedUsername] = useDebounce(username, 500);
  const [debouncedPhone] = useDebounce(phone,500)


  useEffect(() => {
    dispatch(fetchOfficeUsers({page:pageNum,sort:sortingNum,status,username:debouncedUsername,division,level,phone:debouncedPhone}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum,sortingNum,debouncedUsername,division,level,debouncedPhone]);

useEffect(()=>{
  dispatch(fetchAllDivision())
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
 

  const handlePrevious = () => {
    if (pageNum <= 1) {
      setPageNum(1);
    } else {
      setPageNum(pageNum - 1);
    }
  };

  const handleNext = () => {
    if (pageNum >= officeUsersState?.officeUsers?.totalPages) {
      setPageNum(officeUsersState?.officeUsers?.totalPages);
    } else {
      setPageNum(pageNum + 1);
    }
  };

  

  return (
    <div className="w-[95%] mx-auto max-h-[85%] mt-[30px] relative bg-white rounded">
      <div className="w-[95%] mx-auto">
        <div className="flex items-center justify-between gap-[10px]  text-[#FBB042]">
          <div className="flex items-center justify-start">
            <BiChevronLeft
              className="text-[40px] cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <span className="text-[20px] font-bold max-lg2:text-[16px]">Administrators</span>
          </div>

          <div>
            <button
              onClick={() => navigate("/createadminstrator")}
              className="py-2 px-4 text-white bg-[#FBB042] rounded text-[15px] border border-[#FBB042] hover:bg-transparent hover:text-[#FBB042] transition duration-500 max-lg2:text-[12px]"
            >
              Create Adminstrator
            </button>
          </div>
        </div>

        <div className="w-[100%]   mx-auto p-2 mt-[20px] grid grid-cols-3 gap-[20px] max-[650px]:justify-between">
          <div className="w-[100%] h-[90%] col-span-1">
            <input
              onChange={(e) => setUsername(e?.target?.value)}
              className="w-[100%]  p-4 text-[14px] border border-[#FBB042] rounded-[5px] outline-none max-lg2:p-2 max-lg2:text-[12px]"
              type="text"
              placeholder="Search by username"
            />
          </div>
          <div className="w-[100%] h-[90%] col-span-1">
            <input
              onChange={(e) => setPhone(e?.target?.value)}
              className="w-[100%]  p-4 text-[14px] border border-[#FBB042] rounded-[5px] outline-none max-lg2:p-2 max-lg2:text-[12px]"
              type="text"
              placeholder="Search by phone"
            />
          </div>

          
          <div className="w-[100%] h-[90%] col-span-1">
            <select
              onChange={(e) => setDivision(e?.target?.value)}
              className="w-[100%]  p-4 text-[14px] border border-[#FBB042] text-gray-500 rounded-[5px] outline-none max-lg2:p-2 max-lg2:text-[12px]"
              type="text"
            >
              <option value={""}>Search by division</option>
              {divisionsList?.divisions?.map((division,index)=>{
                return     <option key={index} value={division?._id}>{division?.name_am}</option>
              })}
         
            </select>
          </div>

          <div className="w-[100%] h-[90%] col-span-1">
            <select
              onChange={(e) => setLevel(e?.target?.value)}
              className="w-[100%]  p-4 text-[14px] border border-[#FBB042] text-gray-500 rounded-[5px] outline-none max-lg2:p-2 max-lg2:text-[12px]"
              type="text"
            >
              <option value={""}>Search by Level</option>
              <option value={"MainExecutive"}>Main Executive</option>
              <option value={"DivisionManagers"}>Division Managers</option>
              <option value={"Directors"}>Directors</option>
              <option value={"TeamLeaders"}>Team Leaders</option>
              <option value={"Professionals"}>Professionals</option>
            </select>
          </div>
          <div className="w-[100%] h-[90%] col-span-1">
            <select
              onChange={(e) => setStatus(e?.target?.value)}
              className="w-[100%]  p-4 text-[14px] border border-[#FBB042] text-gray-500 rounded-[5px] outline-none max-lg2:p-2 max-lg2:text-[12px]"
              type="text"
            >
              <option value={""}>Search by Status</option>
              <option value={"active"}>Active</option>
              <option value={"inactive"}>Inactive</option>
            </select>
          </div>
        </div>

        {officeUsersState?.loading ? (
        <div></div>
      ) : (
        officeUsersState?.officeUsers?.officeusers?.length > 0 &&
        officeUsersState?.officeUsers?.totalPages && (
          <div className="w-[100%] flex justify-end items-center my-[20px] gap-5">
            <button
              onClick={handlePrevious}
              className="mx-1 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:w-[20px] max-lg2:h-[20px]"
            >
              <IoIosArrowBack />
            </button>
            <span className="text-gray-600 font-semibold">
              {officeUsersState?.officeUsers?.currentPage} of{" "}
              {officeUsersState?.officeUsers?.totalPages}
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

        <div className="w-[100%] overflow-auto hide-scroll-bar max-h-[600px] my-[30px] mx-auto max-lg2:mt-[10px]">
          {officeUsersState?.loading ? (
            <Loading addtionalStyle={"flex justify-center items-center"} />
          ) : officeUsersState?.officeUsers?.officeusers?.length !== 0 ? (
            <table className="w-[100%] max-lg1:hidden">
              <thead className="bg-[#0C73B8] text-white text-[14px] sticky top-0 z-10">
                <tr className="max-lg2:text-[12px]">
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
                  <th className="px-2 py-4 border-[2px] border-white">Email</th>
                  <th className="px-2 py-4 border-[2px] border-white">
                    Gender
                  </th>
                  <th className="px-2 py-4 border-[2px] border-white">Level</th>
                  <th className="px-2 py-4 border-[2px] border-white">
                    Status
                  </th>
                  <th className="px-2 py-4 border-[2px] border-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="border [&>*:nth-child(even)]:bg-[#F9F9F9]">
                {officeUsersState?.officeUsers?.officeusers?.map((ou, index) => {
                      return (
                        <tr
                          key={index}
                          onClick={() => navigate(`/administrators/${ou?._id}`)}
                          className="text-center border-b border-gray-300 text-gray-600 cursor-pointer text-[14px] max-lg2:text-[12px]"
                        >
                          <td className="py-2">{index + 1}</td>
                          <td className="py-2  flex justify-center items-center">
                            {ou?.picture ? (
                              <div className="w-[50px] h-50px] bg-">
                                <img
                                  className="w-[50px] h-[50px] rounded-full object-cover pointer-events-none"
                                  src={`${process.env.REACT_APP_BACKEND_IMAGES}/OfficeUserImages/${ou?.picture}`}
                                  alt=""
                                />
                              </div>
                            ) : (
                              <div className="w-[50px] h-[50px]">
                                <span>{ou?.firstname?.[0]}</span>
                              </div>
                            )}
                          </td>
                          <td className="py-2 border">
                            {ou?.firstname} {" "} {ou?.middlename} {" "} {ou?.lastname}
                          </td>

                          <td className="py-2 border">{ou?.username}</td>
                          <td className="py-2 border">{ou?.email}</td>
                          <td className="py-2 border">{ou?.gender}</td>
                          <td className="py-2 border">{ou?.level}</td>
                          <td className="py-2 border text-[14px] max-lg2:text-[12px]">
                            {ou?.status === "active" && (
                              <span className="p-2 rounded-[5px] bg-green-600  text-white">
                                active
                              </span>
                            )}
                            {ou?.status === "inactive" && (
                              <span className="p-2 rounded-[5px] bg-red-600  text-white">
                                inactive
                              </span>
                            )}
                          </td>
                          <td className="py-2 border text-[14px] max-lg2:text-[12px]">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/editadminstrator/${ou?._id}`);
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
              <span className="text-5xl text-gray-700">
                No administrators available
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Adminstrator;
