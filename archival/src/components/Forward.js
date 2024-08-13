import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ServerError from "./ServerError";
import apiRequest from "../utils/request";
import { useDispatch, useSelector } from "react-redux";
import { fetchOfficeUser } from "../REDUX/slices/officeUserSlice";
import { jwtDecode } from "jwt-decode";
import { language } from "../utils/part-1lan";
import Select from "react-select";
import { customStyles } from "../utils/data";
import Loading from "./Loading";

function Forward() {
  const token = sessionStorage?.getItem("tID");
  const { id, type } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const decodedToken = jwtDecode(token);
  const userID = decodedToken?.user?.id;
  const translationState = useSelector((state)=>state.translation);
  const officeUser = useSelector((state) => state?.officeUser);
  const [user, setUser] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [forwardData,setForwardData] = useState([])
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);


  useEffect(() => {
    apiRequest
      .get(`/archival_user_api/get_archival_user/${userID}`, {
        headers: {
          Authorization: "Token " + token,
          get_archuser_api: process.env.REACT_APP_GET_ARCHUSER_API,
        },
      })
      .then((res) => {
        setUser(res.data);
      });
  }, [userID, token]);
  useEffect(() => {
    dispatch(fetchOfficeUser());
    // eslint-disable-next-line
  }, []);


  const handleSelectedChange = (selectedOptions) => {
    // ("op:",selectedOptions)

    setSelectedOptions(selectedOptions);
    setForwardData(
      selectedOptions?.map((option) => ({
        to: option?._id,
        cc: "no",
        remark: "",
      }))
    );
  };

  

  // const handleCcChange = (index, key, value) => {
  //   const updatedForwardData = [...forwardData];
  //   updatedForwardData[index][key] = value;
  //   setForwardData(updatedForwardData);
  // };

  const handleRemarkChange = (index, value) => {
    const updatedForwardData = [...forwardData];
    updatedForwardData[index]["remark"] = value;
    setForwardData(updatedForwardData);
  };

  const handleForward = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);
      if (type === "incoming") {
        await apiRequest
          .post(
            `/forward_incoming_ltr_api/archival_forward_incoming_letter`,
            { incoming_letter_id: id,forwardArray:JSON.stringify(forwardData)},
            {
              headers: {
                Authorization: "bearer " + token,
                get_arch_incom_ltrfrw_api: process.env.REACT_APP_GET_ARCH_INCOM_LTRFRW_API,
              },
            }
          )
          .then((res) => {
            setLoading(false);
            if (res?.status === 201) {
              translationState?.lan==="En" &&  toast.success(res?.data?.Message_en);
              translationState?.lan==="Am" &&  toast.success(res?.data?.Message_am);
             
              setTimeout(() => {
              
                window.location.href = `/incoming/${id}`;
              }, 6000);
            }
          })
          .catch((error) => {
            setLoading(false);
           
            if (error?.response?.status === 500) {
              setServerError(true);
            }
            translationState?.lan==="En" &&  toast.error(error?.response?.data?.Message_en);
            translationState?.lan==="Am" &&  toast.error(error?.response?.data?.Message_am);
          });
      }

     else if (type === "presystem") {
        await apiRequest
          .put(
            `/forward_letter_api/archival_forward_letter`,
            { letter_id: id,forwardArray:JSON.stringify(forwardData)},
            {
              headers: {
                Authorization: "bearer " + token,
                get_archletterfrwd_api: process.env.REACT_APP_GET_ARCHLETTERFRWD_API,
              },
            }
          )
          .then((res) => {
            setLoading(false);
            if (res?.status === 201) {
              translationState?.lan==="En" &&  toast.success(res?.data?.Message_en);
              translationState?.lan==="Am" &&  toast.success(res?.data?.Message_am);
             
              setTimeout(() => {
              
                window.location.href = `/forwarded_path/presystem/${id}`;
              }, 6000);
            }
          })
          .catch((error) => {
            setLoading(false);
           
            if (error?.response?.status === 500) {
              setServerError(true);
            }
            translationState?.lan==="En" &&  toast.error(error?.response?.data?.Message_en);
            translationState?.lan==="Am" &&  toast.error(error?.response?.data?.Message_am);
          });
      }
 
      
      else {
        setLoading(false);
        translationState?.lan==="En" &&  toast.error(language?.letterTypeOption[0]);
        translationState?.lan==="Am" &&  toast.error(language?.letterTypeOption[1]);
       
      }
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  };



  if (serverError) return <ServerError />;

  return (
    <div className="w-[100%] py-4 min-h-[500px] bg-white">
      <div className="w-[90%] mx-auto">
        <ToastContainer theme="light" />
        <div className="flex justify-between items-center gap-5">
          <div className="flex items-center justify-start gap-[10px] text-[#0C73B8]">
            <BiChevronLeft
              onClick={() => navigate(-1)}
              className="text-[40px] cursor-pointer max-lg2:text-[30px]"
            />
            <span className="text-[20px] font-bold max-lg2:text-[16px]">
          {translationState?.lan ==="En" && language?.forward[0]}
          {translationState?.lan ==="Am" && language?.forward[1]}
          {type ==="incoming" &&  <span className="text-[20px] text-[#FBB042] font-semibold">
                    {translationState?.lan === "En" &&
                      ` / ${language?.incomingLetter[0]} - ${id}`}
                    {translationState?.lan === "Am" &&
                      ` / ${language?.incomingLetter[1]} - ${id}`}
                  </span>}
                  {type ==="presystem" &&  <span className="text-[20px] text-[#FBB042] font-semibold">
                    {translationState?.lan === "En" &&
                      ` / ${language?.cutoffLetters[0]} - ${id}`}
                    {translationState?.lan === "Am" &&
                      ` / ${language?.cutoffLetters[1]} - ${id}`}
                  </span>}
         
            </span>
          </div>
        </div>
        <div className="flex my-[20px] flex-col gap-[20px]">
          <div className="w-[50%] col-span-2">
            <label
             
              className="block text-[14px] p-2 leading-6 text-[#0C73B8] font-bold"
            >
             {translationState?.lan ==="En" && language?.from[0]}
             {translationState?.lan ==="Am" && language?.from[1]}
            </label>
            <div className="mt-2">
              <input
                type="text"
                value={
                  (user?.firstname ? user?.firstname : "-") +
                  " " +
                  (user?.middlename ? user?.middlename : "-") +
                  " " +
                  (user?.lastname ? user?.lastname : "-")
                }
                disabled
                className="block w-full rounded-md p-4 border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none  sm:leading-6 max-lg2:text-[12px]"
              />
            </div>
          </div>


          {officeUser?.data &&
            officeUser?.data?.length > 0 && (
              <div className="w-[100%]">
                <label
                
                  className="block text-[14px] p-2 leading-6 text-[#0C73B8] font-bold"
                >
                   {translationState?.lan === "En" && language?.to[0]}
                   {translationState?.lan === "Am" && language?.to[1]} <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <Select
                    options={officeUser?.data}
                    isMulti
                    placeholder="Select user"
                    getOptionLabel={(e) =>
                   e?.firstname + " " + e?.middlename + " " + e?.lastname + " ---- " + e?.position
                    }
                    getOptionValue={(e) => e?._id}
                    styles={customStyles}
                    onChange={handleSelectedChange}
                  />
                </div>
              </div>
            )}

{selectedOptions?.length !== 0 &&
            selectedOptions?.map((selected, index) => (
              <div key={index} className="flex flex-col gap-[20px]">
                
                {/* <div>
                  <label
                    htmlFor={`cc-${index}`}
                    className="text-[14px] font-bold my-[5px]"
                  >
                     {translationState?.lan === "En" && language?.cc[0]}
                     {translationState?.lan === "Am" && language?.cc[1]} (
                    {selected?.firstname +
                      " " +
                      selected?.middlename +
                      " " +
                      selected?.lastname}
                    )
                  </label>

                  <select
                    id={`cc-${index}`}
                    value={forwardData[index]?.cc || "no"}
                    className="block w-full rounded-md p-4 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
                  
                    onChange={(e) =>
                      handleCcChange(index, "cc", e.target.value)
                    }
                  >
                    <option value={""}></option>
                    <option value={"no"}>
                    {translationState?.lan === "En" && language?.no[0]}
                    {translationState?.lan === "Am" && language?.no[1]}
                    </option>
                    <option value={"yes"}>
                    {translationState?.lan === "En" && language?.yes[0]}
                    {translationState?.lan === "Am" && language?.yes[1]}
                    </option>
                  </select>
                </div> */}
           

               

                <div className="w-[100%] my-4 overflow-y-scroll">
                  {forwardData[index]?.attachment && (
                    <embed
                      src={URL.createObjectURL(forwardData[index]?.attachment)}
                      type="application/pdf"
                      width="100%"
                      height="600px"
                    />
                  )}
                </div>
             

                <div className="w-[100%] mt-[20px]">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-bold p-2 leading-6 text-gray-900"
                  >
                     {translationState?.lan === "En" && language?.remark[0]}
                     {translationState?.lan === "Am" && language?.remark[1]} (
                    {selected?.firstname +
                      " " +
                      selected?.middlename +
                      " " +
                      selected?.lastname}
                    )
                  </label>
                  <div className="mt-2">
                    
                    <textarea   
                  
                      id={`remark-${index}`}
                      value={forwardData[index]?.remark || ""}
                      rows={15}
                      onChange={(e) =>
                        handleRemarkChange(index, e.target.value)
                      }
                      className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 resize-none" ></textarea>
                  </div>

                </div>
             

                <div className="my-[30px] w-[100%] h-[1px] bg-gray-300" />
                
              </div>
            ))}


         
        </div>

        {loading ? <Loading addtionalStyle={"flex justify-end items-center my-[20px]"}/>: <div className="w-[100%] mt-[30px] py-3 flex justify-end items-center gap-[20px]">
          <button
            onClick={() => navigate(-1)}
            className="rounded-md px-3 py-2 text-sm    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 max-lg2:text-[12px]"
          >
           {translationState?.lan ==="En" && language?.cancel[0]}
           {translationState?.lan ==="Am" && language?.cancel[1]}
          </button>
          <button
            disabled={loading}
            className={
              loading
                ? "bg-[#FBB042] border border-[#FBB042] text-white px-3 py-2 rounded text-[14px] cursor-not-allowed hover:bg-transparent hover:text-[#FBB042] transition duration-500 max-lg2:text-[12px]"
                : "bg-[#FBB042] border border-[#FBB042] text-white px-3 py-2 rounded text-[14px] hover:bg-transparent hover:text-[#FBB042] transition duration-500 max-lg2:text-[12px]"
            }
            onClick={handleForward}
          >
          {translationState?.lan ==="En" && language?.forward[0]}
          {translationState?.lan ==="Am" && language?.forward[1]}
          </button>
        </div>}

       
      </div>
    </div>
  );
}

export default Forward;
