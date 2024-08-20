import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiRequest from "../../utils/request";
import ServerError from "../ServerError";
import { ToastContainer } from "react-toastify";
import { BiChevronLeft } from "react-icons/bi";
import Loading from "../Loading";

function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("tID");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  useEffect(() => {
    try {
      setLoading(true);
      apiRequest

        .get(`/customer_user_api/get_customer_user/${id}`, {
          headers: {
            get_cuserlist_api: process.env.REACT_APP_GET_CUSERLIST_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setUser(res.data);
        })
        .catch((error) => {
          setLoading(false);
          if (error?.response?.status === 500) {
            setServerError(true);
          }
        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  }, [id, token]);
  if (serverError) return <ServerError />;
  return (
    <div className="w-[90%]  bg-white mt-[30px] mx-auto">
      <ToastContainer theme="light" />
      <div className="flex items-center justify-start text-[#0C73B8]">
        <BiChevronLeft
          className="text-[40px] cursor-pointer max-lg2:text-[30px]"
          onClick={() => navigate(-1)}
        />
        <span className="font-bold  text-[20px]">
          Customer Information
        </span>
      </div>

      <div className="w-[100%] mt-[20px] mx-auto flex justify-end items-center gap-[10px] max-lg2:mt-0">
     
     <button
       onClick={() => navigate(`/customer/edit/${user?._id}`)}
       className="bg-[#0C73B8] text-[14px] py-2 px-4 rounded text-white max-lg2:text-[10px]"
     >Edit
     </button>
   
   </div>

    {loading ? <Loading addtionalStyle={"flex justify-center items-center my-[20px]"} />:  <div className="mt-[30px] bg-white p-4  rounded-[10px] max-lg2:mt-[10px]">
        <div className="w-[100%] mt-[30px] border border-gray-300 p-2 mx-auto flex justify-start items-center gap-[20px] rounded-[10px]">
        
          <div className="w-[100px] h-[100px] bg-[#0C73B8] text-white rounded-full flex justify-center items-center">
            {user?.picture ? (
              <img
                src={`${process.env.REACT_APP_BACKEND_IMAGES}/CustomerImages/${user?.picture}`}
                className="w-[100%] h-[100%] object-cover rounded-full"
                alt=""
              />
            ) : (
              <div className="w-[100px] h-[100px] bg-[#0C73B8] text-white rounded-full flex justify-center items-center">
                <span>{user?.firstname?.[0]}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-[5px]">
            <span className="font-bold text-[#0C73B8]">
              {user?.firstname} {user?.middlename} {user?.lastname}
            </span>

          
          </div>
        </div>
        <div className="w-[100%] mx-auto p-4  mt-[20px] border border-gray-300 rounded-[10px]">
          <div className="w-[90%] mx-auto">
            <div className="w-[100%] mt-[10px] flex justify-between items-center">
              <span className="font-bold text-[#0C73B8] text-[20px] max-lg2:text-[16px]">
                Personal Information
              </span>
              {user?.status === "active" ? (
                <span className="py-1 px-4 rounded-[20px] bg-green-600 text-white text-[14px] max-lg2:text-[12px]">
                  active
                </span>
              ) : (
                <span className="py-1 px-4 rounded-[20px] bg-red-600 text-white text-[14px] max-lg2:text-[12px]">
                  inactive
                </span>
              )}
            </div>
            <div className="w-[40%] mt-[20px]  flex justify-between items-center gap-[50px] max-lg2:w-[60%]">
              <div className="flex flex-col gap-[20px]">
                <div className="flex flex-col gap-[10px]">
                  <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                    First Name
                  </span>
                  <span className="max-lg2:text-[14px]">
                    {user && user?.firstname}
                  </span>
                </div>

                <div className="flex flex-col gap-[10px]">
                  <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                    Phone
                  </span>
                  <span className="max-lg2:text-[12px]">
                    {user && user?.phone}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[20px]">
                <div className="flex flex-col gap-[10px]">
                  <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                    Middle Name
                  </span>
                  <span className="max-lg2:text-[14px]">
                    {user && user?.middlename}
                  </span>
                </div>

                <div className="flex flex-col gap-[10px]">
                  <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                    Last Name
                  </span>
                  <span className="max-lg2:text-[14px]">
                    {user && user?.lastname}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[20px]">
               

                <div className="flex flex-col gap-[10px]">
                  <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                    Gender
                  </span>
                  <span className="max-lg2:text-[14px]">
                    {user && user?.gender}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[100%] mx-auto p-4  mt-[20px] border border-gray-300 rounded-[10px]">
          <div className="w-[90%] mx-auto">
            <div className="w-[100%] mt-[10px] flex justify-between items-center">
              <span className="font-bold text-[#0C73B8] text-[20px] max-lg2:text-[16px]">
                Address
              </span>
            </div>
            <div className="w-[40%] mt-[20px]  flex justify-between items-center gap-[50px] max-lg2:w-[60%]">
              <div className="flex flex-col gap-[20px]">
                <div className="flex flex-col gap-[10px]">
                  <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                    Sub-city
                  </span>
                  <span className="max-lg2:text-[14px]">
                    {user && user?.subcity}
                  </span>
                </div>

                <div className="flex flex-col gap-[10px]">
                  <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                    Woreda
                  </span>
                  <span className="max-lg2:text-[12px]">
                    {user && user?.woreda}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[20px]">
                <div className="flex flex-col gap-[10px]">
                  <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                    House Number
                  </span>
                  <span className="max-lg2:text-[14px]">
                    {user && user?.house_number}
                  </span>
                </div>

                <div className="flex flex-col gap-[10px]">
                  <span className="text-[14px] text-gray-500 max-lg2:text-[12px]">
                    Email Address
                  </span>
                  <span className="max-lg2:text-[14px]">
                    {user && user?.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default CustomerDetail;
