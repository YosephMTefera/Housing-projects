import React, { useState, useEffect } from "react";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../SubComponents/Loading";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import ServerError from "../ServerError";
import apiRequest from "../../utils/request";
import { useDispatch, useSelector } from "react-redux";
import { applicationAction } from "../../REDUX/slices/applicationSlice";
import Footer from "../Footer";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { language } from "../../utils/part-1lan";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translationState = useSelector((state) => state.translation);
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [subcity, setSubcity] = useState("");
  const [woreda, setWoreda] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [housePhoneNumber, setHousePhoneNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImg, setprofileImg] = useState(null);
  const [rateLimitTimer, setRateLimitTimer] = useState(null);
  const [loading, setLoading] = useState("");
  const [serverError, setServerError] = useState(false);

  const handleSignUp = async () => {
    try {
      if (firstname?.length >= 50) {
        return toast.error("First name must not be greater than 50 characters");
      }
      if (middlename?.length >= 50) {
        return toast.error(
          "Middle name must not be greater than 50 characters"
        );
      }
      if (lastname?.length >= 50) {
        return toast.error("Last name must not be greater than 50 characters");
      }
      if (woreda?.length >= 20) {
        return toast.error("Woreda must not be greater than 20 characters");
      }
      if (subcity?.length >= 50) {
        return toast.error("Sub-city must not be greater than 50 characters");
      }
      if (phone?.length >= 20) {
        return toast.error("Phone must not be greater than 20 characters");
      }
      if (housePhoneNumber?.length >= 20) {
        return toast.error(
          "House phone number must not be greater than 20 characters"
        );
      }
      if (houseNumber?.length >= 20) {
        return toast.error(
          "House  number must not be greater than 20 characters"
        );
      }

      if (password !== confirmPassword)
        return toast.error("password don't match");

      const newUserData = new FormData();

      newUserData.append("firstname", firstname);
      newUserData.append("middlename", middlename);
      newUserData.append("lastname", lastname);
      newUserData.append("email", email);
      newUserData.append("password", password);
      newUserData.append("subcity", subcity);
      newUserData.append("woreda", woreda);
      newUserData.append("house_number", houseNumber);
      newUserData.append("phone", phone);
      newUserData.append("house_phone_number", housePhoneNumber);
      // newUserData.append("preferred_language", preferredLanguage);
      newUserData.append("gender", gender);
      newUserData.append("picture", profileImg);

      setLoading(true);
      await apiRequest
        .post("/customer_user_api/create_customer_user", newUserData, {
          headers: {
            get_cus_creuser_api: process.env.REACT_APP_GET_CUS_CREUSER_API,
          },
        })
        .then(() => {
          setLoading(false);
          dispatch(applicationAction.setOtpScreen(true));
          navigate("/email/verification", {
            state: {
              email,
            },
          });
        })
        .catch((error) => {
          setLoading(false);
          dispatch(applicationAction.setOtpScreen(false));
          if (error?.response?.status === 500) {
            setServerError(true);
          }
          if (error?.response?.status === 429) {
            setRateLimitTimer(180);
            toast.error("Too many attempts. Please try again later.");
          }
          translationState?.lan === "En" &&
            toast.error(error?.response?.data?.Message_en);
          translationState?.lan === "Am" &&
            toast.error(error?.response?.data?.Message_am);
        });
    } catch (error) {
      setServerError(true);
    }
  };

  useEffect(() => {
    if (rateLimitTimer) {
      const timer = setInterval(() => {
        setRateLimitTimer((prev) => (prev > 1 ? prev - 1 : null));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [rateLimitTimer]);
  if (serverError) return <ServerError />;

  return (
    <div className="w-[100%]  mt-[100px] mx-auto flex flex-col justify-center items-center max-lg2:w-[80%] max-lg:w-[90%]  min-h-[100vh]">
      <ToastContainer theme="light" />
      <Navbar />
      <div className="w-[90%] mx-auto my-[20px] text-[#0C73B8] cursor-pointer flex items-center gap-[10px]">
        <MdOutlineArrowBackIosNew
          onClick={() => navigate("/")}
          className="text-[20px]"
        />
       {translationState?.lan==="En" &&     <span onClick={() => navigate("/")} className="font-bold">
          Home
        </span>}
        {translationState?.lan==="Am" &&     <span onClick={() => navigate("/")} className="font-bold text-[20px]">
        መነሻ
        </span>}
        {translationState?.lan==="Or" &&     <span onClick={() => navigate("/")} className="font-bold">
        madda
        </span>}
        {translationState?.lan==="Tg" &&     <span onClick={() => navigate("/")} className="font-bold text-[20px]">
        መሰረት
        </span>}
        {translationState?.lan==="Sm" &&     <span onClick={() => navigate("/")} className="font-bold">
        asal ahaan
        </span>}
        {translationState?.lan==="Af" &&     <span onClick={() => navigate("/")} className="font-bold">
        Home
        </span>}
      </div>
      <div className="w-[80%] min-h-[80vh]   mx-auto  flex justify-center items-center max-md2:w-[100%]">
        <div className="w-[60%] flex flex-col justify-center items-center mx-auto border border-gray-200 rounded-[10px]  p-4 max-lg2:w-[100%]">
          <div className="w-[100%] text-[40px] flex flex-col justify-center items-center  font-bold max-lg2:text-[30px] max-md2:text-[30px] max-sm1:text-[24px]">
            {translationState.lan === "En" && (
              <span className="text-[#0C73B8] text-center">
                {language?.createAnAccount[0]}
              </span>
            )}
            {translationState.lan === "Am" && (
              <span className="text-[#0C73B8] text-center">
                {language?.createAnAccount[1]}
              </span>
            )}
            {translationState.lan === "Or" && (
              <span className="text-[#0C73B8] text-center">
                {language?.createAnAccount[2]}
              </span>
            )}
            {translationState.lan === "Tg" && (
              <span className="text-[#0C73B8] text-center">
                {language?.createAnAccount[3]}
              </span>
            )}
            {translationState.lan === "Sm" && (
              <span className="text-[#0C73B8] text-center">
                {language?.createAnAccount[4]}
              </span>
            )}
            {translationState.lan === "Af" && (
              <span className="text-[#0C73B8] text-center">
                {language?.createAnAccount[5]}
              </span>
            )}

            <div className="w-[20%] mt-[20px] h-[5px] bg-[#FBB042] max-lg2:w-[20%] max-md2:w-[40%] max-sm1:w-[30%]"></div>
          </div>
          <div className="mt-[20px] flex justify-center items-center">
          {translationState?.lan ==="En" &&    <span className="text-gray-500 text-[14px] text-center">
            {language?.welcomeMessage[0]}
            </span>}
            {translationState?.lan ==="Am" &&    <span className="text-gray-500 text-center">
            {language?.welcomeMessage[1]}
            </span>}
            {translationState?.lan ==="Or" &&    <span className="text-gray-500 text-[14px] text-center">
            {language?.welcomeMessage[2]}
            </span>}
            {translationState?.lan ==="Tg" &&    <span className="text-gray-500 text-center">
            {language?.welcomeMessage[3]}
            </span>}
            {translationState?.lan ==="Sm" &&    <span className="text-gray-500 text-center">
            {language?.welcomeMessage[4]}
            </span>}
            {translationState?.lan ==="Af" &&    <span className="text-gray-500 text-center">
            {language?.welcomeMessage[5]}
            </span>}

          </div>
          <div className="flex flex-col w-[100%] my-[30px] gap-[10px]">
            <div className="w-[100%] grid grid-cols-3 gap-[20px] max-md1:grid-cols-1">
              <div className="w-[100%] col-span-1 bg-gray-50 rounded-[10px] flex  p-4  border border-[#FBB042] max-lg2:p-3">
                {translationState.lan === "En" && (
                  <input
                    type="text"
                    placeholder={
                      language?.firstname[0]
                        ? language?.firstname[0]
                        : "First Name"
                    }
                    onChange={(e) => setFirstname(e.target.value)}
                    className="w-[100%] bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
                  />
                )}
                {translationState.lan === "Am" && (
                  <input
                    type="text"
                    placeholder={
                      language?.firstname[1]
                        ? language?.firstname[1]
                        : "First Name"
                    }
                    onChange={(e) => setFirstname(e.target.value)}
                    className="w-[100%] bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
                  />
                )}
                {translationState.lan === "Or" && (
                  <input
                    type="text"
                    placeholder={
                      language?.firstname[2]
                        ? language?.firstname[2]
                        : "First Name"
                    }
                    onChange={(e) => setFirstname(e.target.value)}
                    className="w-[100%] bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
                  />
                )}
                {translationState.lan === "Tg" && (
                  <input
                    type="text"
                    placeholder={
                      language?.firstname[3]
                        ? language?.firstname[3]
                        : "First Name"
                    }
                    onChange={(e) => setFirstname(e.target.value)}
                    className="w-[100%] bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
                  />
                )}
                {translationState.lan === "Sm" && (
                  <input
                    type="text"
                    placeholder={
                      language?.firstname[4]
                        ? language?.firstname[4]
                        : "First Name"
                    }
                    onChange={(e) => setFirstname(e.target.value)}
                    className="w-[100%] bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
                  />
                )}
                {translationState.lan === "Af" && (
                  <input
                    type="text"
                    placeholder={
                      language?.firstname[5]
                        ? language?.firstname[5]
                        : "First Name"
                    }
                    onChange={(e) => setFirstname(e.target.value)}
                    className="w-[100%] bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
                  />
                )}
              </div>
              <div className="w-[100%] col-span-1 bg-gray-50 rounded-[10px] flex  p-4  border border-[#FBB042] max-lg2:p-3">
                {translationState?.lan === "En" && (
                  <input
                    type="text"
                    placeholder={
                      language?.middlename[0]
                        ? language?.middlename[0]
                        : "Middle Name"
                    }
                    onChange={(e) => setMiddlename(e.target.value)}
                    className="w-[100%] bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
                  />
                )}

                {translationState?.lan === "Am" && (
                  <input
                    type="text"
                    placeholder={
                      language?.middlename[1]
                        ? language?.middlename[1]
                        : "Middle Name"
                    }
                    onChange={(e) => setMiddlename(e.target.value)}
                    className="w-[100%] bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Or" && (
                  <input
                    type="text"
                    placeholder={
                      language?.middlename[2]
                        ? language?.middlename[2]
                        : "Middle Name"
                    }
                    onChange={(e) => setMiddlename(e.target.value)}
                    className="w-[100%] bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Tg" && (
                  <input
                    type="text"
                    placeholder={
                      language?.middlename[3]
                        ? language?.middlename[3]
                        : "Middle Name"
                    }
                    onChange={(e) => setMiddlename(e.target.value)}
                    className="w-[100%] bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Sm" && (
                  <input
                    type="text"
                    placeholder={
                      language?.middlename[4]
                        ? language?.middlename[4]
                        : "Middle Name"
                    }
                    onChange={(e) => setMiddlename(e.target.value)}
                    className="w-[100%] bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Af" && (
                  <input
                    type="text"
                    placeholder={
                      language?.middlename[5]
                        ? language?.middlename[5]
                        : "Middle Name"
                    }
                    onChange={(e) => setMiddlename(e.target.value)}
                    className="w-[100%] bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
                  />
                )}
              </div>
              <div className="w-[100%] col-span-1 bg-gray-50 rounded-[10px] flex  p-4  border border-[#FBB042] max-lg2:p-3">
                {translationState?.lan === "En" && (
                  <input
                    type="text"
                    placeholder={
                      language?.lastname[0] ? language?.lastname[0] : "Last Name"
                    }
                    onChange={(e) => setLastname(e.target.value)}
                    className="w-[100%] bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Am" && (
                  <input
                    type="text"
                    placeholder={
                      language?.lastname[1] ? language?.lastname[1] : "Last Name"
                    }
                    onChange={(e) => setLastname(e.target.value)}
                    className="w-[100%] bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Or" && (
                  <input
                    type="text"
                    placeholder={
                      language?.lastname[2] ? language?.lastname[2] : "Last Name"
                    }
                    onChange={(e) => setLastname(e.target.value)}
                    className="w-[100%] bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Tg" && (
                  <input
                    type="text"
                    placeholder={
                      language?.lastname[3] ? language?.lastname[3] : "Last Name"
                    }
                    onChange={(e) => setLastname(e.target.value)}
                    className="w-[100%] bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Sm" && (
                  <input
                    type="text"
                    placeholder={
                      language?.lastname[4] ? language?.lastname[4] : "Last Name"
                    }
                    onChange={(e) => setLastname(e.target.value)}
                    className="w-[100%] bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Af" && (
                  <input
                    type="text"
                    placeholder={
                      language?.lastname[5] ? language?.lastname[5] : "Last Name"
                    }
                    onChange={(e) => setLastname(e.target.value)}
                    className="w-[100%] bg-transparent outline-none text-[14px] max-lg2:text-[12px]"
                  />
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-[20px] max-md1:grid-cols-1">
             
              <div className="w-[100%] col-span-1 bg-gray-50 rounded-[10px]  p-4  border border-[#FBB042] max-lg2:p-3">
                {translationState?.lan === "En" && (
                  <input
                    type="email"
                    placeholder={
                      language?.email[0] ? language?.email[0] : "Email"
                    }
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Am" && (
                  <input
                    type="email"
                    placeholder={
                      language?.email[1] ? language?.email[1] : "Email"
                    }
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Or" && (
                  <input
                    type="email"
                    placeholder={
                      language?.email[2] ? language?.email[2] : "Email"
                    }
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Tg" && (
                  <input
                    type="email"
                    placeholder={
                      language?.email[3] ? language?.email[3] : "Email"
                    }
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Sm" && (
                  <input
                    type="email"
                    placeholder={
                      language?.email[4] ? language?.email[4] : "Email"
                    }
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Af" && (
                  <input
                    type="email"
                    placeholder={
                      language?.email[5] ? language?.email[5] : "Email"
                    }
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-2  gap-[10px] max-md1:grid-cols-1">
              <div className="w-[100%] col-span-1 bg-gray-50 rounded-[10px]  p-4 border border-[#FBB042] max-lg2:p-3">
                {translationState?.lan === "En" && (
                  <input
                    type="text"
                    placeholder={
                      language?.subCity[0] ? language?.subCity[0] : "Sub-city"
                    }
                    onChange={(e) => setSubcity(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Am" && (
                  <input
                    type="text"
                    placeholder={
                      language?.subCity[1] ? language?.subCity[1] : "Sub-city"
                    }
                    onChange={(e) => setSubcity(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Or" && (
                  <input
                    type="text"
                    placeholder={
                      language?.subCity[2] ? language?.subCity[2] : "Sub-city"
                    }
                    onChange={(e) => setSubcity(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Tg" && (
                  <input
                    type="text"
                    placeholder={
                      language?.subCity[3] ? language?.subCity[3] : "Sub-city"
                    }
                    onChange={(e) => setSubcity(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Sm" && (
                  <input
                    type="text"
                    placeholder={
                      language?.subCity[4] ? language?.subCity[4] : "Sub-city"
                    }
                    onChange={(e) => setSubcity(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Af" && (
                  <input
                    type="text"
                    placeholder={
                      language?.subCity[5] ? language?.subCity[5] : "Sub-city"
                    }
                    onChange={(e) => setSubcity(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
              </div>
              <div className="w-[100%] col-span-1 bg-gray-50 rounded-[10px]  p-4 border border-[#FBB042] max-lg2:p-3">
                {translationState?.lan === "En" && (
                  <input
                    type="text"
                    placeholder={
                      language?.woreda[0] ? language?.woreda[0] : "Woreda"
                    }
                    onChange={(e) => setWoreda(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Am" && (
                  <input
                    type="text"
                    placeholder={
                      language?.woreda[1] ? language?.woreda[1] : "Woreda"
                    }
                    onChange={(e) => setWoreda(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Or" && (
                  <input
                    type="text"
                    placeholder={
                      language?.woreda[2] ? language?.woreda[2] : "Woreda"
                    }
                    onChange={(e) => setWoreda(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Tg" && (
                  <input
                    type="text"
                    placeholder={
                      language?.woreda[3] ? language?.woreda[3] : "Woreda"
                    }
                    onChange={(e) => setWoreda(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Sm" && (
                  <input
                    type="text"
                    placeholder={
                      language?.woreda[4] ? language?.woreda[4] : "Woreda"
                    }
                    onChange={(e) => setWoreda(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Af" && (
                  <input
                    type="text"
                    placeholder={
                      language?.woreda[5] ? language?.woreda[5] : "Woreda"
                    }
                    onChange={(e) => setWoreda(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-[10px] max-md1:grid-cols-1">
              <div className="w-[100%] col-span-1 bg-gray-50 rounded-[10px]  p-4 border border-[#FBB042] max-lg2:p-3">
                {translationState?.lan === "En" && (
                  <input
                    type="text"
                    placeholder={
                      language?.houseNumber[0]
                        ? language?.houseNumber[0]
                        : "House Number"
                    }
                    onChange={(e) => setHouseNumber(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Am" && (
                  <input
                    type="text"
                    placeholder={
                      language?.houseNumber[1]
                        ? language?.houseNumber[1]
                        : "House Number"
                    }
                    onChange={(e) => setHouseNumber(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Or" && (
                  <input
                    type="text"
                    placeholder={
                      language?.houseNumber[2]
                        ? language?.houseNumber[2]
                        : "House Number"
                    }
                    onChange={(e) => setHouseNumber(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Tg" && (
                  <input
                    type="text"
                    placeholder={
                      language?.houseNumber[3]
                        ? language?.houseNumber[3]
                        : "House Number"
                    }
                    onChange={(e) => setHouseNumber(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Sm" && (
                  <input
                    type="text"
                    placeholder={
                      language?.houseNumber[4]
                        ? language?.houseNumber[4]
                        : "House Number"
                    }
                    onChange={(e) => setHouseNumber(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Af" && (
                  <input
                    type="text"
                    placeholder={
                      language?.houseNumber[5]
                        ? language?.houseNumber[5]
                        : "House Number"
                    }
                    onChange={(e) => setHouseNumber(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
              </div>
              <div className="w-[100%] col-span-1 bg-gray-50 rounded-[10px]  p-4 border border-[#FBB042] max-lg2:p-3">
                {translationState?.lan === "En" && (
                  <input
                    type="text"
                    placeholder={
                      language?.housePhoneNumber[0]
                        ? language?.housePhoneNumber[0]
                        : "House Phone Number"
                    }
                    onChange={(e) => setHousePhoneNumber(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Am" && (
                  <input
                    type="text"
                    placeholder={
                      language?.housePhoneNumber[1]
                        ? language?.housePhoneNumber[1]
                        : "House Phone Number"
                    }
                    onChange={(e) => setHousePhoneNumber(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Or" && (
                  <input
                    type="text"
                    placeholder={
                      language?.housePhoneNumber[2]
                        ? language?.housePhoneNumber[2]
                        : "House Phone Number"
                    }
                    onChange={(e) => setHousePhoneNumber(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Tg" && (
                  <input
                    type="text"
                    placeholder={
                      language?.housePhoneNumber[3]
                        ? language?.housePhoneNumber[3]
                        : "House Phone Number"
                    }
                    onChange={(e) => setHousePhoneNumber(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Sm" && (
                  <input
                    type="text"
                    placeholder={
                      language?.housePhoneNumber[4]
                        ? language?.housePhoneNumber[4]
                        : "House Phone Number"
                    }
                    onChange={(e) => setHousePhoneNumber(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Af" && (
                  <input
                    type="text"
                    placeholder={
                      language?.housePhoneNumber[5]
                        ? language?.housePhoneNumber[5]
                        : "House Phone Number"
                    }
                    onChange={(e) => setHousePhoneNumber(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
              </div>
            </div>
            <div className="w-[100%] grid grid-cols-2 gap-[10px]  max-md1:grid-cols-1">
              <div className="w-[100%] col-span-1 mx-auto bg-gray-50 rounded-[10px] p-4 border border-[#FBB042] max-lg2:p-3">
                {translationState.lan === "En" && (
                  <input
                    type="text"
                    placeholder={
                      language?.phone[0] ? language?.phone[0] : "Phone"
                    }
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}

                {translationState.lan === "Am" && (
                  <input
                    type="text"
                    placeholder={
                      language?.phone[1] ? language?.phone[1] : "Phone"
                    }
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState.lan === "Or" && (
                  <input
                    type="text"
                    placeholder={
                      language?.phone[2] ? language?.phone[2] : "Phone"
                    }
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState.lan === "Tg" && (
                  <input
                    type="text"
                    placeholder={
                      language?.phone[3] ? language?.phone[3] : "Phone"
                    }
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState.lan === "Sm" && (
                  <input
                    type="text"
                    placeholder={
                      language?.phone[4] ? language?.phone[4] : "Phone"
                    }
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState.lan === "Af" && (
                  <input
                    type="text"
                    placeholder={
                      language?.phone[5] ? language?.phone[5] : "Phone"
                    }
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
              </div>

              <div className="w-[100%] col-span-1 bg-gray-50 rounded-[10px]   p-4  border border-[#FBB042] max-lg2:p-3">
                <select
                  onChange={(e) => setGender(e.target.value)}
                  className="w-[100%] bg-transparent outline-none text-gray-500 max-lg2:text-[12px]"
                >
                  {translationState?.lan === "En" && (
                    <option value={""}>
                      {language?.selectGender[0]
                        ? language?.selectGender[0]
                        : "Select Gender"}
                    </option>
                  )}
                  {translationState?.lan === "Am" && (
                    <option value={""}>
                      {language?.selectGender[1]
                        ? language?.selectGender[1]
                        : "Select Gender"}
                    </option>
                  )}
                  {translationState?.lan === "Or" && (
                    <option value={""}>
                      {language?.selectGender[2]
                        ? language?.selectGender[2]
                        : "Select Gender"}
                    </option>
                  )}
                  {translationState?.lan === "Tg" && (
                    <option value={""}>
                      {language?.selectGender[3]
                        ? language?.selectGender[3]
                        : "Select Gender"}
                    </option>
                  )}
                  {translationState?.lan === "Sm" && (
                    <option value={""}>
                      {language?.selectGender[4]
                        ? language?.selectGender[4]
                        : "Select Gender"}
                    </option>
                  )}
                  {translationState?.lan === "Af" && (
                    <option value={""}>
                      {language?.selectGender[5]
                        ? language?.selectGender[5]
                        : "Select Gender"}
                    </option>
                  )}

                  {translationState?.lan === "En" && (
                    <option value={"Male"}>
                      {language?.male[0] ? language?.male[0] : "Male"}
                    </option>
                  )}
                  {translationState?.lan === "Am" && (
                    <option value={"Male"}>
                      {language?.male[1] ? language?.male[1] : "Male"}
                    </option>
                  )}
                  {translationState?.lan === "Or" && (
                    <option value={"Male"}>
                      {language?.male[2] ? language?.male[2] : "Male"}
                    </option>
                  )}
                  {translationState?.lan === "Tg" && (
                    <option value={"Male"}>
                      {language?.male[3] ? language?.male[3] : "Male"}
                    </option>
                  )}
                  {translationState?.lan === "Sm" && (
                    <option value={"Male"}>
                      {language?.male[4] ? language?.male[4] : "Male"}
                    </option>
                  )}
                  {translationState?.lan === "Af" && (
                    <option value={"Male"}>
                      {language?.male[5] ? language?.male[5] : "Male"}
                    </option>
                  )}

                  {translationState?.lan === "En" && (
                    <option value={"Female"}>
                      {language?.female[0] ? language?.female[0] : "Female"}
                    </option>
                  )}
                  {translationState?.lan === "Am" && (
                    <option value={"Female"}>
                      {language?.female[1] ? language?.female[1] : "Female"}
                    </option>
                  )}
                  {translationState?.lan === "Or" && (
                    <option value={"Female"}>
                      {language?.female[2] ? language?.female[2] : "Female"}
                    </option>
                  )}
                  {translationState?.lan === "Tg" && (
                    <option value={"Female"}>
                      {language?.female[3] ? language?.female[3] : "Female"}
                    </option>
                  )}
                  {translationState?.lan === "Sm" && (
                    <option value={"Female"}>
                      {language?.female[4] ? language?.female[4] : "Female"}
                    </option>
                  )}
                  {translationState?.lan === "Af" && (
                    <option value={"Female"}>
                      {language?.female[5] ? language?.female[5] : "Female"}
                    </option>
                  )}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-[20px] max-md1:grid-cols-1">
              <div className="w-[100%] col-span-1 mx-auto bg-gray-50 rounded-[10px] p-4 border border-[#FBB042] max-lg2:p-3">
                {translationState.lan === "En" && (
                  <input
                    type="Password"
                    placeholder={
                      language?.password[0] ? language?.password[0] : "Password"
                    }
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState.lan === "Am" && (
                  <input
                    type="Password"
                    placeholder={
                      language?.password[1] ? language?.password[1] : "Password"
                    }
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}

                {translationState.lan === "Or" && (
                  <input
                    type="Password"
                    placeholder={
                      language?.password[2] ? language?.password[2] : "Password"
                    }
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState.lan === "Tg" && (
                  <input
                    type="Password"
                    placeholder={
                      language?.password[3] ? language?.password[3] : "Password"
                    }
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState.lan === "Sm" && (
                  <input
                    type="Password"
                    placeholder={
                      language?.password[4] ? language?.password[4] : "Password"
                    }
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState.lan === "Af" && (
                  <input
                    type="Password"
                    placeholder={
                      language?.password[5] ? language?.password[5] : "Password"
                    }
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
              </div>
              <div className="w-[100%] col-span-1 bg-gray-50 rounded-[10px] p-4 border border-[#FBB042] max-lg2:p-3">
                {translationState?.lan === "En" && (
                  <input
                    type="Password"
                    placeholder={
                      language?.confirmPassword[0]
                        ? language?.confirmPassword[0]
                        : "Confirm password"
                    }
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Am" && (
                  <input
                    type="Password"
                    placeholder={
                      language?.confirmPassword[1]
                        ? language?.confirmPassword[1]
                        : "Confirm password"
                    }
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Or" && (
                  <input
                    type="Password"
                    placeholder={
                      language?.confirmPassword[2]
                        ? language?.confirmPassword[2]
                        : "Confirm password"
                    }
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Tg" && (
                  <input
                    type="Password"
                    placeholder={
                      language?.confirmPassword[3]
                        ? language?.confirmPassword[3]
                        : "Confirm password"
                    }
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Sm" && (
                  <input
                    type="Password"
                    placeholder={
                      language?.confirmPassword[4]
                        ? language?.confirmPassword[4]
                        : "Confirm password"
                    }
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
                {translationState?.lan === "Af" && (
                  <input
                    type="Password"
                    placeholder={
                      language?.confirmPassword[5]
                        ? language?.confirmPassword[5]
                        : "Confirm password"
                    }
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-[100%] bg-transparent outline-none max-lg2:text-[12px]"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="w-[100%] mt-[10px] flex items-center gap-[10px] max-md2:flex-col">
            <label className="w-[100%]">
              <input
                type="file"
                onChange={(e) => setprofileImg(e?.target?.files[0])}
                hidden
              />
              <div className="w-[100%] h-[200px] flex justify-center gap-[10px] text-[#FBB042] items-center p-4 mx-auto border border-gray-300 rounded border-dashed cursor-pointer text-center">
                <BsFillCloudUploadFill />
                <span className="text-[14px] font-bold">
                  {profileImg ? (
                    profileImg?.name
                  ) : (
                    <>
                      {translationState?.lan === "En" &&
                        language?.uploadProfileImage[0]}
                      {translationState?.lan === "Am" &&
                        language?.uploadProfileImage[1]}
                      {translationState?.lan === "Or" &&
                        language?.uploadProfileImage[2]}
                      {translationState?.lan === "Tg" &&
                        language?.uploadProfileImage[3]}
                      {translationState?.lan === "Sm" &&
                        language?.uploadProfileImage[4]}
                      {translationState?.lan === "Af" &&
                        language?.uploadProfileImage[5]}
                    </>
                  )}
                </span>
              </div>
            </label>
            {profileImg && (
              <div className="w-[100%]">
                <img
                  className="w-[100%] h-[200px] object-contain"
                  src={URL.createObjectURL(profileImg)}
                  alt=""
                />
              </div>
            )}
          </div>

          {loading ? (
            <Loading
              addtionalStyle={"flex justify-center items-center my-[30px]"}
            />
          ) : (
            <div className="w-[70%] mt-[30px] max-lg2:w-[80%]">
              {rateLimitTimer ? (
                <>
                  {translationState?.lan === "En" && (
                    <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
                      Please wait 3 minutes before retrying.
                    </p>
                  )}
                  {translationState?.lan === "Am" && (
                    <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
                      እንደገና ከመሞከሮዎ በፊት 3 ደቂቃ ይጠብቁ።
                    </p>
                  )}
                  {translationState?.lan === "Or" && (
                    <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
                      Maaloo irra deebi'anii yaaluun dura daqiiqaa 3 eegaa
                    </p>
                  )}
                  {translationState?.lan === "Tg" && (
                    <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
                      በጃኹም ቅድሚ ዳግማይ ምፍታንኩም 3 ደቓይቕ ተጸበዩ።
                    </p>
                  )}
                  {translationState?.lan === "Sm" && (
                    <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
                      Fadlan sug 3 daqiiqo ka hor inta aanad isku dayin
                    </p>
                  )}
                  {translationState?.lan === "Af" && (
                    <p className="text-[12px] my-[10px] text-[#0C73B8] font-bold text-center">
                      Please wait 3 minutes before retrying.
                    </p>
                  )}
                </>
              ) : (
                <button
                  onClick={handleSignUp}
                  className="w-[100%] py-4 font-bold text-white rounded-[10px] mx-auto bg-[#FBB042] "
                >
                  {translationState?.lan === "En" && language?.register[0]}
                  {translationState?.lan === "Am" && language?.register[1]}
                  {translationState?.lan === "Or" && language?.register[2]}
                  {translationState?.lan === "Tg" && language?.register[3]}
                  {translationState?.lan === "Sm" && language?.register[4]}
                  {translationState?.lan === "Af" && language?.register[5]}
              
                </button>
              )}
            </div>
          )}

          <div className="w-[40%] mt-[30px] flex items-center justify-between gap-[20px]  max-[1400px]:w-[80%]">
            <div className="w-[60%] h-[1px] bg-[#0C73B8]"></div>
            {translationState?.lan ==="En" &&  <span className="text-[14px]  max-lg2:text-[12px]">OR</span>}
            {translationState?.lan ==="Am" &&  <span className="text-[14px]  max-lg2:text-[12px]">ወይም</span>}
            {translationState?.lan ==="Or" &&  <span className="text-[14px]  max-lg2:text-[12px]">Yookaan</span>}
            {translationState?.lan ==="Tg" &&  <span className="text-[14px]  max-lg2:text-[12px]">ወይ</span>}
            {translationState?.lan ==="Sm" &&  <span className="text-[14px]  max-lg2:text-[12px]">Ama</span>}
            {translationState?.lan ==="Af" &&  <span className="text-[14px]  max-lg2:text-[12px]">OR</span>}
            <div className="w-[60%] h-[1px] bg-[#0C73B8]"></div>
          </div>
          <div className="w-[60%] mt-[30px] max-[1400px]:w-[80%]">
            <button
              onClick={() => navigate("/login")}
              className="w-[100%] py-4 text-[#FBB042] font-bold rounded-[10px] mx-auto bg-transparent border border-[#FBB042]"
            >
               {translationState?.lan ==="En" && language?.login[0]}
                {translationState?.lan ==="Am" && language?.login[1]}
                {translationState?.lan ==="Or" && language?.login[2]}
                {translationState?.lan ==="Tg" && language?.login[3]}
                {translationState?.lan ==="Sm" && language?.login[4]}
                {translationState?.lan ==="Af" && language?.login[5]}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
