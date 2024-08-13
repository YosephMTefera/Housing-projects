import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import ServerError from "../ServerError";
import { fetchTeams } from "../../REDUX/slices/teamSlice";
import { fetchAllDirectorate } from "../../REDUX/slices/allDirectorateSlice";
import { useDebounce } from "use-debounce";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


function Team() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const directorateState = useSelector((state) => state?.allDirectorates);
  const teamState = useSelector((state) => state?.teams);
  const [teamName, setTeamName] = useState("");
  const [directorate,setDirectorate] = useState("");
  const [status, setStatus] = useState("");
  const [debouncedName] = useDebounce(teamName,500);
  const [pageNum, setPageNum] = useState(1);
  const [sortingNum, setSortingNum] = useState(-1);

  useEffect(() => {
    dispatch(fetchTeams({page:pageNum,sort:sortingNum,name:debouncedName,directorate,status}));
    dispatch(fetchAllDirectorate());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum,sortingNum,debouncedName,directorate,status]);

  const handlePrevious = () => {
    if (pageNum <= 1) {
      setPageNum(1);
    } else {
      setPageNum(pageNum - 1);
    }
  };

  const handleNext = () => {
    if (pageNum >= teamState?.teams?.totalPages) {
      setPageNum(teamState?.teams?.totalPages);
    } else {
      setPageNum(pageNum + 1);
    }
  };

  if (teamState?.error) return <ServerError />;

  return (
    <div className="w-[95%] mx-auto min-h-[82%] my-[30px] relative bg-white rounded">
      <div className="w-[95%] mx-auto">
        <div className="flex items-center justify-between gap-[10px] text-[#FBB042]">
          <div className="flex items-center justify-start">
            <BiChevronLeft
              onClick={() => navigate(-1)}
              className="text-[40px] cursor-pointer max-lg2:text-[30px]"
            />
            <span className="text-[20px] font-bold max-lg2:text-[16px]">Teams</span>
          </div>

          <div>
            <button
              onClick={() => navigate("/createteamleader")}
              className="px-4 py-2 text-white bg-[#FBB042] rounded text-[15px] border border-[#FBB042] hover:bg-transparent hover:text-[#FBB042] transition duration-500 max-lg2:text-[12px]"
            >
              Add new Team
            </button>
          </div>
        </div>

        <div className="w-[100%]  mx-auto p-2 mt-[20px] grid grid-cols-3 gap-[20px]">
          <div className="w-[100%] col-span-1">
            <input
              onChange={(e) => setTeamName(e?.target?.value)}
              className="w-[100%] p-4 text-[14px] border border-[#FBB042] rounded-[5px] outline-none max-lg2:text-[12px] max-lg2:py-2"
              type="text"
              placeholder="Search by team name"
            />
          </div>

          <div className="w-[100%] col-span-1">
          <select
              onChange={(e) => setDirectorate(e?.target?.value)}
              className="w-[100%]  p-4 text-[14px] border border-[#FBB042] text-gray-500 rounded-[5px] outline-none max-lg2:text-[12px] max-lg2:py-2"
              type="text"
            >
              <option value={""}>Search by directorate</option>
             {directorateState?.directorates?.length !==0 && directorateState?.directorates?.map((directorate,index)=>{
              return <option key={index} value={directorate?._id}>{directorate?.name_am}</option>
             })}
            </select>
          </div>
          <div className="w-[100%] col-span-1">
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


      {teamState?.loading ? (
        <div></div>
      ) : (
        teamState?.teams?.teams?.length > 0 &&
        teamState?.teams?.totalPages && (
          <div className="w-[100%] flex justify-end items-center my-[20px] gap-5">
            <button
              onClick={handlePrevious}
              className="mx-1 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:w-[20px] max-lg2:h-[20px]"
            >
              <IoIosArrowBack />
            </button>
            <span className="text-gray-600 font-semibold">
              {teamState?.teams?.currentPage} of{" "}
              {teamState?.teams?.totalPages}
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

        <div className="w-[100%] min-h-[500px] my-[20px] overflow-auto mt-[30px] mx-auto max-lg2:mt-[10px]">
          {teamState?.loading ? (
            <Loading
              addtionalStyle={"my-[20px] flex justify-center items-center"}
            />
          ) : teamState?.teams?.teams?.length !== 0 ? (
            <table className="w-[100%] max-[1250px]:hidden">
              <thead className="bg-[#0C73B8] text-white  text-[14px] max-lg2:text-[12px]">
                <tr>
                  <th className="px-2 py-4 border-[2px] border-white">#</th>

                  <th className="px-2 py-4 border-[2px] border-white">Name</th>
                  <th className="px-2 py-4 border-[2px] border-white">
                    Directorate
                  </th>
                  <th className="px-2 py-4 border-[2px] border-white">
                    Manager
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
                {teamState?.teams?.teams?.map((team, index) => {
                 
                    
                      return (
                        <tr
                          key={index}
                          onClick={() => navigate(`/team_detail/${team?._id}`)}
                          className="text-center border-b border-gray-300 text-gray-600 text-[14px] cursor-pointer max-lg2:text-[12px]"
                        >
                          <td className="px-4 py-2 border">{index + 1}</td>

                          <td className="px-4 py-2 border capitalize">
                            {team?.name_am}
                          </td>
                          <td className="px-4 py-2 border capitalize">
                            {team?.directorate?.name_am}
                          </td>
                          <td className="px-4 py-2 border">
                           
                            {team?.manager ? `${team?.manager?.firstname} ${team?.manager?.middlename} ${team?.manager?.lastname}`:'Not Assigned'}
                          </td>

                          
                         

                          <td className="px-4 py-2 border">
                            {new Date(team?.createdAt)?.toDateString()} 
                            
                          </td>

                          <td className="px-4 py-2 border text-[14px] max-lg2:text-[10px]">
                            {team?.status === "active" && (
                              <span className="p-2 rounded-[5px] bg-green-600 text-white">
                                active
                              </span>
                            )}
                            {team?.status === "inactive" && (
                              <span className="p-2 rounded-[5px] bg-red-600 text-white">
                                inactive
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-2 border flex justify-center items-center gap-[20px]">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/editteamleader/${team?._id}`);
                              }}
                              className="bg-[#0C73B8] text-white text-[14px] py-2 px-4 rounded-[5px] max-lg2:text-[10px]"
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
              <span className="text-3xl text-[#0C73B8] max-lg2:text-xl">No teams found</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Team;
