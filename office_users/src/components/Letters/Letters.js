import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { BiChevronLeft } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchForwardLetters } from "../../REDUX/slices/forwardLettersSlice";
import ServerError from "../ServerError";
import Loading from "../Loading";

function Letters() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const letterList = useSelector((state) => state.forwardLetters);

  useEffect(() => {
    dispatch(fetchForwardLetters());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (letterList?.error) return <ServerError />;
  return (
    <div className="w-[95%] my-[30px] mx-auto bg-white rounded-[20px]">
      <div className="w-[90%] my-[30px] mx-auto">
        <div className="w-[100%] flex items-center justify-start   text-[#0C73B8] mt-[50px] mx-auto font-bold">
          <BiChevronLeft
            className="text-[30px] cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <span className="text-[20px]">Forwarded Letters</span>
        </div>
        <div className="my-[20px] flex justify-between items-center">
          <div className="w-[30%] border border-gray-400 p-3 flex items-center gap-[10px] rounded-[5px]">
            <CiSearch className="text-[24px] text-gray-500" />
            <input
              type="text"
              placeholder="Search by letter number"
              className="flex-1 bg-transparent outline-none text-[14px]"
            />
          </div>
        </div>
        {/* table */}

        {letterList?.loading ? (
          <Loading addtionalStyle={"flex justify-center  items-center"} />
        ) : (
          letterList?.forwardLetters?.length ===0 ?   <div className="flex justify-center items-center my-[30px]">
          <span className="text-[#0C73B8] text-[14px]">You have no forwarded letters</span>
        </div> :
          <div className="max-h-[700px] flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8  hide-scroll-bar">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#0C73B8] whitespace-nowrap">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-4 text-center text-[14px] font-bold text-white  tracking-wider"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-center text-[14px] font-bold text-white  tracking-wider"
                        >
                          Letter Number
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-center text-[14px] font-bold text-white  tracking-wider"
                        >
                          From
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-center text-[14px] font-bold text-white  tracking-wider"
                        >
                          To
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-center text-[14px] font-bold text-white  tracking-wider"
                        >
                          Type
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-4 text-center text-[14px]  font-bold text-white  tracking-wider"
                        >
                          Sent Date
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-4 text-center text-[14px] font-bold text-white  tracking-wider"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {letterList?.forwardLetters?.map((letter, index) => {
                        return (
                          <tr
                            key={index}
                            className="text-center text-[12px] cursor-pointer"
                            onClick={() => navigate(`/letters/${letter?._id}`)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div>
                                  <div className="px-6 py-2 whitespace-nowrap text-center text-gray-500">
                                    {index + 1}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="px-6 py-2 whitespace-nowrap text-gray-500">
                                    {letter?.letter_number}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                                    {letter?.sent_from}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                                {letter?.sent_to}
                              </div>
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap  text-gray-500">
                              {letter?.letter_type}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap  text-gray-500">
                              {letter?.letter_sent_date?.split('T')[0]}
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap">
                              {letter?.status ==="created" &&   <span
                                className="px-2 py-1 inline-flex  leading-5
                      font-semibold rounded-[5px] bg-gray-200 text-green-800"
                              >
                                Created
                              </span>}

                              {letter?.status === "forwarded" &&   <span
                                className="px-2 py-1 inline-flex  leading-5
                      font-semibold rounded-[5px] bg-green-600 text-white"
                              >
                                Forwarded
                              </span>}
                            
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

export default Letters;
