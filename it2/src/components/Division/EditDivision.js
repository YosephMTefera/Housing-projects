import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiRequest from "../../utils/request";
import ServerError from "../ServerError";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { BiChevronLeft } from "react-icons/bi";
import Loading from "../Loading";
import { fetchAllOfficeUsers } from "../../REDUX/slices/allOfficeUsersSlice";

function EditDivision() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { id } = useParams();
  const token = sessionStorage.getItem("tID");
  const translationState = useSelector((state)=>state.translation);
  const officeUsersState = useSelector((state) => state?.allOfficers);
  const [divisionName, setDivisionName] = useState("");
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
  const [descriptionAf,setDescriptionAf] = useState("");
  const [special,setSpecial] = useState("no")
  const [manager, setManager] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    dispatch(fetchAllOfficeUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



 

  useEffect(() => {
    apiRequest
      .get(`/division_api/get_division/${id}`, {
        headers: {
          get_div_api: process.env.REACT_APP_GET_DIV_API,

        },
      })
      .then((res) => {
        if (res?.status === 200) {
          setServerError(false);
          setDivisionName(res.data.name_en);
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
          setSpecial(res.data.special);
          setManager(res?.data?.manager?._id)
          setStatus(res?.data?.status);
          
      
        }
      })
      .catch((error) => {
        if (error?.response?.status === 500) {
          setServerError(true);
        } else {
          translationState?.lan ==="En" ? toast.error(error?.response?.data?.Message_en) :toast.error(error?.response?.data?.Message_am)
          
          
        }
      });

    // eslint-disable-next-line
  }, [id]);



  const editDivision = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);
      loading && toast.loading("Loading...");
      await apiRequest
        .put(
          `/division_api/update_division/${id}`,
          {
            name: divisionName,
            name_en: divisionName,
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
            manager,
            status,
          },
          {
            headers: {
              get_updatediv_api: process.env.REACT_APP_GET_UPDATEDIV_API,
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
        translationState?.lan ==="En" ?  toast.success(res?.data?.Message_en):     toast.success(res?.data?.Message_am);
            setTimeout(() => {
              setLoading(false);
              window.location.href = `/division`;
            }, 6000);
          }
        })
        .catch((error) => {
          setLoading(false);
       
          if (error?.response?.status === 500) {
            setServerError(true);
          } 
          translationState?.lan ==="En" ? toast.error(error?.response?.data?.Message_en):   toast.error(error?.response?.data?.Message_am)

        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };

  const filterMainExecutive = officeUsersState?.officeUsers?.filter(
    (main) => main?.level === "MainExecutive"
  );
  const filterDivisionMangers = officeUsersState?.officeUsers?.filter((user)=>user?.level==="DivisionManagers");


  if (serverError) return <ServerError />;

  return (
    <div className="w-[95%] mx-auto h-[82%] mt-[30px] bg-white rounded">
      <ToastContainer theme="light" />
      <div className="w-[95%] mx-auto">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex items-center justify-start gap-[10px] text-[#FBB042]">
              <BiChevronLeft
                onClick={() => navigate(-1)}
                className="text-[40px] cursor-pointer max-lg2:text-[30px]"
              />
              <span className="text-[20px] font-bold max-lg2:text-[16px]">
                Edit Division House Construction
              </span>
            </div>

            <div className="mt-10 px-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division name in (english) 
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setDivisionName(e?.target?.value)}
                    required
                    value={divisionName}
                    className="block w-full p-2 outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division name in (amharic) 
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
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division name in (oromo) 
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
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division name in (tigrigna) 
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
              
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division name in (afar) 
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    onChange={(e) => setNameAf(e?.target?.value)}
                    required
                    value={nameAf}
                    className="block w-full p-2 outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division name  in (somali) 
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
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division description in (english)
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

              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division description in (amharic) 
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
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division description in (oromo) 
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
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division description in (tigrigna) 
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
              
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division description in (afar) 
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
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="text-[#0C73B8] text-[15px] font-semibold max-lg2:text-[12px]"
                >
                  Division description  in (somali) 
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
                  value={special}
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
                  <span>
                    {" "}
                    Manager
                  </span>
              
                </label>
                <div className="mt-2">
                  <select
                  value={manager}
                    onChange={(e) => setManager(e?.target?.value)}
                    className="w-[100%]  p-4 text-[14px] border border-[#FBB042] rounded-[5px] outline-none max-lg2:text-[12px] max-lg2:py-2"
                    type="text"
                  >
                    <option value={null}>Manager</option>
                    {special === "yes"
                      ? filterMainExecutive?.map((ou, index) => {
                          return (
                            <option key={index} value={ou?._id}>
                              {ou?.firstname} {ou?.middlename} {ou?.lastname}
                            </option>
                          );
                        })
                      : filterDivisionMangers?.map((ou, index) => {
                          return (
                            <option key={index} value={ou?._id}>
                              {ou?.firstname} {ou?.middlename} {ou?.lastname}
                            </option>
                          );
                        })}
                  </select>
               
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-[#0C73B8] font-bold max-lg2:text-[12px]">Status</label>
                <div className="mt-2">
                  <select
                    required
                    value={status}
                    onChange={(e) => setStatus(e?.target?.value)}
                    className="block w-full p-2 outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] sm:leading-6 max-lg2:text-[12px] max-lg2:py-2"
                  >
                    <option value={""}>Status</option>
                    <option value={"active"}>Active</option>
                    <option value={"inactive"}>Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>


{loading ? <Loading addtionalStyle={"flex justify-end items-center my-[20px]"}/>:  <div className="my-6 py-5 flex items-center justify-end gap-x-6">
          <button
            onClick={() => navigate(-1)}
            className="text-sm  leading-6 text-gray-900 max-lg2:text-[12px]"
          >
            Cancel
          </button>
          <button
            onClick={editDivision}
            type="submit"
            className={
              loading
                ? "rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-not-allowed max-lg2:text-[12px]"
                : "rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 max-lg2:text-[12px]"
            }
          >
            Save
          </button>
        </div>}
       
      </div>
    </div>
  );
}

export default EditDivision;
