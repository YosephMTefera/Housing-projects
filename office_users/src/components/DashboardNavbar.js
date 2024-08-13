import React, { useEffect, useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { jwtDecode } from "jwt-decode";
import apiRequest from "../utils/request";
import ServerError from "./ServerError";
import { useDispatch, useSelector } from "react-redux";
import { FaBell } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";
import Loading from "./Loading";
import { translationAction } from "../REDUX/slices/translationSlice";
import { language } from "../utils/part-1lan";

function DashboardNavbar() {
  const token = sessionStorage.getItem("tID");
  const decodedToken = jwtDecode(token);
  const userID = decodedToken?.user?.id;
  const dispatch = useDispatch();
  const translationState = useSelector((state) => state.translation);
  const [user, setUser] = useState({});
  const [notificationsSlider, setNotificationSider] = useState(false);
  const [socketConnection, setSocketConnection] = useState(null);
  const [responseNotifications, setResponseNotifications] = useState({});
  const [notificationType, setNotificationType] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [sortingNum, setSortingNum] = useState(-1);
  const [read, setRead] = useState("no");
  const [debounceread] = useDebounce(read, 500);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const socket = io("https://aahdcapi1.dalyobt.com", {
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    setSocketConnection(socket);

    return () => {
      socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    try {
      apiRequest
        .get(`/office_user_api/get_office_user/${userID}`, {
          headers: {
            get_user_api: process.env.REACT_APP_GET_USER_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          if (error?.response?.status === 500) {
            setServerError(true);
          }
        });
    } catch (error) {
      setServerError(true);
    }
  }, [userID, token]);

  const getNotifications = async () => {
    try {
      setLoading(true);
      if (notificationType === "") {
        apiRequest
          .get(
            `/notification_op_api/get_notifications?page=${pageNum}&sort=${sortingNum}&read=${debounceread}&notifcation_type=${""}`,
            {
              headers: {
                get_notusersfs_api: process.env.REACT_APP_GET_NOTUSERSFS_API,
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            setLoading(false);
            setResponseNotifications(res.data);
          })
          .catch((error) => {
            setLoading(false);
            translationState === "En"
              ? toast.error(error?.response?.data?.Message_en)
              : toast.error(error?.response?.data?.Message_am);
          });
      } else {
        apiRequest
          .get(
            `/notification_op_api/get_notifications?page=${pageNum}&sort=${sortingNum}&read=${debounceread}&notifcation_type=${notificationType}`,
            {
              headers: {
                get_notusersfs_api: process.env.REACT_APP_GET_NOTUSERSFS_API,
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            setLoading(false);
            setResponseNotifications(res.data);
          })
          .catch((error) => {
            setLoading(false);
            translationState === "En"
              ? toast.error(error?.response?.data?.Message_en)
              : toast.error(error?.response?.data?.Message_am);
          });
      }
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };

  useEffect(() => {
    getNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum, sortingNum, debounceread, notificationType]);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("officeUser", { userID });

      socketConnection?.on("case_forward_notification", (data) => {
        toast?.info(data?.Message_en);
        getNotifications();
      });

      return () => {
        socketConnection?.off("case_forward_notification");
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketConnection, userID]);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("officeUser", { userID });

      socketConnection?.on("incoming_letter_forward_notification", (data) => {
        toast?.info(data?.Message_en);
        getNotifications();
      });

      return () => {
        socketConnection?.off("incoming_letter_forward_notification");
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketConnection, userID]);

  useEffect(() => {
    if (socketConnection) {
      socketConnection?.emit("officeUser", { userID });

      socketConnection?.on("case_reply_notification", (data) => {
        if (data?.Message_en) {
          toast?.info(data?.Message_en);
        }

        getNotifications();
      });

      return () => {
        socketConnection?.off("case_reply_notification");
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketConnection, userID]);

  useEffect(() => {
    if (socketConnection) {
      socketConnection?.emit("officeUser", { userID });

      socketConnection?.on("incoming_letter_reply_notification", (data) => {
        toast?.info(data?.Message_en);
        getNotifications();
      });

      return () => {
        socketConnection?.off("incoming_letter_reply_notification");
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketConnection, userID]);

  useEffect(() => {
    if (socketConnection) {
      
      socketConnection?.emit("officeUser", { userID });

     
      socketConnection?.on("outgoing_letter_forward_notification", (data) => {
        toast?.info(data?.Message_en);
        getNotifications();
      });

      return () => {
        socketConnection?.off("outgoing_letter_forward_notification");
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketConnection, userID]);

  useEffect(() => {
    if (socketConnection) {
      socketConnection?.emit("officeUser", { userID });

      socketConnection?.on("outgoing_letter_reply_notification", (data) => {
        toast?.info(data?.Message_en);
        getNotifications();
      });

      return () => {
        socketConnection?.off("outgoing_letter_reply_notification");
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketConnection, userID]);

  useEffect(() => {
    if (socketConnection) {
      
      socketConnection?.emit("officeUser", { userID });
      socketConnection?.on("internal_letter_forward_notification", (data) => {
        toast?.info(data?.Message_en);
        getNotifications();
      });

      return () => {
        socketConnection?.off("internal_letter_forward_notification");
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketConnection, userID]);

  useEffect(() => {
    if (socketConnection) {
      
      socketConnection?.emit("officeUser", { userID });

      socketConnection?.on("internal_letter_reply_notification", (data) => {
        toast?.info(data?.Message_en);
        getNotifications();
      });

      return () => {
        socketConnection?.off("internal_letter_reply_notification");
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketConnection, userID]);

  useEffect(() => {
    if (socketConnection) {
    
      socketConnection?.emit("officeUser", { userID });

      socketConnection?.on("letter_forward_notification", (data) => {
        toast?.info(data?.Message_en);
        getNotifications();
      });

      return () => {
        socketConnection?.off("letter_forward_notification");
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketConnection, userID]);

  useEffect(() => {
    if (socketConnection) {
      
      socketConnection?.emit("officeUser", { userID });

    
      socketConnection?.on("letter_reply_notification", (data) => {
        toast?.info(data?.Message_en);
        getNotifications();
      });

      return () => {
        socketConnection?.off("letter_reply_notification");
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketConnection, userID]);

  useEffect(() => {
    if (socketConnection) {
    
      socketConnection?.emit("officeUser", { userID });

      socketConnection?.on("internal_memo_forward_notification", (data) => {
        toast?.info(data?.Message_en);
        getNotifications();
      });

      return () => {
        socketConnection?.off("internal_memo_forward_notification");
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketConnection, userID]);

  useEffect(() => {
    if (socketConnection) {
      
      socketConnection?.emit("officeUser", { userID });

    
      socketConnection?.on("internal_memo_reply_notification", (data) => {
        toast?.info(data?.Message_en);
        getNotifications();
      });

      return () => {
        socketConnection?.off("internal_memo_reply_notification");
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketConnection, userID]);

  const handleReadNotification = async (id) => {
    try {
      await apiRequest
        .put(
          `/notification_op_api/update_notification/${id}`,
          {
            read: "yes",
          },
          {
            headers: {
              get_updnotuser_api: process.env.REACT_APP_GET_UPDNOTUSER_API,
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          getNotifications();
        })
        .catch((error) => {
          if (error.response.data?.status === 500) {
            setServerError(true);
          }

          toast.error(error?.response?.data?.Message_en);
        });
    } catch (error) {
      setServerError(true);
    }
  };

  const handlePrevious = () => {
    if (pageNum <= 1) {
      setPageNum(1);
    } else {
      setPageNum(parseInt(pageNum) - 1);
    }
  };

  const handleNext = () => {
    if (pageNum >= responseNotifications?.totalPages) {
      setPageNum(responseNotifications?.totalPages);
    } else {
      setPageNum(parseInt(pageNum) + 1);
    }
  };



  if (serverError) return <ServerError />;

  return (
    <div className="w-[100%] bg-white h-[100px] flex items-center shadow-md border sticky top-0 z-[1000] max-lg2:h-[80px]">
      <div className="w-[90%] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <div className="min-[750px]:hidden cursor-pointer">
            <BiMenuAltLeft className="text-[40px] text-[#0C73B8]" />
          </div>
          <div>
            <span className="text-[18px] font-bold max-lg2:text-[14px]">
              {" "}
              {translationState?.lan === "En" && language?.Hello[0]}
              {translationState?.lan === "Am" && language?.Hello[1]},{" "}
              <span className="text-[#0C73B8] font-bold">
                {user?.firstname}
              </span>
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center font-semibold uppercase max-lg2:text-[12px] max-lg1:hidden">
          <span className="text-[#0C73B8] ">
            {translationState?.lan === "En" && language?.companyName[0]}
            {translationState?.lan === "Am" && language?.companyName[1]}
          </span>
          <span className="text-[#FBB042]">
            {translationState?.lan === "En" && language?.administrators[0]}
            {translationState?.lan === "Am" && language?.administrators[1]}
          </span>
        </div>
        <div className="flex items-center gap-[10px]">
          <select
            value={translationState?.lan}
            onChange={(e) => dispatch(translationAction.setLan(e.target.value))}
            className="py-1 px-4 border border-gray-300 rounded-[5px] text-[14px] text-[#0C73B8] outline-none max-lg2:text-[10px]"
          >
            <option value={"En"}>English</option>
            <option value={"Am"}>አማርኛ</option>
          </select>
          <div
            onClick={() => setNotificationSider(!notificationsSlider)}
            className="relative  w-[50px] h-[50px] flex justify-center items-center cursor-pointer"
          >
            <FaBell
              className={
                notificationsSlider
                  ? "text-[30px] max-lg2:text-[20px] text-[#0C73B8]"
                  : "text-[30px] max-lg2:text-[20px]"
              }
            />

            {responseNotifications &&
              responseNotifications?.totalUnread > 0 && (
                <div className="absolute top-[5px] right-[5px] w-[25px] h-[25px] bg-[#0C73B8] rounded-full flex justify-center items-center text-white max-lg2:w-[15px] max-lg2:h-[15px]  max-lg2:right-[10px] max-lg2:text-[10px]">
                  {responseNotifications?.totalUnread?.toString()}
                </div>
              )}
          </div>
          <div className="w-[50px] h-[50px] bg-[#0C73B8] text-white rounded-full flex justify-center items-center">
            {user?.picture || user?.picture === "" ? (
              <img
                src={`${process.env.REACT_APP_BACKEND_IMAGES}/OfficeUserImages/${user?.picture}`}
                className="w-[100%] h-[100%] object-cover rounded-full"
                alt=""
              />
            ) : (
              <div className="w-[50px] h-[50px] bg-[#0C73B8] text-white rounded-full flex justify-center items-center">
                <span>{user?.firstname?.[0]}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[#0C73B] capitalize max-lg2:text-[12px] max-sm2:text-[10px]">
              {user?.firstname} {user?.middlename} {user?.lastname}
            </span>
            {translationState?.lan === "En" && (
              <span className="text-gray-500 text-[14px]  max-lg2:text-[12px] max-sm2:text-[10px]">
                {user?.level}
              </span>
            )}
            {translationState?.lan === "Am" && (
              <span className="text-gray-500 text-[14px] max-lg2:text-[12px] max-sm2:text-[10px]">
                {user?.level && (
                  <>
                    {user?.level === "MainExecutive" &&
                      language?.mainExecutive[1]}
                    {user?.level === "DivisionManagers" &&
                      language?.divisionManagers[1]}
                    {user?.level === "Directors" && language?.director[1]}
                    {user?.level === "TeamLeaders" && language?.teamleaders[1]}
                    {user?.level === "Professionals" &&
                      language?.professsionals[1]}
                  </>
                )}
              </span>
            )}
          </div>
        </div>
      </div>
      {notificationsSlider && (
        <div className="fixed right-0 z-[100] top-[100px] w-[20%] min-h-[100vh] bg-white border border-gray-100 shadow-xl overflow-y-auto max-lg2:top-[80px] max-lg2:w-[25%]">
          <div className="w-[90%] my-[20px] mx-auto">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-[16px] font-bold max-lg2:text-[12px]">
                {translationState?.lan === "En" && language?.notification[0]}
                {translationState?.lan === "Am" && language?.notification[1]}
              </span>
              <div className="flex justify-end items-center  gap-[10px]">
                <button
                  onClick={() => setRead("no")}
                  className={
                    read === "no"
                      ? "bg-[#0C73B8] text-white text-[10px] max-lg2:text-[8px] py-1 px-2 rounded-[20px]"
                      : "text-[10px] max-lg2:text-[8px] py-1 px-2 rounded-[20px]"
                  }
                >
                  {translationState?.lan === "En" && language?.unread[0]}
                  {translationState?.lan === "Am" && language?.unread[1]}
                </button>
                <button
                  onClick={() => setRead("yes")}
                  className={
                    read === "yes"
                      ? "bg-[#0C73B8] text-white text-[10px] max-lg2:text-[8px] py-1 px-2 rounded-[20px]"
                      : "text-[10px] max-lg2:text-[8px] py-1 px-2 rounded-[20px]"
                  }
                >
                  {translationState?.lan === "En" && language?.read[0]}
                  {translationState?.lan === "Am" && language?.read[1]}
                </button>
              </div>
            </div>

            {responseNotifications?.notifications?.length > 0 &&
              responseNotifications?.totalPages && (
                <div className="w-[100%] flex justify-between items-center my-[20px] gap-[5px] border-b py-2">
                  <div className="flex items-center gap-[14px]">
                    <button
                      onClick={handlePrevious}
                      className="w-[20px] h-[20px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500 max-[400px]:px-2 outline-none"
                    >
                      <IoIosArrowBack className="text-[14px]" />
                    </button>
                    <span className="text-gray-600 font-semibold text-[12px]">
                      {responseNotifications?.currentPage} of{" "}
                      {responseNotifications?.totalPages}
                    </span>

                    <button
                      onClick={handleNext}
                      className={
                        " w-[20px] h-[20px] flex justify-center items-center cursor-pointer text-white border border-[#0C73B8] bg-[#0C73B8] rounded-[50%] hover:bg-transparent hover:text-[#039674] transition duration-500 max-[400px]:px-2 outline-none"
                      }
                    >
                      <IoIosArrowForward className="text-[14px]" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={sortingNum}
                      onChange={(e) => setSortingNum(e?.target?.value)}
                      className="py-2 px-4 border border-gray-300 rounded-[5px] outline-none text-[14px] font-medium max-lg2:text-[12px] max-lg2:py-1"
                    >
                      <option value={-1}>
                        {translationState?.lan === "En" && language?.latest[0]}
                        {translationState?.lan === "Am" && language?.latest[1]}
                      </option>
                      <option value={1}>
                        {translationState?.lan === "En" && language?.oldest[0]}
                        {translationState?.lan === "Am" && language?.oldest[1]}
                      </option>
                    </select>
                  </div>
                </div>
              )}

            <div className="w-[100%] my-[20px] border border-gray-400 p-3 rounded-[5px]">
              <select
                onChange={(e) => setNotificationType(e.target.value)}
                className="w-[100%] flex-1 bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
              >
                <option value={""}></option>
                <option value={"Case"}>
                  {translationState?.lan === "En" && language?.cases[0]}
                  {translationState?.lan === "Am" && language?.cases[1]}
                </option>
                <option value={"LateCase"}>
                  {translationState?.lan === "En" && language?.lateCases[0]}
                  {translationState?.lan === "Am" && language?.lateCases[1]}
                </option>
                <option value={"IncomingLetter"}>
                  {translationState?.lan === "En" &&
                    language?.incomingLetter[0]}
                  {translationState?.lan === "Am" &&
                    language?.incomingLetter[1]}
                </option>
                <option value={"LateIncomingLetter"}>
                  {translationState?.lan === "En" &&
                    language?.lateIncomingLetters[0]}
                  {translationState?.lan === "Am" &&
                    language?.lateIncomingLetters[1]}
                </option>
                <option value={"OutgoingLetter"}>
                  {translationState?.lan === "En" &&
                    language?.outgoingLetter[0]}
                  {translationState?.lan === "Am" &&
                    language?.outgoingLetter[1]}
                </option>
                <option value={"LateOutgoingLetter"}>
                  {translationState?.lan === "En" &&
                    language?.lateOutgoingLetters[0]}
                  {translationState?.lan === "Am" &&
                    language?.lateOutgoingLetters[1]}
                </option>
                <option value={"InternalLetter"}>
                  {translationState?.lan === "En" &&
                    language?.internalLetter[0]}
                  {translationState?.lan === "Am" && language?.internaLetter[1]}
                </option>
                <option value={"LateInternalLetter"}>
                  {translationState?.lan === "En" &&
                    language?.lateInternalLetters[0]}
                  {translationState?.lan === "Am" &&
                    language?.lateInternalLetters[1]}
                </option>
                <option value={"InternalMemo"}>
                  {translationState?.lan === "En" &&
                    language?.internalMemo[0]}
                  {translationState?.lan === "Am" && language?.internalMemo[1]}
                </option>
              </select>
            </div>

            <div className="h-[70vh]  overflow-y-scroll hide-scroll-bar">
              {loading ? (
                <Loading
                  addtionalStyle={"flex mt-[20px] justify-center items-center"}
                />
              ) : responseNotifications?.notifications?.length === 0 ? (
                <div className="my-[20px]  flex justify-center items-center">
                  <span className="text-[12px] text-[#0C73B8] font-bold">
                    {translationState?.lan === "En" &&
                      language?.noNotifcationFound[0]}
                    {translationState?.lan === "Am" &&
                      language?.noNotifcationFound[1]}
                  </span>
                </div>
              ) : (
                <div className="mb-[30px]">
                  {responseNotifications?.notifications?.map(
                    (notification, index) => {
                      return (
                        <div
                          key={index}
                          className="w-[100%] border-b  my-[20px] flex gap-[10px]"
                        >
                          <div className="w-[100%] flex flex-col items-end gap-[5px]">
                            <span className="text-[12px] text-gray-500 max-lg2:text-[10px]">
                              {translationState?.lan === "En" &&
                                notification?.message_en}
                              {translationState?.lan === "Am" &&
                                notification?.message_am}{" "}
                            
                              {notification?.read === "no" && (
                                <button
                                  onClick={() =>
                                    handleReadNotification(notification?._id)
                                  }
                                  className="text-[#0C73B8] font-bold text-[12px] max-lg2:text-[8px] py-1 px-2 rounded-[20px]"
                                >
                                  {translationState?.lan === "En" &&
                                    language?.markasRead[0]}
                                  {translationState?.lan === "Am" &&
                                    language?.markasRead[1]}
                                </button>
                              )}{" "}
                            </span>
                            <span className="text-[10px] text-gray-500 py-1">
                              {new Date(
                                notification?.createdAt
                              ).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardNavbar;
