import apiRequest from "./request";

const extractJwtExpiration = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000;
  } catch (error) {
    console.error("Error extracting JWT expiration:", error);
    return null;
  }
};

const logout = async (e) => {
  e?.preventDefault();
  try {
    await apiRequest.get(`/office_user_api/logout_office_user`)
      .then((response) => {
        if (response.status === 200) {
          sessionStorage.clear();
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        console.error(error.response.data.Message_en);
      });
  } catch (error) {
    console.error(error?.message);
  }
};

const handleJwtExpiration = (token) => {
  const expiration = extractJwtExpiration(token);
  if (expiration) {


    const remainingTime = expiration - Date.now(); 
    setTimeout(logout, remainingTime);
  }
};



export default handleJwtExpiration;