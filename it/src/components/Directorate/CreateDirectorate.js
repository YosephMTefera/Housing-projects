import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiRequest from "../../utils/request";
import ServerError from "../ServerError";
import { BiChevronLeft } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { fetchAllDivision } from "../../REDUX/slices/allDivisionsSlice";
import { fetchAllOfficeUsers } from "../../REDUX/slices/allOfficeUsersSlice";
// import AddMemberDirectorate from "./AddMemberDirectorate";


function CreateDirectorate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = sessionStorage?.getItem("tID");

  const translationState = useSelector((state)=>state.translation)
  const divisionState = useSelector((state) => state.allDivisions);
  const officeUsersState = useSelector((state) => state.allOfficers);
  const [directorateName, setDirectorateName] = useState("");
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
  const [division, setDivision] = useState("");
  const [checkedOfficeUsers, setCheckedOfficeUsers] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [loading,setLoading]  = useState(false);
  const [serverError,setServerError] = useState(false);



 
  useEffect(() => {
    dispatch(fetchAllDivision());
    dispatch(fetchAllOfficeUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  
 

  const filterByTeamandProfessionals = officeUsersState?.officeUsers?.filter(
    (ou) => {
      return (
        (ou?.level === "Professionals" || ou?.level === "TeamLeaders") &&
        ou?.division?._id === division
      );
    }
  );


  const handleCheckboxChange = (event) => {
    const { value, checked } = event?.target;

    if (checked) {
      setCheckedOfficeUsers([...checkedOfficeUsers, value]);
    } else {
      setCheckedOfficeUsers(
        checkedOfficeUsers.filter((user) => user !== value)
      );
    }
  };

  
  const handlePrevious = () => {
    if (pageNum <= 1) {
      setPageNum(1);
    } else {
      setPageNum(pageNum - 1);
    }
  };

  const handleNext = () => {
    if (pageNum >= officeUsersState?.officeUsers?.totalPages) {
      setPageNum(officeUsersState?.officeUsers?.totalPages);
    } else {
      setPageNum(pageNum + 1);
    }
  };


  const createDirectorate = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);
     
      await apiRequest
        .post(
          "/directorate_api/create_directorate",
          {
            name_en: directorateName,
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
            division,
            members: checkedOfficeUsers,
          },
          {
            headers: {
              get_crdirect_api: process.env.REACT_APP_GET_CRDIRECT_API,
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res?.status === 201) {
            translationState?.lan ==="En" ?  toast.success(res?.data?.Message_en) : toast.success(res?.data?.Message_am)
           
            setTimeout(() => {
              setLoading(false);
              window.location.href = "/directorate";
            }, 6000);
          }
        })
        .catch((error) => {
          setLoading(false);
          translationState?.lan==="En" ?    toast.error(error?.response?.data?.Message_en):   toast.error(error?.response?.data?.Message_am);
       
          if (error?.response?.status === 500) {
            setServerError(true);
          } 
        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };

  if (serverError) return <ServerError />;
  return (
    <div className="w-[100%] min-h-[80vh] mx-auto bg-white">
      <ToastContainer theme="light" />
      <div className="w-[90%] mt-[30px] mx-auto">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex items-center justify-start text-[#FBB042]">
              <BiChevronLeft
                onClick={() => navigate(-1)}
                className="text-[40px] cursor-pointer max-lg2:text-[30px]"
              />
              <span className="text-[20px] font-bold max-lg2:text-[16px]">Add New Directorate</span>
            </div>

            <div className="w-[90%] mx-auto mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-3">
                <label
               
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate Name (english) <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setDirectorateName(e?.target?.value)}
                    required
                    className="block w-full p-3 outline-none rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
             

              <div className="col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate Name (amharic) <span className="text-red-700">*</span>
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
              <div className="col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate Name (oromo) <span className="text-red-700">*</span>
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
              <div className="col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate Name (afar) <span className="text-red-700">*</span>
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
              <div className="col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate Name (tigrgna) <span className="text-red-700">*</span>
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
              <div className="col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate Name (somali) <span className="text-red-700">*</span>
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
              <div className="col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate description (english){" "}
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

              <div className="col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate description (amharic){" "}
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
              <div className="col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate description (oromo){" "}
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
              <div className="col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate description (tigrigna){" "}
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

              <div className="col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate description (afar){" "}
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
              <div className="col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate description (somali){" "}
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
              <div className="col-span-3">
                <label
                
                  className="text-[#0C73B8] text-[15px] flex items-center gap-[10px] font-semibold max-lg2:text-[12px]"
                >
              <span>    Division <span className="text-red-700">*</span></span>
             
                </label>
                <div className="mt-2">
                  <select
                    onChange={(e) => setDivision(e?.target?.value)}
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  >
                    <option value={""}>Select Division</option>
                    {divisionState?.divisions?.map((di, index) => {
                      return (
                        <option key={index} value={di?._id}>
                          {di?.name_en}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            
            </div>
          </div>
        </div>

         {filterByTeamandProfessionals?.length !== 0 && (
          <div className="w-[90%] mx-auto my-[30px] border-b">
            <span className="text-[#0C73B8] font-bold flex items-center gap-[10px] max-lg2:text-[14px] ">
           <span>Add Members to directorate </span>
              {officeUsersState?.officeUsers?.officeusers?.length > 0 &&
                    divisionState?.divisions?.totalPages >1  && (
                      <div className="flex  items-center  gap-1">
                        <button
                          onClick={handlePrevious}
                          className="mx-1 w-[24px] h-[24px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:w-[20px] max-lg2:h-[20px]"
                        >
                          <IoIosArrowBack />
                        </button>
                        <span className="text-gray-600 font-semibold">
              {officeUsersState?.officeUsers?.currentPage} of{" "}
              {officeUsersState?.officeUsers?.totalPages}
            </span>

                        <button
                          onClick={handleNext}
                          className={
                            "mx-1 w-[24px] h-[24px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500  outline-none max-lg2:w-[20px] max-lg2:h-[20px]"
                          }
                        >
                          <IoIosArrowForward />
                        </button>
                      </div>
                    )}
            </span>

            <div className="w-[90%] my-[30px] mx-auto grid grid-cols-1 gap-[30px] max-h-[400px] overflow-auto">
              {filterByTeamandProfessionals?.map((user) => (
                <label
                  key={user?._id}
                  className="col-span-1 flex items-center gap-[10px]"
                >
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    value={user?._id}
                  />
                  <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                    {user?.firstname} {user?.middlename} {user?.lastname} (
                    {user?.level})
                  </span>
                </label>
              ))}
            </div>
          </div>
        )} 
                    

        <div className="w-[90%] mx-auto my-6 py-5 flex items-center justify-end gap-x-6">
          <button
            onClick={() => navigate(-1)}
            className="text-sm  leading-6 text-gray-900 max-lg2:text-[12px]"
          >
            Cancel
          </button>
          <button
            onClick={createDirectorate}
            disabled={loading}
            className={
              loading
                ? "rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-not-allowed max-lg2:text-[12px]"
                : "rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 max-lg2:text-[12px]"
            }
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateDirectorate;
