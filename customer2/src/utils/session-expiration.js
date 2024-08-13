import apiRequest from "./request";

const extractJwtExpiration = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000;
  } catch (error) {
   
    return null;
  }
};

const logout = async (e) => {
  e?.preventDefault();
  try {
    await apiRequest.get(`/accusation_acceptor_user_api/logout_accusation_acceptor`)
      .then((response) => {
        if (response.status === 200) {
          sessionStorage.clear();
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.error(error);
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