import React, { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";

import ServerError from "../ServerError";
import { fetchAllOfficeUsers } from "../../REDUX/slices/getAllOfficeUsersSlice";
import { fetchAllTeams } from "../../REDUX/slices/allTeamSlice";
import { fetchAllDirectorate } from "../../REDUX/slices/allDirectorateSlice";
import { language } from "../../utils/part-1lan";

function TeamDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const translationState = useSelector((state)=>state.translation);
  const officeUsersList = useSelector((state) => state?.getAllOfficeUsers);
  const directorateList = useSelector((state) => state?.allDirectorates);
  const teamList = useSelector((state) => state?.allTeams);
  const [titerError, setTiterError] = useState(false);
  const [signError, setSignError] = useState(false);

  useEffect(() => {
    dispatch(fetchAllDirectorate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchAllOfficeUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(fetchAllTeams());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const findTeam = teamList?.teams?.find((team) => team?._id === id);
  const findDirectorate = directorateList?.directorates?.find(
    (directorate) => directorate?._id === findTeam?.directorate?._id
  );


  const findOfficeUser = officeUsersList?.officeUsers?.find(
    (user) => user?._id === findTeam?.manager?._id
  );

 
  if (!findOfficeUser)
    return (
      <div className="w-[90%] mx-auto min-h-[250px] my-[30px] flex flex-col justify-center items-center gap-[10px] bg-white rounded-[10px]">
        <span className="text-[#0C73B8] text-[14px]">
        {translationState?.lan ==="En" && language?.noTeamManagerFound[0]}
        {translationState?.lan ==="Am" && language?.noTeamManagerFound[1]}!
        </span>
        <button
          onClick={() => navigate(-1)}
          className="py-2 px-4 text-white text-[14px] bg-[#0C73B8] rounded-[5px]"
        >
         {translationState?.lan ==="En" && language?.back[0]}
         {translationState?.lan ==="Am" && language?.back[1]}
        </button>
      </div>
    );

  if (directorateList?.error || teamList?.error || officeUsersList?.error)
    return <ServerError />;
  return (
    <div className="w-[100%]">
      <div className="w-[100%] p-2 min-h-[250px] bg-white">
        <div className="w-[90%]  flex items-center justify-start   text-[#0C73B8] my-[30px] mx-auto font-bold">
          <BiChevronLeft
            className="text-[30px] cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <span className="text-[20px]">{translationState?.lan ==="En" && language?.teamInformation[0]}
          {translationState?.lan ==="Am" && language?.teamInformation[1]} ({translationState?.lan ==="En" && findTeam?.name_en}
          {translationState?.lan ==="Am" && findTeam?.name_am})</span>
        </div>

        <div className="w-[80%] mx-auto my-[30px] flex items-center  gap-[50px]">
          <div className="w-[200px] h-[200px] bg-[#0C73B8]  rounded-full flex justify-center items-center max-lg2:w-[150px] max-lg2:h-[150px]">
            {findOfficeUser?.picture !== "" ? (
              <img
                src={`${process.env.REACT_APP_BACKEND_IMAGES}/OfficeUserImages/${findOfficeUser?.picture}`}
                className="w-[100%] h-[100%] object-cover rounded-full"
                alt=""
              />
            ) : (
              <span className="text-white text-[50px] font-bold max-lg2:text-[35px]">
                {findOfficeUser?.firstname?.[0]}
              </span>
            )}
          </div>

          <div className="w-[70%] my-[40px] flex flex-col gap-[20px]">
            <div className="flex items-center gap-[10px]">
              <span className="text-[30px] text-[#0C73B8] font-bold max-lg2:text-[20px]">
                {findOfficeUser?.firstname} {findOfficeUser?.middlename}{" "}
                {findOfficeUser?.lastname}
              </span>
            </div>
            <div className="w-[100%] flex justify-between items-center gap-[50px]">
              <div className="flex flex-col gap-[20px]">
                <span className="flex items-center gap-[10px] max-lg2:text-[12px]">
                  <span className="font-bold text-[#0C73B8]">{translationState?.lan ==="En" && language?.email[0]}
                  {translationState?.lan ==="Am" && language?.email[1]}: </span>{" "}
                  <span className="text-gray-500">{findOfficeUser?.email}</span>
                </span>
                <span className="text-gray-500 flex items-center gap-[10px] max-lg2:text-[12px]">
                  <span className="font-bold text-[#0C73B8]">{translationState?.lan ==="En" && language?.phoneNumber[0]}
                  {translationState?.lan ==="Am" && language?.phoneNumber[1]}: </span>
                  <span>{findOfficeUser?.phone}</span>
                </span>
                <span className="text-gray-500 flex items-center gap-[10px] max-lg2:text-[12px]">
                  <span className="font-bold text-[#0C73B8]">{translationState?.lan ==="En" && language?.username[0]}
                  {translationState?.lan ==="Am" && language?.username[1]}: </span>
                  <span>{findOfficeUser?.username}</span>
                </span>
                <span className="text-gray-500 flex items-center gap-[10px] max-lg2:text-[12px]">
                  <span className="font-bold text-[#0C73B8]">{translationState?.lan ==="En" && language?.gender[0]}
                  {translationState?.lan ==="Am" && language?.gender[1]}: </span>
                  <span>
                {translationState?.lan ==="En" && findOfficeUser?.gender}
                {translationState?.lan ==="Am" && findOfficeUser?.gender ==="Male" ? language?.male[1]:language?.female[1]}
                  </span>
                </span>
               
              </div>
              <div className="flex  flex-col gap-[20px]">
                <span className="text-gray-500 flex items-center gap-[10px] max-lg2:text-[12px]">
                  <span className="font-bold text-[#0C73B8]">         {translationState?.lan ==="En" && language?.level[0]}
                  {translationState?.lan ==="Am" && language?.level[1]}: </span>
                  <span>{findOfficeUser?.level}</span>
                </span>

                <span className="text-gray-500 flex items-center gap-[10px] max-lg2:text-[12px]">
                  <span className="font-bold text-[#0C73B8]">{translationState?.lan ==="En" && language?.division[0]}
                  {translationState?.lan ==="Am" && language?.division[1]}: </span>
                  <span>
                  {translationState?.lan ==="En" && findOfficeUser?.division?.name_en}
                  {translationState?.lan ==="Am" && findOfficeUser?.division?.name_am}
                  </span>
                </span>
                <span className="text-gray-500 flex items-center gap-[10px] max-lg2:text-[12px]">
                  <span className="font-bold text-[#0C73B8]">
                  {translationState?.lan ==="En" && language?.directorate[0]}
                  {translationState?.lan ==="Am" && language?.directorate[1]}:{" "}
                  </span>
                  <span>
                  {translationState?.lan ==="En" && findDirectorate?.name_en}
                  {translationState?.lan ==="Am" && findDirectorate?.name_am}
               </span>
                </span>
               
                <span className="text-gray-500 flex items-center gap-[10px] max-lg2:text-[12px]">
                  <span className="font-bold text-[#0C73B8]">{translationState?.lan ==="En" && language?.status[0]}
                  {translationState?.lan ==="Am" && language?.status[1]}: </span>
                  {findOfficeUser?.status === "active" && (
                    <span
                      className="px-2 py-1 inline-flex  leading-5
                    font-semibold  bg-green-600 text-white rounded-[5px]"
                    >
                             {translationState?.lan ==="En" && language?.active[0]}
                             {translationState?.lan ==="Am" && language?.active[1]}
                    </span>
                  )}

                  {findOfficeUser?.status === "inactive" && (
                    <span
                      className="px-2 py-1 inline-flex  leading-5
                    font-semibold  bg-red-600 text-white rounded-[5px]"
                    >
                         {translationState?.lan ==="En" && language?.inactive[0]}
                         {translationState?.lan ==="Am" && language?.inactive[1]}
                    </span>
                  )}
                </span>
               
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[95%] mx-auto grid grid-cols-3 gap-[10px]">
        {findOfficeUser?.paraph?.length > 0 && (
          <div className="w-[100%] my-[30px] p-2 mx-auto col-span-1 bg-white rounded-[10px]">
            <div className="w-[95%] mx-auto">
              <div className="w-[100%] my-[20px] flex justify-between items-center">
                <span className="font-bold text-[#0C73B8] text-[20px] max-lg2:text-[16px]">
                {translationState?.lan ==="En" && language?.paraph[0]}
                {translationState?.lan ==="Am" && language?.paraph[1]}
                </span>
              </div>
              <div className="w-[90%] my-[30px] mx-auto flex flex-col gap-[20px]">
                {findOfficeUser?.paraph?.map((paraph, index) => (
                  <div
                    key={index}
                    className="w-[100%]  flex justify-between items-center gap-[20px] max-lg2:text-[14px]"
                  >
                    <li className=" text-gray-500">{paraph?.title}</li>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
 {findOfficeUser?.titer && findOfficeUser?.titer !== ""  && (
      <div className="w-[100%] my-[30px] p-2 mx-auto col-span-1 bg-white rounded-[10px]">
        <div className="w-[95%] mx-auto">
          <div className="w-[100%] my-[20px] flex justify-between items-center">
            <span className="font-bold text-[#0C73B8] text-[20px] max-lg2:text-[16px]">
              {translationState?.lan === "En" && language?.titer[0]}
              {translationState?.lan === "Am" && language?.titer[1]}
            </span>
          </div>
          <div className="w-[90%] my-[30px] mx-auto flex flex-col gap-[20px]">
            {!findOfficeUser?.titer && findOfficeUser?.titer === ""  ? (
              <div className="w-[100%] flex justify-center items-center">
                <span className="font-bold text-center text-[#0C73B8]">
                  {translationState?.lan === "En" && language?.titernotUploaded[0]}
                  {translationState?.lan === "Am" && language?.titernotUploaded[1]}
                </span>
              </div>
            ) : (
              <div>
                {!titerError ? (
                  <img
                    src={`${process.env.REACT_APP_BACKEND_IMAGES}/OfficeUserTiters/${findOfficeUser?.titer}`}
                    alt=""
                    onError={() => setTiterError(true)}
                  />
                ) : (
                  <span className="w-[100%] flex justify-center items-center my-[20px] font-bold text-center text-[#0C73B8]">
                    {translationState?.lan === "En" && "The titer could not load"}
                    {translationState?.lan === "Am" && "ቲተር ማግኘት አልተቻለም"}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )}
     {findOfficeUser?.signature && findOfficeUser?.signature !== "" && (
      <div className="w-[100%] my-[30px] p-2 mx-auto col-span-1 bg-white rounded-[10px]">
        <div className="w-[95%] mx-auto">
          <div className="w-[100%] my-[20px] flex justify-between items-center">
            <span className="font-bold text-[#0C73B8] text-[20px] max-lg2:text-[16px]">
              {translationState?.lan === "En" && language?.signiture[0]}
              {translationState?.lan === "Am" && language?.signiture[1]}
            </span>
          </div>
          <div className="w-[90%] my-[30px] mx-auto flex flex-col gap-[20px]">
            {!findOfficeUser?.signature || findOfficeUser?.signature === "" ? (
              <div className="w-[100%] flex justify-center items-center">
                <span className="font-bold text-center text-[#0C73B8]">
                  {translationState?.lan === "En" && language?.signnotUploded[0]}
                  {translationState?.lan === "Am" && language?.signnotUploded[1]}
                </span>
              </div>
            ) : (
              <div>
                {!signError ? (
                  <img
                    src={`${process.env.REACT_APP_BACKEND_IMAGES}/OfficeUserSignatures/${findOfficeUser?.signature}`}
                    alt=""
                    onError={() => setSignError(true)}
                  />
                ) : (
                  <span className="w-[100%] flex justify-center items-center my-[20px] font-bold text-center text-[#0C73B8]">
                    {translationState?.lan === "En" && "The signature could not load"}
                    {translationState?.lan === "Am" && "ፊርማውን ማግኘት አልተቻለም"}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )}

       
      </div>
      <div className="w-[100%] my-[30px] mx-auto">
        <div className="w-[95%] mx-auto h-[82%] my-[30px] p-2 bg-white rounded">
          <div className="w-[95%] mt-[50px] mx-auto">
            <div className="flex items-center justify-between gap-[10px]  text-[#0C73B8]">
              <div className="flex items-center justify-start">
                <span className="text-[20px] font-bold max-lg2:text-[16px]">
                {translationState?.lan ==="En" && language?.members[0]}
                {translationState?.lan ==="Am" && language?.members[1]}
                </span>
              </div>
            </div>

           
            {teamList?.loading ? (
              <Loading addtionalStyle={"flex justify-center items-center"} />
            ) : findTeam?.members?.length === 0 ? (
              <div className="w-[90%] mx-auto min-h-[300px] my-[30px] flex justify-center items-center bg-white rounded-[10px]">
                <span className="text-[#0C73B8] text-[14px]">
                {translationState?.lan ==="En" && language?.notmemberFoundTeam[0]}
                {translationState?.lan ==="Am" && language?.notmemberFoundTeam[1]}
                </span>
              </div>
            ) : (
              <div className="w-[95%] h-[100%] my-[30px] mx-auto flex justify-between items-center">
                <table className="w-[100%] bg-white max-lg2:text-[12px]">
                  <thead className="bg-[#0C73B8] text-white  text-[14px] max-lg2:text-[12px]">
                    <tr>
                      <th className="px-2 py-4 border-[2px] border-white">#</th>
                      <th className="px-2 py-4 border-[2px] border-white">
                      {translationState?.lan ==="En" && language?.picture[0]}
                      {translationState?.lan ==="Am" && language?.picture[1]}
                      </th>
                      <th className="px-2 py-4 border-[2px] border-white">
                      {translationState?.lan ==="En" && language?.fullName[0]}
                      {translationState?.lan ==="Am" && language?.fullName[1]}
                      </th>
                      <th className="px-2 py-4 border-[2px] border-white">
                      {translationState?.lan ==="En" && language?.username[0]}
                      {translationState?.lan ==="Am" && language?.username[1]}
                      </th>
                    
                      <th className="px-2 py-4 border-[2px] border-white">
                      {translationState?.lan ==="En" && language?.level[0]}
                      {translationState?.lan ==="Am" && language?.level[1]}
                      </th>
                      <th className="px-2 py-4 border-[2px] border-white">
                      {translationState?.lan ==="En" && language?.createdAt[0]}
                      {translationState?.lan ==="Am" && language?.createdAt[1]}
                      </th>
                      <th className="px-2 py-4 border-[2px] border-white">
                      {translationState?.lan ==="En" && language?.status[0]}
                      {translationState?.lan ==="Am" && language?.status[1]}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border [&>*:nth-child(even)]:bg-[#F9F9F9]">
                    {findTeam?.members?.map((memeber, index) => {
                      const firstname = officeUsersList?.officeUsers?.find(
                        (user) => user?._id === memeber?.users?._id
                      )?.firstname;
                      const middlename = officeUsersList?.officeUsers?.find(
                        (user) => user?._id === memeber?.users?._id
                      )?.middlename;
                      const lastname = officeUsersList?.officeUsers?.find(
                        (user) => user?._id === memeber?.users?._id
                      )?.lastname;
                      const username = officeUsersList?.officeUsers?.find(
                        (user) => user?._id === memeber?.users?._id
                      )?.username;
                 
                      const level = officeUsersList?.officeUsers?.find(
                        (user) => user?._id === memeber?.users?._id
                      )?.level;
                      const createdAt = officeUsersList?.officeUsers?.find(
                        (user) => user?._id === memeber?.users?._id
                      )?.createdAt;
                      const status = officeUsersList?.officeUsers?.find(
                        (user) => user?._id === memeber?.users?._id
                      )?.status;
                      const picture = officeUsersList?.officeUsers?.find(
                        (user) => user?._id === memeber?.users?._id
                      )?.picture;

                      return (
                        <tr
                          key={index}
                          onClick={()=>navigate(`/member_information/${memeber?._id}`,{
                            state:{
                              division:findOfficeUser?.division?.name_en ? findOfficeUser?.division?.name_en:"-",
                              directorate:findDirectorate ? findDirectorate: "-",
                              team:findTeam? findTeam: "-",
                              user:memeber?.users ? memeber?.users:"-"
                            }
                          })}
                          className="text-center border-b border-gray-300 text-gray-600 text-[14px] cursor-pointer max-lg2:text-[12px]"
                        >
                          <td className="px-2 py-4 border-[2px] border-white">
                            {index + 1}
                          </td>

                          <td className="px-2 py-4 border-[2px] border-white flex justify-center">
                            {picture !== "" ? (
                              <img
                                src={`${process.env.REACT_APP_BACKEND_IMAGES}/OfficeUserImages/${picture}`}
                                className="w-[50px] h-[50px] object-cover rounded-full"
                                alt=""
                              />
                            ) : (
                              <span className="text-white text-[50px] font-bold">
                                {findOfficeUser?.firstname?.[0]}
                              </span>
                            )}
                          </td>
                          <td className="px-2 py-4 border-[2px] border-white">
                            {firstname} {middlename} {lastname}
                          </td>
                          <td className="px-2 py-4 border-[2px] border-white">
                            {username}
                          </td>
                         
                          <td className="px-2 py-4 border-[2px] border-white">
                            {level}
                          </td>
                          <td className="px-2 py-4 border-[2px] border-white">
                            {createdAt?.split("T")[0]}
                          </td>

                          <td className="px-6 py-2 whitespace-nowrap text-[14px] max-lg2:text-[12px]">
                            {status === "active" && (
                              <span
                                className="px-2 py-1 inline-flex leading-5
                    font-semibold  bg-green-600 text-white rounded-[5px]"
                              >
                                    {translationState?.lan ==="En" && language?.active[0]}
                                    {translationState?.lan ==="Am" && language?.active[1]}
                              </span>
                            )}

                            {status === "inactive" && (
                              <span
                                className="px-2 py-1 inline-flex leading-5
                    font-semibold  bg-red-600 text-white rounded-[5px]"
                              >
                                     {translationState?.lan ==="En" && language?.active[0]}
                                     {translationState?.lan ==="Am" && language?.active[1]}
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

export default TeamDetail;
