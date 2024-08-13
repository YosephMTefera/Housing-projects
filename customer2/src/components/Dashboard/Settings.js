import React, { useEffect, useState } from "react";
import apiRequest from "../../utils/request";
import { jwtDecode } from "jwt-decode";
import ServerError from "../ServerError";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import { language } from "../../utils/part-1lan";

function Settings() {
  const token = sessionStorage.getItem("tID");
  const decodedToken = jwtDecode(token);
  const userID = decodedToken?.user?.id;
  const translationState = useSelector((state)=>state.translation);
  const [user, setUser] = useState({});
  const [rateLimitTimer, setRateLimitTimer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      apiRequest
        .get(`/customer_user_api/get_customer_user/${userID}`, {
          headers: {
            get_cuserlist_api: process.env.REACT_APP_GET_CUSERLIST_API,
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
          if(error?.response?.status === 429){
          
            setRateLimitTimer(180);
          
        }
        });
    } catch (error) {
      serverError(true);
    }
  }, [userID, token, serverError]);


  useEffect(() => {
    if (rateLimitTimer) {
      const timer = setInterval(() => {
        setRateLimitTimer((prev) => (prev > 1 ? prev - 1 : null));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [rateLimitTimer]);

  
  if(rateLimitTimer) return <div className="w-[80%] mx-auto my-[30px] min-h-[300px] rounded-[10px] bg-white flex justify-center items-center">
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
  </div>

  if (serverError) return <ServerError />;

  return (
    <div className="w-[90%]  bg-white mt-[30px] mx-auto">

      <div className="w-[90%] my-[30px] mx-auto">
        <span className="font-bold text-[#0C73B8] text-[20px]">
        {translationState?.lan === "En" && language?.myProfile[0]}
          {translationState?.lan === "Am" && language?.myProfile[1]}
                    {translationState?.lan === "Or" && language?.myProfile[2]}
                    {translationState?.lan === "Tg" && language?.myProfile[3]}
                    {translationState?.lan === "Sm" && language?.myProfile[4]}
                    {translationState?.lan === "Af" && language?.myProfile[5]} 
        </span>
      </div>
      {loading ? (
        <Loading
          addtionalStyle={"flex justify-center items-center my-[30px]"}
        />
      ) : (
        <div className="mt-[30px] bg-white p-4  rounded-[10px]">
          <div className="w-[90%] mt-[30px] border border-gray-300 p-2 mx-auto flex justify-start items-center gap-[20px] rounded-[10px]">
            <div className="w-[100px] h-[100px] bg-[#0C73B8] text-white rounded-full flex justify-center items-center">
              {user?.picture ? (
                <img
                  src={`${process.env.REACT_APP_BACKEND_IMAGES}/CustomerImages/${user?.picture}`}
                  className="w-[100%] h-[100%] object-cover rounded-full"
                  alt=""
                />
              ) : (
                <div className="w-[100px] h-[100px] bg-[#0C73B8] text-white rounded-full flex justify-center items-center">
                  <span>{user?.firstname?.[0]}</span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-[5px]">
              <span className="font-bold text-[#0C73B8]">
                {user?.firstname} {user?.middlename} {user?.lastname}
              </span>
              <span className="text-[12px] text-gray-500">
              {translationState?.lan === "En" && language?.customer[0]}
                    {translationState?.lan === "Am" && language?.customer[1]}
                    {translationState?.lan === "Or" && language?.customer[2]}
                    {translationState?.lan === "Tg" && language?.customer[3]}
                    {translationState?.lan === "Sm" && language?.customer[4]}
                    {translationState?.lan === "Af" && language?.customer[5]}
              </span>
            </div>
          </div>
          <div className="w-[90%] mx-auto p-4  mt-[20px] border border-gray-300 rounded-[10px]">
            <div className="w-[90%] mx-auto">
              <div className="w-[100%] mt-[10px] flex justify-between items-center">
                <span className="font-bold text-[#0C73B8] text-[20px]">
                {translationState?.lan === "En" && language?.personalInformation[0]}
                    {translationState?.lan === "Am" && language?.personalInformation[1]}
                    {translationState?.lan === "Or" && language?.personalInformation[2]}
                    {translationState?.lan === "Tg" && language?.personalInformation[3]}
                    {translationState?.lan === "Sm" && language?.personalInformation[4]}
                    {translationState?.lan === "Af" && language?.personalInformation[5]}
                </span>
                {user?.status === "active" ? (
                  <button className="py-1 px-4 rounded-[20px] bg-green-600 font-bold text-white max-lg2:text-[12px]">
                      {translationState?.lan === "En" && language?.active[0]}
                    {translationState?.lan === "Am" && language?.active[1]}
                    {translationState?.lan === "Or" && language?.active[2]}
                    {translationState?.lan === "Tg" && language?.active[3]}
                    {translationState?.lan === "Sm" && language?.active[4]}
                    {translationState?.lan === "Af" && language?.active[5]}
                  </button>
                ) : (
                  <button className="py-1 px-4 font-bold rounded-[20px] bg-red-600 text-white">
                       {translationState?.lan === "En" && language?.inactive[0]}
                    {translationState?.lan === "Am" && language?.inactive[1]}
                    {translationState?.lan === "Or" && language?.inactive[2]}
                    {translationState?.lan === "Tg" && language?.inactive[3]}
                    {translationState?.lan === "Sm" && language?.inactive[4]}
                    {translationState?.lan === "Af" && language?.inactive[5]}
                  </button>
                )}
              </div>
              <div className="w-[60%] mt-[20px]  grid grid-cols-2 gap-[50px] max-lg1:grid-cols-2">
                <div className="col-span-1 flex flex-col gap-[20px] max-lg2:text-[12px]">
                  <div className="flex flex-col gap-[10px]">
                    <span className="text-[14px] text-gray-500">
                    {translationState?.lan === "En" && language?.firstname[0]}
                    {translationState?.lan === "Am" && language?.firstname[1]}
                    {translationState?.lan === "Or" && language?.firstname[2]}
                    {translationState?.lan === "Tg" && language?.firstname[3]}
                    {translationState?.lan === "Sm" && language?.firstname[4]}
                    {translationState?.lan === "Af" && language?.firstname[5]}
                    </span>
                    <span>{user?.firstname}</span>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <span className="text-[14px] text-gray-500">
                    {translationState?.lan === "En" && language?.middlename[0]}
                    {translationState?.lan === "Am" && language?.middlename[1]}
                    {translationState?.lan === "Or" && language?.middlename[2]}
                    {translationState?.lan === "Tg" && language?.middlename[3]}
                    {translationState?.lan === "Sm" && language?.middlename[4]}
                    {translationState?.lan === "Af" && language?.middlename[5]}
                    </span>
                    <span>{user?.middlename}</span>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <span className="text-[14px] text-gray-500">
                    {translationState?.lan === "En" && language?.lastname[0]}
                    {translationState?.lan === "Am" && language?.lastname[1]}
                    {translationState?.lan === "Or" && language?.lastname[2]}
                    {translationState?.lan === "Tg" && language?.lastname[3]}
                    {translationState?.lan === "Sm" && language?.lastname[4]}
                    {translationState?.lan === "Af" && language?.lastname[5]}
                    </span>
                    <span>{user?.lastname}</span>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <span className="text-[14px] text-gray-500">
                    {translationState?.lan === "En" && language?.preferredLanguage[0]}
                    {translationState?.lan === "Am" && language?.preferredLanguage[1]}
                    {translationState?.lan === "Or" && language?.preferredLanguage[2]}
                    {translationState?.lan === "Tg" && language?.preferredLanguage[3]}
                    {translationState?.lan === "Sm" && language?.preferredLanguage[4]}
                    {translationState?.lan === "Af" && language?.preferredLanguage[5]}
                    </span>
                    {user?.preferred_language ==="en" &&  <span>
                      {translationState?.lan === "En" && language?.english[0]}
                    {translationState?.lan === "Am" && language?.english[1]}
                    {translationState?.lan === "Or" && language?.english[2]}
                    {translationState?.lan === "Tg" && language?.english[3]}
                    {translationState?.lan === "Sm" && language?.english[4]}
                    {translationState?.lan === "Af" && language?.english[5]}
                      
                      </span>}
                    {user?.preferred_language ==="am" &&  <span>
                      {translationState?.lan === "En" && language?.amharic[0]}
                    {translationState?.lan === "Am" && language?.amharic[1]}
                    {translationState?.lan === "Or" && language?.amharic[2]}
                    {translationState?.lan === "Tg" && language?.amharic[3]}
                    {translationState?.lan === "Sm" && language?.amharic[4]}
                    {translationState?.lan === "Af" && language?.amharic[5]}
                      </span>}
                    {user?.preferred_language ==="or" &&  <span>
                      {translationState?.lan === "En" && language?.oromo[0]}
                    {translationState?.lan === "Am" && language?.oromo[1]}
                    {translationState?.lan === "Or" && language?.oromo[2]}
                    {translationState?.lan === "Tg" && language?.oromo[3]}
                    {translationState?.lan === "Sm" && language?.oromo[4]}
                    {translationState?.lan === "Af" && language?.oromo[5]}
                      </span>}
                    {user?.preferred_language ==="sm" &&  <span>
                      {translationState?.lan === "En" && language?.somali[0]}
                    {translationState?.lan === "Am" && language?.somali[1]}
                    {translationState?.lan === "Or" && language?.somali[2]}
                    {translationState?.lan === "Tg" && language?.somali[3]}
                    {translationState?.lan === "Sm" && language?.somali[4]}
                    {translationState?.lan === "Af" && language?.somali[5]}
                      </span>}
                    {user?.preferred_language ==="tg" &&  <span>
                      {translationState?.lan === "En" && language?.tigrgna[0]}
                    {translationState?.lan === "Am" && language?.tigrgna[1]}
                    {translationState?.lan === "Or" && language?.tigrgna[2]}
                    {translationState?.lan === "Tg" && language?.tigrgna[3]}
                    {translationState?.lan === "Sm" && language?.tigrgna[4]}
                    {translationState?.lan === "Af" && language?.tigrgna[5]}
                      </span>}
                    {user?.preferred_language ==="af" &&  <span>
                      {translationState?.lan === "En" && language?.afar[0]}
                    {translationState?.lan === "Am" && language?.afar[1]}
                    {translationState?.lan === "Or" && language?.afar[2]}
                    {translationState?.lan === "Tg" && language?.afar[3]}
                    {translationState?.lan === "Sm" && language?.afar[4]}
                    {translationState?.lan === "Af" && language?.afar[5]}
                      </span>}
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <span className="text-[14px] text-gray-500">
                    {translationState?.lan === "En" && language?.woreda[0]}
                    {translationState?.lan === "Am" && language?.woreda[1]}
                    {translationState?.lan === "Or" && language?.woreda[2]}
                    {translationState?.lan === "Tg" && language?.woreda[3]}
                    {translationState?.lan === "Sm" && language?.woreda[4]}
                    {translationState?.lan === "Af" && language?.woreda[5]}
                    </span>
                    <span>{user?.woreda}</span>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <span className="text-[14px] text-gray-500">
                    {translationState?.lan === "En" && language?.housePhoneNumber[0]}
                    {translationState?.lan === "Am" && language?.housePhoneNumber[1]}
                    {translationState?.lan === "Or" && language?.housePhoneNumber[2]}
                    {translationState?.lan === "Tg" && language?.housePhoneNumber[3]}
                    {translationState?.lan === "Sm" && language?.housePhoneNumber[4]}
                    {translationState?.lan === "Af" && language?.housePhoneNumber[5]}
                    </span>
                    <span>{user?.house_phone_number}</span>
                  </div>
                
                </div>
                <div className="col-span-1 flex flex-col gap-[20px] max-lg2:text-[12px]">
                  <div className="flex flex-col gap-[10px] ">
                    <span className="text-[14px] text-gray-500">
                    {translationState?.lan === "En" && language?.phone[0]}
                    {translationState?.lan === "Am" && language?.phone[1]}
                    {translationState?.lan === "Or" && language?.phone[2]}
                    {translationState?.lan === "Tg" && language?.phone[3]}
                    {translationState?.lan === "Sm" && language?.phone[4]}
                    {translationState?.lan === "Af" && language?.phone[5]}
                    </span>
                    <span>{user?.phone}</span>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <span className="text-[14px] text-gray-500">
                    {translationState?.lan === "En" && language?.emailAddress[0]}
                    {translationState?.lan === "Am" && language?.emailAddress[1]}
                    {translationState?.lan === "Or" && language?.emailAddress[2]}
                    {translationState?.lan === "Tg" && language?.emailAddress[3]}
                    {translationState?.lan === "Sm" && language?.emailAddress[4]}
                    {translationState?.lan === "Af" && language?.emailAddress[5]}
                    </span>
                    <span>{user?.email}</span>
                  </div>

                  <div className="flex flex-col gap-[10px]">
                    <span className="text-[14px] text-gray-500">
                    {translationState?.lan === "En" && language?.gender[0]}
                    {translationState?.lan === "Am" && language?.gender[1]}
                    {translationState?.lan === "Or" && language?.gender[2]}
                    {translationState?.lan === "Tg" && language?.gender[3]}
                    {translationState?.lan === "Sm" && language?.gender[4]}
                    {translationState?.lan === "Af" && language?.gender[5]}
                    </span>
                    <span>
                      {user?.gender ==="Male" && <>
                    {translationState?.lan === "En" && language?.male[0]}
                    {translationState?.lan === "Am" && language?.male[1]}
                    {translationState?.lan === "Or" && language?.male[2]}
                    {translationState?.lan === "Tg" && language?.male[3]}
                    {translationState?.lan === "Sm" && language?.male[4]}
                    {translationState?.lan === "Af" && language?.male[5]}
                      </>
}
                    {user?.gender ==="Female" && <>
                    
                     {translationState?.lan === "En" && language?.female[0]}
                    {translationState?.lan === "Am" && language?.female[1]}
                    {translationState?.lan === "Or" && language?.female[2]}
                    {translationState?.lan === "Tg" && language?.female[3]}
                    {translationState?.lan === "Sm" && language?.female[4]}
                    {translationState?.lan === "Af" && language?.female[5]}
                    </>
}
                    </span>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <span className="text-[14px] text-gray-500">
                    {translationState?.lan === "En" && language?.subCity[0]}
                    {translationState?.lan === "Am" && language?.subCity[1]}
                    {translationState?.lan === "Or" && language?.subCity[2]}
                    {translationState?.lan === "Tg" && language?.subCity[3]}
                    {translationState?.lan === "Sm" && language?.subCity[4]}
                    {translationState?.lan === "Af" && language?.subCity[5]}
                    </span>
                    <span>{user?.subcity}</span>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <span className="text-[14px] text-gray-500">
                    {translationState?.lan === "En" && language?.houseNumber[0]}
                    {translationState?.lan === "Am" && language?.houseNumber[1]}
                    {translationState?.lan === "Or" && language?.houseNumber[2]}
                    {translationState?.lan === "Tg" && language?.houseNumber[3]}
                    {translationState?.lan === "Sm" && language?.houseNumber[4]}
                    {translationState?.lan === "Af" && language?.houseNumber[5]}
                    </span>
                    <span>{user?.house_number}</span>
                  </div>
                
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
