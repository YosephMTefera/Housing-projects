import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ServerError from "../ServerError";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAllOfficeUsers } from "../../REDUX/slices/allOfficeUsersSlice";
import apiRequest from "../../utils/request";
import Loading from "../Loading";

function AdministratorDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const token = sessionStorage.getItem("tID");
  const officeUsersState = useSelector((state) => state?.allOfficers);
  const [findAdministrator, setFindAdministrator] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    dispatch(fetchAllOfficeUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      setLoading(true);
      apiRequest
        .get(`/office_user_api/get_office_user/${id}`, {
          headers: {
            get_user_api: process.env.REACT_APP_GET_USER_API,
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setFindAdministrator(res?.data);
        })
        .catch((error) => {
          setLoading(false);
          if (error?.response?.status === 500) {
            setServerError(true);
          }
        });
    } catch (error) {
      setServerError(true);
    }
  }, [id, token]);



  if (officeUsersState?.error || serverError) return <ServerError />;

  return loading ? (
    <Loading addtionalStyle={"flex justify-center items-center my-[20px]"} />
  ) : (
    <div className="w-[100%] my-[30px]">
      <ToastContainer theme="light" />
      <div className="w-[100%] p-2 min-h-[250px] bg-white">
        <div className="w-[90%] flex items-center justify-between text-[#FBB042] mx-auto font-bold">
          <div className="flex items-center justify-start">
            <BiChevronLeft
              className="text-[30px] cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <span className="text-[20px] font-bold capitalize max-lg2:text-[16px]">
              Administrator's Information
            </span>
          </div>
          <button
            onClick={(e) =>navigate(`/editadminstrator/${id}`)}
            className="bg-[#0C73B8] text-white  py-2 px-4 rounded-[20px] text-[14px]"
          >
            Edit
          </button>
        </div>

        <div className="w-[80%] mx-auto my-[30px] flex items-center gap-[50px]">
          {findAdministrator?.picture ? (
            <div className="w-[200px] h-[200px] max-lg2:w-[150px] max-lg2:h-[150px]">
              <img
                className="w-[100%] h-[100%]  rounded-full object-cover pointer-events-none"
                src={`${process.env.REACT_APP_BACKEND_IMAGES}/OfficeUserImages/${findAdministrator?.picture}`}
                alt=""
              />
            </div>
          ) : (
            <div className="w-[200px] h-[200px] bg-[#0C73B8]  rounded-full flex justify-center items-center">
              <span>{findAdministrator?.firstname?.[0]}</span>
            </div>
          )}

          <div className="w-[80%] my-[10px] flex flex-col gap-[20px]">
            <div className="flex items-center gap-[10px]">
              <span className="text-[30px] text-[#0C73B8] font-bold max-lg2:text-[20px]">
                {findAdministrator?.firstname} {findAdministrator?.middlename}{" "}
                {findAdministrator?.lastname}
              </span>

              <span className="py-2">
                {findAdministrator?.status === "active" && (
                  <span className="p-2 rounded-[5px] bg-green-600 text-[14px] text-white max-lg2:text-[10px]">
                    active
                  </span>
                )}
                {findAdministrator?.status === "inactive" && (
                  <span className="p-2 rounded-[5px] bg-red-600 text-[14px] text-white max-lg2:text-[10px]">
                    inactive
                  </span>
                )}
              </span>
            </div>
            <div className="w-[100%] flex justify-between items-start gap-[50px]">
              <div className="flex flex-col gap-[20px]">
                <span className="flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                    {" "}
                    Email:{" "}
                  </span>{" "}
                  <span className="text-gray-500 max-lg2:text-[12px]">
                    {findAdministrator?.email}
                  </span>
                </span>
                <span className="text-gray-500 flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                    Phone:{" "}
                  </span>
                  <span className="max-lg2:text-[12px]">
                    {findAdministrator?.phone}
                  </span>
                </span>
                <span className="text-gray-500 flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                    Username:{" "}
                  </span>
                  <span className="max-lg2:text-[12px]">
                    {findAdministrator?.username}
                  </span>
                </span>
                <span className="text-gray-500 flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                    Gender:{" "}
                  </span>
                  <span className="max-lg2:text-[12px]">
                    {findAdministrator?.gender}
                  </span>
                </span>
                {findAdministrator?.createdBy && (
                  <span className="text-gray-500 flex items-center gap-[10px]">
                    <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                      CreatedBy:{" "}
                    </span>
                    <span className="max-lg2:text-[12px]">
                      {findAdministrator?.createdBy?.firstname}{" "}
                      {findAdministrator?.createdBy?.middlename}{" "}
                      {findAdministrator?.createdBy?.lastname}
                    </span>
                  </span>
                )}
              </div>
              <div className="flex  flex-col gap-[20px]">
                <span className="text-gray-500 flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                    Division:{" "}
                  </span>
                  <span className="max-lg2:text-[12px]">
                    {findAdministrator?.division?.name_am}
                  </span>
                </span>

                <span className="text-gray-500 flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                    Position:{" "}
                  </span>
                  <span className="max-lg2:text-[12px]">
                    {findAdministrator?.position}
                  </span>
                </span>

                <span className="text-gray-500 flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8] max-lg2:text-[12px]">
                    Level:{" "}
                  </span>
                  <span className="max-lg2:text-[12px]">
                    {findAdministrator?.level}
                  </span>
                </span>

                <span className="text-gray-500 flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                    Status:{" "}
                  </span>
                  <span className="max-lg2:text-[12px]">
                    {findAdministrator?.status}
                  </span>
                </span>
                <span className="text-gray-500 flex items-center gap-[10px]">
                  <span className="font-bold text-[#0C73B8] max-lg2:text-[14px]">
                    Created Date:{" "}
                  </span>
                  <span className="max-lg2:text-[12px]">
                    {new Date(findAdministrator?.createdAt)?.toDateString()}{" "}
                    {new Date(
                      findAdministrator?.createdAt
                    )?.toLocaleTimeString()}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/*  */}

        <div className="w-[95%] mx-auto grid grid-cols-3 gap-[10px]">
          <div className="w-[100%] my-[30px] p-2 mx-auto col-span-1 bg-white rounded-[10px] border">
            <div className="w-[95%] mx-auto">
              <div className="w-[100%] my-[20px] flex justify-between items-center">
                <span className="font-bold text-[#0C73B8] text-[20px] max-lg2:text-[16px]">
                  Paraph
                </span>
              </div>
              <div className="w-[90%] my-[30px] mx-auto flex flex-col gap-[20px]">
                {findAdministrator?.paraph?.length === 0 ? (
                  <div className="w-[100%] flex justify-center items-center">
                    <span className="font-bold text-center text-[#0C73B8]">
                      No paraph found
                    </span>
                  </div>
                ) : (
                  findAdministrator?.paraph?.map((paraph, index) => (
                    <div
                      key={index}
                      className="w-[100%]  flex justify-between items-center gap-[20px] max-lg2:text-[14px]"
                    >
                      <li className=" text-gray-500">{paraph?.title}</li>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {findAdministrator?.titer && findAdministrator?.titer !== "" && (
            <div className="w-[100%] my-[30px] p-2 mx-auto col-span-1 bg-white rounded-[10px] border">
              <div className="w-[95%] mx-auto">
                <div className="w-[100%] my-[20px] flex justify-between items-center">
                  <span className="font-bold text-[#0C73B8] text-[20px] max-lg2:text-[16px]">
                    Titer
                  </span>
                </div>
                <div className="w-[90%] my-[30px] mx-auto flex flex-col gap-[20px]">
                  {!findAdministrator?.titer &&
                  findAdministrator?.titer === "" ? (
                    <div className="w-[100%] flex justify-center items-center">
                      <span className="font-bold text-center text-[#0C73B8]">
                        Titer not uploaded
                      </span>
                    </div>
                  ) : (
                    <div>
                      <img
                        src={`${process.env.REACT_APP_BACKEND_IMAGES}/OfficeUserTiters/${findAdministrator?.titer}`}
                        alt=""
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {findAdministrator?.signature &&
            findAdministrator?.signature !== "" && (
              <div className="w-[100%] my-[30px] p-2 mx-auto col-span-1 bg-white rounded-[10px] border">
                <div className="w-[95%] mx-auto">
                  <div className="w-[100%] my-[20px] flex justify-between items-center">
                    <span className="font-bold text-[#0C73B8] text-[20px] max-lg2:text-[16px]">
                    Signature
                    </span>
                  </div>
                  <div className="w-[90%] my-[30px] mx-auto flex flex-col gap-[20px]">
                    {!findAdministrator?.signature &&
                    findAdministrator?.signature === "" ? (
                      <div className="w-[100%] flex justify-center items-center">
                        <span className="font-bold text-center text-[#0C73B8]">
                        Signature not uploaded
                        </span>
                      </div>
                    ) : (
                      <div>
                        <img
                          src={`${process.env.REACT_APP_BACKEND_IMAGES}/OfficeUserSignatures/${findAdministrator?.signature}`}
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default AdministratorDetail;
