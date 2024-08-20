// import axios from 'axios'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import apiRequest from "../../utils/request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../ServerError";
import { BiChevronLeft } from "react-icons/bi";
import { fetchAllTeams } from "../../REDUX/slices/allTeamSlice";
import { fetchAllDirectorate } from "../../REDUX/slices/allDirectorateSlice";
import { fetchAllOfficeUsers } from "../../REDUX/slices/allOfficeUsersSlice";

function EditTeam() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const token = sessionStorage.getItem("tID");
  const translationState = useSelector((state)=>state.translation);
  const directorateState = useSelector((state) => state?.allDirectorates);
  const officeUsersState = useSelector((state) => state?.allOfficers);
  const teamState = useSelector((state) => state?.allTeams);
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
  const [manager, setManager] = useState("");
  const [member, setMember] = useState([]);
  const [checkedOfficeUsers, setCheckedOfficeUsers] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    dispatch(fetchAllTeams());
    dispatch(fetchAllDirectorate());
    dispatch(fetchAllOfficeUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    apiRequest
      .get(`/team_leader_api/get_team/${id}`, {
        headers: {
          get_team_api: process.env.REACT_APP_GET_TEAM_API,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.status === 200) {
          setServerError(false);
          setTeamName(res?.data?.name_en);
          setNameAm(res.data.name_am);
          setNameOr(res.data.name_or);
          setNameSm(res.data.name_sm);
          setNameTg(res.data.name_tg);
          setNameAf(res.data.name_af);
          setDescriptionEn(res.data.description_en);
          setDescriptionAm(res.data.description_am);
          setDescriptionOr(res.data.description_or);
          setDescriptionSm(res.data.description_sm);
          setDescriptionTg(res.data.description_tg);
          setDescriptionAf(res.data.description_af);
          setDirectorate(res?.data?.directorate?._id);
          setManager(res?.data?.manager?._id);
          setStatus(res?.data?.status);
          setMember(res?.data?.members);
        }
      })
      .catch((error) => {
        if (error?.response?.status === 500) {
          setServerError(true);
        } else {
          translationState.lan==="En" ?  toast.error(error?.response?.data?.Message_en) : toast.error(error?.response?.data?.Message_am)
         
        }
      });

    // eslint-disable-next-line
  }, [id]);

  const filterDirectorate = directorateState?.directorates?.find(
    (d) => d?._id === directorate
  );
  const managerDirectorate = officeUsersState?.officeUsers?.filter(
    (ou) => ou?.division?._id === filterDirectorate?.division?._id
  );
  const teamUsers = managerDirectorate?.filter(
    (manager) => manager?.level === "TeamLeaders"
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

  const findTeam = teamState?.teams?.find((team) => team?._id === id);
  const findDirectorate = directorateState?.directorates?.find(
    (directorate) => directorate?._id === findTeam?.directorate?._id
  );


  const filterByProfessionals = officeUsersState?.officeUsers?.filter((ou) => {
    return (
      (ou?.level === "Professionals")&&
      ou?.division?._id === findDirectorate?.division?._id
    );
  });


  const isUserInTeam = (userId) => {
    return findTeam?.members?.some((member) => member?.users?._id === userId);
  };

  useEffect(() => {
    const result = findTeam?.members.map((item) =>
      typeof item === "object" ? item?.users : item
    );
    setCheckedOfficeUsers(result);
  }, [findTeam?.members]);

  const filteredUsers = checkedOfficeUsers?.filter(
    (co) => !findTeam?.members?.some((fd) => fd?.users === co)
  );

  const editTeam = async () => {
    try {
      setLoading(true);
 
      await apiRequest
        .put(
          `/team_leader_api/update_team/${id}`,
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
            manager,
            members: filteredUsers,
            status,
          },
          {
            headers: {
              get_updateam_api: process.env.REACT_APP_GET_UPDATEAM_API,
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            translationState.lan==="En" ? toast.success(res?.data?.Message_en) :toast.success(res?.data?.Message_am)
            
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
          translationState.lan==="En" ?  toast.error(error?.response?.data?.Message_en) :  toast.error(error?.response?.data?.Message_am)
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
              <span className="text-[20px] font-bold capitalize max-lg2:text-[16px]">
                Edit {findTeam?.name_am}
              </span>
            </div>

            <div className="w-[90%] mx-auto mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-3">
                <label
                 
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Team name in (english)
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e?.target?.value)}
                    className="block w-full p-3 outline-none rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042]  sm:text-sm sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
                 
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Team name in (amharic)
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={nameAm}
                    onChange={(e) => setNameAm(e?.target?.value)}
                    className="block w-full p-3 outline-none rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042]  sm:text-sm sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
                 
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Team name in (oromo)
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={nameOr}
                    onChange={(e) => setNameOr(e?.target?.value)}
                    className="block w-full p-3 outline-none rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042]  sm:text-sm sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
                 
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Team name in (tigrgna)
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={nameTg}
                    onChange={(e) => setNameTg(e?.target?.value)}
                    className="block w-full p-3 outline-none rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042]  sm:text-sm sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
                 
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Team name in (afar)
                </label>

                <div className="mt-2">
                  <input
                    type="text"
                    value={nameAf}
                    onChange={(e) => setNameAf(e?.target?.value)}
                    className="block w-full p-3 outline-none rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042]  sm:text-sm sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
                 
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Team name in (somali)
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={nameSm}
                    onChange={(e) => setNameSm(e?.target?.value)}
                    className="block w-full p-3 outline-none rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042]  sm:text-sm sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Team description (english){" "}
                 
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    value={descriptionEn}
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
               +
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    value={descriptionAm}
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
              
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    value={descriptionOr}
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
            
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    value={descriptionTg}
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
              
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    value={descriptionAf}
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
               
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    value={descriptionSm}
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
                  Directorate 
                </label>
                <div className="mt-2">
                  <select
                    value={directorate}
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
              <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                  Manager 
                </label>
                <div className="mt-2">
                  <select
                    value={manager}
                    onChange={(e) => setManager(e?.target?.value)}
                    className="block w-full rounded-md p-4 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  >
                    <option value={""}>Choose Manager</option>
                    {teamUsers?.map((tu, index) => {
                      return (
                        <option key={index} value={tu?._id}>
                          {tu?.firstname} {tu?.middlename} {tu?.lastname} (
                          {tu?.level})
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="col-span-3">
                <label className="block text-[#0C73B8] font-bold max-lg2:text-[12px]">Status</label>
                <div className="mt-2">
                  <select
                    required
                    value={status}
                    onChange={(e) => setStatus(e?.target?.value)}
                    className="block w-full rounded-md p-4 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  >
                    <option value={""}>Status</option>
                    <option value={"active"}>Active</option>
                    <option value={"inactive"}>Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {filterByProfessionals?.length !== 0 && (
          <div className="w-[90%] mx-auto my-[30px] border-b ">
            <span className="text-[#0C73B8] font-bold max-lg2:text-[14px]">
              Add Members to team
            </span>

            {member?.length > 0 && (
              <div className="w-[90%] mx-auto flex flex-col gap-4 max-h-[300px] overflow-auto my-[30px] ">
                <span className="text-[#0C73B8] text-[14px] font-bold">
                  Already Members
                </span>
                <div className="grid grid-cols-3 gap-[20px] border-b my-[10px] py-[10px]" >
                  {member?.map((item, index) => {
                    return (
                      <div key={index} className="col-span-3 flex gap-2 items-center">
                        <span className="text-[14px] text-gray-500">
                          {index + 1}.
                        </span>
                        <span className="text-[14px] text-gray-500  max-lg2:text-[12px]">
                          {
                            officeUsersState?.officeUsers?.find(
                              (office) =>
                                office?._id?.toString() === item?.users?._id
                            )?.firstname
                          }{" "}
                          {
                            officeUsersState?.officeUsers?.find(
                              (office) =>
                                office?._id?.toString() === item?.users?._id
                            )?.middlename
                          }{" "}
                          {
                            officeUsersState?.officeUsers?.find(
                              (office) =>
                                office?._id?.toString() === item?.users?._id
                            )?.lastname
                          }{" "}
                          (
                          {
                            officeUsersState?.officeUsers?.find(
                              (office) =>
                                office?._id?.toString() === item?.users?._id
                            )?.level
                          }
                          )
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

             <div className="w-[90%] mx-auto my-[30px] grid grid-cols-4 gap-[30px]">
              {filterByProfessionals?.map((user) => {
                const userFound = isUserInTeam(user._id);
              
                  return !userFound &&    <label
                  key={user?._id}
                  className="col-span-4 flex items-center gap-[10px]"
                >
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    value={user?._id}

                  />
                  <span className="text-[14px] text-gray-500">
                    {user?.firstname} {user?.middlename} {user?.lastname} (
                    {user?.level})
                  </span>
                </label>
              
                
               
              })}
            </div>
          </div>
        )}

        <div className="my-6 py-5 flex items-center justify-end gap-x-6">
          <button
            onClick={() => navigate("/teamleader")}
            className="text-sm  leading-6 text-gray-900 max-lg2:text-[12px]"
          >
            Cancel
          </button>
          <button
            onClick={editTeam}
            disabled={loading}
            className={
              loading
                ? "rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-not-allowed max-lg2:text-[12px]"
                : "rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 max-lg2:text-[12px]"
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTeam;
