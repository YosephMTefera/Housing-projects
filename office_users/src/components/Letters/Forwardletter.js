import React, { useEffect, useState,useMemo } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { customStyles } from "../../utils/data";
import "react-toastify/dist/ReactToastify.css";
import apiRequest from "../../utils/request";
import ServerError from "../ServerError";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOfficeUsers } from "../../REDUX/slices/getAllOfficeUsersSlice";
import Loading from "../Loading";
import { language } from "../../utils/part-1lan";
import { fetchAllDirectorate } from "../../REDUX/slices/allDirectorateSlice";
import { fetchAllTeams } from "../../REDUX/slices/allTeamSlice";
import { fetchAllDivision } from "../../REDUX/slices/allDivisionsSlice";

function Forwardletter() {
  const token = sessionStorage.getItem("tID");
  const decodedToken = jwtDecode(token);
  const userID = decodedToken?.user?.id;
  const { id, type } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translationState = useSelector((state) => state.translation);
  const officeUserList = useSelector((state) => state.getAllOfficeUsers);
  const divisionList = useSelector((state)=>state?.allDivisions);
  const directoratesList = useSelector((state)=>state?.allDirectorates);
  const teamList = useSelector((state)=>state?.allTeams);
  const [user, setUser] = useState({});
  const [forwardList,setForwardList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [forwardData, setForwardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [forwardLoading, setForwardLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
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
          if (error?.response?.status === 500) {
            setServerError(true);
          }
        });
    } catch (error) {
      setLoading(false);
      setServerError(true);
    }
  }, [userID, token]);

  useEffect(() => {
    dispatch(fetchAllDivision());
    dispatch(fetchAllOfficeUsers());
    dispatch(fetchAllDirectorate());
    dispatch(fetchAllTeams())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const filterOfficeUsers = useMemo(() => {
    return officeUserList?.officeUsers?.filter(ou => ou?._id !== userID);
  }, [officeUserList, userID]);
  
  const activeOfficeUsers = useMemo(() => {
    return filterOfficeUsers?.filter(au => au?.status === "active");
  }, [filterOfficeUsers]);
  
  const filterMainExecutive = useMemo(() => {
    return activeOfficeUsers?.filter(ou => ou?.level === "MainExecutive");
  }, [activeOfficeUsers]);
  
  const filterDivisionManagers = useMemo(() => {
    return activeOfficeUsers?.filter(ou => ou?.level === "DivisionManagers");
  }, [activeOfficeUsers]);
  
  const filterDirectors = useMemo(() => {
    return activeOfficeUsers?.filter(ou => ou?.level === "Directors");
  }, [activeOfficeUsers]);
  
  const filterTeamLeaders = useMemo(() => {
    return activeOfficeUsers?.filter(ou => ou?.level === "TeamLeaders");
  }, [activeOfficeUsers]);
  const filterProfessionals = useMemo(() => {
    return activeOfficeUsers?.filter(ou => ou?.level === "Professionals");
  }, [activeOfficeUsers]);
  const findUserDvision = divisionList?.divisions?.find((division)=>division?._id ===user?.division?._id);
  

  useEffect(() => {
    const updateForwardList = () => {

      if(type ==="incoming") {

        if(findUserDvision?.special ==="no"){
          switch (user?.level) {
            case 'MainExecutive':
              setForwardList(activeOfficeUsers);
              break;
            case 'DivisionManagers':
              const findUserMatchDivision = activeOfficeUsers?.filter(ou => ou?.division?._id === user?.division?._id);
              const users = [...filterMainExecutive, ...filterDivisionManagers, ...findUserMatchDivision];
              setForwardList(users);
              break;
            case 'Directors':
              const filterDivisionManger = filterDivisionManagers?.filter(ou => ou?.division?._id === user?.division?._id);
              const getDirectorate = directoratesList?.directorates?.find(directorate => directorate?.manager?._id === user?._id);
              const filterDirectorateMembers = activeOfficeUsers?.filter(ou => getDirectorate?.members?.some(member => member?.users?._id === ou?._id));
              const directorUsers = [...filterDivisionManger, ...filterDirectors, ...filterDirectorateMembers];
              setForwardList(directorUsers);
              break;
            case 'TeamLeaders':
              const findTeams = teamList?.teams?.find(team => team?.manager?._id === user?._id);
              const findDirectorate = directoratesList?.directorates?.find(directorate => directorate?._id === findTeams?.directorate?._id);
              const findDirector = filterDirectors?.filter(fd => fd?._id === findDirectorate?.manager?._id);
              const findTeamLeaders = filterTeamLeaders?.filter((ou)=>ou?.division?._id === user?.division?._id);
              const filterTeamMembers = activeOfficeUsers?.filter(ou => findTeams?.members?.some(member => member?.users?._id === ou?._id));
              const teamUsers = [...findDirector, ...findTeamLeaders, ...filterTeamMembers];
              setForwardList(teamUsers);
              break;
            default:
              setForwardList([]); 
              break;
          }
  
        }
        else{
          switch (user?.level) {
            case 'MainExecutive':
              setForwardList(activeOfficeUsers);
              break;
            case 'DivisionManagers':
              const findUserMatchDivision = activeOfficeUsers?.filter(ou => ou?.division?._id === user?.division?._id);
              const users = [...filterMainExecutive, ...filterDivisionManagers, ...findUserMatchDivision];
              setForwardList(users);
              break;
            case 'Directors':
              const getDirectorate = directoratesList?.directorates?.find(directorate => directorate?.manager?._id === user?._id);
              const filterDirectorateMembers = activeOfficeUsers?.filter(ou => getDirectorate?.members?.some(member => member?.users?._id === ou?._id));
              const directorUsers = [...filterMainExecutive, ...filterDirectors, ...filterDirectorateMembers];
              setForwardList(directorUsers);
              break;
            case 'TeamLeaders':
              const findTeam = teamList?.teams?.find(team => team?.manager?._id === user?._id);
              const findDirectorate = directoratesList?.directorates?.find(directorate => directorate?._id === findTeam?.directorate?._id);
              const findDirector = filterDirectors?.filter(fd => fd?._id === findDirectorate?.manager?._id);
              const findTeamLeaders = filterTeamLeaders?.filter((ou)=>ou?.division?._id === user?.division?._id);
              const filterTeamMembers = activeOfficeUsers?.filter(ou => findTeam?.members?.some(member => member?.users?._id === ou?._id));
              const teamUsers = [...findDirector, ...findTeamLeaders, ...filterTeamMembers];
              setForwardList(teamUsers);
              break;
          
            default:
              setForwardList([]); 
              break;
          }
        }
      }
      else if(type ==="outgoing"){
        
      if(findUserDvision?.special ==="no"){
        switch (user?.level) {
          case 'MainExecutive':
            setForwardList(activeOfficeUsers);
            break;
          case 'DivisionManagers':
            const findUserMatchDivision = activeOfficeUsers?.filter(ou => ou?.division?._id === user?.division?._id);
            const users = [...filterMainExecutive, ...filterDivisionManagers, ...findUserMatchDivision];
            setForwardList(users);
            break;
          case 'Directors':
            const filterDivisionManger = filterDivisionManagers?.filter(ou => ou?.division?._id === user?.division?._id);
            const getDirectorate = directoratesList?.directorates?.find(directorate => directorate?.manager?._id === user?._id);
            const filterDirectorateMembers = activeOfficeUsers?.filter(ou => getDirectorate?.members?.some(member => member?.users?._id === ou?._id));
            const directorUsers = [...filterDivisionManger, ...filterDirectors, ...filterDirectorateMembers];
            setForwardList(directorUsers);
            break;
          case 'TeamLeaders':
            const findTeams = teamList?.teams?.find(team => team?.manager?._id === user?._id);
            const findDirectorate = directoratesList?.directorates?.find(directorate => directorate?._id === findTeams?.directorate?._id);
            const findDirector = filterDirectors?.filter(fd => fd?._id === findDirectorate?.manager?._id);
            const findTeamLeaders = filterTeamLeaders?.filter((ou)=>ou?.division?._id === user?.division?._id);
            const filterTeamMembers = activeOfficeUsers?.filter(ou => findTeams?.members?.some(member => member?.users?._id === ou?._id));
            const teamUsers = [...findDirector, ...findTeamLeaders, ...filterTeamMembers];
            setForwardList(teamUsers);
            break;
            case 'Professionals':
              const findProfessionals = filterProfessionals?.filter((ou)=>ou?.division?._id ===user?.division?._id);
              const findPro = teamList?.teams?.find((team)=>team?.members?.some((member)=>member?.users?._id ===user?._id));
              const findTeamLeader =  filterTeamLeaders?.filter((ou)=>ou?._id === findPro?.manager?._id);
        
              const proUsers = [...findTeamLeader,...findProfessionals,]
              setForwardList(proUsers);
                break;
          default:
            setForwardList([]); 
            break;
        }

      }
      else{
        switch (user?.level) {
          case 'MainExecutive':
            setForwardList(activeOfficeUsers);
            break;
          case 'DivisionManagers':
            const findUserMatchDivision = activeOfficeUsers?.filter(ou => ou?.division?._id === user?.division?._id);
            const users = [...filterMainExecutive, ...filterDivisionManagers, ...findUserMatchDivision];
            setForwardList(users);
            break;
          case 'Directors':
            const getDirectorate = directoratesList?.directorates?.find(directorate => directorate?.manager?._id === user?._id);
            const filterDirectorateMembers = activeOfficeUsers?.filter(ou => getDirectorate?.members?.some(member => member?.users?._id === ou?._id));
            const directorUsers = [...filterMainExecutive, ...filterDirectors, ...filterDirectorateMembers];
            setForwardList(directorUsers);
            break;
          case 'TeamLeaders':
            const findTeam = teamList?.teams?.find(team => team?.manager?._id === user?._id);
            const findDirectorate = directoratesList?.directorates?.find(directorate => directorate?._id === findTeam?.directorate?._id);
            const findDirector = filterDirectors?.filter(fd => fd?._id === findDirectorate?.manager?._id);
            const findTeamLeaders = filterTeamLeaders?.filter((ou)=>ou?.division?._id === user?.division?._id);
            const filterTeamMembers = activeOfficeUsers?.filter(ou => findTeam?.members?.some(member => member?.users?._id === ou?._id));
            const teamUsers = [...findDirector, ...findTeamLeaders, ...filterTeamMembers];
            setForwardList(teamUsers);
            break;
            case 'Professionals':
              // const findTeam = teamList?.teams?.find(team => team?.manager?._id === user?._id);
              const findProfessionals = filterProfessionals?.filter((ou)=>ou?.division?._id ===user?.division?._id);
              // const findTeamLeader =  filterTeamLeaders?.filter((ou)=>ou?.division?._id === user?.division?._id);
              const findPro = teamList?.teams?.find((team)=>team?.members?.some((member)=>member?.users?._id ===user?._id));
              const findTeamLeader =  filterTeamLeaders?.filter((ou)=>ou?._id === findPro?.manager?._id);
        
              const proUsers = [...findTeamLeader,...findProfessionals]
              setForwardList(proUsers);
                break;
          default:
            setForwardList([]); 
            break;
        }
      }
      }
      else if(type ==="internal"){
        
        if(findUserDvision?.special ==="no"){
          switch (user?.level) {
            case 'MainExecutive':
              setForwardList(activeOfficeUsers);
              break;
            case 'DivisionManagers':
              const findUserMatchDivision = activeOfficeUsers?.filter(ou => ou?.division?._id === user?.division?._id);
              const users = [...filterMainExecutive, ...filterDivisionManagers, ...findUserMatchDivision];
              setForwardList(users);
              break;
            case 'Directors':
              const filterDivisionManger = filterDivisionManagers?.filter(ou => ou?.division?._id === user?.division?._id);
              const getDirectorate = directoratesList?.directorates?.find(directorate => directorate?.manager?._id === user?._id);
              const filterDirectorateMembers = activeOfficeUsers?.filter(ou => getDirectorate?.members?.some(member => member?.users?._id === ou?._id));
              const directorUsers = [...filterDivisionManger, ...filterDirectors, ...filterDirectorateMembers];
              setForwardList(directorUsers);
              break;
            case 'TeamLeaders':
              const findTeams = teamList?.teams?.find(team => team?.manager?._id === user?._id);
              const findDirectorate = directoratesList?.directorates?.find(directorate => directorate?._id === findTeams?.directorate?._id);
              const findDirector = filterDirectors?.filter(fd => fd?._id === findDirectorate?.manager?._id);
              const findTeamLeaders = filterTeamLeaders?.filter((ou)=>ou?.division?._id === user?.division?._id);
              const filterTeamMembers = activeOfficeUsers?.filter(ou => findTeams?.members?.some(member => member?.users?._id === ou?._id));
              const teamUsers = [...findDirector, ...findTeamLeaders, ...filterTeamMembers];
              setForwardList(teamUsers);
              break;
              case 'Professionals':
                const findProfessionals = filterProfessionals?.filter((ou)=>ou?.division?._id ===user?.division?._id);
                const findPro = teamList?.teams?.find((team)=>team?.members?.some((member)=>member?.users?._id ===user?._id));
                const findTeamLeader =  filterTeamLeaders?.filter((ou)=>ou?._id === findPro?.manager?._id);
          
                const proUsers = [...findTeamLeader,...findProfessionals,]
                setForwardList(proUsers);
                  break;
            default:
              setForwardList([]); 
              break;
          }
  
        }
        else{
          switch (user?.level) {
            case 'MainExecutive':
              setForwardList(activeOfficeUsers);
              break;
            case 'DivisionManagers':
              const findUserMatchDivision = activeOfficeUsers?.filter(ou => ou?.division?._id === user?.division?._id);
              const users = [...filterMainExecutive, ...filterDivisionManagers, ...findUserMatchDivision];
              setForwardList(users);
              break;
            case 'Directors':
              const getDirectorate = directoratesList?.directorates?.find(directorate => directorate?.manager?._id === user?._id);
              const filterDirectorateMembers = activeOfficeUsers?.filter(ou => getDirectorate?.members?.some(member => member?.users?._id === ou?._id));
              const directorUsers = [...filterMainExecutive, ...filterDirectors, ...filterDirectorateMembers];
              setForwardList(directorUsers);
              break;
            case 'TeamLeaders':
              const findTeam = teamList?.teams?.find(team => team?.manager?._id === user?._id);
              const findDirectorate = directoratesList?.directorates?.find(directorate => directorate?._id === findTeam?.directorate?._id);
              const findDirector = filterDirectors?.filter(fd => fd?._id === findDirectorate?.manager?._id);
              const findTeamLeaders = filterTeamLeaders?.filter((ou)=>ou?.division?._id === user?.division?._id);
              const filterTeamMembers = activeOfficeUsers?.filter(ou => findTeam?.members?.some(member => member?.users?._id === ou?._id));
              const teamUsers = [...findDirector, ...findTeamLeaders, ...filterTeamMembers];
              setForwardList(teamUsers);
              break;
              case 'Professionals':
                const findProfessionals = filterProfessionals?.filter((ou)=>ou?.division?._id ===user?.division?._id);
                const findPro = teamList?.teams?.find((team)=>team?.members?.some((member)=>member?.users?._id ===user?._id));
                const findTeamLeader =  filterTeamLeaders?.filter((ou)=>ou?._id === findPro?.manager?._id);
          
                const proUsers = [...findTeamLeader,...findProfessionals]
                setForwardList(proUsers);
                  break;
            default:
              setForwardList([]); 
              break;
          }
        }
        }
        else if(type ==="presystem"){
        
          setForwardList(activeOfficeUsers);
         
          }
          else if(type ==="memo"){
        
            setForwardList(activeOfficeUsers);
           
            }
      else{
        translationState?.lan==="En" &&  toast.error(language?.letterTypeOption[0]);
        translationState?.lan==="Am" &&  toast.error(language?.letterTypeOption[1]);
      }

   
    };
  
    updateForwardList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, activeOfficeUsers, directoratesList, teamList]);



  const handleSelectedChange = (selectedOptions) => {
  

    setSelectedOptions(selectedOptions);
    setForwardData(
      selectedOptions?.map((option) => ({
        to: option?._id,
        paraph: "",
        cc: "no",
        remark: "",
      }))
    );
  };

  const handleParaphAttachmentChange = (index, key, value) => {
    const updatedForwardData = [...forwardData];
    updatedForwardData[index][key] = value;
    setForwardData(updatedForwardData);
  };

  const handleCcChange = (index, key, value) => {
    const updatedForwardData = [...forwardData];
    updatedForwardData[index][key] = value;
    setForwardData(updatedForwardData);
  };

  const handleRemarkChange = (index, value) => {
    const updatedForwardData = [...forwardData];
    updatedForwardData[index]["remark"] = value;
    setForwardData(updatedForwardData);
  };

  const handleForward = async (e) => {
    e?.preventDefault();
    try {
      setForwardLoading(true);
      if (type === "incoming") {
        await apiRequest
          .put(
            `/forward_incoming_ltr_api/officer_forward_incoming_letter`,
            { incoming_letter_id: id,forwardArray:forwardData},
            {
              headers: {
                Authorization: "bearer " + token,
                get_offincom_ltrfrw_api: process.env.REACT_APP_GET_OFFINCOM_LTRFRW_API,
              },
            }
          )
          .then((res) => {
            setForwardLoading(false);
         
              translationState?.lan==="En" &&  toast.success(res?.data?.Message_en);
              translationState?.lan==="Am" &&  toast.success(res?.data?.Message_am);
             
              setTimeout(() => {
              
                window.location.href = `/letters/forward/path/${type}/${id}`;
              }, 6000);
            
          })
          .catch((error) => {
            setSelectedOptions([])
            setForwardLoading(false);
           
            if (error?.response?.status === 500) {
              setSelectedOptions([])
              setServerError(true);
            }
            translationState?.lan==="En" &&  toast.error(error?.response?.data?.Message_en);
            translationState?.lan==="Am" &&  toast.error(error?.response?.data?.Message_am);
          });
      }
    else  if (type === "outgoing") {
        await apiRequest
          .put(
            `/frwd_outgoing_ltr_api/officer_forward_outgoing_letter`,
            { outgoing_letter_id: id,forwardArray:forwardData},
            {
              headers: {
                Authorization: "bearer " + token,
                get_frwdofoutputltr_api: process.env.REACT_APP_GET_FRWDOFOUTPUTLTR_API,
              },
            }
          )
          .then((res) => {
            setForwardLoading(false);
         
              translationState?.lan==="En" &&  toast.success(res?.data?.Message_en);
              translationState?.lan==="Am" &&  toast.success(res?.data?.Message_am);
             
              setTimeout(() => {
              
                window.location.href = `/letters/forward/path/${type}/${id}`;
              }, 6000);
            
          })
          .catch((error) => {
            setSelectedOptions([])
            setForwardLoading(false);
           
            if (error?.response?.status === 500) {
              setSelectedOptions([])
              setServerError(true);
            }
            translationState?.lan==="En" &&  toast.error(error?.response?.data?.Message_en);
            translationState?.lan==="Am" &&  toast.error(error?.response?.data?.Message_am);
          });
      }
      else  if (type === "internal") {
        await apiRequest
          .put(
            `/frwd_internal_api/officer_forward_internal_letter`,
            { internal_letter_id: id,forwardArray:forwardData},
            {
              headers: {
                Authorization: "bearer " + token,
                get_crfrwdintltr_api: process.env.REACT_APP_GET_CRFRWDINTLTR_API,
              },
            }
          )
          .then((res) => {
            setForwardLoading(false);
         
              translationState?.lan==="En" &&  toast.success(res?.data?.Message_en);
              translationState?.lan==="Am" &&  toast.success(res?.data?.Message_am);
             
              setTimeout(() => {
              
                window.location.href = `/letters/forward/path/${type}/${id}`;
              }, 6000);
            
          })
          .catch((error) => {
            setSelectedOptions([])
            setForwardLoading(false);
           
            if (error?.response?.status === 500) {
              setSelectedOptions([])
              setServerError(true);
            }
            translationState?.lan==="En" &&  toast.error(error?.response?.data?.Message_en);
            translationState?.lan==="Am" &&  toast.error(error?.response?.data?.Message_am);
          });
      }
      else  if (type === "presystem") {
        await apiRequest
          .put(
            `/forward_letter_api/officer_forward_letter`,
            { letter_id: id,forwardArray:forwardData},
            {
              headers: {
                Authorization: "bearer " + token,
                get_offletterfrwd_api: process.env.REACT_APP_GET_OFFLETTERFRWD_API,
              },
            }
          )
          .then((res) => {
            setForwardLoading(false);
         
              translationState?.lan==="En" &&  toast.success(res?.data?.Message_en);
              translationState?.lan==="Am" &&  toast.success(res?.data?.Message_am);
             
              setTimeout(() => {
              
                window.location.href = `/letters/forward/path/${type}/${id}`;
              }, 6000);
            
          })
          .catch((error) => {
            setSelectedOptions([])
            setForwardLoading(false);
           
            if (error?.response?.status === 500) {
              setSelectedOptions([])
              setServerError(true);
            }
            translationState?.lan==="En" &&  toast.error(error?.response?.data?.Message_en);
            translationState?.lan==="Am" &&  toast.error(error?.response?.data?.Message_am);
          });
      }

      else  if (type === "memo") {
        await apiRequest
          .put(
            `/frwd_internal_memo_api/officer_forward_internal_memo`,
            { internal_memo_id: id,forwardArray:forwardData},
            {
              headers: {
                Authorization: "bearer " + token,
                get_crfrwdintmem_api: process.env.REACT_APP_GET_CRFRWDINTMEM_API,
              },
            }
          )
          .then((res) => {
            setForwardLoading(false);
         
              translationState?.lan==="En" &&  toast.success(res?.data?.Message_en);
              translationState?.lan==="Am" &&  toast.success(res?.data?.Message_am);
             
              setTimeout(() => {
              
                window.location.href = `/letters/forward/path/${type}/${id}`;
              }, 6000);
            
          })
          .catch((error) => {
            setSelectedOptions([])
            setForwardLoading(false);
           
            if (error?.response?.status === 500) {
              setSelectedOptions([])
              setServerError(true);
            }
            translationState?.lan==="En" &&  toast.error(error?.response?.data?.Message_en);
            translationState?.lan==="Am" &&  toast.error(error?.response?.data?.Message_am);
          });
      }
      else {
        setForwardLoading(false);
        translationState?.lan==="En" &&  toast.error(language?.letterTypeOption[0]);
        translationState?.lan==="Am" &&  toast.error(language?.letterTypeOption[1]);
       
      }
    } catch (error) {
      setSelectedOptions([])
      setForwardLoading(false);
      setServerError(true);
    }
  };
  if (serverError) return <ServerError />;
  return (
    <div className="w-[90%] mx-auto my-[50px] py-4 min-h-[500px] bg-white rounded-[10px]">
      {loading ? (
        <Loading
          addtionalStyle={"flex justify-center items-center my-[30px]"}
        />
      ) : (
        <div className="w-[90%] mx-auto">
          <ToastContainer theme="light" />
          <div className="flex justify-between items-center gap-5">
            <div className="flex items-center justify-start gap-[10px] text-[#FDC00D]">
              <BiChevronLeft
                onClick={() => navigate(-1)}
                className="text-[40px] cursor-pointer"
              />
              <span className="text-[20px] font-bold">
                {translationState?.lan === "En" && language?.forward[0]}
                {translationState?.lan === "Am" && language?.forward[1]}

                {type === "incoming" && (
                  <span className="text-[20px] text-[#FBB042] font-semibold">
                    {translationState?.lan === "En" &&
                      ` / ${language?.incomingLetter[0]} - ${id}`}
                    {translationState?.lan === "Am" &&
                      ` / ${language?.incomingLetter[1]} - ${id}`}
                  </span>
                )}

                {type === "outgoing" && (
                  <span className="text-[20px] text-[#FBB042] font-semibold">
                    {translationState?.lan === "En" &&
                      ` / ${language?.outgoingLetter[0]} - ${id}`}
                    {translationState?.lan === "Am" &&
                      ` / ${language?.outgoingLetter[1]} - ${id}`}
                  </span>
                )}

                {type === "internal" && (
                  <span className="text-[20px] text-[#FBB042] font-semibold">
                    {translationState?.lan === "En" &&
                      ` / ${language?.internaLetter[0]} - ${id}`}
                    {translationState?.lan === "Am" &&
                      ` / ${language?.internaLetter[1]} - ${id}`}
                  </span>
                )}

                {type === "presystem" && (
                  <span className="text-[20px] text-[#FBB042] font-semibold">
                    {translationState?.lan === "En" &&
                      ` / ${language?.presystemLetter[0]} - ${id}`}
                    {translationState?.lan === "Am" &&
                      ` / ${language?.presystemLetter[1]} - ${id}`}
                  </span>
                )}
                 {type === "memo" && (
                  <span className="text-[20px] text-[#FBB042] font-semibold">
                    {translationState?.lan === "En" &&
                      ` / ${language?.internalMemo[0]} - ${id}`}
                    {translationState?.lan === "Am" &&
                      ` / ${language?.internalMemo[1]} - ${id}`}
                  </span>
                )}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-[20px]">
            {user && (
              <div className="w-[50%] col-span-2">
                <label
                  htmlFor="from"
                  className="block text-sm font-medium p-2 leading-6 text-gray-900"
                >
                  {translationState?.lan === "En" && language?.from[0]}
                  {translationState?.lan === "Am" && language?.from[1]}
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="from"
                    value={
                      (user?.firstname ? user?.firstname : "-") +
                      " " +
                      (user?.middlename ? user?.middlename : "-") +
                      " " +
                      (user?.lastname ? user?.lastname : "-")
                    }
                    disabled
                    className="block w-full rounded-md p-4 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )}

            {officeUserList?.officeUsers &&
              officeUserList?.officeUsers?.length > 0 && (
                <div className="w-[50%]">
                  <label
                  
                    className="block text-sm font-medium p-2 leading-6 text-gray-900"
                  >
                    {translationState?.lan === "En" && language?.to[0]}
                    {translationState?.lan === "Am" && language?.to[1]}{" "}
                    <span className="text-red-700">*</span>
                  </label>
                  <div className="mt-2">
                    <Select
                      options={forwardList}
                      isMulti
                      placeholder="Select user"
                      getOptionLabel={(e) =>
                        e?.firstname +
                        " " +
                        e?.middlename +
                        " " +
                        e?.lastname +
                        " ---- " +
                        e?.position
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
                  <div>
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
                      //   value={forwardData[index]?.paraph || ' '}
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
                  </div>
                  {forwardData[index]?.cc === "no" && (
                    <div>
                      <label
                        htmlFor={`paraph-${index}`}
                        className="text-[14px] font-bold my-[5px]"
                      >
                        {translationState?.lan === "En" && language?.paraph[0]}
                        {translationState?.lan === "Am" &&
                          language?.paraph[1]}{" "}
                        (
                        {selected?.firstname +
                          " " +
                          selected?.middlename +
                          " " +
                          selected?.lastname}
                        )
                      </label>

                      <select
                        id={`paraph-${index}`}
                        value={forwardData[index]?.paraph || ""}
                        className="block w-full rounded-md p-4 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6"
                        onChange={(e) =>
                          handleParaphAttachmentChange(
                            index,
                            "paraph",
                            e.target.value
                          )
                        }
                      >
                        <option></option>
                        {user?.paraph?.map((paraph, index) => {
                          return (
                            <option key={index} value={paraph?._id}>
                              {paraph?.title}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  )}

                  <div className="w-[100%] my-4 overflow-y-scroll">
                    {forwardData[index]?.attachment && (
                      <embed
                        src={URL.createObjectURL(
                          forwardData[index]?.attachment
                        )}
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
                        className="block w-full p-3 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FBB042] outline-none sm:text-sm sm:leading-6 resize-none"
                      ></textarea>
                    </div>
                  </div>

                  <div className="my-[30px] w-[100%] h-[1px] bg-gray-300" />
                </div>
              ))}
          </div>

          {forwardLoading ? (
            <Loading
              addtionalStyle={"flex justify-end items-center my-[20px]"}
            />
          ) : (
            <div className="w-[100%] mt-[30px] py-3 flex justify-end items-center gap-[20px]">
              <button
                onClick={() => navigate(-1)}
                className="rounded-md  px-3 py-2 text-sm font-semibold text-black  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {translationState?.lan === "En" && language?.cancel[0]}
                {translationState?.lan === "Am" && language?.cancel[1]}
              </button>
              <button
                onClick={handleForward}
                className={
                  "bg-[#FBB042] border border-[#FBB042] text-white px-3 py-2 rounded text-[14px] hover:bg-transparent hover:text-[#FBB042] transition duration-500"
                }
              >
                {translationState?.lan === "En" && language?.forward[0]}
                {translationState?.lan === "Am" && language?.forward[1]}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Forwardletter;
