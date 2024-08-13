import React, { useEffect, useState } from "react";
import apiRequest from "../../utils/request";
import { useNavigate, useParams } from "react-router-dom";
import ServerError from "../ServerError";
import { ToastContainer, toast } from "react-toastify";
import { BiChevronLeft } from "react-icons/bi";
import { AiOutlineQuestionCircle } from "react-icons/ai";

function CaseRequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryDetail, setCategoryDetail] = useState([]);
  const token = sessionStorage?.getItem("tID");
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    apiRequest
      .get(`/case_list_api/get_case_list/${id}`, {
        headers: {
          Authorization: "Token " + token,
          get_user_api: process.env.REACT_APP_GET_USER_API,
        },
      })
      .then((res) => {
        if (res?.status === 200) {
          setServerError(false);
          setCategoryDetail(res?.data);
        }
      })
      .catch((error) => {
        if (error?.response?.status === 500) {
          setServerError(true);
        } else {
          if (
            error.response.status === 401 &&
            error.response.data.Message ===
              "Token expired. Please log in again."
          ) {
            window.location.href = "/login";
          }
          toast.error(error?.response?.data?.Message);
        }
      });
    // eslint-disable-next-line
  }, [id]);

  if (serverError) return <ServerError />;

  return (
    <div className="w-[100%]">
      <div className="w-[95%] mx-auto my-12">
        <ToastContainer theme="light" />
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center justify-start gap-[10px] text-[#FDC00D]">
            <BiChevronLeft
              onClick={() => navigate(-1)}
              className="text-[40px] cursor-pointer"
            />
            <span className="text-[20px] font-bold">
              Case Request Details / {id}
            </span>
          </div>
          <button
            onClick={() => navigate(`/case_request/edit/${id}`)}
            className="bg-[#0C73B8] px-4 py-2 outline-none text-white rounded"
          >
            Edit
          </button>
        </div>

        <div className="w-[95%] mx-auto border border-dashed border-[#0C73B8] rounded-md p-8 my-20">
          <div className="flex gap-8 items-center">
            <AiOutlineQuestionCircle className="rounded-full border border-[#0C73B8] text-[#0C73B8] bg-[#D0E7FB] text-8xl p-2" />
            <div>
              <span className="text-3xl text-gray-500 uppercase">
                {categoryDetail?.case_name}
              </span>
            </div>
          </div>
          <div className="mt-8">
            <div className="grid grid-cols-3 gap-8 p-4">
              <div className="flex flex-col gap-2">
                <span className="text-[#FDC00D] font-semibold">
                  Case Code Name
                </span>
                <span className="text-gray-500 text-[15px] uppercase">
                  {categoryDetail?.case_code}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[#FDC00D] font-semibold">
                  Creator Name
                </span>
                <span className="text-gray-500 text-[15px]">
                  {categoryDetail?.createdBy?.firstname +
                    " " +
                    categoryDetail?.createdBy?.middlename +
                    " " +
                    categoryDetail?.createdBy?.lastname}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[#FDC00D] font-semibold">
                  Creator Username
                </span>
                <span className="text-gray-500 text-[15px]">
                  {categoryDetail?.createdBy?.username}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[#FDC00D] font-semibold">
                  Case Request Division
                </span>
                <span className="text-gray-500 text-[15px] capitalize">
                  {categoryDetail?.division_id?.name}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[#FDC00D] font-semibold">
                  Category Status
                </span>
                <span className="text-gray-500 text-[15px]">
                  {categoryDetail?.status}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[#FDC00D] font-semibold">
                  Creator Date
                </span>
                <span className="text-gray-500 text-[15px]">
                  {categoryDetail?.createdAt
                    ? new Date(categoryDetail?.createdAt).toDateString()
                    : "-"}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[#FDC00D] font-semibold">
                  Created Time
                </span>
                <span className="text-gray-500 text-[15px]">
                  {categoryDetail?.createdAt
                    ? new Date(categoryDetail?.createdAt).toLocaleTimeString()
                    : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseRequestDetail;
