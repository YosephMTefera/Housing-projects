import React, { useEffect, useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { FaBell } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import apiRequest from "../utils/request";
import ServerError from "./ServerError";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDebounce } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccusations } from "./REDUX/slices/accusationSlice";

const socket = io("https://aahdcapi1.dalyobt.com");

function DashboardNavbar() {
  const token = sessionStorage.getItem("tID");
  const dispatch = useDispatch();
  const decodedToken = jwtDecode(token);
  const userID = decodedToken?.user?.id;
  const [user, setUser] = useState({});
  const translationState = useSelector((state) => state.translation);
  const [notificationsSlider, setNotificationSider] = useState(false);
  const [socketConnection, setSocketConnection] = useState(socket);
  const [responseNotifications, setResponseNotifications] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [sortingNum, setSortingNum] = useState(-1);
  const [read, setRead] = useState("no");
  const [debounceread] = useDebounce(read, 500);

  const getNotifications = async () => {
    try {
      setLoading(true);
      apiRequest
        .get(
          `/notification_op_api/get_notifications?page=${pageNum}&sort=${sortingNum}&read=${debounceread}`,
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
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };

  useEffect(() => {
    getNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum, sortingNum, debounceread]);

  useEffect(() => {
    if (socket) {
      setSocketConnection(socketConnection);
      socketConnection?.emit("newUser", { userID: userID });
    }

    return () => {
      socketConnection.disconnect();
    };
  }, [socketConnection, userID]);

  useEffect(() => {
    socketConnection?.on("accusation_notification", (data) => {
      toast.info(data?.Message_en);
      getNotifications();
      dispatch(
        fetchAccusations({
          page: "",
          sort: "",
          name: "",
          phone: "",
        })
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketConnection]);

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

  useEffect(() => {
    try {
      apiRequest
        .get(
          `/accusation_acceptor_user_api/get_accusation_acceptor/${userID}`,
          {
            headers: {
              get_accuser_api: process.env.REACT_APP_GET_ACCUSER_API,
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          if (error?.response?.status === 500) {
            setServerError(true);
          }
          toast.error(error?.response?.data?.Message_en);
        });
    } catch (error) {
      setServerError(true);
    }
  }, [userID, token]);

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
          dispatch(
            fetchAccusations({
              page: "",
              sort: "",
              name: "",
              phone: "",
            })
          );
        })
        .catch((error) => {
          if (error.response.data?.status === 500) {
            setServerError(true);
          }
          toast.success(error?.response?.data?.Message_en);
        });
    } catch (error) {
      setServerError(true);
    }
  };

  if (serverError) return <ServerError />;
  return (
    <div className="w-[100%] bg-white h-[100px] flex items-center shadow-md border z-[1000] sticky top-0 max-lg2:h-[80px]">

      <div className="w-[90%] mx-auto flex items-center justify-between overflow-y-auto">
        <div className="flex items-center gap-[10px]">
          <div
            className="min-[750px]:hidden cursor-pointer"
            //  onClick={()=>dispatch(sideBarAction.toggleSidebar(!selectState))}
          >
            <BiMenuAltLeft className="text-[40px] text-[#0C73B8]" />
          </div>
          <div>
            <span className="text-[20px] font-bold max-lg2:text-[14px]">
              Hello,{" "}
              <span className="text-[#0C73B8] font-bold">
                {user ? user?.firstname : "-"}
              </span>
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center font-semibold uppercase">
          <span className="text-[#0C73B8] font-bold max-lg2:text-[12px]">
            ADDIS ABABA HOUSING DEVELOPMENT CORPORATION
          </span>
          <span className="text-[#FBB042] max-lg2:text-[10px]">
            Ethics Management
          </span>
        </div>
        <div className="flex items-center gap-[10px]">
          {/* <select className="py-1 px-4 border border-gray-300 rounded-[5px] text-[14px] text-[#0C73B8] outline-none max-lg2:text-[10px]">
            <option>En</option>
            <option>Am</option>
          </select> */}
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

            {responseNotifications?.totalUnread &&
              responseNotifications?.totalUnread > 0 && (
                <div className="absolute top-[5px] right-[5px] w-[20px] h-[20px] bg-[#0C73B8] rounded-full flex justify-center items-center text-white max-lg2:w-[15px] max-lg2:h-[15px]  max-lg2:right-[10px] max-lg2:text-[10px]">
                  {responseNotifications?.totalUnread?.toString()}
                </div>
              )}
          </div>
          <div className="w-[50px] h-[50px] bg-[#0C73B8] text-white rounded-full flex justify-center items-center">
            {user?.picture ? (
              <img
                src={`${process.env.REACT_APP_BACKEND_IMAGES}/AccusationAcceptorImages/${user?.picture}`}
                className="w-[100%] h-[100%] object-cover rounded-full"
                alt=""
              />
            ) : (
              <div className="w-[50px] h-[50px] bg-[#0C73B8] text-white rounded-full flex justify-center items-center">
                <span>{user && user?.firstname?.[0]}</span>
              </div>
            )}
          </div>
          {user ? (
            <div className="flex flex-col">
              <span className="font-bold text-[#0C73B] capitalize max-lg2:text-[12px]">
                {user?.firstname} {user?.middlename} {user?.lastname}
              </span>
              <span className="text-gray-500 text-[14px]  max-lg2:text-[10px]">
                @{user?.username}
              </span>
            </div>
          ) : (
            "-"
          )}
        </div>
      </div>
      {notificationsSlider && (
        <div className="fixed right-0 z-[100] top-[100px] w-[20%] min-h-[100vh] bg-white border border-gray-100 shadow-xl overflow-y-auto max-lg2:top-[80px] max-lg2:w-[25%]">
          <div className="w-[90%] my-[20px] mx-auto">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-[16px] font-bold max-lg2:text-[12px]">
                All Notifications
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
                  Unread
                </button>
                <button
                  onClick={() => setRead("yes")}
                  className={
                    read === "yes"
                      ? "bg-[#0C73B8] text-white text-[10px] max-lg2:text-[8px] py-1 px-2 rounded-[20px]"
                      : "text-[10px] max-lg2:text-[8px] py-1 px-2 rounded-[20px]"
                  }
                >
                  Read
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
                      <option value={-1}>Latest</option>
                      <option value={1}>Oldest</option>
                    </select>
                  </div>
                </div>
              )}

            <div className="h-[70vh] overflow-y-scroll hide-scroll-bar">
              {loading ? (
                <Loading
                  addtionalStyle={"flex mt-[20px] justify-center items-center"}
                />
              ) : responseNotifications?.notifications?.length === 0 ? (
                <div>
                  <span>No result found</span>
                </div>
              ) : (
                responseNotifications?.notifications?.map(
                  (notification, index) => {
                    return (
                      <div
                        key={index}
                        className="w-[100%] border-b  mt-[20px] flex gap-[10px]"
                      >
                        <div className="w-[100%] flex flex-col items-end gap-[5px]">
                          <div className="flex justify-end items-center gap-[10px]">
                            {/* <span className="font-bold text-[#0C73B8] text-[14px] max-lg2:text-[12px]">Abebe Kebde kasu</span>d */}
                            {/* <button className="bg-[#0C73B8] text-white text-[10px] max-lg2:text-[8px] py-1 px-2 rounded-[20px]">Mark as read</button> */}
                          </div>

                          <span className="text-[12px] text-gray-500 max-lg2:text-[10px]">
                            {notification?.message_en}{" "}
                            {notification.read === "no" && (
                              <button
                                onClick={() =>
                                  handleReadNotification(notification?._id)
                                }
                                className="text-[#0C73B8] font-bold text-[12px] max-lg2:text-[8px] py-1 px-2 rounded-[20px]"
                              >
                                Mark as read
                              </button>
                            )}{" "}
                          </span>
                        </div>
                      </div>
                    );
                  }
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardNavbar;
