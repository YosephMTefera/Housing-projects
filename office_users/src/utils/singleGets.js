const { default: apiRequest } = require("./request");

const token = sessionStorage.getItem('tID');
export const getUser =async (userID,type)=>{
    let user = {};
    if(type ==="customer"){
       await apiRequest.get(`/customer_user_api/get_customer_user/${userID}`,{headers:{
            get_cuserlist_api:process.env.REACT_APP_GET_CUSERLIST_API,
            Authorization:`Bearer ${token}`
        }}).then((res)=>{
            user = res.data;
        })
    }

    return user;
}