import React, { useEffect } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAllOfficeUsers } from "../../REDUX/slices/getAllOfficeUsersSlice";
import { language } from "../../utils/part-1lan";

function TeamMembersDetail() {
  const location = useLocation();
  const {directorate, team, user } = location.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const translationState = useSelector((state)=>state.translation);
  const officeUsersList = useSelector((state) => state?.getAllOfficeUsers);

  useEffect(()=>{
    dispatch(fetchAllOfficeUsers())
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

 

  const findUser = officeUsersList?.officeUsers?.find((userInfo)=>userInfo?._id ===user?._id);


  return (
    <div className="w-[100%]">
      <div className="w-[100%] p-2 min-h-[90vh] bg-white">
        <div className="w-[90%]  flex items-center justify-start   text-[#0C73B8] my-[30px] mx-auto font-bold">
          <BiChevronLeft
            className="text-[30px] cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <span className="text-[20px]">
          {translationState?.lan ==="En" && language?.memberInformation[0]}
          {translationState?.lan ==="Am" && language?.memberInformation[1]}
          </span>
        </div>

        <div className="w-[80%] mx-auto my-[30px] flex items-center  gap-[50px]">
          <div className="w-[200px] h-[200px] bg-[#0C73B8]  rounded-full flex justify-center items-center max-lg2:w-[150px] max-lg2:h-[150px]">
            {findUser?.picture !== "" ? (
              <img
                src={`${process.env.REACT_APP_BACKEND_IMAGES}/OfficeUserImages/${findUser?.picture}`}
                className="w-[100%] h-[100%] object-cover rounded-full"
                alt=""
              />
            ) : (
              <span className="text-white text-[50px] font-bold max-lg2:text-[35px]">
                {findUser?.firstname?.[0]}
              </span>
            )}
          </div>

          <div className="w-[70%] my-[40px] flex flex-col gap-[20px]">
            <div className="flex items-center gap-[10px]">
              <span className="text-[30px] text-[#0C73B8] font-bold max-lg2:text-[20px]">
                {findUser?.firstname} {findUser?.middlename} {findUser?.lastname} ({findUser?.level})
              </span>
            </div>
            <div className="w-[100%] flex justify-between items-center gap-[50px]">
              <div className="flex flex-col gap-[20px]">
                <span className="flex items-center gap-[10px] max-lg2:text-[12px]">
                  <span className="font-bold text-[#0C73B8]">         {translationState?.lan ==="En" && language?.email[0]}
                  {translationState?.lan ==="Am" && language?.email[1]}: </span>{" "}
                  <span className="text-gray-500">{findUser?.email}</span>
                </span>
                <span className="text-gray-500 flex items-center gap-[10px] max-lg2:text-[12px]">
                  <span className="font-bold text-[#0C73B8]">{translationState?.lan ==="En" && language?.phoneNumber[0]}
                  {translationState?.lan ==="Am" && language?.phoneNumber[1]}: </span>
                  <span>{findUser?.phone}</span>
                </span>
                <span className="text-gray-500 flex items-center gap-[10px] max-lg2:text-[12px]">
                  <span className="font-bold text-[#0C73B8]"> {translationState?.lan ==="En" && language?.username[0]}
                  {translationState?.lan ==="Am" && language?.username[1]}: </span>
                  <span>{findUser?.username}</span>
                </span>
                <span className="text-gray-500 flex items-center gap-[10px] max-lg2:text-[12px]">
                  <span className="font-bold text-[#0C73B8]"> {translationState?.lan ==="En" && language?.gender[0]}
                  {translationState?.lan ==="Am" && language?.gender[1]}: </span>
                  <span>
                {translationState?.lan ==="En" && findUser?.gender}
                {translationState?.lan ==="Am" && findUser?.gender ==="Male" ? language?.male[1]:language?.female[1]}
                  </span>
                </span>
                <span className="text-gray-500 flex items-center gap-[10px] max-lg2:text-[12px]">
                  <span className="font-bold text-[#0C73B8]">         {translationState?.lan ==="En" && language?.createdBy[0]}
                  {translationState?.lan ==="Am" && language?.createdBy[1]}: </span>
                  <span>{findUser?.createdBy?.firstname} {findUser?.createdBy?.middlename} {findUser?.createdBy?.lastname}</span>
                </span>
               
              </div>
              <div className="flex  flex-col gap-[20px]">
                <span className="text-gray-500 flex items-center gap-[10px] max-lg2:text-[12px]">
                  <span className="font-bold text-[#0C73B8]">         {translationState?.lan ==="En" && language?.position[0]}
                  {translationState?.lan ==="Am" && language?.position[1]}: </span>
                  <span>{findUser?.position}</span>
                </span>

                <span className="text-gray-500 flex items-center gap-[10px] max-lg2:text-[12px]">
                  <span className="font-bold text-[#0C73B8]">         {translationState?.lan ==="En" && language?.division[0]}
                  {translationState?.lan ==="Am" && language?.division[1]}: </span>
                  <span>
                  {translationState?.lan ==="En" && findUser?.division?.name_en}
                  {translationState?.lan ==="Am" && findUser?.division?.name_am}
                  </span>
                </span>
                <span className="text-gray-500 flex items-center gap-[10px] max-lg2:text-[12px]">
                  <span className="font-bold text-[#0C73B8]">
                  {translationState?.lan ==="En" && language?.directorate[0]}
                  {translationState?.lan ==="Am" && language?.directorate[1]}:{" "}
                  </span>
                  <span>
                  {translationState?.lan ==="En" && directorate?.name_en}
                  {translationState?.lan ==="Am" && directorate?.name_am}
                  </span>
                </span>

                <span className="text-gray-500 flex items-center gap-[10px] max-lg2:text-[12px]">
                  <span className="font-bold text-[#0C73B8]">{translationState?.lan ==="En" && language?.teams[0]}
                  {translationState?.lan ==="Am" && language?.teams[1]}: </span>
                  <span>
                  {translationState?.lan ==="En" && team?.name_en}
                  {translationState?.lan ==="Am" && team?.name_am}
                </span>
                </span>
              
                <span className="text-gray-500 flex items-center gap-[10px] max-lg2:text-[12px]">
                  <span className="font-bold text-[#0C73B8]"> {translationState?.lan ==="En" && language?.status[0]}
                  {translationState?.lan ==="Am" && language?.status[1]}: </span>
                  {findUser?.status === "active" && (
                    <span
                      className="px-2 py-1 inline-flex text-xs leading-5
                    font-semibold  bg-green-600 text-white rounded-[5px]"
                    >
                               {translationState?.lan ==="En" && language?.active[0]}
                               {translationState?.lan ==="Am" && language?.active[1]}
                    </span>
                  )}

                  {findUser?.status === "inactive" && (
                    <span
                      className="px-2 py-1 inline-flex text-xs leading-5
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
    </div>
  );
}

export default TeamMembersDetail;
