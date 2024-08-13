import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import {jwtDecode} from 'jwt-decode';
import ServerError from "./ServerError";
import apiRequest from "../utils/request";

function TeamDashboard() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("tID");
    const decodedToken = jwtDecode(token);
    const userID = decodedToken?.user?.id;

    const [user,setUser] = useState({});
    const [teams,setTeams] = useState({});
    const [loading,setLoading] = useState(false);
    const [serverError,setServerError] = useState(false);

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
        setLoading(false)
        setServerError(true)
      }
    }, [userID, token]);

    useEffect(() => {
      try {
        setLoading(true);
        apiRequest
          .get(`/team_leader_api/get_team_manager/${userID}`, {
            headers: {
              get_team_api: process.env.REACT_APP_GET_TEAM_API,
         
            },
          })
          .then((res) => {
            setLoading(false);
            setTeams(res.data);
          }).catch((error)=>{
            setLoading(false);
            if(error?.response?.status ===500){
              setServerError(true);
            }
          })
          
      } catch (error) {
        setLoading(false);
        setServerError(true)
      }
    }, [userID, token]);
    
 
  


  
    if (!user)
      return (
        <div className="w-[90%] mx-auto min-h-[250px] my-[30px] flex flex-col justify-center items-center gap-[10px] bg-white rounded-[10px]">
          <span className="text-[#0C73B8] text-[14px]">
            Manager for this team is not found!
          </span>
          <button
            onClick={() => navigate(-1)}
            className="py-2 px-4 text-white text-[14px] bg-[#0C73B8] rounded-[5px]"
          >
            Go Back
          </button>
        </div>
      );
  
      if (serverError)
      return <ServerError />;
  return (
    <div className="w-[100%]">
    {/* <div className="w-[100%] p-2 min-h-[250px] bg-white">
      <div className="w-[90%]  flex items-center justify-start   text-[#0C73B8] my-[30px] mx-auto font-bold">
        <BiChevronLeft
          className="text-[30px] cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <span className="text-[20px]">Team Information ({findTeam?.name})</span>
      </div>

      <div className="w-[80%] mx-auto my-[30px] flex items-center  gap-[50px]">
        <div className="w-[200px] h-[200px] bg-[#0C73B8]  rounded-full flex justify-center items-center">
          {findOfficeUser?.picture !== "" ? (
            <img
              src={`${process.env.REACT_APP_BACKEND_IMAGES}/OfficeUserImages/${findOfficeUser?.picture}`}
              className="w-[100%] h-[100%] object-cover rounded-full"
              alt=""
            />
          ) : (
            <span className="text-white text-[50px] font-bold">
              {findOfficeUser?.firstname?.[0]}
            </span>
          )}
        </div>

        <div className="w-[60%] my-[40px] flex flex-col gap-[20px]">
          <div className="flex items-center gap-[10px]">
            <span className="text-[30px] text-[#0C73B8] font-bold">
              {findOfficeUser?.firstname} {findOfficeUser?.middlename}{" "}
              {findOfficeUser?.lastname}
            </span>
          </div>
          <div className="w-[100%] flex justify-between items-center gap-[50px]">
            <div className="flex flex-col gap-[20px]">
              <span className="flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8]"> Email: </span>{" "}
                <span className="text-gray-500">{findOfficeUser?.email}</span>
              </span>
              <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8]">Phone: </span>
                <span>{findOfficeUser?.phone}</span>
              </span>
              <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8]">Username: </span>
                <span>{findOfficeUser?.username}</span>
              </span>
              <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8]">Gender: </span>
                <span>{findOfficeUser?.gender}</span>
              </span>
              <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8]">Employment date: </span>
                <span>{findOfficeUser?.employment_date ? findOfficeUser?.employment_date:"-"}</span>
              </span>
            </div>
            <div className="flex  flex-col gap-[20px]">
              <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8]">Level: </span>
                <span>{findOfficeUser?.level}</span>
              </span>

              <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8]">Division: </span>
                <span>{findOfficeUser?.division?.name}</span>
              </span>
              <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8]">
                  Directorate:{" "}
                </span>
                <span>{findDirectorate?.name}</span>
              </span>
              <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8]">Qualification: </span>
                <span>{findOfficeUser?.qualification ? findOfficeUser?.qualification:"-"}</span>
              </span>
              <span className="text-gray-500 flex items-center gap-[10px]">
                <span className="font-bold text-[#0C73B8]">Status: </span>
                {findOfficeUser?.status === "active" && (
                  <span
                    className="px-2 py-1 inline-flex text-xs leading-5
                  font-semibold  bg-green-600 text-white rounded-[5px]"
                  >
                    Active
                  </span>
                )}

                {findOfficeUser?.status === "inactive" && (
                  <span
                    className="px-2 py-1 inline-flex text-xs leading-5
                  font-semibold  bg-red-600 text-white rounded-[5px]"
                  >
                    Inactive
                  </span>
                )}
              </span>
             
            </div>
          </div>
        </div>
      </div>
    </div> */}

  
    <div className="w-[100%] my-[30px] mx-auto">
      <div className="w-[95%] mx-auto h-[82%] my-[30px] p-2 bg-white rounded">
        <div className="w-[95%] mt-[50px] mx-auto">
          <div className="flex items-center justify-between gap-[10px]  text-[#0C73B8]">
            <div className="flex items-center justify-start">
              <span className="text-[20px] font-bold">Members</span>
            </div>
          </div>

         
          {loading ? (
            <Loading addtionalStyle={"flex justify-center items-center"} />
          ) : teams?.members?.length === 0 ? (
            <div className="w-[90%] mx-auto min-h-[300px] my-[30px] flex justify-center items-center bg-white rounded-[10px]">
              <span className="text-[#0C73B8] text-[14px]">
                No member found in this team
              </span>
            </div>
          ) : (
            <div className="w-[95%] h-[100%] my-[30px] mx-auto flex justify-between items-center">
              <table className="w-[100%] bg-white">
                <thead className="bg-[#0C73B8] text-white  text-[14px]">
                  <tr>
                    <th className="px-2 py-4 border-[2px] border-white">#</th>
                    <th className="px-2 py-4 border-[2px] border-white">
                      Profile picture
                    </th>
                    <th className="px-2 py-4 border-[2px] border-white">
                      Full Name
                    </th>
                    <th className="px-2 py-4 border-[2px] border-white">
                      Phone
                    </th>
                    <th className="px-2 py-4 border-[2px] border-white">
                      Level
                    </th>
               
                    <th className="px-2 py-4 border-[2px] border-white">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="border [&>*:nth-child(even)]:bg-[#F9F9F9]">
                  {teams?.members?.map((member, index) => {
                  
                    const firstname = member?.users?.firstname;
                    const middlename = member?.users?.middlename;
                    const lastname = member?.users?.lastname;
                    const level = member?.users?.level;
                    const phone = member?.users?.phone;
                  

                    return (
                      <tr
                        key={index}
                        onClick={()=>navigate(`/member_information/${member?._id}`,{
                          state:{
                            division:user?.division?.name ? user?.division?.name:"-",
                            directorate:teams?.directorate?.name_en ? teams?.directorate?.name_en: "-",
                            team:teams?.name_en ? teams?.name_en: "-",
                            user:member?.users ? member?.users:"-"
                          }
                        })}
                        className="text-center border-b border-gray-300 text-gray-600 text-[14px] cursor-pointer"
                      >
                        <td className="px-2 py-4 border-[2px] border-white">
                          {index + 1}
                        </td>

                        <td className="px-2 py-4 border-[2px] border-white flex justify-center">
                          {member?.users?.picture !== "" ? (
                            <img
                              src={`${process.env.REACT_APP_BACKEND_IMAGES}/OfficeUserImages/${member?.users?.picture}`}
                              className="w-[50px] h-[50px] object-cover rounded-full"
                              alt=""
                            />
                          ) : (
                            <span className="text-white text-[50px] font-bold">
                              {member?.users?.firstname?.[0]}
                            </span>
                          )}
                        </td>
                        <td className="px-2 py-4 border-[2px] border-white">
                          {firstname} {middlename} {lastname}
                        </td>
                            
                        <td className="px-2 py-4 border-[2px] border-white">
                          {phone}
                        </td>
                       
                        <td className="px-2 py-4 border-[2px] border-white">
                          {level}
                        </td>
                       

                        <td className="px-6 py-2 whitespace-nowrap">
                          {member?.users?.status === "active" && (
                            <span
                              className="px-2 py-1 inline-flex text-xs leading-5
                  font-semibold  bg-green-600 text-white rounded-[5px]"
                            >
                              Active
                            </span>
                          )}

                          {member?.users?.status === "inactive" && (
                            <span
                              className="px-2 py-1 inline-flex text-xs leading-5
                  font-semibold  bg-red-600 text-white rounded-[5px]"
                            >
                              Inactive
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
  )
}

export default TeamDashboard