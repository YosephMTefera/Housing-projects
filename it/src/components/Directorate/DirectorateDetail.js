import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiRequest from "../../utils/request";
import ServerError from "../ServerError";
import { fetchAllOfficeUsers } from "../../REDUX/slices/allOfficeUsersSlice";

function DirectorateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("tID");
  const dispatch = useDispatch();
  const translationState = useSelector((state) => state?.translation);
  const directorateState = useSelector((state) => state?.directorates);
  const officeUsersState = useSelector((state) => state?.allOfficers);
  const [directorate, setDirectorate] = useState({});
  const [manager,setManager] = useState({})
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    dispatch(fetchAllOfficeUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  useEffect(() => {
    setLoading(true);
    apiRequest
      ?.get(`/directorate_api/get_directorate/${id}`, {
        headers: {
          get_direct_api: process.env.REACT_APP_GET_DIRECT_API,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setDirectorate(res.data);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          setServerError(true);
        }
      });
  }, [id, token]);
 
  useEffect(() => {
    try {
   
      if(directorate?.manager){
        setLoading(true);
        apiRequest
        .get(`/office_user_api/get_office_user/${directorate?.manager?._id}`, {
          headers: {
            get_user_api: process.env.REACT_APP_GET_USER_API,
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
        setLoading(false)
          setManager(res?.data);
        })
        .catch((error) => {
          setLoading(false)
          if (error?.response?.status === 500) {
            setServerError(true);
          }
        });

      }
     
    } catch (error) {
      setLoading(false)
      setServerError(true);
    }
  }, [id, token,directorate?.manager]);

  const removeMember = async (officerID) => {
    try {
      setLoading(true);
     

      await apiRequest
        ?.put(
          `/directorate_api/remove_directorate_member/${id}/${officerID}`,
          {},
          {
            headers: {
              get_rememdirect_api: process.env.REACT_APP_GET_REMEMDIRECT_API,
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            setLoading(false);
            window.location.href = `/directorate/${id}`;
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
      setServerError(false);
      setLoading(false);
    }
  };



  if (serverError) return <ServerError />;
  return (
    <div className="w-[95%] mx-auto h-[82%] mt-[30px] relative bg-white rounded">
      <ToastContainer theme="light" />
    {(directorateState?.loading || officeUsersState?.loading) ? <Loading addtionalStyle={"flex justify-center items-center my-[20px]"}/> :  <div className="w-[95%] mx-auto">
        <div className="flex items-center justify-between gap-[10px] text-[#FBB042]">
          <div className="w-[100%] flex items-center justify-start">
            <BiChevronLeft
              onClick={() => navigate(-1)}
              className="text-[40px] cursor-pointer max-lg2:text-[30px]"
            />
            <span className="text-[20px] font-bold capitalize max-lg2:text-[16px] ">
              {directorate?.name_en}
            </span>
          </div>
       
        
        </div>

{loading ? <Loading addtionalStyle={"flex justify-center  items-center"} />:(Object.keys(manager)?.length || Object.keys(manager)?.length > 0) ?     <div className="w-[100%] p-2 min-h-[250px] bg-white">
          <div className="w-[80%] mx-auto my-[30px] flex items-center  gap-[50px]">
            <div className="w-[200px] h-[200px] bg-[#0C73B8]  rounded-full flex justify-center items-center">
              {manager?.picture !== "" ? (
                <img
                  src={`${process.env.REACT_APP_BACKEND_IMAGES}/OfficeUserImages/${manager?.picture}`}
                  className="w-[100%] h-[100%] object-cover rounded-full"
                  alt=""
                />
              ) : (
                <span className="text-white text-[50px] font-bold">
                  {manager?.firstname?.[0]}
                </span>
              )}
            </div>

            <div className="w-[70%] my-[40px] flex flex-col gap-[20px]">
              <div className="flex items-center gap-[10px]">
                <span className="text-[30px] text-[#0C73B8] font-bold">
                  {manager?.firstname} {manager?.middlename}{" "}
                  {manager?.lastname}
                </span>
              </div>
              <div className="w-[100%] flex justify-between items-center gap-[50px]">
                <div className="flex flex-col gap-[20px]">
                  <span className="flex items-center gap-[10px]">
                    <span className="font-bold text-[#0C73B8]"> Email: </span>{" "}
                    <span className="text-gray-500">{manager?.email}</span>
                  </span>
                  <span className="text-gray-500 flex items-center gap-[10px]">
                    <span className="font-bold text-[#0C73B8]">Phone: </span>
                    <span>{manager?.phone}</span>
                  </span>
                  <span className="text-gray-500 flex items-center gap-[10px]">
                    <span className="font-bold text-[#0C73B8]">Username: </span>
                    <span>{manager?.username}</span>
                  </span>
                  <span className="text-gray-500 flex items-center gap-[10px]">
                    <span className="font-bold text-[#0C73B8]">Gender: </span>
                    <span>{manager?.gender}</span>
                  </span>
                </div>
                <div className="flex  flex-col gap-[20px]">
                  <span className="text-gray-500 flex items-center gap-[10px]">
                    <span className="font-bold text-[#0C73B8]">Level: </span>
                    <span>{manager?.level}</span>
                  </span>

                  <span className="text-gray-500 flex items-center gap-[10px]">
                    <span className="font-bold text-[#0C73B8]">Division: </span>
                    <span>{manager?.division?.name_en}</span>
                  </span>

                  <span className="text-gray-500 flex items-center gap-[10px]">
                    <span className="font-bold text-[#0C73B8]">Status: </span>
                    {manager?.status === "active" && (
                      <span
                        className="px-2 py-1 inline-flex text-xs leading-5
                      font-semibold  bg-green-600 text-white rounded-[5px]"
                      >
                        Active
                      </span>
                    )}

                    {manager?.status === "inactive" && (
                      <span
                        className="px-2 py-1 inline-flex text-xs leading-5
                      font-semibold  bg-red-600 text-white rounded-[5px]"
                      >
                        Inactive
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div> :<div className="w-[100%] min-h-[250px] flex justify-center items-center text-[#0C73B8] font-bold text-[14px]">
          
                    <span>Manager is not assigned for this directorate</span>
          </div>}
    

        <div className="w-[100%] max-h-[800px] overflow-auto mt-[30px] mx-auto">
          {directorate?.members?.length === 0 ? (
            <div className="w-[90%] mx-auto bg-white my-[20px] flex justify-center items-center">
              <span className="text-[14px] text-[#0C73B8] font-bold max-lg2:text-[12px]">
                This directorate doesn't have any members.
              </span>
            </div>
          ) : directorateState?.loading ? (
            <></>
          ) : (
            <table className="w-[100%] max-[1250px]:hidden">
              <thead className="bg-[#0C73B8] text-white  text-[14px] max-lg2:text-[12px]">
                <tr>
                  <th className="px-2 py-4 border-[2px] border-white">#</th>

                  <th className="px-2 py-4 border-[2px] border-white">
                    Full Name
                  </th>
                  {/* <th className="px-2 py-4 border-[2px] border-white">Level</th> */}
                  <th className="px-2 py-4 border-[2px] border-white">
                    Username
                  </th>
                  <th className="px-2 py-4 border-[2px] border-white">Level</th>
                  <th className="px-2 py-4 border-[2px] border-white">Phone</th>
                  <th className="px-2 py-4 border-[2px] border-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="border [&>*:nth-child(even)]:bg-[#F9F9F9]">
                {directorate?.members?.map((directorateMembers, index) => {
                  const username = officeUsersState?.officeUsers?.find(
                    (user) => user?._id === directorateMembers?.users?._id
                  )?.username;
                  const level = officeUsersState?.officeUsers?.find(
                    (user) => user?._id === directorateMembers?.users?._id
                  )?.level;
                  const phone = officeUsersState?.officeUsers?.find(
                    (user) => user?._id === directorateMembers?.users?._id
                  )?.phone;
                  return (
                    <tr
                      key={index}
                      className="text-center border-b border-gray-300 text-gray-600 text-[14px] max-lg2:text-[10px]"
                    >
                      <td className="py-2 border">{index + 1}</td>

                      <td className="py-2 border">
                        {directorateMembers?.users?.firstname}{" "}
                        {directorateMembers?.users?.middlename}{" "}
                        {directorateMembers?.users?.lastname}
                      </td>
                      <td className="py-2 border">{username}</td>
                      <td className="py-2 border">{level}</td>
                      <td className="py-2 border">{phone}</td>

                      <td className="py-2 border flex gap-[10px] justify-center">
                        <button
                          onClick={() => removeMember(directorateMembers?._id)}
                          className="bg-[#0C73B8] text-white text-[12px] py-2 px-4 rounded-[5px] max-lg2:text-[10px]"
                        >
                          Remove from directorate
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>}
    </div>
  );
}

export default DirectorateDetail;
