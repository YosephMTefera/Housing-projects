import React, { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import apiRequest from "../../utils/request";
import ServerError from "../ServerError";
import Loading from "../Loading";
import { language } from "../../utils/part-1lan";

function ResponseHistory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("tID");
  const translationState = useSelector((state) => state?.translation);
  const [caseInfo, setCaseInfo] = useState({});
  const [candidateResponse, setCandidateResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);

      apiRequest
        .get(`/cand_resp/get_cand_resp/${id}`, {
          headers: {
            get_candrespsng_api: process.env.REACT_APP_GET_CANDRESPSNG_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setCandidateResponse(res.data);
        })
        .catch((error) => {
          if (error?.response?.status === 500) {
            setServerError(true);
          }
        });
    } catch (error) {
      setServerError(true);
    }
  }, [id, token, translationState.lan]);

  useEffect(() => {
    try {
      setLoading(true);

      apiRequest
        .get(`/customer_case_api/get_case/${id}`, {
          headers: {
            get_gecase_api: process.env.REACT_APP_GET_GECASE_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setCaseInfo(res.data);
        })
        .catch((error) => {
          if (error?.response?.status === 500) {
            setServerError(true);
          }
        });
    } catch (error) {
      setServerError(true);
    }
  }, [id, token, translationState.lan]);

  if (serverError) return <ServerError />;
  return (
    <div className="w-[90%] my-[30px] mx-auto rounded-[10px] bg-white">
      {loading ? (
        <Loading
          addtionalStyle={"flex justify-center items-center  my-[30px]"}
        />
      ) : (
        <div className="w-[90%] mx-auto flex flex-col">
          <div className="flex my-[20px] justify-between items-center  font-bold text-[#0C73B8]">
            <div className="flex items-center gap-[5px]">
              <IoChevronBack
                onClick={() => navigate(-1)}
                className="text-[30px] cursor-pointer"
              />
              <span className="font-bold">
                {translationState?.lan === "En" && language?.updatecaseList[0]}
                {translationState?.lan === "Am" &&
                  language?.updatecaseList[1]}{" "}
                {caseInfo?.case_number}
              </span>
            </div>
          </div>
          <div className="w-[100%] h-[1px]  bg-gray-300" />
          <div className="w-[100%] my-[20px]">
            <label
              htmlFor="street-address"
              className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
            >
              {translationState?.lan === "En" && language?.createdBy[0]}
              {translationState?.lan === "Am" && language?.createdBy[1]}
            </label>
            <div className="mt-2">
              <input
                required
                value={
                  candidateResponse?.created_by
                    ? `${candidateResponse?.created_by?.firstname} ${candidateResponse?.created_by?.middlename} ${candidateResponse?.created_by?.lastname} --- (${candidateResponse?.created_by?.position})`
                    : "-"
                }
                disabled
                className="block w-full font-bold flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
              />
            </div>
          </div>

          <div className="w-[100%] overflow-auto max-h-[600px] my-[30px] mx-auto hide-scroll-bar max-lg2:max-h-[300px] max-lg2:my-[10px]">
            {Object.keys(candidateResponse)?.length === 0 ||
            candidateResponse?.updated_by?.length === 0 ? (
              <div className="capitalize w-[100%] h-[300px] flex items-center justify-center">
                <span className="text-xl text-[#0C73B8] font-bold">
                  {translationState?.lan === "En" &&
                    language?.caseNotUpdated[0]}
                  {translationState?.lan === "Am" &&
                    language?.caseNotUpdated[1]}
                </span>
              </div>
            ) : (
              <table className="w-[100%]">
                <thead className="bg-[#0C73B8] text-white  text-[14px] max-lg2:text-[12px]">
                  <tr>
                    <th className="px-2 py-4 border-[2px] border-white">#</th>

                    <th className="px-2 py-4 border-[2px] border-white">
                      {translationState?.lan === "En" && language?.name[0]}
                      {translationState?.lan === "Am" && language?.name[1]}
                    </th>
                    <th className="px-2 py-4 border-[2px] border-white">
                      {translationState?.lan === "En" && language?.position[0]}
                      {translationState?.lan === "Am" && language?.position[1]}
                    </th>
                    <th className="px-2 py-4 border-[2px] border-white">
                      {translationState?.lan === "En" &&
                        language?.updatedDate[0]}
                      {translationState?.lan === "Am" &&
                        language?.updatedDate[1]}
                    </th>
                    <th className="px-2 py-4 border-[2px] border-white">
                      {translationState?.lan === "En" &&
                        language?.updatedTime[0]}
                      {translationState?.lan === "Am" &&
                        language?.updatedTime[1]}
                    </th>
                  </tr>
                </thead>
                <tbody className="border [&>*:nth-child(even)]:bg-[#F9F9F9]">
                  {candidateResponse?.updated_by?.map((cr, index) => {
                    return (
                      <tr
                        key={index}
                        className="text-center border-b border-gray-300 text-gray-600 text-[14px] max-lg2:text-[12px]"
                      >
                        <td className="py-2 border">{index + 1}</td>
                        <td className="py-2 border">
                          {cr?.update_officer?.firstname}{" "}
                          {cr?.update_officer?.middlename}{" "}
                          {cr?.update_officer?.lastname}
                        </td>
                        <td className="py-2 border">
                          {cr?.update_officer?.position}
                        </td>

                        <td className="py-2 border">
                          {new Date(cr?.updated_date)?.toDateString()}
                        </td>
                        <td className="py-2 border">
                          {new Date(cr?.updated_date)?.toLocaleTimeString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ResponseHistory;
