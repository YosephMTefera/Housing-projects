// import axios from "axios";
import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOfficeUsers } from "../../REDUX/slices/officeUsersSlice";
import apiRequest from "../../utils/request";
import { toast } from "react-toastify";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ServerError from "../ServerError";
import Loading from "../Loading";

function AddMemberDirectorate({nameEn,nameAm,nameOr,nameTg,nameSm, nameAf,descriptionEn, descriptionAm,descriptionOr, descriptionTg, descriptionAf, descriptionSm, division, manager}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token =sessionStorage.getItem('tID')
  const translationState = useSelector((state)=>state.translation)
  const officeUsersState = useSelector((state) => state.officeUsers);
  const [checkedOfficeUsers, setCheckedOfficeUsers] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [loading,setLoading]  = useState(false);
  const [serverError,setServerError] = useState(false);



  useEffect(() => {
    dispatch(fetchOfficeUsers({
      page: pageNum,
      sort: "",
      status: "",
      username: "",
      division,
      level: "Professionals",
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]);


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

            name_en: nameEn,
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
            manager,
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
            }, 3000);
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
    <div className="w-[100%] mt-[30px] mx-auto min-h-[80vh]   bg-white">
      <div className="w-[100%] mt-[50px] mx-auto">
      {officeUsersState?.officeUsers?.officeusers?.length !== 0 && (
          <div className="w-[90%] mx-auto my-[30px] border-b">
            <span className="text-[#0C73B8] font-bold flex items-center gap-[10px] max-lg2:text-[14px] ">
           <span>Add Members to directorate </span>
              {officeUsersState?.officeUsers?.officeusers?.length > 0 &&
                    officeUsersState?.officeUsers?.totalPages   && (
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
              {officeUsersState?.officeUsers?.officeusers?.map((user) => (
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


        {loading ? <Loading addtionalStyle={"flex justify-end items-center my-[20px]"}/>:   <div className="my-6 py-5 flex items-center justify-end gap-x-6">
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={createDirectorate}
            type="submit"
            className="rounded-md bg-[#FBB042] px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Save
          </button>
        </div>}

      
      </div>
    </div>
  );
}

export default AddMemberDirectorate;
