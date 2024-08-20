import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiRequest from "../../utils/request";
import ServerError from "../ServerError";
import { fetchAllTeams } from "../../REDUX/slices/allTeamSlice";
import { fetchAllDirectorate } from "../../REDUX/slices/allDirectorateSlice";
import { fetchAllOfficeUsers } from "../../REDUX/slices/allOfficeUsersSlice";

function TeamDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("tID");
  const translationState = useSelector((state)=>state?.translation);
  const teamState = useSelector((state) => state?.allTeams);
  const directorateState = useSelector((state) => state?.allDirectorates);
  const officeUsersState = useSelector((state) => state?.allOfficers);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    dispatch(fetchAllTeams());
    dispatch(fetchAllDirectorate());
    dispatch(fetchAllOfficeUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterTeam = teamState?.teams?.find((ds) => ds?._id === id);

  const teamDirectorate = directorateState?.directorates?.find(
    (dv) => dv?._id === filterTeam?.directorate?._id
  )?.name_am;

  const removeMember = async (officerID) => {
    try {

     

      await apiRequest
        ?.put(
          `/team_leader_api/remove_team_member/${id}/${officerID}`,
          {},
          {
            headers: {
              get_remoteam_api: process.env.REACT_APP_GET_REMOTEAM_API,
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
          // translationState?.lan==="En" ?   toast.success(res?.data?.Message_en) :   toast.success(res?.data?.Message_am)
          window.location.href = `/team_detail/${id}`;  
        
          }
        })
        .catch((error) => {
       
       
          if (error?.response?.status === 500) {
            setServerError(true);
          } 
          translationState?.lan==="En" ?    toast.error(error?.response?.data?.Message_en)  :    toast.error(error?.response?.data?.Message_am)
        });
    } catch (error) {
      setServerError(false);
     
    }
  };

  if (serverError) return <ServerError />;
  return (
    <div className="w-[100%] mx-auto h-[82%] mt-[30px] relative bg-white rounded">
      <ToastContainer theme="light" />
      <div className="w-[90%] mx-auto">
        <div className="flex items-center justify-between gap-[10px] text-[#FBB042]">
          <div className="flex items-center justify-start">
            <BiChevronLeft
              onClick={() => navigate(-1)}
              className="text-[40px] cursor-pointer max-lg2:text-[30px]"
            />
            <span className="text-[20px] font-bold capitalize max-lg2:text-[16px]">
              {filterTeam?.name_am} ({teamDirectorate})
            </span>
          </div>
        </div>

        <div className="w-[100%] min-h-[500px] overflow-auto mt-[30px] mx-auto">
          {teamState?.loading ? (
            <Loading addtionalStyle={"flex justify-center items-center my-[20px]"} />
          ) : (
            filterTeam?.members?.length ===0 ? <div className="w-[90%] mx-auto bg-white my-[20px] flex justify-center items-center">
            <span className="text-[14px] text-[#0C73B8] font-bold max-lg2:text-[12px]">This team doesn't have any members.</span>
          </div> :
            <table className="w-[100%]">
              <thead className="bg-[#0C73B8] text-white  text-[14px] max-lg2:text-[12px]">
                <tr>
                  <th className="px-2 py-4 border-[2px] border-white">#</th>

                  <th className="px-2 py-4 border-[2px] border-white">
                    Full Name
                  </th>
                  <th className="px-2 py-4 border-[2px] border-white">Level</th>
                  <th className="px-2 py-4 border-[2px] border-white">
                    Phone Number
                  </th>
                  <th className="px-2 py-4 border-[2px] border-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="border [&>*:nth-child(even)]:bg-[#F9F9F9]">
                {filterTeam?.members?.map((directorateMembers, index) => {
                  const firstname = officeUsersState?.officeUsers?.find(
                    (ou) => ou?._id === directorateMembers?.users?._id
                  )?.firstname;
                  const middlename = officeUsersState?.officeUsers?.find(
                    (ou) => ou?._id === directorateMembers?.users?._id
                  )?.middlename;
                  const lastname = officeUsersState?.officeUsers?.find(
                    (ou) => ou?._id === directorateMembers?.users?._id
                  )?.lastname;
                  const level = officeUsersState?.officeUsers?.find(
                    (ou) => ou?._id === directorateMembers?.users?._id
                  )?.level;
                  const phone = officeUsersState?.officeUsers?.find(
                    (ou) => ou?._id === directorateMembers?.users?._id
                  )?.phone;

                  return (
                    <tr
                      key={index}
                      className="text-center border-b border-gray-300 text-gray-600 text-[14px] max-lg2:text-[10px]"
                    >
                      <td className="py-2 border">{index + 1}</td>

                      <td className="py-2 border">
                        {firstname} {middlename} {lastname}
                      </td>
                      <td className="py-2 border">{level}</td>
                      <td className="py-2 border">{phone}</td>

                      <td className="py-2 border">
                        <button
                          onClick={() => removeMember(directorateMembers?._id)}
                          className="bg-[#0C73B8] text-white text-[14px] py-2 px-4 rounded-[5px] max-lg2:text-[10px]"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamDetail;
