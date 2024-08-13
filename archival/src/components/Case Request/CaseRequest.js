import React, { useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCaseList } from "../../REDUX/slices/caseListSlice";

function CaseRequest() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const caseList = useSelector((state) => state?.caseList);

  useEffect(() => {
    dispatch(fetchCaseList());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-[100%] bg-white">
      <div className="w-[95%] my-[30px] mx-auto">
        <div className="flex pb-4 justify-between items-center border-b">
          <span className="text-[#0C73B8] font-bold text-[20px]">
            Case Request
          </span>
          <button
            onClick={() => navigate("/case_request/create_case")}
            className="py-2 px-4 rounded-[5px] bg-[#0C73B8] text-[14px] text-white font-bold"
          >
            Create Case Request
          </button>
        </div>
        <div className="w-[100%] my-[20px] flex justify-between items-center gap-[20px]">
          <div className="w-[50%] flex items-center gap-[20px]">
            <div className="w-[50%] border border-gray-400 p-3 flex items-center gap-[10px] rounded-[5px]">
              <CiSearch className="text-[24px] text-gray-500" />
              <input
                type="text"
                placeholder="Search by name"
                className="flex-1 bg-transparent outline-none text-[14px]"
              />
            </div>
            <div className="w-[50%] border border-gray-400 p-3 rounded-[5px]">
              <select className="w-[100%]  bg-transparent outline-none text-[14px]">
                <option>Status</option>
                <option>active</option>
                <option>inactive</option>
              </select>
            </div>
          </div>
        </div>
        {/* table */}
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 whitespace-nowrap">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Case Request Code Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Case Request Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Division
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Created By
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {caseList?.data?.map((category, index) => {
                      return (
                        <tr
                          key={index}
                          className="text-center cursor-pointer"
                          onClick={() =>
                            navigate(`/case_request/${category?._id}`)
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            {index + 1}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 uppercase">
                              {category?.case_code ? category?.case_code : "-"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 capitalize">
                              {category?.case_name ? category?.case_name : "-"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 capitalize">
                              {category?.division_id
                                ? category?.division_id?.name
                                : "-"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                            {category?.status === "active" && (
                                <span
                                  className="px-2 py-1 inline-flex text-xs leading-5
                      font-semibold  bg-green-600 text-white rounded-[5px]"
                                >
                                  active
                                </span>
                              )}

                              

                              {category?.status === "inactive" && (
                                <span
                                  className="px-2 py-1 inline-flex text-xs leading-5
                      font-semibold  bg-red-600 text-white rounded-[5px]"
                                >
                                  inactive
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                              {category?.createdBy
                                ? category?.createdBy?.firstname +
                                  " " +
                                  category?.createdBy?.middlename +
                                  " " +
                                  category?.createdBy?.lastname
                                : "-"}
                            </div>
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
      </div>
    </div>
  );
}

export default CaseRequest;
