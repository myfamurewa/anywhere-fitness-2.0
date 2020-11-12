import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  //console.log(token)
  return axios.create({
    headers: {
      Authorization: token
    },
    baseURL: "https://anywhere-fitness-api.herokuapp.com"
  });
};

export default axiosWithAuth;
