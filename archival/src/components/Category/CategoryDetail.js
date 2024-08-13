import React, { useEffect, useState } from "react";
import apiRequest from "../../utils/request";
import { useNavigate, useParams } from "react-router-dom";
import ServerError from "../ServerError";
import { useSelector } from "react-redux";
import { language } from "../../utils/part-1lan";
import { IoChevronBack } from "react-icons/io5";
import {
  HiDocument,
  HiOutlineDocumentArrowDown,
  HiOutlineDocumentArrowUp,
} from "react-icons/hi2";
import Loading from "../Loading";
import { SiReadthedocs } from "react-icons/si";
import { ToastContainer, toast } from "react-toastify";

function CategoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage?.getItem("tID");
  const translationState = useSelector((state) => state.translation);
  const [categoryDetail, setCategoryDetail] = useState([]);
  const [letterType, setLetterType] = useState("incoming");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const getArchivalCategory = async () => {
    try {
      setLoading(true);
      apiRequest
        .get(`/archival_category_api/get_archival_category/${id}`, {
          headers: {
            Authorization: "Token " + token,
            get_archcat_api: process.env.REACT_APP_GET_ARCHCAT_API,
          },
        })
        .then((res) => {
          setLoading(false);
          if (res?.status === 200) {
            setServerError(false);
            setCategoryDetail(res?.data);
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error?.response?.status === 500) {
            setServerError(true);
          }
        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };

  useEffect(() => {
    getArchivalCategory();

    // eslint-disable-next-line
  }, [id]);


  const removeDocformArchival = async (id, type) => {
    try {
      apiRequest
        .put(
          `/archival_category_api/remove_document/${categoryDetail?._id}/${id}`,
          {
            type,
          },
          {
            headers: {
              get_rmvarchcat_api: process.env.REACT_APP_GET_RMVARCHCAT_API,
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          getArchivalCategory();
        })
        .catch((error) => {
          if (error?.response.status === 500) {
            setServerError(true);
          }
          translationState?.lan === "En" &&
            toast.error(error?.response?.data?.Message_en);
          translationState?.lan === "Am" &&
            toast.error(error?.response?.data?.Message_am);
        });
    } catch (error) {
      setServerError(true);
    }
  };

  if (serverError) return <ServerError />;

  return loading ? (
    <Loading addtionalStyle={"flex justify-center items-center my-[20px]"} />
  ) : (
    <div className="w-[90%] mx-auto flex flex-col gap-[10px] my-[20px]">
      <ToastContainer theme="light" />
      <div className="flex justify-between items-center gap-[5px] font-bold text-[#0C73B8]">
        <div className="flex items-center gap-[5px] font-bold">
          <IoChevronBack
            onClick={() => navigate(-1)}
            className="text-[30px] cursor-pointer"
          />
          <span>
            {translationState?.lan === "En" && language?.categoryInformation[0]}
            {translationState?.lan === "Am" &&
              language?.categoryInformation[1]}{" "}
            -{" "} {translationState?.lan ==="En" && categoryDetail?.name_en}
            {translationState?.lan ==="Am" && categoryDetail?.name_am}
          </span>
          <div className="flex justify-center  items-center text-[14px] font-bold max-lg2:text-[12px]">
            {categoryDetail?.status === "active" && (
              <span className="py-2 px-4 rounded-[20px] text-green-600">
                ({translationState?.lan === "En" && language?.active[0]}
                {translationState?.lan === "Am" && language?.active[1]})
              </span>
            )}

            {categoryDetail?.status === "inactive" && (
              <span className="py-2 px-4 rounded-[5px] ">
                ( {translationState?.lan === "En" && language?.inactive[0]}
                {translationState?.lan === "Am" && language?.inactive[1]})
              </span>
            )}
          </div>
        </div>
        <button onClick={()=>navigate(`/letters/archive/${id}/edit`)} className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[5px] font-bold max-lg2:text-[10px]">
          {translationState?.lan === "En" && language?.editCategory[0]}
          {translationState?.lan === "Am" && language?.editCategory[1]}
        </button>
      </div>
      <div className="w-[100%] min-h-[150px] flex justify-between items-center gap-[10px]">
        {/* Incoming letter */}
        <div className="w-[25%] h-[150px] p-2 bg-white rounded-[10px] border border-gray-300  max-lg2:h-[120px]">
          <div className="w-[80%] my-[20px] mx-auto flex justify-between max-lg2:w-[90%]">
            <div className="flex flex-col gap-[10px]">
              <span className="text-[12px] text-gray-500 max-lg2:text-[10px]">
                {translationState?.lan === "En" && language?.incomingLetters[0]}
                {translationState?.lan === "Am" && language?.incomingLetters[1]}
              </span>
              <span className="font-bold text-[40px] text-[#0C73B8] max-lg2:text-[30px]">
                {categoryDetail?.incoming_letter
                  ? categoryDetail?.incoming_letter?.length
                  : "-"}
              </span>
            </div>
            {/* icon */}
            <div className="w-[80px] h-[80px]  flex justify-center  rounded-full">
              <HiOutlineDocumentArrowDown className="text-[#0C73B8] text-[40px] max-lg2:text-[30px]" />
            </div>
          </div>
        </div>

        <div className="w-[25%] h-[150px] p-2 bg-white rounded-[10px] border border-gray-300  max-lg2:h-[120px]">
          <div className="w-[80%] my-[20px] mx-auto flex justify-between max-lg2:w-[90%]">
            <div className="flex flex-col gap-[10px]">
              <span className="text-[12px] text-gray-500 max-lg2:text-[10px]">
                {translationState?.lan === "En" && language?.outgoingLetters[0]}
                {translationState?.lan === "Am" && language?.outgoingLetters[1]}
              </span>
              <span className="font-bold text-[40px] text-[#0C73B8] max-lg2:text-[30px]">
                {categoryDetail?.outgoing_letter
                  ? categoryDetail?.outgoing_letter?.length
                  : "-"}
              </span>
            </div>
            {/* icon */}
            <div className="w-[80px] h-[80px]  flex justify-center  rounded-full">
              <HiOutlineDocumentArrowUp className="text-[#0C73B8] text-[40px] max-lg2:text-[30px]" />
            </div>
          </div>
        </div>
        <div className="w-[25%] h-[150px] p-2 bg-white rounded-[10px] border border-gray-300  max-lg2:h-[120px]">
          <div className="w-[80%] my-[20px] mx-auto flex justify-between max-lg2:w-[90%]">
            <div className="flex flex-col gap-[10px]">
              <span className="text-[12px] text-gray-500 max-lg2:text-[10px]">
                {translationState?.lan === "En" && language?.internalLetters[0]}
                {translationState?.lan === "Am" && language?.internalLetters[1]}
              </span>
              <span className="font-bold text-[40px] text-[#0C73B8] max-lg2:text-[30px]">
                {categoryDetail?.internal_letter
                  ? categoryDetail?.internal_letter?.length
                  : "-"}
              </span>
            </div>
            {/* icon */}
            <div className="w-[80px] h-[80px] flex justify-center  rounded-full">
              <HiDocument className="text-[#0C73B8] text-[40px] max-lg2:text-[30px]" />
            </div>
          </div>
        </div>

        <div className="w-[25%] h-[150px] p-2 bg-white rounded-[10px] border border-gray-300 max-lg2:h-[120px]">
          <div className="w-[80%] my-[20px] mx-auto flex justify-between max-lg2:w-[90%]">
            <div className="flex flex-col gap-[10px]">
              <span className="text-[12px] text-gray-500 max-lg2:text-[10px]">
                {translationState?.lan === "En" && language?.cutoffLetters[0]}
                {translationState?.lan === "Am" && language?.cutoffLetters[1]}
              </span>
              <span className="font-bold text-[40px] text-[#0C73B8] max-lg2:text-[30px]">
                {categoryDetail?.presystem_letter
                  ? categoryDetail?.presystem_letter?.length
                  : "-"}
              </span>
            </div>

            <div className="w-[80px] h-[80px]  flex justify-center  rounded-full">
              <SiReadthedocs className="text-[#0C73B8] text-[40px] max-lg2:text-[30px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[50%] my-[20px] border border-gray-300 p-3 rounded-[5px]">
        <select
          onChange={(e) => setLetterType(e.target.value)}
          className="w-[100%]  bg-transparent text-gray-500 outline-none text-[14px] max-lg2:text-[12px]"
        >
          <option value={"incoming"}>
            {translationState?.lan === "En" && language?.incoming[0]}
            {translationState?.lan === "Am" && language?.incoming[1]}
          </option>
          <option value={"outgoing"}>
            {translationState?.lan === "En" && language?.outgoing[0]}
            {translationState?.lan === "Am" && language?.outgoing[1]}
          </option>
          <option value={"internal"}>
            {translationState?.lan === "En" && language?.internal[0]}
            {translationState?.lan === "Am" && language?.internal[1]}
          </option>
          <option value={"presystem"}>
            {translationState?.lan === "En" && language?.presystem[0]}
            {translationState?.lan === "Am" && language?.presystem[1]}
          </option>
        </select>
      </div>

                  <div className="my-[20px] w-[100%] flex justify-center items-center">
                  <span className="text-[#0C73B8] font-bold text-[18px]">
                    {letterType ==="incoming" && <>
                      {translationState?.lan === "En" && language?.incomingLetters[0]}
              {translationState?.lan === "Am" && language?.incomingLetters[1]}
                    </>}
                    {letterType ==="outgoing" && <>
                      {translationState?.lan === "En" && language?.outgoingLetters[0]}
              {translationState?.lan === "Am" && language?.outgoingLetters[1]}
                    </>}

                    {letterType ==="internal" && <>
                      {translationState?.lan === "En" && language?.internalLetters[0]}
              {translationState?.lan === "Am" && language?.internalLetters[1]}
                    </>}
                    {letterType ==="presystem" && <>
                      {translationState?.lan === "En" && language?.cutoffLetters[0]}
              {translationState?.lan === "Am" && language?.cutoffLetters[1]}
                    </>}
            
            </span>
                  </div>
      {/* table */}

      {(letterType === "incoming" || letterType === "") &&
        (categoryDetail?.incoming_letter?.length === 0 ? (
          <div className="flex justify-center items-center my-[30px]">
            <span className="text-[#0C73B8] font-bold text-[18px]">
              {translationState?.lan === "En" && language?.noLetter[0]}
              {translationState?.lan === "Am" && language?.noLetter[1]}
            </span>
          </div>
        ) : (
          <div className="max-h-[700px] flex flex-col hide-scroll-bar">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8  hide-scroll-bar">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#0C73B8] whitespace-nowrap">
                      <tr className="text-[12px] max-lg2:text-[10px]">
                        <th
                          scope="col"
                          className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                        >
                          {translationState?.lan === "En" &&
                            language?.archivalNumber[0]}
                          {translationState?.lan === "Am" &&
                            language?.archivalNumber[1]}{" "}
                          (
                          {translationState?.lan === "En" &&
                            language?.incoming[0]}
                          {translationState?.lan === "Am" &&
                            language?.incoming[1]}
                          )
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                        >
                          {translationState?.lan === "En" &&
                            language?.archivedBy[0]}
                          {translationState?.lan === "Am" &&
                            language?.archivedBy[1]}
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                        >
                          {translationState?.lan === "En" &&
                            language?.action[0]}
                          {translationState?.lan === "Am" &&
                            language?.action[1]}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 border [&>*:nth-child(even)]:bg-[#F9F9F9]">
                      {categoryDetail?.incoming_letter?.map((il, index) => {
                        return (
                          <tr
                            key={index}
                            className="text-center border border-gray-300 text-[12px] cursor-pointer max-lg2:text-[10px]"
                            onClick={() =>
                              navigate(
                                `/incoming/${il?.incoming_letter_id?._id}`
                              )
                            }
                          >
                            <td className="px-6 py-2 whitespace-nowrap border">
                              <div className="flex justify-center items-center">
                                <div>
                                  <div className="px-6 py-2 whitespace-nowrap  text-center text-gray-500">
                                    {index + 1}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap border">
                              <div className="flex justify-center items-center">
                                <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                                  {il?.incoming_letter_id
                                    ?.incoming_letter_number
                                    ? il?.incoming_letter_id
                                        ?.incoming_letter_number
                                    : "Not assigned"}
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap border">
                              <div className="flex justify-center items-center">
                                <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                                  {il?.archivedBy
                                    ? `${il?.archivedBy?.firstname} ${il?.archivedBy?.middlename} ${il?.archivedBy?.lastname}`
                                    : "-"}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap border">
                              <div className="flex justify-center items-center">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeDocformArchival(
                                      il?.incoming_letter_id?._id,
                                      "incomingLtr"
                                    );
                                  }}
                                  className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[5px] font-bold max-lg2:text-[10px]"
                                >
                                  {translationState?.lan === "En" &&
                                    language?.remove[0]}
                                  {translationState?.lan === "Am" &&
                                    language?.remove[1]}
                                </button>
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
        ))}
      {letterType === "outgoing" &&
        (categoryDetail?.outgoing_letter?.length === 0 ? (
          <div className="flex justify-center items-center my-[30px]">
            <span className="text-[#0C73B8] font-bold text-[18px]">
              {translationState?.lan === "En" && language?.noLetter[0]}
              {translationState?.lan === "Am" && language?.noLetter[1]}
            </span>
          </div>
        ) : (
          <div className="max-h-[700px] flex flex-col hide-scroll-bar">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8  hide-scroll-bar">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#0C73B8] whitespace-nowrap">
                      <tr className="text-[12px] max-lg2:text-[10px]">
                        <th
                          scope="col"
                          className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                        >
                          {translationState?.lan === "En" &&
                            language?.archivalNumber[0]}
                          {translationState?.lan === "Am" &&
                            language?.archivalNumber[1]}{" "}
                          (
                          {translationState?.lan === "En" &&
                            language?.outgoing[0]}
                          {translationState?.lan === "Am" &&
                            language?.outgoing[1]}
                          )
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                        >
                          {translationState?.lan === "En" &&
                            language?.archivedBy[0]}
                          {translationState?.lan === "Am" &&
                            language?.archivedBy[1]}
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                        >
                          {translationState?.lan === "En" &&
                            language?.action[0]}
                          {translationState?.lan === "Am" &&
                            language?.action[1]}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 border [&>*:nth-child(even)]:bg-[#F9F9F9]">
                      {categoryDetail?.outgoing_letter?.map((il, index) => {
                        return (
                          <tr
                            key={index}
                            className="text-center border border-gray-300 text-[12px] cursor-pointer max-lg2:text-[10px]"
                            onClick={() =>
                              navigate(
                                `/outgoing/${il?.outgoing_letter_id?._id}`
                              )
                            }
                          >
                            <td className="px-6 py-2 whitespace-nowrap border">
                              <div className="flex justify-center items-center">
                                <div>
                                  <div className="px-6 py-2 whitespace-nowrap  text-center text-gray-500">
                                    {index + 1}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap border">
                              <div className="flex justify-center items-center">
                                <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                                  {il?.outgoing_letter_id
                                    ?.outgoing_letter_number
                                    ? il?.outgoing_letter_id
                                        ?.outgoing_letter_number
                                    : "Not assigned"}
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap border">
                              <div className="flex justify-center items-center">
                                <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                                  {il?.archivedBy
                                    ? `${il?.archivedBy?.firstname} ${il?.archivedBy?.middlename} ${il?.archivedBy?.lastname}`
                                    : "-"}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap border">
                              <div className="flex justify-center items-center">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeDocformArchival(
                                      il?.outgoing_letter_id?._id,
                                      "outgoingLtr"
                                    );
                                  }}
                                  className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[5px] font-bold max-lg2:text-[10px]"
                                >
                                  {translationState?.lan === "En" &&
                                    language?.remove[0]}
                                  {translationState?.lan === "Am" &&
                                    language?.remove[1]}
                                </button>
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
        ))}

      {letterType === "internal" &&
        (categoryDetail?.internal_letter?.length === 0 ? (
          <div className="flex justify-center items-center my-[30px]">
            <span className="text-[#0C73B8] font-bold text-[18px]">
              {translationState?.lan === "En" && language?.noLetter[0]}
              {translationState?.lan === "Am" && language?.noLetter[1]}
            </span>
          </div>
        ) : (
          <div className="max-h-[700px] flex flex-col hide-scroll-bar">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8  hide-scroll-bar">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#0C73B8] whitespace-nowrap">
                      <tr className="text-[12px] max-lg2:text-[10px]">
                        <th
                          scope="col"
                          className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                        >
                          {translationState?.lan === "En" &&
                            language?.archivalNumber[0]}
                          {translationState?.lan === "Am" &&
                            language?.archivalNumber[1]}{" "}
                          (
                          {translationState?.lan === "En" &&
                            language?.outgoing[0]}
                          {translationState?.lan === "Am" &&
                            language?.outgoing[1]}
                          )
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                        >
                          {translationState?.lan === "En" &&
                            language?.archivedBy[0]}
                          {translationState?.lan === "Am" &&
                            language?.archivedBy[1]}
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                        >
                          {translationState?.lan === "En" &&
                            language?.action[0]}
                          {translationState?.lan === "Am" &&
                            language?.action[1]}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 border [&>*:nth-child(even)]:bg-[#F9F9F9]">
                      {categoryDetail?.internal_letter?.map((il, index) => {
                        return (
                          <tr
                            key={index}
                            className="text-center border border-gray-300 text-[12px] cursor-pointer max-lg2:text-[10px]"
                            onClick={() =>
                              navigate(
                                `/internal/${il?.internal_letter_id?._id}`
                              )
                            }
                          >
                            <td className="px-6 py-2 whitespace-nowrap border">
                              <div className="flex justify-center items-center">
                                <div>
                                  <div className="px-6 py-2 whitespace-nowrap  text-center text-gray-500">
                                    {index + 1}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap border">
                              <div className="flex justify-center items-center">
                                <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                                  {il?.internal_letter_id
                                    ?.internal_letter_number
                                    ? il?.internal_letter_id
                                        ?.internal_letter_number
                                    : "Not assigned"}
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap border">
                              <div className="flex justify-center items-center">
                                <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                                  {il?.archivedBy
                                    ? `${il?.archivedBy?.firstname} ${il?.archivedBy?.middlename} ${il?.archivedBy?.lastname}`
                                    : "-"}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap border">
                              <div className="flex justify-center items-center">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeDocformArchival(
                                      il?.internal_letter_id?._id,
                                      "internalLtr"
                                    );
                                  }}
                                  className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[5px] font-bold max-lg2:text-[10px]"
                                >
                                  {translationState?.lan === "En" &&
                                    language?.remove[0]}
                                  {translationState?.lan === "Am" &&
                                    language?.remove[1]}
                                </button>
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
        ))}
      {letterType === "presystem" &&
        (categoryDetail?.presystem_letter?.length === 0 ? (
          <div className="flex justify-center items-center my-[30px]">
            <span className="text-[#0C73B8] font-bold text-[18px]">
              {translationState?.lan === "En" && language?.noLetter[0]}
              {translationState?.lan === "Am" && language?.noLetter[1]}
            </span>
          </div>
        ) : (
          <div className="max-h-[700px] flex flex-col hide-scroll-bar">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8  hide-scroll-bar">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#0C73B8] whitespace-nowrap">
                      <tr className="text-[12px] max-lg2:text-[10px]">
                        <th
                          scope="col"
                          className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                        >
                          {translationState?.lan === "En" &&
                            language?.archivalNumber[0]}
                          {translationState?.lan === "Am" &&
                            language?.archivalNumber[1]}{" "}
                          (
                          {translationState?.lan === "En" &&
                            language?.presystem[0]}
                          {translationState?.lan === "Am" &&
                            language?.presystem[1]}
                          )
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                        >
                          {translationState?.lan === "En" &&
                            language?.archivedBy[0]}
                          {translationState?.lan === "Am" &&
                            language?.archivedBy[1]}
                        </th>
                        <th
                          scope="col"
                          className="px-2 py-4 border-[2px] border-white text-center  font-bold text-white uppercase tracking-wider"
                        >
                          {translationState?.lan === "En" &&
                            language?.action[0]}
                          {translationState?.lan === "Am" &&
                            language?.action[1]}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 border [&>*:nth-child(even)]:bg-[#F9F9F9]">
                      {categoryDetail?.presystem_letter?.map((il, index) => {
                        return (
                          <tr
                            key={index}
                            className="text-center border border-gray-300 text-[12px] cursor-pointer max-lg2:text-[10px]"
                            onClick={() =>
                              navigate(
                                `/presystem-letters/${il?.letter_id?._id}`
                              )
                            }
                          >
                            <td className="px-6 py-2 whitespace-nowrap border">
                              <div className="flex justify-center items-center">
                                <div>
                                  <div className="px-6 py-2 whitespace-nowrap  text-center text-gray-500">
                                    {index + 1}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap border">
                              <div className="flex justify-center items-center">
                                <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                                  {il?.letter_id?.letter_number
                                    ? il?.letter_id?.letter_number
                                    : "Not assigned"}
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap border">
                              <div className="flex justify-center items-center">
                                <div className="px-6 py-2 whitespace-nowrap  text-gray-500">
                                  {il?.archivedBy
                                    ? `${il?.archivedBy?.firstname} ${il?.archivedBy?.middlename} ${il?.archivedBy?.lastname}`
                                    : "-"}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap border">
                              <div className="flex justify-center items-center">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeDocformArchival(
                                      il?._id,
                                      il?.letter_id?._id,
                                      "presystem"
                                    );
                                  }}
                                  className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[5px] font-bold max-lg2:text-[10px]"
                                >
                                  {translationState?.lan === "En" &&
                                    language?.remove[0]}
                                  {translationState?.lan === "Am" &&
                                    language?.remove[1]}
                                </button>
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
        ))}
    </div>
  );
}

export default CategoryDetail;
