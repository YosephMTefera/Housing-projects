import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import apiRequest from "../../utils/request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../ServerError";
import { jwtDecode } from "jwt-decode";
import { fetchAllOfficeUsers } from "../../REDUX/slices/getAllOfficeUsersSlice";
import Loading from "../Loading";
import { language } from "../../utils/part-1lan";

function MyProfile() {
  const token = sessionStorage.getItem("tID");
  const decodedToken = jwtDecode(token);
  const userID = decodedToken?.user?.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translationState = useSelector((state) => state.translation);
  const [user, setUser] = useState({});
  const [titerError, setTiterError] = useState(false);
  const [signError, setSignError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      apiRequest
        .get(`/office_user_api/get_office_user/${userID}`, {
          headers: {
            get_user_api: process.env.REACT_APP_GET_USER_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setUser(res.data);
        })
        .catch((error) => {
          setLoading(false);
        });
    } catch (error) {
      setServerError(true);
    }
  }, [userID, token, translationState?.lan]);

  const removeParaph = async (id) => {
    try {
      await apiRequest
        ?.put(
          `/office_user_api/remove_office_user_paraph/${userID}/${id}`,
          {},
          {
            headers: {
              "Content-Type": " application/json ",
              get_user_removepar_api:
                process.env.REACT_APP_GET_USER_REMOVEPAR_API,
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          translationState?.lan === "En"
            ? toast.success(res.data.Message_en)
            : toast.success(res.data.Message_am);
          dispatch(fetchAllOfficeUsers());
          window.location.href = "/settings";
        })
        .catch((error) => {
          translationState?.lan === "En"
            ? toast.error(error.response.data.Message_en)
            : toast.error(error.response.data.Message_am);
        });
    } catch (error) {
      setServerError(true);
    }
  };

  if (serverError) return <ServerError />;

  return loading ? (
    <Loading
      addtionalStyle={
        "w-[100%] bg-white py-3 flex justify-center items-center my-[40px]"
      }
    />
  ) : (
    <div className="w-[90%] p-2  mt-[30px] mx-auto">
      <ToastContainer theme="light" />
      <div className="w-[100%] mx-auto my-[30px]">
        <span className="font-bold text-[#0C73B8] text-[20px]">
          {translationState?.lan === "En" && language?.myProfile[0]}
          {translationState?.lan === "Am" && language?.myProfile[1]}
        </span>
      </div>
      <div className="mt-[30px] bg-white p-4  rounded-[10px]">
        <div className="w-[90%] mt-[30px] border border-gray-300 p-2 mx-auto flex justify-start items-center gap-[20px] rounded-[10px]">
          {user?.picture !== "" ? (
            <img
              src={`${process.env.REACT_APP_BACKEND_IMAGES}/OfficeUserImages/${user?.picture}`}
              className="w-[100px] h-[100px] object-cover rounded-full"
              alt=""
            />
          ) : (
            <span className="text-white text-[50px] font-bold">
              {user?.firstname?.[0]}
            </span>
          )}
          <div className="flex flex-col gap-[5px]">
            <span className="font-bold text-[#0C73B8]">
              {user?.firstname} {user?.middlename} {user?.lastname}
            </span>
            <span className="text-[12px] text-gray-500">{user?.position}</span>
          </div>
        </div>
        <div className="w-[90%] mx-auto p-4  mt-[20px] border border-gray-300 rounded-[10px]">
          <div className="w-[90%] mx-auto">
            <div className="w-[100%] mt-[10px] flex justify-between items-center">
              <span className="font-bold text-[#0C73B8] text-[20px] max-lg2:text-[16px]">
                {translationState?.lan === "En" &&
                  language?.personalInformation[0]}
                {translationState?.lan === "Am" &&
                  language?.personalInformation[1]}
              </span>
              {user?.status === "active" && (
                <button className="py-1 px-4 rounded-[20px] bg-green-600 text-[14px] text-white max-lg2:text-[12px]">
                  {translationState?.lan === "En" && language?.active[0]}
                  {translationState?.lan === "Am" && language?.active[1]}
                </button>
              )}
              {user?.status === "inactive" && (
                <button className="py-1 px-4 rounded-[20px] bg-red-600 text-[14px] text-white max-lg2:text-[12px]">
                  {translationState?.lan === "En" && language?.inactive[0]}
                  {translationState?.lan === "Am" && language?.inactive[1]}
                </button>
              )}
            </div>
            <div className="w-[70%] mt-[20px]   grid grid-cols-3 gap-[30px] max-lg2:w-[100%]">
              <div className="col-span-1 flex flex-col gap-[10px]">
                <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                  {translationState?.lan === "En" && language?.firstname[0]}
                  {translationState?.lan === "Am" && language?.firstname[1]}
                </span>
                <span className="max-lg2:text-[14px]">{user?.firstname}</span>
              </div>

              <div className="col-span-1 flex flex-col gap-[10px]">
                <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                  {translationState?.lan === "En" && language?.middlename[0]}
                  {translationState?.lan === "Am" && language?.middlename[1]}
                </span>
                <span className="max-lg2:text-[14px]">{user?.middlename}</span>
              </div>

              <div className="col-span-1 flex flex-col gap-[10px]">
                <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                  {translationState?.lan === "En" && language?.lastname[0]}
                  {translationState?.lan === "Am" && language?.lastname[1]}
                </span>
                <span className="max-lg2:text-[14px]">{user?.lastname}</span>
              </div>
              <div className="col-span-1 flex flex-col gap-[10px]">
                <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                  {translationState?.lan === "En" && language?.username[0]}
                  {translationState?.lan === "Am" && language?.username[1]}
                </span>
                <span className="max-lg2:text-[12px]">{user?.username}</span>
              </div>
              <div className="col-span-1 flex flex-col gap-[10px]">
                <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                  {translationState?.lan === "En" && language?.phoneNumber[0]}
                  {translationState?.lan === "Am" && language?.phoneNumber[1]}
                </span>
                <span className="max-lg2:text-[14px]">{user?.phone}</span>
              </div>
              <div className="col-span-1 flex flex-col gap-[10px]">
                <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                  {translationState?.lan === "En" && language?.emailAddress[0]}
                  {translationState?.lan === "Am" && language?.emailAddress[1]}
                </span>
                <span className="max-lg2:text-[14px]">{user?.email}</span>
              </div>
              <div className="col-span-1 flex flex-col gap-[10px]">
                <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                  {translationState?.lan === "En" && language?.gender[0]}
                  {translationState?.lan === "Am" && language?.gender[1]}
                </span>

                <span className="max-lg2:text-[14px]">
                  {translationState?.lan === "En" && user?.gender}
                  {translationState?.lan === "Am" && (
                    <>
                      {user?.gender === "Male"
                        ? language?.male[1]
                        : language?.female[1]}
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%] mx-auto grid grid-cols-2 gap-[10px]">
      

        {user?.titer && user?.titer !== ""  && (
      <div className="w-[100%] my-[30px] p-2 mx-auto col-span-1 bg-white rounded-[10px]">
        <div className="w-[95%] mx-auto">
          <div className="w-[100%] my-[20px] flex justify-between items-center">
            <span className="font-bold text-[#0C73B8] text-[20px] max-lg2:text-[16px]">
              {translationState?.lan === "En" && language?.titer[0]}
              {translationState?.lan === "Am" && language?.titer[1]}
            </span>
          </div>
          <div className="w-[90%] my-[30px] mx-auto flex flex-col gap-[20px]">
            {!user?.titer && user?.titer === ""  ? (
              <div className="w-[100%] flex justify-center items-center">
                <span className="font-bold text-center text-[#0C73B8]">
                  {translationState?.lan === "En" && language?.titernotUploaded[0]}
                  {translationState?.lan === "Am" && language?.titernotUploaded[1]}
                </span>
              </div>
            ) : (
              <div>
                {!titerError ? (
                  <img
                    src={`${process.env.REACT_APP_BACKEND_IMAGES}/OfficeUserTiters/${user?.titer}`}
                    alt=""
                    onError={() => setTiterError(true)}
                  />
                ) : (
                  <span className="w-[100%] flex justify-center items-center my-[20px] font-bold text-center text-[#0C73B8]">
                    {translationState?.lan === "En" && "The titer could not load"}
                    {translationState?.lan === "Am" && "ቲተር ማግኘት አልተቻለም"}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )}

        {user?.signature && user?.signature !== "" && (
      <div className="w-[100%] my-[30px] p-2 mx-auto col-span-1 bg-white rounded-[10px]">
        <div className="w-[95%] mx-auto">
          <div className="w-[100%] my-[20px] flex justify-between items-center">
            <span className="font-bold text-[#0C73B8] text-[20px] max-lg2:text-[16px]">
              {translationState?.lan === "En" && language?.signiture[0]}
              {translationState?.lan === "Am" && language?.signiture[1]}
            </span>
          </div>
          <div className="w-[90%] my-[30px] mx-auto flex flex-col gap-[20px]">
            {!user?.signature || user?.signature === "" ? (
              <div className="w-[100%] flex justify-center items-center">
                <span className="font-bold text-center text-[#0C73B8]">
                  {translationState?.lan === "En" && language?.signnotUploded[0]}
                  {translationState?.lan === "Am" && language?.signnotUploded[1]}
                </span>
              </div>
            ) : (
              <div>
                {!signError ? (
                  <img
                    src={`${process.env.REACT_APP_BACKEND_IMAGES}/OfficeUserSignatures/${user?.signature}`}
                    alt=""
                    onError={() => setSignError(true)}
                  />
                ) : (
                  <span className="w-[100%] flex justify-center items-center my-[20px] font-bold text-center text-[#0C73B8]">
                    {translationState?.lan === "En" && "The signature could not load"}
                    {translationState?.lan === "Am" && "ፊርማውን ማግኘት አልተቻለም"}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )}
      </div>
      <div className="w-[100%] grid grid-cols-2 gap-[10px]">
        <div className="w-[100%] my-[30px] p-2 mx-auto col-span-1 bg-white rounded-[10px]">
          <div className="w-[95%] mx-auto">
            <div className="w-[100%] my-[20px] flex justify-between items-center">
              <span className="font-bold text-[#0C73B8] text-[20px] max-lg2:text-[16px]">
                {translationState?.lan === "En" && language?.paraph[0]}
                {translationState?.lan === "Am" && language?.paraph[1]}
              </span>

              {user &&
                (user?.level === "MainExecutive" ||
                  user?.level === "DivisionManagers" ||
                  user?.level === "Directors" ||
                  user?.level === "TeamLeaders") && (
                  <button
                    onClick={() => navigate("/add_paraph")}
                    className="bg-[#0C73B8] text-[14px] py-2 px-4 rounded text-white max-lg2:text-[10px]"
                  >
                    {translationState?.lan === "En" &&
                      language?.addNewparaph[0]}
                    {translationState?.lan === "Am" &&
                      language?.addNewparaph[1]}
                  </button>
                )}
            </div>
            <div className="w-[90%] my-[30px] mx-auto flex flex-col gap-[20px]">
              {user?.paraph?.length === 0 ? (
                <div className="w-[100%] flex justify-center items-center">
                  <span className="text-[#0C73B8] text-[14px] max-lg2:text-[12px]">
                    {translationState?.lan === "En" && language?.noParaph[0]}
                    {translationState?.lan === "Am" && language?.noParaph[1]}
                  </span>
                </div>
              ) : (
                user?.paraph?.map((paraph, index) => (
                  <div
                    key={index}
                    className="w-[100%]  flex justify-between items-center gap-[20px]"
                  >
                    <li className=" text-gray-500">{paraph?.title}</li>
                    <div className="flex items-center gap-[20px]">
                      <FaTrashAlt
                        onClick={() => removeParaph(paraph?._id)}
                        className="bg-[#0C73B8] text-white p-2 text-[10px] w-[30px] h-[30px] rounded-[5px] cursor-pointer"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
