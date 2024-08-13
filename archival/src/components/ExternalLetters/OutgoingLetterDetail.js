import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoChevronBack } from "react-icons/io5";
import { language } from "../../utils/part-1lan";
import apiRequest from "../../utils/request";
import ServerError from "../ServerError";
import Loading from "../Loading";
import { ToastContainer, toast } from "react-toastify";

function OutgoingLetterDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = sessionStorage.getItem("tID");
  const translationState = useSelector((state) => state.translation);
  const [outgoingletter, setOutgoingLetter] = useState({});
  const [archivalCategory, setArchivalCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const getOutgoingLetterData = async () => {
    try {
      setLoading(true);
      apiRequest
        .get(`/outgoing_ltr_api/get_output_ltrs/${id}`, {
          headers: {
            get_outputltr_api: process.env.REACT_APP_GET_OUTPUTLTR_API,
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setOutgoingLetter(res.data);
        })
        .catch((error) => {
          if (error?.response?.status === 500) {
            setServerError(true);
          }
        });
    } catch (error) {
      setServerError(true);
    }
  };

  useEffect(() => {
    getOutgoingLetterData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  useEffect(() => {
    try {
      setLoading(true);
      apiRequest
        .get(`/archival_category_api/get_arch_bydocId/${id}/outgoingLtr`, {
          headers: {
            Authorization: "Token " + token,
            get_docarchcat_api: process.env.REACT_APP_GET_DOCARCHCAT_API,
          },
        })
        .then((res) => {
          setLoading(false);
          if (res?.status === 200) {
            setServerError(false);
            setArchivalCategory(res?.data);
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
    // eslint-disable-next-line
  }, [id]);

  const handleVerifyOutgoingLetter = async () => {
    try {
      setLoading(true);
      await apiRequest
        .put(
          `/outgoing_ltr_api/verfy_output_ltr/${id}`,
          {},
          {
            headers: {
              get_vrfyoutputltr_api:
                process.env.REACT_APP_GET_VRFYOUTPUTLTR_API,
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setLoading(false);
          translationState?.lan === "En"
            ? toast.success(res?.Message_en)
            : toast.success(res?.Message_am);
          getOutgoingLetterData();
        })
        .catch((error) => {
          setLoading(false);
          if (error?.response?.status === 500) {
            setServerError(true);
          }
          translationState?.lan === "En"
            ? toast.error(error?.response?.data?.Message_en)
            : toast.error(error?.response?.data?.Message_am);
        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };

  if (serverError) return <ServerError />;
  return loading ? (
    <Loading addtionalStyle={"flex justify-center items-center my-[20px]"} />
  ) : (
    <div className="w-[100%] min-h-[100vh] bg-white">
      <ToastContainer theme="light" />

      <div className="w-[90%] my-[50px] mx-auto max-lg2:my-[30px]">
        <div className="flex justify-between items-center  gap-[5px]">
          <div className="flex items-center gap-[5px] font-bold text-[#0C73B8]">
            <IoChevronBack
              onClick={() => navigate(-1)}
              className="text-[30px] cursor-pointer"
            />
            <span>
              {" "}
              {translationState?.lan === "En" && language?.letterInformation[0]}
              {translationState?.lan === "Am" &&
                language?.letterInformation[1]}{" "}
              - {id}
            </span>
            {outgoingletter?.status === "output" && (
              <span>({outgoingletter?.status})</span>
            )}
           
              <div className="flex justify-center  items-center text-[14px] font-bold max-lg2:text-[12px]">
              {outgoingletter?.status === "output" && (
                <span className="py-2 px-4 rounded-[20px] text-gray-700">
              ({translationState?.lan==="En" && language?.approved[0]}
                 {translationState?.lan==="Am" && language?.approved[1]})
                </span>
              )}
 
              {outgoingletter?.status === "verified" && (
                <span className="py-2 px-4 rounded-[5px] text-green-600">
                (  {translationState?.lan==="En" && language?.verfied[0]}
                 {translationState?.lan==="Am" && language?.verfied[1]})
                </span>
              )}
            </div>
            
          </div>
          <div className="flex items-center gap-[10px]">
            <div className="flex gap-[10px]">
              <button onClick={()=>navigate(`/letters/archive/outgoing/${id}`)} className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]">
                {translationState?.lan === "En" && language?.archiveLetter[0]}
                {translationState?.lan === "Am" && language?.archiveLetter[1]}
              </button>

              <button
                onClick={() => navigate(`/forwarded_path/outgoing/${id}`)}
                className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
              >
                {translationState?.lan === "En" && language?.forwardPath[0]}
                {translationState?.lan === "Am" && language?.forwardPath[1]}
              </button>

              {outgoingletter?.status === "output" && (
                <button
                  onClick={handleVerifyOutgoingLetter}
                  className="py-2 px-4 text-[12px] text-white bg-[#0C73B8] rounded-[20px] font-bold max-lg2:text-[10px]"
                >
                  {translationState?.lan === "En" && language?.stamp[0]}
                  {translationState?.lan === "Am" && language?.stamp[1]}
                </button>
              )}
            </div>
          </div>
        </div>

        {(outgoingletter?.status === "output" ||
          outgoingletter?.status === "verified") && (
          <div className="w-[100%] my-[10px] grid grid-cols-2 gap-[10px]">
            {outgoingletter?.outgoing_letter_number && (
              <div className="w-[100%] col-span-2">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                >
                  {translationState?.lan === "En" &&
                    language?.archivalNumber[0]}
                  {translationState?.lan === "Am" &&
                    language?.archivalNumber[1]}
                </label>
                <div className="mt-2 flex gap-[10px]">
                  <input
                    required
                    value={
                      outgoingletter?.outgoing_letter_number
                        ? outgoingletter?.outgoing_letter_number
                        : "Not assigned"
                    }
                    disabled
                    className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                  />
                </div>
              </div>
            )}
            {outgoingletter?.createdBy && (
              <div className="w-[100%] col-span-1">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                >
                  {translationState?.lan === "En" && language?.createdBy[0]}
                  {translationState?.lan === "Am" && language?.createdBy[1]}
                </label>
                <div className="mt-2 flex gap-[10px]">
                  <input
                    required
                    value={
                      outgoingletter?.createdBy?.firstname +
                      " " +
                      outgoingletter?.createdBy?.middlename +
                      " " +
                      outgoingletter?.createdBy?.lastname
                    }
                    disabled
                    className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                  />
                </div>
              </div>
            )}
            {outgoingletter?.createdBy && (
              <div className="w-[100%] col-span-1">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                >
                  {translationState?.lan === "En" && language?.createdDate[0]}
                  {translationState?.lan === "Am" && language?.createdDate[1]}
                </label>
                <div className="mt-2 flex gap-[10px]">
                  <input
                    required
                    value={new Date(outgoingletter?.createdAt)?.toDateString()}
                    disabled
                    className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                  />
                </div>
              </div>
            )}

            {outgoingletter?.output_by && (
              <div className="w-[100%] col-span-1">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                >
                  {translationState?.lan === "En" && language?.approvedBy[0]}
                  {translationState?.lan === "Am" && language?.approvedBy[1]}
                </label>
                <div className="mt-2 flex gap-[10px]">
                  <input
                    required
                    value={
                      outgoingletter?.output_by?.firstname +
                      " " +
                      outgoingletter?.output_by?.middlename +
                      " " +
                      outgoingletter?.output_by?.lastname
                    }
                    disabled
                    className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                  />
                </div>
              </div>
            )}

            {outgoingletter?.output_by && (
              <div className="w-[100%] col-span-1">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                >
                  {translationState?.lan === "En" && language?.approvedDate[0]}
                  {translationState?.lan === "Am" && language?.approvedDate[1]}
                </label>
                <div className="mt-2 flex gap-[10px]">
                  <input
                    required
                    value={new Date(
                      outgoingletter?.output_date
                    )?.toDateString()}
                    disabled
                    className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                  />
                </div>
              </div>
            )}

            {outgoingletter?.verified_by && (
              <div className="w-[100%] col-span-1">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                >
                  {translationState?.lan === "En" && language?.verfiedBy[0]}
                  {translationState?.lan === "Am" && language?.verfiedBy[1]}
                </label>
                <div className="mt-2 flex gap-[10px]">
                  <input
                    required
                    value={
                      outgoingletter?.verified_by?.firstname +
                      " " +
                      outgoingletter?.verified_by?.middlename +
                      " " +
                      outgoingletter?.verified_by?.lastname
                    }
                    disabled
                    className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                  />
                </div>
              </div>
            )}

            {outgoingletter?.verfied_by && (
              <div className="w-[100%] col-span-1">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]"
                >
                  {translationState?.lan === "En" && language?.verifiedDate[0]}
                  {translationState?.lan === "Am" && language?.verifiedDate[1]}
                </label>
                <div className="mt-2 flex gap-[10px]">
                  <input
                    required
                    value={new Date(
                      outgoingletter?.verified_date
                    )?.toDateString()}
                    disabled
                    className="block flex-1 rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {archivalCategory?.length > 0 && (
          <div className="w-[100%] col-span-1">
            <label className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
              {translationState?.lan === "En" && language?.archivalCategory[0]}
              {translationState?.lan === "Am" && language?.archivalCategory[1]}
            </label>
            <div className="mt-2 flex gap-[10px]">
              <div className="block flex-1 rounded-md p-4 border-0  bg-gray-100  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:p-2 max-lg2:text-[12px]">
                {archivalCategory?.map((archive, index) => {
                  return (
                    <div key={index}>
                      <span
                        onClick={() =>
                          navigate(`/letters/archive/${archive?._id}`)
                        }
                      >
                        <span>{index + 1}. </span>{" "}
                        {translationState?.lan === "En" && archive?.name_en}
                        {translationState?.lan === "Am" &&
                          archive?.name_am}{" "}
                        <span className="text-[#0C73B8] font-bold text-[12px] cursor-pointer">
                          (Click to view)
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {(outgoingletter?.status === "output" ||
          outgoingletter?.status === "verified") &&
          outgoingletter?.main_letter && (
            <div className="w-[100%] flex flex-col my-[20px]">
              <span className="block text-sm font-bold p-2 leading-6 text-[#0C73B8] max-lg2:text-[12px]">
                {translationState?.lan === "En" && language?.mainLetter[0]}
                {translationState?.lan === "Am" && language?.mainLetter[1]}{" "}
              </span>
              <div className="w-[100%] my-4 overflow-y-scroll">
                {outgoingletter?.main_letter && (
                  <embed
                    src={`${process.env.REACT_APP_BACKEND_IMAGES}/${outgoingletter?.main_letter}`}
                    type="application/pdf"
                    width="100%"
                    height="1000px"
                  />
                )}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default OutgoingLetterDetail;
