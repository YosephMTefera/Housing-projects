import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../utils/request";
import ServerError from "../ServerError";
import Loading from "../Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { fetchOfficeUsers } from "../../REDUX/slices/officeUsersSlice";
import { useDispatch, useSelector } from "react-redux";
import { BiChevronLeft } from "react-icons/bi";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { fetchAllOfficeUsers } from "../../REDUX/slices/allOfficeUsersSlice";

function CreateDivision() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("tID");
  const translationState = useSelector((state) => state.translation);
  const officeUsersState = useSelector((state) => state.allOfficers);
  const [divisionName, setDivisionName] = useState("");
  const [nameAm, setNameAm] = useState("");
  const [nameOr, setNameOr] = useState("");
  const [nameSm, setNameSm] = useState("");
  const [nameTg, setNameTg] = useState("");
  const [nameAf, setNameAf] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAm, setDescriptionAm] = useState("");
  const [descriptionOr, setDescriptionOr] = useState("");
  const [descriptionSm, setDescriptionSm] = useState("");
  const [descriptionTg, setDescriptionTg] = useState("");
  const [descriptionAf, setDescriptionAf] = useState("");
  const [special, setSpecial] = useState("no");
  const [manager, setManager] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    dispatch(fetchAllOfficeUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterMainExecutive = officeUsersState?.officeUsers?.filter(
    (main) => main?.level === "MainExecutive"
  );
  const filterDivisionManagers = officeUsersState?.officeUsers?.filter(
    (officeUser) => officeUser?.level === "DivisionManagers"
  );

  const createDivision = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);
      await apiRequest
        .post(
          "/division_api/create_division",
          {
            name_en: divisionName,
            name_am: nameAm,
            name_or: nameOr,
            name_sm: nameSm,
            name_tg: nameTg,
            name_af: nameAf,
            description_en: descriptionEn,
            description_am: descriptionAm,
            description_or: descriptionOr,
            description_sm: descriptionSm,
            description_tg: descriptionTg,
            description_af: descriptionAf,
            special,
            manager,
          },
          {
            headers: {
              get_creatediv_api: process.env.REACT_APP_GET_CREATEDIV_API,
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res?.status === 201) {
            translationState.lan === "En"
              ? toast.success(res?.data?.Message_en)
              : toast.success(res?.data?.Message_am);

            setTimeout(() => {
              setLoading(false);
              window.location.href = "/division";
            }, 6000);
          }
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

  return (
    <div className="w-[100%] mx-auto min-h-[80vh] bg-white">
      <ToastContainer theme="light" />
      <div className="w-[90%] mt-[30px] mx-auto">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex items-center justify-start  text-[#FBB042]">
              <BiChevronLeft
                onClick={() => navigate(-1)}
                className="text-[40px] cursor-pointer max-lg2:text-[30px]"
              />
              <span className="text-[20px] font-bold max-lg2:text-[16px]">
                Add New Division
              </span>
            </div>

            <div className="w-[90%] mx-auto mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division name (english){" "}
                  <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setDivisionName(e?.target?.value)}
                    required
                    className="block w-full p-2 outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division name (amharic){" "}
                  <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setNameAm(e?.target?.value)}
                    required
                    className="block w-full p-2 outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division name (oromo) <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setNameOr(e?.target?.value)}
                    required
                    className="block w-full p-2 outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division name (tigrigna){" "}
                  <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setNameTg(e?.target?.value)}
                    required
                    className="block w-full p-2 outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division name (afar) <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setNameAf(e?.target?.value)}
                    required
                    className="block w-full p-2 outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division name (somali) <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setNameSm(e?.target?.value)}
                    required
                    className="block w-full p-2 outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
            </div>
            <div className="w-[90%] mx-auto mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division description (english){" "}
                  <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    onChange={(e) => setDescriptionEn(e?.target?.value)}
                    rows={15}
                    required
                    className="block w-full p-2 outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  ></textarea>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division description (amharic){" "}
                  <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    onChange={(e) => setDescriptionAm(e?.target?.value)}
                    required
                    rows={15}
                    className="block w-full p-2 outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  ></textarea>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division description (oromo){" "}
                  <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    onChange={(e) => setDescriptionOr(e?.target?.value)}
                    required
                    rows={15}
                    className="block w-full p-2 outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  ></textarea>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division description (tigrigna){" "}
                  <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    onChange={(e) => setDescriptionTg(e?.target?.value)}
                    required
                    rows={15}
                    className="block w-full p-2 outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  ></textarea>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division description (afar){" "}
                  <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    onChange={(e) => setDescriptionAf(e?.target?.value)}
                    required
                    rows={15}
                    className="block w-full p-2 outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  ></textarea>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division description (somali){" "}
                  <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    onChange={(e) => setDescriptionSm(e?.target?.value)}
                    required
                    rows={15}
                    className="block w-full p-2 outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  ></textarea>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Special
                  <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <select
                    onChange={(e) => setSpecial(e?.target?.value)}
                    className="w-[100%]  p-4 text-[14px] border border-[#FBB042] rounded-[5px] outline-none max-lg2:text-[12px] max-lg2:py-2"
                    type="text"
                  >
                    <option value={""}></option>
                    <option value={"no"}>No</option>
                    <option value={"yes"}>Yes</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold flex items-center gap-[20px] max-lg2:text-[12px]"
                >
                  <span> Manager</span>
                </label>
                <div className="mt-2">
                  <select
                    onChange={(e) => setManager(e?.target?.value)}
                    className="w-[100%]  p-4 text-[14px] border border-[#FBB042] rounded-[5px] outline-none max-lg2:text-[12px] max-lg2:py-2"
                    type="text"
                  >
                    <option value={""}>Select Manager</option>
                    {special === "yes"
                      ? filterMainExecutive?.map((ou, index) => {
                          return (
                            <option key={index} value={ou?._id}>
                              {ou?.firstname} {ou?.middlename} {ou?.lastname}
                            </option>
                          );
                        })
                      : filterDivisionManagers?.map((ou, index) => {
                          return (
                            <option key={index} value={ou?._id}>
                              {ou?.firstname} {ou?.middlename} {ou?.lastname}
                            </option>
                          );
                        })}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <Loading addtionalStyle={"my-[20px] flex justify-end items-center"} />
        ) : (
          <div className="w-[90%] mx-auto my-6 py-5 flex items-center justify-end gap-x-6">
            <button
              onClick={() => navigate(-1)}
              className="text-sm  leading-6 text-gray-900 max-lg2:text-[12px]"
            >
              Cancel
            </button>
            <button
              onClick={createDivision}
              className="rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 max-lg2:text-[12px]"
            >
              Create
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateDivision;