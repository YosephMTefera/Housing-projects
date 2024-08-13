import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ServerError from "./ServerError";
import {jwtDecode} from 'jwt-decode';
import apiRequest from "../utils/request";
import { fetchAllTeams } from "../REDUX/slices/allTeamSlice";
import { language } from "../utils/part-1lan";

function DirectorDashboard() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("tID");
  const decodedToken = jwtDecode(token);
  const userID = decodedToken?.user?.id;
  const dispatch = useDispatch();
  const translationState = useSelector((state)=>state.translation);
  const teamList = useSelector((state) => state?.allTeams);
  const [directorate,setDirectorate] = useState({})
  const [user,setUser] = useState({});
  const [loading,setLoading] = useState(false);
  const [serverError,setServerError] = useState(false);


  useEffect(() => {
    dispatch(fetchAllTeams());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      setLoading(true)
      apiRequest
        .get(`/office_user_api/get_office_user/${userID}`, {
          headers: {
            get_user_api: process.env.REACT_APP_GET_USER_API,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoading(false)
          setUser(res.data);
        }).catch((error)=>{
          setLoading(false);
          if(error?.response?.status ===500){
            setServerError(true);
          }
        })
        
    } catch (error) {
      setServerError(true)
    }
  }, [userID, token]);
  useEffect(() => {
    try {
      apiRequest
        .get(`/directorate_api/get_directorate_manager/${userID}`, {
          headers: {
            get_direct_api: process.env.REACT_APP_GET_DIRECT_API,
       
          },
        })
        .then((res) => {
          setDirectorate(res.data);
        }).catch((error)=>{
          setLoading(false);
          if(error?.response?.status ===500){
            setServerError(true);
          }
        })
        
    } catch (error) {
      setServerError(true)
    }
  }, [userID, token]);


  const filterTeams = teamList?.teams?.filter(
    (team) => team?.directorate?._id === directorate?._id
  );

  if (!user)
    return (
      <div className="w-[90%] mx-auto min-h-[250px] my-[30px] flex flex-col justify-center items-center gap-[10px] bg-white rounded-[10px]">
        <span className="text-[#0C73B8] text-[14px]">
        {translationState?.lan === "En" && language?.managerNotAssigned[0]}
        {translationState?.lan === "Am" && language?.managerNotAssigned[1]}
        </span>
        <button
          onClick={() => navigate(-1)}
          className="py-2 px-4 text-white text-[14px] bg-[#0C73B8] rounded-[5px]"
        >
      {translationState?.lan === "En" && language?.back[0]}
      {translationState?.lan === "Am" && language?.back[1]}
        </button>
      </div>
    );

  if (teamList?.error || serverError)
    return <ServerError />;
  return (
    <div className="w-[100%]">
      

      <div className="w-[100%] my-[30px] mx-auto">
        <div className="w-[95%] mx-auto h-[82%] my-[30px] p-2 bg-white rounded">
          <div className="w-[95%] mt-[50px] mx-auto">
            <div className="flex items-center justify-between gap-[10px]  text-[#0C73B8]">
              <div className="flex items-center justify-start">
                <span className="text-[20px] font-bold">
                {translationState?.lan === "En" && language?.teams[0]}
                {translationState?.lan === "Am" && language?.teams[1]}
                </span>
              </div>
            </div>

            {loading ? (
              <Loading addtionalStyle={"flex justify-center items-center"} />
            ) : filterTeams?.length === 0 ? (
              <div className="w-[90%] mx-auto min-h-[300px] my-[30px] flex justify-center items-center bg-white rounded-[10px]">
                <span className="text-[#0C73B8] text-[14px]">
                {translationState?.lan === "En" && language?.noteamFoundDirectorate[0]}
                {translationState?.lan === "Am" && language?.noteamFoundDirectorate[1]}
                </span>
              </div>
            ) : (
              <div className="w-[95%] h-[100%] my-[30px] mx-auto flex justify-between items-center">
                <table className="w-[100%] bg-white">
                  <thead className="bg-[#0C73B8] text-white  text-[14px]">
                    <tr>
                      <th className="px-2 py-4 border-[2px] border-white">#</th>

                      <th className="px-2 py-4 border-[2px] border-white">
                      {translationState?.lan === "En" && language?.teamName[0]}
                      {translationState?.lan === "Am" && language?.teamName[1]}
                      </th>
                      <th className="px-2 py-4 border-[2px] border-white">
                      {translationState?.lan === "En" && language?.teamLeader[0]}
                      {translationState?.lan === "Am" && language?.teamLeader[1]}
                      </th>
                      <th className="px-2 py-4 border-[2px] border-white">
                      {translationState?.lan === "En" && language?.createdAt[0]}
                      {translationState?.lan === "Am" && language?.createdAt[1]}
                      </th>
                      <th className="px-2 py-4 border-[2px] border-white">
                      {translationState?.lan === "En" && language?.status[0]}
                      {translationState?.lan === "Am" && language?.status[1]}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border [&>*:nth-child(even)]:bg-[#F9F9F9]">
                    {filterTeams?.map((team, index) => {
                      

                      return (
                        <tr
                          key={index}
                          onClick={() => navigate(`/teams/${team?._id}`)}
                          className="text-center border-b border-gray-300 text-gray-600 text-[14px] cursor-pointer"
                        >
                          <td className="px-2 py-4 border-[2px] border-white">
                            {index + 1}
                          </td>

                          <td className="px-2 py-4 border-[2px] border-white">
                            {team?.name_en ? team?.name_en:"-"}
                          </td>
                          <td className="px-2 py-4 border-[2px] border-white">
                            {team?.manager ? `${team?.manager?.firstname} ${team?.manager?.middlename} ${team?.manager?.lastname}`:"Not Assigned"}
                          </td>
                          <td className="px-2 py-4 border-[2px] border-white">
                            {team?.createdAt?.split("T")[0]}
                          </td>

                          <td className="px-6 py-2 whitespace-nowrap">
                            {team?.status === "active" && (
                              <span
                                className="px-2 py-1 inline-flex text-xs leading-5
                    font-semibold  bg-green-600 text-white rounded-[5px]"
                              >
                                   {translationState?.lan === "En" && language?.active[0]}
                                   {translationState?.lan === "Am" && language?.active[1]}
                              </span>
                            )}

                            {team?.status === "inactive" && (
                              <span
                                className="px-2 py-1 inline-flex text-xs leading-5
                    font-semibold  bg-red-600 text-white rounded-[5px]"
                              >
                                   {translationState?.lan === "En" && language?.inactive[0]}
                                   {translationState?.lan === "Am" && language?.inactive[1]}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DirectorDashboard;
