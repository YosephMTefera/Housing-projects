import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchForwardPath } from "../../REDUX/slices/forwardPathSlice";
import { useNavigate, useParams } from "react-router-dom";
import { fetchreplyPath } from "../../REDUX/slices/replyPathSlice";
import { BiChevronLeft } from "react-icons/bi";
import { fetchOfficeUsers } from "../../REDUX/slices/officeUserSlice";
import Loading from "../Loading";
import ServerError from "../ServerError";

function ExpectedReply() {
  const navigate = useNavigate();
  const userID = sessionStorage.getItem("uID");
  const dispatch = useDispatch();
  const { document_id, type } = useParams();
  const forwardPathList = useSelector((state) => state?.forwardPath);
  const replyPathList = useSelector((state) => state?.replyPath);
  const officeUserList = useSelector((state) => state?.officeUsers);

  useEffect(() => {
    dispatch(fetchForwardPath({ document_id: document_id, type }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchreplyPath({ document_id: document_id, type }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchOfficeUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  const filterFrom = forwardPathList?.forwardPath?.forwardDocs?.filter(
    (fp) => fp?.from_office_user?._id === userID
  );
  const filterTo = replyPathList?.replyPath?.repliedDocs?.filter(
    (rp) => rp?.to === userID
  );

  const filterFromByID = filterFrom?.map((from) => from?.to?._id);
  const filterToByID = filterTo?.map((to) => to?.from_office_user);

  // ("FBI: ", filterFromByID); //valid
  // ("FTBYID: ", filterToByID);

  const expectedReplies = filterFromByID?.filter(
    (item) => !filterToByID?.includes(item)
  );

  if (forwardPathList?.error || replyPathList?.error || officeUserList?.error)
    return <ServerError />;

  return (
    <div className="w-[90%] min-h-[250px] my-[20px] mx-auto rounded-[10px] bg-white">
      <div className="w-[90%] mx-auto">
        <div className="w-[100%] flex items-center justify-start   text-[#0C73B8] mt-[50px] mx-auto font-bold">
          <BiChevronLeft
            className="text-[30px] cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <span className="text-[20px]">
            Expected replies for {type}: ({document_id})
          </span>
        </div>

        {forwardPathList?.loading || replyPathList?.loading ? (
          <Loading addtionalStyle={"flex justify-center items-center"} />
        ) : expectedReplies?.length === 0 ? (
          <div className="flex justify-center items-center my-[30px]">
            <span className="text-[#0C73B8] text-[14px]">
              You have no expected replies for this {type}
            </span>
          </div>
        ) : (
          <div className="max-h-[700px] my-[30px] flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8  hide-scroll-bar">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#0C73B8]  whitespace-nowrap">
                      <tr className="text-[14px]">
                        <th
                          scope="col"
                          className="px-6 py-4 text-center  font-bold text-white  tracking-wider"
                        >
                          #
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-4 text-center  font-bold text-white   tracking-wider"
                        >
                          Officer Name
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-4 text-center  font-bold text-white   tracking-wider"
                        >
                          Position
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {expectedReplies?.map((case1, index) => {
                        const firstName = officeUserList?.officeUsers?.find(
                          (user) => user?._id === case1
                        )?.firstname;
                        const middlename = officeUserList?.officeUsers?.find(
                          (user) => user?._id === case1
                        )?.middlename;
                        const lastname = officeUserList?.officeUsers?.find(
                          (user) => user?._id === case1
                        )?.lastname;
                        const position = officeUserList?.officeUsers?.find(
                          (user) => user?._id === case1
                        )?.position;

                        return (
                          <tr key={index} className="text-center text-[12px]">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex justify-center items-center">
                                <div>
                                  <div className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {index + 1}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex justify-center items-center">
                                <div>
                                  <div className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {firstName} {middlename} {lastname}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                              {position ? position : "-"}
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

export default ExpectedReply;
