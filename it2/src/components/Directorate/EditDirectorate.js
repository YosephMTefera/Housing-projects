import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {useDispatch,  useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiRequest from "../../utils/request";
import ServerError from "../ServerError";
import { BiChevronLeft } from "react-icons/bi";
import { fetchAllOfficeUsers } from "../../REDUX/slices/allOfficeUsersSlice";
import { fetchAllDivision } from "../../REDUX/slices/allDivisionsSlice";
import Loading from "../Loading";

function EditDirectorate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("tID");
  const translationState = useSelector((state)=>state.translation)
  const divisionState = useSelector((state) => state?.allDivisions);
  const officeUsersState = useSelector((state) => state?.allOfficers);
  const [division, setDivision] = useState("");
  const [directorate,setDirectorate] = useState({})
  const [directorateName,setDirectorateName] = useState("")
  const [nameAm,setNameAm] = useState("");
  const [nameOr,setNameOr] = useState("");
  const [nameSm,setNameSm] =useState("");
  const [nameTg,setNameTg] = useState("");
  const [nameAf,setNameAf] = useState("");
  const [descriptionEn,setDescriptionEn] = useState("");
  const [descriptionAm,setDescriptionAm] = useState("");
  const [descriptionOr,setDescriptionOr] = useState("");
  const [descriptionSm,setDescriptionSm] =useState("");
  const [descriptionTg,setDescriptionTg] = useState("");
  const [descriptionAf,setDescriptionAf] = useState("")
  const [manager, setManager] = useState("");
  const [member, setMember] = useState([]);
  const [checkedOfficeUsers, setCheckedOfficeUsers] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState("");
  const [serverError, setServerError] = useState("");



  useEffect(()=>{
    dispatch(fetchAllOfficeUsers());
    dispatch(fetchAllDivision());
 

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  useEffect(() => {
    apiRequest
      .get(`/directorate_api/get_directorate/${id}`, {
        headers: {
          get_direct_api: process.env.REACT_APP_GET_DIRECT_API,
     
        },
      })
      .then((res) => {
        if (res?.status === 200) {
          setServerError(false);
          setDirectorate(res?.data);
          setDirectorateName(res?.data?.name_en);
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
          setDivision(res?.data?.division?._id);
          setManager(res?.data?.manager?._id);
          setStatus(res?.data?.status);
          setMember(res?.data?.members);
        }
      })
      .catch((error) => {
        if (error?.response?.status === 500) {
          setServerError(true);
        } else {
          translationState?.lan === "En" ? toast.error(error?.response?.data?.Message_en) :   toast.error(error?.response?.data?.Message_am);
       
        }
      });

    // eslint-disable-next-line
  }, [id]);

  const directorUsers = officeUsersState?.officeUsers?.filter(
    (ou) => ou?.level === "Directors"
  );
  const filterDirectorUsers = directorUsers?.filter(
    (fdu) => fdu?.division?._id === division
  );



  const filterTP = officeUsersState?.officeUsers?.filter(
    (ou) => {
      return (
        (ou?.level === "Professionals" || ou?.level === "TeamLeaders")
       
      );
    }
  );
  const filterByTeamandProfessionals = filterTP?.filter((user)=>user?.division?._id ===directorate?.division?._id);


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

  useEffect(() => {
    const result = directorate?.members?.map((item) =>
      typeof item === "object" ? item?.users?._id : item
    );
    setCheckedOfficeUsers(result);
  }, [directorate?.members]);

  const isUserInDirectorate = (userId) => {
    return directorate?.members?.some((member) => member.users?._id === userId);
  };

  const filteredUsers = checkedOfficeUsers?.filter(
    (co) => !directorate?.members?.some((fd) => fd?.users?._id === co)
  );

  // ("filtered users: ",filteredUsers)
  const editDirectorate = async () => {
    try {
      setLoading(true);
     
      await apiRequest
        .put(
          `/directorate_api/update_directorate/${id}`,
          {
            name_en: directorateName,
            name_am:nameAm,
            name_or:nameOr,
            name_sm:nameSm,
            name_tg:nameTg,
            name_af:nameAf,
            description_en:descriptionEn,
            description_am:descriptionAm,
            description_or:descriptionOr,
            description_sm:descriptionSm,
            description_tg:descriptionTg,
            description_af:descriptionAf,
            division,
            manager,
            members: filteredUsers,
            status,
          },
          {
            headers: {
              get_upddirect_api: process.env.REACT_APP_GET_UPDDIRECT_API,
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            translationState?.lan==="En" ? toast.success(res?.data?.Message_en):toast.success(res?.data?.Message_am)
            setTimeout(() => {
              setLoading(false);
              window.location.href = "/directorate";
            }, 6000);
          }
        })
        .catch((error) => {
          setLoading(false);
        ;
          if (error?.response?.status === 500) {
            setServerError(true);
          } 
          translationState?.lan==="En" ?   toast.error(error?.response?.data?.Message_en) :  toast.error(error?.response?.data?.Message_am)
        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };

  if (serverError) return <ServerError />;

  return (
    <div className="w-[95%] mx-auto min-h-[80vh] mt-[30px]  bg-white">
      <ToastContainer theme="light" />
      <div className="w-[95%] mx-auto">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex items-center justify-start  text-[#FBB042]">
              <BiChevronLeft
                onClick={() => navigate(-1)}
                className="text-[40px] cursor-pointer max-lg2:text-[30px]"
              />
              <span className="text-[20px] font-bold capitalize max-lg2:text-[16px]">
                Edit {directorate?.name}
              </span>
            </div>

            <div className="w-[90%] mx-auto mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate name  in (english)
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={directorateName}
                    onChange={(e) => setDirectorateName(e?.target?.value)}
                    required
                    className="block w-full p-3 outline-none rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate name in (amharic) 
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setNameAm(e?.target?.value)}
                    required
                    value={nameAm}
                    className="block w-full p-2 outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate name in (oromo) 
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setNameOr(e?.target?.value)}
                    required
                    value={nameOr}
                    className="block w-full p-2 outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate name  in (afar) 
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setNameAf(e?.target?.value)}
                    required
                    value={nameOr}
                    className="block w-full p-2 outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate name in (tigrgna) 
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setNameTg(e?.target?.value)}
                    required
                    value={nameTg}
                    className="block w-full p-2 outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate name in (somali) 
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setNameSm(e?.target?.value)}
                    required
                    value={nameSm}
                    className="block w-full p-2 outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
             

              <div className="col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate description in (english)
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    onChange={(e) => setDescriptionEn(e?.target?.value)}
                    rows={15}
                    required
                    value={descriptionEn}
                    className="block w-full p-2 outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  >

                  </textarea>
                </div>
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate description in (amharic) 
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    onChange={(e) => setDescriptionAm(e?.target?.value)}
                    required
                    rows={15}
                    value={descriptionAm}
                    className="block w-full p-2 outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  ></textarea>
                </div>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate description in (oromo) 
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    onChange={(e) => setDescriptionOr(e?.target?.value)}
                    required
                    rows={15}
                    value={descriptionOr}
                    className="block w-full p-2 outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  ></textarea>
                </div>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate description in (tigrigna) 
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    onChange={(e) => setDescriptionTg(e?.target?.value)}
                    required
                    rows={15}
                    value={descriptionTg}
                    className="block w-full p-2 outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  ></textarea>
                </div>
              </div>
              
              <div className="col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Directorate description in (afar) 
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    onChange={(e) => setDescriptionAf(e?.target?.value)}
                    value={descriptionAf}
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
                  Directorate description  in (somali) 
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    onChange={(e) => setDescriptionSm(e?.target?.value)}
                    required
                    rows={15}
                    value={descriptionSm}
                    className="block w-full p-2 outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  ></textarea>
                </div>
              </div>
              <div className="col-span-3">
                <label
                 
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <select
                    value={division}
                    onChange={(e) => setDivision(e?.target?.value)}
                    className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  >
                    <option value={""}>Select Division</option>
                    {divisionState?.divisions?.map((di, index) => {
                      return (
                        <option key={index} value={di?._id}>
                          {di?.name_am}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col-span-3">
                <label className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]">
                  Manager <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <select
                    value={manager}
                    onChange={(e) => setManager(e?.target?.value)}
                    className="block w-full rounded-md p-4 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  >
                    <option value={""}>Choose Manager</option>
                    {filterDirectorUsers?.map((du, index) => {
                      return (
                        <option key={index} value={du?._id}>
                          {du?.firstname} {du?.middlename} {du?.lastname} (
                          {du?.level})
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="col-span-3">
                <label className="block text-[#0C73B8] font-bold text-[15px] max-lg2:text-[12px]">Status</label>
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

        {filterByTeamandProfessionals?.length !== 0 && (
          <div className="w-[90%] mx-auto my-[30px] border-b">
            <span className="text-[#0C73B8] font-bold max-lg2:text-[14px]">
              Add Members to directorate
            </span>
            {member?.length > 0 && (
              <div className="w-[90%] mx-auto flex flex-col gap-4 max-h-[300px] overflow-auto my-[30px] border-b">
                <span className="text-[#0C73B8] text-[14px] font-bold">
                  Already Members
                </span>
                <div className="grid grid-cols-3 gap-[30px] my-[20px]">
                  {member?.map((item, index) => {
                    return (
                      <div key={index} className="flex gap-2 items-center">
                        <span className="text-[14px] text-gray-500">
                          {index + 1}.
                        </span>
                        <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
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

            {/* <div className="w-[90%] my-[30px] mx-auto grid grid-cols-1 gap-[30px] max-h-[400px] overflow-auto">
              {filterByTeamandProfessionals?.map((user) => {
                const userFound = isUserInDirectorate(user);

                if (userFound) {
                  return (
                    <label
                      key={user?._id}
                      className="grid-col-1 flex items-center gap-[10px]"
                    >
                      <input
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        value={user?._id}
                        checked
                        disabled
                      />
                      <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                        {user?.firstname} {user?.middlename} {user?.lastname} (
                        {user?.level})
                      </span>
                    </label>
                  );
                }
                return (
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
                );
              })}
            </div> */}

<div className="w-[90%] my-[30px] mx-auto grid grid-cols-1 gap-[30px] max-h-[400px] overflow-auto">
              {filterByTeamandProfessionals?.map((user) => {
                const userFound = isUserInDirectorate(user?._id);

               return  !userFound &&    <label
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

               
                })
              }
            </div>
          </div>
        )}


        {loading ? <Loading addtionalStyle={"flex justify-end items-center my-[20px]"} />:  <div className="w-[90%] mx-auto my-6 py-5 flex items-center justify-end gap-x-6">
          <button
            onClick={() => navigate(-1)}
            className="text-sm  leading-6 text-gray-900  max-lg2:text-[12px]"
          >
            Cancel
          </button>
          <button
            onClick={editDirectorate}
            className={
              loading
                ? "rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-not-allowed max-lg2:text-[12px]"
                : "rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 max-lg2:text-[12px]"
            }
          >
            Edit
          </button>
        </div>}

      
      </div>
    </div>
  );
}

export default EditDirectorate;
