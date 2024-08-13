import React, { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ServerError from "../../ServerError";
import apiRequest from "../../../utils/request";
import Loading from "../../Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { language } from "../../../utils/part-1lan";

function AddParaph() {
  const token = sessionStorage.getItem("tID");
  const decodedToken = jwtDecode(token);
  const userID = decodedToken?.user?.id;
  const navigate = useNavigate();
  const translationState = useSelector((state)=>state.translation);
  const [paraph, setParaph] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const addParaph = async () => {
    try {
      const paraphData = new FormData();

      paraphData.append('paraph',JSON.stringify(paraph))


      setLoading(true);
      await apiRequest
        .put(
          `/office_user_api/update_office_user/${userID}`,
            paraphData,
          {
            headers: {
              "Content-Type":"multipart/form-data",
              get_user_update_api: process.env.REACT_APP_GET_USER_UPDATE_API,
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
       
          setLoading(false);
      
          window.location.href = "/settings";
        })
        .catch((error) => {
     
          setLoading(false);
          if (
            error.response.status === 500) {
              setServerError(true);
          
          }
          translationState?.lan === "En"
          ? toast.error(error?.response?.data?.Message_en)
          : toast.error(error?.response?.data?.Message_am);
        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };

  if (serverError) return <ServerError />;
  return (
    <div className="w-[80%] mx-auto my-[20px] p-2 bg-white rounded-[20px]">
     <ToastContainer theme="light"/>
      <div className="w-[90%] my-[20px] mx-auto">
        <div className="w-[100%] flex justify-between items-center">
          <div
            className="flex items-center gap-[5px] cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <MdKeyboardArrowLeft className="text-[30px] text-[#0C73B8]" />
            <span className="font-bold text-[#0C73B8] text-[18px]">
            {translationState?.lan ==="En" && language?.paraph[0]}
            {translationState?.lan ==="Am" && language?.paraph[1]}
            </span>
          </div>
          {loading ? <Loading addtionalStyle={"flex justify-end items-center"}/>:   <button
            onClick={addParaph}
            className="bg-[#0C73B8] text-[14px] py-2 px-4 rounded text-white"
          >
                         {translationState?.lan ==="En" && language?.addNewparaph[0]}
                         {translationState?.lan ==="Am" && language?.addNewparaph[1]}
          </button>}
       
        </div>
        <div className="my-[30px]">
          <div className="col-span-3 max-[670px]:sm:col-span-6">
            <label
              htmlFor="street-address"
              className="text-[#0C73B8] text-[15px] font-semibold"
            >
                    {translationState?.lan ==="En" && language?.paraphTitle[0]}
                    {translationState?.lan ==="Am" && language?.paraphTitle[1]} <span className="text-red-700">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                onChange={(e) => setParaph([e.target.value])}
                className="block w-full rounded-md p-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddParaph;
