import React, { useEffect, useState } from "react";
import { AiFillFolderAdd } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { LuForward } from "react-icons/lu";
import { CgMailReply } from "react-icons/cg";
import {
  HiOutlineDocumentDownload,
  HiOutlineDocumentDuplicate,
} from "react-icons/hi";
import { HiMiniDocumentPlus, HiDocumentMinus, HiDocumentPlus } from "react-icons/hi2";
import { CiMemoPad } from "react-icons/ci";
import {
  BsChevronDown,
  BsChevronRight,
  BsPersonFillExclamation,
  BsPersonWorkspace,
} from "react-icons/bs";
import { IoIosCreate, IoMdSettings } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { FcDepartment } from "react-icons/fc";
import { MdNoteAdd, MdOutlineCases } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import apiRequest from "../utils/request";
import { FaArchive, FaBriefcase, FaReplyAll } from "react-icons/fa";
import { GrDocumentStore, GrSchedules } from "react-icons/gr";
import { FaPeopleGroup } from "react-icons/fa6";
import {SlDocs} from "react-icons/sl"
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "./ServerError";
import { language } from "../utils/part-1lan";
import {SiReadthedocs} from 'react-icons/si'

function Sidebar() {
  const token = sessionStorage.getItem("tID");
  const decodedToken = jwtDecode(token);
  const userID = decodedToken?.user?.id;
  const translationState = useSelector((state) => state.translation);
  const [user, setUser] = useState({});
  const [serverError, setServerError] = useState(false);
  const [accountDropdownState, setAccountDropDownState] = useState(false);
  const [incomingLettersDropdownState, setIncomingDropdownState] =
    useState(false);
  const [outgoingLettersDropdownState, setOutgoingDropdownState] =
    useState(false);
  const [internalLettersDropdownState, setInternalLettersDropdownState] =
    useState(false);
  const [internalMemoDropdownState, setinternalMemoDropdownState] =
    useState(false);
    const [cutoffDropdownState, setcutOffDropdownState] =
    useState(false);

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
          translationState?.lan === "En"
            ? toast.error(error?.response?.data?.Message_en)
            : toast.error(error?.response?.data?.Message_am);
        });
    } catch (error) {
      setServerError(true);
    }
  }, [userID, token, translationState?.lan]);

  const handleLogout = async () => {
    await apiRequest
      .get("/office_user_api/logout_office_user")
      .then(() => {
        sessionStorage.clear();
        window.location.href = "/login";
      })
      .catch((error) => {
        if (error?.response?.status === 500) {
          setServerError(true);
        }
      });
  };

  

  if (serverError) return <ServerError />;
  return (
    <div className="w-[17%] h-[100%] bg-[#0C73B8] fixed top-0 left-0 overflow-y-auto hide-scroll-bar">
      <ToastContainer theme="light" />
      <div className="w-[90%] mx-auto flex flex-col justify-center items-center gap-[10px] mt-[30px]">
        <img
          className="w-[80px] h-[80px] object-cover rounded-full"
          src={require("../CAS/housingLogo.png")}
          alt=""
        />
        <span className="text-white text-center text-[14px] max-lg2:text-[10px]">
          አዲስ አበባ ቤቶች ልማት ኮርፖሬሽን
        </span>
      </div>
      <div className="flex flex-col justify-between h-[85%]  max-lg2:text-[14px]">
        <div className={"w-[80%] mt-[50px] mx-auto flex flex-col gap-[30px]"}>
          {user &&
            (user?.level === "MainExecutive" ||
              user?.level === "DivisionManagers" ||
              user?.level === "Directors" ||
              user?.level === "TeamLeaders") && (
              <Link
                to="/"
                className="w-[100%] flex items-center font-bold gap-[10px] text-white  hover:text-gray-200"
              >
                <IoMdHome className="text-[24px]  max-lg2:text-[16px]" />
                <span>
                  {" "}
                  {translationState?.lan === "En" && language?.dashboard[0]}
                  {translationState?.lan === "Am" && language?.dashboard[1]}
                </span>
              </Link>
            )}

          {user &&
            (user?.level === "MainExecutive" ||
              user?.level === "DivisionManagers") && (
              <Link
                to="/letteranalysis"
                className="w-[100%] flex items-center font-bold gap-[10px] text-white  hover:text-gray-200"
              >
                <GrDocumentStore className="text-[24px] max-lg2:text-[16px]" />
                <span className="text-[14px]">
                  {" "}
                  {translationState?.lan === "En" &&
                    language?.letterAnalysis[0]}
                  {translationState?.lan === "Am" &&
                    language?.letterAnalysis[1]}
                </span>
              </Link>
            )}
            

          <div className="relative w-[100%] flex flex-col gap-[20px] text-white">
            {user && (user?.level ==="MainExecutive" || user?.division?.special === "no") && (
              <div
                onClick={() => {
                  setIncomingDropdownState(false);
                  setOutgoingDropdownState(false);
                  setInternalLettersDropdownState(false);
                  setAccountDropDownState(!accountDropdownState);
                }}
                className="relative w-[100%]  cursor-pointer flex justify-between items-center gap-[20px] text-white"
              >
                <div className="flex items-center gap-[20px]">
                  <AiFillFolderAdd className="text-[24px]" />

                  {translationState?.lan === "En" && (
                    <span className="font-bold max-lg2:text-[12px]">
                      {user?.level ? user?.level : "Navigations"}
                    </span>
                  )}
                  {translationState?.lan === "Am" && (
                    <span className="font-bold max-lg2:text-[12px]">
                      {user?.level ? (
                        <>
                          {user?.level === "MainExecutive" &&
                            language?.mainExecutive[1]}
                          {user?.level === "DivisionManagers" &&
                            language?.divisionManagers[1]}
                          {user?.level === "Directors" && language?.director[1]}
                          {user?.level === "TeamLeaders" &&
                            language?.teamleaders[1]}
                          {user?.level === "Professionals" &&
                            language?.professsionals[1]}
                        </>
                      ) : (
                        "ናቪጌሽን"
                      )}
                    </span>
                  )}
                </div>
                <div>
                  {accountDropdownState ? (
                    <BsChevronDown />
                  ) : (
                    <BsChevronRight />
                  )}
                </div>
              </div>
            )}

            {accountDropdownState && (
              <div className="w-[80%] text-[14px] my-[10px] mx-auto flex flex-col gap-[30px] max-lg2:text-[10px] max-lg2:gap-[20px] max-lg2:my-[0px]">
                {user &&
                  (user?.level === "MainExecutive" ||
                    user?.level === "DivisionManagers") && (
                    <Link
                      to="/divisions"
                      className="w-[100%] flex items-center gap-[10px]   hover:text-gray-200"
                    >
                      <FcDepartment className="text-[20px]  max-lg2:text-[16px]" />
                      <span>
                        {translationState?.lan === "En" &&
                          language?.divisions[0]}
                        {translationState?.lan === "Am" &&
                          language?.divisions[1]}
                      </span>
                    </Link>
                  )}

                

                {user &&
                   user?.division?.special === "no" &&
                  (
                    user?.level === "DivisionManagers" ||
                    user?.level === "Directors" ||
                    user?.level === "TeamLeaders") && (
                    <Link
                      to="/cases"
                      className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                    >
                      <MdOutlineCases className="text-[20px]  max-lg2:text-[16px]" />
                      <span>
                        {translationState?.lan === "En" &&
                          language?.forwardCases[0]}
                        {translationState?.lan === "Am" &&
                          language?.forwardCases[1]}
                      </span>
                    </Link>
                  )}

{user && user?.level === "MainExecutive" && <>
                    <Link
                      to="/cases"
                      className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                    >
                      <MdOutlineCases className="text-[20px]  max-lg2:text-[16px]" />
                      <span>
                        {translationState?.lan === "En" &&
                          language?.forwardCases[0]}
                        {translationState?.lan === "Am" &&
                          language?.forwardCases[1]}
                      </span>
                    </Link>
                    <Link
                      to="/cccases"
                      className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                    >
                      <FaBriefcase className="text-[20px]  max-lg2:text-[16px]" />
                      <span>
                        {translationState?.lan === "En" && language?.ccCases[0]}
                        {translationState?.lan === "Am" && language?.ccCases[1]}
                      </span>
                    </Link>

                    <Link
                      to="/repliedcases"
                      className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                    >
                      <FaReplyAll className="text-[20px]  max-lg2:text-[16px]" />
                      <span>
                        {translationState?.lan === "En" &&
                          language?.repliedCases[0]}
                        {translationState?.lan === "Am" &&
                          language?.repliedCases[1]}
                      </span>
                    </Link>
                  
                  </> }


                {user &&
                  user?.division?.special === "no" &&
                  (user?.level === "MainExecutive" ||
                    user?.level === "DivisionManagers" ||
                    user?.level === "Directors" ||
                    user?.level === "TeamLeaders" ||
                    user?.level === "Professionals") && (
                    <Link
                      to="/cccases"
                      className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                    >
                      <FaBriefcase className="text-[20px]  max-lg2:text-[16px]" />
                      <span>
                        {translationState?.lan === "En" && language?.ccCases[0]}
                        {translationState?.lan === "Am" && language?.ccCases[1]}
                      </span>
                    </Link>
                  )}
                {user &&
                  user?.division?.special === "no" &&
                  user?.level === "Professionals" && (
                    <Link
                      to="/"
                      className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                    >
                      <MdOutlineCases className="text-[20px]  max-lg2:text-[16px]" />
                      <span>
                        {" "}
                        {translationState?.lan === "En" &&
                          language?.forwardCases[0]}
                        {translationState?.lan === "Am" &&
                          language?.forwardCases[1]}
                      </span>
                    </Link>
                  )}

                {user &&
                  user?.division?.special === "no" &&
                  (user?.level === "MainExecutive" ||
                    user?.level === "DivisionManagers" ||
                    user?.level === "Directors" ||
                    user?.level === "TeamLeaders" ||
                    user?.level === "Professionals") && (
                    <Link
                      to="/repliedcases"
                      className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                    >
                      <FaReplyAll className="text-[20px]  max-lg2:text-[16px]" />
                      <span>
                        {translationState?.lan === "En" &&
                          language?.repliedCases[0]}
                        {translationState?.lan === "Am" &&
                          language?.repliedCases[1]}
                      </span>
                    </Link>
                  )}

<Link
                to="/schedule"
                className="w-[100%] flex items-center  gap-[10px] text-white  hover:text-gray-200"
              >
                <GrSchedules  className="text-[24px] max-lg2:text-[16px]" />
                <span className="text-[14px]">
                  {" "}
                  {translationState?.lan === "En" &&
                    language?.scheduleList[0]}
                  {translationState?.lan === "Am" &&
                    language?.scheduleList[1]}
                </span>
              </Link>

                {user && user?.level === "MainExecutive" && (
                  <Link
                    to="/it"
                    className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                  >
                    <MdOutlineAdminPanelSettings className="text-[20px]  max-lg2:text-[16px]" />
                    <span>
                      {translationState?.lan === "En" && language?.it[0]}
                      {translationState?.lan === "Am" && language?.it[1]}
                    </span>
                  </Link>
                )}

                {user &&
                  (user?.level === "MainExecutive" ||
                    user?.level === "DivisionManagers") && (
                    <Link
                      to="/archival"
                      className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                    >
                      <FaArchive className="text-[20px]  max-lg2:text-[16px]" />
                      <span>
                        {translationState?.lan === "En" &&
                          language?.archivals[0]}
                        {translationState?.lan === "Am" &&
                          language?.archivals[1]}
                      </span>
                    </Link>
                  )}

                {user &&
                  (user?.level === "MainExecutive" ||
                    user?.level === "DivisionManagers") && (
                    <Link
                      to="/window"
                      className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                    >
                      <BsPersonWorkspace className="text-[20px]  max-lg2:text-[16px]" />
                      <span>
                        {translationState?.lan === "En" &&
                          language?.windowService[0]}
                        {translationState?.lan === "Am" &&
                          language?.windowService[1]}
                      </span>
                    </Link>
                  )}
                {user &&
                  (user?.level === "MainExecutive" ||
                    user?.level === "DivisionManagers") && (
                    <Link
                      to="/ethics"
                      className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                    >
                      <BsPersonFillExclamation className="text-[20px]  max-lg2:text-[16px]" />
                      <span>
                        {translationState?.lan === "En" &&
                          language?.ethicsUsers[0]}
                        {translationState?.lan === "Am" &&
                          language?.ethicsUsers[1]}
                      </span>
                    </Link>
                  )}

                {user &&
                  (user?.level === "MainExecutive" ||
                    user?.level === "DivisionManagers") && (
                    <Link
                      to="/customers"
                      className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                    >
                      <FaPeopleGroup className="text-[20px]  max-lg2:text-[16px]" />
                      <span>
                        {translationState?.lan === "En" &&
                          language?.customers[0]}
                        {translationState?.lan === "Am" &&
                          language?.customers[1]}
                      </span>
                    </Link>
                  )}
              </div>
            )}
          </div>

          {/* incoming Letters */}
          <div className="relative w-[100%] flex flex-col gap-[20px] text-white">
            <div
              onClick={() => {
                setAccountDropDownState(false);
                setOutgoingDropdownState(false);
                setInternalLettersDropdownState(false);
                setcutOffDropdownState(false)
                setIncomingDropdownState(!incomingLettersDropdownState);
                setinternalMemoDropdownState(false)
              }}
              className="relative w-[100%]  cursor-pointer flex justify-between items-center gap-[20px] text-white"
            >
              <div className="flex items-center gap-[20px]">
                <HiMiniDocumentPlus className="text-[24px]" />

                <span className="font-bold max-lg2:text-[12px]">
                  {translationState?.lan === "En" &&
                    language?.incomingLetters[0]}
                  {translationState?.lan === "Am" &&
                    language?.incomingLetters[1]}
                </span>
              </div>
              <div>
                {incomingLettersDropdownState ? (
                  <BsChevronDown />
                ) : (
                  <BsChevronRight />
                )}
              </div>
            </div>

            {incomingLettersDropdownState && (
              <div className="w-[80%] text-[14px] my-[10px] mx-auto flex flex-col gap-[30px] max-lg2:text-[10px] max-lg2:gap-[20px] max-lg2:my-[0px]">
                <Link
                  to="/letters/incoming/forwarded"
                  className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                >
                  <LuForward className="text-[20px]  max-lg2:text-[16px]" />
                  <span>
                    {translationState?.lan === "En" &&
                      language?.forwardedLetters[0]}
                    {translationState?.lan === "Am" &&
                      language?.forwardedLetters[1]}
                  </span>
                </Link>

                <Link
                  to="/letters/incoming/cc"
                  className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                >
                  <HiOutlineDocumentDuplicate className="text-[20px]  max-lg2:text-[16px]" />
                  <span>
                    {translationState?.lan === "En" && language?.ccLetters[0]}
                    {translationState?.lan === "Am" && language?.ccLetters[1]}
                  </span>
                </Link>

                <Link
                  to="/letters/incoming/replied"
                  className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                >
                  <CgMailReply className="text-[20px]  max-lg2:text-[16px]" />
                  <span>
                    {translationState?.lan === "En" &&
                      language?.repliedLetters[0]}
                    {translationState?.lan === "Am" &&
                      language?.repliedLetters[1]}
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* Outgoing Letters */}
          <div className="relative w-[100%] flex flex-col gap-[20px] text-white">
            <div
              onClick={() => {
                setAccountDropDownState(false);
                setIncomingDropdownState(false);
                setInternalLettersDropdownState(false);
                setcutOffDropdownState(false);
                setOutgoingDropdownState(!outgoingLettersDropdownState);
                setinternalMemoDropdownState(false)
              }}
              className="relative w-[100%]  cursor-pointer flex justify-between items-center gap-[20px] text-white"
            >
              <div className="flex items-center gap-[20px]">
                <HiDocumentMinus className="text-[24px]" />

                <span className="font-bold max-lg2:text-[12px]">
                  {translationState?.lan === "En" &&
                    language?.outgoingLetters[0]}
                  {translationState?.lan === "Am" &&
                    language?.outgoingLetters[1]}
                </span>
              </div>
              <div>
                {outgoingLettersDropdownState ? (
                  <BsChevronDown />
                ) : (
                  <BsChevronRight />
                )}
              </div>
            </div>

            {outgoingLettersDropdownState && (
              <div className="w-[80%] text-[14px] my-[10px] mx-auto flex flex-col gap-[30px] max-lg2:text-[10px] max-lg2:gap-[20px] max-lg2:my-[0px]">
                <Link
                  to="/letters/outgoing/create"
                  className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                >
                  <HiDocumentPlus  className="text-[20px]  max-lg2:text-[16px]" />
                  <span>
                    {translationState?.lan === "En" &&
                      language?.createOutgoingLetter[0]}
                    {translationState?.lan === "Am" &&
                      language?.createOutgoingLetter[1]}
                  </span>
                </Link>
                <Link
                  to="/letters/outgoing/created-letters"
                  className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                >
                  <SlDocs   className="text-[20px]  max-lg2:text-[16px]" />
                  <span>
                    {translationState?.lan === "En" &&
                      language?.createdLetters[0]}
                    {translationState?.lan === "Am" &&
                      language?.createdLetters[1]}
                  </span>
                </Link>
                
                <Link
                  to="/letters/outgoing/forwarded"
                  className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                >
                  <LuForward className="text-[20px]  max-lg2:text-[16px]" />
                  <span>
                    {translationState?.lan === "En" &&
                      language?.forwardedLetters[0]}
                    {translationState?.lan === "Am" &&
                      language?.forwardedLetters[1]}
                  </span>
                </Link>

                <Link
                  to="/letters/outgoing/cc"
                  className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                >
                  <HiOutlineDocumentDuplicate className="text-[20px]  max-lg2:text-[16px]" />
                  <span>
                    {translationState?.lan === "En" && language?.ccLetters[0]}
                    {translationState?.lan === "Am" && language?.ccLetters[1]}
                  </span>
                </Link>

                <Link
                  to="/letters/outgoing/replied"
                  className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                >
                  <FaReplyAll className="text-[20px]  max-lg2:text-[16px]" />
                  <span>
                    {translationState?.lan === "En" &&
                      language?.repliedLetters[0]}
                    {translationState?.lan === "Am" &&
                      language?.repliedLetters[1]}
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* Internal letters */}

          <div className="relative w-[100%] flex flex-col gap-[20px] text-white">
            <div
              onClick={() => {
                setAccountDropDownState(false);
                setIncomingDropdownState(false);
                setOutgoingDropdownState(false);
                setcutOffDropdownState(false);
                setInternalLettersDropdownState(!internalLettersDropdownState);
                setinternalMemoDropdownState(false)
              }}
              className="relative w-[100%]  cursor-pointer flex justify-between items-center gap-[20px] text-white"
            >
              <div className="flex items-center gap-[20px]">
                <HiOutlineDocumentDownload className="text-[24px]" />

                <span className="font-bold max-lg2:text-[12px]">
                  {translationState?.lan === "En" &&
                    language?.internalLetters[0]}
                  {translationState?.lan === "Am" &&
                    language?.internalLetters[1]}
                </span>
              </div>
              <div>
                {internalLettersDropdownState ? (
                  <BsChevronDown />
                ) : (
                  <BsChevronRight />
                )}
              </div>
            </div>

            {internalLettersDropdownState && (
              <div className="w-[80%] text-[14px] my-[10px] mx-auto flex flex-col gap-[30px] max-lg2:text-[10px] max-lg2:gap-[20px] max-lg2:my-[0px]">
                 <Link
                  to="/letters/internal/create"
                  className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                >
                      <IoIosCreate className="text-[20px]  max-lg2:text-[16px]" />
                  <span>
                    {translationState?.lan === "En" &&
                      language?.createInternalLetter[0]}
                    {translationState?.lan === "Am" &&
                      language?.createInternalLetter[1]}
                  </span>
                </Link>
                <Link
                  to="/letters/internal/created-letters"
                  className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                >
                  <SlDocs   className="text-[20px]  max-lg2:text-[16px]" />
                  <span>
                    {translationState?.lan === "En" &&
                      language?.createdLetters[0]}
                    {translationState?.lan === "Am" &&
                      language?.createdLetters[1]}
                  </span>
                </Link>
                <Link
                  to="/letters/internal/forwarded"
                  className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                >
                  <LuForward className="text-[20px]  max-lg2:text-[16px]" />
                  <span>
                    {translationState?.lan === "En" &&
                      language?.forwardedLetters[0]}
                    {translationState?.lan === "Am" &&
                      language?.forwardedLetters[1]}
                  </span>
                </Link>

                <Link
                  to="/letters/internal/cc"
                  className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                >
                  <HiOutlineDocumentDuplicate className="text-[20px]  max-lg2:text-[16px]" />
                  <span>
                    {translationState?.lan === "En" && language?.ccLetters[0]}
                    {translationState?.lan === "Am" && language?.ccLetters[1]}
                  </span>
                </Link>

                <Link
                  to="/letters/internal/replied"
                  className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                >
                  <CgMailReply className="text-[20px]  max-lg2:text-[16px]" />
                  <span>
                    {translationState?.lan === "En" &&
                      language?.repliedLetters[0]}
                    {translationState?.lan === "Am" &&
                      language?.repliedLetters[1]}
                  </span>
                </Link>
               
              </div>
            )}
          </div>

          {/* presystem letters */}
          <div className="relative w-[100%] flex flex-col gap-[20px] text-white">
            <div
              onClick={() => {
                setAccountDropDownState(false);
                setIncomingDropdownState(false);
                setOutgoingDropdownState(false);
                setInternalLettersDropdownState(false);
                setcutOffDropdownState(!cutoffDropdownState);
                setinternalMemoDropdownState(false)

              }}
              className="relative w-[100%]  cursor-pointer flex justify-between items-center gap-[20px] text-white"
            >
              <div className="flex items-center gap-[20px]">
                <SiReadthedocs className="text-[24px]" />

                <span className="font-bold max-lg2:text-[12px]">
                  {translationState?.lan === "En" &&
                    language?.cutoffLetters[0]}
                  {translationState?.lan === "Am" &&
                    language?.cutoffLetters[1]}
                </span>
              </div>
              <div>
                {internalLettersDropdownState ? (
                  <BsChevronDown />
                ) : (
                  <BsChevronRight />
                )}
              </div>
            </div>

            {cutoffDropdownState && (
              <div className="w-[80%] text-[14px] my-[10px] mx-auto flex flex-col gap-[30px] max-lg2:text-[10px] max-lg2:gap-[20px] max-lg2:my-[0px]">
                 
    
                <Link
                  to="/letters/presystem/forwarded"
                  className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                >
                  <LuForward className="text-[20px]  max-lg2:text-[16px]" />
                  <span>
                    {translationState?.lan === "En" &&
                      language?.forwardedLetters[0]}
                    {translationState?.lan === "Am" &&
                      language?.forwardedLetters[1]}
                  </span>
                </Link>

                <Link
                  to="/letters/presystem/cc"
                  className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                >
                  <HiOutlineDocumentDuplicate className="text-[20px]  max-lg2:text-[16px]" />
                  <span>
                    {translationState?.lan === "En" && language?.ccLetters[0]}
                    {translationState?.lan === "Am" && language?.ccLetters[1]}
                  </span>
                </Link>

                <Link
                  to="/letters/presystem/replied"
                  className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                >
                  <CgMailReply className="text-[20px]  max-lg2:text-[16px]" />
                  <span>
                    {translationState?.lan === "En" &&
                      language?.repliedLetters[0]}
                    {translationState?.lan === "Am" &&
                      language?.repliedLetters[1]}
                  </span>
                </Link>
               
              </div>
            )}
          </div>

          {/* Internal Memo */}
          <div className="relative w-[100%] flex flex-col gap-[20px] text-white">
            <div
              onClick={() => {
                setAccountDropDownState(false);
                setIncomingDropdownState(false);
                setOutgoingDropdownState(false);
                setInternalLettersDropdownState(false);
                setinternalMemoDropdownState(!internalMemoDropdownState);
              }}
              className="relative w-[100%]  cursor-pointer flex justify-between items-center gap-[20px] text-white"
            >
              <div className="flex items-center gap-[20px]">
                <CiMemoPad className="text-[24px]" />

                <span className="font-bold max-lg2:text-[12px]">
                  {translationState?.lan === "En" && language?.internalMemo[0]}
                  {translationState?.lan === "Am" && language?.internalMemo[1]}
                </span>
              </div>
              <div>
                {internalMemoDropdownState ? (
                  <BsChevronDown />
                ) : (
                  <BsChevronRight />
                )}
              </div>
            </div>

            {internalMemoDropdownState && (
              <div className="w-[80%] text-[14px] my-[10px] mx-auto flex flex-col gap-[30px] max-lg2:text-[10px] max-lg2:gap-[20px] max-lg2:my-[0px]">
                <Link
                  to="/letters/memo/create"
                  className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                >
                  <MdNoteAdd   className="text-[20px]  max-lg2:text-[16px]" />
                  <span>
                    {translationState?.lan === "En" &&
                      language?.createMemo[0]}
                    {translationState?.lan === "Am" &&
                      language?.createMemo[1]}
                  </span>
                </Link>
                <Link
                  to="/letters/memo/created-memo"
                  className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                >
                  <MdNoteAdd   className="text-[20px]  max-lg2:text-[16px]" />
                  <span>
                    {translationState?.lan === "En" &&
                      language?.createdMemo[0]}
                    {translationState?.lan === "Am" &&
                      language?.createdMemo[1]}
                  </span>
                </Link>
                <Link
                  to="/letters/memo/forwarded"
                  className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                >
                  <LuForward className="text-[20px]  max-lg2:text-[16px]" />
                  <span>
                    {translationState?.lan === "En" &&
                      language?.forwardedMemo[0]}
                    {translationState?.lan === "Am" &&
                      language?.forwardedMemo[1]}
                  </span>
                </Link>

                <Link
                  to="/letters/memo/cc"
                  className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                >
                  <HiOutlineDocumentDuplicate className="text-[20px]  max-lg2:text-[16px]" />
                  <span>
                    {translationState?.lan === "En" && language?.ccMemo[0]}
                    {translationState?.lan === "Am" && language?.ccMemo[1]}
                  </span>
                </Link>

                <Link
                  to="/letters/memo/replied"
                  className="w-[100%] flex items-center gap-[10px]  hover:text-gray-200"
                >
                  <CgMailReply className="text-[20px]  max-lg2:text-[16px]" />
                  <span>
                    {translationState?.lan === "En" && language?.repliedMemo[0]}
                    {translationState?.lan === "Am" && language?.repliedMemo[1]}
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="w-[100%] my-[40px] flex flex-col gap-[20px]">
            <div className="w-[80%] mx-auto flex items-center gap-[20px] text-white max-lg2:text-[12px]">
              <Link
                to="/settings"
                className="w-[100%] flex items-center gap-[20px]  text-white font-bold hover:text-gray-200"
              >
                <IoMdSettings className="text-[24px] max-lg2:text-[16px]" />
                {translationState?.lan === "En" && language?.myProfile[0]}
                {translationState?.lan === "Am" && language?.myProfile[1]}
              </Link>
            </div>
            <button
              onClick={handleLogout}
              className="w-[80%] mx-auto flex items-center gap-[20px] text-white font-bold max-lg2:text-[12px]"
            >
              <FiLogOut className="text-[24px] max-lg2:text-[16px]" />
              <span>
                {translationState?.lan === "En" && language?.logout[0]}
                {translationState?.lan === "Am" && language?.logout[1]}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
