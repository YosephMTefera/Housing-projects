import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ServerError from "../ServerError";
import { ToastContainer, toast } from "react-toastify";
import { BiChevronLeft } from "react-icons/bi";
import apiRequest from "../../utils/request";
import { useDispatch, useSelector } from "react-redux";
import { fetchDivision } from "../../REDUX/slices/divisionSlice";

function CreateCaseRequest() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [caseCode, setCaseCode] = useState("");
  const [caseName, setCaseName] = useState("");
  const [division, setDivision] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const token = sessionStorage?.getItem("tID");
  const divisionList = useSelector((state) => state?.division);

  useEffect(() => {
    dispatch(fetchDivision());
    // eslint-disable-next-line
  }, []);

  const handleCreateCaseRequest = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);
      await apiRequest
        .post(
          "/case_list_api/create_case_list",
          {
            case_code: caseCode,
            case_name: caseName,
            division_id: division,
          },
          {
            headers: {
              Authorization: "Token " + token,
              get_user_api: process.env.REACT_APP_GET_USER_API,
            },
          }
        )
        .then((res) => {
          if (res?.status === 201) {
            toast.success(res?.data?.Message);
            setTimeout(() => {
              setLoading(false);
              window.location.href = "/case_request";
            }, 3000);
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error?.response?.data?.Message);
          if (error?.response?.status === 500) {
            setServerError(true);
          } else if (
            error.response.status === 401 &&
            error.response.data.Message ===
              "Token expired. Please log in again."
          ) {
            window.location.href = "/login";
          }
        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };

  if (serverError) return <ServerError />;

  return (
    <div className="w-[100%] py-4 min-h-[500px]    bg-white">
      <div className="w-[90%] mx-auto">
        <ToastContainer theme="light" />
        <div>
          <div className="flex items-center justify-between gap-[10px] my-8 text-[#FBB042]">
            <div className="flex items-center justify-start">
              <BiChevronLeft
                onClick={() => navigate(-1)}
                className="text-[40px] cursor-pointer"
              />
              <span className="text-[20px] font-bold">Create case request</span>
            </div>
          </div>
        </div>
        <div className="w-[90%] mx-auto flex flex-col gap-[20px]">
          <div className="w-[50%]">
            <label
              htmlFor="street-address"
              className="block text-sm font-bold p-2 leading-6 text-gray-900"
            >
              Case Request Code Name <span className="text-red-700">*</span>
            </label>
            <div className="mt-2">
              <input
                required
                onChange={(e) => setCaseCode(e?.target?.value)}
                className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="w-[50%]">
            <label
              htmlFor="street-address"
              className="block text-sm font-bold p-2 leading-6 text-gray-900"
            >
              Case Request Name <span className="text-red-700">*</span>
            </label>
            <div className="mt-2">
              <input
                required
                onChange={(e) => setCaseName(e?.target?.value)}
                className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="w-[50%]">
            <label
              htmlFor="street-address"
              className="block text-sm font-bold p-2 leading-6 text-gray-900"
            >
              Division <span className="text-red-700">*</span>
            </label>
            <div className="mt-2">
              <select
                required
                onChange={(e) => setDivision(e?.target?.value)}
                className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
              >
                <option value={""}></option>
                {divisionList?.data?.map((item, index) => {
                  return (
                    <option key={index} value={item?._id} className="uppercase">
                      {item?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="w-[100%] mt-[30px] py-3 flex justify-end items-center gap-[20px]">
          <button onClick={() => navigate(-1)}>Cancel</button>
          <button
            onClick={handleCreateCaseRequest}
            disabled={loading}
            className={
              loading
                ? "bg-[#FBB042] border border-[#FBB042] text-white px-3 py-2 rounded text-[14px] cursor-not-allowed hover:bg-transparent hover:text-[#FBB042] transition duration-500"
                : "bg-[#FBB042] border border-[#FBB042] text-white px-3 py-2 rounded text-[14px] hover:bg-transparent hover:text-[#FBB042] transition duration-500"
            }
          >
            Create Case Request
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCaseRequest;