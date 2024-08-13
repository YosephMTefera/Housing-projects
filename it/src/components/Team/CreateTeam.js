import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ServerError from "../ServerError";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiRequest from "../../utils/request";
import { BiChevronLeft } from "react-icons/bi";
import { fetchAllDirectorate } from "../../REDUX/slices/allDirectorateSlice";
import { fetchAllOfficeUsers } from "../../REDUX/slices/allOfficeUsersSlice";

function CreateTeam() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("tID");
  const translationState = useSelector((state)=>state.translation)
  const directorateState = useSelector((state) => state?.allDirectorates);
  const officeUsersState = useSelector((state) => state?.allOfficers);
  const [teamName, setTeamName] = useState("");
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
  const [directorate, setDirectorate] = useState("");
  const [checkedOfficeUsers, setCheckedOfficeUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    dispatch(fetchAllDirectorate());
    dispatch(fetchAllOfficeUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const directorateDivision = directorateState?.directorates?.find((directorate1)=>directorate1?._id===directorate);
  


  const filterByProfessionals = officeUsersState?.officeUsers?.filter((ou) => {
    return ou?.level === "Professionals" && ou?.division?._id ===directorateDivision?.division?._id;
  });

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

  const createTeam = async () => {
    try {
      setLoading(true);
  
      await apiRequest
        .post(
          "/team_leader_api/create_team",
          {
            name_en: teamName,
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
            directorate,
            members: checkedOfficeUsers,
          },
          {
            headers: {
              get_createam_api: process.env.REACT_APP_GET_CREATEAM_API,
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res?.status === 201) {
          translationState?.lan==="En" ?   toast.success(res?.data?.Message_en):  toast.success(res?.data?.Message_am)
            setTimeout(() => {
              setLoading(false);
              window.location.href = "/teamleader";
            }, 6000);
          }
        })
        .catch((error) => {
          setLoading(false);
        
          if (error?.response?.status === 500) {
            setServerError(true);
          } 
          translationState?.lan==="En" ?   toast.error(error?.response?.data?.Message_en):  toast.error(error?.response?.data?.Message_am);
        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };

  if (serverError) return <ServerError />;

  return (
    <div className="w-[100%] mt-[30px] min-h-[80vh] bg-white">
      <ToastContainer theme="light" />
      <div className="w-[90%] mx-auto">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex items-center justify-start  text-[#FBB042]">
              <BiChevronLeft
                onClick={() => navigate(-1)}
                className="text-[40px] cursor-pointer max-lg2:text-[30px]"
              />
              <span className="text-[20px] font-bold max-lg2:text-[16px]">Add New Team</span>
            </div>

            <div className="w-[90%] mx-auto mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-3">
                <label
            
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Team name  in (english) <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setTeamName(e?.target?.value)}
                    required
                    className="block w-full p-3 outline-none rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
            
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Team name  in (amharic) <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setNameAm(e?.target?.value)}
                    required
                    className="block w-full p-3 outline-none rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
            
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Team name  in (oromo) <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setNameOr(e?.target?.value)}
                    required
                    className="block w-full p-3 outline-none rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
            
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Team name  in (tigrgna) <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setNameTg(e?.target?.value)}
                    required
                    className="block w-full p-3 outline-none rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
            
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Team name  in (afar) <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setNameAf(e?.target?.value)}
                    required
                    className="block w-full p-3 outline-none rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
            
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Team name  in (somali) <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setNameSm(e?.target?.value)}
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
                  Team description (english){" "}
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
                  Team description (amharic){" "}
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
                  Team description (oromo){" "}
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
                  Team description (tigrigna){" "}
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
                  Team description (afar){" "}
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
                  Team description (somali){" "}
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
               
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <select
                    onChange={(e) => setDirectorate(e?.target?.value)}
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  >
                    <option value={""}>Choose Directorate</option>
                    {directorateState?.directorates?.map(
                      (directorate, index) => {
                        return (
                          <option key={index} value={directorate?._id}>
                            {directorate?.name_am}
                          </option>
                        );
                      }
                    )}
                  </select>
                </div>
              </div>
             
            </div>
            <div></div>
          </div>
        </div>

        {filterByProfessionals?.length !== 0 && (
          <div className="w-[90%] mx-auto my-[30px] border-b">
            <span className="text-[#0C73B8] font-bold max-lg2:text-[14px]">
              Add members to team
            </span>
            <div className="w-[90%] my-[30px] mx-auto grid grid-cols-1 gap-[30px]">
              {filterByProfessionals?.map((user) => (
                <label
                  key={user?._id}
                  className="grid-col-1 flex items-center gap-[10px]"
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
            className="text-sm leading-6 text-gray-900 max-lg2:text-[12px]"
          >
            Cancel
          </button>
          <button
            onClick={createTeam}
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

export default CreateTeam;
