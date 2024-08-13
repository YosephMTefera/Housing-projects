import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import { fetchAccusations } from "../REDUX/slices/accusationSlice";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDebounce } from "use-debounce";
import ServerError from "../ServerError";

function Accusations() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accusationState = useSelector((state) => state.accusations);
  const [pageNum, setPageNum] = useState(1);
  const [sortingNum, setSortingNum] = useState(-1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [debouncedName] = useDebounce(name, 500);
  const [debouncedPhone] = useDebounce(phone, 500);

  useEffect(() => {
    dispatch(
      fetchAccusations({
        page: pageNum,
        sort: sortingNum,
        name: debouncedName,
        phone: debouncedPhone,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum, sortingNum, debouncedName, debouncedPhone]);
  const handlePrevious = () => {
    if (pageNum <= 1) {
      setPageNum(1);
    } else {
      setPageNum(pageNum - 1);
    }
  };

  const handleNext = () => {
    if (pageNum >= accusationState?.accusations?.totalPages) {
      setPageNum(accusationState?.accusations?.totalPages);
    } else {
      setPageNum(pageNum + 1);
    }
  };

  console.log("accusationState: ",accusationState)
  if (accusationState.error) return <ServerError />;

  return (
    <div className="w-[100%]  mx-auto bg-white">
      <div className="w-[90%] mx-auto">
        <div className="w-[100%] flex  justify-between items-center">
          <div className=" flex justify-start items-center   text-[#0C73B8] mt-[50px]  font-bold max-lg2:mt-[20px]">
            <BiChevronLeft
              className="text-[30px] cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <span className="text-[20px] max-lg2:text-[16px]">Accusations</span>
          </div>
          <div className="flex items-center gap-[10px] mt-[50px]">
            <span className="font-bold text-[#0C73B8]">Total accusation: </span>
            <span className="text-[14px] text-gray-600">
              {accusationState?.accusations?.totalAccusations}
            </span>
          </div>
        </div>

        <div className="my-[20px]">
          <div className="w-[100%] grid grid-cols-3 gap-[10px]">
            <div className="w-[100%] col-span-1 border border-gray-400 p-3 flex items-center gap-[10px] rounded-[5px] max-lg2:h-[70%]">
              <CiSearch className="text-[24px] text-gray-500 " />
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Search by name"
                className="flex-1 bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
              />
            </div>

            <div className="w-[100%] col-span-1 border border-gray-400 p-3 flex items-center gap-[10px] rounded-[5px] max-lg2:h-[70%]">
              <CiSearch className="text-[24px] text-gray-500 " />
              <input
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Search by phone"
                className="flex-1 bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
              />
            </div>
          </div>
        </div>
        {accusationState?.accusations?.accusations?.length > 0 &&
          accusationState?.accusations?.totalPages && (
            <div className="w-[100%] flex justify-end items-center mb-[20px] gap-5">
              <button
                onClick={handlePrevious}
                className="mx-1 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:h-[20px] max-lg2:w-[20px]"
              >
                <IoIosArrowBack />
              </button>
              <span className="text-gray-600 font-semibold max-lg2:text-[14px]">
                {accusationState?.accusations?.currentPage} of{" "}
                {accusationState?.accusations?.totalPages}
              </span>

              <button
                onClick={handleNext}
                className={
                  "mx-1 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:h-[20px] max-lg2:w-[20px]"
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
          )}
        {/* table */}
        {accusationState?.loading ? (
          <Loading addtionalStyle={"flex justify-center items-center"} />
        ) : accusationState?.accusations?.accusations?.length === 0 ? (
          <div className="flex justify-center items-center my-[30px]">
            <span className="text-[#0C73B8] text-[14px]">
              You have no accusations
            </span>
          </div>
        ) : (
          <div className="my-[30px] grid grid-cols-2 gap-[10px]">
            {accusationState?.accusations?.accusations?.length !== 0 ? (
              accusationState.accusations.accusations?.map(
                (accusation, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => navigate(`/accusation/${accusation?._id}`)}
                      className="w-[100%] col-span-2  flex flex-col  justify-center gap-[10px] border border-dashed border-[#0C73B8] py-6 cursor-pointer  rounded-[10px]"
                    >
                      <div className="w-[90%] mx-auto">
                        <div className="flex items-center gap-[10px]">
                          <span className="font-bold text-[#0C73B8]">
                            {accusation?.subject ? accusation?.subject:"Not provided"}
                          </span>
                          <div className="bg-gray-300 rounded-[5px] text-[12px] py-1 px-4 max-lg2:text-[10px] ">
                            <span className="font-bold  text-gray-600 max-lg2:text-[8px]">
                              {new Date(
                                accusation?.createdAt
                              ).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                        <div className="mt-[20px] flex items-center gap-[20px] text-[14px] max-lg2:text-[12px]">
                          <p className="text-gray-500">
                            {accusation?.description ? accusation?.description:"Not provided"}
                          </p>
                        </div>

                        <div className="mt-[10px] flex items-center gap-[20px] text-[14px] max-lg2:text-[12px]">
                          {accusation?.name && accusation.name !== "" && (
                            <span className="text-gray-500">
                              Name: {accusation?.name ? accusation?.name:"Not Provided"}
                            </span>
                          )}

                          {accusation?.phone && accusation.phone !== "" && (
                            <span className="text-gray-500">
                              Phone: {accusation?.phone ? accusation?.phone:"Not provided"}
                            </span>
                          )}
                          {accusation?.accused_organizational_part &&
                            accusation?.accused_organizational_part !== "" && (
                              <span className="font-bold">
                                Accused department:{" "}
                                {accusation?.accused_organizational_part ? accusation?.accused_organizational_part:"-"}
                              </span>
                            )}
                        </div>

                        <div className="mt-[10px] flex items-center gap-[20px] text-[14px] max-lg2:text-[12px]">
                          <span className="text-gray-500">
                            Created date:{" "}
                            {new Date(
                              accusation?.createdAt
                            ).toLocaleDateString()}
                          </span>
                          {accusation?.attachment &&
                            accusation.attachment !== "" && (
                              <span className="text-gray-500">
                                View attachement:{" "}
                                <span className="text-[#0C73B8] font-bold">
                                  (click to view)
                                </span>
                              </span>
                            )}
                        </div>
                      </div>
                    </div>
                  );
                }
              )
            ) : (
              <div className="w-[90%] min-h-[100px] col-span-3 rounded-[10px]  bg-white mx-auto my-5 flex justify-center items-center">
                <span className="text-[20px] text-[#0C73B8] font-bold">
                  No result found
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Accusations;
