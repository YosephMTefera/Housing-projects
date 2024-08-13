import React, { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import apiRequest from "../utils/request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "./ServerError";
import Loading from "./Loading";

function Respond() {
  const { id, type } = useParams();
  const token = sessionStorage.getItem("tID");
  const navigate = useNavigate();
  const [attachement, setAttachement] = useState(null);
  const [responseJustification, setResponseJustication] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const respond = async () => {
    try {
      const responseData = new FormData();
      responseData.append("response_justification", responseJustification);
      responseData.append("response_attachment", attachement);

      if (type === "case") {
        setLoading(true);
        await apiRequest
          .put(`/customer_case_api/respond_case/${id}`, responseData, {
            headers: {
              "Content-Type": "multipart/form-data",
              get_user_api: process.env.REACT_APP_GET_USER_API,
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res?.status === 200) {
              toast.success(res?.data?.Message);
              setTimeout(() => {
                setLoading(false);
                navigate(-1);
              }, 3000);
            }
          })
          .catch((error) => {
            setLoading(false);
            if (
              error.response.status === 401 &&
              error.response.data.Message ===
                "Token expired. Please log in again."
            ) {
              sessionStorage.clear();
              window.location.href = "/login";
            }
            toast.error(error.response.data.Message);
          });
      } else if (type === "complaint") {
        setLoading(true);
        await apiRequest
          .put(
            `/customer_complaint_api/respond_complaint/${id}`,
            responseData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                get_user_api: process.env.REACT_APP_GET_USER_API,
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            setLoading(false);
            navigate(-1);
          })
          .catch((error) => {
            setLoading(false);
            if (
              error.response.status === 401 &&
              error.response.data.Message ===
                "Token expired. Please log in again."
            ) {
              sessionStorage.clear();
              window.location.href = "/login";
            }
            toast.error(error.response.data.Message);
          });
      }
    } catch (error) {
      setServerError(true);
    }
  };

  if (serverError) return <ServerError />;

  return (
    <div className="w-[90%] my-[30px] mx-auto p-2 bg-white  rounded-[10px]">
      <ToastContainer theme="light" />
      <div className="w-[90%] mx-auto my-[20px] flex flex-col gap-[10px]">
        <div className="flex justify-between items-center gap-5">
          <div className="flex items-center justify-start gap-[10px] text-[#0C73B8]">
            <BiChevronLeft
              onClick={() => navigate(-1)}
              className="text-[40px] cursor-pointer"
            />
            <span className="text-[18px] font-bold">
              Respond to
              {type === "case" && (
                <span className="text-[18px] text-[#0C73B8] font-semibold">
                  {` / case number - ${id}`}
                </span>
              )}
              {type === "complaint" && (
                <span className="text-[18px] text-[#0C73B8] font-semibold">
                  {` / complaint number - ${id}`}
                </span>
              )}
              {type === "letter" && (
                <span className="text-[18px] text-[#0C73B8] font-semibold">
                  {` / letter number - ${id}`}
                </span>
              )}
            </span>
          </div>
        </div>

        <div className="my-[30px] flex flex-col gap-[10px]">
          <div className="w-[100%] col-span-2">
            <label
              htmlFor="from"
              className="block text-[#0C73B8] font-bold p-2 leading-6"
            >
              Response Justification <span className="text-red-700">*</span>
            </label>
            <div className="mt-2">
              <textarea
                type="text"
                rows={15}
                // value={from}

                onChange={(e) => setResponseJustication(e?.target?.value)}
                className="block w-full rounded-md p-4 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 resize-none"
              ></textarea>
            </div>
          </div>
          <div className="w-[100%] mt-[30px] flex flex-col gap-[10px]">
            <span className="block text-[#0C73B8] font-bold p-2 leading-6">
              Attachment <span className="text-red-700">*</span>
            </span>
            <label>
              <input
                type="file"
                onChange={(e) => setAttachement(e?.target?.files?.[0])}
                hidden
              />
              <div className="[w-[70%] h-[200px] flex justify-center gap-[10px]  items-center p-4 mx-auto border border-gray-300 rounded border-dashed cursor-pointer text-center">
                <BsFillCloudUploadFill />
                <span className="text-[14px] font-bold">
                  Upload Attachement
                </span>
              </div>
            </label>
          </div>

          <div className="w-[100%] my-4 overflow-y-scroll">
            {attachement && (
              <embed
                src={URL.createObjectURL(attachement)}
                type="application/pdf"
                width="100%"
                height="600px"
              />
            )}
          </div>
        </div>

        {loading ? (
          <Loading addtionalStyle={"flex justify-end items-center"} />
        ) : (
          <div className="w-[100%] mt-[30px] py-3 flex justify-end items-center gap-[20px]">
            <button
              onClick={() => navigate(-1)}
              className="rounded-md bg-[#0C73B8] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              className={
                "bg-[#0C73B8]  text-white px-3 py-2 rounded text-[14px]"
              }
              onClick={respond}
            >
              Respond
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Respond;
